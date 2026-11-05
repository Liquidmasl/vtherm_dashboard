import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { CENTRAL, TYPE_ICONS } from "./switcher";
import { typeText, ui } from "./i18n";

/** First step of a new VTherm: what kind of device it drives, explained. */
@customElement("vtherm-type-chooser")
export class VThermTypeChooser extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ attribute: false }) types: string[] = [];
  @property({ type: Boolean }) hasCentral = false;

  private pick(type: string) {
    this.dispatchEvent(new CustomEvent("vtherm-open", { detail: { newType: type }, bubbles: true, composed: true }));
  }

  render() {
    // Central configuration last when it exists already (it is unique), first when it does not.
    const devices = this.types.filter((t) => t !== CENTRAL);
    const ordered = this.hasCentral ? devices : [CENTRAL, ...devices];
    return html`
      <h2>${ui("chooser_question")}</h2>
      ${this.hasCentral
        ? ""
        : html`<p class="hint">${ui("chooser_no_central")}</p>`}
      <div class="grid">
        ${ordered.map((t) => {
          const text = typeText(t);
          return html`<button class="type ${t === CENTRAL ? "central" : ""}" @click=${() => this.pick(t)}>
            <ha-icon icon=${TYPE_ICONS[t]}></ha-icon>
            <span class="title">${text?.title ?? t}</span>
            <span class="body">${text?.body ?? ""}</span>
            <span class="examples">${text?.examples ?? ""}</span>
          </button>`;
        })}
      </div>
    `;
  }

  static styles = css`
    :host { display: block; max-width: 1100px; margin: 0 auto; padding: 8px 16px 32px; box-sizing: border-box; }
    h2 { font-size: 20px; font-weight: 500; margin: 8px 0 4px; }
    .hint { color: var(--secondary-text-color); margin: 0 0 16px; max-width: 70ch; }
    .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; margin-top: 16px; }
    .type {
      all: unset; box-sizing: border-box; cursor: pointer; display: flex; flex-direction: column; gap: 8px; padding: 20px;
      border-radius: 12px; border: 1px solid var(--divider-color); background: var(--ha-card-background, var(--card-background-color));
      --mdc-icon-size: 32px;
    }
    .type:hover { border-color: var(--primary-color); }
    .type:focus-visible { outline: 2px solid var(--primary-color); outline-offset: 2px; }
    .type ha-icon { color: var(--primary-color); }
    .title { font-size: 17px; font-weight: 500; }
    .body { font-size: 14px; color: var(--primary-text-color); line-height: 1.45; }
    .examples { font-size: 13px; color: var(--secondary-text-color); line-height: 1.4; }
    .type.central { border-style: dashed; }
  `;
}
