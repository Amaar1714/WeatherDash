import type { SavedCity, WeatherIconKey, WeatherSnapshot } from "./types";

export const CITY_CATALOG: SavedCity[] = [
  // UK
  {
    id: "london-gb",
    name: "London",
    admin: "England",
    country: "United Kingdom",
    lat: 51.5074,
    lon: -0.1278,
    source: "search",
  },
  {
    id: "manchester-gb",
    name: "Manchester",
    admin: "England",
    country: "United Kingdom",
    lat: 53.4808,
    lon: -2.2426,
    source: "search",
  },
  {
    id: "birmingham-gb",
    name: "Birmingham",
    admin: "England",
    country: "United Kingdom",
    lat: 52.4862,
    lon: -1.8904,
    source: "search",
  },
  {
    id: "edinburgh-gb",
    name: "Edinburgh",
    admin: "Scotland",
    country: "United Kingdom",
    lat: 55.9533,
    lon: -3.1883,
    source: "search",
  },
  {
    id: "glasgow-gb",
    name: "Glasgow",
    admin: "Scotland",
    country: "United Kingdom",
    lat: 55.8642,
    lon: -4.2518,
    source: "search",
  },
  // France
  {
    id: "paris-fr",
    name: "Paris",
    admin: "Île-de-France",
    country: "France",
    lat: 48.8566,
    lon: 2.3522,
    source: "search",
  },
  {
    id: "marseille-fr",
    name: "Marseille",
    admin: "Provence-Alpes-Côte d'Azur",
    country: "France",
    lat: 43.2965,
    lon: 5.3698,
    source: "search",
  },
  {
    id: "lyon-fr",
    name: "Lyon",
    admin: "Auvergne-Rhône-Alpes",
    country: "France",
    lat: 45.764,
    lon: 4.8357,
    source: "search",
  },
  // Germany
  {
    id: "berlin-de",
    name: "Berlin",
    admin: "Berlin",
    country: "Germany",
    lat: 52.52,
    lon: 13.405,
    source: "search",
  },
  {
    id: "munich-de",
    name: "Munich",
    admin: "Bavaria",
    country: "Germany",
    lat: 48.1351,
    lon: 11.582,
    source: "search",
  },
  {
    id: "hamburg-de",
    name: "Hamburg",
    admin: "Hamburg",
    country: "Germany",
    lat: 53.5511,
    lon: 9.9937,
    source: "search",
  },
  {
    id: "frankfurt-de",
    name: "Frankfurt",
    admin: "Hesse",
    country: "Germany",
    lat: 50.1109,
    lon: 8.6821,
    source: "search",
  },
  {
    id: "cologne-de",
    name: "Cologne",
    admin: "North Rhine-Westphalia",
    country: "Germany",
    lat: 50.9375,
    lon: 6.9603,
    source: "search",
  },
  // Spain
  {
    id: "madrid-es",
    name: "Madrid",
    admin: "Community of Madrid",
    country: "Spain",
    lat: 40.4168,
    lon: -3.7038,
    source: "search",
  },
  {
    id: "barcelona-es",
    name: "Barcelona",
    admin: "Catalonia",
    country: "Spain",
    lat: 41.3851,
    lon: 2.1734,
    source: "search",
  },
  // Italy
  {
    id: "rome-it",
    name: "Rome",
    admin: "Lazio",
    country: "Italy",
    lat: 41.9028,
    lon: 12.4964,
    source: "search",
  },
  {
    id: "milan-it",
    name: "Milan",
    admin: "Lombardy",
    country: "Italy",
    lat: 45.4642,
    lon: 9.19,
    source: "search",
  },
  {
    id: "venice-it",
    name: "Venice",
    admin: "Veneto",
    country: "Italy",
    lat: 45.4408,
    lon: 12.3155,
    source: "search",
  },
  // Netherlands
  {
    id: "amsterdam-nl",
    name: "Amsterdam",
    admin: "North Holland",
    country: "Netherlands",
    lat: 52.3676,
    lon: 4.9041,
    source: "search",
  },
  {
    id: "rotterdam-nl",
    name: "Rotterdam",
    admin: "South Holland",
    country: "Netherlands",
    lat: 51.9225,
    lon: 4.4792,
    source: "search",
  },
  // Portugal
  {
    id: "lisbon-pt",
    name: "Lisbon",
    admin: "Lisbon",
    country: "Portugal",
    lat: 38.7223,
    lon: -9.1393,
    source: "search",
  },
  {
    id: "porto-pt",
    name: "Porto",
    admin: "Porto",
    country: "Portugal",
    lat: 41.1579,
    lon: -8.6291,
    source: "search",
  },
  // Scandinavia
  {
    id: "oslo-no",
    name: "Oslo",
    admin: "Oslo",
    country: "Norway",
    lat: 59.9139,
    lon: 10.7522,
    source: "search",
  },
  {
    id: "stockholm-se",
    name: "Stockholm",
    admin: "Stockholm",
    country: "Sweden",
    lat: 59.3293,
    lon: 18.0686,
    source: "search",
  },
  {
    id: "copenhagen-dk",
    name: "Copenhagen",
    admin: "Capital Region",
    country: "Denmark",
    lat: 55.6761,
    lon: 12.5683,
    source: "search",
  },
  // US
  {
    id: "newyork-us",
    name: "New York",
    admin: "New York",
    country: "United States",
    lat: 40.7128,
    lon: -74.006,
    source: "search",
  },
  {
    id: "losangeles-us",
    name: "Los Angeles",
    admin: "California",
    country: "United States",
    lat: 34.0522,
    lon: -118.2437,
    source: "search",
  },
  {
    id: "chicago-us",
    name: "Chicago",
    admin: "Illinois",
    country: "United States",
    lat: 41.8781,
    lon: -87.6298,
    source: "search",
  },
  {
    id: "miami-us",
    name: "Miami",
    admin: "Florida",
    country: "United States",
    lat: 25.7617,
    lon: -80.1918,
    source: "search",
  },
  {
    id: "seattle-us",
    name: "Seattle",
    admin: "Washington",
    country: "United States",
    lat: 47.6062,
    lon: -122.3321,
    source: "search",
  },
  // Canada
  {
    id: "vancouver-ca",
    name: "Vancouver",
    admin: "British Columbia",
    country: "Canada",
    lat: 49.2827,
    lon: -123.1207,
    source: "search",
  },
  {
    id: "toronto-ca",
    name: "Toronto",
    admin: "Ontario",
    country: "Canada",
    lat: 43.6532,
    lon: -79.3832,
    source: "search",
  },
  {
    id: "montreal-ca",
    name: "Montreal",
    admin: "Quebec",
    country: "Canada",
    lat: 45.5017,
    lon: -73.5673,
    source: "search",
  },
  // Asia
  {
    id: "tokyo-jp",
    name: "Tokyo",
    admin: "Tokyo",
    country: "Japan",
    lat: 35.6762,
    lon: 139.6503,
    source: "search",
  },
  {
    id: "singapore-sg",
    name: "Singapore",
    admin: "Singapore",
    country: "Singapore",
    lat: 1.3521,
    lon: 103.8198,
    source: "search",
  },
  {
    id: "hongkong-hk",
    name: "Hong Kong",
    admin: "Hong Kong",
    country: "Hong Kong",
    lat: 22.3193,
    lon: 114.1694,
    source: "search",
  },
  {
    id: "seoul-kr",
    name: "Seoul",
    admin: "Seoul",
    country: "South Korea",
    lat: 37.5665,
    lon: 126.978,
    source: "search",
  },
  // Middle East
  {
    id: "dubai-ae",
    name: "Dubai",
    admin: "Dubai",
    country: "United Arab Emirates",
    lat: 25.2048,
    lon: 55.2708,
    source: "search",
  },
  // Australia
  {
    id: "sydney-au",
    name: "Sydney",
    admin: "New South Wales",
    country: "Australia",
    lat: -33.8688,
    lon: 151.2093,
    source: "search",
  },
  {
    id: "melbourne-au",
    name: "Melbourne",
    admin: "Victoria",
    country: "Australia",
    lat: -37.8136,
    lon: 144.9631,
    source: "search",
  },
];

// Helper to create GPS city from coords
export function createGPSCity(lat: number, lon: number): SavedCity {
  return {
    id: `gps-${lat.toFixed(4)}-${lon.toFixed(4)}`,
    name: "My location",
    admin: "",
    country: "",
    lat,
    lon,
    source: "gps",
  };
}

const CONDITIONS: { condition: string; icon: WeatherIconKey }[] = [
  { condition: "Clear sky", icon: "sun" },
  { condition: "Partly cloudy", icon: "cloud-sun" },
  { condition: "Overcast", icon: "cloud" },
  { condition: "Light rain", icon: "cloud-rain" },
  { condition: "Fog", icon: "cloud-fog" },
];

function hash(id: string) {
  return [...id].reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
}

function addDays(base: Date, days: number) {
  const next = new Date(base);
  next.setDate(base.getDate() + days);
  return next.toISOString().slice(0, 10);
}

export function searchCities(query: string): SavedCity[] {
  const q = query.trim().toLowerCase();
  if (q.length < 1) return [];
  return CITY_CATALOG.filter((city) => {
    const blob = `${city.name} ${city.admin} ${city.country}`.toLowerCase();
    return blob.includes(q);
  }).slice(0, 8);
}

export function getMockWeather(city: SavedCity, now = new Date()): WeatherSnapshot {
  const seed = hash(city.id);
  const baseTemp = 8 + (seed % 18);
  const cond = CONDITIONS[seed % CONDITIONS.length];
  const hourNow = now.getHours();

  const hourly = [];
  for (let hour = hourNow; hour <= 23; hour += 1) {
    const drift = Math.sin((hour - 12) / 4) * 3;
    const c = CONDITIONS[(seed + hour) % CONDITIONS.length];
    hourly.push({
      hour,
      tempC: baseTemp + drift,
      condition: c.condition,
      icon: c.icon,
    });
  }

  const daily = Array.from({ length: 7 }, (_, i) => {
    const c = CONDITIONS[(seed + i) % CONDITIONS.length];
    return {
      date: addDays(now, i),
      highC: baseTemp + 4 - (i % 3),
      lowC: baseTemp - 5 - (i % 2),
      condition: c.condition,
      icon: c.icon,
    };
  });

  return {
    current: {
      tempC: baseTemp + 1.4,
      feelsLikeC: baseTemp - 0.6,
      humidity: 48 + (seed % 30),
      windKmh: 9 + (seed % 16),
      condition: cond.condition,
      icon: cond.icon,
    },
    hourly,
    daily,
  };
}
