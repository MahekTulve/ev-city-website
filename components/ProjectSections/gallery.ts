export interface GalleryItem {
  title: string;
  image: string;
}

export const PROJECT_GALLERY: Record<string, GalleryItem[]> = {
  "ev-marina-bay": [
    {
      title: "Aerial View",
      image: "/images/ev-marina-bay.jpg",
    },
    {
      title: "Entry 1st",
      image: "/images/marina-1.jpg",
    },
    {
      title: "Entry 2nd",
      image: "/images/marina-2.jpg",
    },
    {
      title: "Entry 2nd Day View",
      image: "/images/marina-3.jpg",
    },
    {
      title: "Bird Eye View",
      image: "https://evhomes.tech/images/marina1.png",
    },
    {
      title: "Tower Side View",
      image: "/images/marina-4.jpg",
    },
  ],

  "ev-heart-city-1": [
    {
      title: "Aerial View",
      image: "https://www.evgroup.in/images/projects/mumbai/heart-city-1/heart-city-1-aerial.jpg",
    },
    {
      title: "Building No - 01",
      image: "https://www.evgroup.in/images/projects/mumbai/heart-city-1/heart-city-1-building-1.jpg",
    },
    {
      title: "Building No - 02",
      image: "https://www.evgroup.in/images/projects/mumbai/heart-city-1/heart-city-1-building-2.jpg",
    },
    {
      title: "Building No - 03",
      image: "https://www.evgroup.in/images/projects/mumbai/heart-city-1/heart-city-1-building-3.jpg",
    },
  ],

  "ev-zion-1": [],
};