import Link from "next/link";
import { memories, getMemoryById } from "@/lib/data/memories";
import { countries } from "@/lib/data";
import { MemoryDetail } from "@/components/memories/MemoryDetail";
import { Card } from "@/components/ui";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return memories.map((m) => ({ id: m.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const memory = getMemoryById(params.id);
  return {
    title: memory?.title ?? "Memory",
    description: memory?.excerpt ?? "",
  };
}

export default function MemoryDetailPage({ params }: { params: { id: string } }) {
  const memory = getMemoryById(params.id);
  const country = countries.find((c) => c.iso2 === memory?.countryIso2);

  if (!memory) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link href="/memories" className="inline-flex text-sm text-atlas-accent hover:text-atlas-accent/80 transition">
        ← Back to memories
      </Link>

      <MemoryDetail memory={memory} country={country} />
    </div>
  );
}
