"""Save a configuration by walking Versatile Thermostat's own config/options flow.

The panel never writes ``entry.data`` itself. It opens VT's flow in-process, visits every
visible section through the menu and answers each form with the draft values for the keys
that form asks for. VT then validates, merges and cleans up (``finalize``) exactly as if a
user had clicked through the flow, so the stored data cannot drift from what VT expects.
"""

from __future__ import annotations

import logging
from dataclasses import dataclass, field
from typing import Any

import voluptuous as vol
from homeassistant.core import HomeAssistant
from homeassistant.data_entry_flow import FlowManager, FlowResultType, InvalidData

from custom_components.versatile_thermostat import const as c

from .const import VT_DOMAIN
from .sections import SECTIONS, Infos

_LOGGER = logging.getLogger(__name__)

# A flow step can chain into others (spec_window -> motion); this bounds one menu visit.
_MAX_FORMS_PER_VISIT = 6


@dataclass
class SaveResult:
    success: bool
    entry_id: str | None = None
    # step id -> {field or "base": VT error key}
    errors: dict[str, dict[str, str]] = field(default_factory=dict)
    incomplete: bool = False


def _answer(form: dict[str, Any], draft: Infos) -> dict[str, Any]:
    """Draft values for exactly the keys the form shows.

    Empty values are left out, as HA's frontend does: VT's merge then drops the key, and
    required keys fall back to their schema default.
    """
    schema: vol.Schema = form["data_schema"]
    return {
        str(key): draft[str(key)]
        for key in schema.schema
        if draft.get(str(key)) not in (None, "", [])
    }


class _Walk:
    def __init__(self, manager: FlowManager, flow_id: str, draft: Infos) -> None:
        self.manager = manager
        self.flow_id = flow_id
        self.draft = draft
        self.errors: dict[str, dict[str, str]] = {}

    async def submit(self, result: dict[str, Any]) -> dict[str, Any]:
        """Answer forms until the flow is back at a menu (or done)."""
        for _ in range(_MAX_FORMS_PER_VISIT):
            if result["type"] != FlowResultType.FORM:
                return result
            step = result["step_id"]
            answer = _answer(result, self.draft)
            try:
                nxt = await self.manager.async_configure(self.flow_id, answer)
            except InvalidData as err:
                self.errors.setdefault(step, {}).update({str(k): "invalid" for k in err.schema_errors} or {"base": "invalid"})
                raise _Stop from err
            if nxt["type"] == FlowResultType.FORM and nxt.get("errors"):
                self.errors.setdefault(step, {}).update(nxt["errors"])
                raise _Stop
            result = nxt
        raise RuntimeError(f"VT flow did not return to its menu after step {result.get('step_id')}")

    async def visit(self, menu: dict[str, Any], step: str) -> dict[str, Any]:
        if step not in menu["menu_options"]:
            return menu
        result = await self.manager.async_configure(self.flow_id, {"next_step_id": step})
        return await self.submit(result)


class _Stop(Exception):
    """A form came back with errors; the walk stops and reports them."""


async def _walk(manager: FlowManager, flow_id: str, menu: dict[str, Any], draft: Infos) -> SaveResult:
    walk = _Walk(manager, flow_id, draft)
    try:
        # Sections are visited in page order; the menu is re-read after each one because
        # type and features change which steps exist. Nested auto-TPI steps are reached
        # through "tpi" by the flow itself.
        for section in SECTIONS:
            if section.parent is None and menu["type"] == FlowResultType.MENU:
                menu = await walk.visit(menu, section.step)
        if menu["type"] != FlowResultType.MENU:
            raise RuntimeError(f"Unexpected VT flow state {menu['type']}")
        if "finalize" not in menu["menu_options"]:
            manager.async_abort(flow_id)
            return SaveResult(success=False, incomplete=True)
        done = await manager.async_configure(flow_id, {"next_step_id": "finalize"})
    except _Stop:
        manager.async_abort(flow_id)
        return SaveResult(success=False, errors=walk.errors)
    except Exception:
        manager.async_abort(flow_id)
        raise
    entry = done.get("result")
    return SaveResult(success=True, entry_id=getattr(entry, "entry_id", None))


async def async_save_existing(hass: HomeAssistant, entry_id: str, draft: Infos) -> SaveResult:
    """Apply a draft to an existing VTherm through VT's options flow."""
    manager = hass.config_entries.options
    menu = await manager.async_init(entry_id)
    result = await _walk(manager, menu["flow_id"], menu, draft)
    if result.success:
        result.entry_id = entry_id
    return result


async def async_create(hass: HomeAssistant, draft: Infos) -> SaveResult:
    """Create a VTherm through VT's config flow."""
    manager = hass.config_entries.flow
    first = await manager.async_init(VT_DOMAIN, context={"source": "user"})
    try:
        menu = await manager.async_configure(first["flow_id"], {c.CONF_THERMOSTAT_TYPE: draft[c.CONF_THERMOSTAT_TYPE]})
    except InvalidData:
        manager.async_abort(first["flow_id"])
        return SaveResult(success=False, errors={"user": {c.CONF_THERMOSTAT_TYPE: "invalid"}})
    return await _walk(manager, first["flow_id"], menu, draft)
