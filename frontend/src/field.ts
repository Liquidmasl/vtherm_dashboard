import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { HaFormField } from "./api";
import { DIAGRAM_VIEWBOX, diagramBody } from "./diagrams";
import { diagramText, ui } from "./i18n";

/** HA selector config for a serialized VT schema field (plain vol types have no selector). */
export function selectorFor(schema: HaFormField): Record<string, any> {
  if (schema.selector) return schema.selector;
  switch (schema.type) {
    case "boolean":
      return { boolean: {} };
    case "integer":
      return { number: { mode: "box", step: 1 } };
    case "float":
      return { number: { mode: "box", step: "any" } };
    case "select":
      return { select: { options: ((schema.options as [string, string][]) ?? []).map(([value, label]) => ({ value, label })) } };
    default:
      return { text: {} };
  }
}

export const isBoolean = (schema: HaFormField) => "boolean" in selectorFor(schema);

/** Inputs that hold lists (several entities, command lists) need a full row. */
export const isWide = (schema: HaFormField) => {
  const sel = selectorFor(schema);
  const conf = Object.values(sel)[0] as Record<string, unknown> | null;
  return !!conf && conf.multiple === true;
};

/** One setting: label, a short hint under the input, and an (i) with the longer explanation and an optional diagram. */
@customElement("vt-field")
export class VtField extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ attribute: false }) schema!: HaFormField;
  @property({ attribute: false }) value: unknown;
  @property() label = "";
  @property() hint = "";
  @property() info = "";
  @property() diagram?: string;
  @property() error = "";
  @property({ type: Boolean }) disabled = false;
  @property({ attribute: false }) localizeValue?: (key: string) => string;

  private emit(value: unknown) {
    this.dispatchEvent(new CustomEvent("field-changed", { detail: { key: this.schema.name, value }, bubbles: true, composed: true }));
  }

  /** Open the popover towards the side with room, so it never runs off the screen. */
  private place(e: Event) {
    const el = e.currentTarget as HTMLElement;
    el.classList.toggle("flip", el.getBoundingClientRect().left > window.innerWidth - 340);
  }

  private infoButton() {
    const body = diagramBody(this.diagram);
    if (!this.info && !body) return nothing;
    const dt = diagramText(this.diagram ?? "");
    return html`<span class="info" tabindex="0" aria-label=${ui("more_info")} @mouseenter=${this.place} @focus=${this.place}>
      <ha-icon icon="mdi:information-outline"></ha-icon>
      <span class="tip" role="tooltip">
        ${body
          ? html`<span class="diagram">
              ${dt ? html`<span class="dtitle">${dt.title}</span>` : nothing}
              <svg viewBox=${DIAGRAM_VIEWBOX} width="100%" role="img" aria-label=${dt?.caption ?? ""}>${body}</svg>
            </span>`
          : nothing}
        ${this.info ? html`<span class="text">${this.info}</span>` : nothing}
      </span>
    </span>`;
  }

  render() {
    const required = !!this.schema.required;
    if (isBoolean(this.schema)) {
      return html`<label class="bool ${this.disabled ? "disabled" : ""}">
          <span class="label">${this.label}${this.infoButton()}</span>
          <ha-switch .checked=${!!this.value} .disabled=${this.disabled} @change=${(e: any) => this.emit(e.target.checked)}></ha-switch>
        </label>
        ${this.hint ? html`<div class="hint">${this.hint}</div>` : nothing}
        ${this.error ? html`<div class="error">${this.error}</div>` : nothing}`;
    }
    return html`
      <div class="head"><span class="label">${this.label}${required ? html`<span class="req">*</span>` : nothing}</span>${this.infoButton()}</div>
      <ha-selector
        .hass=${this.hass}
        .selector=${selectorFor(this.schema)}
        .value=${this.value}
        .required=${required}
        .disabled=${this.disabled}
        .localizeValue=${this.localizeValue}
        .helper=${this.hint}
        @value-changed=${(e: CustomEvent) => {
          e.stopPropagation();
          this.emit(e.detail.value);
        }}
      ></ha-selector>
      ${this.error ? html`<div class="error">${this.error}</div>` : nothing}
    `;
  }

  static styles = css`
    :host { display: block; }
    .head { display: flex; align-items: center; gap: 4px; margin-bottom: 4px; }
    .label { font-size: 14px; color: var(--primary-text-color); display: inline-flex; align-items: center; gap: 4px; }
    .req { color: var(--secondary-text-color); margin-left: 2px; }
    .bool { display: flex; align-items: center; justify-content: space-between; gap: 16px; min-height: 40px; cursor: pointer; }
    .bool.disabled { cursor: default; opacity: 0.8; }
    .info { position: relative; display: inline-flex; color: var(--secondary-text-color); --mdc-icon-size: 16px; cursor: help; outline: none; }
    .info:focus-visible ha-icon { color: var(--primary-color); }
    .tip {
      display: none; position: absolute; left: -12px; bottom: calc(100% + 6px);
      width: 300px; max-width: 80vw; padding: 10px 12px; border-radius: 8px; z-index: 10; flex-direction: column; gap: 8px;
      background: var(--card-background-color, #222); color: var(--primary-text-color);
      border: 1px solid var(--divider-color); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      font-size: 13px; line-height: 1.4; white-space: pre-line; pointer-events: none;
    }
    .info:hover .tip, .info:focus .tip { display: flex; }
    .info.flip .tip { left: auto; right: -12px; }
    .diagram { display: flex; flex-direction: column; gap: 4px; padding: 8px; border-radius: 6px; background: var(--secondary-background-color); }
    .dtitle { font-size: 12px; font-weight: 500; color: var(--secondary-text-color); }
    .hint { font-size: 12px; color: var(--secondary-text-color); margin: -4px 0 8px; line-height: 1.35; }
    .error { color: var(--error-color); font-size: 12px; margin-top: 4px; }
  `;
}
