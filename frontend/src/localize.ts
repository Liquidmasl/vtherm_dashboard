// Labels come from Versatile Thermostat's own translations (the ones its config flow uses),
// so every language VT ships works here without extra strings.

const VT = "component.versatile_thermostat";

export async function loadVtTranslations(hass: any): Promise<void> {
  await Promise.all([
    hass.loadBackendTranslation("config", "versatile_thermostat"),
    hass.loadBackendTranslation("selector", "versatile_thermostat"),
  ]);
}

type Placeholders = Record<string, string>;

function t(hass: any, key: string, placeholders?: Placeholders): string {
  return hass.localize(`${VT}.${key}`, placeholders) || "";
}

export const stepTitle = (hass: any, step: string, p?: Placeholders) => t(hass, `config.step.${step}.title`, p) || step;
export const stepDescription = (hass: any, step: string, p?: Placeholders) => t(hass, `config.step.${step}.description`, p);
export const fieldLabel = (hass: any, step: string, name: string, p?: Placeholders) =>
  t(hass, `config.step.${step}.data.${name}`, p) || name;
export const fieldHelper = (hass: any, step: string, name: string, p?: Placeholders) =>
  t(hass, `config.step.${step}.data_description.${name}`, p);
export const errorText = (hass: any, code: string) =>
  t(hass, `config.error.${code}`) || t(hass, `options.error.${code}`) || code;
export const thermostatTypeLabel = (hass: any, type: string) => t(hass, `selector.thermostat_type.options.${type}`) || type;
export const localizeSelectorValue = (hass: any) => (key: string) => t(hass, `selector.${key}`);
