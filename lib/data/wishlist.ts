import type { WishlistItem } from "@/lib/types";

export const wishlist: WishlistItem[] = [
  {
    id: "tokyo-kyoto",
    destination: "Tokyo → Kyoto",
    countryIso2: "JP",
    priority: "high",
    reason:
      "For the contrast—neon nights and quiet mornings, trains like metronomes, and the feeling of living inside a soundtrack.",
    bestSeason: "Late March — April (spring)",
    tags: ["city", "temples", "food", "trains"],
    image: "/wishlist/japan.svg",
  },
  {
    id: "iceland-ring-road",
    destination: "Ring Road",
    countryIso2: "IS",
    priority: "high",
    reason:
      "To watch weather move across open land, collect waterfalls, and find stillness under a sky that never repeats.",
    bestSeason: "Sep — Oct (aurora shoulder season)",
    tags: ["roadtrip", "waterfalls", "aurora", "black sand"],
    image: "/wishlist/iceland.svg",
  },
  {
    id: "peru-sacred-valley",
    destination: "Sacred Valley",
    countryIso2: "PE",
    priority: "medium",
    reason:
      "For altitude quiet and ancient stone—paths that feel like they remember every footstep.",
    bestSeason: "May — Aug (dry season)",
    tags: ["history", "hiking", "altitude"],
    image: "/wishlist/peru.svg",
  },
];

