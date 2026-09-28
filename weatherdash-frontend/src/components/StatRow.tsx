import { Droplets, Thermometer, Wind } from "lucide-react";
import type { Units, WeatherSnapshot } from "../types";
import { displayTemp, displayWind, tempUnit } from "../units";

type Props = {
  weather: WeatherSnapshot;
  units: Units;
};

export function StatRow({ weather, units }: Props) {
  const items = [
    {
      label: "Feels like",
      value: `${displayTemp(weather.current.feelsLikeC, units)}${tempUnit(units)}`,
      icon: Thermometer,
    },
    {
      label: "Humidity",
      value: `${weather.current.humidity}%`,
      icon: Droplets,
    },
    {
      label: "Wind",
      value: displayWind(weather.current.windKmh, units),
      icon: Wind,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl bg-slate-50 px-3 py-3 sm:px-4"
        >
          <item.icon className="mb-2 h-4 w-4 text-accent-600" />
          <p className="text-xs text-slate-500">{item.label}</p>
          <p className="mt-0.5 text-sm font-semibold text-slate-900 sm:text-base">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
