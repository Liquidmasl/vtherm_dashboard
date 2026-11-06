// Small explanatory charts for the (i) popovers. Illustrations with example values, drawn in
// HA's theme colours; they explain what a setting does, they do not show live data.
import { svg, type SVGTemplateResult } from "lit";

const W = 240;
const H = 96;
const A = "var(--primary-color)"; // the thing the setting controls
const B = "var(--warning-color)"; // a threshold, delay or event
const M = "var(--secondary-text-color)"; // axes, context
const G = "var(--divider-color)";

const label = (x: number, y: number, t: string, anchor: "start" | "middle" | "end" = "start", color = M) =>
  svg`<text x=${x} y=${y} fill=${color} font-size="9" text-anchor=${anchor}>${t}</text>`;
const hline = (y: number, color = G, dash = "") =>
  svg`<line x1="8" x2=${W - 8} y1=${y} y2=${y} stroke=${color} stroke-width="1" stroke-dasharray=${dash}></line>`;
const axis = () => svg`<line x1="8" x2=${W - 8} y1=${H - 14} y2=${H - 14} stroke=${M} stroke-width="1"></line>`;

const DIAGRAMS: Record<string, () => SVGTemplateResult> = {
  // Three cycles: 60 %, 30 %, and a pulse shorter than the shortest on-time (skipped).
  tpi_cycle: () => svg`
    ${axis()}
    ${[0, 1, 2, 3].map((i) => svg`<line x1=${8 + i * 74.6} x2=${8 + i * 74.6} y1="20" y2=${H - 10} stroke=${G}></line>`)}
    <rect x="8" y="34" width="44.8" height="34" fill=${A} rx="2"></rect>
    <rect x="82.6" y="34" width="22.4" height="34" fill=${A} rx="2"></rect>
    <rect x="157.2" y="34" width="5" height="34" fill="none" stroke=${B} stroke-dasharray="2 2"></rect>
    ${label(30, 28, "60 %", "middle")}${label(94, 28, "30 %", "middle")}${label(W - 8, 28, "too short: skipped", "end", B)}
    ${label(8, 12, "one cycle")}${label(W - 8, H - 3, "time", "end")}
  `,
  // Heating share = room gap part + outdoor part, capped at 100 %.
  tpi_formula: () => svg`
    <rect x="8" y="30" width=${W - 16} height="22" fill="none" stroke=${G} rx="3"></rect>
    <rect x="8" y="30" width=${(W - 16) * 0.6} height="22" fill=${A} rx="3"></rect>
    <rect x=${8 + (W - 16) * 0.6} y="30" width=${(W - 16) * 0.15} height="22" fill=${B}></rect>
    ${label(8, 22, "room 1° below × coef_int 0.6 = 60 %", "start", A)}
    ${label(8, 68, "outside 15° colder × coef_ext 0.01 = 15 %", "start", B)}
    ${label(8, 84, "heats 75 % of each cycle (max 100 %)")}
  `,
  // Temperature rising above target: off above target+stop, back on below target+resume.
  tpi_thresholds: () => svg`
    ${hline(72)}${hline(48, B, "3 3")}${hline(28, B, "3 3")}
    <rect x="96" y="20" width="76" height="60" fill=${B} opacity="0.1"></rect>
    <path d="M8 80 C 50 70, 80 30, 110 24 S 160 30, 180 54 S 220 66, 232 62" fill="none" stroke=${A} stroke-width="2"></path>
    ${label(W - 8, 69, "target", "end")}${label(W - 8, 45, "+ resume", "end", B)}${label(W - 8, 25, "+ stop", "end", B)}
    ${label(134, 92, "heating off", "middle", B)}
  `,
  // Requested opening (x) vs opening sent (y).
  valve_curve: () => svg`
    <line x1="24" x2="24" y1="8" y2=${H - 14} stroke=${M}></line>${axis()}
    <line x1="24" x2=${W - 8} y1="22" y2="22" stroke=${B} stroke-dasharray="3 3"></line>
    <path d="M24 ${H - 14} L 96 ${H - 14} L 96 60 L 196 22 L ${W - 8} 22" fill="none" stroke=${A} stroke-width="2"></path>
    <line x1="96" x2="96" y1="60" y2=${H - 14} stroke=${B} stroke-dasharray="3 3"></line>
    ${label(102, 76, "closed below", "start", B)}${label(92, 58, "min opening", "end", A)}${label(W - 8, 18, "max opening", "end", B)}
    ${label(W - 8, H - 3, "requested →", "end")}${label(4, 12, "sent ↑")}
  `,
  // A wanted value that wiggles, and the sent value that only moves by big enough steps.
  send_threshold: () => svg`
    ${axis()}
    <path d="M8 66 Q 30 60, 46 64 T 84 52 T 120 46 T 150 50 T 190 30 T 232 34" fill="none" stroke=${M} stroke-width="1.5" stroke-dasharray="3 2"></path>
    <path d="M8 66 H 84 V 50 H 186 V 32 H 232" fill="none" stroke=${A} stroke-width="2"></path>
    ${label(8, 14, "wanted", "start", M)}${label(60, 14, "sent: only when the change is big enough", "start", A)}
  `,
  // Short opening: nothing. Long opening: action after the wait, heating back after the closed wait.
  window_delay: () => svg`
    ${label(8, 14, "window")}
    <rect x="30" y="20" width="18" height="12" fill=${M} rx="2"></rect>
    <rect x="96" y="20" width="96" height="12" fill=${M} rx="2"></rect>
    ${label(8, 52, "heating")}
    <rect x="8" y="58" width="122" height="12" fill=${A} rx="2"></rect>
    <rect x="212" y="58" width="20" height="12" fill=${A} rx="2"></rect>
    <line x1="96" x2="130" y1="40" y2="40" stroke=${B} stroke-width="2"></line>${label(113, 50, "wait", "middle", B)}
    <line x1="192" x2="212" y1="40" y2="40" stroke=${B} stroke-width="2"></line>${label(202, 50, "wait", "middle", B)}
    ${label(39, 46, "too short", "middle")}
  `,
  // A sudden temperature fall marks the window open until the slope recovers or time runs out.
  window_slope: () => svg`
    ${axis()}
    <rect x="92" y="10" width="78" height=${H - 24} fill=${B} opacity="0.12"></rect>
    <path d="M8 30 L 90 32 C 110 40, 120 66, 150 70 S 190 68, 232 66" fill="none" stroke=${A} stroke-width="2"></path>
    ${label(131, 22, "open: drop faster", "middle", B)}${label(131, 32, "than the threshold", "middle", B)}
    ${label(8, 22, "room temperature", "start", A)}${label(W - 8, H - 3, "time", "end")}
  `,
  // Motion pulses; a quick pass does nothing, staying raises the target, leaving lowers it after a while.
  motion: () => svg`
    ${label(8, 14, "motion")}
    <rect x="24" y="20" width="10" height="10" fill=${M} rx="2"></rect>
    <rect x="70" y="20" width="90" height="10" fill=${M} rx="2"></rect>
    <path d="M8 76 H 100 V 50 H 200 V 76 H 232" fill="none" stroke=${A} stroke-width="2"></path>
    <line x1="70" x2="100" y1="40" y2="40" stroke=${B} stroke-width="2"></line>${label(85, 46, "lasts", "middle", B)}
    <line x1="160" x2="200" y1="40" y2="40" stroke=${B} stroke-width="2"></line>${label(180, 46, "empty", "middle", B)}
    ${label(104, 62, "motion preset", "start", A)}${label(8, 90, "no-motion preset", "start", A)}
  `,
  // Sensor reports stop; after the delay the heater runs at a fixed share until data returns.
  safety: () => svg`
    ${label(8, 14, "sensor reports")}
    ${[14, 34, 54, 74, 204, 224].map((x) => svg`<circle cx=${x} cy="24" r="3" fill=${M}></circle>`)}
    <line x1="74" x2="150" y1="38" y2="38" stroke=${B} stroke-width="2"></line>${label(112, 48, "silent longer than the delay", "middle", B)}
    ${label(8, 62, "heating")}
    <path d="M8 84 H 150 V 74 H 204 V 84" fill="none" stroke=${A} stroke-width="2"></path>
    <rect x="150" y="74" width="54" height="10" fill=${B} opacity="0.25"></rect>${label(177, 70, "fixed %", "middle", B)}
  `,
  // A manual change lasts the configured time, then the preset temperature returns.
  override: () => svg`
    ${axis()}
    <path d="M8 60 H 70 V 30 H 170 V 60 H 232" fill="none" stroke=${A} stroke-width="2"></path>
    <line x1="70" x2="170" y1="20" y2="20" stroke=${B} stroke-width="2"></line>${label(120, 14, "override duration", "middle", B)}
    ${label(8, 54, "preset")}${label(74, 44, "manual change", "start", A)}${label(W - 8, H - 3, "time", "end")}
  `,
  // Heating hard for longer than the delay while the temperature stays flat: alert.
  failure: () => svg`
    ${label(8, 14, "heating share")}
    <path d="M8 40 H 40 V 22 H 232" fill="none" stroke=${A} stroke-width="2"></path>
    ${hline(28, B, "3 3")}${label(W - 8, 36, "threshold", "end", B)}
    ${label(8, 62, "room temperature")}
    <path d="M8 76 H 232" fill="none" stroke=${M} stroke-width="2"></path>
    <line x1="40" x2="170" y1="88" y2="88" stroke=${B} stroke-width="2"></line>${label(105, 84, "delay", "middle", B)}
    <circle cx="170" cy="76" r="5" fill=${B}></circle>${label(178, 70, "alert", "start", B)}
  `,
  // The room lags behind the target, so the target sent to the device is raised (capped by strength).
  correction: () => svg`
    ${axis()}${hline(46, M, "3 3")}${label(W - 8, 42, "your target", "end")}
    <path d="M8 76 C 60 74, 120 60, 232 48" fill="none" stroke=${M} stroke-width="2"></path>${label(8, 70, "room")}
    <path d="M8 22 C 80 24, 160 34, 232 44" fill="none" stroke=${A} stroke-width="2"></path>${label(8, 16, "sent to the device", "start", A)}
  `,
  // Two heaters with the same share of the cycle, start times shifted.
  stagger: () => svg`
    ${axis()}
    <line x1="8" x2="8" y1="16" y2=${H - 14} stroke=${G}></line><line x1=${W - 8} x2=${W - 8} y1="16" y2=${H - 14} stroke=${G}></line>
    ${label(8, 12, "one cycle, 30 % each")}
    <rect x="8" y="24" width="67" height="18" fill=${A} rx="2"></rect>${label(80, 37, "heater 1")}
    <rect x="80" y="52" width="67" height="18" fill=${A} rx="2"></rect>${label(152, 65, "heater 2")}
  `,
};

/** Inner SVG of a diagram; the caller wraps it in <svg viewBox=DIAGRAM_VIEWBOX>. */
export function diagramBody(id: string | undefined): SVGTemplateResult | undefined {
  return id && DIAGRAMS[id] ? DIAGRAMS[id]() : undefined;
}

export const DIAGRAM_VIEWBOX = `0 0 ${W} ${H}`;
