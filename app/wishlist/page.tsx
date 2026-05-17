import Image from "next/image";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, SectionLabel, Tag } from "@/components/ui";
import { wishlist } from "@/lib/data";

function priorityColor(p: string) {
  if (p === "high") return "#ff5c7a";
  if (p === "medium") return "#f5d06f";
  return "#3ee7a3";
}

export default function WishlistPage() {
  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <PageHeader
          eyebrow="Dreaming"
          title="Wishlist"
          subtitle="Not a bucket list—more like a soft constellation of places you’d like to meet when the time feels right."
        />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {wishlist.map((w) => (
          <Card key={w.id} hoverable className="overflow-hidden">
            <div className="relative aspect-[16/10]">
              <div className="absolute inset-0 bg-gradient-to-br from-atlas-accent/18 via-atlas-accent2/10 to-black" />
              <Image
                src={w.image}
                alt={w.destination}
                fill
                className="object-cover opacity-75"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute left-4 bottom-4 right-4">
                <p className="text-sm font-semibold text-white">
                  {w.destination}
                </p>
                <p className="mt-1 text-xs text-white/70">
                  Best season: {w.bestSeason}
                </p>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <SectionLabel>Why</SectionLabel>
                </div>
                <Tag label={w.priority} color={priorityColor(w.priority)} size="xs" />
              </div>
              <p className="mt-2 text-sm text-atlas-muted leading-relaxed">
                {w.reason}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {w.tags.map((t) => (
                  <Tag key={t} label={t} size="xs" />
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

