import type { Country } from "@/lib/types";

export const countries: Country[] = [
  {
    iso2: "IN",
    name: "India",
    status: "visited",
    accent: "#7c5cff",
    notes: "Mountains, monsoons, and quiet evenings with chai.",
  },
  {
    iso2: "AE",
    name: "United Arab Emirates",
    status: "visited",
    accent: "#00d4ff",
    notes: "Desert light, late-night roads, and mirage horizons.",
  },
  {
    iso2: "GE",
    name: "Georgia",
    status: "visited",
    accent: "#f5d06f",
    notes: "Old streets and amber wine—soft, cinematic memories.",
  },
  {
    iso2: "JP",
    name: "Japan",
    status: "wishlist",
    accent: "#ff5c7a",
    notes: "Neon rain, quiet temples, and train-window poetry.",
  },
  {
    iso2: "IS",
    name: "Iceland",
    status: "wishlist",
    accent: "#3ee7a3",
    notes: "Black sand, wind, and a sky that feels alive.",
  },
  {
    iso2: "PE",
    name: "Peru",
    status: "wishlist",
    accent: "#7bd3ff",
    notes: "High altitude silence and ancient stone trails.",
  },
];

export function getCountryByIso2(iso2: string) {
  return countries.find((c) => c.iso2 === iso2);
}

