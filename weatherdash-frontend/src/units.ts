import type { Units } from "./types";

export function toF(celsius: number) {
  return Math.round((celsius * 9) / 5 + 32);
}

export function displayTemp(celsius: number, units: Units) {
  return units === "C" ? Math.round(celsius) : toF(celsius);
}

export function tempUnit(units: Units) {
  return units === "C" ? "°C" : "°F";
}

export function displayWind(kmh: number, units: Units) {
  if (units === "C") return `${Math.round(kmh)} km/h`;
  return `${Math.round(kmh * 0.621371)} mph`;
}

export function formatHour(hour: number) {
  return `${String(hour).padStart(2, "0")}:00`;
}

export function weekdayLabel(isoDate: string) {
  const date = new Date(`${isoDate}T12:00:00`);
  return date.toLocaleDateString("en-GB", { weekday: "short" });
}
