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
      title: "Main Entrance",
      image: "/gallery/heart-city/entrance.jpg",
    },
    {
      title: "Podium",
      image: "/gallery/heart-city/podium.jpg",
    },
    {
      title: "Kids Play Area",
      image: "/gallery/heart-city/play-area.jpg",
    },
  ],

  "ev-zion-1": [
    {
      title: "Front View",
      image: "/gallery/zion/front.jpg",
    },
    {
      title: "Terrace",
      image: "/gallery/zion/terrace.jpg",
    },
  ],
};