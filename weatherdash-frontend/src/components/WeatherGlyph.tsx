import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { WeatherIconKey } from "../types";

const MAP: Record<WeatherIconKey, LucideIcon> = {
  sun: Sun,
  "cloud-sun": CloudSun,
  cloud: Cloud,
  "cloud-rain": CloudRain,
  "cloud-snow": CloudSnow,
  "cloud-fog": CloudFog,
  "cloud-lightning": CloudLightning,
  wind: Wind,
};

export function WeatherGlyph({
  name,
  className,
}: {
  name: WeatherIconKey;
  className?: string;
}) {
  const Icon = MAP[name] ?? Cloud;
  return <Icon className={className} strokeWidth={1.75} />;
}
