// Send one websocket command to the dev HA and print the result.
// Usage: node dev/ws.mjs '{"type":"vtherm_config_panel/list"}'
// Uses a long-lived token in dev/.llat, created on first use from onboard.py's dev/.token.
import { readFileSync, writeFileSync, existsSync } from "node:fs";

const URL = (process.env.HA_URL ?? "http://localhost:8124").replace(/^http/, "ws") + "/api/websocket";
const dir = new globalThis.URL(".", import.meta.url).pathname;

function connect(token) {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(URL);
    let id = 0;
    const pending = new Map();
    ws.onmessage = (ev) => {
      const msg = JSON.parse(ev.data);
      if (msg.type === "auth_required") ws.send(JSON.stringify({ type: "auth", access_token: token }));
      else if (msg.type === "auth_ok") resolve({ call: (m) => new Promise((r) => { pending.set(++id, r); ws.send(JSON.stringify({ ...m, id })); }), close: () => ws.close() });
      else if (msg.type === "auth_invalid") reject(new Error("auth_invalid"));
      else if (msg.type === "result") pending.get(msg.id)?.(msg);
    };
    ws.onerror = reject;
  });
}

let llat = existsSync(dir + ".llat") ? readFileSync(dir + ".llat", "utf8").trim() : null;
if (!llat) {
  const c = await connect(readFileSync(dir + ".token", "utf8").trim());
  const r = await c.call({ type: "auth/long_lived_access_token", client_name: "vtherm-config-panel-dev", lifespan: 3650 });
  llat = r.result;
  writeFileSync(dir + ".llat", llat);
  c.close();
}
const c = await connect(llat);
const r = await c.call(JSON.parse(process.argv[2]));
console.log(JSON.stringify(r.success ? r.result : r.error, null, 2));
c.close();
