import type { HourPoint, Units } from "../types";
import { displayTemp, formatHour } from "../units";
import { WeatherGlyph } from "./WeatherGlyph";

type Props = {
  hours: HourPoint[];
  units: Units;
};

export function HourlyRow({ hours, units }: Props) {
  return (
    <section>
      <h2 className="mb-3 text-sm font-medium text-slate-500">
        Rest of today
      </h2>
      <div className="hour-scroll -mx-1 flex gap-2 overflow-x-auto pb-2">
        {hours.map((hour) => (
          <div
            key={hour.hour}
            className="flex min-w-[4.5rem] flex-col items-center rounded-2xl border border-slate-100 bg-slate-50 px-3 py-3"
          >
            <span className="text-xs font-medium text-slate-500">
              {formatHour(hour.hour)}
            </span>
            <WeatherGlyph
              name={hour.icon}
              className="my-2 h-5 w-5 text-accent-600"
            />
            <span className="text-sm font-semibold text-slate-900">
              {displayTemp(hour.tempC, units)}°
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
