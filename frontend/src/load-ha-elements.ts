/**
 * HA only defines <ha-form> and the selector elements once a page that uses them has been
 * lazy-loaded. A custom panel is not such a page, so we load the config panel's automation
 * route once, which pulls them in. Not an official API: re-check on HA frontend upgrades.
 */
export async function loadHaFormElements(): Promise<void> {
  if (customElements.get("ha-form") && customElements.get("ha-selector")) return;

  await customElements.whenDefined("partial-panel-resolver");
  const resolver = document.createElement("partial-panel-resolver") as any;
  resolver.hass = { panels: [{ url_path: "tmp", component_name: "config" }] };
  resolver._updateRoutes();
  await resolver.routerOptions.routes.tmp.load();

  await customElements.whenDefined("ha-panel-config");
  const configPanel = document.createElement("ha-panel-config") as any;
  await configPanel.routerOptions.routes.automation.load();

  await customElements.whenDefined("ha-form");
}
