# VTherm Config Panel

A full-page configuration UI for [Versatile Thermostat](https://github.com/jmcollin78/versatile_thermostat):
one sidebar entry that lists every VTherm, and one page per VTherm with all its settings,
instead of VT's step-by-step config flow. Proof of concept for
[versatile_thermostat#2171](https://github.com/jmcollin78/versatile_thermostat/issues/2171).

- All VTherms on one page, central configuration first; create new ones from there.
- Each VTherm on one page: an index on the left, cards grouped by what you set up (room,
  devices, heating control, open window, …) on the right. Features are switched on in their
  own card; rarely needed settings sit in a collapsed "Advanced settings" per group.
- "Central | Own" per group: inherited values stay visible (read-only) with where they come from.
- Help texts sit behind an (i) next to each setting; required fields that are still empty are
  flagged in the index before you save.
- A "Visit" link on each VTherm's device page opens its configuration page.
- Labels, help texts and errors are VT's own translations, so every language VT ships works.

## How it works

The panel does not write VT's configuration itself. On save it walks VT's own options flow
(or config flow, for a new VTherm) in-process and answers each form with your values. VT's
validation, cleanup and reload all run exactly as when you click through the flow, and
nothing in VT is changed.

```
panel (Lit, ha-form) ──ws──► vtherm_config_panel
                               ├ sections.py     which fields VT shows for this config (mirrors VT's menu)
                               ├ layout.py       which card, group and level each field goes into
                               ├ flow_driver.py  save = walk VT's config/options flow
                               └ device_links.py "Visit" link on VTherm devices
```

Known limits:

- `sections.py` mirrors VT's menu routing. If VT adds or reshuffles steps, it must follow.
  The proper fix is for VT to expose that routing itself.
- A save stops at the first section VT rejects, so errors show one section at a time.
- `<ha-form>` is loaded by borrowing HA's config panel (`load-ha-elements.ts`), which is not
  an official frontend API.

## Install

HACS → custom repository → this repo (type: Integration), install, restart, then
Settings → Devices & services → Add integration → "VTherm Config Panel".

## Development

```bash
npm install
npm run build              # or: npm run watch
cd dev && docker compose up -d && python3 onboard.py   # HA on :8124, user dev/dev
node dev/e2e/create-edit.mjs                           # end-to-end: create + edit a VTherm
node dev/ws.mjs '{"type":"vtherm_config_panel/list"}'  # call the websocket API
```

The dev instance mounts VT from `../versatile_thermostat` (override with `VT_REPO`) and uses
VT's own devcontainer configuration with fake sensors and heaters.
