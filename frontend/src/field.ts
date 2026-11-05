import { LitElement, html, css, nothing } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { HaFormField } from "./api";

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

/** One setting: label, (i) with VT's help text, and HA's own input for its type. */
@customElement("vt-field")
export class VtField extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ attribute: false }) schema!: HaFormField;
  @property({ attribute: false }) value: unknown;
  @property() label = "";
  @property() helper = "";
  @property() error = "";
  @property({ type: Boolean }) disabled = false;
  @property({ attribute: false }) localizeValue?: (key: string) => string;

  private emit(value: unknown) {
    this.dispatchEvent(new CustomEvent("field-changed", { detail: { key: this.schema.name, value }, bubbles: true, composed: true }));
  }

  private info() {
    if (!this.helper) return nothing;
    return html`<span class="info" tabindex="0" aria-label=${this.helper}
      ><ha-icon icon="mdi:information-outline"></ha-icon><span class="tip" role="tooltip">${this.helper}</span></span
    >`;
  }

  render() {
    const required = !!this.schema.required;
    if (isBoolean(this.schema)) {
      return html`<label class="bool ${this.disabled ? "disabled" : ""}">
          <span class="label">${this.label}${this.info()}</span>
          <ha-switch .checked=${!!this.value} .disabled=${this.disabled} @change=${(e: any) => this.emit(e.target.checked)}></ha-switch>
        </label>
        ${this.error ? html`<div class="error">${this.error}</div>` : nothing}`;
    }
    return html`
      <div class="head"><span class="label">${this.label}${required ? html`<span class="req">*</span>` : nothing}</span>${this.info()}</div>
      <ha-selector
        .hass=${this.hass}
        .selector=${selectorFor(this.schema)}
        .value=${this.value}
        .required=${required}
        .disabled=${this.disabled}
        .localizeValue=${this.localizeValue}
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
      display: none; position: absolute; left: 50%; bottom: calc(100% + 6px); transform: translateX(-50%);
      width: max-content; max-width: 300px; padding: 8px 10px; border-radius: 6px; z-index: 10;
      background: var(--card-background-color, #222); color: var(--primary-text-color);
      border: 1px solid var(--divider-color); box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      font-size: 13px; line-height: 1.4; white-space: pre-line; pointer-events: none;
    }
    .info:hover .tip, .info:focus .tip { display: block; }
    .error { color: var(--error-color); font-size: 12px; margin-top: 4px; }
  `;
}
