import type { DayPoint, Units } from "../types";
import { displayTemp, weekdayLabel } from "../units";
import { WeatherGlyph } from "./WeatherGlyph";

type Props = {
  days: DayPoint[];
  units: Units;
  compact?: boolean;
};

export function DailyRow({ days, units, compact = false }: Props) {
  return (
    <section>
      {!compact && (
        <h2 className="mb-3 text-sm font-medium text-slate-500">Next 7 days</h2>
      )}
      <div
        className={
          compact
            ? "grid grid-cols-7 gap-1"
            : "grid grid-cols-2 gap-2 sm:grid-cols-7"
        }
      >
        {days.map((day) => (
          <div
            key={day.date}
            className={`flex flex-col items-center rounded-2xl bg-slate-50 ${
              compact ? "px-1 py-2" : "px-2 py-3"
            }`}
          >
            <span className="text-xs font-medium text-slate-500">
              {weekdayLabel(day.date)}
            </span>
            <WeatherGlyph
              name={day.icon}
              className={`my-1.5 text-accent-600 ${compact ? "h-4 w-4" : "h-5 w-5"}`}
            />
            <p className={`font-semibold text-slate-900 ${compact ? "text-xs" : "text-sm"}`}>
              {displayTemp(day.highC, units)}°
            </p>
            <p className="text-xs text-slate-400">
              {displayTemp(day.lowC, units)}°
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
