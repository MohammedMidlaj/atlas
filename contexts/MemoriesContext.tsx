"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Memory } from "@/lib/types";

interface MemoriesContextType {
  memories: Memory[];
  addMemory: (memory: Omit<Memory, "id">) => void;
  updateMemory: (id: string, memory: Partial<Memory>) => void;
  deleteMemory: (id: string) => void;
}

const MemoriesContext = createContext<MemoriesContextType | undefined>(undefined);

export function useMemories() {
  const context = useContext(MemoriesContext);
  if (!context) {
    throw new Error("useMemories must be used within a MemoriesProvider");
  }
  return context;
}

export function MemoriesProvider({ children }: { children: ReactNode }) {
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: "spiti-valley",
      title: "Spiti Valley",
      countryIso2: "IN",
      location: "Himachal Pradesh, India",
      dateLabel: "Oct 2024",
      mood: "awe",
      rating: 5,
      excerpt:
        "Grey roads, prayer flags, and the kind of silence that makes you hear your own heartbeat.",
      tags: ["mountains", "stargazing", "slow days"],
      coverImage: "/memories/spiti.svg",
      stats: [
        { label: "Altitude", value: "3,800m" },
        { label: "Nights", value: "6" },
        { label: "Weather", value: "Crisp" },
      ],
      photos: ["/memories/spiti-1.svg", "/memories/spiti-2.svg", "/memories/spiti-3.svg"],
      revisit: true,
      notes: "Best visited during October-November when weather is stable. Roads can be tricky in winter.",
      liked: ["Starry skies", "Monasteries", "Empty roads", "Thin air clarity"],
      disliked: ["Limited food options", "Basic accommodations", "High altitude sickness risk"],
      tips: ["Start acclimatizing in Shimla", "Carry altitude sickness medicine", "Book homestays in advance", "Don't miss Tabo monastery"],
      budget: { amount: 1200, currency: "USD" },
    },
    {
      id: "tbilisi",
      title: "Tbilisi",
      countryIso2: "GE",
      location: "Tbilisi, Georgia",
      dateLabel: "May 2025",
      mood: "nostalgic",
      rating: 4,
      excerpt:
        "Stone alleys, warm bread, and a city that feels like an old film you've always loved.",
      tags: ["old town", "cafés", "golden hour"],
      coverImage: "/memories/tbilisi.svg",
      stats: [
        { label: "Walked", value: "42km" },
        { label: "Cafés", value: "9" },
        { label: "Mood", value: "Amber" },
      ],
      photos: ["/memories/tbilisi-1.svg", "/memories/tbilisi-2.svg"],
      revisit: true,
      notes: "A hidden gem in the Caucasus. Georgian hospitality is legendary—locals are incredibly warm.",
      liked: ["Sulfur baths", "Wine culture", "Friendly locals", "Affordable everything"],
      disliked: ["Chaotic traffic", "Some areas feel sketchy at night"],
      tips: ["Visit Narikala fortress at sunset", "Try traditional Georgian wine", "Get lost in old town at 5pm", "Sulfur baths are a must"],
      budget: { amount: 800, currency: "USD" },
    },
    {
      id: "munnar",
      title: "Munnar",
      countryIso2: "IN",
      location: "Kerala, India",
      dateLabel: "Jul 2023",
      mood: "serene",
      rating: 4,
      excerpt:
        "Tea gardens in mist, slow conversations, and rain that softened everything into green.",
      tags: ["tea", "mist", "monsoon"],
      coverImage: "/memories/munnar.svg",
      stats: [
        { label: "Drives", value: "4" },
        { label: "Rain", value: "Daily" },
        { label: "Tea", value: "Endless" },
      ],
      photos: ["/memories/munnar-1.svg", "/memories/munnar-2.svg"],
      revisit: true,
      notes: "Go during monsoon for authentic experience. The mist and rain make it feel magical.",
      liked: ["Tea plantations", "Misty mornings", "Peaceful vibe", "Hill station charm"],
      disliked: ["Very touristy", "Roads can be slippery"],
      tips: ["Tour a tea factory", "Stay near Anamudi Peak", "Wear layers—weather changes fast", "Hire a local guide"],
      budget: { amount: 600, currency: "USD" },
    },
  ]);

  const addMemory = (memoryData: Omit<Memory, "id">) => {
    const newMemory: Memory = {
      ...memoryData,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    setMemories(prev => [newMemory, ...prev]);
  };

  const updateMemory = (id: string, updates: Partial<Memory>) => {
    setMemories(prev =>
      prev.map(memory =>
        memory.id === id ? { ...memory, ...updates } : memory
      )
    );
  };

  const deleteMemory = (id: string) => {
    setMemories(prev => prev.filter(memory => memory.id !== id));
  };

  return (
    <MemoriesContext.Provider value={{ memories, addMemory, updateMemory, deleteMemory }}>
      {children}
    </MemoriesContext.Provider>
  );
}