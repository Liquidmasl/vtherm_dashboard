import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { loadHaFormElements } from "./load-ha-elements";
import { loadVtTranslations } from "./localize";
import "./list";
import "./editor";

type View = { kind: "list" } | { kind: "edit"; entryId: string } | { kind: "new"; type: string };

function viewFromUrl(): View {
  const q = new URLSearchParams(window.location.search);
  const entry = q.get("entry");
  const type = q.get("new");
  if (entry) return { kind: "edit", entryId: entry };
  if (type) return { kind: "new", type };
  return { kind: "list" };
}

/** Sidebar panel: list of VTherms, one page per VTherm. State lives in the URL (?entry= / ?new=). */
@customElement("vtherm-config-panel")
export class VThermConfigPanel extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ type: Boolean }) narrow = false;
  @property({ attribute: false }) panel: any;
  @state() private ready = false;
  @state() private view: View = viewFromUrl();

  private onLocation = () => (this.view = viewFromUrl());

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
    await Promise.all([loadHaFormElements(), loadVtTranslations(this.hass)]);
    this.ready = true;
  }

  private navigate(query: string) {
    history.pushState(null, "", `${window.location.pathname}${query}`);
    window.dispatchEvent(new CustomEvent("location-changed"));
  }

  render() {
    return html`
      <div class="header">
        <ha-menu-button .hass=${this.hass} .narrow=${this.narrow}></ha-menu-button>
        <div class="title">Versatile Thermostat</div>
      </div>
      ${this.ready ? this.renderView() : html`<div class="loading"><ha-spinner></ha-spinner></div>`}
    `;
  }

  private renderView() {
    const v = this.view;
    if (v.kind === "list") {
      return html`<vtherm-list
        .hass=${this.hass}
        @vtherm-open=${(e: CustomEvent) => this.navigate(e.detail.entryId ? `?entry=${e.detail.entryId}` : `?new=${e.detail.newType}`)}
      ></vtherm-list>`;
    }
    return html`<vtherm-editor
      .hass=${this.hass}
      .narrow=${this.narrow}
      .entryId=${v.kind === "edit" ? v.entryId : undefined}
      .newType=${v.kind === "new" ? v.type : undefined}
      @vtherm-back=${() => this.navigate("")}
      @vtherm-created=${(e: CustomEvent) => this.navigate(`?entry=${e.detail.entryId}`)}
    ></vtherm-editor>`;
  }

  static styles = css`
    :host { display: block; min-height: 100vh; background: var(--primary-background-color); color: var(--primary-text-color); }
    .header {
      display: flex; align-items: center; height: var(--header-height, 56px); padding: 0 12px; gap: 12px;
      background: var(--app-header-background-color); color: var(--app-header-text-color, var(--text-primary-color));
      border-bottom: var(--app-header-border-bottom, none);
    }
    .title { font-size: 20px; }
    .loading { display: flex; justify-content: center; padding: 64px; }
  `;
}
