"""Onboard a fresh dev HA (user dev/dev) and install the panel integration.

Writes a long-lived access token to dev/.token for scripts and Playwright.
Idempotent: does nothing but refresh the token file if HA is already onboarded.
"""

import json
import urllib.parse
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

BASE = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:8124"
CLIENT_ID = f"{BASE}/"
TOKEN_FILE = Path(__file__).parent / ".token"


def call(method, path, body=None, token=None, form=False):
    headers = {}
    data = None
    if body is not None:
        if form:
            data = urllib.parse.urlencode(body).encode()
            headers["Content-Type"] = "application/x-www-form-urlencoded"
        else:
            data = json.dumps(body).encode()
            headers["Content-Type"] = "application/json"
    if token:
        headers["Authorization"] = f"Bearer {token}"
    req = urllib.request.Request(BASE + path, data=data, headers=headers, method=method)
    with urllib.request.urlopen(req, timeout=30) as resp:
        raw = resp.read()
        return json.loads(raw) if raw else None


def wait_for_ha():
    for _ in range(180):
        try:
            call("GET", "/manifest.json")
            return
        except (urllib.error.URLError, ConnectionError):
            time.sleep(2)
    sys.exit("HA did not come up")


def onboarding_steps() -> dict[str, bool]:
    """Done-state per onboarding step; HA drops the endpoint (404) once onboarding is complete."""
    try:
        return {s["step"]: s["done"] for s in call("GET", "/api/onboarding")}
    except urllib.error.HTTPError as err:
        if err.code == 404:
            return {"user": True}
        raise


def login() -> str:
    flow = call("POST", "/auth/login_flow", {"client_id": CLIENT_ID, "handler": ["homeassistant", None], "redirect_uri": CLIENT_ID})
    res = call("POST", f"/auth/login_flow/{flow['flow_id']}", {"client_id": CLIENT_ID, "username": "dev", "password": "dev"})
    tok = call("POST", "/auth/token", {"grant_type": "authorization_code", "code": res["result"], "client_id": CLIENT_ID}, form=True)
    return tok["access_token"]


def main():

    wait_for_ha()
    steps = onboarding_steps()
    if not steps.get("user"):
        res = call("POST", "/api/onboarding/users", {"client_id": CLIENT_ID, "name": "Dev", "username": "dev", "password": "dev", "language": "en"})
        tok = call("POST", "/auth/token", {"grant_type": "authorization_code", "code": res["auth_code"], "client_id": CLIENT_ID}, form=True)
        access = tok["access_token"]
        call("POST", "/api/onboarding/core_config", {}, token=access)
        call("POST", "/api/onboarding/analytics", {}, token=access)
        call("POST", "/api/onboarding/integration", {"client_id": CLIENT_ID, "redirect_uri": CLIENT_ID}, token=access)
    access = login()

    entries = call("GET", "/api/config/config_entries/entry?domain=vtherm_dashboard", token=access)
    if not entries:
        flow = call("POST", "/api/config/config_entries/flow", {"handler": "vtherm_dashboard"}, token=access)
        call("POST", f"/api/config/config_entries/flow/{flow['flow_id']}", {}, token=access)
    TOKEN_FILE.write_text(access)
    print(f"HA ready at {BASE} (dev/dev), token in {TOKEN_FILE}")


if __name__ == "__main__":
    main()
