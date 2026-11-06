// Regenerates the README screenshots into docs/images from the dev HA (demo VTherms required).
// Usage: node dev/e2e/screenshots.mjs
import { chromium } from "playwright";
import { login, BASE } from "./login.mjs";

const OUT = new URL("../../docs/images/", import.meta.url).pathname;
const browser = await chromium.launch();

async function open(path, { width = 1280, height = 900, lang } = {}) {
  const page = await browser.newPage({ viewport: { width, height }, colorScheme: "dark", deviceScaleFactor: 2 });
  if (lang) await page.addInitScript((l) => localStorage.setItem("selectedLanguage", JSON.stringify(l)), lang);
  await login(page);
  await page.goto(`${BASE}${path}`);
  const editor = page.locator("vtherm-editor");
  if (!path.includes("new=choose")) await editor.locator("vt-field").first().waitFor();
  await page.waitForTimeout(3500);
  return { page, editor };
}

/** Hover a field's (i) and capture the field together with its popover. */
async function tooltip(path, cardId, label, file, { openAdvanced = false } = {}) {
  const { page, editor } = await open(path);
  const card = editor.locator(`#card-${cardId}`);
  if (openAdvanced) for (const s of await card.locator("details.adv > summary").all()) await s.click();
  const field = card.locator("vt-field", { hasText: label }).first();
  await field.scrollIntoViewIfNeeded();
  await page.mouse.wheel(0, -320);
  await page.waitForTimeout(300);
  await field.locator(".info").first().hover();
  await page.waitForTimeout(400);
  const boxes = [await field.boundingBox(), await field.locator(".tip").first().boundingBox()].filter(Boolean);
  const x = Math.min(...boxes.map((b) => b.x)) - 16, y = Math.min(...boxes.map((b) => b.y)) - 16;
  const r = Math.max(...boxes.map((b) => b.x + b.width)) + 16, b = Math.max(...boxes.map((b) => b.y + b.height)) + 16;
  await page.screenshot({ path: OUT + file, clip: { x, y, width: r - x, height: b - y } });
  await page.close();
}

async function card(path, cardId, file, opts) {
  const { page, editor } = await open(path, opts);
  await editor.locator(`#card-${cardId}`).screenshot({ path: OUT + file });
  await page.close();
}

async function view(path, file, opts) {
  const { page } = await open(path, opts);
  await page.screenshot({ path: OUT + file });
  await page.close();
}

const ids = await (async () => {
  const { page } = await open("/vtherm-config");
  const list = await page.evaluate(() => document.querySelector("home-assistant").hass.callWS({ type: "vtherm_config_panel/list" }));
  await page.close();
  return Object.fromEntries(list.entries.map((e) => [e.title, e.entry_id]));
})();
const at = (title) => `/vtherm-config?entry=${ids[title]}`;

await view(at("Bathroom"), "overview.png");
await view("/vtherm-config?new=choose", "new-thermostat.png");
await tooltip(at("Bedroom"), "devices", "Treat as closed", "tooltip-valve-curve.png", { openAdvanced: true });
await tooltip(at("Bedroom"), "devices", "Smallest opening change", "tooltip-send-threshold.png");
await tooltip(at("Bathroom"), "heating", "Cycle length", "tooltip-tpi-cycle.png");
await tooltip(at("Bathroom"), "heating", "Room gap factor", "tooltip-tpi-formula.png");
await card(at("Bathroom"), "window", "card-window.png");
await card(at("Living room"), "room", "card-room-inherited.png");
await card(at("Central configuration"), "presets", "card-presets.png");
await card(at("Living room"), "correction", "card-setpoint-correction.png");
await card(at("Bathroom"), "window", "card-window-fr.png", { lang: "fr" });
await view(at("Bathroom"), "phone.png", { width: 400, height: 860 });

await browser.close();
console.log("written to", OUT);
