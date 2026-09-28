import type { SavedCity, WeatherSnapshot, HourPoint, DayPoint } from "./types";

const API_BASE = "/api";

type GeocodingApiResult = {
  name: string;
  admin: string;
  country: string;
  countryCode: string;
  lat: number;
  lon: number;
};

type WeatherApiResponse = {
  location: {
    name: string;
    admin: string;
    country: string;
    lat: number;
    lon: number;
  };
  current: {
    tempC: number;
    feelsLikeC: number;
    humidity: number;
    windKmh: number;
    weatherCode: number;
    condition: string;
    icon: string;
  };
  hourly: Array<{
    time: string;
    tempC: number;
    weatherCode: number;
    condition: string;
    icon: string;
  }>;
  daily: Array<{
    date: string;
    highC: number;
    lowC: number;
    weatherCode: number;
    condition: string;
    icon: string;
  }>;
};

export async function searchCitiesApi(query: string): Promise<SavedCity[]> {
  if (query.trim().length < 2) return [];
  
  const response = await fetch(
    `${API_BASE}/geocode?q=${encodeURIComponent(query)}`,
  );
  
  if (!response.ok) {
    throw new Error(`Geocoding failed: ${response.statusText}`);
  }
  
  const results: GeocodingApiResult[] = await response.json();
  
  return results.map((r) => ({
    id: `${r.name.toLowerCase()}-${r.countryCode.toLowerCase()}-${r.lat.toFixed(2)}`,
    name: r.name,
    admin: r.admin,
    country: r.country,
    lat: r.lat,
    lon: r.lon,
    source: "search" as const,
  }));
}

export async function getWeatherApi(city: SavedCity): Promise<WeatherSnapshot> {
  const params = new URLSearchParams({
    lat: city.lat.toString(),
    lon: city.lon.toString(),
  });
  
  if (city.name) params.append("name", city.name);
  if (city.admin) params.append("admin", city.admin);
  if (city.country) params.append("country", city.country);
  
  const response = await fetch(`${API_BASE}/weather?${params}`);
  
  if (!response.ok) {
    throw new Error(`Weather fetch failed: ${response.statusText}`);
  }
  
  const data: WeatherApiResponse = await response.json();
  
  // Convert API format to app format
  const hourly: HourPoint[] = data.hourly.map((h) => {
    const time = new Date(h.time);
    return {
      hour: time.getHours(),
      tempC: h.tempC,
      condition: h.condition,
      icon: h.icon as any,
    };
  });
  
  const daily: DayPoint[] = data.daily.map((d) => ({
    date: d.date,
    highC: d.highC,
    lowC: d.lowC,
    condition: d.condition,
    icon: d.icon as any,
  }));
  
  return {
    current: {
      tempC: data.current.tempC,
      feelsLikeC: data.current.feelsLikeC,
      humidity: data.current.humidity,
      windKmh: data.current.windKmh,
      condition: data.current.condition,
      icon: data.current.icon as any,
    },
    hourly,
    daily,
  };
}
