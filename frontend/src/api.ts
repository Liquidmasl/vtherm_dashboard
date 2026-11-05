// Typed wrappers around the panel's websocket commands (custom_components/.../ws_api.py).

export type Infos = Record<string, any>;

export interface HaFormField {
  name: string;
  required?: boolean;
  default?: unknown;
  selector?: Record<string, any>;
  type?: string;
  [key: string]: unknown;
}

export interface SectionDesc {
  step: string;
  parent: string | null;
  schema: HaFormField[];
  central_toggle?: string;
  spec_schema?: HaFormField[];
  central_values?: Infos;
}

export interface Layout {
  sections: SectionDesc[];
  central_exists: boolean;
  placeholders: Record<string, string>;
}

export interface EntrySummary {
  entry_id: string;
  title: string;
  thermostat_type: string;
  climate_entity_id: string | null;
  underlying_count: number;
  prop_function: string | null;
  loaded: boolean;
}

export interface SaveResult {
  success: boolean;
  entry_id: string | null;
  errors: Record<string, Record<string, string>>;
  incomplete: boolean;
}

const P = "vtherm_config_panel";

export const listEntries = (hass: any) =>
  hass.callWS({ type: `${P}/list` }) as Promise<{ entries: EntrySummary[]; thermostat_types: string[] }>;

export const getEntry = (hass: any, entry_id: string) =>
  hass.callWS({ type: `${P}/get`, entry_id }) as Promise<Layout & { title: string; data: Infos }>;

export const newDraft = (hass: any, thermostat_type: string) =>
  hass.callWS({ type: `${P}/new`, thermostat_type }) as Promise<Layout & { data: Infos }>;

export const describe = (hass: any, data: Infos) => hass.callWS({ type: `${P}/describe`, data }) as Promise<Layout>;

export const save = (hass: any, data: Infos, entry_id?: string) =>
  hass.callWS({ type: `${P}/save`, data, ...(entry_id ? { entry_id } : {}) }) as Promise<SaveResult>;
