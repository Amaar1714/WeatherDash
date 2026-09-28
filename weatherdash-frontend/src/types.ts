export type Units = "C" | "F";
export type CitySource = "gps" | "search";

export type WeatherIconKey =
  | "sun"
  | "cloud-sun"
  | "cloud"
  | "cloud-rain"
  | "cloud-snow"
  | "cloud-fog"
  | "cloud-lightning"
  | "wind";

export type SavedCity = {
  id: string;
  name: string;
  admin: string;
  country: string;
  lat: number;
  lon: number;
  source: CitySource;
};

export type HourPoint = {
  hour: number;
  tempC: number;
  condition: string;
  icon: WeatherIconKey;
};

export type DayPoint = {
  date: string;
  highC: number;
  lowC: number;
  condition: string;
  icon: WeatherIconKey;
};

export type WeatherSnapshot = {
  current: {
    tempC: number;
    feelsLikeC: number;
    humidity: number;
    windKmh: number;
    condition: string;
    icon: WeatherIconKey;
  };
  hourly: HourPoint[];
  daily: DayPoint[];
};

export type DashboardState = {
  units: Units;
  home: SavedCity | null;
  extras: SavedCity[];
};
