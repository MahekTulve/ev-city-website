export type ProjectStatus =
  | "new-launch"
  | "few-available"
  | "ready-to-occupy"
  | "nearing-completion"
  | "completed"
  | "sold-out";

export type Category = "commercial" | "residential" | "contractual";
export type City =
  | "mumbai"
  | "cochin"
  | "bangalore"
  | "oman";

export interface Project {
  id: string;
  name: string;
  type: string; // "Luxury Apartments", "Commercial Building", etc.
  location: string;
  image: string; // path under /images
  // status: ProjectStatus;
  href?: string;
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  "new-launch": "NEW LAUNCH",
  "few-available": "FEW FLATS AVAILABLE",
  "ready-to-occupy": "READY TO OCCUPY",
  "nearing-completion": "NEARING COMPLETION",
  completed: "COMPLETED",
  "sold-out": "SOLD OUT",
};

export const STATUS_COLOR: Record<ProjectStatus, string> = {
  "new-launch": "bg-emerald-600",
  "few-available": "bg-orange-600",
  "ready-to-occupy": "bg-sky-600",
  "nearing-completion": "bg-amber-600",
  completed: "bg-slate-600",
  "sold-out": "bg-red-700",
};

export const CATEGORIES: { id: Category; label: string; cities: City[] }[] = [
  { id: "commercial", label: "COMMERCIAL", cities: ["mumbai"] },
  {
    id: "residential",
    label: "RESIDENTIAL",
    cities: ["mumbai", "cochin", "bangalore"],
  },
  { id: "contractual", label: "CONTRACTUAL", cities: ["oman"] },
];

export const CITY_LABEL: Record<City, string> = {
  mumbai: "MUMBAI",
  cochin: "COCHIN",
  bangalore: "BANGALORE",
  oman: "OMAN",
};

// ------------------------------------------------------------------
// Project data — keyed by category > city
// ------------------------------------------------------------------
export const PROJECTS: Record<Category, Partial<Record<City, Project[]>>> = {
  commercial: {
    mumbai: [
      {
        id: "ev-city-center",
        name: "EV City Center",
        type: "Commercial Building",
        location: "Panvel, Navi Mumbai",
        image: "/images/commercial-tower.jpg",
        // status: "nearing-completion",
      },
      {
        id: "ev-business-hub",
        name: "EV Business Hub",
        type: "Office Spaces",
        location: "BKC, Mumbai",
        image: "/images/commercial-tower.jpg",
        // status: "new-launch",
      },
      {
        id: "ev-trade-square",
        name: "EV Trade Square",
        type: "Retail & Offices",
        location: "Andheri East, Mumbai",
        image: "/images/commercial-tower.jpg",
        // status: "few-available",
      },
    ],
  },

  residential: {
    mumbai: [
      {
        id: "ev-marina-bay",
        name: "EV - 10 Marina Bay",
        type: "Luxury Apartments",
        location: "Plot - 10, Sector - 10, Vashi, Navi Mumbai",
        image: "/images/marina-bay.jpg",
        // status: "new-launch",
      },
      {
        id: "ev-heart-city-1",
        name: "EV Heart City - 1",
        type: "Luxury Apartments",
        location: "Mosare, Pushpak Nagar Ext., Navi Mumbai",
        image: "/images/heart-city.jpg",
        // status: "new-launch",
      },
      {
        id: "ev-zion-1",
        name: "EV Zion I",
        type: "Apartments",
        location: "Plot No. 29 Sector - 25, Nerul, Navi Mumbai",
        image: "/images/zion.jpg",
        // status: "few-available",
      },
      {
        id: "ev-zion-2",
        name: "EV Zion II",
        type: "Apartments",
        location: "Plot No. 30 Sector - 25, Nerul, Navi Mumbai",
        image: "/images/zion.jpg",
        // status: "few-available",
      },
      {
        id: "ev-park-view",
        name: "EV Park View",
        type: "Apartments",
        location: "Rajwadi, Navi Mumbai",
        image: "/images/heart-city.jpg",
        // status: "ready-to-occupy",
      },
      {
        id: "ev-eden-estate",
        name: "EV Eden Estate",
        type: "Residential & Commercial",
        location: "Plot No. 45, Sector 10, Kamothe",
        image: "/images/marina-bay.jpg",
        // status: "completed",
      },
    ],
    cochin: [
      {
        id: "ev-backwater-residences",
        name: "EV Backwater Residences",
        type: "Premium Apartments",
        location: "Marine Drive, Kochi",
        image: "/images/cochin-residence.jpg",
        // status: "new-launch",
      },
      {
        id: "ev-palm-grove",
        name: "EV Palm Grove",
        type: "Garden Apartments",
        location: "Kakkanad, Kochi",
        image: "/images/cochin-residence.jpg",
        // status: "few-available",
      },
      {
        id: "ev-coral-heights",
        name: "EV Coral Heights",
        type: "Sea-view Apartments",
        location: "Fort Kochi, Cochin",
        image: "/images/cochin-residence.jpg",
        // status: "ready-to-occupy",
      },
    ],
    bangalore: [
      {
        id: "ev-tech-park-residences",
        name: "EV Tech Park Residences",
        type: "Smart Apartments",
        location: "Whitefield, Bangalore",
        image: "/images/bangalore-heights.jpg",
        // status: "new-launch",
      },
      {
        id: "ev-green-meadows",
        name: "EV Green Meadows",
        type: "Villa Community",
        location: "Sarjapur Road, Bangalore",
        image: "/images/bangalore-heights.jpg",
        // status: "few-available",
      },
      {
        id: "ev-skyline",
        name: "EV Skyline",
        type: "High-rise Apartments",
        location: "Hebbal, Bangalore",
        image: "/images/bangalore-heights.jpg",
        // status: "completed",
      },
    ],
  },

  contractual: {
    oman: [
      {
        id: "muscat-business-bay",
        name: "Muscat Business Bay",
        type: "Mixed-use Development",
        location: "Muscat, Oman",
        image: "/images/oman-project.jpg",
        // status: "nearing-completion",
      },
      {
        id: "salalah-coastal-villas",
        name: "Salalah Coastal Villas",
        type: "Luxury Villas",
        location: "Salalah, Oman",
        image: "/images/oman-project.jpg",
        // status: "new-launch",
      },
      {
        id: "sohar-industrial-complex",
        name: "Sohar Industrial Complex",
        type: "Industrial Project",
        location: "Sohar, Oman",
        image: "/images/oman-project.jpg",
        // status: "completed",
      },
    ],
  },
};
