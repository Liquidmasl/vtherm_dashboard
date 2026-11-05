import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { listEntries, type EntrySummary } from "./api";
import { thermostatTypeLabel } from "./localize";

const CENTRAL = "thermostat_central_config";
const TYPE_ICONS: Record<string, string> = {
  thermostat_central_config: "mdi:cog-transfer",
  thermostat_over_switch: "mdi:toggle-switch-outline",
  thermostat_over_climate: "mdi:thermostat",
  thermostat_over_valve: "mdi:pipe-valve",
};

/** All VTherms, central configuration first, plus "create". */
@customElement("vtherm-list")
export class VThermList extends LitElement {
  @property({ attribute: false }) hass: any;
  @state() private entries?: EntrySummary[];
  @state() private types: string[] = [];
  @state() private picking = false;

  connectedCallback() {
    super.connectedCallback();
    this.refresh();
  }

  async refresh() {
    if (!this.hass) return;
    const res = await listEntries(this.hass);
    this.entries = res.entries;
    this.types = res.thermostat_types;
  }

  private open(detail: { entryId?: string; newType?: string }) {
    this.dispatchEvent(new CustomEvent("vtherm-open", { detail, bubbles: true, composed: true }));
  }

  render() {
    if (!this.entries) return html`<div class="loading"><ha-spinner></ha-spinner></div>`;
    const hasCentral = this.entries.some((e) => e.thermostat_type === CENTRAL);
    const creatable = this.types.filter((t) => t !== CENTRAL || !hasCentral);
    return html`
      <div class="content">
        ${!hasCentral
          ? html`<ha-alert alert-type="info">
              No central configuration yet. Creating one first lets every VTherm share sensors, presets and
              advanced settings instead of repeating them.
            </ha-alert>`
          : nothing}
        <ha-card outlined>
          ${this.entries.length === 0 ? html`<div class="empty">No Versatile Thermostats yet.</div>` : nothing}
          ${this.entries.map((e) => this.renderRow(e))}
        </ha-card>
        ${this.picking
          ? html`<ha-card outlined header="New VTherm">
              ${creatable.map(
                (t) => html`<div class="row" @click=${() => this.open({ newType: t })}>
                  <ha-icon icon=${TYPE_ICONS[t] ?? "mdi:thermostat"}></ha-icon>
                  <div class="main"><div class="name">${thermostatTypeLabel(this.hass, t)}</div></div>
                  <ha-icon icon="mdi:chevron-right"></ha-icon>
                </div>`,
              )}
            </ha-card>`
          : html`<div class="actions"><ha-button @click=${() => (this.picking = true)}>+ New VTherm</ha-button></div>`}
      </div>
    `;
  }

  private renderRow(e: EntrySummary) {
    const state = e.climate_entity_id ? this.hass.states[e.climate_entity_id] : undefined;
    const details = [
      thermostatTypeLabel(this.hass, e.thermostat_type),
      e.underlying_count ? `${e.underlying_count} underlying` : "",
      e.prop_function ?? "",
    ].filter(Boolean);
    return html`
      <div class="row" @click=${() => this.open({ entryId: e.entry_id })}>
        <ha-icon icon=${TYPE_ICONS[e.thermostat_type] ?? "mdi:thermostat"}></ha-icon>
        <div class="main">
          <div class="name">${e.title}</div>
          <div class="sub">${details.join(" · ")}</div>
        </div>
        ${state
          ? html`<div class="state">
              ${state.attributes.current_temperature ?? "–"}° → ${state.attributes.temperature ?? "–"}°
              <span class="sub">${this.hass.formatEntityState?.(state) ?? state.state}</span>
            </div>`
          : nothing}
        ${e.loaded ? nothing : html`<span class="badge warn">not loaded</span>`}
        <ha-icon icon="mdi:chevron-right"></ha-icon>
      </div>
    `;
  }

  static styles = css`
    .loading { display: flex; justify-content: center; padding: 64px; }
    .content { max-width: 960px; margin: 0 auto; padding: 16px; display: flex; flex-direction: column; gap: 16px; }
    .empty { padding: 16px; color: var(--secondary-text-color); }
    .row { display: flex; align-items: center; gap: 16px; padding: 12px 16px; cursor: pointer; border-top: 1px solid var(--divider-color); }
    ha-card > .row:first-of-type, .empty + .row { border-top: none; }
    .row:hover { background: var(--secondary-background-color); }
    .main { flex: 1; min-width: 0; }
    .name { font-size: 16px; }
    .sub { color: var(--secondary-text-color); font-size: 13px; }
    .state { text-align: right; font-size: 14px; display: flex; flex-direction: column; }
    .badge { font-size: 12px; padding: 2px 8px; border-radius: 10px; }
    .badge.warn { background: rgba(var(--rgb-warning-color, 255, 166, 0), 0.2); color: var(--warning-color); }
    .actions { display: flex; justify-content: flex-end; }
    ha-icon { color: var(--state-icon-color, var(--secondary-text-color)); }
  `;
}
