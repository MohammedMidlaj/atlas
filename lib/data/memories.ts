import type { Memory } from "@/lib/types";

export const memories: Memory[] = [
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
      "Stone alleys, warm bread, and a city that feels like an old film you’ve always loved.",
    tags: ["old town", "cafés", "golden hour"],
    coverImage: "/memories/tbilisi.svg",
    stats: [
      { label: "Walked", value: "42km" },
      { label: "Cafés", value: "9" },
      { label: "Mood", value: "Amber" },
    ],
    photos: ["/memories/tbilisi-1.svg", "/memories/tbilisi-2.svg"],
    revisit: true,    notes: "A hidden gem in the Caucasus. Georgian hospitality is legendary—locals are incredibly warm.",
    liked: ["Sulfur baths", "Wine culture", "Friendly locals", "Affordable everything"],
    disliked: ["Chaotic traffic", "Some areas feel sketchy at night"],
    tips: ["Visit Narikala fortress at sunset", "Try traditional Georgian wine", "Get lost in old town at 5pm", "Sulfur baths are a must"],
    budget: { amount: 800, currency: "USD" },  },
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
  {
    id: "dubai-desert",
    title: "Dubai Desert",
    countryIso2: "AE",
    location: "Dubai, UAE",
    dateLabel: "Dec 2024",
    mood: "electric",
    rating: 5,
    excerpt:
      "Sunset dunes, wind in your ears, and the surreal calm of a horizon with no edges.",
    tags: ["desert", "sunset", "sand"],
    coverImage: "/memories/dubai.svg",
    stats: [
      { label: "Dunes", value: "Infinite" },
      { label: "Time", value: "Golden" },
      { label: "Heat", value: "Soft" },
    ],
    photos: ["/memories/dubai-1.svg", "/memories/dubai-2.svg"],
    revisit: true,
    notes: "December is perfect—warm days but cool enough to enjoy. Winter is peak season.",
    liked: ["Sunset views", "Adventure activities", "Camel rides", "Desert camps"],
    disliked: ["Overpriced tours", "Crowded popular spots", "Not authentic desert culture"],
    tips: ["Book desert safari before noon", "Bring sunscreen and hat", "Wear comfortable clothing", "Go for sunrise if you can"],
    budget: { amount: 1500, currency: "USD" },
  },
  {
    id: "meghalaya",
    title: "Meghalaya",
    countryIso2: "IN",
    location: "Meghalaya, India",
    dateLabel: "Apr 2022",
    mood: "wild",
    rating: 4,
    excerpt:
      "Cloud forests, river stones, and a green so deep it felt like a new color.",
    tags: ["waterfalls", "forests", "rain"],
    coverImage: "/memories/meghalaya.svg",
    stats: [
      { label: "Waterfalls", value: "7" },
      { label: "Hikes", value: "3" },
      { label: "Air", value: "Wet" },
    ],
    photos: ["/memories/meghalaya-1.svg", "/memories/meghalaya-2.svg"],
    revisit: false,
    notes: "One of the wettest places on Earth. September to November is best—less rain but still green.",
    liked: ["Living root bridges", "Pristine nature", "Adventure activities", "Authentic tribal culture"],
    disliked: ["Very wet and muddy", "Limited medical facilities", "Remote location"],
    tips: ["Trek to living root bridges in Cherrapunji", "Hire a local guide for safety", "Waterproof your gear", "Visit cave systems"],
    budget: { amount: 700, currency: "USD" },
  },
];

export function getMemoriesByCountry(iso2: string) {
  return memories.filter((m) => m.countryIso2 === iso2);
}

export function getMemoryById(id: string) {
  return memories.find((m) => m.id === id);
}

