import { LitElement, html, css, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { describe, getEntry, newDraft, save, type HaFormField, type Infos, type Layout, type SectionDesc } from "./api";
import { missingRequired, usesOwnSettings, withDefaults } from "./draft";
import { errorText, fieldHelper, fieldLabel, localizeSelectorValue, stepDescription, stepTitle, thermostatTypeLabel } from "./localize";

/** Edits one VTherm (or creates one when `newType` is set) on a single page. */
@customElement("vtherm-editor")
export class VThermEditor extends LitElement {
  @property({ attribute: false }) hass: any;
  @property() entryId?: string;
  @property() newType?: string;
  @property({ type: Boolean }) narrow = false;

  @state() private heading = "";
  @state() private data: Infos = {};
  @state() private sections: SectionDesc[] = [];
  @state() private placeholders: Record<string, string> = {};
  @state() private dirty = false;
  @state() private saving = false;
  @state() private errors: Record<string, Record<string, string>> = {};
  @state() private banner?: { type: "error" | "success" | "warning"; text: string };
  @state() private loadError?: string;

  private describeSeq = 0;

  protected willUpdate(changed: PropertyValues<this>) {
    if ((changed.has("entryId") || changed.has("newType")) && this.hass) this.load();
  }

  private async load() {
    this.loadError = undefined;
    this.banner = undefined;
    this.errors = {};
    this.dirty = false;
    try {
      if (this.entryId) {
        const res = await getEntry(this.hass, this.entryId);
        this.heading = res.title;
        await this.applyLayout(res.data, res);
      } else if (this.newType) {
        const res = await newDraft(this.hass, this.newType);
        this.heading = thermostatTypeLabel(this.hass, this.newType);
        await this.applyLayout(res.data, res);
      }
    } catch (err: any) {
      this.loadError = err?.message ?? String(err);
    }
  }

  /** Fill defaults for newly visible fields; defaults can reveal sections, so re-describe until stable. */
  private async applyLayout(data: Infos, layout: Layout) {
    for (let i = 0; i < 4; i++) {
      const filled = withDefaults(data, layout.sections);
      if (filled === data) break;
      data = filled;
      layout = await describe(this.hass, data);
    }
    this.data = data;
    this.sections = layout.sections;
    this.placeholders = layout.placeholders;
  }

  private async onChange(value: Infos) {
    this.data = value;
    this.dirty = true;
    const seq = ++this.describeSeq;
    const layout = await describe(this.hass, value);
    if (seq !== this.describeSeq) return; // a newer change is in flight
    await this.applyLayout(this.data, layout);
  }

  private async onSave() {
    this.saving = true;
    this.banner = undefined;
    this.errors = {};
    try {
      const res = await save(this.hass, this.data, this.entryId);
      if (res.success) {
        this.dirty = false;
        this.banner = { type: "success", text: "Saved. The thermostat has been reloaded." };
        if (!this.entryId && res.entry_id) {
          this.dispatchEvent(new CustomEvent("vtherm-created", { detail: { entryId: res.entry_id }, bubbles: true, composed: true }));
        }
      } else if (res.incomplete) {
        this.banner = { type: "warning", text: "Not saved: the configuration is not complete yet. Fill the fields marked as missing." };
      } else {
        this.errors = res.errors;
        const step = Object.keys(res.errors)[0];
        this.banner = { type: "error", text: `Not saved: check “${stepTitle(this.hass, step)}”.` };
        this.updateComplete.then(() => this.renderRoot.querySelector(`#section-${step}`)?.scrollIntoView({ behavior: "smooth" }));
      }
    } catch (err: any) {
      this.banner = { type: "error", text: err?.message ?? String(err) };
    } finally {
      this.saving = false;
    }
  }

  private back() {
    this.dispatchEvent(new CustomEvent("vtherm-back", { bubbles: true, composed: true }));
  }

  render() {
    if (this.loadError) return html`<ha-alert alert-type="error">${this.loadError}</ha-alert>`;
    if (!this.sections.length) return html`<div class="loading"><ha-spinner></ha-spinner></div>`;

    const missing = missingRequired(this.data, this.sections);
    const missingCount = Object.values(missing).reduce((n, l) => n + l.length, 0);
    const topLevel = this.sections.filter((s) => !s.parent);

    return html`
      <div class="toolbar">
        <ha-icon-button-arrow-prev @click=${this.back}></ha-icon-button-arrow-prev>
        <div class="title">
          <div class="name">${this.data.name || this.heading}</div>
          <div class="sub">${thermostatTypeLabel(this.hass, this.data.thermostat_type)}${this.entryId ? "" : " · new"}</div>
        </div>
        ${missingCount ? html`<span class="badge warn">${missingCount} missing</span>` : nothing}
        ${this.dirty ? html`<span class="badge">unsaved</span>` : nothing}
        <ha-button .disabled=${this.saving || (!this.dirty && !!this.entryId)} @click=${this.onSave}>
          ${this.entryId ? "Save" : "Create"}
        </ha-button>
      </div>
      <div class="content">
        ${this.banner ? html`<ha-alert alert-type=${this.banner.type}>${this.banner.text}</ha-alert>` : nothing}
        <nav class="index">
          ${topLevel.map(
            (s) => html`<a href="#section-${s.step}" @click=${(e: Event) => this.jump(e, s.step)} class=${missing[s.step] || this.errors[s.step] ? "warn" : ""}
              >${stepTitle(this.hass, s.step)}</a
            >`,
          )}
        </nav>
        ${topLevel.map((s) => this.renderSection(s, missing))}
      </div>
    `;
  }

  private jump(e: Event, step: string) {
    e.preventDefault();
    this.renderRoot.querySelector(`#section-${step}`)?.scrollIntoView({ behavior: "smooth" });
  }

  private renderSection(section: SectionDesc, missing: Record<string, string[]>) {
    const children = this.sections.filter((s) => s.parent === section.step);
    const description = stepDescription(this.hass, section.step, this.placeholders);
    return html`
      <ha-card id="section-${section.step}" outlined>
        <div class="card-header">
          <h2>${stepTitle(this.hass, section.step)}</h2>
          ${missing[section.step] ? html`<span class="badge warn">${missing[section.step].length} missing</span>` : nothing}
        </div>
        <div class="card-content">
          ${description ? html`<p class="description">${description}</p>` : nothing}
          ${this.renderErrors(section.step)} ${this.form(section.step, section.schema)} ${this.renderSpec(section)}
          ${children.map(
            (child) => html`
              <div class="subsection" id="section-${child.step}">
                <h3>${stepTitle(this.hass, child.step)}</h3>
                ${this.renderErrors(child.step)} ${this.form(child.step, child.schema)}
              </div>
            `,
          )}
        </div>
      </ha-card>
    `;
  }

  private renderSpec(section: SectionDesc) {
    if (!section.spec_schema) return nothing;
    if (usesOwnSettings(section, this.data)) return this.form(section.step, section.spec_schema);
    if (!section.central_values) return nothing;
    return html`
      <div class="inherited">
        <div class="inherited-label"><ha-icon icon="mdi:link-variant"></ha-icon> Inherited from the central configuration</div>
        ${this.form(section.step, section.spec_schema, section.central_values, true)}
      </div>
    `;
  }

  private renderErrors(step: string) {
    const base = this.errors[step]?.base;
    return base ? html`<ha-alert alert-type="error">${errorText(this.hass, base)}</ha-alert>` : nothing;
  }

  private form(step: string, schema: HaFormField[], data: Infos = this.data, disabled = false) {
    const fieldErrors = Object.fromEntries(
      Object.entries(this.errors[step] ?? {})
        .filter(([k]) => k !== "base")
        .map(([k, code]) => [k, errorText(this.hass, code)]),
    );
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .disabled=${disabled}
        .error=${fieldErrors}
        .computeLabel=${(f: HaFormField) => fieldLabel(this.hass, step, f.name, this.placeholders)}
        .computeHelper=${(f: HaFormField) => fieldHelper(this.hass, step, f.name, this.placeholders)}
        .localizeValue=${localizeSelectorValue(this.hass)}
        @value-changed=${disabled ? undefined : (e: CustomEvent) => this.onChange(e.detail.value)}
      ></ha-form>
    `;
  }

  static styles = css`
    :host { display: block; }
    .loading { display: flex; justify-content: center; padding: 64px; }
    .toolbar {
      position: sticky; top: 0; z-index: 2; display: flex; align-items: center; gap: 12px;
      padding: 8px 16px; background: var(--app-header-background-color, var(--primary-background-color));
      border-bottom: 1px solid var(--divider-color);
    }
    .title { flex: 1; min-width: 0; }
    .name { font-size: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sub { color: var(--secondary-text-color); font-size: 13px; }
    .badge { font-size: 12px; padding: 2px 8px; border-radius: 10px; background: var(--secondary-background-color); color: var(--secondary-text-color); white-space: nowrap; }
    .badge.warn { background: rgba(var(--rgb-warning-color, 255, 166, 0), 0.2); color: var(--warning-color); }
    .content { max-width: 960px; margin: 0 auto; padding: 16px; display: flex; flex-direction: column; gap: 16px; }
    .index { display: flex; flex-wrap: wrap; gap: 6px 14px; font-size: 14px; }
    .index a { color: var(--primary-color); text-decoration: none; }
    .index a.warn { color: var(--warning-color); }
    ha-card { scroll-margin-top: 72px; }
    .card-header { display: flex; align-items: center; gap: 12px; padding: 16px 16px 0; }
    .card-header h2 { margin: 0; font-size: 18px; font-weight: 500; flex: 1; }
    .card-content { padding: 8px 16px 16px; display: flex; flex-direction: column; gap: 12px; }
    .description { margin: 0; color: var(--secondary-text-color); font-size: 14px; white-space: pre-line; }
    .inherited { border-left: 3px solid var(--divider-color); padding-left: 12px; opacity: 0.75; }
    .inherited-label { display: flex; align-items: center; gap: 6px; color: var(--secondary-text-color); font-size: 13px; margin-bottom: 8px; --mdc-icon-size: 18px; }
    .subsection { border-top: 1px solid var(--divider-color); padding-top: 12px; scroll-margin-top: 72px; }
    .subsection h3 { margin: 0 0 8px; font-size: 15px; font-weight: 500; }
  `;
}
