import { Plus, X } from "lucide-react";
import { useState } from "react";
import type { SavedCity } from "../types";
import { CitySearch } from "./CitySearch";

type Props = {
  open: boolean;
  excludeIds: string[];
  onClose: () => void;
  onSelect: (city: SavedCity) => void;
};

export function AddCityModal({ open, excludeIds, onClose, onSelect }: Props) {
  const [query, setQuery] = useState("");

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-end justify-center bg-slate-900/30 p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close search"
        onClick={onClose}
      />
      <div className="relative w-full max-w-md rounded-3xl bg-white p-5 shadow-card">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-50 text-accent-700">
              <Plus className="h-4 w-4" />
            </span>
            <h2 className="text-base font-semibold text-slate-900">Add a city</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <CitySearch
          autoFocus
          value={query}
          onChange={setQuery}
          excludeIds={excludeIds}
          onSelect={(city) => {
            onSelect(city);
            setQuery("");
            onClose();
          }}
        />
      </div>
    </div>
  );
}
