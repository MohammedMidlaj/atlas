"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Memory } from "@/lib/types";
import { Card, Stars, Tag, Button } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

function moodColor(mood: Memory["mood"]) {
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

export function MemoryCard({
  memory,
  className,
  showActions = false,
  onEdit,
  onDelete
}: {
  memory: Memory;
  className?: string;
  showActions?: boolean;
  onEdit?: (memory: Memory) => void;
  onDelete?: (memoryId: string) => void;
}) {
  const handleEdit = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit?.(memory);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (confirm("Are you sure you want to delete this memory?")) {
      onDelete?.(memory.id);
    }
  };

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}>
      <Card hoverable className={cn("group relative", className)}>
        {showActions && (
          <div className="absolute top-3 right-3 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleEdit}
              className="bg-white/90 hover:bg-white text-gray-700"
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleDelete}
              className="bg-white/90 hover:bg-white text-red-600 hover:text-red-700"
            >
              Delete
            </Button>
          </div>
        )}

        <Link href={`/memories/${memory.id}`}>
          <div className="relative aspect-[16/10] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-atlas-accent/22 via-atlas-accent2/10 to-black" />
            <Image
              src={memory.coverImage}
              alt={memory.title}
              fill
              className="object-cover opacity-70 group-hover:opacity-85 transition duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute left-4 bottom-4 right-4 flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-white truncate">
                  {memory.title}
                </p>
                <p className="text-xs text-white/70 truncate">
                  {memory.location} · {memory.dateLabel}
                </p>
              </div>
              <Tag label={memory.mood} color={moodColor(memory.mood)} size="xs" />
            </div>
          </div>

          <div className="p-4">
            <p className="text-sm text-atlas-muted leading-relaxed">
              {memory.excerpt}
            </p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5">
                {memory.tags.slice(0, 3).map((t) => (
                  <Tag key={t} label={t} size="xs" />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Stars rating={memory.rating} />
              </div>
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  );
}

