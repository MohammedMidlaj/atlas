import Link from "next/link";
import { WorldMap } from "@/components/map/WorldMap";
import { MemoryCard } from "@/components/memories/MemoryCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { Button, Card, SectionLabel, StatCard } from "@/components/ui";
import { atlasStats, memories } from "@/lib/data";

export default function Home() {
  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <PageHeader
          eyebrow="Personal travel archive"
          title="Atlas"
          subtitle="Your world starts muted and becomes vivid as you return to memories—slowly, carefully, and beautifully."
          right={
            <div className="flex gap-2">
              <Link href="/memories">
                <Button variant="primary">Open memories</Button>
              </Link>
              <Link href="/map">
                <Button variant="secondary">Explore map</Button>
              </Link>
            </div>
          }
        />

        <div className="mt-7 grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard value={atlasStats.countriesVisited} label="Countries visited" icon="🌍" />
          <StatCard value={atlasStats.totalTrips} label="Trips" icon="✈️" />
          <StatCard value={`${atlasStats.travelStreakDays}d`} label="Streak" icon="🔥" />
          <StatCard value={`${atlasStats.totalPhotos}`} label="Photos" icon="📷" />
        </div>

        <div className="mt-7 rounded-2xl border border-atlas-border bg-atlas-surface p-5">
          <SectionLabel>The concept</SectionLabel>
          <p className="mt-2 text-sm text-atlas-muted leading-relaxed">
            Atlas is not a feed. It’s a private archive: notes that keep their scent, photos that
            hold their light, and places that unlock color the moment you remember.
          </p>
        </div>
      </Card>

      <WorldMap className="min-h-[520px]" />

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-5">
        <Card className="p-6 sm:p-7">
          <div className="flex items-end justify-between gap-4">
            <div>
              <SectionLabel>Recent memories</SectionLabel>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-atlas-text">
                Moments worth returning to
              </h2>
              <p className="mt-2 text-sm text-atlas-muted">
                A cinematic timeline—small details, big feelings.
              </p>
            </div>
            <Link href="/memories">
              <Button variant="ghost">View all</Button>
            </Link>
          </div>

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            {memories.slice(0, 4).map((m) => (
              <MemoryCard key={m.id} memory={m} />
            ))}
          </div>
        </Card>

        <Card className="p-6 sm:p-7">
          <SectionLabel>Next unlock</SectionLabel>
          <h2 className="mt-2 text-xl font-semibold tracking-tight text-atlas-text">
            Dream destinations
          </h2>
          <p className="mt-2 text-sm text-atlas-muted leading-relaxed">
            Keep a gentle wishlist: places you want to meet slowly, with intention.
          </p>
          <div className="mt-5 grid gap-3">
            {[
              { title: "Japan", note: "Neon rain and quiet temples." },
              { title: "Iceland", note: "Black sand and aurora silence." },
              { title: "Peru", note: "Stone paths above the clouds." },
            ].map((x) => (
              <div
                key={x.title}
                className="rounded-2xl border border-atlas-border bg-atlas-surface p-4 hover:bg-atlas-surface2 transition"
              >
                <p className="text-sm font-semibold text-atlas-text">{x.title}</p>
                <p className="mt-1 text-sm text-atlas-muted">{x.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-5">
            <Link href="/wishlist">
              <Button variant="secondary" className="w-full">
                Open wishlist
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}