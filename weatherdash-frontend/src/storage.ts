import type { DashboardState } from "./types";

const KEY = "weatherdash:v2";

export const defaultState = (): DashboardState => ({
  units: "C",
  home: null,
  extras: [],
});

export function loadState(): DashboardState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw) as DashboardState;
    if (parsed.units !== "C" && parsed.units !== "F") parsed.units = "C";
    if (!Array.isArray(parsed.extras)) parsed.extras = [];
    parsed.extras = parsed.extras.slice(0, 2);
    return parsed;
  } catch {
    return defaultState();
  }
}

export function saveState(state: DashboardState) {
  localStorage.setItem(KEY, JSON.stringify(state));
}
