import { LitElement, html, css, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { describe, getEntry, newDraft, save, type Infos, type Layout } from "./api";
import { isBoolean, isWide } from "./field";
import "./field";
import { errorText, fieldHelper, fieldLabel, localizeSelectorValue, thermostatTypeLabel } from "./localize";
import { CARD_TEXT, GROUP_TITLE, METHOD_TEXT } from "./texts";
import { buildCards, missingByCard, windowMethod, withDefaults, type CardView, type FieldView, type GroupView } from "./view";

const WIDE_PX = 760; // width from which the index sits beside the cards instead of above them

/** Edits one VTherm (or creates one when `newType` is set): index on the left, cards on the right. */
@customElement("vtherm-editor")
export class VThermEditor extends LitElement {
  @property({ attribute: false }) hass: any;
  @property() entryId?: string;
  @property() newType?: string;
  @property({ type: Boolean }) narrow = false;

  @state() private heading = "";
  @state() private data: Infos = {};
  @state() private layout?: Layout;
  @state() private windowMethod?: string;
  @state() dirty = false;
  @state() private saving = false;
  @state() private errors: Record<string, Record<string, string>> = {};
  @state() private banner?: { type: "error" | "success" | "warning"; text: string };
  @state() private loadError?: string;
  @state() private wide = true;

  private describeSeq = 0;
  private resizer = new ResizeObserver(([entry]) => (this.wide = entry.contentRect.width >= WIDE_PX));

  connectedCallback() {
    super.connectedCallback();
    this.resizer.observe(this);
  }

  disconnectedCallback() {
    this.resizer.disconnect();
    super.disconnectedCallback();
  }

  protected willUpdate(changed: PropertyValues<this>) {
    if ((changed.has("entryId") || changed.has("newType")) && this.hass) this.load();
  }

  private async load() {
    this.loadError = undefined;
    this.banner = undefined;
    this.errors = {};
    this.dirty = false;
    this.windowMethod = undefined;
    this.layout = undefined;
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

  /** Fill defaults for newly shown fields; defaults can reveal fields, so re-describe until stable. */
  private async applyLayout(data: Infos, layout: Layout) {
    for (let i = 0; i < 4; i++) {
      const filled = withDefaults(data, layout);
      if (filled === data) break;
      data = filled;
      layout = await describe(this.hass, data);
    }
    this.data = data;
    this.layout = layout;
  }

  /** Apply changes to the draft (undefined removes a key) and re-describe the page. */
  private async change(changes: Infos) {
    const value = { ...this.data };
    for (const [k, v] of Object.entries(changes)) {
      if (v === undefined) delete value[k];
      else value[k] = v;
    }
    this.data = value;
    this.dirty = true;
    const seq = ++this.describeSeq;
    const layout = await describe(this.hass, value);
    if (seq !== this.describeSeq) return; // a newer change is in flight
    await this.applyLayout(this.data, layout);
  }

  private setWindowMethod(method: string) {
    this.windowMethod = method;
    const own = (k: string) => this.layout?.fields[k] && !this.layout.fields[k].inherited;
    const clear =
      method === "drop"
        ? ["window_sensor_entity_id"]
        : ["window_auto_open_threshold", "window_auto_close_threshold", "window_auto_max_duration"].filter(own);
    this.change(Object.fromEntries(clear.map((k) => [k, undefined])));
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
        this.dispatchEvent(new CustomEvent("vtherm-saved", { bubbles: true, composed: true }));
        if (!this.entryId && res.entry_id) {
          this.dispatchEvent(new CustomEvent("vtherm-created", { detail: { entryId: res.entry_id }, bubbles: true, composed: true }));
        }
      } else if (res.incomplete) {
        this.banner = { type: "warning", text: "Not saved: some required settings are still empty. They are marked in the index." };
      } else {
        this.errors = res.errors;
        this.banner = { type: "error", text: "Not saved: Versatile Thermostat rejected a setting. It is marked below." };
        const step = Object.keys(res.errors)[0];
        const card = this.cards().find((c) => c.steps.has(step));
        if (card) this.updateComplete.then(() => this.scrollToCard(card.id));
      }
    } catch (err: any) {
      this.banner = { type: "error", text: err?.message ?? String(err) };
    } finally {
      this.saving = false;
    }
  }

  private cards(): CardView[] {
    return this.layout ? buildCards(this.layout, this.data, this.windowMethod) : [];
  }

  private scrollToCard(id: string) {
    this.renderRoot.querySelector(`#card-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  private fieldErrors(): Record<string, string> {
    const out: Record<string, string> = {};
    for (const errs of Object.values(this.errors)) {
      for (const [k, code] of Object.entries(errs)) if (k !== "base") out[k] = errorText(this.hass, code);
    }
    return out;
  }

  render() {
    if (this.loadError) return html`<ha-alert alert-type="error">${this.loadError}</ha-alert>`;
    if (!this.layout) return html`<div class="loading"><ha-spinner></ha-spinner></div>`;

    const cards = this.cards();
    const missing = missingByCard(cards, this.data);
    const missingCount = Object.values(missing).reduce((n, l) => n + l.length, 0);
    const fieldErrors = this.fieldErrors();

    return html`
      <div class="toolbar">
        <div class="title">
          <div class="name">${this.data.name || this.heading}</div>
          <div class="sub">${thermostatTypeLabel(this.hass, this.data.thermostat_type)}${this.entryId ? "" : " · new"}</div>
        </div>
        ${missingCount ? html`<span class="chip warn">${missingCount} required empty</span>` : nothing}
        ${this.dirty ? html`<span class="chip">Unsaved changes</span>` : nothing}
        <ha-button .disabled=${this.saving || (!this.dirty && !!this.entryId)} @click=${this.onSave}>
          ${this.entryId ? "Save" : "Create"}
        </ha-button>
      </div>
      <div class="body ${this.wide ? "wide" : "narrow"}">
        ${this.renderIndex(cards, missing, fieldErrors)}
        <div class="content">
          ${this.banner ? html`<ha-alert alert-type=${this.banner.type}>${this.banner.text}</ha-alert>` : nothing}
          ${this.renderColumns(cards, fieldErrors)}
        </div>
      </div>
    `;
  }

  private cardHasError(card: CardView, fieldErrors: Record<string, string>) {
    const keys = card.groups.flatMap((g) => g.own.map((f) => f.key));
    return keys.some((k) => fieldErrors[k]) || [...card.steps].some((s) => this.errors[s]?.base);
  }

  private renderIndex(cards: CardView[], missing: Record<string, string[]>, fieldErrors: Record<string, string>) {
    return html`<nav class="index" aria-label="Sections">
      ${cards.map((card) => {
        const text = CARD_TEXT[card.id] ?? CARD_TEXT.other;
        let status = html`<ha-icon class="ok" icon="mdi:check"></ha-icon>`;
        if (!card.featureOn) status = html`<span class="state">Off</span>`;
        else if (this.cardHasError(card, fieldErrors)) status = html`<span class="state err">Error</span>`;
        else if (missing[card.id]) status = html`<span class="state warn">${missing[card.id].length} empty</span>`;
        else if (card.usesCentral) status = html`<span class="state">Central</span>`;
        return html`<button class=${card.featureOn ? "" : "off"} @click=${() => this.scrollToCard(card.id)}>
          <ha-icon icon=${text.icon}></ha-icon><span class="label">${text.title}</span>${status}
        </button>`;
      })}
    </nav>`;
  }

  /** One column of cards; the fields inside a card share the width (see .fields). */
  private renderColumns(cards: CardView[], fieldErrors: Record<string, string>) {
    return html`<div class="col">${cards.map((c) => this.renderCard(c, fieldErrors))}</div>`;
  }

  private renderCard(card: CardView, fieldErrors: Record<string, string>) {
    const text = CARD_TEXT[card.id] ?? CARD_TEXT.other;
    const baseErrors = [...card.steps].map((s) => this.errors[s]?.base).filter(Boolean) as string[];
    // A card-wide "central | own" switch gets one inherited block for the whole card.
    const inherited = card.groups.flatMap((g) => g.inherited);
    return html`
      <section class="card ${card.featureOn ? "" : "off"}" id="card-${card.id}">
        <header>
          <ha-icon icon=${text.icon}></ha-icon>
          <div class="htext">
            <h2>${text.title}</h2>
            <p>${text.subtitle}</p>
          </div>
          ${card.featureKey ? this.featureSwitch(card.featureKey, card.featureOn) : nothing}
        </header>
        ${card.featureOn
          ? html`
              ${card.centralKey ? html`<div class="cardctl">${this.centralSwitch(card.centralKey, card.usesCentral)}</div>` : nothing}
              ${card.centralKey && inherited.length ? this.inheritedBlock(inherited) : nothing}
              ${baseErrors.map((code) => html`<ha-alert alert-type="error">${errorText(this.hass, code)}</ha-alert>`)}
              ${card.groups.map((g) => this.renderGroup(g, fieldErrors, !!card.centralKey))}
            `
          : nothing}
      </section>
    `;
  }

  private renderGroup(g: GroupView, fieldErrors: Record<string, string>, inheritedShownByCard = false) {
    const title = GROUP_TITLE[g.id];
    const main = g.own.filter((f) => f.level !== "advanced");
    const advanced = g.own.filter((f) => f.level === "advanced");
    const showHeader = title || g.featureKey || g.centralKey;
    return html`
      <div class="group">
        ${showHeader
          ? html`<div class="ghead">
              <h3>${title ?? ""}</h3>
              ${g.centralKey && g.featureOn ? this.centralSwitch(g.centralKey, g.usesCentral) : nothing}
              ${g.featureKey ? this.featureSwitch(g.featureKey, g.featureOn) : nothing}
            </div>`
          : nothing}
        ${g.featureOn
          ? html`
              ${g.method ? this.methodChoice(g.method) : nothing}
              ${main.length ? html`<div class="fields">${main.map((f) => this.field(f, fieldErrors))}</div>` : nothing}
              ${g.inherited.length && !inheritedShownByCard ? this.inheritedBlock(g.inherited) : nothing}
              ${advanced.length
                ? html`<details class="adv">
                    <summary>Advanced settings <span class="count">${advanced.length}</span></summary>
                    <div class="fields">${advanced.map((f) => this.field(f, fieldErrors))}</div>
                  </details>`
                : nothing}
            `
          : nothing}
      </div>
    `;
  }

  private field(f: FieldView, fieldErrors: Record<string, string>, readOnly = false) {
    const p = this.layout!.placeholders;
    const value = readOnly ? this.layout!.central_values[f.key] : this.data[f.key];
    return html`<vt-field
      class=${isBoolean(f.desc.schema) ? "bool" : isWide(f.desc.schema) ? "wide" : ""}
      .hass=${this.hass}
      .schema=${f.desc.schema}
      .value=${value}
      .label=${fieldLabel(this.hass, f.desc.step, f.key, p)}
      .helper=${fieldHelper(this.hass, f.desc.step, f.key, p)}
      .error=${readOnly ? "" : (fieldErrors[f.key] ?? "")}
      .disabled=${readOnly}
      .localizeValue=${localizeSelectorValue(this.hass)}
      @field-changed=${readOnly ? undefined : (e: CustomEvent) => this.change({ [e.detail.key]: e.detail.value })}
    ></vt-field>`;
  }

  /** Values taken from the central configuration: a one-line summary, the read-only fields on demand. */
  private inheritedBlock(fields: FieldView[]) {
    const p = this.layout!.placeholders;
    const values = fields.filter((f) => !["", null, undefined].includes(this.layout!.central_values[f.key]));
    const centralId = this.layout!.central_entry_id;
    return html`<details class="inherited">
      <summary>
        <ha-icon icon="mdi:link-variant"></ha-icon>
        <span class="from">From the central configuration</span>
        ${values.length
          ? html`<span class="values">${values.map(
              (f) => html`<span class="kv"
                ><span class="k">${fieldLabel(this.hass, f.desc.step, f.key, p)}</span>
                <span class="v">${this.formatValue(this.layout!.central_values[f.key])}</span></span
              >`,
            )}</span>`
          : html`<span class="values none">Nothing set there, so Versatile Thermostat's defaults apply.</span>`}
      </summary>
      <div class="fields">${fields.map((f) => this.field(f, {}, true))}</div>
      ${centralId
        ? html`<a class="central-link" href="?entry=${centralId}" @click=${(e: Event) => this.openCentral(e, centralId)}
            >Edit the central configuration</a
          >`
        : nothing}
    </details>`;
  }

  private openCentral(e: Event, id: string) {
    e.preventDefault();
    this.dispatchEvent(new CustomEvent("vtherm-open", { detail: { entryId: id }, bubbles: true, composed: true }));
  }

  private formatValue(v: unknown): string {
    if (typeof v === "boolean") return v ? "on" : "off";
    if (Array.isArray(v)) return v.map((x) => this.formatValue(x)).join(", ");
    if (typeof v === "string" && this.hass.states[v]) return this.hass.states[v].attributes.friendly_name ?? v;
    return String(v);
  }

  private featureSwitch(key: string, on: boolean) {
    return html`<ha-switch
      .checked=${on}
      aria-label=${on ? "Turn off" : "Turn on"}
      @change=${(e: any) => this.change({ [key]: e.target.checked })}
    ></ha-switch>`;
  }

  private centralSwitch(key: string, usesCentral: boolean) {
    return html`<div class="seg" role="radiogroup" aria-label="Where the values come from">
      <button role="radio" aria-checked=${usesCentral} class=${usesCentral ? "on" : ""} @click=${() => this.change({ [key]: true })}>Central</button>
      <button role="radio" aria-checked=${!usesCentral} class=${usesCentral ? "" : "on"} @click=${() => this.change({ [key]: false })}>Own</button>
    </div>`;
  }

  private methodChoice(method: NonNullable<GroupView["method"]>) {
    return html`<div class="seg wide" role="radiogroup" aria-label="Detection method">
      ${Object.keys(method.options).map(
        (id) =>
          html`<button role="radio" aria-checked=${id === method.current} class=${id === method.current ? "on" : ""} @click=${() => this.setWindowMethod(id)}>
            ${METHOD_TEXT[id] ?? id}
          </button>`,
      )}
    </div>`;
  }

  static styles = css`
    :host { display: block; --gap: 16px; }
    .loading { display: flex; justify-content: center; padding: 64px; }
    .toolbar {
      position: sticky; top: 0; max-width: 1500px; margin: 0 auto; box-sizing: border-box; z-index: 3; display: flex; align-items: center; gap: 12px;
      padding: 8px 16px; background: var(--app-header-background-color, var(--primary-background-color));
      border-bottom: 1px solid var(--divider-color);
    }
    .title { flex: 1; min-width: 0; }
    .name { font-size: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sub { color: var(--secondary-text-color); font-size: 13px; }
    .chip { font-size: 12px; padding: 2px 10px; border-radius: 12px; background: var(--secondary-background-color); color: var(--secondary-text-color); white-space: nowrap; }
    .chip.warn { background: rgba(var(--rgb-warning-color, 255, 166, 0), 0.18); color: var(--warning-color); }

    .body { display: grid; gap: var(--gap); padding: var(--gap); max-width: 1500px; margin: 0 auto; box-sizing: border-box; }
    .body.wide { grid-template-columns: 220px minmax(0, 1fr); align-items: start; }
    .content { min-width: 0; display: flex; flex-direction: column; gap: var(--gap); }

    .index { display: flex; flex-direction: column; gap: 2px; }
    .wide .index { position: sticky; top: 72px; }
    .narrow .index { flex-direction: row; flex-wrap: wrap; gap: 6px; }
    .index button {
      all: unset; box-sizing: border-box; display: flex; align-items: center; gap: 10px; padding: 7px 10px; border-radius: 8px;
      cursor: pointer; font-size: 14px; color: var(--primary-text-color); --mdc-icon-size: 18px;
    }
    .narrow .index button { border: 1px solid var(--divider-color); padding: 4px 10px; }
    .index button:hover, .index button:focus-visible { background: var(--secondary-background-color); }
    .index button.off { color: var(--secondary-text-color); }
    .index button > ha-icon:first-child { color: var(--secondary-text-color); }
    .index .label { flex: 1; }
    .index .ok { color: var(--success-color, #43a047); --mdc-icon-size: 16px; }
    .index .state { font-size: 11px; color: var(--secondary-text-color); }
    .index .state.warn { color: var(--warning-color); }
    .index .state.err { color: var(--error-color); }

    .col { display: flex; flex-direction: column; gap: var(--gap); min-width: 0; }

    .card {
      background: var(--ha-card-background, var(--card-background-color)); border: 1px solid var(--divider-color);
      border-radius: var(--ha-card-border-radius, 12px); padding: 16px; display: flex; flex-direction: column; gap: 14px;
      scroll-margin-top: 72px;
    }
    .card.off { gap: 0; }
    .card.off header { opacity: 0.7; }
    .card header { display: flex; align-items: flex-start; gap: 12px; }
    .card header > ha-icon { color: var(--secondary-text-color); margin-top: 2px; }
    .htext { flex: 1; min-width: 0; }
    .card h2 { margin: 0; font-size: 17px; font-weight: 500; }
    .card header p { margin: 2px 0 0; font-size: 13px; color: var(--secondary-text-color); line-height: 1.4; }
    .cardctl { display: flex; }

    .group { display: flex; flex-direction: column; gap: 12px; }
    .group + .group { border-top: 1px solid var(--divider-color); padding-top: 14px; }
    .ghead { display: flex; align-items: center; gap: 12px; min-height: 32px; }
    .ghead h3 { margin: 0; flex: 1; font-size: 12px; font-weight: 500; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.05em; }
    /* Fields share the card's width in a grid; HA inputs reserve their own hint row, hence the small row gap. */
    .fields { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 2px 24px; align-items: start; }
    .fields vt-field.wide { grid-column: 1 / -1; }
    .fields vt-field.bool { align-self: center; }

    .seg { display: inline-flex; border: 1px solid var(--divider-color); border-radius: 8px; overflow: hidden; flex-shrink: 0; }
    .seg.wide { align-self: stretch; }
    .seg.wide button { flex: 1; }
    .seg button { all: unset; cursor: pointer; padding: 4px 14px; font-size: 13px; color: var(--secondary-text-color); text-align: center; }
    .seg button + button { border-left: 1px solid var(--divider-color); }
    .seg button.on { background: var(--primary-color); color: var(--text-primary-color, #fff); }
    .seg button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -2px; }

    details > summary { cursor: pointer; list-style: none; }
    details > summary::-webkit-details-marker { display: none; }
    .adv > summary { font-size: 13px; color: var(--primary-color); display: inline-flex; align-items: center; gap: 6px; }
    .adv > summary::before { content: "▸"; transition: transform 0.15s; }
    .adv[open] > summary::before { transform: rotate(90deg); }
    .adv[open] > summary { margin-bottom: 12px; }
    .count { font-size: 11px; padding: 0 6px; border-radius: 8px; background: var(--secondary-background-color); color: var(--secondary-text-color); }

    .inherited { border-left: 3px solid var(--divider-color); padding: 4px 0 4px 12px; }
    .inherited > summary { display: flex; flex-wrap: wrap; align-items: baseline; gap: 4px 8px; font-size: 13px; --mdc-icon-size: 16px; }
    .inherited > summary ha-icon { color: var(--secondary-text-color); align-self: center; }
    .inherited .from { color: var(--secondary-text-color); }
    .inherited .values { display: flex; flex-wrap: wrap; gap: 6px; flex-basis: 100%; }
    .inherited .values.none { color: var(--secondary-text-color); font-style: italic; }
    .kv { display: inline-flex; border: 1px solid var(--divider-color); border-radius: 6px; overflow: hidden; font-size: 12px; max-width: 100%; }
    .kv .k { padding: 2px 6px; color: var(--secondary-text-color); background: var(--secondary-background-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 220px; }
    .kv .v { padding: 2px 6px; color: var(--primary-text-color); white-space: nowrap; }
    .inherited[open] > summary { margin-bottom: 12px; }
    .inherited .fields { opacity: 0.75; }
    .central-link { display: inline-block; margin-top: 10px; font-size: 13px; color: var(--primary-color); }
  `;
}
