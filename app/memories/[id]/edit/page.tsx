"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { PageHeader } from "@/components/shared/PageHeader";
import { Card, Button, SectionLabel } from "@/components/ui";
import { useMemories } from "@/contexts/MemoriesContext";
import { Memory } from "@/lib/types";

export default function EditMemoryPage() {
  const router = useRouter();
  const params = useParams();
  const { memories, updateMemory } = useMemories();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    location: "",
    date: "",
    tags: [] as string[],
    rating: 0,
  });

  const memoryId = params.id as string;
  const memory = memories.find(m => m.id === memoryId);

  useEffect(() => {
    if (memory) {
      setFormData({
        title: memory.title,
        content: memory.content,
        location: memory.location,
        date: memory.date,
        tags: memory.tags,
        rating: memory.rating,
      });
    }
  }, [memory]);

  if (!memory) {
    return (
      <div className="space-y-6">
        <Card className="p-12 text-center">
          <p className="text-atlas-muted">Memory not found.</p>
          <Link href="/memories">
            <Button className="mt-4">Back to Memories</Button>
          </Link>
        </Card>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedMemory: Memory = {
      ...memory,
      title: formData.title,
      content: formData.content,
      location: formData.location,
      date: formData.date,
      tags: formData.tags,
      rating: formData.rating,
      updatedAt: new Date().toISOString(),
    };

    updateMemory(updatedMemory);
    router.push("/memories");
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && e.currentTarget.value.trim()) {
      e.preventDefault();
      const newTag = e.currentTarget.value.trim();
      if (!formData.tags.includes(newTag)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, newTag]
        }));
      }
      e.currentTarget.value = "";
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 sm:p-8">
        <PageHeader
          eyebrow="Journal"
          title="Edit Memory"
          subtitle="Update your captured moment."
        />
      </Card>

      <Card className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <SectionLabel>Title</SectionLabel>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="mt-2 w-full rounded-lg border border-atlas-border bg-atlas-surface px-4 py-3 text-atlas-foreground placeholder-atlas-muted focus:border-atlas-accent focus:outline-none"
              placeholder="What do you want to remember?"
              required
            />
          </div>

          <div>
            <SectionLabel>Content</SectionLabel>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
              className="mt-2 w-full rounded-lg border border-atlas-border bg-atlas-surface px-4 py-3 text-atlas-foreground placeholder-atlas-muted focus:border-atlas-accent focus:outline-none min-h-[120px] resize-y"
              placeholder="Tell your story..."
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <SectionLabel>Location</SectionLabel>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                className="mt-2 w-full rounded-lg border border-atlas-border bg-atlas-surface px-4 py-3 text-atlas-foreground placeholder-atlas-muted focus:border-atlas-accent focus:outline-none"
                placeholder="Where did this happen?"
              />
            </div>

            <div>
              <SectionLabel>Date</SectionLabel>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="mt-2 w-full rounded-lg border border-atlas-border bg-atlas-surface px-4 py-3 text-atlas-foreground focus:border-atlas-accent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <SectionLabel>Tags</SectionLabel>
            <input
              type="text"
              onKeyDown={handleTagInput}
              className="mt-2 w-full rounded-lg border border-atlas-border bg-atlas-surface px-4 py-3 text-atlas-foreground placeholder-atlas-muted focus:border-atlas-accent focus:outline-none"
              placeholder="Add tags (press Enter to add)"
            />
            {formData.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1 rounded-full bg-atlas-accent/10 px-3 py-1 text-sm text-atlas-accent"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-atlas-accent hover:text-atlas-accent/80"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <SectionLabel>Rating</SectionLabel>
            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                  className={`text-2xl ${
                    star <= formData.rating
                      ? "text-yellow-400"
                      : "text-gray-300"
                  } hover:text-yellow-400 transition-colors`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <Button type="submit">
              Update Memory
            </Button>
            <Link href="/memories">
              <Button variant="secondary">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}