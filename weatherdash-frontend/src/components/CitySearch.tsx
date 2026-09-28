import { Loader2, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { searchCitiesApi } from "../api";
import type { SavedCity } from "../types";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSelect: (city: SavedCity) => void;
  excludeIds?: string[];
  autoFocus?: boolean;
  placeholder?: string;
};

export function CitySearch({
  value,
  onChange,
  onSelect,
  excludeIds = [],
  autoFocus,
  placeholder = "Search for a city",
}: Props) {
  const [active, setActive] = useState(false);
  // Raw results from the API — never cleared until a new query fires
  const [allResults, setAllResults] = useState<SavedCity[]>([]);
  const [fetching, setFetching] = useState(false);
  // Ref so the API callback can check without being a stale closure dep
  const activeQuery = useRef("");

  // Fetch effect only depends on `value` — excludeIds filtered at render time
  useEffect(() => {
    const q = value.trim();

    if (q.length < 2) {
      activeQuery.current = "";
      setAllResults([]);
      setFetching(false);
      return;
    }

    const timeout = setTimeout(() => {
      activeQuery.current = q;
      setFetching(true);
      searchCitiesApi(q)
        .then((cities) => {
          if (activeQuery.current !== q) return; // stale, discard
          setAllResults(cities);
        })
        .catch(() => {
          if (activeQuery.current === q) setAllResults([]);
        })
        .finally(() => {
          if (activeQuery.current === q) setFetching(false);
        });
    }, 350);

    return () => clearTimeout(timeout);
  }, [value]); // <-- excludeIds NOT here; avoids re-fetching on every parent render

  // Filter at render time — no extra state updates
  const results = allResults.filter((c) => !excludeIds.includes(c.id));
  const showDropdown = active && value.trim().length >= 2;

  return (
    <div className="relative">
      {fetching ? (
        <Loader2 className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-accent-600" />
      ) : (
        <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      )}
      <input
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setActive(true)}
        onBlur={() => window.setTimeout(() => setActive(false), 150)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500"
      />

      {showDropdown && (
        <ul className="absolute z-20 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white py-1 shadow-card">
          {!fetching && results.length === 0 && (
            <li className="px-4 py-3 text-sm text-slate-500">
              No cities found
            </li>
          )}
          {results.map((city) => (
            <li key={city.id}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  onSelect(city);
                  onChange("");
                }}
                className="flex w-full flex-col items-start px-4 py-2.5 text-left hover:bg-accent-50"
              >
                <span className="text-sm font-medium text-slate-900">
                  {city.name}
                </span>
                <span className="text-xs text-slate-500">
                  {city.admin}, {city.country}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
