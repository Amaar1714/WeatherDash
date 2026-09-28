import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getWeatherApi } from "./api";
import { AddCityModal } from "./components/AddCityModal";
import { EmptyHome } from "./components/EmptyHome";
import { ExtraCityCard } from "./components/ExtraCityCard";
import { Header } from "./components/Header";
import { HeroCard } from "./components/HeroCard";
import { createGPSCity } from "./mockData";
import { loadState, saveState } from "./storage";
import type { DashboardState, SavedCity, Units, WeatherSnapshot } from "./types";

export default function App() {
  const [state, setState] = useState<DashboardState>(() => loadState());
  const [adding, setAdding] = useState(false);
  const [homeWeather, setHomeWeather] = useState<WeatherSnapshot | null>(null);
  const [extraWeather, setExtraWeather] = useState<Array<{ city: SavedCity; weather: WeatherSnapshot }>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    saveState(state);
  }, [state]);

  // First visit with no saved home: try GPS, fall back to the search state
  useEffect(() => {
    if (state.home || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState((prev) =>
          prev.home
            ? prev
            : {
                ...prev,
                home: createGPSCity(
                  position.coords.latitude,
                  position.coords.longitude,
                ),
              },
        );
      },
      () => {
        // Permission denied or unavailable: EmptyHome search is already shown
      },
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch home weather
  useEffect(() => {
    if (!state.home) {
      setHomeWeather(null);
      return;
    }

    setLoading(true);
    setError(null);
    getWeatherApi(state.home)
      .then(setHomeWeather)
      .catch((err) => {
        console.error("Home weather error:", err);
        setError(`Failed to load weather for ${state.home?.name}`);
        setHomeWeather(null);
      })
      .finally(() => setLoading(false));
  }, [state.home]);

  // Fetch extra cities weather
  useEffect(() => {
    if (state.extras.length === 0) {
      setExtraWeather([]);
      return;
    }

    Promise.all(
      state.extras.map(async (city) => {
        try {
          const weather = await getWeatherApi(city);
          return { city, weather };
        } catch (err) {
          console.error(`Extra weather error for ${city.name}:`, err);
          return null;
        }
      }),
    ).then((results) => {
      setExtraWeather(results.filter((r) => r !== null) as any);
    });
  }, [state.extras]);

  const usedIds = useMemo(
    () =>
      [state.home?.id, ...state.extras.map((c) => c.id)].filter(
        Boolean,
      ) as string[],
    [state.home?.id, state.extras],
  );

  const canAdd = Boolean(state.home) && state.extras.length < 2;

  function setUnits(units: Units) {
    setState((prev) => ({ ...prev, units }));
  }

  function setHome(city: SavedCity) {
    setState((prev) => ({
      ...prev,
      home: city,
      extras: prev.extras.filter((extra) => extra.id !== city.id),
    }));
  }

  function useLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const gpsCity = createGPSCity(
          position.coords.latitude,
          position.coords.longitude,
        );
        setHome(gpsCity);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert(
          `Location access denied: ${error.message}. Please search for a city instead.`,
        );
      },
    );
  }

  function swapWithHome(city: SavedCity) {
    setState((prev) => {
      if (!prev.home) return prev;
      
      // Current hero becomes an extra, clicked extra becomes hero
      const newExtras = prev.extras
        .filter((extra) => extra.id !== city.id)
        .concat({ ...prev.home, source: "search" as const })
        .slice(0, 2);

      return {
        ...prev,
        home: city,
        extras: newExtras,
      };
    });
  }

  function addExtra(city: SavedCity) {
    setState((prev) => {
      if (!prev.home || prev.extras.length >= 2) return prev;
      if (prev.home.id === city.id) return prev;
      if (prev.extras.some((extra) => extra.id === city.id)) return prev;
      return { ...prev, extras: [...prev.extras, { ...city, source: "search" }] };
    });
  }

  function removeExtra(id: string) {
    setState((prev) => ({
      ...prev,
      extras: prev.extras.filter((city) => city.id !== id),
    }));
  }

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-10">
        <Header
          units={state.units}
          onToggleUnits={setUnits}
          onUseLocation={useLocation}
        />

        <main className="mt-8 space-y-5">
          {error && (
            <div className="rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading && !homeWeather && state.home && (
            <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
              <div className="h-8 w-48 rounded bg-slate-200"></div>
              <div className="mt-6 h-20 w-32 rounded bg-slate-200"></div>
            </div>
          )}

          {!loading && state.home && homeWeather && (
            <HeroCard
              city={state.home}
              weather={homeWeather}
              units={state.units}
            />
          )}

          {!state.home && !loading && (
            <EmptyHome onSelect={setHome} onUseLocation={useLocation} />
          )}

          {extraWeather.length > 0 && (
            <div
              className={`grid gap-4 ${
                extraWeather.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1"
              }`}
            >
              {extraWeather.map(({ city, weather }) => (
                <ExtraCityCard
                  key={city.id}
                  city={city}
                  weather={weather}
                  units={state.units}
                  onRemove={() => removeExtra(city.id)}
                  onClick={() => swapWithHome(city)}
                />
              ))}
            </div>
          )}

          {canAdd && (
            <div className="flex justify-center pt-1">
              <button
                type="button"
                onClick={() => setAdding(true)}
                aria-label="Add a city"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-card hover:border-accent-500 hover:text-accent-700"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-600 text-white">
                  <Plus className="h-4 w-4" />
                </span>
                Add a city
              </button>
            </div>
          )}
        </main>
      </div>

      <AddCityModal
        open={adding}
        excludeIds={usedIds}
        onClose={() => setAdding(false)}
        onSelect={addExtra}
      />
    </div>
  );
}
