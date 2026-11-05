import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { listEntries, type EntrySummary } from "./api";
import type { VThermEditor } from "./editor";
import { loadHaFormElements } from "./load-ha-elements";
import { setLanguage, ui } from "./i18n";
import { loadVtTranslations } from "./localize";
import { CENTRAL, CHOOSE_TYPE } from "./switcher";
import "./chooser";
import "./editor";

type Selection = { entryId?: string; newType?: string };

function selectionFromUrl(): Selection {
  const q = new URLSearchParams(window.location.search);
  return { entryId: q.get("entry") ?? undefined, newType: q.get("new") ?? undefined };
}

/** Sidebar panel: VTherm switcher on top, the selected VTherm's settings below. State lives in the URL. */
@customElement("vtherm-config-panel")
export class VThermConfigPanel extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ type: Boolean }) narrow = false;
  @property({ attribute: false }) panel: any;
  @state() private ready = false;
  @state() private entries: EntrySummary[] = [];
  @state() private types: string[] = [];
  @state() private selection: Selection = selectionFromUrl();

  private onLocation = () => (this.selection = selectionFromUrl());

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("location-changed", this.onLocation);
    window.addEventListener("popstate", this.onLocation);
  }

  disconnectedCallback() {
    window.removeEventListener("location-changed", this.onLocation);
    window.removeEventListener("popstate", this.onLocation);
    super.disconnectedCallback();
  }

  async firstUpdated() {
    setLanguage(this.hass.language);
    await Promise.all([loadHaFormElements(), loadVtTranslations(this.hass), this.refreshEntries()]);
    this.ready = true;
  }

  private async refreshEntries() {
    const res = await listEntries(this.hass);
    this.entries = res.entries;
    this.types = res.thermostat_types;
  }

  private navigate(sel: Selection) {
    const editor = this.renderRoot.querySelector("vtherm-editor") as VThermEditor | null;
    if (editor?.dirty && !confirm(ui("discard"))) return;
    const query = sel.entryId ? `?entry=${sel.entryId}` : sel.newType ? `?new=${sel.newType}` : "";
    history.pushState(null, "", `${window.location.pathname}${query}`);
    window.dispatchEvent(new CustomEvent("location-changed"));
  }

  /** Without a selection in the URL, show the first VTherm (central configuration first). */
  private effectiveSelection(): Selection {
    const { entryId, newType } = this.selection;
    if (entryId || newType) return this.selection;
    return { entryId: this.entries[0]?.entry_id };
  }

  render() {
    const sel = this.effectiveSelection();
    return html`
      <div class="header">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="title">${ui("panel_title")}</div>
      </div>
      ${this.ready
        ? html`
            <div class="switcher">
              <vtherm-switcher
                .hass=${this.hass}
                .entries=${this.entries}
                .selected=${sel.entryId}
                .newType=${sel.newType}
                @vtherm-open=${(e: CustomEvent) => this.navigate(e.detail)}
              ></vtherm-switcher>
            </div>
            ${sel.newType === CHOOSE_TYPE
              ? html`<vtherm-type-chooser
                  .hass=${this.hass}
                  .types=${this.types}
                  .hasCentral=${this.entries.some((e) => e.thermostat_type === CENTRAL)}
                  @vtherm-open=${(e: CustomEvent) => this.navigate(e.detail)}
                ></vtherm-type-chooser>`
              : sel.entryId || sel.newType
              ? html`<vtherm-editor
                  .hass=${this.hass}
                  .narrow=${this.narrow}
                  .entryId=${sel.entryId}
                  .newType=${sel.newType}
                  @vtherm-open=${(e: CustomEvent) => this.navigate(e.detail)}
                  @vtherm-saved=${() => this.refreshEntries()}
                  @vtherm-created=${async (e: CustomEvent) => {
                    await this.refreshEntries();
                    this.navigate({ entryId: e.detail.entryId });
                  }}
                ></vtherm-editor>`
              : html`<div class="empty">${ui("empty")}</div>`}
          `
        : html`<div class="loading"><ha-spinner></ha-spinner></div>`}
    `;
  }

  static styles = css`
    :host { display: block; min-height: 100vh; background: var(--primary-background-color); color: var(--primary-text-color); }
    .header {
      display: flex; align-items: center; height: var(--header-height, 56px); padding: 0 12px; gap: 12px;
      background: var(--app-header-background-color); color: var(--app-header-text-color, var(--text-primary-color));
      border-bottom: var(--app-header-border-bottom, none);
    }
    .title { font-size: 20px; }
    .switcher { padding: 16px 16px 4px; max-width: 1100px; margin: 0 auto; }
    .loading, .empty { display: flex; justify-content: center; padding: 64px; color: var(--secondary-text-color); }
  `;
}
