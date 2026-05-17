"use client";

import { Card, Stars } from "@/components/ui";
import type { Memory, Country } from "@/lib/types";

interface MemoryDetailProps {
  memory: Memory;
  country?: Country;
}

export function MemoryDetail({ memory, country }: MemoryDetailProps) {
  return (
    <div className="space-y-6">
      {/* Hero section */}
      <Card className="overflow-hidden">
        <div className="relative h-96 sm:h-[500px] w-full bg-atlas-surface">
          <img
            src={memory.coverImage}
            alt={memory.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-atlas-bg via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-2">
              {memory.title}
            </h1>
            <p className="text-atlas-text text-lg">
              {memory.location} • {memory.dateLabel}
            </p>
          </div>
        </div>
      </Card>

      {/* Meta and rating */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="p-6">
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-atlas-subtle mb-2">Rating</p>
              <div className="flex items-center gap-3">
                <Stars rating={memory.rating} />
                <span className="text-xl font-semibold text-atlas-text">{memory.rating}/5</span>
              </div>
            </div>
            {memory.budget && (
              <div>
                <p className="text-xs uppercase tracking-widest text-atlas-subtle mb-2">Average Budget</p>
                <p className="text-2xl font-semibold text-atlas-accent">
                  {memory.budget.currency} {memory.budget.amount.toLocaleString()}
                </p>
              </div>
            )}
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-atlas-subtle mb-4">Stats</p>
            {memory.stats.map((stat) => (
              <div key={stat.label} className="flex justify-between">
                <span className="text-atlas-muted">{stat.label}</span>
                <span className="font-semibold text-atlas-text">{stat.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Excerpt and tags */}
      <Card className="p-6">
        <p className="text-lg leading-relaxed text-atlas-text mb-4">{memory.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {memory.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full bg-atlas-surface text-sm text-atlas-muted border border-atlas-border">
              {tag}
            </span>
          ))}
        </div>
      </Card>

      {/* Notes */}
      {memory.notes && (
        <Card className="p-6">
          <p className="text-xs uppercase tracking-widest text-atlas-subtle mb-3">Notes</p>
          <p className="text-atlas-text leading-relaxed">{memory.notes}</p>
        </Card>
      )}

      {/* Liked section */}
      {memory.liked && memory.liked.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">👍</span>
            <p className="text-xs uppercase tracking-widest text-atlas-subtle">Things I Liked</p>
          </div>
          <ul className="space-y-2">
            {memory.liked.map((item) => (
              <li key={item} className="flex items-start gap-3 text-atlas-text">
                <span className="text-atlas-accent mt-1.5 flex-shrink-0">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Disliked section */}
      {memory.disliked && memory.disliked.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">👎</span>
            <p className="text-xs uppercase tracking-widest text-atlas-subtle">Things I Disliked</p>
          </div>
          <ul className="space-y-2">
            {memory.disliked.map((item) => (
              <li key={item} className="flex items-start gap-3 text-atlas-text">
                <span className="text-atlas-danger mt-1.5 flex-shrink-0">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Tips section */}
      {memory.tips && memory.tips.length > 0 && (
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-2xl">💡</span>
            <p className="text-xs uppercase tracking-widest text-atlas-subtle">Things to Remember / Tips</p>
          </div>
          <ul className="space-y-2">
            {memory.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-3 text-atlas-text">
                <span className="text-atlas-accent2 mt-1.5 flex-shrink-0">→</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}

      {/* Photo gallery */}
      {memory.photos.length > 0 && (
        <Card className="p-6">
          <p className="text-xs uppercase tracking-widest text-atlas-subtle mb-4">Photo Gallery</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {memory.photos.map((photo) => (
              <div
                key={photo}
                className="rounded-lg overflow-hidden bg-atlas-surface border border-atlas-border aspect-square hover:border-atlas-accent transition"
              >
                <img
                  src={photo}
                  alt="Memory photo"
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
