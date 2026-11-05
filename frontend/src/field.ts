import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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

const kind = (schema: HaFormField) => Object.keys(selectorFor(schema))[0];
const conf = (schema: HaFormField) => (Object.values(selectorFor(schema))[0] ?? {}) as Record<string, any>;

export const isBoolean = (schema: HaFormField) => kind(schema) === "boolean";

/** Inputs that hold lists (several entities, command lists) need a full row. */
export const isWide = (schema: HaFormField) => conf(schema).multiple === true;

const asList = (v: unknown): string[] => (Array.isArray(v) ? v : v ? [String(v)] : []);
const domains = (schema: HaFormField): string[] => asList(conf(schema).domain);

/**
 * One setting: label, (i) with the longer explanation and an optional diagram, a compact input,
 * and a short hint. Numbers, text, dropdowns, toggles and entity pickers are plain compact
 * controls styled with HA's theme; anything else falls back to HA's own selector.
 */
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
  /** Entity field shows the friendly name until clicked, then the searchable input. */
  @state() private editing = false;

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
    // Inside a toggle's <label>, a click on (i) must not flip the toggle.
    return html`<span class="info" tabindex="0" aria-label=${ui("more_info")} @mouseenter=${this.place} @focus=${this.place} @click=${(e: Event) => e.preventDefault()}>
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
    const label = html`<span class="label">${this.label}${required && !isBoolean(this.schema) ? html`<span class="req">*</span>` : nothing}</span>`;
    if (isBoolean(this.schema)) {
      return html`<div class="tile bool">
        <label class="row ${this.disabled ? "disabled" : ""}">
          <ha-switch .checked=${!!this.value} .disabled=${this.disabled} @change=${(e: any) => this.emit(e.target.checked)}></ha-switch>
          <span class="label">${this.label}${this.infoButton()}</span>
        </label>
        ${this.hint ? html`<div class="hint">${this.hint}</div>` : nothing} ${this.renderError()}
      </div>`;
    }
    return html`<div class="tile ${this.error ? "has-error" : ""}">
      <div class="head">${label}${this.infoButton()}</div>
      ${this.control()} ${this.hint ? html`<div class="hint">${this.hint}</div>` : nothing} ${this.renderError()}
    </div>`;
  }

  private renderError() {
    return this.error ? html`<div class="error">${this.error}</div>` : nothing;
  }

  private control() {
    const c = conf(this.schema);
    switch (kind(this.schema)) {
      case "number":
        return this.numberInput(c);
      case "text":
        return c.multiple ? this.listInput() : this.textInput();
      case "select":
        return this.selectInput(c);
      case "entity":
        return c.multiple ? this.entityList() : this.entityInput();
      default:
        return html`<ha-selector
          .hass=${this.hass}
          .selector=${selectorFor(this.schema)}
          .value=${this.value}
          .disabled=${this.disabled}
          @value-changed=${(e: CustomEvent) => {
            e.stopPropagation();
            this.emit(e.detail.value);
          }}
        ></ha-selector>`;
    }
  }

  private numberInput(c: Record<string, any>) {
    const integer = this.schema.type === "integer";
    return html`<input
      class="in"
      type="number"
      inputmode="decimal"
      .value=${this.value === undefined || this.value === null ? "" : String(this.value)}
      step=${integer ? 1 : c.step && c.step !== "any" ? c.step : "any"}
      min=${c.min ?? ""}
      max=${c.max ?? ""}
      ?disabled=${this.disabled}
      @change=${(e: any) => {
        const raw = e.target.value;
        this.emit(raw === "" ? undefined : integer ? parseInt(raw, 10) : Number(raw));
      }}
    />`;
  }

  private textInput() {
    return html`<input
      class="in"
      type="text"
      .value=${(this.value as string) ?? ""}
      ?disabled=${this.disabled}
      @change=${(e: any) => this.emit(e.target.value === "" ? undefined : e.target.value)}
    />`;
  }

  private selectInput(c: Record<string, any>) {
    const options = (c.options ?? []).map((o: any) => (typeof o === "string" ? { value: o, label: o } : o));
    const labelOf = (o: { value: string; label: string }) =>
      (c.translation_key && this.localizeValue?.(`${c.translation_key}.options.${o.value}`)) || o.label;
    return html`<select class="in" ?disabled=${this.disabled} @change=${(e: any) => this.emit(e.target.value || undefined)}>
      ${this.schema.required ? nothing : html`<option value="" ?selected=${!this.value}>–</option>`}
      ${options.map((o: any) => html`<option value=${o.value} ?selected=${o.value === this.value}>${labelOf(o)}</option>`)}
    </select>`;
  }

  /** Entities this field accepts, for the autocomplete list. */
  private candidates(): string[] {
    const allowed = domains(this.schema);
    return Object.keys(this.hass.states)
      .filter((id) => !allowed.length || allowed.includes(id.split(".")[0]))
      .sort();
  }

  private friendly(id: string): string | undefined {
    return this.hass.states[id]?.attributes.friendly_name;
  }

  private datalist(listId: string) {
    return html`<datalist id=${listId}>
      ${this.candidates().map((id) => html`<option value=${id}>${this.friendly(id) ?? ""}</option>`)}
    </datalist>`;
  }

  private entityInput() {
    const value = (this.value as string) ?? "";
    const unknown = value && !this.hass.states[value];
    if (value && !unknown && !this.editing) {
      return html`<button class="in entity-shown" ?disabled=${this.disabled} title=${value} @click=${this.startEditing}>
        <span class="fname">${this.friendly(value) ?? value}</span><span class="eid">${value}</span>
      </button>`;
    }
    return html`<input
        class="in ${unknown ? "warn" : ""}"
        list="opts"
        .value=${value}
        placeholder=${domains(this.schema).join(", ")}
        ?disabled=${this.disabled}
        @change=${(e: any) => this.emit(e.target.value.trim() || undefined)}
        @blur=${() => (this.editing = false)}
      />
      ${this.datalist("opts")}`;
  }

  private async startEditing() {
    this.editing = true;
    await this.updateComplete;
    const input = this.renderRoot.querySelector("input") as HTMLInputElement | null;
    input?.focus();
    input?.select();
  }

  /** Several entities: chips (friendly name, remove) plus an input to add one. */
  private entityList() {
    const values = asList(this.value);
    return html`<div class="chips in">
        ${values.map(
          (id, i) => html`<span class="chip ${this.hass.states[id] ? "" : "warn"}" title=${id}
            >${this.friendly(id) ?? id}
            ${this.disabled
              ? nothing
              : html`<button aria-label="✕" @click=${() => this.emit(values.filter((_, j) => j !== i))}>✕</button>`}</span
          >`,
        )}
        ${this.disabled
          ? nothing
          : html`<input
              list="opts"
              placeholder="+ ${domains(this.schema).join(", ")}"
              @change=${(e: any) => {
                const id = e.target.value.trim();
                e.target.value = "";
                if (id && !values.includes(id)) this.emit([...values, id]);
              }}
            />`}
      </div>
      ${this.datalist("opts")}`;
  }

  /** Several text values (custom commands): chips plus an input to add one. */
  private listInput() {
    const values = asList(this.value);
    return html`<div class="chips in">
      ${values.map(
        (v, i) => html`<span class="chip mono"
          >${v}${this.disabled ? nothing : html`<button aria-label="✕" @click=${() => this.emit(values.filter((_, j) => j !== i))}>✕</button>`}</span
        >`,
      )}
      ${this.disabled
        ? nothing
        : html`<input
            placeholder="+"
            @change=${(e: any) => {
              const v = e.target.value.trim();
              e.target.value = "";
              if (v) this.emit([...values, v]);
            }}
          />`}
    </div>`;
  }

  static styles = css`
    :host { display: block; }
    .tile { position: relative; display: flex; flex-direction: column; gap: 5px; padding: 8px 10px; border-radius: 8px; background: var(--vt-tile, rgba(127, 127, 127, 0.07)); height: 100%; box-sizing: border-box; }
    .tile.has-error { box-shadow: inset 0 0 0 1px var(--error-color); }
    .head { display: flex; align-items: center; gap: 4px; }
    .label .info { margin-left: 4px; vertical-align: middle; }
    .label { font-size: 12px; font-weight: 500; letter-spacing: 0.02em; color: var(--primary-text-color); display: inline-flex; align-items: center; gap: 2px; }
    .req { color: var(--secondary-text-color); }
    .bool { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 4px 6px; }
    .bool .row { display: flex; align-items: center; gap: 10px; cursor: pointer; }
    .bool .row.disabled { cursor: default; opacity: 0.8; }
    .bool .hint, .bool .error { flex-basis: 100%; }

    .in {
      box-sizing: border-box; width: 100%; height: 34px; padding: 0 10px; font: inherit; font-size: 14px;
      color: var(--primary-text-color); background: var(--input-fill-color, var(--secondary-background-color));
      border: 1px solid var(--divider-color); border-radius: 6px; outline: none;
    }
    .in:focus, .in:focus-within { border-color: var(--primary-color); }
    .in:disabled { opacity: 0.7; }
    .in.warn, .chip.warn { border-color: var(--warning-color); }
    select.in { padding-right: 4px; }
    .entity-shown { display: flex; flex-direction: column; justify-content: center; align-items: flex-start; gap: 0; cursor: text; text-align: left; line-height: 1.15; }
    .entity-shown .fname, .entity-shown .eid { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .entity-shown .fname { font-size: 13.5px; }
    .entity-shown .eid { font-size: 10.5px; color: var(--secondary-text-color); }
    .chips { height: auto; min-height: 34px; display: flex; flex-wrap: wrap; align-items: center; gap: 4px; padding: 4px 6px; }
    .chips input { flex: 1; min-width: 140px; border: none; background: none; font: inherit; font-size: 14px; color: var(--primary-text-color); outline: none; padding: 2px 4px; }
    .chip { display: inline-flex; align-items: center; gap: 4px; padding: 2px 4px 2px 10px; border-radius: 12px; font-size: 13px; border: 1px solid transparent; background: color-mix(in srgb, var(--primary-color) 22%, transparent); }
    .chip.mono { font-family: var(--code-font-family, monospace); font-size: 12px; }
    .chip button { all: unset; cursor: pointer; width: 18px; text-align: center; border-radius: 50%; font-size: 11px; color: var(--secondary-text-color); }
    .chip button:hover { color: var(--primary-text-color); }

    .info { position: relative; display: inline-flex; color: var(--secondary-text-color); --mdc-icon-size: 15px; cursor: help; outline: none; }
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
    .hint { font-size: 11.5px; color: var(--secondary-text-color); line-height: 1.35; }
    .error { color: var(--error-color); font-size: 12px; }
  `;
}
