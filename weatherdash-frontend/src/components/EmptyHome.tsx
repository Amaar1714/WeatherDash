import { MapPin, Search } from "lucide-react";
import { useState } from "react";
import type { SavedCity } from "../types";
import { CitySearch } from "./CitySearch";

type Props = {
  onSelect: (city: SavedCity) => void;
  onUseLocation: () => void;
};

export function EmptyHome({ onSelect, onUseLocation }: Props) {
  const [query, setQuery] = useState("");

  return (
    <article className="rounded-3xl border border-slate-200/80 bg-white px-6 py-16 text-center shadow-card sm:px-12">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent-50 text-accent-700">
        <Search className="h-5 w-5" />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        Search for a city
      </h1>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        Location access was skipped. Type a city to make it your home forecast —
        try London — or use your location instead.
      </p>
      <div className="mx-auto mt-8 max-w-md text-left">
        <CitySearch
          autoFocus
          value={query}
          onChange={setQuery}
          onSelect={onSelect}
          placeholder="Try London"
        />
      </div>
      <button
        type="button"
        onClick={onUseLocation}
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent-700 hover:text-accent-600"
      >
        <MapPin className="h-4 w-4" />
        Use my location
      </button>
    </article>
  );
}
