// Estimates of what Versatile Thermostat would do with the settings being edited. Pure functions,
// ported from VT's own code (file references per function) so the live panels can recompute
// while the user types. They mirror VT's rules, not VT's state: always shown as estimates.

/** One recorded state of a sensor: time (ms) and numeric value, null when not a number. */
export interface Sample {
  t: number;
  v: number | null;
}

// --- Heating share (prop_algo_tpi.py: TpiAlgorithm.calculate, cycle_scheduler.py) ---

export interface TpiInput {
  current: number;
  target: number;
  outside: number | null;
  /** °/h, VT's temperature_slope. Only used by the stop/resume thresholds. */
  slope: number | null;
  cooling: boolean;
  coefInt: number;
  coefExt: number;
  thresholdLow: number;
  thresholdHigh: number;
  maxOnPercent: number | null;
  cycleMin: number;
  minOnSec: number;
  minOffSec: number;
}

export interface TpiResult {
  /** Parts before clamping, as shares of the cycle (can be negative or above 1). */
  roomPart: number;
  outsidePart: number;
  /** Share after clamping and max_on_percent, before the cycle timing rules. */
  share: number;
  /** Forced to 0 by the stop/resume thresholds. */
  stoppedByThreshold: boolean;
  onSec: number;
  offSec: number;
  /** The shortest on/off time changed the result. */
  forcedByTiming: "min_on" | "min_off" | null;
}

export function tpiDecision(i: TpiInput): TpiResult {
  const delta = i.cooling ? i.current - i.target : i.target - i.current;
  const deltaExt = i.outside === null ? 0 : i.cooling ? i.outside - i.target : i.target - i.outside;
  const slope = i.slope === null ? null : i.cooling ? -i.slope : i.slope;
  const roomPart = i.coefInt * delta;
  const outsidePart = i.coefExt * deltaExt;

  const applyThreshold = i.thresholdLow !== 0 && i.thresholdHigh !== 0;
  const stoppedByThreshold =
    applyThreshold && slope !== null && ((slope > 0 && -delta > i.thresholdHigh) || (slope < 0 && -delta > i.thresholdLow));

  let share = stoppedByThreshold ? 0 : Math.min(1, Math.max(0, roomPart + outsidePart));
  if (i.maxOnPercent !== null && share > i.maxOnPercent) share = i.maxOnPercent;

  const cycleSec = i.cycleMin * 60;
  let onSec = share * cycleSec;
  let forcedByTiming: TpiResult["forcedByTiming"] = null;
  if (onSec > 0 && onSec < i.minOnSec) {
    onSec = 0;
    forcedByTiming = "min_on";
  }
  if (onSec < cycleSec && cycleSec - onSec < i.minOffSec) {
    onSec = cycleSec;
    forcedByTiming = "min_off";
  }
  return { roomPart, outsidePart, share, stoppedByThreshold, onSec: Math.floor(onSec), offSec: Math.floor(cycleSec - onSec), forcedByTiming };
}

// --- Open window by temperature drop (ema.py, open_window_algorithm.py, feature_window_manager.py) ---

const EMA_HALFLIFE_SEC = 300; // DEFAULT_SHORT_EMA_PARAMS
const EMA_MAX_ALPHA = 0.5;
const MAX_SLOPE = 120; // °/h, steeper is treated as an aberrant point
const STALE_MIN = 30; // VT adds a flat point when the last measurement is older than this
const MIN_POINTS = 4;

const round = (v: number, digits: number) => Math.round(v * 10 ** digits) / 10 ** digits;

export interface SlopePoint {
  t: number;
  slope: number;
}

/** VT's temperature slope (°/h) over a sensor history: EMA of the temperature, then the smoothed slope. */
export function slopeHistory(samples: Sample[], cycleMin: number): SlopePoint[] {
  const out: SlopePoint[] = [];
  let ema: number | null = null;
  let emaT = 0;
  let lastT: number | null = null; // last stored measurement time
  let lastTemp: number | null = null;
  let slope: number | null = null;
  let points = 0;

  const add = (temp: number, t: number, storeDate: boolean) => {
    if (lastT === null || lastTemp === null) {
      lastT = t;
      lastTemp = temp;
      points++;
      return;
    }
    const dtSec = (t - lastT) / 1000;
    if (dtSec <= 0) return;
    const s = (temp - lastTemp) / (dtSec / 3600);
    if (Math.abs(s) > MAX_SLOPE) return;
    slope = slope === null ? round(s, 2) : round(0.2 * slope + 0.8 * s, 2);
    if (storeDate) lastT = t;
    lastTemp = temp;
    points++;
    if (points >= MIN_POINTS) out.push({ t, slope });
  };

  for (const { t, v } of samples) {
    if (v === null) continue;
    // Cycle checks between two measurements: flat points while the last one is stale.
    if (lastT !== null && ema !== null) {
      for (let c = lastT + STALE_MIN * 60_000; c < t; c += cycleMin * 60_000) add(ema, c, false);
    }
    if (ema === null) ema = v;
    else {
      const decay = (t - emaT) / 1000;
      if (decay >= 0) {
        const alpha = Math.min(1 - Math.exp((Math.log(0.5) * decay) / EMA_HALFLIFE_SEC), EMA_MAX_ALPHA);
        ema = round(alpha * v + (1 - alpha) * ema, 2);
      }
    }
    emaT = t;
    add(ema, t, true);
  }
  return out;
}

export interface Detection {
  start: number;
  end: number;
  /** Ended by the max duration rather than by the temperature recovering. */
  byMaxDuration: boolean;
}

/** Periods VT would have flagged as an open window, given the slope history and the thresholds. */
export function windowDetections(
  slopes: SlopePoint[],
  openThreshold: number | null,
  closeThreshold: number | null,
  maxDurationMin: number | null,
  until: number,
): Detection[] {
  if (openThreshold === null || !slopes.length) return [];
  const out: Detection[] = [];
  let start: number | null = null;
  const maxMs = maxDurationMin ? maxDurationMin * 60_000 : Infinity;
  for (const { t, slope } of slopes) {
    if (start !== null && t - start >= maxMs) {
      out.push({ start, end: start + maxMs, byMaxDuration: true });
      start = null;
    }
    if (start === null) {
      if (slope < -openThreshold) start = t;
    } else if (closeThreshold !== null && slope >= closeThreshold) {
      out.push({ start, end: t, byMaxDuration: false });
      start = null;
    }
  }
  if (start !== null) out.push({ start, end: Math.min(until, start + maxMs), byMaxDuration: start + maxMs <= until });
  return out;
}

// --- Sensor loss (feature_safety_manager.py: refresh_state) ---

export interface Gap {
  start: number;
  end: number;
  /** Still silent at the end of the period. */
  open: boolean;
}

/**
 * Silences between two numeric updates. VT only hears state changes (not same-value reports), and
 * ignores non-numeric states, so the recorded history is exactly what it sees.
 */
export function sensorGaps(samples: Sample[], from: number, until: number): Gap[] {
  const times = samples.filter((s) => s.v !== null && s.t >= from).map((s) => s.t);
  // The state at the start of the period counts as a measurement at that time only if it was numeric.
  const before = samples.filter((s) => s.t < from);
  const startT = before.length && before[before.length - 1].v !== null ? before[before.length - 1].t : from;
  const gaps: Gap[] = [];
  let last = startT;
  for (const t of times) {
    gaps.push({ start: last, end: t, open: false });
    last = t;
  }
  gaps.push({ start: last, end: until, open: true });
  return gaps;
}

export const longest = (gaps: Gap[]) => gaps.reduce<Gap | null>((m, g) => (!m || g.end - g.start > m.end - m.start ? g : m), null);

// --- Heating share over time: tpiDecision replayed on recorded temperatures and targets ---

/** The thermostat's recorded mode and target. */
export interface TargetSample {
  t: number;
  mode: string;
  target: number | null;
}

export interface TpiPoint {
  t: number;
  roomPart: number;
  outsidePart: number;
  /** The algorithm's share (what VT records as power_percent), before the shortest on/off rules. */
  share: number;
  /** VT's recorded share at that time, 0–1. */
  vt: number | null;
}

/** Step-wise value at time t: the last sample at or before t (samples sorted by time). */
function stepper<T extends { t: number }>(samples: T[]) {
  let i = -1;
  return (t: number): T | undefined => {
    while (i + 1 < samples.length && samples[i + 1].t <= t) i++;
    return i >= 0 ? samples[i] : undefined;
  };
}

/**
 * The heating share VT would have computed at `points` evenly spaced times, with the given settings.
 * Off or without a target: no point. Without a room temperature: no point.
 */
export function tpiHistory(
  room: Sample[],
  outside: Sample[],
  targets: TargetSample[],
  slope: Sample[],
  vt: Sample[],
  settings: Omit<TpiInput, "current" | "target" | "outside" | "slope" | "cooling">,
  from: number,
  until: number,
  points = 300,
): TpiPoint[] {
  const valid = (s: Sample[]) => s.filter((x) => x.v !== null);
  const [roomAt, outAt, targetAt, slopeAt, vtAt] = [stepper(valid(room)), stepper(valid(outside)), stepper(targets), stepper(valid(slope)), stepper(vt)];
  const out: TpiPoint[] = [];
  for (let k = 0; k < points; k++) {
    const t = from + ((until - from) * k) / (points - 1);
    const r = roomAt(t)?.v;
    const tg = targetAt(t);
    const vtShare = vtAt(t)?.v;
    if (r == null || !tg || tg.target === null || tg.mode === "off" || tg.mode === "unavailable") continue;
    const d = tpiDecision({
      ...settings,
      current: r,
      target: tg.target,
      outside: outAt(t)?.v ?? null,
      slope: slopeAt(t)?.v ?? null,
      cooling: tg.mode === "cool",
    });
    out.push({ t, roomPart: d.roomPart, outsidePart: d.outsidePart, share: d.share, vt: vtShare == null ? null : vtShare / 100 });
  }
  return out;
}
