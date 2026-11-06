"""Single-step config flow: installing the integration adds the panel."""

from typing import Any

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult

from .const import DOMAIN


class VThermConfigPanelFlow(ConfigFlow, domain=DOMAIN):
    """Confirm-only flow; the panel has no settings of its own."""

    VERSION = 1

    async def async_step_user(self, user_input: dict[str, Any] | None = None) -> ConfigFlowResult:
        if user_input is not None:
            return self.async_create_entry(title="VTherm Dashboard", data={})
        return self.async_show_form(step_id="user")
