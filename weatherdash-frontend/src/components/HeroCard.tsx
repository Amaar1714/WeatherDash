import { MapPin } from "lucide-react";
import type { SavedCity, Units, WeatherSnapshot } from "../types";
import { displayTemp, tempUnit } from "../units";
import { DailyRow } from "./DailyRow";
import { HourlyRow } from "./HourlyRow";
import { StatRow } from "./StatRow";
import { WeatherGlyph } from "./WeatherGlyph";

type Props = {
  city: SavedCity;
  weather: WeatherSnapshot;
  units: Units;
};

export function HeroCard({ city, weather, units }: Props) {
  return (
    <article className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-card sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          {city.source === "gps" && (
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-accent-700">
              My location
            </p>
          )}
          <div className="flex items-start gap-2">
            <MapPin className="mt-1.5 h-5 w-5 text-slate-400" />
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                {city.name}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                {city.admin}, {city.country}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <WeatherGlyph
            name={weather.current.icon}
            className="h-16 w-16 text-accent-600 sm:h-20 sm:w-20"
          />
          <div>
            <p className="text-6xl font-semibold tracking-tight text-slate-900 sm:text-7xl">
              {displayTemp(weather.current.tempC, units)}
              <span className="text-3xl font-medium text-slate-400">
                {tempUnit(units)}
              </span>
            </p>
            <p className="mt-1 text-base text-slate-600">
              {weather.current.condition}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-8">
        <StatRow weather={weather} units={units} />
        <HourlyRow hours={weather.hourly} units={units} />
        <DailyRow days={weather.daily} units={units} />
      </div>
    </article>
  );
}
