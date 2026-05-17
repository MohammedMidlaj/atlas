import { WorldMap } from "@/components/map/WorldMap";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, SectionLabel } from "@/components/ui";

export default function MapPage() {
  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <PageHeader
          eyebrow="Interactive map"
          title="The world, gently unlocked"
          subtitle="Everything starts muted. Visited places bloom into color. Wishlist places glow—quietly asking to be remembered someday."
        />
        <div className="mt-6 rounded-2xl border border-atlas-border bg-atlas-surface p-5">
          <SectionLabel>Tip</SectionLabel>
          <p className="mt-2 text-sm text-atlas-muted">
            Tap a pin to open a country panel with highlights, notes, mood, and a revisit toggle.
          </p>
        </div>
      </Card>

      <WorldMap />
    </div>
  );
}

