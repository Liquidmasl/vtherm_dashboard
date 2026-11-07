// Live side panels: what VT would do with the settings being edited, on this room's real data.
// Each panel takes the effective settings (own or central) and entity ids; numbers are estimates
// from insights.ts and are labelled as such.
import { LitElement, html, svg, css, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { longest, sensorGaps, slopeHistory, tpiDecision, windowDetections, type Gap, type Sample, type SlopePoint } from "./insights";
import { live } from "./i18n";

const HOUR = 3_600_000;
const RANGES = { "24h": 24 * HOUR, "7d": 7 * 24 * HOUR } as const;
type Range = keyof typeof RANGES;

const num = (v: unknown): number | null => {
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : null;
};

// --- History (HA's history/history_during_period), cached for a few minutes per entity and range ---

const cache = new Map<string, { at: number; data: Promise<Sample[]> }>();

export function fetchHistory(hass: any, entityId: string, range: Range): Promise<Sample[]> {
  const key = `${entityId}|${range}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < 5 * 60_000) return hit.data;
  const end = new Date();
  const data = hass
    .callWS({
      type: "history/history_during_period",
      start_time: new Date(end.getTime() - RANGES[range]).toISOString(),
      end_time: end.toISOString(),
      entity_ids: [entityId],
      minimal_response: true,
      no_attributes: true,
      significant_changes_only: false,
    })
    .then((res: Record<string, { s: string; lu?: number; lc?: number }[]>) =>
      (res[entityId] ?? []).map((x) => ({ t: (x.lu ?? x.lc ?? 0) * 1000, v: num(x.s) })),
    );
  data.catch(() => cache.delete(key));
  cache.set(key, { at: Date.now(), data });
  return data;
}

const time = (hass: any, t: number, withDay: boolean) =>
  new Date(t).toLocaleString(hass?.locale?.language ?? hass?.language, {
    ...(withDay ? { weekday: "short" } : {}),
    hour: "2-digit",
    minute: "2-digit",
  });

const duration = (ms: number) => {
  const min = Math.round(ms / 60_000);
  return min < 60 ? `${min} min` : `${Math.floor(min / 60)} h ${String(min % 60).padStart(2, "0")}`;
};

const pct = (v: number) => `${Math.round(v * 100)} %`;

const shared = css`
  :host { display: block; font-size: 13px; color: var(--primary-text-color); }
  .head { display: flex; align-items: center; gap: 8px; margin-bottom: 8px; }
  .head h4 { margin: 0; flex: 1; font-size: 12px; font-weight: 500; color: var(--secondary-text-color); text-transform: uppercase; letter-spacing: 0.05em; }
  .est { font-size: 11px; padding: 1px 8px; border-radius: 10px; border: 1px dashed var(--divider-color); color: var(--secondary-text-color); }
  .seg { display: inline-flex; border: 1px solid var(--divider-color); border-radius: 6px; overflow: hidden; }
  .seg button { all: unset; cursor: pointer; padding: 1px 8px; font-size: 11px; color: var(--secondary-text-color); }
  .seg button + button { border-left: 1px solid var(--divider-color); }
  .seg button.on { background: var(--secondary-background-color); color: var(--primary-text-color); }
  .seg button:focus-visible { outline: 2px solid var(--primary-color); outline-offset: -2px; }
  .big { font-size: 22px; font-variant-numeric: tabular-nums; }
  .muted { color: var(--secondary-text-color); }
  .row { display: flex; justify-content: space-between; gap: 8px; font-variant-numeric: tabular-nums; }
  p { margin: 6px 0 0; line-height: 1.45; }
  .warn { color: var(--warning-color); }
  .vt { margin-top: 8px; padding-top: 8px; border-top: 1px solid var(--divider-color); color: var(--secondary-text-color); font-size: 12px; }
  svg { display: block; width: 100%; height: auto; overflow: visible; }
  svg text { font-size: 10px; fill: var(--secondary-text-color); }
  .tip { position: absolute; pointer-events: none; background: var(--card-background-color); border: 1px solid var(--divider-color);
    border-radius: 6px; padding: 3px 8px; font-size: 12px; white-space: nowrap; transform: translate(-50%, -100%); box-shadow: 0 2px 6px rgba(0,0,0,.25); }
  .chart { position: relative; margin-top: 6px; }
`;

// --- Heating control: the heating share TPI would compute right now ---

export interface TpiSettings {
  coefInt: number;
  coefExt: number;
  thresholdLow: number;
  thresholdHigh: number;
  cycleMin: number;
  minOnSec: number;
  minOffSec: number;
}

@customElement("vt-live-tpi")
export class LiveTpi extends LitElement {
  @property({ attribute: false }) hass: any;
  @property({ attribute: false }) settings!: TpiSettings;
  @property() climateId?: string;
  @property() sensorId?: string;
  @property() outsideId?: string;
  /** A target to try, when the thermostat has none yet or the user wants another one. */
  @state() private tryTarget?: number;

  private readings() {
    const st = (id?: string) => (id ? this.hass.states[id] : undefined);
    const climate = st(this.climateId);
    const a = climate?.attributes ?? {};
    const specific = a.specific_states ?? {};
    const current = num(a.current_temperature) ?? num(st(this.sensorId)?.state);
    const outside = num(specific.ext_current_temperature) ?? num(st(this.outsideId)?.state);
    const liveTarget = num(a.temperature);
    return {
      current,
      outside,
      liveTarget,
      target: this.tryTarget ?? liveTarget ?? 20,
      slope: num(specific.temperature_slope),
      cooling: climate?.state === "cool",
      off: climate?.state === "off",
      maxOn: num(a.configuration?.max_on_percent),
      vtShare: num(a.on_percent),
      preset: a.preset_mode as string | undefined,
      unit: a.configuration?.temperature_unit ?? this.hass.config?.unit_system?.temperature ?? "°C",
    };
  }

  render() {
    const r = this.readings();
    if (r.current === null) return html`${this.head()}<p class="muted">${live("no_temperature")}</p>`;
    const s = this.settings;
    const d = tpiDecision({
      current: r.current,
      target: r.target,
      outside: r.outside,
      slope: r.slope,
      cooling: r.cooling,
      coefInt: s.coefInt,
      coefExt: s.coefExt,
      thresholdLow: s.thresholdLow,
      thresholdHigh: s.thresholdHigh,
      maxOnPercent: r.maxOn,
      cycleMin: s.cycleMin,
      minOnSec: s.minOnSec,
      minOffSec: s.minOffSec,
    });
    const final = d.onSec / (s.cycleMin * 60);
    const deg = (v: number | null) => (v === null ? "–" : `${v.toFixed(1)} ${r.unit}`);
    return html`
      ${this.head()}
      <div class="row"><span class="muted">${live("room")}</span><span>${deg(r.current)}</span></div>
      <div class="row">
        <span class="muted">${live("target")}</span>
        <span class="target">
          <button aria-label="−" @click=${() => (this.tryTarget = Math.round((r.target - 0.5) * 10) / 10)}>−</button>
          <span class=${this.tryTarget !== undefined ? "tried" : ""}>${deg(r.target)}</span>
          <button aria-label="+" @click=${() => (this.tryTarget = Math.round((r.target + 0.5) * 10) / 10)}>+</button>
        </span>
      </div>
      <div class="row"><span class="muted">${live("outside")}</span><span>${deg(r.outside)}</span></div>
      <div class="result">
        <span class="big">${pct(final)}</span>
        <span class="muted">${live("of_each_cycle", { on: duration(d.onSec * 1000), cycle: `${s.cycleMin} min` })}</span>
      </div>
      ${this.bar(d.roomPart, d.outsidePart)}
      <div class="legend">
        <span><i class="sw room"></i>${live("room_part", { v: pct(d.roomPart) })}</span>
        <span><i class="sw out"></i>${live("outside_part", { v: pct(d.outsidePart) })}</span>
      </div>
      ${!d.stoppedByThreshold && d.roomPart > 0 && d.outsidePart > 0 && d.roomPart + d.outsidePart > 1
        ? html`<p class="muted">${live("sum_capped", { a: pct(d.roomPart), b: pct(d.outsidePart), sum: pct(d.roomPart + d.outsidePart) })}</p>`
        : nothing}
      ${d.stoppedByThreshold ? html`<p class="warn">${live("stopped_threshold")}</p>` : nothing}
      ${d.forcedByTiming === "min_on" ? html`<p class="warn">${live("forced_min_on", { v: pct(d.share) })}</p>` : nothing}
      ${d.forcedByTiming === "min_off" ? html`<p class="warn">${live("forced_min_off", { v: pct(d.share) })}</p>` : nothing}
      ${r.maxOn !== null && d.share === r.maxOn && d.roomPart + d.outsidePart > r.maxOn
        ? html`<p class="muted">${live("capped", { v: pct(r.maxOn) })}</p>`
        : nothing}
      ${this.tryTarget !== undefined
        ? html`<p class="muted">${live("tried_target")} <a href="#" @click=${this.resetTarget}>${live("reset")}</a></p>`
        : nothing}
      ${r.vtShare !== null && this.climateId
        ? html`<div class="vt">
            ${live("vt_now", { v: pct(r.vtShare) })}${r.off ? ` · ${live("vt_off")}` : r.preset === "safety" ? ` · ${live("vt_safety")}` : ""}
          </div>`
        : nothing}
    `;
  }

  private resetTarget(e: Event) {
    e.preventDefault();
    this.tryTarget = undefined;
  }

  private head() {
    return html`<div class="head"><h4>${live("tpi_title")}</h4><span class="est">${live("estimate")}</span></div>`;
  }

  /** Room part and outside part stacked on a 0–100 % track; parts below zero shown as "nothing". */
  private bar(room: number, outside: number) {
    const W = 280;
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const roomW = clamp(room) * W;
    const outW = Math.max(0, clamp(room + outside) - clamp(room)) * W;
    return html`<svg viewBox="0 0 ${W} 22" role="img" aria-label=${live("tpi_title")}>
      <rect x="0" y="4" width=${W} height="14" rx="4" fill="var(--secondary-background-color)"></rect>
      ${roomW > 0 ? svg`<rect x="0" y="4" width=${Math.max(0, roomW - (outW > 0 ? 2 : 0))} height="14" rx="4" fill="var(--primary-color)"></rect>` : nothing}
      ${outW > 0 ? svg`<rect x=${roomW} y="4" width=${outW} height="14" rx="4" fill="var(--warning-color)"></rect>` : nothing}
    </svg>`;
  }

  static styles = [
    shared,
    css`
      .row { padding: 1px 0; }
      .target { display: inline-flex; align-items: center; gap: 6px; }
      .target button { all: unset; cursor: pointer; width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 4px; border: 1px solid var(--divider-color); color: var(--secondary-text-color); font-size: 12px; }
      .target button:focus-visible { outline: 2px solid var(--primary-color); }
      .tried { color: var(--primary-color); }
      .result { display: flex; align-items: baseline; gap: 8px; margin-top: 10px; flex-wrap: wrap; }
      .legend { display: flex; gap: 12px; flex-wrap: wrap; font-size: 12px; color: var(--secondary-text-color); margin-top: 2px; }
      .sw { display: inline-block; width: 10px; height: 10px; border-radius: 3px; margin-right: 5px; vertical-align: -1px; }
      .sw.room { background: var(--primary-color); }
      .sw.out { background: var(--warning-color); }
      a { color: var(--primary-color); }
    `,
  ];
}

// --- Base for the history replays: range switch, loading, hover ---

abstract class Replay extends LitElement {
  @property({ attribute: false }) hass: any;
  @state() range: Range = "24h";
  @state() protected hover?: { x: number; y: number; text: string };

  protected rangeSwitch() {
    return html`<span class="seg" role="radiogroup">
      ${(Object.keys(RANGES) as Range[]).map(
        (r) => html`<button role="radio" aria-checked=${r === this.range} class=${r === this.range ? "on" : ""} @click=${() => (this.range = r)}>${r}</button>`,
      )}
    </span>`;
  }

  protected head(title: string) {
    return html`<div class="head"><h4>${title}</h4>${this.rangeSwitch()}<span class="est">${live("estimate")}</span></div>`;
  }

  protected tip() {
    return this.hover ? html`<div class="tip" style="left:${this.hover.x}px;top:${this.hover.y}px">${this.hover.text}</div>` : nothing;
  }
}

// --- Open window by temperature drop: replay the slope over the recorded room temperature ---

@customElement("vt-live-window")
export class LiveWindow extends Replay {
  @property() sensorId?: string;
  @property() climateId?: string;
  @property({ type: Number }) openThreshold: number | null = null;
  @property({ type: Number }) closeThreshold: number | null = null;
  @property({ type: Number }) maxDurationMin: number | null = null;
  @property({ type: Number }) cycleMin = 5;
  @state() private slopes?: SlopePoint[];
  @state() private error?: string;
  private span = { from: 0, until: 0 };

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("sensorId") || changed.has("range") || changed.has("cycleMin")) this.load();
  }

  private async load() {
    this.slopes = undefined;
    this.error = undefined;
    if (!this.sensorId) return;
    const until = Date.now();
    this.span = { from: until - RANGES[this.range], until };
    try {
      this.slopes = slopeHistory(await fetchHistory(this.hass, this.sensorId, this.range), this.cycleMin);
    } catch (e: any) {
      this.error = e?.message ?? String(e);
    }
  }

  render() {
    const head = this.head(live("window_title"));
    if (!this.sensorId) return html`${head}<p class="muted">${live("no_sensor")}</p>`;
    if (this.error) return html`${head}<p class="warn">${this.error}</p>`;
    if (!this.slopes) return html`${head}<p class="muted">${live("loading")}</p>`;
    const slopes = this.slopes.filter((p) => p.t >= this.span.from);
    if (slopes.length < 2) return html`${head}<p class="muted">${live("too_little_history")}</p>`;

    const found = windowDetections(slopes, this.openThreshold, this.closeThreshold, this.maxDurationMin, this.span.until);
    const steepest = slopes.reduce((m, p) => (p.slope < m.slope ? p : m));
    const withDay = this.range !== "24h";
    const vtSlope = num(this.hass.states[this.climateId ?? ""]?.attributes?.specific_states?.temperature_slope);
    return html`
      ${head}
      ${this.openThreshold === null
        ? html`<p>${live("window_no_threshold")}</p>`
        : found.length
          ? html`<p><span class="big">${found.length}×</span> ${live("window_detected", { range: live(`range_${this.range}`) })}</p>`
          : html`<p><span class="big">0×</span> ${live("window_never", { range: live(`range_${this.range}`) })}</p>`}
      <div class="chart">${this.chart(slopes, found, withDay)}${this.tip()}</div>
      <p class="muted">
        ${live("steepest", { v: `${steepest.slope.toFixed(1)} °/h`, at: time(this.hass, steepest.t, withDay) })}
        ${found.some((f) => f.byMaxDuration) ? html`<br />${live("ended_by_max")}` : nothing}
      </p>
      <p class="muted">${live("window_caveat")}</p>
      ${vtSlope !== null ? html`<div class="vt">${live("vt_slope", { v: `${vtSlope.toFixed(1)} °/h` })}</div>` : nothing}
    `;
  }

  private chart(slopes: SlopePoint[], found: { start: number; end: number }[], withDay: boolean) {
    const W = 280;
    const H = 120;
    const pad = { l: 26, r: 4, t: 6, b: 16 };
    const { from, until } = this.span;
    const values = slopes.map((p) => p.slope);
    const lines = [this.openThreshold !== null ? -this.openThreshold : null, this.closeThreshold].filter((v): v is number => v !== null);
    let lo = Math.min(...values, ...lines, -1);
    let hi = Math.max(...values, ...lines, 1);
    const m = (hi - lo) * 0.08;
    lo -= m;
    hi += m;
    const x = (t: number) => pad.l + ((t - from) / (until - from)) * (W - pad.l - pad.r);
    const y = (v: number) => pad.t + ((hi - v) / (hi - lo)) * (H - pad.t - pad.b);
    const path = slopes.map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)} ${y(p.slope).toFixed(1)}`).join("");
    const hourTicks = withDay ? 24 : 6;
    const ticks: number[] = [];
    for (let t = Math.ceil(from / (hourTicks * HOUR)) * hourTicks * HOUR; t < until; t += hourTicks * HOUR) ticks.push(t);

    const onMove = (e: PointerEvent) => {
      const box = (e.currentTarget as SVGElement).getBoundingClientRect();
      const t = from + (((e.clientX - box.left) / box.width) * W - pad.l) / (W - pad.l - pad.r) * (until - from);
      const p = slopes.reduce((best, q) => (Math.abs(q.t - t) < Math.abs(best.t - t) ? q : best));
      const scale = box.width / W;
      this.hover = { x: x(p.t) * scale, y: y(p.slope) * scale - 6, text: `${time(this.hass, p.t, withDay)} · ${p.slope.toFixed(1)} °/h` };
    };
    return html`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label=${live("window_title")}
      @pointermove=${onMove} @pointerleave=${() => (this.hover = undefined)}>
      ${found.map(
        (f) => svg`<rect x=${x(f.start)} y=${pad.t} width=${Math.max(2, x(f.end) - x(f.start))} height=${H - pad.t - pad.b}
          fill="var(--warning-color)" opacity="0.22"></rect>`,
      )}
      <line x1=${pad.l} x2=${W - pad.r} y1=${y(0)} y2=${y(0)} stroke="var(--divider-color)"></line>
      ${this.openThreshold !== null
        ? svg`<line x1=${pad.l} x2=${W - pad.r} y1=${y(-this.openThreshold)} y2=${y(-this.openThreshold)} stroke="var(--warning-color)" stroke-dasharray="4 3"></line>
          <text x=${W - pad.r} y=${y(-this.openThreshold) + 11} text-anchor="end">${live("open_line")}</text>`
        : nothing}
      ${this.closeThreshold !== null
        ? svg`<line x1=${pad.l} x2=${W - pad.r} y1=${y(this.closeThreshold)} y2=${y(this.closeThreshold)} stroke="var(--secondary-text-color)" stroke-dasharray="2 3"></line>
          <text x=${W - pad.r} y=${y(this.closeThreshold) - 3} text-anchor="end">${live("close_line")}</text>`
        : nothing}
      <path d=${path} fill="none" stroke="var(--primary-color)" stroke-width="2" stroke-linejoin="round"></path>
      <text x=${pad.l - 4} y=${y(hi - m) + 3} text-anchor="end">${(hi - m).toFixed(0)}</text>
      <text x=${pad.l - 4} y=${y(0) + 3} text-anchor="end">0</text>
      <text x=${pad.l - 4} y=${y(lo + m) + 3} text-anchor="end">${(lo + m).toFixed(0)}</text>
      ${ticks.map((t) => svg`<text x=${x(t)} y=${H - 3} text-anchor="middle">${time(this.hass, t, withDay).replace(/:00$/, "")}</text>`)}
    </svg>
    <div class="axis-note">°/h</div>`;
  }

  static styles = [shared, css`.axis-note { position: absolute; left: 0; top: -2px; font-size: 10px; color: var(--secondary-text-color); }`];
}

// --- Sensor loss: silences of the room (and outside) sensor against the safety delay ---

@customElement("vt-live-safety")
export class LiveSafety extends Replay {
  @property() sensorId?: string;
  @property() outsideId?: string;
  @property({ type: Number }) delayMin: number | null = null;
  @property({ type: Number }) minOnPercent: number | null = null;
  @property({ type: Boolean }) overClimate = false;
  @state() private gaps?: { id: string; label: string; gaps: Gap[] }[];
  @state() private error?: string;
  private span = { from: 0, until: 0 };

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("sensorId") || changed.has("outsideId") || changed.has("range")) this.load();
  }

  private async load() {
    this.gaps = undefined;
    this.error = undefined;
    const until = Date.now();
    const from = until - RANGES[this.range];
    this.span = { from, until };
    const sensors = [
      { id: this.sensorId, label: live("room_sensor") },
      { id: this.outsideId, label: live("outside_sensor") },
    ].filter((s): s is { id: string; label: string } => !!s.id);
    try {
      this.gaps = await Promise.all(
        sensors.map(async (s) => ({ ...s, gaps: sensorGaps(await fetchHistory(this.hass, s.id, this.range), from, until) })),
      );
    } catch (e: any) {
      this.error = e?.message ?? String(e);
    }
  }

  render() {
    const head = this.head(live("safety_title"));
    if (this.overClimate) return html`${head}<p>${live("safety_over_climate")}</p>`;
    if (!this.sensorId) return html`${head}<p class="muted">${live("no_sensor")}</p>`;
    if (this.error) return html`${head}<p class="warn">${this.error}</p>`;
    if (!this.gaps) return html`${head}<p class="muted">${live("loading")}</p>`;
    const delayMs = (this.delayMin ?? 0) * 60_000;
    const withDay = this.range !== "24h";
    const triggers = this.delayMin ? this.gaps.flatMap((s) => s.gaps.filter((g) => g.end - g.start > delayMs)).length : 0;
    return html`
      ${head}
      ${this.delayMin
        ? html`<p>
            <span class="big">${triggers}×</span>
            ${live(triggers ? "safety_would" : "safety_never", { range: live(`range_${this.range}`), delay: `${this.delayMin} min` })}
          </p>`
        : nothing}
      ${this.gaps.map((s) => this.strip(s.label, s.gaps, delayMs, withDay))}
      <div class="row ends"><span>${live(`ago_${this.range}`)}</span><span>${live("now")}</span></div>
      ${this.tip()}
      ${this.minOnPercent !== null ? html`<p class="muted">${live("safety_caveat", { v: pct(this.minOnPercent) })}</p>` : nothing}
    `;
  }

  /** The period as a bar; silences longer than the delay in the warning colour, nearly as long ones faintly. */
  private strip(label: string, gaps: Gap[], delayMs: number, withDay: boolean) {
    const W = 280;
    const { from, until } = this.span;
    const x = (t: number) => ((Math.max(t, from) - from) / (until - from)) * W;
    const top = longest(gaps);
    const shown = gaps.filter((g) => delayMs && g.end - g.start > delayMs * 0.75);
    const hoverGap = (g: Gap) => (e: PointerEvent) => {
      const host = this.renderRoot.querySelector(".wrap") as HTMLElement | null;
      const box = (e.currentTarget as SVGElement).getBoundingClientRect();
      const hostBox = host?.getBoundingClientRect() ?? box;
      this.hover = {
        x: box.left - hostBox.left + box.width / 2,
        y: box.top - hostBox.top - 4,
        text: `${time(this.hass, g.start, withDay)} → ${g.open ? live("now") : time(this.hass, g.end, withDay)} · ${duration(g.end - g.start)}`,
      };
    };
    return html`<div class="sensor">
      <div class="row"><span>${label}</span>
        <span class="muted">${top ? live("longest", { v: duration(top.end - top.start) }) : ""}</span></div>
      <svg viewBox="0 0 ${W} 14" role="img" aria-label=${label}>
        <rect x="0" y="3" width=${W} height="8" rx="4" fill="var(--secondary-background-color)"></rect>
        ${shown.map((g) => {
          const over = g.end - g.start > delayMs;
          return svg`<rect x=${x(g.start)} y=${over ? 1 : 3} width=${Math.max(3, x(g.end) - x(g.start))} height=${over ? 12 : 8} rx="3"
            fill=${over ? "var(--warning-color)" : "var(--secondary-text-color)"} opacity=${over ? 1 : 0.45}
            @pointerenter=${hoverGap(g)} @pointerleave=${() => (this.hover = undefined)}></rect>`;
        })}
      </svg>
    </div>`;
  }

  protected tip() {
    return html`<div class="wrap">${super.tip()}</div>`;
  }

  static styles = [
    shared,
    css`
      :host { position: relative; }
      .sensor { margin-top: 8px; }
      .sensor svg { margin-top: 3px; }
      .ends { font-size: 10px; color: var(--secondary-text-color); margin-top: 2px; }
      .wrap { position: absolute; inset: 0; pointer-events: none; }
    `,
  ];
}
