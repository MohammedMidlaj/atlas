import Image from "next/image";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { WorldMap } from "@/components/map/WorldMap";
import { MemoryCard } from "@/components/memories/MemoryCard";
import { Button, Card, SectionLabel, StatCard } from "@/components/ui";
import { atlasStats, memories, publicProfile } from "@/lib/data";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  // MVP: read-only mock profile. Username is accepted for URL polish.
  const profile = { ...publicProfile, username };
  const featured = memories.filter((m) => profile.featuredMemories.includes(m.id));

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row gap-5 sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-14 rounded-2xl overflow-hidden border border-atlas-border bg-atlas-surface">
              <Image src={profile.avatar} alt={profile.displayName} fill className="object-cover opacity-90" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] text-atlas-subtle">
                Public profile preview
              </p>
              <h1 className="text-2xl font-semibold tracking-tight text-atlas-text">
                {profile.displayName}
                <span className="text-atlas-subtle font-normal"> / {profile.username}</span>
              </h1>
              <p className="mt-2 text-sm text-atlas-muted max-w-2xl">
                {profile.bio}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="secondary">Back to Atlas</Button>
            </Link>
            <Button variant="primary">Share link</Button>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-atlas-border bg-atlas-surface p-5">
          <SectionLabel>Highlight</SectionLabel>
          <p className="mt-2 text-sm text-atlas-muted leading-relaxed">
            “{profile.highlightQuote}”
          </p>
        </div>
      </Card>

      <Card className="p-6 sm:p-7">
        <PageHeader
          eyebrow="Map"
          title="Visited places"
          subtitle="Read-only preview. No likes, no comments—just the world, colored by travel."
        />
        <div className="mt-6">
          <WorldMap />
        </div>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard value={atlasStats.countriesVisited} label="Countries visited" icon="🌍" />
        <StatCard value={atlasStats.totalTrips} label="Trips" icon="✈️" />
        <StatCard value={`${atlasStats.totalPhotos}`} label="Photos" icon="📷" />
        <StatCard value={`${atlasStats.revisitRate}%`} label="Revisit rate" icon="↩︎" />
      </div>

      <Card className="p-6 sm:p-7">
        <div className="flex items-end justify-between gap-4">
          <div>
            <SectionLabel>Featured</SectionLabel>
            <h2 className="mt-2 text-xl font-semibold tracking-tight text-atlas-text">
              Memory highlights
            </h2>
            <p className="mt-2 text-sm text-atlas-muted">
              A small selection—designed to be calm and minimal.
            </p>
          </div>
          <Link href="/memories">
            <Button variant="ghost">Open timeline</Button>
          </Link>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {featured.map((m) => (
            <MemoryCard key={m.id} memory={m} />
          ))}
        </div>
      </Card>
    </div>
  );
}

