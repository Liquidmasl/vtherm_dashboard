"""Seed the dev HA recorder with 7 days of a simulated room heated by VT's TPI (Bathroom VTherm).

For screenshots and trying the live panels, NOT for validating them: the "VT recorded" share is
produced by the same TPI formula the panel ports, so estimate and recording agree by construction
(until you change the coefficients). Real validation needs real heating data.

Model (rates in °C per hour):
- radiator: heats while on, gives its heat to the room with a ~30 min lag (overshoot after heat-up)
- room: gains from the radiator, loses to the outside; two airings add a fast loss for 12 min
- VT: every 5 min cycle, share = coef_int·(target − sensor) + coef_ext·(target − outside), clamped,
  heater on for share × cycle (shorter than the minimum on-time: off)
- sensor: reports when its 0.1° reading changes; silent for 70 min once (sensor-loss replay)
- schedule: 20.5° from 06:00 to 22:00, 18° at night (written as the climate entity's target)

The DB belongs to the container user, so run it through the HA image with HA stopped:

    docker stop vtherm-dashboard-ha
    docker run --rm --entrypoint python3 -v "$PWD/dev:/work" ghcr.io/home-assistant/home-assistant:2026.10.4 /work/seed_history.py
    docker start vtherm-dashboard-ha

Then set the fake sensor to the last value printed (input_numbers restart at their initial value):

    node dev/ws.mjs '{"type":"call_service","domain":"input_number","service":"set_value","target":{"entity_id":"input_number.fake_temperature_sensor1"},"service_data":{"value":<last>}}'
"""

import json
import math
import random
import sqlite3
import time
from pathlib import Path

DB = Path(__file__).parent / "config" / "home-assistant_v2.db"
ROOM = "input_number.fake_temperature_sensor1"
OUTSIDE = "input_number.fake_external_temperature_sensor1"
CLIMATE = "climate.bathroom"
POWER = "sensor.bathroom_power_percent"
SLOPE = "sensor.bathroom_temperature_slope"  # cleared: a simulated "VT slope" would only copy the estimate
DAYS = 7

COEF_INT, COEF_EXT = 0.7, 0.02  # the Bathroom VTherm's settings
CYCLE_S, MIN_ON_S = 300, 10
DT_S = 30

RADIATOR_POWER = 10.0  # radiator warms by this while on
RADIATOR_TO_ROOM = 2.0  # radiator loses its excess heat at this rate…
ROOM_FROM_RADIATOR = 0.5  # …and the room gains this share of it
ROOM_LOSS = 0.05  # per degree of difference to the outside
WINDOW_LOSS = 0.6  # extra, while aired


def outside_at(t: float) -> float:
    return 6 + 4 * math.sin((t / 3600 - 9) / 24 * 2 * math.pi)


def target_at(t: float) -> float:
    hour = (t / 3600) % 24  # UTC, like the dev HA
    return 20.5 if 6 <= hour < 22 else 18.0


def simulate(now: float):
    rnd = random.Random(1)
    start = now - DAYS * 86400
    airings = [now - 5 * 3600, now - 3 * 86400 - 7 * 3600]
    dropout = (now - 30 * 3600, now - 30 * 3600 + 70 * 60)
    room_t, radiator, sensor = 18.0, 0.0, 18.0
    room, outside, shares, targets = [], [], [], []
    share, on_until = 0.0, start
    t = start
    while t < now:
        target = target_at(t)
        if not targets or targets[-1][1] != target:
            targets.append((t, target))
        if (t - start) % CYCLE_S == 0:  # VT's cycle: decide the share from what the sensor last said
            out = outside_at(t)
            share = min(1.0, max(0.0, COEF_INT * (target - sensor) + COEF_EXT * (target - out)))
            on_s = share * CYCLE_S
            on_until = t + (on_s if on_s >= MIN_ON_S else 0)
            if not shares or shares[-1][1] != round(share * 100):
                shares.append((t, round(share * 100)))
        if (t - start) % 900 == 0:
            outside.append((t, round(outside_at(t), 1)))

        heating = t < on_until
        aired = any(a <= t < a + 12 * 60 for a in airings)
        h = DT_S / 3600
        radiator += ((RADIATOR_POWER if heating else 0) - RADIATOR_TO_ROOM * radiator) * h
        loss = (ROOM_LOSS + (WINDOW_LOSS if aired else 0)) * (room_t - outside_at(t))
        room_t += (ROOM_FROM_RADIATOR * radiator - loss) * h

        reading = round(room_t + rnd.gauss(0, 0.02), 1)
        if reading != sensor and not (dropout[0] <= t < dropout[1]):
            sensor = reading
            room.append((t, reading))
        t += DT_S
    return room, outside, shares, targets


def clear(db: sqlite3.Connection, entity_id: str, until: float) -> int | None:
    row = db.execute("select metadata_id from states_meta where entity_id = ?", (entity_id,)).fetchone()
    if row:
        db.execute("delete from states where metadata_id = ? and last_updated_ts < ?", (row[0], until))
    return row[0] if row else None


def write(db: sqlite3.Connection, entity_id: str, series: list[tuple[float, str]], until: float, attrs=None) -> None:
    meta = clear(db, entity_id, until)
    if meta is None:
        raise SystemExit(f"{entity_id} has never been recorded; start the dev HA once first")
    for t, value in series:
        attributes_id = None
        if attrs:
            shared = json.dumps(attrs(t, value), separators=(",", ":"))
            attributes_id = db.execute("insert into state_attributes (hash, shared_attrs) values (0, ?)", (shared,)).lastrowid
        db.execute(
            "insert into states (state, last_changed_ts, last_reported_ts, last_updated_ts, metadata_id, attributes_id, origin_idx)"
            " values (?, ?, ?, ?, ?, ?, 0)",
            (value, t, t, t, meta, attributes_id),
        )


if __name__ == "__main__":
    now = time.time()
    room, outside, shares, targets = simulate(now)
    target_of = dict(targets)
    with sqlite3.connect(DB) as db:
        write(db, ROOM, [(t, str(v)) for t, v in room], now)
        write(db, OUTSIDE, [(t, str(v)) for t, v in outside], now)
        write(db, POWER, [(t, str(v)) for t, v in shares], now)
        write(
            db,
            CLIMATE,
            [(t, "heat") for t, _ in targets],
            now,
            attrs=lambda t, _: {"temperature": target_of[t], "hvac_mode": "heat", "friendly_name": "Bathroom"},
        )
        clear(db, SLOPE, now)
    print(f"seeded {len(room)} room readings, {len(shares)} share changes, {len(targets)} target changes; last room value {room[-1][1]}")
