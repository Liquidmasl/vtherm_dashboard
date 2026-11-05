// Turns the server's flat field list + the layout map into what the page renders: cards,
// groups, their switches and which fields are own, inherited or hidden. Pure functions.
import { isBoolean } from "./field";
import type { FieldDesc, Infos, Layout, LayoutCard, LayoutGroup, Level } from "./api";

export interface FieldView {
  key: string;
  level: Level;
  desc: FieldDesc;
}

export interface GroupView {
  id: string;
  /** Feature switch on this group (e.g. humidity, load shedding). */
  featureKey?: string;
  featureOn: boolean;
  /** "Central | own" switch on this group. */
  centralKey?: string;
  usesCentral: boolean;
  own: FieldView[];
  inherited: FieldView[];
}

export interface CardView {
  id: string;
  featureKey?: string;
  featureOn: boolean;
  method?: { options: string[]; current: string };
  groups: GroupView[];
  steps: Set<string>;
}

const isEmpty = (v: unknown) => v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0);

/** Window detection method, derived from the values when the user has not picked one. */
export function windowMethod(data: Infos, picked?: string): string {
  if (data.use_window_feature !== true) return "off";
  if (picked && picked !== "off") return picked;
  return isEmpty(data.window_sensor_entity_id) && !isEmpty(data.window_auto_open_threshold) ? "drop" : "sensor";
}

function groupView(group: LayoutGroup, layout: Layout, data: Infos, hidden: Set<string>): GroupView | null {
  const { fields } = layout;
  if (group.types && !group.types.includes(data.thermostat_type)) return null;
  const c = group.control;
  const featureKey = c?.type === "feature" && c.key && fields[c.key] ? c.key : undefined;
  // A feature whose switch itself is inherited (auto-TPI while TPI comes from central) is not configurable here.
  if (featureKey && fields[featureKey].inherited) return null;
  const centralName = c?.type === "central" ? c.key : c?.central;
  const centralKey = centralName && fields[centralName] ? centralName : undefined;

  const items = group.fields.filter((f) => fields[f.key] && !hidden.has(f.key)).map((f) => ({ ...f, desc: fields[f.key] }));
  if (!items.length && !featureKey) return null;
  return {
    id: group.id,
    featureKey,
    featureOn: featureKey ? data[featureKey] === true : true,
    centralKey,
    usesCentral: centralKey ? data[centralKey] !== false : false,
    own: items.filter((f) => !f.desc.inherited),
    inherited: items.filter((f) => f.desc.inherited),
  };
}

export function buildCards(layout: Layout, data: Infos, pickedMethod?: string): CardView[] {
  const { fields } = layout;
  const control = new Set(layout.layout.control_keys);
  const placed = new Set<string>();
  const cards: CardView[] = [];

  const addCard = (card: LayoutCard) => {
    card.groups.filter((g) => !g.types || g.types.includes(data.thermostat_type)).forEach((g) => g.fields.forEach((f) => placed.add(f.key)));
    const featureKey = card.control?.key && fields[card.control.key] ? card.control.key : undefined;
    let method: CardView["method"];
    let hidden = new Set<string>();
    let methodOff = false;
    if (card.method) {
      if (card.method.feature && !fields[card.method.feature]) return; // feature not available here
      const current = windowMethod(data, pickedMethod);
      method = { options: Object.keys(card.method.options), current };
      hidden = new Set(Object.entries(card.method.options).filter(([id]) => id !== current).flatMap(([, keys]) => keys));
      methodOff = current === "off";
    }
    const groups = methodOff ? [] : card.groups.map((g) => groupView(g, layout, data, hidden)).filter((g): g is GroupView => !!g);
    if (!groups.length && !featureKey && !method) return;
    const steps = new Set<string>();
    groups.forEach((g) => [...g.own, ...g.inherited].forEach((f) => steps.add(f.desc.step)));
    cards.push({
      id: card.id,
      featureKey,
      featureOn: featureKey ? data[featureKey] === true : !methodOff,
      method,
      groups,
      steps,
    });
  };
  layout.layout.cards.forEach(addCard);

  // Anything VT shows that the layout does not place yet must still be editable.
  const unplaced = Object.keys(fields).filter((k) => !placed.has(k) && !control.has(k));
  if (unplaced.length) {
    addCard({ id: "other", groups: [{ id: "other", control: null, fields: unplaced.map((key) => ({ key, level: "common" })) }] });
  }
  return cards;
}

/** Whether a card asks for at least one required value (it gets a stronger frame). */
export const hasRequired = (card: CardView) =>
  card.featureOn &&
  card.groups.some((g) => g.featureOn && g.own.some((f) => f.desc.schema.required && f.level !== "advanced" && !isBoolean(f.desc.schema)));

/** Own, visible, required fields without a value, per card. */
export function missingByCard(cards: CardView[], data: Infos): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const card of cards) {
    if (!card.featureOn) continue;
    const keys = card.groups
      .filter((g) => g.featureOn)
      .flatMap((g) => g.own)
      .filter((f) => f.desc.schema.required && isEmpty(data[f.key]))
      .map((f) => f.key);
    if (keys.length) out[card.id] = keys;
  }
  return out;
}

/** Schema defaults for own fields the draft does not have yet. Same object when nothing changed. */
export function withDefaults(data: Infos, layout: Layout): Infos {
  let out = data;
  for (const [key, f] of Object.entries(layout.fields)) {
    if (!f.inherited && f.schema.default !== undefined && out[key] === undefined) {
      if (out === data) out = { ...data };
      out[key] = f.schema.default;
    }
  }
  return out;
}
