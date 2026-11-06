"""Put a "configure" link to the panel on every VTherm's device page.

Uses the device's ``configuration_url`` (HA renders ``homeassistant://`` URLs as an in-app
link). VT does not set one itself; if it ever does, this module should go.
"""

from __future__ import annotations

from collections.abc import Callable

from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.helpers import device_registry as dr

from .const import PANEL_URL_PATH, VT_DOMAIN

_URL_PREFIX = f"homeassistant://{PANEL_URL_PATH}"


def _url(entry_id: str) -> str:
    return f"{_URL_PREFIX}?entry={entry_id}"


@callback
def _link_all(hass: HomeAssistant) -> None:
    """Point every VTherm device at its page (idempotent)."""
    registry = dr.async_get(hass)
    for entry in hass.config_entries.async_entries(VT_DOMAIN):
        for device in dr.async_entries_for_config_entry(registry, entry.entry_id):
            if device.configuration_url != _url(entry.entry_id):
                registry.async_update_device(device.id, configuration_url=_url(entry.entry_id))


@callback
def async_setup_device_links(hass: HomeAssistant) -> Callable[[], None]:
    """Link existing VTherm devices and any created later. Returns the unsubscribe callback."""
    _link_all(hass)

    @callback
    def _on_registry_update(event: Event[dr.EventDeviceRegistryUpdatedData]) -> None:
        if event.data["action"] == "create":
            _link_all(hass)

    return hass.bus.async_listen(dr.EVENT_DEVICE_REGISTRY_UPDATED, _on_registry_update)


@callback
def async_remove_device_links(hass: HomeAssistant) -> None:
    """Drop the links when the panel is removed, so they don't point at nothing."""
    registry = dr.async_get(hass)
    for entry in hass.config_entries.async_entries(VT_DOMAIN):
        for device in dr.async_entries_for_config_entry(registry, entry.entry_id):
            if device.configuration_url and device.configuration_url.startswith(_URL_PREFIX):
                registry.async_update_device(device.id, configuration_url=None)
