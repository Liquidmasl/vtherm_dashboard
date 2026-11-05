// The panel's own wording: card and group names, subtitles and controls. Field labels and help
// texts are VT's translations (see localize.ts). English only for now.

export const CARD_TEXT: Record<string, { title: string; subtitle: string; icon: string }> = {
  room: { title: "Room", subtitle: "What this thermostat is called and what it measures.", icon: "mdi:sofa-outline" },
  devices: { title: "Devices", subtitle: "The heaters, valves or climates this thermostat drives.", icon: "mdi:radiator" },
  correction: {
    title: "Setpoint correction",
    subtitle:
      "The device's built-in sensor sits next to the heat, so VT raises or lowers the target it sends until your room sensor reaches your temperature.",
    icon: "mdi:tune-vertical",
  },
  heating: { title: "Heating control", subtitle: "How much and how often to heat.", icon: "mdi:sine-wave" },
  presets: { title: "Presets", subtitle: "Which target temperatures apply and who may switch them.", icon: "mdi:format-list-bulleted" },
  window: { title: "Open window", subtitle: "What happens when a window opens.", icon: "mdi:window-open-variant" },
  motion: { title: "Motion", subtitle: "Switch preset when someone is in the room.", icon: "mdi:motion-sensor" },
  presence: {
    title: "Away from home",
    subtitle: "Lower the temperature when nobody is home, using a home occupancy sensor (for example a person group).",
    icon: "mdi:home-export-outline",
  },
  power: { title: "Power & energy", subtitle: "Device consumption, load shedding and the central boiler.", icon: "mdi:flash" },
  boiler: { title: "Central boiler", subtitle: "Turn the boiler on when any thermostat needs heat.", icon: "mdi:water-boiler" },
  safety: {
    title: "Sensor loss & manual changes",
    subtitle: "What to do when the room thermometer goes quiet, and how long a manual change lasts.",
    icon: "mdi:shield-half-full",
  },
  auto_start_stop: { title: "Auto start/stop", subtitle: "Turn the climate off when it is not needed.", icon: "mdi:power-sleep" },
  lock: { title: "Lock", subtitle: "Stop people or automations from changing this thermostat.", icon: "mdi:lock-outline" },
  other: { title: "Other", subtitle: "Settings this page does not place yet.", icon: "mdi:dots-horizontal" },
};

export const GROUP_TITLE: Record<string, string> = {
  range: "Outdoor sensor and temperature range",
  valve: "Direct valve control",
  valve_limits: "Valve commands",
  sync: "Sync the device's internal temperature",
  tpi: "TPI coefficients",
  auto_tpi: "Auto-TPI learning",
  window_detect: "How to detect it",
  window_behaviour: "What happens",
  motion_detect: "Sensor",
  motion_behaviour: "What happens",
  shedding: "Load shedding",
  boiler_use: "Central boiler",
  failure: "Heating failure detection",
};

export const METHOD_TEXT: Record<string, string> = { sensor: "Window sensor", drop: "Temperature drop" };

/** What each thermostat type is for, shown when creating one. */
export const TYPE_TEXT: Record<string, { title: string; body: string; examples: string }> = {
  thermostat_over_switch: {
    title: "Switch a heater on and off",
    body: "Versatile Thermostat turns the device on for part of each cycle, more when the room is colder.",
    examples: "Electric radiators, heating cables, relays, smart plugs, pilot-wire modules.",
  },
  thermostat_over_valve: {
    title: "Set how far a valve opens",
    body: "Versatile Thermostat sends an opening percentage to the valve and adjusts it as the room warms up.",
    examples: "Radiator valves that expose their opening as a number (e.g. some Zigbee TRVs).",
  },
  thermostat_over_climate: {
    title: "Drive a device with its own thermostat",
    body: "The device regulates itself; Versatile Thermostat sets its target and corrects it using your room sensor.",
    examples: "Thermostatic radiator valves, air conditioners, heat pumps.",
  },
  thermostat_central_config: {
    title: "Central configuration",
    body: "Shared defaults (outdoor sensor, presets, window and safety behaviour) that every VTherm can take over.",
    examples: "Create it first if you have several rooms.",
  },
};
