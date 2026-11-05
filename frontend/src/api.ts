// Typed wrappers around the panel's websocket commands (custom_components/.../ws_api.py).

export type Infos = Record<string, any>;

export interface HaFormField {
  name: string;
  required?: boolean;
  optional?: boolean;
  default?: unknown;
  selector?: Record<string, any>;
  type?: string;
  [key: string]: unknown;
}

export interface FieldDesc {
  schema: HaFormField;
  /** VT flow step: translation key and where VT reports errors. */
  step: string;
  /** Value comes from the central configuration (read-only here). */
  inherited: boolean;
}

export type Level = "essential" | "common" | "advanced";

export interface GroupControl {
  type: "feature" | "central";
  key: string;
  /** A feature group that can also take its settings from the central configuration. */
  central?: string;
}

export interface LayoutGroup {
  id: string;
  control: GroupControl | null;
  fields: { key: string; level: Level }[];
  /** Only for these thermostat types (null: all). */
  types?: string[] | null;
}

export interface LayoutCard {
  id: string;
  control?: GroupControl;
  /** A choice between alternative sets of fields (window: sensor or temperature drop). */
  method?: { feature?: string; options: Record<string, string[]> };
  groups: LayoutGroup[];
}

export interface Layout {
  fields: Record<string, FieldDesc>;
  central_values: Infos;
  central_exists: boolean;
  central_entry_id: string | null;
  placeholders: Record<string, string>;
  layout: { cards: LayoutCard[]; control_keys: string[]; derived_flags: Record<string, string> };
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
