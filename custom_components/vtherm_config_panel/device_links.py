"""Put a "configure" link to the panel on every VTherm's device page.

Uses the device's ``configuration_url`` (HA renders ``homeassistant://`` URLs as an in-app
link). VT does not set one itself; if it ever does, this module should go.
"""

from __future__ import annotations

from homeassistant.core import Event, HomeAssistant, callback
from homeassistant.helpers import device_registry as dr

from .const import PANEL_URL_PATH, VT_DOMAIN


def _url(entry_id: str) -> str:
    return f"homeassistant://{PANEL_URL_PATH}?entry={entry_id}"


@callback
def _link_device(hass: HomeAssistant, registry: dr.DeviceRegistry, device: dr.DeviceEntry) -> None:
    for entry_id in device.config_entries:
        entry = hass.config_entries.async_get_entry(entry_id)
        if entry is not None and entry.domain == VT_DOMAIN:
            if device.configuration_url != _url(entry_id):
                registry.async_update_device(device.id, configuration_url=_url(entry_id))
            return


@callback
def async_setup_device_links(hass: HomeAssistant) -> callback:
    """Link existing VTherm devices and any created later. Returns the unsubscribe callback."""
    registry = dr.async_get(hass)
    for device in list(registry.devices.values()):
        _link_device(hass, registry, device)

    @callback
    def _on_registry_update(event: Event[dr.EventDeviceRegistryUpdatedData]) -> None:
        if event.data["action"] == "create" and (device := registry.async_get(event.data["device_id"])):
            _link_device(hass, registry, device)

    return hass.bus.async_listen(dr.EVENT_DEVICE_REGISTRY_UPDATED, _on_registry_update)


@callback
def async_remove_device_links(hass: HomeAssistant) -> None:
    """Drop the links when the panel is removed, so they don't point at nothing."""
    registry = dr.async_get(hass)
    for device in list(registry.devices.values()):
        if device.configuration_url and device.configuration_url.startswith(f"homeassistant://{PANEL_URL_PATH}"):
            registry.async_update_device(device.id, configuration_url=None)
