// The panel's own texts (English and French; VT's author writes French). Field texts fall back
// to VT's translations for languages and fields not covered here.
import en from "./i18n/en.json";
import fr from "./i18n/fr.json";

type Texts = typeof en;
export interface FieldText {
  label?: string;
  hint?: string;
  info?: string;
  diagram?: string;
}

const LANGS: Record<string, Texts> = { en, fr: fr as Texts };
let texts: Texts = en;
let haLanguage = "en";

/** Pick the language from HA's (fr, fr-BE, … → fr); everything else uses English. */
export function setLanguage(language: string | undefined) {
  haLanguage = (language ?? "en").split("-")[0];
  texts = LANGS[haLanguage] ?? en;
}

/** True when the panel has its own field texts for the HA language (otherwise VT's are used). */
export const hasOwnFieldTexts = () => haLanguage in LANGS;

const fill = (s: string, vars?: Record<string, string | number>) =>
  vars ? s.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`)) : s;

export const ui = (key: keyof Texts["ui"], vars?: Record<string, string | number>) => fill(texts.ui[key] ?? en.ui[key], vars);
export const cardText = (id: string) => (texts.cards as any)[id] ?? (en.cards as any)[id] ?? en.cards.other;
export const groupTitle = (id: string): string | undefined => (texts.groups as any)[id] ?? (en.groups as any)[id];
export const typeText = (type: string) => (texts.types as any)[type] ?? (en.types as any)[type];
export const windowText = (key: keyof Texts["window"]) => texts.window[key] ?? en.window[key];
export const presetText = (key: keyof Texts["presets"]) => texts.presets[key] ?? en.presets[key];
export const live = (key: string, vars?: Record<string, string | number>) =>
  fill((texts.live as Record<string, string>)[key] ?? (en.live as Record<string, string>)[key] ?? key, vars);
export const diagramText = (id: string): { title: string; caption: string } | undefined =>
  (texts.diagrams as any)[id] ?? (en.diagrams as any)[id];

/** Panel texts for a field, type-specific first (key@thermostat_type). Undefined in unsupported languages. */
export function fieldText(key: string, thermostatType?: string): FieldText | undefined {
  if (!hasOwnFieldTexts()) return undefined;
  const f = texts.fields as Record<string, FieldText>;
  return (thermostatType && f[`${key}@${thermostatType}`]) || f[key];
}
