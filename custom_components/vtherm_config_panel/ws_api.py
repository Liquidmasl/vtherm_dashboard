"""Websocket API used by the panel. All commands are admin-only."""

from __future__ import annotations

from typing import Any

import voluptuous as vol
from homeassistant.components import websocket_api
from homeassistant.config_entries import ConfigEntry, ConfigEntryState
from homeassistant.const import UnitOfTemperature
from homeassistant.core import HomeAssistant, callback
from homeassistant.helpers import entity_registry as er

from custom_components.versatile_thermostat import const as c
from custom_components.versatile_thermostat.humidity import find_humidity_sensor_candidates

from .const import DOMAIN, VT_DOMAIN
from .flow_driver import async_create, async_save_existing
from .layout import CARDS, CONTROL_KEYS
from .sections import Infos, describe, init_feature_flags, is_central

# The use_*_central_config flags VT defaults from whether a central configuration exists.
_CENTRAL_FLAGS = (
    c.CONF_USE_MAIN_CENTRAL_CONFIG,
    c.CONF_USE_TPI_CENTRAL_CONFIG,
    c.CONF_USE_WINDOW_CENTRAL_CONFIG,
    c.CONF_USE_MOTION_CENTRAL_CONFIG,
    c.CONF_USE_POWER_CENTRAL_CONFIG,
    c.CONF_USE_PRESETS_CENTRAL_CONFIG,
    c.CONF_USE_PRESENCE_CENTRAL_CONFIG,
    c.CONF_USE_ADVANCED_CENTRAL_CONFIG,
    c.CONF_USE_LOCK_CENTRAL_CONFIG,
    c.CONF_USE_CENTRAL_MODE,
)


def async_register(hass: HomeAssistant) -> None:
    for command in (ws_list, ws_get, ws_new, ws_describe, ws_save):
        websocket_api.async_register_command(hass, command)


def _vt_entries(hass: HomeAssistant) -> list[ConfigEntry]:
    return hass.config_entries.async_entries(VT_DOMAIN)


def _central_entry(hass: HomeAssistant) -> ConfigEntry | None:
    return next((e for e in _vt_entries(hass) if is_central(e.data)), None)


def _init_central_flags(infos: Infos, central_exists: bool) -> Infos:
    """Mirror VT's ``_init_central_config_flags``: unset flags default to "use central"."""
    out = dict(infos)
    for flag in _CENTRAL_FLAGS:
        out[flag] = central_exists and out.get(flag) in (True, None)
    return out


def _placeholders(hass: HomeAssistant, infos: Infos) -> dict[str, str]:
    """Values for the {placeholders} in VT's flow strings, as VT's flow sets them."""
    candidates = find_humidity_sensor_candidates(hass, infos.get(c.CONF_TEMP_SENSOR))
    unit = hass.config.units.temperature_unit
    return {
        "name": infos.get(c.CONF_NAME) or "",
        # VT passes a markdown link; ha-form helpers render plain text.
        "plugins_link": "plugins (versatile-thermostat.org/en/plugins)",
        "humidity_detected": candidates[0] if candidates else "none",
        "unit": unit,
        "temperature_unit": unit,
    }


def _payload(hass: HomeAssistant, infos: Infos) -> dict[str, Any]:
    central = _central_entry(hass)
    return {
        **describe(infos, dict(central.data) if central else None),
        "central_exists": central is not None,
        "central_entry_id": central.entry_id if central else None,
        "placeholders": _placeholders(hass, infos),
        "layout": {"cards": CARDS, "control_keys": sorted(CONTROL_KEYS)},
    }


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/list"})
@callback
def ws_list(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """All VTherms, central configuration first."""
    registry = er.async_get(hass)
    items = []
    for entry in _vt_entries(hass):
        climate = next(
            (e.entity_id for e in er.async_entries_for_config_entry(registry, entry.entry_id) if e.domain == "climate"),
            None,
        )
        items.append(
            {
                "entry_id": entry.entry_id,
                "title": entry.title,
                "thermostat_type": entry.data.get(c.CONF_THERMOSTAT_TYPE),
                "climate_entity_id": climate,
                "underlying_count": len(entry.data.get(c.CONF_UNDERLYING_LIST) or []),
                "prop_function": entry.data.get(c.CONF_PROP_FUNCTION),
                "loaded": entry.state is ConfigEntryState.LOADED,
            }
        )
    items.sort(key=lambda i: (i["thermostat_type"] != c.CONF_THERMOSTAT_CENTRAL_CONFIG, i["title"].lower()))
    connection.send_result(msg["id"], {"entries": items, "thermostat_types": c.CONF_THERMOSTAT_TYPES})


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/get", vol.Required("entry_id"): str})
@callback
def ws_get(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """An existing VTherm's configuration, with the flags VT derives when its flow opens."""
    entry = hass.config_entries.async_get_entry(msg["entry_id"])
    if entry is None or entry.domain != VT_DOMAIN:
        connection.send_error(msg["id"], "not_found", "No such VTherm")
        return
    central_exists = _central_entry(hass) is not None
    infos = init_feature_flags(_init_central_flags(dict(entry.data), central_exists))
    connection.send_result(msg["id"], {"title": entry.title, "data": infos, **_payload(hass, infos)})


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/new", vol.Required("thermostat_type"): vol.In(c.CONF_THERMOSTAT_TYPES)})
@callback
def ws_new(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Starting draft for a new VTherm of the given type (defaults as VT's flow sets them)."""
    central_exists = _central_entry(hass) is not None
    if msg["thermostat_type"] == c.CONF_THERMOSTAT_CENTRAL_CONFIG and central_exists:
        connection.send_error(msg["id"], "central_exists", "A central configuration already exists")
        return
    fahrenheit = hass.config.units.temperature_unit == UnitOfTemperature.FAHRENHEIT
    infos: Infos = {
        c.CONF_THERMOSTAT_TYPE: msg["thermostat_type"],
        c.CONF_TEMP_MIN: 45 if fahrenheit else 7,
        c.CONF_TEMP_MAX: 95 if fahrenheit else 35,
        c.CONF_STEP_TEMPERATURE: 1.0 if fahrenheit else 0.1,
    }
    if is_central(infos):
        infos[c.CONF_NAME] = c.CENTRAL_CONFIG_NAME
    infos = init_feature_flags(_init_central_flags(infos, central_exists))
    connection.send_result(msg["id"], {"data": infos, **_payload(hass, infos)})


@websocket_api.require_admin
@websocket_api.websocket_command({vol.Required("type"): f"{DOMAIN}/describe", vol.Required("data"): dict})
@callback
def ws_describe(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Sections for a draft; called again whenever a value that changes the layout changes."""
    connection.send_result(msg["id"], _payload(hass, msg["data"]))


@websocket_api.require_admin
@websocket_api.websocket_command(
    {vol.Required("type"): f"{DOMAIN}/save", vol.Optional("entry_id"): str, vol.Required("data"): dict}
)
@websocket_api.async_response
async def ws_save(hass: HomeAssistant, connection: websocket_api.ActiveConnection, msg: dict) -> None:
    """Create or update a VTherm through VT's own flow."""
    draft = msg["data"]
    if entry_id := msg.get("entry_id"):
        result = await async_save_existing(hass, entry_id, draft)
    else:
        result = await async_create(hass, draft)
    connection.send_result(
        msg["id"],
        {"success": result.success, "entry_id": result.entry_id, "errors": result.errors, "incomplete": result.incomplete},
    )
