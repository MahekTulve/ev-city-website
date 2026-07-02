import { PROJECT_AMENITIES } from "./amenities";
import { PROJECT_GALLERY } from "./gallery";
import { PROJECT_VIDEOS } from "./videos";

export type Category = "commercial" | "residential" | "contractual";
export type City = "mumbai" | "cochin" | "bangalore" | "oman";
export interface Project {
  id: string;
  name: string;
  type: string;
  location: string;
  image: string;
  category: Category;
  city: City;
}
export const CATEGORIES: { id: Category; label: string; cities: City[] }[] = [
  { id: "commercial", label: "COMMERCIAL", cities: ["mumbai"] },
  { id: "residential", label: "RESIDENTIAL", cities: ["mumbai", "cochin", "bangalore"] },
  { id: "contractual", label: "CONTRACTUAL", cities: ["oman"] },
];
export const CITY_LABEL: Record<City, string> = {
  mumbai: "MUMBAI",
  cochin: "COCHIN",
  bangalore: "BANGALORE",
  oman: "OMAN",
};
type Raw = Omit<Project, "category" | "city">;
const raw: Record<Category, Partial<Record<City, Raw[]>>> = {
  commercial: {
    mumbai: [
      { id: "ev-city-center", name: "EV City Center", type: "Commercial Building", location: "Panvel, Navi Mumbai", image: "/images/ev-city-center.jpg" },
      { id: "ev-emerald-heights-c", name: "EV Emerald Heights", type: "Residential & Commercial", location: "Kalamboli, Mumbai", image: "/images/ev-emrald-heights.jpg" },
      { id: "ev-eden-estate-c", name: "EV Eden Estate", type: "Residential & Commercial", location: "Plot No.45, Sector 10, Kamothe", image: "/images/ev-eden-estate.jpg" },
      { id: "ev-orion-c", name: "EV Orion", type: "Residential & Commercial", location: "Navi Mumbai", image: "/images/ev-orion.jpg" },
      { id: "ev-tj-complex", name: "EV T.J Complex", type: "Commercial", location: "Plot No.83, Sector 15, Koparkhairane", image: "/images/ev-tj-complex.jpg" },
    ],
  },
  residential: {
    mumbai: [
      { id: "ev-marina-bay", name: "EV - 10 Marina Bay", type: "Luxury Apartments", location: "Plot - 10, Sector - 10, Vashi, Navi Mumbai", image: "https://evhomes.tech/images/marina1.png" },
      { id: "ev-heart-city-1", name: "EV Heart City - 1", type: "Luxury Apartments", location: "Mosare, Pushpak Nagar Ext., Navi Mumbai", image: "/images/ev-heart-city-1.jpg" },
      { id: "ev-zion-1", name: "EV Zion I", type: "Apartments", location: "Plot No. 29 Sector - 25, Nerul, Navi Mumbai", image: "/images/ev-zion-1.jpg" },
      { id: "ev-zion-2", name: "EV Zion II", type: "Apartments", location: "Plot No. 30 Sector - 25, Nerul, Navi Mumbai", image: "/images/ev-zion-2.jpg" },
      { id: "ev-solitaire", name: "EV Solitaire", type: "Apartments", location: "Plot No. 118 Sector - 9, Ulwe, Navi Mumbai", image: "/images/ev-soltair.jpg" },
      { id: "ev-crest", name: "EV Crest", type: "Apartments", location: "Plot No. 22 Sector - 175, Bamandongri, Ulwe", image: "/images/ev-crest.jpg" },
      { id: "ev-castle", name: "EV Castle", type: "Apartments", location: "Plot No. 110 Sector - 9, Ulwe, Navi Mumbai", image: "/images/ev-castle.jpg" },
      { id: "ev-park-view", name: "EV Park View", type: "Apartments", location: "Rajwadi, Navi Mumbai", image: "/images/ev-park-view.jpg" },
      { id: "ev-sapphire", name: "EV Sapphire", type: "Apartments", location: "Kalamboli, Mumbai", image: "/images/ev-sapphire.jpg" },
      { id: "ev-eden-estate", name: "EV Eden Estate", type: "Residential & Commercial", location: "Plot No.45, Sector 10, Kamothe", image: "/images/ev-eden-estate.jpg" },
      { id: "ev-emerald-heights", name: "EV Emerald Heights", type: "Residential & Commercial", location: "Kalamboli, Mumbai", image: "/images/ev-emrald-heights.jpg" },
      { id: "ev-crystal", name: "EV Crystal", type: "Residential", location: "Plot No.42 Sector-8, Koperkhairane", image: "/images/ev-crystal.jpg" },
      { id: "ev-orion", name: "EV Orion", type: "Residential & Commercial", location: "Navi Mumbai", image: "/images/ev-orion.jpg" },
      { id: "ev-eden-palace", name: "EV Eden Palace", type: "Residential", location: "Plot No. 83, Sector-15 Koparkhairane", image: "/images/ev-eden-palace.jpg" },
      { id: "ev-carmel", name: "EV Carmel", type: "Residential", location: "Navi Mumbai", image: "/images/ev-carmel.jpg" },
      { id: "ev-regency", name: "EV Regency", type: "Residential", location: "Navi Mumbai", image: "/images/ev-regency.jpg" },
      { id: "ev-paradise", name: "EV Paradise", type: "Residential", location: "Plot No. 286,287, Sector-21, Nerul", image: "/images/ev-paradise.jpg" },
      { id: "ev-eden-garden", name: "EV Eden Garden", type: "Residential", location: "Rajwadi, Plot No. 286,287, Sector-21, Nerul", image: "/images/ev-eden-garden.jpg" },
      { id: "ev-panchali", name: "EV Panchali", type: "Residential", location: "Plot No. 29, Sector 42, Nerul", image: "/images/ev-panchali.jpg" },
      { id: "ev-residency", name: "EV Residency", type: "Residential", location: "Plot No. 15, Sector 42, Nerul", image: "/images/ev-residency.jpg" },
      { id: "ev-millenium-park-phase-1", name: "EV Millenium Park Phase-I", type: "Residential", location: "Plot No. 15, Sector 42, Nerul", image: "/images/ev-millenium.jpg" },
      { id: "ev-millenium-park-phase-2", name: "EV Millenium Park Phase-II", type: "Residential", location: "Plot No. 17,22,23, Sector-25", image: "/images/ev-millenium-2.jpg" },
      { id: "ev-eden-park", name: "EV Eden Park", type: "Residential", location: "Plot No. 47, Sector-9, New Panvel(W)", image: "/images/ev-eden-park.jpg" },
    ],
    cochin: [
      { id: "ev-sinai", name: "EV Sinai", type: "Apartments", location: "Kakkanad, Ernakulam", image: "/images/ev-sinai.jpg" },
      { id: "ev-kingston-towers", name: "EV Kingston Towers", type: "Apartments", location: "Aluva, Cochin", image: "/images/ev-kingston.jpg" },
      { id: "ev-city-palace", name: "EV City Palace", type: "Apartments", location: "Kaloor, Cochin", image: "/images/ev-city-palace.jpg" },
    ],
    bangalore: [
      { id: "ev-richmont-valley", name: "EV Richmont Valley", type: "Luxury Apartments", location: "Bangalore", image: "/images/ev-richmond.jpg" },
    ],
  },
  contractual: {
    oman: [
      { id: "al-madina-qaboos", name: "AL Madina Qaboos", type: "AL Zaman", location: "MSQ, Muscat", image: "/images/madinath-1-th.jpg" },
      { id: "al-bahar-burj", name: "Al Bahar Burj", type: "AL Zaman", location: "Plot No. 226 M/s Zaman Investments, Oman", image: "/images/al-bahar-burj.jpg" },
      { id: "zaman-house", name: "Zaman House", type: "Yaqoub & AL Zaman", location: "Plot No. 301, AI Wadi AI Kabir", image: "/images/zaman-house.jpg" },
    ],
  },
};
export const PROJECTS: Record<Category, Partial<Record<City, Project[]>>> = Object.fromEntries(
  Object.entries(raw).map(([cat, byCity]) => [
    cat,
    Object.fromEntries(
      Object.entries(byCity as Record<string, Raw[]>).map(([city, list]) => [
        city,
        list.map((p) => ({ ...p, category: cat as Category, city: city as City })),
      ]),
    ),
  ]),
) as Record<Category, Partial<Record<City, Project[]>>>;
export const ALL_PROJECTS: Project[] = Object.values(PROJECTS).flatMap((byCity) =>
  Object.values(byCity ?? {}).flatMap((list) => list ?? []),
);
export interface ProjectDetail extends Project {
  tagline: string;
  status: "Ongoing" | "Completed" | "Upcoming";
  description: string;
  possession?: string;
  configuration?: string;
  floorPlans: { label: string; image: string }[];
  amenities?: {
  title: string;
  image: string;
}[];
  specifications: string[];
 gallery: {
  title: string;
  image: string;
}[];
  videos: { title: string; url: string; thumbnail?: string }[];
  mapEmbed: string;
  brochureUrl?: string;
}
const DEFAULT_SPECS = [
  "Earthquake Resistant RCC Framed Structure",
  "Aluminium Sliding Windows with Mosquito Net",
  "Vitrified Flooring in Living, Dining & Bedrooms",
  "Anti-skid Ceramic Tiles in Bathrooms & Balcony",
  "Designer Bathroom Fittings — Jaquar / Equivalent",
  "Concealed Copper Wiring with Modular Switches",
  "Video Door Phone & Intercom Facility",
  "Premium Modular Kitchen with Granite Platform",
  "High Speed Automatic Elevators",
  "Standby Power Backup for Common Areas",
];
const DEFAULT_MAP =
  "https://www.google.com/maps?q=Navi+Mumbai,+Maharashtra&output=embed";
const CITY_MAP: Record<City, string> = {
  mumbai: "https://www.google.com/maps?q=Navi+Mumbai,+Maharashtra&output=embed",
  cochin: "https://www.google.com/maps?q=Kochi,+Kerala&output=embed",
  bangalore: "https://www.google.com/maps?q=Bangalore,+Karnataka&output=embed",
  oman: "https://www.google.com/maps?q=Muscat,+Oman&output=embed",
};
const OVERRIDES: Partial<Record<string, Partial<ProjectDetail>>> = {
  "ev-marina-bay": {
    tagline: "Waterfront Luxury Redefined",
    status: "Ongoing",
    possession: "December 2026",
    configuration: "2 & 3 BHK Sea-View Apartments",
    description:
      "Perched at Plot 10, Sector 10 of Vashi, EV - 10 Marina Bay presents a landmark of luxury with panoramic sea views, refined interiors and world-class amenities designed for the modern connoisseur.",
    specifications: [
      "Wall Cladding in Duplex Construction",
      "Aluminium Speed Windows and Fittings",
      "All High Speed Elevators",
      "Jacuzzi Pool with Pool Deck",
      "Elite Luxury Marina Bay Kitchens",
      "Skyzone Theatre",
      "Sea Facing Infinity Sky-Pool on the 20th Floor",
      "Sea Facing Sky-Jogging Track on the 20th Floor",
      "Marina Board Lounge",
      "Automation Zone",
      "Sky Lounge on the 20th Floor with Sea View",
      "Wardrobe & Wet Warehousing",
      "Aromatic Herbal Park",
      "Skyzone Zone",
    ],
  },
};
export function getProjectDetail(id: string): ProjectDetail | null {
  const base = ALL_PROJECTS.find((p) => p.id === id);
  if (!base) return null;
  const ov = OVERRIDES[id] ?? {};
  return {
    ...base,
    tagline: ov.tagline ?? `${base.type} in ${base.location.split(",")[0]}`,
    status: ov.status ?? "Ongoing",
    description:
      ov.description ??
      `${base.name} is a signature ${base.type.toLowerCase()} project by EV Group located at ${base.location}. Thoughtfully designed spaces, contemporary architecture and premium amenities make it a landmark address.`,
    possession: ov.possession,
    configuration: ov.configuration,
    floorPlans:
      ov.floorPlans ??
      [
        { label: "2BHK Unit 1", image: base.image },
        { label: "2BHK Unit 2", image: base.image },
        { label: "3BHK Unit 1", image: base.image },
        { label: "3BHK Unit 2", image: base.image },
        { label: "Typical Floor", image: base.image },
        { label: "Podium Level Plan", image: base.image },
      ],
    amenities: PROJECT_AMENITIES[id] ?? [],
    specifications: ov.specifications ?? DEFAULT_SPECS,
   gallery:
  PROJECT_GALLERY[id] ??
  [
    {
      title: "Project View",
      image: base.image,
    },
  ],
   videos:
  PROJECT_VIDEOS[id]?.map((video) => ({
    title: video.title,
    url: `https://www.youtube.com/embed/${video.youtubeId}`,
    thumbnail: `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`,
  })) ?? [],
    mapEmbed: ov.mapEmbed ?? CITY_MAP[base.city] ?? DEFAULT_MAP,
    brochureUrl: ov.brochureUrl,
  };
}