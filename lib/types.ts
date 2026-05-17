export type ISO2 = string;

export type CountryStatus = "visited" | "wishlist" | "locked";

export interface Country {
  iso2: ISO2;
  name: string;
  status: CountryStatus;
  accent: string; // hex or css color
  notes?: string;
}

export type MoodTag =
  | "serene"
  | "wild"
  | "nostalgic"
  | "awe"
  | "grounded"
  | "romantic"
  | "electric";

export interface Memory {
  id: string;
  title: string;
  countryIso2: ISO2;
  location: string;
  dateLabel: string;
  mood: MoodTag;
  rating: number; // 1-5
  excerpt: string;
  tags: string[];
  coverImage: string; // public/ image path or remote url
  stats: Array<{ label: string; value: string }>;
  photos: string[];
  revisit: boolean;
  notes?: string;
  liked?: string[];
  disliked?: string[];
  tips?: string[];
  budget?: { amount: number; currency: string };
}

export interface WishlistItem {
  id: string;
  destination: string;
  countryIso2: ISO2;
  priority: "low" | "medium" | "high";
  reason: string;
  bestSeason: string;
  tags: string[];
  image: string;
}

export interface AtlasStats {
  countriesVisited: number;
  totalTrips: number;
  travelStreakDays: number;
  continentCompletion: number; // percent
  favoriteDestination: string;
  totalPhotos: number;
  revisitRate: number; // percent
}

export interface PublicProfile {
  username: string;
  displayName: string;
  bio: string;
  highlightQuote: string;
  avatar: string;
  featuredMemories: string[]; // memory ids
}

