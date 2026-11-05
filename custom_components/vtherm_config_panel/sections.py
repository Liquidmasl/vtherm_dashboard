"""Which configuration sections a VTherm has, and the schemas each one shows.

This mirrors the routing in Versatile Thermostat's config flow (``async_step_menu`` and the
schema choice inside every ``async_step_*``). It only decides what to *render*: saving drives
VT's real flow (see ``flow_driver``), so validation and cleanup stay VT's own.

If VT ever exposes this routing itself (one function returning the visible steps and their
schemas), this module should be replaced by a call to it.
"""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from typing import Any

import voluptuous as vol
import voluptuous_serialize
from homeassistant.helpers import config_validation as cv

from custom_components.versatile_thermostat import config_schema as s
from custom_components.versatile_thermostat import const as c

Infos = dict[str, Any]


def is_central(infos: Infos) -> bool:
    return infos.get(c.CONF_THERMOSTAT_TYPE) == c.CONF_THERMOSTAT_CENTRAL_CONFIG


def valve_regulation(infos: Infos) -> bool:
    return infos.get(c.CONF_AUTO_REGULATION_MODE) == c.CONF_AUTO_REGULATION_VALVE


@dataclass(frozen=True)
class Section:
    """One block of the page; ``step`` is VT's flow step id (also its translation key).

    ``schema`` is always shown. When ``central_toggle`` is set and the VTherm does not use the
    central configuration, ``spec_schema`` is shown below it; when it does, ``spec_schema`` is
    shown read-only with the central configuration's values.
    """

    step: str
    visible: Callable[[Infos], bool]
    schema: Callable[[Infos], vol.Schema]
    central_toggle: str | None = None
    spec_schema: Callable[[Infos], vol.Schema] | None = None
    # Sections nested under another one (auto-TPI under TPI) render inside their parent.
    parent: str | None = None


def _by_type(central: vol.Schema, other: vol.Schema) -> Callable[[Infos], vol.Schema]:
    return lambda infos: central if is_central(infos) else other


def _thermostat_type_schema(infos: Infos) -> vol.Schema:
    vtype = infos.get(c.CONF_THERMOSTAT_TYPE)
    if vtype == c.CONF_THERMOSTAT_SWITCH:
        return s.build_step_thermostat_switch_schema()
    if vtype == c.CONF_THERMOSTAT_VALVE:
        return s.build_step_thermostat_valve_schema()
    return s.STEP_THERMOSTAT_CLIMATE


def _features_schema(infos: Infos) -> vol.Schema:
    if is_central(infos):
        return s.STEP_CENTRAL_FEATURES_DATA_SCHEMA
    if infos.get(c.CONF_THERMOSTAT_TYPE) == c.CONF_THERMOSTAT_CLIMATE:
        return s.STEP_CLIMATE_VALVE_FEATURES_DATA_SCHEMA if valve_regulation(infos) else s.STEP_CLIMATE_FEATURES_DATA_SCHEMA
    return s.STEP_FEATURES_DATA_SCHEMA


def _window_spec_schema(infos: Infos) -> vol.Schema:
    # Same rule as async_step_spec_window: auto-detection fields only without a window sensor.
    if infos.get(c.CONF_WINDOW_SENSOR):
        return s.STEP_CENTRAL_WINDOW_WO_AUTO_DATA_SCHEMA
    return s.STEP_CENTRAL_WINDOW_DATA_SCHEMA


def _feature(flag: str) -> Callable[[Infos], bool]:
    return lambda infos: infos.get(flag, False) is True


def _always(_: Infos) -> bool:
    return True


def _not_central(infos: Infos) -> bool:
    return not is_central(infos)


def _tpi_visible(infos: Infos) -> bool:
    return infos.get(c.CONF_PROP_FUNCTION) == c.PROPORTIONAL_FUNCTION_TPI or is_central(infos) or valve_regulation(infos)


def _auto_tpi_visible(infos: Infos) -> bool:
    return _tpi_visible(infos) and not is_central(infos) and infos.get(c.CONF_AUTO_TPI_MODE) is True


def _auto_tpi_advanced(method: str) -> Callable[[Infos], bool]:
    return lambda infos: (
        _auto_tpi_visible(infos)
        and infos.get(c.CONF_AUTO_TPI_ENABLE_ADVANCED_SETTINGS) is True
        and infos.get(c.CONF_AUTO_TPI_CALCULATION_METHOD, c.AUTO_TPI_METHOD_AVG) == method
    )


SECTIONS: list[Section] = [
    Section(
        "main",
        _always,
        _by_type(s.STEP_CENTRAL_MAIN_DATA_SCHEMA, s.STEP_MAIN_DATA_SCHEMA),
        central_toggle=c.CONF_USE_MAIN_CENTRAL_CONFIG,
        spec_schema=lambda _: s.STEP_CENTRAL_SPEC_MAIN_DATA_SCHEMA,
    ),
    Section("type", _not_central, _thermostat_type_schema),
    Section("features", _always, _features_schema),
    Section(
        "tpi",
        _tpi_visible,
        _by_type(s.STEP_CENTRAL_TPI_DATA_SCHEMA_CENTRAL, s.STEP_TPI_DATA_SCHEMA),
        central_toggle=c.CONF_USE_TPI_CENTRAL_CONFIG,
        spec_schema=lambda _: s.STEP_CENTRAL_TPI_DATA_SCHEMA,
    ),
    Section("auto_tpi_configuration", _auto_tpi_visible, lambda _: s.STEP_AUTO_TPI_CONFIGURATION_SCHEMA, parent="tpi"),
    Section("auto_tpi_avg_settings", _auto_tpi_advanced(c.AUTO_TPI_METHOD_AVG), lambda _: s.STEP_AUTO_TPI_AVG_SETTINGS_SCHEMA, parent="tpi"),
    Section("auto_tpi_ema_settings", _auto_tpi_advanced(c.AUTO_TPI_METHOD_EMA), lambda _: s.STEP_AUTO_TPI_EMA_SETTINGS_SCHEMA, parent="tpi"),
    Section(
        "presets",
        lambda infos: infos.get(c.CONF_THERMOSTAT_TYPE) in (c.CONF_THERMOSTAT_SWITCH, c.CONF_THERMOSTAT_VALVE, c.CONF_THERMOSTAT_CLIMATE),
        lambda _: s.STEP_PRESETS_DATA_SCHEMA,
    ),
    Section(
        "central_boiler",
        lambda infos: is_central(infos) and infos.get(c.CONF_USE_CENTRAL_BOILER_FEATURE) is True,
        lambda _: s.STEP_CENTRAL_BOILER_SCHEMA,
    ),
    Section(
        "window",
        _feature(c.CONF_USE_WINDOW_FEATURE),
        lambda infos: _window_spec_schema(infos) if is_central(infos) else s.STEP_WINDOW_DATA_SCHEMA,
        central_toggle=c.CONF_USE_WINDOW_CENTRAL_CONFIG,
        spec_schema=_window_spec_schema,
    ),
    Section(
        "motion",
        _feature(c.CONF_USE_MOTION_FEATURE),
        _by_type(s.STEP_CENTRAL_MOTION_DATA_SCHEMA, s.STEP_MOTION_DATA_SCHEMA),
        central_toggle=c.CONF_USE_MOTION_CENTRAL_CONFIG,
        spec_schema=lambda _: s.STEP_CENTRAL_MOTION_DATA_SCHEMA,
    ),
    Section(
        "power",
        _feature(c.CONF_USE_POWER_FEATURE),
        _by_type(s.STEP_CENTRAL_POWER_DATA_SCHEMA, s.STEP_POWER_DATA_SCHEMA),
        central_toggle=c.CONF_USE_POWER_CENTRAL_CONFIG,
        spec_schema=lambda _: s.STEP_NON_CENTRAL_POWER_DATA_SCHEMA,
    ),
    Section(
        "presence",
        _feature(c.CONF_USE_PRESENCE_FEATURE),
        _by_type(s.STEP_CENTRAL_PRESENCE_DATA_SCHEMA, s.STEP_PRESENCE_DATA_SCHEMA),
        central_toggle=c.CONF_USE_PRESENCE_CENTRAL_CONFIG,
        spec_schema=lambda _: s.STEP_CENTRAL_PRESENCE_DATA_SCHEMA,
    ),
    Section(
        "auto_start_stop",
        lambda infos: (
            infos.get(c.CONF_USE_AUTO_START_STOP_FEATURE) is True
            and infos.get(c.CONF_THERMOSTAT_TYPE) == c.CONF_THERMOSTAT_CLIMATE
            and not valve_regulation(infos)
        ),
        lambda _: s.STEP_AUTO_START_STOP,
    ),
    Section("valve_regulation", valve_regulation, lambda _: s.build_step_valve_regulation_schema()),
    Section("sync_device_internal_temp", _feature(c.CONF_SYNC_DEVICE_INTERNAL_TEMP), lambda _: s.STEP_SYNC_DEVICE_INTERNAL_TEMP),
    Section(
        "heating_failure_detection",
        _feature(c.CONF_USE_HEATING_FAILURE_DETECTION_FEATURE),
        _by_type(s.STEP_CENTRAL_HEATING_FAILURE_DETECTION_SCHEMA, s.STEP_HEATING_FAILURE_DETECTION_SCHEMA),
        central_toggle=c.CONF_USE_HEATING_FAILURE_DETECTION_CENTRAL_CONFIG,
        spec_schema=lambda _: s.STEP_CENTRAL_HEATING_FAILURE_DETECTION_SCHEMA,
    ),
    Section(
        "advanced",
        _always,
        _by_type(s.STEP_CENTRAL_ADVANCED_DATA_SCHEMA, s.STEP_ADVANCED_DATA_SCHEMA),
        central_toggle=c.CONF_USE_ADVANCED_CENTRAL_CONFIG,
        spec_schema=lambda _: s.STEP_CENTRAL_ADVANCED_DATA_SCHEMA,
    ),
    Section(
        "lock",
        _always,
        _by_type(s.STEP_CENTRAL_LOCK_DATA_SCHEMA, s.STEP_LOCK_DATA_SCHEMA),
        central_toggle=c.CONF_USE_LOCK_CENTRAL_CONFIG,
        spec_schema=lambda _: s.STEP_CENTRAL_LOCK_DATA_SCHEMA,
    ),
    Section("humidity", _not_central, lambda _: s.STEP_HUMIDITY_DATA_SCHEMA),
]


def init_feature_flags(infos: Infos) -> Infos:
    """Derive the ``use_*_feature`` flags the way VT's flow does when it opens an entry.

    Some flags are not stored but implied by other keys (a window sensor means the window
    feature is on). Mirrors ``VersatileThermostatBaseConfigFlow._init_feature_flags``.
    """
    out = dict(infos)
    central = is_central(out)
    out[c.CONF_USE_WINDOW_FEATURE] = bool(
        out.get(c.CONF_USE_WINDOW_FEATURE)
        or out.get(c.CONF_USE_WINDOW_CENTRAL_CONFIG)
        or out.get(c.CONF_WINDOW_SENSOR) is not None
        or out.get(c.CONF_WINDOW_AUTO_OPEN_THRESHOLD) is not None
    )
    out[c.CONF_USE_MOTION_FEATURE] = bool(out.get(c.CONF_USE_MOTION_FEATURE)) and (out.get(c.CONF_MOTION_SENSOR) is not None or central)
    out[c.CONF_USE_POWER_FEATURE] = bool(
        out.get(c.CONF_USE_POWER_CENTRAL_CONFIG)
        or out.get(c.CONF_USE_POWER_FEATURE)
        or (central and out.get(c.CONF_POWER_SENSOR) is not None and out.get(c.CONF_MAX_POWER_SENSOR) is not None)
    )
    out[c.CONF_USE_PRESENCE_FEATURE] = bool(out.get(c.CONF_USE_PRESENCE_CENTRAL_CONFIG) or out.get(c.CONF_PRESENCE_SENSOR) is not None)
    out[c.CONF_USE_CENTRAL_BOILER_FEATURE] = bool(
        out.get(c.CONF_USE_CENTRAL_BOILER_FEATURE)
        or (out.get(c.CONF_CENTRAL_BOILER_ACTIVATION_SRV) is not None and out.get(c.CONF_CENTRAL_BOILER_DEACTIVATION_SRV) is not None)
    )
    out[c.CONF_USE_AUTO_START_STOP_FEATURE] = (
        out.get(c.CONF_USE_AUTO_START_STOP_FEATURE) is True and out.get(c.CONF_THERMOSTAT_TYPE) == c.CONF_THERMOSTAT_CLIMATE
    )
    out[c.CONF_USE_HEATING_FAILURE_DETECTION_FEATURE] = bool(out.get(c.CONF_USE_HEATING_FAILURE_DETECTION_FEATURE))
    return out


def serialize(schema: vol.Schema) -> list[dict[str, Any]]:
    """Schema in the format ``<ha-form>`` takes (the one HA uses for flow forms)."""
    return voluptuous_serialize.convert(schema, custom_serializer=cv.custom_serializer)


def schema_keys(schema: vol.Schema) -> list[str]:
    return [str(key) for key in schema.schema]


def describe(infos: Infos, central_infos: Infos | None) -> list[dict[str, Any]]:
    """The visible sections for a (draft) configuration, ready for the panel."""
    result = []
    for section in SECTIONS:
        if not section.visible(infos):
            continue
        entry: dict[str, Any] = {
            "step": section.step,
            "parent": section.parent,
            "schema": serialize(section.schema(infos)),
        }
        if section.central_toggle and section.spec_schema and not is_central(infos):
            spec = section.spec_schema(infos)
            entry["central_toggle"] = section.central_toggle
            entry["spec_schema"] = serialize(spec)
            if central_infos is not None:
                entry["central_values"] = {k: central_infos[k] for k in schema_keys(spec) if k in central_infos}
        result.append(entry)
    return result
