export type Category = "commercial" | "residential" | "contractual";
export type City = "mumbai" | "cochin" | "bangalore" | "oman";
export interface Project {
  id: string;
  name: string;
  type: string;
  location: string;
  image: string;
  href?: string;
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
const COMMERCIAL = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80";
const MARINA = "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80";
const HEART = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80";
const ZION = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80";
const COCHIN = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80";
const BLR = "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80";
const OMAN = "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?w=800&q=80";
export const PROJECTS: Record<Category, Partial<Record<City, Project[]>>> = {
  commercial: {
    mumbai: [
      { id: "ev-city-center", name: "EV City Center", type: "Commercial Building", location: "Panvel, Navi Mumbai", image: COMMERCIAL },
      { id: "ev-business-hub", name: "EV Business Hub", type: "Office Spaces", location: "BKC, Mumbai", image: COMMERCIAL },
      { id: "ev-trade-square", name: "EV Trade Square", type: "Retail & Offices", location: "Andheri East, Mumbai", image: COMMERCIAL },
    ],
  },
  residential: {
    mumbai: [
      { id: "ev-marina-bay", name: "EV - 10 Marina Bay", type: "Luxury Apartments", location: "Plot - 10, Sector - 10, Vashi, Navi Mumbai", image: MARINA },
      { id: "ev-heart-city-1", name: "EV Heart City - 1", type: "Luxury Apartments", location: "Mosare, Pushpak Nagar Ext., Navi Mumbai", image: HEART },
      { id: "ev-zion-1", name: "EV Zion I", type: "Apartments", location: "Plot No. 29 Sector - 25, Nerul, Navi Mumbai", image: ZION },
      { id: "ev-zion-2", name: "EV Zion II", type: "Apartments", location: "Plot No. 30 Sector - 25, Nerul, Navi Mumbai", image: ZION },
      { id: "ev-park-view", name: "EV Park View", type: "Apartments", location: "Rajwadi, Navi Mumbai", image: HEART },
      { id: "ev-eden-estate", name: "EV Eden Estate", type: "Residential & Commercial", location: "Plot No. 45, Sector 10, Kamothe", image: MARINA },
    ],
    cochin: [
      { id: "ev-backwater-residences", name: "EV Backwater Residences", type: "Premium Apartments", location: "Marine Drive, Kochi", image: COCHIN },
      { id: "ev-palm-grove", name: "EV Palm Grove", type: "Garden Apartments", location: "Kakkanad, Kochi", image: COCHIN },
      { id: "ev-coral-heights", name: "EV Coral Heights", type: "Sea-view Apartments", location: "Fort Kochi, Cochin", image: COCHIN },
    ],
    bangalore: [
      { id: "ev-tech-park-residences", name: "EV Tech Park Residences", type: "Smart Apartments", location: "Whitefield, Bangalore", image: BLR },
      { id: "ev-green-meadows", name: "EV Green Meadows", type: "Villa Community", location: "Sarjapur Road, Bangalore", image: BLR },
      { id: "ev-skyline", name: "EV Skyline", type: "High-rise Apartments", location: "Hebbal, Bangalore", image: BLR },
    ],
  },
  contractual: {
    oman: [
      { id: "muscat-business-bay", name: "Muscat Business Bay", type: "Mixed-use Development", location: "Muscat, Oman", image: OMAN },
      { id: "salalah-coastal-villas", name: "Salalah Coastal Villas", type: "Luxury Villas", location: "Salalah, Oman", image: OMAN },
      { id: "sohar-industrial-complex", name: "Sohar Industrial Complex", type: "Industrial Project", location: "Sohar, Oman", image: OMAN },
    ],
  },
};
