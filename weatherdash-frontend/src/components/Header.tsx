import { Locate } from "lucide-react";
import type { Units } from "../types";

type Props = {
  units: Units;
  onToggleUnits: (units: Units) => void;
  onUseLocation: () => void;
};

export function Header({ units, onToggleUnits, onUseLocation }: Props) {
  return (
    <header className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xl font-semibold tracking-tight text-slate-900">
          WeatherDash
        </p>
        <p className="text-sm text-slate-500">Clean forecasts, at a glance</p>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button
          type="button"
          onClick={onUseLocation}
          className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-accent-700 hover:bg-accent-50"
        >
          <Locate className="h-4 w-4" />
          <span className="hidden sm:inline">Use my location</span>
        </button>

        <div className="flex rounded-full border border-slate-200 bg-white p-1 text-sm font-medium">
          <button
            type="button"
            onClick={() => onToggleUnits("C")}
            className={`rounded-full px-3 py-1.5 ${
              units === "C"
                ? "bg-accent-600 text-white"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            °C
          </button>
          <button
            type="button"
            onClick={() => onToggleUnits("F")}
            className={`rounded-full px-3 py-1.5 ${
              units === "F"
                ? "bg-accent-600 text-white"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            °F
          </button>
        </div>
      </div>
    </header>
  );
}
