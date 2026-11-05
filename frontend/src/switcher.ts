import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import type { EntrySummary } from "./api";
import { thermostatTypeLabel } from "./localize";

export const CENTRAL = "thermostat_central_config";
/** URL value of ?new= while the type is not chosen yet. */
export const CHOOSE_TYPE = "choose";
export const TYPE_ICONS: Record<string, string> = {
  thermostat_central_config: "mdi:cog-transfer",
  thermostat_over_switch: "mdi:toggle-switch-outline",
  thermostat_over_climate: "mdi:thermostat",
  thermostat_over_valve: "mdi:pipe-valve",
};
const ACTION_COLOR: Record<string, string> = {
  heating: "var(--state-climate-heat-color, #ff8100)",
  cooling: "var(--state-climate-cool-color, #2b9af9)",
  idle: "var(--secondary-text-color)",
  off: "var(--disabled-text-color, #888)",
};

/** Row of VTherm tiles with live state; picks which VTherm the page shows, or starts a new one. */
@customElement("vtherm-switcher")
export class VThermSwitcher extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ attribute: false }) entries: EntrySummary[] = [];
  @property() selected?: string;
  @property() newType?: string;

  private select(detail: { entryId?: string; newType?: string }) {
    this.dispatchEvent(new CustomEvent("vtherm-open", { detail, bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="row" role="tablist" aria-label="Thermostats">
        ${this.entries.map((e) => this.tile(e))}
        ${this.newType
          ? html`<div class="tile selected new" role="tab" aria-selected="true">
              <ha-icon icon=${TYPE_ICONS[this.newType] ?? "mdi:plus"}></ha-icon>
              <div class="main">
                <div class="name">New VTherm</div>
                <div class="sub">${TYPE_ICONS[this.newType] ? thermostatTypeLabel(this.hass, this.newType) : "Choose a type"}</div>
              </div>
            </div>`
          : html`<button class="tile add" @click=${() => this.select({ newType: CHOOSE_TYPE })}>
              <ha-icon icon="mdi:plus"></ha-icon><span>New</span>
            </button>`}
      </div>
    `;
  }

  private tile(e: EntrySummary) {
    const central = e.thermostat_type === CENTRAL;
    const st = e.climate_entity_id ? this.hass.states[e.climate_entity_id] : undefined;
    const action: string | undefined = st?.attributes.hvac_action ?? (st?.state === "off" ? "off" : undefined);
    const unit = this.hass.config?.unit_system?.temperature ?? "°";
    const cur = st?.attributes.current_temperature;
    const target = st?.attributes.temperature;
    const selected = e.entry_id === this.selected && !this.newType;
    return html`<button
      class="tile ${selected ? "selected" : ""} ${central ? "central" : ""}"
      role="tab"
      aria-selected=${selected}
      style=${action ? `--action: ${ACTION_COLOR[action] ?? "var(--secondary-text-color)"}` : ""}
      @click=${() => this.select({ entryId: e.entry_id })}
    >
      <ha-icon icon=${TYPE_ICONS[e.thermostat_type] ?? "mdi:thermostat"}></ha-icon>
      <div class="main">
        <div class="name">${e.title}</div>
        ${central
          ? html`<div class="sub">Shared defaults</div>`
          : st
            ? html`<div class="temps">
                  <span class="cur">${cur ?? "–"}${unit}</span><span class="arrow">→</span><span>${target ?? "–"}${unit}</span>
                </div>
                <div class="sub">
                  <span class="dot"></span>${this.statusText(st)}
                </div>`
            : html`<div class="sub">${e.loaded ? "No climate entity" : "Not loaded"}</div>`}
      </div>
    </button>`;
  }

  /** What it is doing (heating, idle, off) and, when on, the active preset. */
  private statusText(st: any): string {
    if (st.state === "off") return this.hass.formatEntityState?.(st) ?? "off";
    const action = st.attributes.hvac_action ? (this.hass.formatEntityAttributeValue?.(st, "hvac_action") ?? st.attributes.hvac_action) : "";
    const preset = st.attributes.preset_mode && st.attributes.preset_mode !== "none"
      ? (this.hass.formatEntityAttributeValue?.(st, "preset_mode") ?? st.attributes.preset_mode)
      : "";
    return [action, preset].filter(Boolean).join(" · ") || (this.hass.formatEntityState?.(st) ?? st.state);
  }

  static styles = css`
    :host { display: block; }
    .row { display: flex; gap: 10px; overflow-x: auto; padding: 2px 2px 6px; scrollbar-width: thin; }
    .tile {
      all: unset; box-sizing: border-box; flex: 0 0 auto; display: flex; align-items: center; gap: 10px;
      min-width: 170px; max-width: 240px; padding: 10px 14px; border-radius: 12px; cursor: pointer;
      background: var(--ha-card-background, var(--card-background-color)); border: 1px solid var(--divider-color);
      position: relative; --mdc-icon-size: 22px;
    }
    .tile:hover { border-color: var(--secondary-text-color); }
    .tile:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .tile.selected { border-color: var(--primary-color); box-shadow: inset 0 0 0 1px var(--primary-color); }
    .tile > ha-icon { color: var(--action, var(--secondary-text-color)); }
    .tile.central > ha-icon { color: var(--secondary-text-color); }
    .main { min-width: 0; display: flex; flex-direction: column; gap: 1px; }
    .name { font-size: 15px; font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .temps { font-size: 14px; font-variant-numeric: tabular-nums; display: flex; gap: 4px; align-items: baseline; }
    .temps .cur { font-weight: 500; }
    .temps .arrow { color: var(--secondary-text-color); }
    .sub { font-size: 12px; color: var(--secondary-text-color); display: flex; align-items: center; gap: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .dot { width: 7px; height: 7px; border-radius: 50%; background: var(--action, var(--secondary-text-color)); flex-shrink: 0; }
    .tile.add { min-width: 0; color: var(--primary-color); gap: 6px; font-size: 14px; }
    .tile.new { border-style: dashed; cursor: default; }
  `;
}
