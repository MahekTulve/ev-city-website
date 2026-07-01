export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  image: string;
  floatingImages: string[];
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Hospital",
    description:
      "Access leading hospitals and healthcare facilities within minutes.",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",

    floatingImages: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
    ],
  },

  {
    number: "02",
    title: "Education",
    description:
      "Top schools, colleges, and learning institutions are just around the corner.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",

    floatingImages: [
      "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800",
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    ],
  },

  {
    number: "03",
    title: "Parks & Recreation",
    description:
      "Relax, exercise with beautifully maintained parks and green spaces only minutes away.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",

    floatingImages: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800",
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
      "https://images.unsplash.com/photo-1511497584788-876760111969?w=800",
    ],
  },

  {
    number: "04",
    title: "Shopping & Lifestyle",
    description:
      "From supermarkets and cafés to shopping destinations and daily conveniences nearby.",
    image:
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200",

    floatingImages: [
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800",
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800",
    ],
  },
];