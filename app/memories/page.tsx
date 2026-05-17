"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MemoryCard } from "@/components/memories/MemoryCard";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, SectionLabel, Button } from "@/components/ui";
import { useMemories } from "@/contexts/MemoriesContext";

export default function MemoriesPage() {
  const { memories, deleteMemory } = useMemories();
  const router = useRouter();

  const handleEdit = (memory: any) => {
    router.push(`/memories/${memory.id}/edit`);
  };

  const handleDelete = (memoryId: string) => {
    deleteMemory(memoryId);
  };
  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <PageHeader
          eyebrow="Journal"
          title="Memories"
          subtitle="A calm timeline of places you’ve carried with you—built for re-reading, not scrolling."
        />
        <div className="mt-6 flex justify-between items-center">
          <div className="rounded-2xl border border-atlas-border bg-atlas-surface p-5">
            <SectionLabel>Your memories</SectionLabel>
            <p className="mt-2 text-sm text-atlas-muted">
              {memories.length} {memories.length === 1 ? 'memory' : 'memories'} in your collection.
            </p>
          </div>
          <Link href="/memories/new">
            <Button>Add New Memory</Button>
          </Link>
        </div>
      </Card>

      {memories.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-atlas-muted mb-4">No memories yet.</p>
          <Link href="/memories/new">
            <Button>Create your first memory</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {memories.map((m) => (
            <MemoryCard
              key={m.id}
              memory={m}
              showActions
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

