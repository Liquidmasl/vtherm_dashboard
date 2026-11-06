// Usage: node dev/e2e/shot.mjs <path> <out.png> [width] [fullPage=1]
import { chromium } from "playwright";
import { login, BASE } from "./login.mjs";

const [path = "/vtherm-dashboard", out = "shot.png", width = "1280", full = "1"] = process.argv.slice(2);
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(width), height: 900 }, colorScheme: "dark" });
page.on("console", (m) => m.type() === "error" && console.log("console:", m.text().split("\n")[0]));
page.on("pageerror", (e) => console.log("pageerror:", e.message));
await login(page);
await page.goto(`${BASE}${path}`);
await page.waitForTimeout(4000);
await page.screenshot({ path: out, fullPage: full === "1" });
await browser.close();
