"""Seed the dev HA recorder with 7 days of plausible room and outside temperatures.

Gives the live panels something to replay: heating swings, two window openings (fast drops)
and a 70-minute sensor dropout. The DB belongs to the container user, so run it through the HA image with HA stopped:

    docker stop vtherm-dashboard-ha
    docker run --rm --entrypoint python3 -v "$PWD/dev:/work" ghcr.io/home-assistant/home-assistant:2026.10.4 /work/seed_history.py
    docker start vtherm-dashboard-ha
"""

import math
import random
import sqlite3
import time
from pathlib import Path

DB = Path(__file__).parent / "config" / "home-assistant_v2.db"
ROOM = "input_number.fake_temperature_sensor1"
OUTSIDE = "input_number.fake_external_temperature_sensor1"
DAYS = 7


def room_series(now: float) -> list[tuple[float, float]]:
    """Readings when the value changes by 0.1° (like a real sensor), heating around 20.5°."""
    rnd = random.Random(1)
    out, t, temp, heating = [], now - DAYS * 86400, 19.8, True
    windows = [now - 5 * 3600, now - 3 * 86400 - 7 * 3600]  # two airings
    dropout = (now - 30 * 3600, now - 30 * 3600 + 70 * 60)
    last = None
    while t < now:
        target = 20.5 if 6 <= (t / 3600) % 24 <= 22 else 18.0
        heating = temp < target - 0.3 or (heating and temp < target + 0.2)
        temp += (0.9 if heating else -0.35) / 60 + rnd.gauss(0, 0.004)
        for w in windows:
            if w <= t < w + 12 * 60:
                temp -= 0.12  # 7.2 °/h: a fast drop while the window is open
            elif w + 12 * 60 <= t < w + 40 * 60:
                temp += 0.03
        value = round(temp, 1)
        if value != last and not (dropout[0] <= t < dropout[1]):
            out.append((t, value))
            last = value
        t += 60
    return out


def outside_series(now: float) -> list[tuple[float, float]]:
    out, t = [], now - DAYS * 86400
    while t < now:
        out.append((t, round(6 + 4 * math.sin((t / 3600 - 9) / 24 * 2 * math.pi), 1)))
        t += 15 * 60
    return out


def write(db: sqlite3.Connection, entity_id: str, series: list[tuple[float, float]]) -> None:
    (meta,) = db.execute("select metadata_id from states_meta where entity_id = ?", (entity_id,)).fetchone()
    db.execute("delete from states where metadata_id = ? and last_updated_ts < ?", (meta, series[-1][0] + 1))
    db.executemany(
        "insert into states (state, last_changed_ts, last_reported_ts, last_updated_ts, metadata_id, origin_idx)"
        " values (?, ?, ?, ?, ?, 0)",
        [(str(v), t, t, t, meta) for t, v in series],
    )


if __name__ == "__main__":
    now = time.time()
    with sqlite3.connect(DB) as db:
        write(db, ROOM, room_series(now))
        write(db, OUTSIDE, outside_series(now))
    print("seeded", ROOM, OUTSIDE)
