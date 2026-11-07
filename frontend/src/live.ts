// Live side panels: what VT would do with the settings being edited, on this room's real data.
// Each panel takes the effective settings (own or central) and entity ids; numbers are estimates
// from insights.ts and are labelled as such.
import { LitElement, html, svg, css, nothing, type PropertyValues, type TemplateResult } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import {
  longest,
  sensorGaps,
  slopeHistory,
  comfortStats,
  temperatureHistory,
  tpiDecision,
  tpiHistory,
  windowDetections,
  type Gap,
  type Sample,
  type SlopePoint,
  type TargetSample,
  type TpiPoint,
} from "./insights";
import { live } from "./i18n";

const HOUR = 3_600_000;
const RANGES = { "24h": 24 * HOUR, "7d": 7 * 24 * HOUR } as const;
type Range = keyof typeof RANGES;
/** A replay range, or the heating panel's "right now" view. */
type Tab = "now" | Range;

const num = (v: unknown): number | null => {
  const n = typeof v === "number" ? v : typeof v === "string" && v.trim() !== "" ? Number(v) : NaN;
  return Number.isFinite(n) ? n : null;
};

// --- History (HA's history/history_during_period), cached for a few minutes per entity and range ---

type HistoryRow = { s: string; a?: Record<string, any>; lu?: number; lc?: number };
const cache = new Map<string, { at: number; data: Promise<HistoryRow[]> }>();

/** Recorded states of one entity over the range; attributes only when asked for (heavier). */
function history(hass: any, entityId: string, range: Range, attributes = false): Promise<HistoryRow[]> {
  const key = `${entityId}|${range}|${attributes}`;
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < 5 * 60_000) return hit.data;
  const end = new Date();
  const data = hass
    .callWS({
      type: "history/history_during_period",
      start_time: new Date(end.getTime() - RANGES[range]).toISOString(),
      end_time: end.toISOString(),
      entity_ids: [entityId],
      minimal_response: !attributes,
      no_attributes: !attributes,
      significant_changes_only: false,
    })
    .then((res: Record<string, HistoryRow[]>) => res[entityId] ?? []);
  data.catch(() => cache.delete(key));
  cache.set(key, { at: Date.now(), data });
  return data;
}

const rowTime = (x: HistoryRow) => (x.lu ?? x.lc ?? 0) * 1000;

/** Numeric history of a sensor; no entity gives an empty history. */
export const fetchHistory = async (hass: any, entityId: string | undefined, range: Range): Promise<Sample[]> =>
  entityId ? (await history(hass, entityId, range)).map((x) => ({ t: rowTime(x), v: num(x.s) })) : [];

/** The thermostat's recorded mode and target temperature. */
const fetchTargets = async (hass: any, climateId: string, range: Range): Promise<TargetSample[]> =>
  (await history(hass, climateId, range, true)).map((x) => ({ t: rowTime(x), mode: x.s, target: num(x.a?.temperature) }));

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
  .chart { position: relative; margin-top: 16px; }
  .legend { display: flex; gap: 4px 12px; flex-wrap: wrap; font-size: 12px; color: var(--secondary-text-color); margin-top: 4px; }
  .sw { display: inline-block; width: 12px; height: 3px; border-radius: 2px; margin-right: 5px; vertical-align: 3px; }
  .sw.box { height: 10px; width: 10px; vertical-align: -1px; }
  .sw.dash { background: none !important; border-top: 2px dashed var(--secondary-text-color); height: 0; }
  .unit { position: absolute; left: 0; top: -12px; font-size: 10px; color: var(--secondary-text-color); }
`;

// --- A small time chart: lines (optionally filled), horizontal reference lines, shaded bands, hover ---

interface ChartLine {
  points: { t: number; v: number }[];
  color: string;
  dash?: string;
  /** Fill between the line and zero. */
  area?: boolean;
}

interface ChartSpec {
  from: number;
  until: number;
  withDay: boolean;
  lines: ChartLine[];
  refs?: { v: number; color: string; dash: string; label: string; below?: boolean }[];
  bands?: { start: number; end: number }[];
  /** Always include these values in the y range. */
  include?: number[];
  /** Hard limits for the y range (outliers are clipped). */
  clamp?: [number, number];
  fmt: (v: number) => string;
  unit: string;
  /** Points further apart than this break the line (thermostat off, no data). */
  maxGapMs?: number;
  /** Tooltip text for the point nearest to the pointer, from the first line. */
  hoverText: (t: number) => string;
  /** Time of a crosshair shared with other charts of the panel. */
  cursor?: number;
}

type Hover = { x: number; y: number; text: string; t: number; chart: number };

function timeChart(hass: any, spec: ChartSpec, onHover: (h?: Omit<Hover, "chart">) => void): TemplateResult {
  const W = 280;
  const H = 120;
  const pad = { l: 30, r: 4, t: 6, b: 16 };
  const { from, until } = spec;
  const values = spec.lines.flatMap((l) => l.points.map((p) => p.v));
  let lo = Math.min(...values, ...(spec.include ?? []), ...(spec.refs ?? []).map((r) => r.v));
  let hi = Math.max(...values, ...(spec.include ?? []), ...(spec.refs ?? []).map((r) => r.v));
  if (spec.clamp) [lo, hi] = [Math.max(lo, spec.clamp[0]), Math.min(hi, spec.clamp[1])];
  const m = (hi - lo || 1) * 0.06;
  const [top, bottom] = [hi + m, lo - m];
  const x = (t: number) => pad.l + ((t - from) / (until - from)) * (W - pad.l - pad.r);
  const y = (v: number) => pad.t + ((top - Math.max(bottom, Math.min(top, v))) / (top - bottom)) * (H - pad.t - pad.b);
  const gap = spec.maxGapMs ?? Infinity;
  const segments = (pts: ChartLine["points"]) => {
    const out: ChartLine["points"][] = [];
    pts.forEach((p, i) => (i && p.t - pts[i - 1].t <= gap ? out[out.length - 1].push(p) : out.push([p])));
    return out;
  };
  const d = (pts: ChartLine["points"]) => pts.map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)} ${y(p.v).toFixed(1)}`).join("");
  const tickEvery = (spec.withDay ? 24 : 6) * HOUR;
  const ticks: number[] = [];
  for (let t = Math.ceil(from / tickEvery) * tickEvery; t < until; t += tickEvery) ticks.push(t);
  const anchor = spec.lines[0]?.points ?? [];

  const onMove = (e: PointerEvent) => {
    if (!anchor.length) return;
    const box = (e.currentTarget as SVGElement).getBoundingClientRect();
    const t = from + ((((e.clientX - box.left) / box.width) * W - pad.l) / (W - pad.l - pad.r)) * (until - from);
    const p = anchor.reduce((best, q) => (Math.abs(q.t - t) < Math.abs(best.t - t) ? q : best));
    const scale = box.width / W;
    onHover({ x: x(p.t) * scale, y: y(p.v) * scale - 6, text: spec.hoverText(p.t), t: p.t });
  };
  return html`<svg viewBox="0 0 ${W} ${H}" role="img" @pointermove=${onMove} @pointerleave=${() => onHover(undefined)}>
      ${(spec.bands ?? []).map(
        (b) => svg`<rect x=${x(b.start)} y=${pad.t} width=${Math.max(3, x(b.end) - x(b.start))} height=${H - pad.t - pad.b}
          fill="var(--warning-color)" opacity="0.25"></rect>`,
      )}
      <line x1=${pad.l} x2=${W - pad.r} y1=${y(0)} y2=${y(0)} stroke="var(--divider-color)"></line>
      ${(spec.refs ?? []).map(
        (r) => svg`<line x1=${pad.l} x2=${W - pad.r} y1=${y(r.v)} y2=${y(r.v)} stroke=${r.color} stroke-dasharray=${r.dash}></line>
          <text x=${W - pad.r} y=${r.below ? y(r.v) + 11 : y(r.v) - 3} text-anchor="end">${r.label}</text>`,
      )}
      ${spec.lines.map((l) =>
        segments(l.points).map((seg) =>
          l.area
            ? svg`<path d=${`${d(seg)}L${x(seg[seg.length - 1].t).toFixed(1)} ${y(0)}L${x(seg[0].t).toFixed(1)} ${y(0)}Z`}
                fill=${l.color} opacity="0.15"></path>`
            : svg`<path d=${d(seg)} fill="none" stroke=${l.color} stroke-width="2" stroke-dasharray=${l.dash ?? ""}
                stroke-linejoin="round" stroke-linecap="round"></path>`,
        ),
      )}
      ${spec.cursor !== undefined && spec.cursor >= from && spec.cursor <= until
        ? svg`<line x1=${x(spec.cursor)} x2=${x(spec.cursor)} y1=${pad.t} y2=${H - pad.b} stroke="var(--secondary-text-color)" stroke-width="1"></line>`
        : nothing}
      <text x=${pad.l - 4} y=${y(hi) + 3} text-anchor="end">${spec.fmt(hi)}</text>
      ${lo < 0 && hi > 0 && Math.min(y(lo) - y(0), y(0) - y(hi)) > 10 ? svg`<text x=${pad.l - 4} y=${y(0) + 3} text-anchor="end">0</text>` : nothing}
      <text x=${pad.l - 4} y=${y(lo) + 3} text-anchor="end">${spec.fmt(lo)}</text>
      ${ticks.map((t) => svg`<text x=${x(t)} y=${H - 3} text-anchor="middle">${time(hass, t, spec.withDay).replace(/:00$/, "")}</text>`)}
    </svg>
    <div class="unit">${spec.unit}</div>`;
}

// --- Base for the panels: tabs (ranges), hover tooltip ---

abstract class Replay extends LitElement {
  @property({ attribute: false }) hass: any;
  @state() range: Tab = "24h";
  @state() hover?: Hover;
  protected tabs: Tab[] = ["24h", "7d"];

  protected tabSwitch() {
    return html`<span class="seg" role="radiogroup">
      ${this.tabs.map(
        (r) => html`<button role="radio" aria-checked=${r === this.range} class=${r === this.range ? "on" : ""} @click=${() => (this.range = r)}>
          ${r === "now" ? live("tab_now") : r}
        </button>`,
      )}
    </span>`;
  }

  protected head(title: string) {
    return html`<div class="head"><h4>${title}</h4>${this.tabSwitch()}<span class="est">${live("estimate")}</span></div>`;
  }

  protected get rangeMs() {
    return this.range === "now" ? 0 : RANGES[this.range];
  }

  /** A chart of this panel; charts with the same `index` share hover, all share the crosshair. */
  protected chart(spec: ChartSpec, index = 0) {
    const h = this.hover;
    return html`<div class="chart">
      ${timeChart(this.hass, { ...spec, cursor: h?.t }, (next) => (this.hover = next ? { ...next, chart: index } : undefined))}
      ${h && h.chart === index ? this.tipAt(h) : nothing}
    </div>`;
  }

  protected tipAt(h: { x: number; y: number; text: string }) {
    return html`<div class="tip" style="left:${h.x}px;top:${h.y}px">${h.text}</div>`;
  }

  protected tip() {
    return this.hover ? this.tipAt(this.hover) : nothing;
  }
}

// --- Heating control: the heating share TPI computes, right now (with the arithmetic) and over time ---

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
export class LiveTpi extends Replay {
  @property({ attribute: false }) settings!: TpiSettings;
  @property({ attribute: false }) entities: { climate?: string; power_percent?: string; temperature_slope?: string } = {};
  @property() sensorId?: string;
  @property() outsideId?: string;
  /** A target to try, when the thermostat has none yet or the user wants another one. */
  @state() private tryTarget?: number;
  @state() private recorded?: { room: Sample[]; outside: Sample[]; targets: TargetSample[]; slope: Sample[]; vt: Sample[] };
  @state() private error?: string;
  protected tabs: Tab[] = ["now", "24h", "7d"];
  private span = { from: 0, until: 0 };

  protected willUpdate(changed: PropertyValues<this>) {
    if (this.range !== "now" && (changed.has("range") || changed.has("sensorId") || changed.has("outsideId") || changed.has("entities"))) this.load();
  }

  private async load() {
    this.recorded = undefined;
    this.error = undefined;
    const range = this.range as Range;
    const until = Date.now();
    this.span = { from: until - RANGES[range], until };
    const climate = this.entities.climate;
    try {
      const [room, outside, targets, slope, vt] = await Promise.all([
        fetchHistory(this.hass, this.sensorId, range),
        fetchHistory(this.hass, this.outsideId, range),
        climate ? fetchTargets(this.hass, climate, range) : Promise.resolve([]),
        fetchHistory(this.hass, this.entities.temperature_slope, range),
        fetchHistory(this.hass, this.entities.power_percent, range),
      ]);
      this.recorded = { room, outside, targets, slope, vt };
    } catch (e: any) {
      this.error = e?.message ?? String(e);
    }
  }

  render() {
    const head = this.head(live("tpi_title"));
    if (this.range === "now") return html`${head}${this.renderNow()}`;
    if (this.error) return html`${head}<p class="warn">${this.error}</p>`;
    if (!this.recorded) return html`${head}<p class="muted">${live("loading")}</p>`;
    if (!this.entities.climate) return html`${head}<p class="muted">${live("tpi_no_history")}</p>`;
    return html`${head}${this.renderHistory()}`;
  }

  // Now: today's values and how the share is made of them.

  private readings() {
    const st = (id?: string) => (id ? this.hass.states[id] : undefined);
    const climate = st(this.entities.climate);
    const a = climate?.attributes ?? {};
    const specific = a.specific_states ?? {};
    const liveTarget = num(a.temperature);
    return {
      current: num(a.current_temperature) ?? num(st(this.sensorId)?.state),
      outside: num(specific.ext_current_temperature) ?? num(st(this.outsideId)?.state),
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

  private renderNow() {
    const r = this.readings();
    if (r.current === null) return html`<p class="muted">${live("no_temperature")}</p>`;
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
    const deg = (v: number) => `${v.toFixed(1)}°`;
    // Heating: target − temperature; cooling the other way round (VT's delta_temp).
    const gap = (temp: number) => (r.cooling ? temp - r.target : r.target - temp);
    const diff = (temp: number) => (r.cooling ? `${deg(temp)} − ${deg(r.target)}` : `${deg(r.target)} − ${deg(temp)}`);
    const sum = d.roomPart + d.outsidePart;
    return html`
      <div class="row target-row">
        <span class="muted">${live("target")}</span>
        <span class="target">
          <button aria-label="−" @click=${() => (this.tryTarget = Math.round((r.target - 0.5) * 10) / 10)}>−</button>
          <span class=${this.tryTarget !== undefined ? "tried" : ""}>${r.target.toFixed(1)} ${r.unit}</span>
          <button aria-label="+" @click=${() => (this.tryTarget = Math.round((r.target + 0.5) * 10) / 10)}>+</button>
        </span>
      </div>
      <div class="calc">
        <span class="lbl"><i class="sw box room"></i>${live("room")}</span>
        <span class="expr">(${diff(r.current)}) × ${s.coefInt}</span>
        <span class="res">${pct(d.roomPart)}</span>
        <span class="sub">${live("calc_room", { gap: deg(gap(r.current)), coef: "coef_int" })}</span>
        ${r.outside !== null
          ? html`<span class="lbl"><i class="sw box out"></i>${live("outside")}</span>
              <span class="expr">(${diff(r.outside)}) × ${s.coefExt}</span>
              <span class="res">${pct(d.outsidePart)}</span>
              <span class="sub">${live("calc_outside", { gap: deg(gap(r.outside)), coef: "coef_ext" })}</span>`
          : html`<span class="lbl">${live("outside")}</span><span class="expr muted">${live("no_outside")}</span><span class="res">0 %</span>`}
        <span class="lbl total">${live("sum")}</span><span class="expr total"></span><span class="res total">${pct(sum)}</span>
      </div>
      ${this.bar(d.roomPart, d.outsidePart)}
      <div class="result">
        <span class="big">${pct(final)}</span>
        <span class="muted">${live("of_each_cycle", { on: duration(d.onSec * 1000), cycle: `${s.cycleMin} min` })}</span>
      </div>
      ${!d.stoppedByThreshold && sum > 1 ? html`<p class="muted">${live("capped_100")}</p>` : nothing}
      ${!d.stoppedByThreshold && sum < 0 ? html`<p class="muted">${live("below_0")}</p>` : nothing}
      ${d.stoppedByThreshold ? html`<p class="warn">${live("stopped_threshold")}</p>` : nothing}
      ${d.forcedByTiming === "min_on" ? html`<p class="warn">${live("forced_min_on", { v: pct(d.share) })}</p>` : nothing}
      ${d.forcedByTiming === "min_off" ? html`<p class="warn">${live("forced_min_off", { v: pct(d.share) })}</p>` : nothing}
      ${r.maxOn !== null && d.share === r.maxOn && sum > r.maxOn ? html`<p class="muted">${live("capped", { v: pct(r.maxOn) })}</p>` : nothing}
      ${this.tryTarget !== undefined
        ? html`<p class="muted">${live("tried_target")} <a href="#" @click=${this.resetTarget}>${live("reset")}</a></p>`
        : nothing}
      ${r.vtShare !== null && this.entities.climate
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

  /** Room part and outside part stacked on a 0–100 % track (negative parts left out). */
  private bar(room: number, outside: number) {
    const W = 280;
    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const roomW = clamp(room) * W;
    const outW = Math.max(0, clamp(room + outside) - clamp(room)) * W;
    return html`<svg viewBox="0 0 ${W} 22" role="img" aria-label=${live("tpi_title")}>
      <rect x="0" y="4" width=${W} height="14" rx="4" fill="var(--card-background-color)"></rect>
      ${roomW > 0 ? svg`<rect x="0" y="4" width=${Math.max(0, roomW - (outW > 0 ? 2 : 0))} height="14" rx="4" fill="var(--primary-color)"></rect>` : nothing}
      ${outW > 0 ? svg`<rect x=${roomW} y="4" width=${outW} height="14" rx="4" fill="var(--warning-color)"></rect>` : nothing}
    </svg>`;
  }

  // 24 h / 7 d: the share replayed on the recorded temperatures and targets, against VT's recorded one.

  private renderHistory() {
    const rec = this.recorded!;
    const s = this.settings;
    const { from, until } = this.span;
    const pts: TpiPoint[] = tpiHistory(
      rec.room,
      rec.outside,
      rec.targets,
      rec.slope,
      rec.vt,
      {
        coefInt: s.coefInt,
        coefExt: s.coefExt,
        thresholdLow: s.thresholdLow,
        thresholdHigh: s.thresholdHigh,
        maxOnPercent: num(this.hass.states[this.entities.climate!]?.attributes?.configuration?.max_on_percent),
        cycleMin: s.cycleMin,
        minOnSec: s.minOnSec,
        minOffSec: s.minOffSec,
      },
      from,
      until,
    );
    if (pts.length < 2) return html`<p class="muted">${live("too_little_history")}</p>`;
    const withDay = this.range !== "24h";
    const mean = (vals: number[]) => vals.reduce((a, b) => a + b, 0) / (vals.length || 1);
    const withVt = pts.filter((p) => p.vt !== null);
    const at = (t: number) => pts.find((p) => p.t === t)!;
    const line = (f: (p: TpiPoint) => number | null) =>
      pts.flatMap((p) => (f(p) === null ? [] : [{ t: p.t, v: f(p)! * 100 }]));
    const step = (until - from) / 299;
    const temps = temperatureHistory(rec.room, rec.targets, from, until);
    const comfort = comfortStats(temps);
    const tAt = new Map(temps.map((p) => [p.t, p]));
    const unit = this.hass.config?.unit_system?.temperature ?? "°C";
    const deg = (v: number) => `${v.toFixed(1)}°`;
    return html`
      ${comfort
        ? html`<p>
            <span class="big">${pct(comfort.inBand)}</span> ${live("comfort_in_band", { range: live(`range_${this.range}`) })}
            <br /><span class="muted">${live("comfort_extremes", { above: deg(comfort.maxAbove), below: deg(comfort.maxBelow) })}</span>
          </p>`
        : nothing}
      ${temps.length > 1
        ? html`${this.chart(
              {
                from,
                until,
                withDay,
                lines: [
                  { points: temps.map((p) => ({ t: p.t, v: p.room })), color: "var(--primary-color)" },
                  {
                    points: temps.flatMap((p) => (p.target === null ? [] : [{ t: p.t, v: p.target }])),
                    color: "var(--secondary-text-color)",
                    dash: "4 3",
                  },
                ],
                bands: comfort?.overshoots,
                fmt: (v) => v.toFixed(1),
                unit,
                maxGapMs: step * 1.5,
                hoverText: (t) => {
                  const p = tAt.get(t)!;
                  return `${time(this.hass, t, withDay)} · ${deg(p.room)}${p.target !== null ? ` / ${live("target")} ${deg(p.target)}` : ""}`;
                },
              },
              1,
            )}
            <div class="legend">
              <span><i class="sw room"></i>${live("legend_room_temp")}</span>
              <span><i class="sw dash"></i>${live("legend_target")}</span>
              ${comfort?.overshoots.length ? html`<span><i class="sw box over"></i>${live("legend_overshoot")}</span>` : nothing}
              <span class="tag">${live("recorded")}</span>
            </div>`
        : nothing}
      <p class="split"><span class="big">${pct(mean(pts.map((p) => p.share)))}</span> ${live("tpi_mean", { range: live(`range_${this.range}`) })}</p>
      ${this.chart({
        from,
        until,
        withDay,
        lines: [
          { points: line((p) => p.share), color: "var(--primary-text-color)", area: true },
          { points: line((p) => p.roomPart), color: "var(--primary-color)" },
          { points: line((p) => p.outsidePart), color: "var(--warning-color)" },
          { points: line((p) => p.vt), color: "var(--secondary-text-color)", dash: "3 3" },
        ],
        include: [0, 100],
        clamp: [-100, 150],
        fmt: (v) => `${Math.round(v)}`,
        unit: "%",
        maxGapMs: step * 1.5,
        hoverText: (t) => {
          const p = at(t);
          return `${time(this.hass, t, withDay)} · ${pct(p.share)} = ${pct(p.roomPart)} + ${pct(p.outsidePart)}${p.vt !== null ? ` · VT ${pct(p.vt)}` : ""}`;
        },
      })}
      <div class="legend">
        <span><i class="sw box req"></i>${live("legend_request")}</span>
        <span><i class="sw room"></i>${live("legend_room")}</span>
        <span><i class="sw out"></i>${live("legend_outside")}</span>
        ${withVt.length ? html`<span><i class="sw dash"></i>${live("legend_vt")}</span>` : nothing}
      </div>
      ${withVt.length
        ? html`<div class="vt">
            ${live("tpi_vs_vt", {
              ours: pct(mean(withVt.map((p) => p.share))),
              vt: pct(mean(withVt.map((p) => p.vt!))),
            })}
          </div>`
        : nothing}
    `;
  }

  static styles = [
    shared,
    css`
      .target { display: inline-flex; align-items: center; gap: 6px; }
      .target button { all: unset; cursor: pointer; width: 18px; height: 18px; line-height: 18px; text-align: center; border-radius: 4px; border: 1px solid var(--divider-color); color: var(--secondary-text-color); font-size: 12px; }
      .target button:focus-visible { outline: 2px solid var(--primary-color); }
      .tried { color: var(--primary-color); }
      .calc { display: grid; grid-template-columns: auto 1fr auto; gap: 0 8px; margin: 8px 0 4px; font-variant-numeric: tabular-nums; align-items: baseline; }
      .calc .expr { color: var(--secondary-text-color); font-size: 12px; white-space: nowrap; }
      .calc .res { text-align: right; }
      .calc .sub { grid-column: 2 / -1; font-size: 11px; color: var(--secondary-text-color); margin-bottom: 4px; }
      .calc .total { border-top: 1px solid var(--divider-color); padding-top: 3px; margin-top: 2px; }
      .calc .lbl { white-space: nowrap; }
      .result { display: flex; align-items: baseline; gap: 8px; margin-top: 6px; flex-wrap: wrap; }
      .sw.room, .sw.box.room { background: var(--primary-color); }
      .sw.out, .sw.box.out { background: var(--warning-color); }
      .sw.box.req { background: color-mix(in srgb, var(--primary-text-color) 25%, transparent); }
      .sw.box.over { background: color-mix(in srgb, var(--warning-color) 35%, transparent); }
      .tag { margin-left: auto; font-size: 11px; padding: 0 6px; border-radius: 8px; border: 1px solid var(--divider-color); }
      .split { margin-top: 14px; padding-top: 10px; border-top: 1px solid var(--divider-color); }
      a { color: var(--primary-color); }
    `,
  ];
}

// --- Open window by temperature drop: replay the slope over the recorded room temperature ---

@customElement("vt-live-window")
export class LiveWindow extends Replay {
  @property() sensorId?: string;
  /** VT's own slope sensor, drawn for comparison. */
  @property() slopeId?: string;
  @property({ type: Number }) openThreshold: number | null = null;
  @property({ type: Number }) closeThreshold: number | null = null;
  @property({ type: Number }) maxDurationMin: number | null = null;
  @property({ type: Number }) cycleMin = 5;
  @state() private slopes?: SlopePoint[];
  @state() private vtSlopes: Sample[] = [];
  @state() private error?: string;
  private span = { from: 0, until: 0 };

  protected willUpdate(changed: PropertyValues<this>) {
    if (changed.has("sensorId") || changed.has("slopeId") || changed.has("range") || changed.has("cycleMin")) this.load();
  }

  private async load() {
    this.slopes = undefined;
    this.error = undefined;
    if (!this.sensorId) return;
    const range = this.range as Range;
    const until = Date.now();
    this.span = { from: until - RANGES[range], until };
    try {
      const [room, vt] = await Promise.all([fetchHistory(this.hass, this.sensorId, range), fetchHistory(this.hass, this.slopeId, range)]);
      this.vtSlopes = vt;
      this.slopes = slopeHistory(room, this.cycleMin);
    } catch (e: any) {
      this.error = e?.message ?? String(e);
    }
  }

  render() {
    const head = this.head(live("window_title"));
    if (!this.sensorId) return html`${head}<p class="muted">${live("no_sensor")}</p>`;
    if (this.error) return html`${head}<p class="warn">${this.error}</p>`;
    if (!this.slopes) return html`${head}<p class="muted">${live("loading")}</p>`;
    const { from, until } = this.span;
    const slopes = this.slopes.filter((p) => p.t >= from);
    if (slopes.length < 2) return html`${head}<p class="muted">${live("too_little_history")}</p>`;

    const found = windowDetections(slopes, this.openThreshold, this.closeThreshold, this.maxDurationMin, until);
    const steepest = slopes.reduce((m, p) => (p.slope < m.slope ? p : m));
    const withDay = this.range !== "24h";
    const vt = this.vtSlopes.filter((p) => p.v !== null && p.t >= from).map((p) => ({ t: p.t, v: p.v! }));
    const byT = new Map(slopes.map((p) => [p.t, p.slope]));
    return html`
      ${head}
      ${this.openThreshold === null
        ? html`<p>${live("window_no_threshold")}</p>`
        : html`<p><span class="big">${found.length}×</span> ${live(found.length ? "window_detected" : "window_never", { range: live(`range_${this.range}`) })}</p>`}
      ${this.chart({
        from,
        until,
        withDay,
        lines: [
          { points: slopes.map((p) => ({ t: p.t, v: p.slope })), color: "var(--primary-color)" },
          ...(vt.length ? [{ points: vt, color: "var(--secondary-text-color)", dash: "3 3" }] : []),
        ],
        refs: [
          ...(this.openThreshold !== null
            ? [{ v: -this.openThreshold, color: "var(--warning-color)", dash: "4 3", label: live("open_line"), below: true }]
            : []),
          ...(this.closeThreshold !== null
            ? [{ v: this.closeThreshold, color: "var(--secondary-text-color)", dash: "2 3", label: live("close_line") }]
            : []),
        ],
        bands: found,
        include: [-1, 1],
        fmt: (v) => v.toFixed(0),
        unit: "°/h",
        hoverText: (t) => `${time(this.hass, t, withDay)} · ${byT.get(t)!.toFixed(1)} °/h`,
      })}
      <div class="legend">
        <span><i class="sw room"></i>${live("legend_slope")}</span>
        ${vt.length ? html`<span><i class="sw dash"></i>${live("legend_vt_slope")}</span>` : nothing}
      </div>
      <p class="muted">
        ${live("steepest", { v: `${steepest.slope.toFixed(1)} °/h`, at: time(this.hass, steepest.t, withDay) })}
        ${found.some((f) => f.byMaxDuration) ? html`<br />${live("ended_by_max")}` : nothing}
      </p>
      <p class="muted">${live("window_caveat")}</p>
    `;
  }

  static styles = [shared, css`.sw.room { background: var(--primary-color); }`];
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
    const from = until - this.rangeMs;
    this.span = { from, until };
    const sensors = [
      { id: this.sensorId, label: live("room_sensor") },
      { id: this.outsideId, label: live("outside_sensor") },
    ].filter((s): s is { id: string; label: string } => !!s.id);
    try {
      this.gaps = await Promise.all(
        sensors.map(async (s) => ({ ...s, gaps: sensorGaps(await fetchHistory(this.hass, s.id, this.range as Range), from, until) })),
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
        t: g.start,
        chart: -1, // the strips have no time chart, so no crosshair
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
