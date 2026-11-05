// End-to-end: create an over_climate VTherm in the panel, then edit it and check VT reloaded it.
// Entity pickers are filled through the editor's change() (what the field components call);
// the name is typed for real.
import { chromium } from "playwright";
import { login, BASE } from "./login.mjs";

const out = process.argv[2];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: "dark" });
page.on("pageerror", (e) => console.log("pageerror:", e.message));
const ok = (cond, msg) => { console.log(`${cond ? "✓" : "✗"} ${msg}`); if (!cond) process.exitCode = 1; };

await login(page);
await page.goto(`${BASE}/vtherm-config?new=thermostat_over_climate`);
const editor = page.locator("vtherm-editor");
await editor.locator("vt-field").first().waitFor();
await page.waitForTimeout(4000); // HA's launch screen fades out after the panel renders

const name = `E2E climate ${Date.now() % 10000}`;
await editor.locator('vt-field input').first().fill(name);
await page.waitForTimeout(500);
await editor.evaluate((ed) =>
  ed.change({ temperature_sensor_entity_id: "input_number.fake_temperature_sensor1", underlying_entity_ids: ["climate.underlying_thermostat1"] }),
);
await page.waitForTimeout(1000);
ok((await editor.locator(".toolbar .chip.warn").count()) === 0, "no missing fields after filling required ones");
if (out) await page.screenshot({ path: `${out}-1-filled.png` });

await editor.getByRole("button", { name: "Create" }).click();
await page.waitForURL(/\?entry=/, { timeout: 15000 });
ok(true, "created and navigated to the new entry");
await editor.locator("vt-field").first().waitFor();
await page.waitForTimeout(1500);
const entryId = new URL(page.url()).searchParams.get("entry");

const states = await page.evaluate(() => document.querySelector("home-assistant").hass.states);
const climate = Object.values(states).find((s) => s.entity_id.startsWith("climate.") && s.attributes.friendly_name === name);
ok(!!climate, `climate entity exists for "${name}"`);

// Edit through the real controls: override the central window behaviour, then sensor and delay.
await editor.locator("#card-window .override ha-switch").click();
await page.waitForTimeout(800);
ok((await editor.locator("#card-window vt-field").count()) > 2, "window card shows own fields after overriding central");
await editor.evaluate((ed) => ed.change({ window_sensor_entity_id: "input_boolean.fake_window_sensor1", window_delay: 77 }));
await page.waitForTimeout(1000);
await editor.getByRole("button", { name: "Save" }).click();
await editor.locator('ha-alert[alert-type="success"]').waitFor({ timeout: 15000 });
ok(true, "edit saved");
if (out) await page.screenshot({ path: `${out}-2-saved.png` });

// Reload the page: the saved value must come back from VT's stored config.
await page.goto(`${BASE}/vtherm-config?entry=${entryId}`);
await editor.locator("vt-field").first().waitFor();
await page.waitForTimeout(1500);
const data = await editor.evaluate((ed) => ed.data);
ok(data.window_delay === 77 && data.use_window_central_config === false, "window settings persisted after reload");

// Clean up: remove the VTherm this run created.
await page.evaluate((id) => document.querySelector("home-assistant").hass.callApi("DELETE", `config/config_entries/entry/${id}`), entryId);
ok(true, "test VTherm removed");

await browser.close();
