"""Where each VT setting appears on the page: card, group and level.

Pure presentation. The agreed map is published at
https://claude.ai/artifact/J9oBQfgzrMd776RU1CqTBW. Which fields exist for a given VTherm still
comes from ``sections`` (VT's own schemas); a field VT adds that is missing here lands in the
"other" card, so it can never disappear from the page.

Group ``control`` is the key that switches the group: a feature flag (``feature``), a
"central | own" flag (``central``), or a method choice (``method``, window detection).
"""

from __future__ import annotations

from typing import Any

ESSENTIAL, COMMON, ADVANCED = "essential", "common", "advanced"


def _f(*fields: tuple[str, str]) -> list[dict[str, str]]:
    return [{"key": k, "level": lvl} for k, lvl in fields]


def _group(
    gid: str, fields: list[dict[str, str]], control: dict[str, Any] | None = None, types: list[str] | None = None
) -> dict[str, Any]:
    """``types`` limits a group to some thermostat types, for fields whose meaning depends on it."""
    return {"id": gid, "control": control, "fields": fields, "types": types}


_VALVE_LIMITS = (("min_opening_degrees", "advanced"), ("max_opening_degrees", "advanced"), ("max_closing_degree", "advanced"), ("opening_threshold_degree", "advanced"))


E, C, A = ESSENTIAL, COMMON, ADVANCED

CARDS: list[dict[str, Any]] = [
    {
        "id": "room",
        "groups": [
            _group(
                "room",
                _f(("name", E), ("temperature_sensor_entity_id", E), ("humidity_sensor_entity_id", C), ("last_seen_temperature_sensor_entity_id", A)),
            ),
            _group(
                "range",
                _f(("external_temperature_sensor_entity_id", C), ("temp_min", C), ("temp_max", C), ("step_temperature", A)),
                {"type": "central", "key": "use_main_central_config"},
            ),
        ],
    },
    {
        "id": "devices",
        "groups": [
            _group(
                "devices",
                _f(
                    ("underlying_entity_ids", E),
                    ("ac_mode", C),
                    ("used_by_controls_central_boiler", C),
                    ("inverse_switch_command", C),
                    ("heater_keep_alive", A),
                    ("on_command_text", A),
                    ("vswitch_on_command", A),
                    ("off_command_text", A),
                    ("vswitch_off_command", A),
                    ("auto_fan_mode", A),
                ),
            ),
            # On over_valve the valves are the devices, so their limits live here.
            _group(
                "valve_limits",
                _f(("auto_regulation_dtemp", C), ("auto_regulation_periode_min", C), *_VALVE_LIMITS),
                types=["thermostat_over_valve"],
            ),
        ],
    },
    {
        "id": "correction",
        "groups": [
            _group(
                "correction",
                _f(("auto_regulation_mode", E), ("auto_regulation_dtemp", C), ("auto_regulation_periode_min", C), ("auto_regulation_use_device_temp", A)),
                types=["thermostat_over_climate"],
            ),
            _group(
                "valve",
                _f(("opening_degree_entity_ids", E), ("closing_degree_entity_ids", C), *_VALVE_LIMITS),
                types=["thermostat_over_climate"],
            ),
            _group("sync", _f(("sync_entity_ids", E), ("sync_with_calibration", A)), {"type": "feature", "key": "sync_device_internal_temp"}),
        ],
    },
    {
        "id": "heating",
        "groups": [
            _group("algorithm", _f(("proportional_function", E), ("cycle_min", E))),
            _group(
                "tpi",
                _f(
                    ("tpi_coef_int", E),
                    ("tpi_coef_ext", E),
                    ("minimal_activation_delay", A),
                    ("minimal_deactivation_delay", A),
                    ("tpi_threshold_low", A),
                    ("tpi_threshold_high", A),
                ),
                {"type": "central", "key": "use_tpi_central_config"},
            ),
            _group(
                "auto_tpi",
                _f(
                    ("auto_tpi_learning_type", E),
                    ("auto_tpi_heating_rate", C),
                    ("heater_heating_time", C),
                    ("heater_cooling_time", C),
                    ("auto_tpi_aggressiveness", A),
                    ("auto_tpi_continuous_kext", A),
                    ("auto_tpi_enable_advanced_settings", A),
                    ("auto_tpi_avg_initial_weight", A),
                    ("auto_tpi_ema_alpha", A),
                    ("auto_tpi_ema_decay_rate", A),
                    ("auto_tpi_continuous_kext_alpha", A),
                ),
                {"type": "feature", "key": "auto_tpi_mode"},
            ),
        ],
    },
    {
        "id": "presets",
        # Always shown: the card also holds the preset temperatures, which are entities, not fields.
        "always": True,
        "groups": [_group("presets", _f(("use_presets_central_config", E), ("use_central_mode", C)))],
    },
    {
        "id": "window",
        # One question replaces VT's feature flag and its two exclusive methods. "off" turns the
        # feature flag off; the other options turn it on and hide the other method's fields.
        "method": {
            "feature": "use_window_feature",
            "options": {
                "off": [],
                "sensor": ["window_sensor_entity_id", "window_delay", "window_off_delay"],
                "drop": ["window_auto_open_threshold", "window_auto_close_threshold", "window_auto_max_duration"],
            },
        },
        "groups": [
            _group("window_detect", _f(("window_sensor_entity_id", E))),
            _group(
                "window_behaviour",
                _f(
                    ("window_action", E),
                    ("window_auto_open_threshold", E),
                    ("window_delay", C),
                    ("window_auto_close_threshold", C),
                    ("window_auto_max_duration", C),
                    ("window_off_delay", A),
                ),
                {"type": "central", "key": "use_window_central_config"},
            ),
        ],
    },
    {
        "id": "motion",
        "control": {"type": "feature", "key": "use_motion_feature"},
        "groups": [
            _group("motion_detect", _f(("motion_sensor_entity_id", E))),
            _group(
                "motion_behaviour",
                _f(("motion_preset", E), ("no_motion_preset", E), ("motion_delay", C), ("motion_off_delay", C)),
                {"type": "central", "key": "use_motion_central_config"},
            ),
        ],
    },
    {
        "id": "presence",
        "control": {"type": "feature", "key": "use_presence_feature"},
        "groups": [_group("presence", _f(("presence_sensor_entity_id", E)), {"type": "central", "key": "use_presence_central_config"})],
    },
    {
        "id": "power",
        "groups": [
            _group("device_power", _f(("device_power", E), ("power_unit", C))),
            _group(
                "shedding",
                _f(("power_sensor_entity_id", E), ("max_power_sensor_entity_id", E), ("power_temp", C)),
                {"type": "feature", "key": "use_power_feature", "central": "use_power_central_config"},
            ),
        ],
    },
    {
        "id": "boiler",
        "control": {"type": "feature", "key": "use_central_boiler_feature"},
        "groups": [
            _group(
                "boiler",
                _f(
                    ("central_boiler_activation_service", E),
                    ("central_boiler_deactivation_service", E),
                    ("central_boiler_activation_delay_sec", C),
                    ("keep_alive_boiler_delay_sec", A),
                ),
            )
        ],
    },
    {
        "id": "safety",
        "groups": [
            _group(
                "safety",
                _f(
                    ("safety_delay_min", C),
                    ("safety_default_on_percent", C),
                    ("manual_override_duration_min", C),
                    ("safety_min_on_percent", A),
                    ("repair_incorrect_state", A),
                ),
                {"type": "central", "key": "use_advanced_central_config"},
            ),
            _group(
                "failure",
                _f(
                    ("heating_failure_threshold", C),
                    ("cooling_failure_threshold", C),
                    ("heating_failure_detection_delay", C),
                    ("temperature_change_tolerance", A),
                    ("failure_detection_enable_template", A),
                ),
                {
                    "type": "feature",
                    "key": "use_heating_failure_detection_feature",
                    "central": "use_heating_failure_detection_central_config",
                },
            ),
        ],
    },
    {
        "id": "auto_start_stop",
        "control": {"type": "feature", "key": "use_auto_start_stop_feature"},
        "groups": [_group("auto_start_stop", _f(("auto_start_stop_level", E)))],
    },
    {
        "id": "lock",
        "groups": [
            _group(
                "lock",
                _f(("lock_users", C), ("lock_automations", C), ("lock_code", A), ("auto_relock_sec", A)),
                {"type": "central", "key": "use_lock_central_config"},
            )
        ],
    },
]

# Flags the panel sets from a field's value instead of showing them (set when the field has a value).
DERIVED_FLAGS = {"humidity_sensor_entity_id": "use_humidity_feature"}

# Fields that are page controls (switches, "override central") rather than fields of their own.
CONTROL_KEYS = {"thermostat_type", *DERIVED_FLAGS.values()} | {
    key
    for card in CARDS
    for key in [(card.get("control") or {}).get("key"), (card.get("method") or {}).get("feature")]
    + [k for g in card["groups"] for k in ((g["control"] or {}).get("key"), (g["control"] or {}).get("central"))]
    if key
}
