import { LitElement, html, css, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { describe, getEntry, getPresets, newDraft, save, type Infos, type Layout, type PresetEntities, type VThermEntities } from "./api";
import { isBoolean, isWide } from "./field";
import "./field";
import "./live";
import { cardText, fieldText, groupTitle, presetText, ui, windowText } from "./i18n";
import { errorText, fieldHelper, fieldLabel, localizeSelectorValue, thermostatTypeLabel } from "./localize";
import { buildCards, hasRequired, missingByCard, withDefaults, type CardView, type FieldView, type GroupView } from "./view";

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
  @state() private presets: PresetEntities = { own: {}, central: {} };
  @state() private entities: VThermEntities = {};

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
    this.entities = {};
    try {
      getPresets(this.hass, this.entryId).then((p) => (this.presets = p));
      if (this.entryId) {
        const res = await getEntry(this.hass, this.entryId);
        this.heading = res.title;
        this.entities = res.entities;
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
    for (const [field, flag] of Object.entries(this.layout?.layout.derived_flags ?? {})) {
      if (field in changes) changes = { ...changes, [flag]: !["", null, undefined].includes(changes[field]) };
    }
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
    if (method === "off") {
      this.change({ use_window_feature: false });
      return;
    }
    const own = (k: string) => this.layout?.fields[k] && !this.layout.fields[k].inherited;
    const clear =
      method === "drop"
        ? ["window_sensor_entity_id"]
        : ["window_auto_open_threshold", "window_auto_close_threshold", "window_auto_max_duration"].filter(own);
    this.change({ use_window_feature: true, ...Object.fromEntries(clear.map((k) => [k, undefined])) });
  }

  private async onSave() {
    this.saving = true;
    this.banner = undefined;
    this.errors = {};
    try {
      const res = await save(this.hass, this.data, this.entryId);
      if (res.success) {
        this.dirty = false;
        this.banner = { type: "success", text: ui("saved") };
        this.dispatchEvent(new CustomEvent("vtherm-saved", { bubbles: true, composed: true }));
        // VT creates or drops the thermostat's own preset entities on reload.
        setTimeout(() => getPresets(this.hass, this.entryId).then((p) => (this.presets = p)), 3000);
        if (!this.entryId && res.entry_id) {
          this.dispatchEvent(new CustomEvent("vtherm-created", { detail: { entryId: res.entry_id }, bubbles: true, composed: true }));
        }
      } else if (res.incomplete) {
        this.banner = { type: "warning", text: ui("not_saved_incomplete") };
      } else {
        this.errors = res.errors;
        this.banner = { type: "error", text: ui("not_saved_rejected") };
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
        ${missingCount ? html`<span class="chip warn">${ui("required_empty", { n: missingCount })}</span>` : nothing}
        ${this.dirty ? html`<span class="chip">${ui("unsaved")}</span>` : nothing}
        <ha-button .disabled=${this.saving || (!this.dirty && !!this.entryId)} @click=${this.onSave}>
          ${this.entryId ? ui("save") : ui("create")}
        </ha-button>
      </div>
      <div class="body ${this.wide ? "wide" : "narrow"}">
        ${this.renderIndex(cards, missing, fieldErrors)}
        <div class="content">
          ${this.banner ? html`<ha-alert alert-type=${this.banner.type}>${this.banner.text}</ha-alert>` : nothing}
          ${this.renderColumns(cards, fieldErrors, missing)}
        </div>
      </div>
    `;
  }

  private cardHasError(card: CardView, fieldErrors: Record<string, string>) {
    const keys = card.groups.flatMap((g) => g.own.map((f) => f.key));
    return keys.some((k) => fieldErrors[k]) || [...card.steps].some((s) => this.errors[s]?.base);
  }

  private renderIndex(cards: CardView[], missing: Record<string, string[]>, fieldErrors: Record<string, string>) {
    return html`<nav class="index" aria-label=${ui("sections")}>
      ${cards.map((card) => {
        const text = cardText(card.id);
        let status = html`<ha-icon class="ok" icon="mdi:check"></ha-icon>`;
        if (!card.featureOn) status = html`<span class="state">${ui("state_off")}</span>`;
        else if (this.cardHasError(card, fieldErrors)) status = html`<span class="state err">${ui("state_error")}</span>`;
        else if (missing[card.id]) status = html`<span class="state warn">${ui("state_empty", { n: missing[card.id].length })}</span>`;
        else if (card.groups.every((g) => g.centralKey && g.usesCentral))
          status = html`<span class="state">${ui("state_central")}</span>`;
        return html`<button class=${card.featureOn ? "" : "off"} @click=${() => this.scrollToCard(card.id)}>
          <ha-icon icon=${card.icon}></ha-icon><span class="label">${text.title}</span>${status}
        </button>`;
      })}
    </nav>`;
  }

  /** One column of cards; the fields inside a card share the width (see .fields). */
  private renderColumns(cards: CardView[], fieldErrors: Record<string, string>, missing: Record<string, string[]>) {
    return html`<div class="col">${cards.map((c) => this.renderCard(c, fieldErrors, missing))}</div>`;
  }

  private renderCard(card: CardView, fieldErrors: Record<string, string>, missing: Record<string, string[]>) {
    const text = cardText(card.id);
    const baseErrors = [...card.steps].map((s) => this.errors[s]?.base).filter(Boolean) as string[];
    return html`
      <section
        class="card ${card.featureOn ? "" : "off"} ${hasRequired(card) ? "required" : ""} ${missing[card.id] ? "missing" : ""}"
        id="card-${card.id}"
      >
        <header>
          <ha-icon icon=${card.icon}></ha-icon>
          <div class="htext">
            <h2>${text.title}</h2>
            <p>${text.subtitle}</p>
          </div>
          ${card.featureKey ? this.featureSwitch(card.featureKey, card.featureOn) : nothing}
        </header>
        ${this.cardBody(
          card,
          html`
            ${card.method ? this.methodChoice(card.method) : nothing}
            ${card.featureOn
              ? html`
                  ${baseErrors.map((code) => html`<ha-alert alert-type="error">${errorText(this.hass, code)}</ha-alert>`)}
                  ${card.groups.map((g) => this.renderGroup(g, fieldErrors))}
                  ${card.id === "presets" ? this.presetTable() : nothing}
                `
              : nothing}
          `,
        )}
      </section>
    `;
  }

  /** The card's settings, with its live panel beside them (below on narrow cards) when it has one. */
  private cardBody(card: CardView, settings: unknown) {
    const panel = card.featureOn ? this.livePanel(card) : nothing;
    if (panel === nothing) return settings;
    return html`<div class="cbody">
      <div class="settings">${settings}</div>
      <aside class="live">${panel}</aside>
    </div>`;
  }

  /** Value VT will use: the draft's own value, or the central configuration's for inherited fields. */
  private effective(key: string): unknown {
    const f = this.layout!.fields[key];
    if (!f) return undefined;
    return f.inherited ? this.layout!.central_values[key] : this.data[key];
  }

  private effectiveNumber(key: string, fallback: number): number {
    const n = Number(this.effective(key));
    return this.effective(key) === undefined || this.effective(key) === null || this.effective(key) === "" || !Number.isFinite(n) ? fallback : n;
  }

  private livePanel(card: CardView) {
    const type = this.data.thermostat_type;
    if (type === "thermostat_central_config") return nothing;
    const sensorId = (this.effective("temperature_sensor_entity_id") as string) || undefined;
    const outsideId = (this.effective("external_temperature_sensor_entity_id") as string) || undefined;
    const n = (key: string, fallback: number) => this.effectiveNumber(key, fallback);
    const nullable = (key: string) => {
      const v = this.effective(key);
      return v === undefined || v === null || v === "" ? null : Number(v);
    };
    switch (card.id) {
      case "heating":
        if (this.effective("proportional_function") !== "tpi" || !this.layout!.fields.tpi_coef_int) return nothing;
        return html`<vt-live-tpi
          .hass=${this.hass}
          .entities=${this.entities}
          .sensorId=${sensorId}
          .outsideId=${outsideId}
          .settings=${{
            coefInt: n("tpi_coef_int", 0.6),
            coefExt: n("tpi_coef_ext", 0.01),
            thresholdLow: n("tpi_threshold_low", 0),
            thresholdHigh: n("tpi_threshold_high", 0),
            cycleMin: n("cycle_min", 5),
            minOnSec: n("minimal_activation_delay", 0),
            minOffSec: n("minimal_deactivation_delay", 0),
          }}
        ></vt-live-tpi>`;
      case "window":
        if (card.method?.current !== "drop") return nothing;
        return html`<vt-live-window
          .hass=${this.hass}
          .slopeId=${this.entities.temperature_slope}
          .sensorId=${sensorId}
          .openThreshold=${nullable("window_auto_open_threshold")}
          .closeThreshold=${nullable("window_auto_close_threshold")}
          .maxDurationMin=${nullable("window_auto_max_duration")}
          .cycleMin=${n("cycle_min", 5)}
        ></vt-live-window>`;
      case "safety":
        return html`<vt-live-safety
          .hass=${this.hass}
          .sensorId=${sensorId}
          .outsideId=${outsideId}
          .delayMin=${nullable("safety_delay_min")}
          .minOnPercent=${nullable("safety_min_on_percent")}
          .overClimate=${type === "thermostat_over_climate"}
        ></vt-live-safety>`;
    }
    return nothing;
  }

  private renderGroup(g: GroupView, fieldErrors: Record<string, string>) {
    const title = groupTitle(g.id);
    const main = g.own.filter((f) => f.level !== "advanced");
    const advanced = g.own.filter((f) => f.level === "advanced");
    const showHeader = title || g.featureKey;
    return html`
      <div class="group">
        ${showHeader
          ? html`<div class="ghead">
              <h3>${title ?? ""}</h3>
              ${g.featureKey ? this.featureSwitch(g.featureKey, g.featureOn) : nothing}
            </div>`
          : nothing}
        ${g.featureOn
          ? html`
              ${g.centralKey ? this.overrideToggle(g.centralKey, g.usesCentral) : nothing}
              ${main.length ? html`<div class="fields">${main.map((f) => this.field(f, fieldErrors))}</div>` : nothing}
              ${g.inherited.length ? this.inheritedBlock(g.inherited) : nothing}
              ${advanced.length
                ? html`<details class="adv">
                    <summary>${ui("advanced")} <span class="count">${advanced.length}</span></summary>
                    <div class="fields">${advanced.map((f) => this.field(f, fieldErrors))}</div>
                  </details>`
                : nothing}
            `
          : nothing}
      </div>
    `;
  }

  /** Panel label in supported languages, VT's own label otherwise. */
  private label(f: FieldView): string {
    return fieldText(f.key, this.data.thermostat_type)?.label ?? fieldLabel(this.hass, f.desc.step, f.key, this.layout!.placeholders);
  }

  private field(f: FieldView, fieldErrors: Record<string, string>, readOnly = false) {
    const p = this.layout!.placeholders;
    const ft = fieldText(f.key, this.data.thermostat_type);
    const value = readOnly ? this.layout!.central_values[f.key] : this.data[f.key];
    return html`<vt-field
      class=${isBoolean(f.desc.schema) ? "bool" : isWide(f.desc.schema) ? "wide" : ""}
      .hass=${this.hass}
      .schema=${f.desc.schema}
      .value=${value}
      .label=${this.label(f)}
      .hint=${ft?.hint ?? ""}
      .info=${ft ? (ft.info ?? "") : fieldHelper(this.hass, f.desc.step, f.key, p)}
      .diagram=${ft?.diagram}
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
        <span class="from">${ui("from_central")}</span>
        ${values.length
          ? html`<span class="values">${values.map(
              (f) => html`<span class="kv"
                ><span class="k">${this.label(f)}</span>
                <span class="v">${this.formatValue(this.layout!.central_values[f.key])}</span></span
              >`,
            )}</span>`
          : html`<span class="values none">Nothing set there, so Versatile Thermostat's defaults apply.</span>`}
      </summary>
      <div class="fields">${fields.map((f) => this.field(f, {}, true))}</div>
      ${centralId
        ? html`<a class="central-link" href="?entry=${centralId}" @click=${(e: Event) => this.openCentral(e, centralId)}
            >${ui("edit_central")}</a
          >`
        : nothing}
    </details>`;
  }

  /**
   * Preset temperatures. They are not part of VT's configuration but number entities, on this
   * thermostat when it has its own presets, otherwise on the central configuration.
   */
  private presetTable() {
    const central = this.data.thermostat_type === "thermostat_central_config";
    const usesCentral = !central && this.data.use_presets_central_config !== false;
    const entities = usesCentral ? this.presets.central : this.presets.own;
    const columns: { id: "normal" | "away" | "cool" | "cool_away"; suffix: string }[] = [
      { id: "normal", suffix: "" },
      ...(central || this.data.use_presence_feature ? [{ id: "away", suffix: "_away" }] : []),
      ...(central || this.data.ac_mode ? [{ id: "cool", suffix: "_ac" }] : []),
      ...(central || (this.data.ac_mode && this.data.use_presence_feature) ? [{ id: "cool_away", suffix: "_ac_away" }] : []),
    ] as typeof columns;
    const rows = ["frost", "eco", "comfort", "boost"] as const;
    if (!Object.keys(entities).length) {
      return html`<p class="note">${presetText("pending")}</p>`;
    }
    const unit = this.hass.config?.unit_system?.temperature ?? "°";
    return html`
      <div class="presets" style="--cols: ${columns.length}">
        <span class="ph">${presetText("preset")}</span>
        ${columns.map((c) => html`<span class="ph">${presetText(c.id)}</span>`)}
        ${rows.map(
          (r) => html`
            <span class="pr">${presetText(r)}</span>
            ${columns.map((c) => {
              const id = entities[`${r}${c.suffix}_temp`];
              const st = id ? this.hass.states[id] : undefined;
              if (!st) return html`<span class="pv none">–</span>`;
              return usesCentral
                ? html`<span class="pv">${st.state} ${unit}</span>`
                : html`<span class="pv"
                    ><input
                      type="number"
                      .value=${st.state}
                      step=${st.attributes.step ?? 0.1}
                      min=${st.attributes.min ?? ""}
                      max=${st.attributes.max ?? ""}
                      aria-label="${presetText(r)} ${presetText(c.id)}"
                      @change=${(e: any) => this.hass.callService("number", "set_value", { entity_id: id, value: Number(e.target.value) })}
                    />
                    ${unit}</span
                  >`;
            })}
          `,
        )}
      </div>
      <p class="note">
        ${usesCentral ? presetText("from_central") : presetText("saved_now")}
        ${usesCentral && this.layout?.central_entry_id
          ? html`<a class="central-link" href="?entry=${this.layout.central_entry_id}" @click=${(e: Event) => this.openCentral(e, this.layout!.central_entry_id!)}
              >${ui("edit_central")}</a
            >`
          : nothing}
      </p>
    `;
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
      aria-label=${on ? ui("turn_off") : ui("turn_on")}
      @change=${(e: any) => this.change({ [key]: e.target.checked })}
    ></ha-switch>`;
  }

  /** VT's "use central X" flag, shown the other way round: on means this VTherm has its own values. */
  private overrideToggle(key: string, usesCentral: boolean) {
    return html`<label class="override">
      <ha-switch .checked=${!usesCentral} @change=${(e: any) => this.change({ [key]: !e.target.checked })}></ha-switch>
      <span>${ui("override")}</span>
    </label>`;
  }

  private methodChoice(method: NonNullable<CardView["method"]>) {
    return html`<div class="question">${windowText("question")}</div>
      <div class="seg wide" role="radiogroup" aria-label=${windowText("question")}>
      ${method.options.map(
        (id) =>
          html`<button role="radio" aria-checked=${id === method.current} class=${id === method.current ? "on" : ""} @click=${() => this.setWindowMethod(id)}>
            ${windowText(id as "off" | "sensor" | "drop")}
          </button>`,
      )}
    </div>`;
  }

  static styles = css`
    :host { display: block; --gap: 16px; }
    .loading { display: flex; justify-content: center; padding: 64px; }
    .toolbar {
      position: sticky; top: 0; max-width: 1240px; margin: 0 auto; box-sizing: border-box; z-index: 3; display: flex; align-items: center; gap: 12px;
      padding: 8px 16px; background: var(--app-header-background-color, var(--primary-background-color));
      border-bottom: 1px solid var(--divider-color);
    }
    .title { flex: 1; min-width: 0; }
    .name { font-size: 20px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .sub { color: var(--secondary-text-color); font-size: 13px; }
    .chip { font-size: 12px; padding: 2px 10px; border-radius: 12px; background: var(--secondary-background-color); color: var(--secondary-text-color); white-space: nowrap; }
    .chip.warn { background: rgba(var(--rgb-warning-color, 255, 166, 0), 0.18); color: var(--warning-color); }

    .body { display: grid; gap: var(--gap); padding: var(--gap); max-width: 1240px; margin: 0 auto; box-sizing: border-box; }
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
      border-radius: var(--ha-card-border-radius, 12px); padding: 14px 16px; display: flex; flex-direction: column; gap: 10px;
      scroll-margin-top: 72px;
    }
    .card.off:not(:has(.seg)) { gap: 0; }
    .card { container-type: inline-size; }
    .cbody { display: flex; flex-direction: column; gap: 14px; }
    .settings { display: flex; flex-direction: column; gap: 10px; min-width: 0; }
    .live { background: var(--secondary-background-color); border-radius: 10px; padding: 10px 12px; min-width: 0; }
    @container (min-width: 720px) {
      .cbody { display: grid; grid-template-columns: minmax(0, 1fr) 300px; align-items: start; }
      .live { position: sticky; top: 76px; }
    }
    /* Cards that ask for required values stand out a little; with values missing, in the warning colour. */
    .card.required { border-color: color-mix(in srgb, var(--primary-color) 45%, var(--divider-color)); box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18); }
    .card.required.missing { border-color: color-mix(in srgb, var(--warning-color) 70%, var(--divider-color)); }
    .question { font-size: 14px; margin-bottom: -6px; }
    .card.off header { opacity: 0.7; }
    .card header { display: flex; align-items: flex-start; gap: 12px; }
    .card header > ha-icon { color: var(--secondary-text-color); margin-top: 2px; }
    .htext { flex: 1; min-width: 0; }
    .card h2 { margin: 0; font-size: 17px; font-weight: 500; }
    .card header p { margin: 2px 0 0; font-size: 13px; color: var(--secondary-text-color); line-height: 1.4; }
    .override { display: inline-flex; align-items: center; gap: 10px; font-size: 14px; cursor: pointer; align-self: flex-start; }

    .group { display: flex; flex-direction: column; gap: 8px; }
    .group + .group { border-top: 1px solid var(--divider-color); padding-top: 10px; }
    .ghead { display: flex; align-items: center; gap: 12px; min-height: 26px; }
    .ghead h3 { margin: 0; flex: 1; font-size: 12px; font-weight: 500; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.05em; }
    /* Fields as compact tiles in a grid; list inputs take a full row. */
    .fields { display: grid; grid-template-columns: repeat(auto-fill, minmax(210px, 1fr)); gap: 8px; align-items: stretch; }
    .fields vt-field.wide { grid-column: 1 / -1; }

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
    .adv[open] > summary { margin-bottom: 8px; }
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
    .inherited[open] > summary { margin-bottom: 8px; }
    .inherited .fields { opacity: 0.75; }
    .central-link { display: inline-block; margin-top: 10px; font-size: 13px; color: var(--primary-color); }
    .presets { display: grid; grid-template-columns: 150px repeat(var(--cols), 120px); gap: 6px 16px; align-items: center; }
    .ph { font-size: 12px; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.04em; }
    .pr { font-size: 14px; }
    .pv { font-size: 14px; font-variant-numeric: tabular-nums; display: flex; align-items: center; gap: 4px; }
    .pv.none { color: var(--secondary-text-color); }
    .pv input {
      width: 70px; padding: 6px 8px; font: inherit; color: var(--primary-text-color); border-radius: 6px;
      background: var(--input-fill-color, var(--secondary-background-color)); border: 1px solid var(--divider-color);
    }
    .pv input:focus { outline: 2px solid var(--primary-color); outline-offset: -1px; }
    .note { margin: 0; font-size: 13px; color: var(--secondary-text-color); }
    .note .central-link { margin: 0 0 0 6px; }
  `;
}
