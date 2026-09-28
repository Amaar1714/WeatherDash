import { X } from "lucide-react";
import type { SavedCity, Units, WeatherSnapshot } from "../types";
import { displayTemp, tempUnit } from "../units";
import { DailyRow } from "./DailyRow";
import { WeatherGlyph } from "./WeatherGlyph";

type Props = {
  city: SavedCity;
  weather: WeatherSnapshot;
  units: Units;
  onRemove: () => void;
  onClick: () => void;
};

export function ExtraCityCard({ city, weather, units, onRemove, onClick }: Props) {
  return (
    <article 
      onClick={onClick}
      className="relative cursor-pointer rounded-3xl border border-slate-200/80 bg-white p-5 shadow-card transition-all hover:border-accent-300 hover:shadow-lg"
    >
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
        aria-label={`Remove ${city.name}`}
        className="absolute right-3 top-3 z-10 rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
      >
        <X className="h-4 w-4" />
      </button>

      <div className="flex items-start justify-between gap-3 pr-6">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">{city.name}</h2>
          <p className="text-xs text-slate-500">
            {city.admin}, {city.country}
          </p>
        </div>
        <WeatherGlyph
          name={weather.current.icon}
          className="h-8 w-8 text-accent-600"
        />
      </div>

      <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">
        {displayTemp(weather.current.tempC, units)}
        <span className="text-lg font-medium text-slate-400">
          {tempUnit(units)}
        </span>
      </p>
      <p className="mt-1 text-sm text-slate-600">{weather.current.condition}</p>

      <div className="mt-5">
        <DailyRow days={weather.daily} units={units} compact />
      </div>
    </article>
  );
}
