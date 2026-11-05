// Shared helper: log a Playwright page into the dev HA as dev/dev.
export const BASE = process.env.HA_URL ?? "http://localhost:8124";

export async function login(page) {
  await page.goto(`${BASE}/`);
  await page.locator('input[name="username"]').fill("dev");
  await page.locator('input[name="password"]').fill("dev");
  await page.keyboard.press("Enter");
  await page.waitForURL(/lovelace|home|dashboard|energy/, { timeout: 30000 });
}
