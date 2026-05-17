"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Country, Memory } from "@/lib/types";
import { Button, Divider, SectionLabel, Stars, Tag, Toggle } from "@/components/ui";
import { useCountries } from "@/contexts/CountriesContext";
import { cn } from "@/lib/utils/cn";

function moodColor(mood?: string) {
  switch (mood) {
    case "serene":
      return "#3ee7a3";
    case "wild":
      return "#00d4ff";
    case "nostalgic":
      return "#f5d06f";
    case "awe":
      return "#7c5cff";
    case "electric":
      return "#ff5c7a";
    default:
      return "var(--atlas-muted)";
  }
}

export function CountryPanel({
  country,
  memories,
  onClose,
}: {
  country: Country | null;
  memories: Memory[];
  onClose: () => void;
}) {
  const [revisit, setRevisit] = useState(true);
  const { updateCountryStatus } = useCountries();

  const rating = useMemo(() => {
    if (!memories.length) return 0;
    return Math.round(
      memories.reduce((acc, m) => acc + m.rating, 0) / memories.length
    );
  }, [memories]);

  return (
    <div className="xl:sticky xl:top-6 h-fit">
      <div className="atlas-glass rounded-2xl overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-atlas-border flex items-start justify-between gap-4">
          <div className="min-w-0">
            <SectionLabel>Country</SectionLabel>
            <div className="mt-1 flex items-center gap-3">
              <h2 className="text-lg font-semibold tracking-tight text-atlas-text truncate">
                {country ? country.name : "Select a country"}
              </h2>
              {country?.status === "visited" && (
                <Tag label="Visited" color={country.accent} />
              )}
              {country?.status === "wishlist" && (
                <Tag label="Wishlist" color={country.accent} />
              )}
            </div>
            <p className="mt-2 text-sm text-atlas-muted leading-relaxed">
              {country
                ? country.notes ??
                  "A quiet folder of scenes, sounds, and small details."
                : "Tap a glowing pin to open memories, notes, and mood."}
            </p>
          </div>
          <button
            className={cn(
              "h-9 w-9 rounded-xl border border-atlas-border text-atlas-muted",
              "hover:text-atlas-text hover:bg-atlas-surface transition"
            )}
            onClick={onClose}
            aria-label="Close panel"
          >
            ✕
          </button>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={country?.iso2 ?? "empty"}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="p-5 sm:p-6"
          >
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-atlas-surface2 border border-atlas-border p-3">
                <SectionLabel>Memories</SectionLabel>
                <p className="mt-2 text-xl font-semibold text-atlas-text">
                  {memories.length}
                </p>
              </div>
              <div className="rounded-xl bg-atlas-surface2 border border-atlas-border p-3">
                <SectionLabel>Rating</SectionLabel>
                <div className="mt-2 flex items-center gap-2">
                  <Stars rating={rating} />
                  <span className="text-xs text-atlas-muted">
                    {rating ? `${rating}/5` : "—"}
                  </span>
                </div>
              </div>
              <div className="rounded-xl bg-atlas-surface2 border border-atlas-border p-3">
                <SectionLabel>Revisit</SectionLabel>
                <div className="mt-2">
                  <Toggle checked={revisit} onChange={setRevisit} accentColor={country?.accent} />
                </div>
              </div>
            </div>

            <Divider className="my-5" />

            <SectionLabel>Highlights</SectionLabel>
            <div className="mt-3 grid gap-3">
              {memories.length ? (
                memories.slice(0, 3).map((m) => (
                  <div
                    key={m.id}
                    className="rounded-2xl border border-atlas-border bg-atlas-surface p-4 hover:bg-atlas-surface2 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-atlas-text truncate">
                          {m.title}
                        </p>
                        <p className="mt-1 text-xs text-atlas-muted">
                          {m.location} · {m.dateLabel}
                        </p>
                      </div>
                      <Tag label={m.mood} color={moodColor(m.mood)} size="xs" />
                    </div>
                    <p className="mt-2 text-sm text-atlas-muted leading-relaxed">
                      {m.excerpt}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {m.tags.slice(0, 4).map((t) => (
                        <Tag key={t} label={t} size="xs" />
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-atlas-border bg-atlas-surface p-4 text-sm text-atlas-muted">
                  No memories here yet. Add notes, photos, and a mood to start
                  coloring this place in.
                </div>
              )}
            </div>

            <div className="mt-5 flex gap-2">
              <Button variant="primary" className="flex-1">
                Open country journal
              </Button>
              {country && country.status !== "visited" && (
                <Button
                  variant="secondary"
                  onClick={() => updateCountryStatus(country.iso2, "visited")}
                >
                  Mark visited
                </Button>
              )}
              <Button variant="secondary">
                Add note
              </Button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

