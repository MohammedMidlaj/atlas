"use client";

import { motion } from "framer-motion";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, SectionLabel, StatCard } from "@/components/ui";
import { atlasStats } from "@/lib/data";

function Bar({ label, value }: { label: string; value: number }) {
  return (
    <div className="grid grid-cols-[1fr_54px] gap-4 items-center">
      <div>
        <p className="text-xs text-atlas-muted">{label}</p>
        <div className="mt-2 h-2 rounded-full bg-atlas-surface3 overflow-hidden border border-atlas-border">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.max(2, Math.min(100, value))}%` }}
            transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1] }}
            className="h-full rounded-full bg-gradient-to-r from-atlas-accent/80 to-atlas-accent2/75"
          />
        </div>
      </div>
      <p className="text-sm font-semibold text-atlas-text text-right">{value}%</p>
    </div>
  );
}

export default function StatsPage() {
  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <PageHeader
          eyebrow="Analytics"
          title="Stats"
          subtitle="A gentle mirror—not for comparison, but for noticing the shape of your journeys."
        />
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard value={atlasStats.countriesVisited} label="Countries visited" icon="🗺️" />
        <StatCard value={atlasStats.totalTrips} label="Trips" icon="✈️" />
        <StatCard value={`${atlasStats.travelStreakDays}d`} label="Streak" icon="🔥" />
        <StatCard value={`${atlasStats.revisitRate}%`} label="Revisit rate" icon="↩︎" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-5">
        <Card className="p-6 sm:p-7">
          <SectionLabel>Completion</SectionLabel>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-atlas-text">
            Continent progress
          </h2>
          <p className="mt-2 text-sm text-atlas-muted">
            A lightweight visualization (mock). Swap this for real analytics later.
          </p>

          <div className="mt-6 grid gap-4">
            <Bar label="Asia" value={42} />
            <Bar label="Europe" value={18} />
            <Bar label="Middle East" value={22} />
            <Bar label="South America" value={8} />
            <Bar label="Nordics" value={6} />
          </div>
        </Card>

        <Card className="p-6 sm:p-7">
          <SectionLabel>Favorite</SectionLabel>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-atlas-text">
            {atlasStats.favoriteDestination}
          </h2>
          <p className="mt-2 text-sm text-atlas-muted leading-relaxed">
            The place you return to the most in your notes—often because it changed how you see
            light, time, or quiet.
          </p>
          <div className="mt-6 rounded-2xl border border-atlas-border bg-atlas-surface p-5">
            <SectionLabel>Signals</SectionLabel>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-atlas-border bg-atlas-surface2 p-3">
                <p className="text-xs text-atlas-muted">Total photos</p>
                <p className="mt-2 text-lg font-semibold text-atlas-text">
                  {atlasStats.totalPhotos}
                </p>
              </div>
              <div className="rounded-xl border border-atlas-border bg-atlas-surface2 p-3">
                <p className="text-xs text-atlas-muted">Streak</p>
                <p className="mt-2 text-lg font-semibold text-atlas-text">
                  {atlasStats.travelStreakDays} days
                </p>
              </div>
              <div className="rounded-xl border border-atlas-border bg-atlas-surface2 p-3 col-span-2">
                <p className="text-xs text-atlas-muted">Completion</p>
                <p className="mt-2 text-lg font-semibold text-atlas-text">
                  {atlasStats.continentCompletion}%
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

