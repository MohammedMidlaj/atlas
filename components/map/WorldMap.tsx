"use client";

import { useMemo, useState } from "react";
import type { Memory } from "@/lib/types";
import { useCountries } from "@/contexts/CountriesContext";
import { getMemoriesByCountry } from "@/lib/data/memories";
import { cn } from "@/lib/utils/cn";
import { CountryPanel } from "@/components/map/CountryPanel";
import { WorldMap2D } from "@/components/map/WorldMap2D";

export function WorldMap({
  className,
  initialCountryIso2,
}: {
  className?: string;
  initialCountryIso2?: string;
}) {
  const { countries } = useCountries();
  const [selectedIso2, setSelectedIso2] = useState<string | null>(
    initialCountryIso2 ?? null
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return countries;
    const query = searchQuery.toLowerCase();
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(query) ||
        country.iso2.toLowerCase().includes(query)
    );
  }, [searchQuery, countries]);

  const selectedCountry = useMemo(
    () => countries.find((c) => c.iso2 === selectedIso2) ?? null,
    [selectedIso2, countries]
  );

  const selectedMemories: Memory[] = useMemo(() => {
    if (!selectedCountry) return [];
    return getMemoriesByCountry(selectedCountry.iso2);
  }, [selectedCountry]);

  return (
    <div
      className={cn(
        "grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_380px] 2xl:grid-cols-[minmax(0,1fr)_420px] gap-5",
        className
      )}
    >
      <div className="atlas-glass rounded-2xl overflow-hidden relative">
        <div className="p-5 sm:p-6 border-b border-atlas-border flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.22em] text-atlas-subtle">
              World
            </p>
            <p className="text-lg font-semibold tracking-tight text-atlas-text">
              Your world slowly comes alive
            </p>
          </div>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 text-sm bg-atlas-surface border border-atlas-border rounded-lg text-atlas-text placeholder-atlas-muted focus:outline-none focus:ring-2 focus:ring-atlas-accent/50 transition"
            />
            <div className="flex gap-2">
              <div className="flex items-center gap-2 text-xs text-atlas-muted">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[rgba(62,231,163,1)] shadow-[0_0_24px_rgba(62,231,163,0.25)]" />
                Visited
              </div>
              <div className="flex items-center gap-2 text-xs text-atlas-muted">
                <span className="inline-block h-2.5 w-2.5 rounded-full border border-atlas-accent2/70 shadow-[0_0_30px_rgba(var(--atlas-glow2)/0.18)]" />
                Wishlist
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 sm:p-4">
          <div className="rounded-2xl border border-atlas-border bg-atlas-surface p-2 sm:p-3">
            <WorldMap2D
              countries={filteredCountries}
              onCountryClick={(iso2) => setSelectedIso2(iso2)}
              className="rounded-2xl overflow-hidden"
            />
          </div>
        </div>
      </div>

      <CountryPanel
        country={selectedCountry}
        memories={selectedMemories}
        onClose={() => setSelectedIso2(null)}
      />
    </div>
  );
}

