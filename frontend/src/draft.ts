// Pure helpers for the draft configuration being edited.
import type { HaFormField, Infos, SectionDesc } from "./api";

const isEmpty = (v: unknown) => v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);

/** Whether the spec (non-central) part of a section is editable for this draft. */
export const usesOwnSettings = (section: SectionDesc, data: Infos) =>
  !!section.spec_schema && (!section.central_toggle || data[section.central_toggle] === false);

/** Fields the user edits for a section: its schema, plus the spec schema when not inherited. */
export function editableFields(section: SectionDesc, data: Infos): HaFormField[] {
  return usesOwnSettings(section, data) ? [...section.schema, ...section.spec_schema!] : section.schema;
}

/**
 * Fill schema defaults for keys the draft does not have yet, like HA's flow dialog does
 * when it opens a form. Returns the same object when nothing changed.
 */
export function withDefaults(data: Infos, sections: SectionDesc[]): Infos {
  let out = data;
  for (const section of sections) {
    for (const field of editableFields(section, data)) {
      if (field.default !== undefined && out[field.name] === undefined) {
        if (out === data) out = { ...data };
        out[field.name] = field.default;
      }
    }
  }
  return out;
}

/** Required fields without a value, per section step. */
export function missingRequired(data: Infos, sections: SectionDesc[]): Record<string, string[]> {
  const missing: Record<string, string[]> = {};
  for (const section of sections) {
    const names = editableFields(section, data)
      .filter((f) => f.required && isEmpty(data[f.name]))
      .map((f) => f.name);
    if (names.length) missing[section.step] = names;
  }
  return missing;
}
