"""Registration of the sidebar panel and its static files."""

from pathlib import Path

from homeassistant.components import frontend, panel_custom
from homeassistant.components.http import StaticPathConfig
from homeassistant.core import HomeAssistant

from .const import DOMAIN, PANEL_ELEMENT, PANEL_JS, PANEL_URL_PATH, STATIC_URL

FRONTEND_DIR = Path(__file__).parent / "frontend"


async def async_register_panel(hass: HomeAssistant, version: str) -> None:
    """Serve the panel bundle and add the sidebar entry."""
    # Static paths cannot be unregistered, so a reload of the entry must not add it twice.
    if not hass.data.setdefault(DOMAIN, {}).get("static_registered"):
        await hass.http.async_register_static_paths(
            [StaticPathConfig(STATIC_URL, str(FRONTEND_DIR), cache_headers=False)]
        )
        hass.data[DOMAIN]["static_registered"] = True
    await panel_custom.async_register_panel(
        hass,
        frontend_url_path=PANEL_URL_PATH,
        webcomponent_name=PANEL_ELEMENT,
        module_url=f"{STATIC_URL}/{PANEL_JS}?v={version}",
        sidebar_title="Versatile Thermostat",
        sidebar_icon="mdi:thermostat-cog",
        require_admin=True,
        config={},
    )


def async_unregister_panel(hass: HomeAssistant) -> None:
    """Remove the sidebar entry (static path stays until restart; HA has no API to drop it)."""
    frontend.async_remove_panel(hass, PANEL_URL_PATH)
