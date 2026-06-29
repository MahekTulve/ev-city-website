export type ProcessStep = {
  number: string;
  title: string;
  description: string;
  image: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Hospital",
    description:
      "Access leading hospitals and healthcare facilities within minutes.",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "02",
    title: "Education",
    description:
      "Top schools, colleges, and learning institutions are just around the corner.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
  },
  {
    number: "03",
    title: "Parks & Recreation",
    description:
      "Relax, exercise with beautifully maintained parks and green spaces only minutes away.",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&q=80&auto=format&fit=crop",
  },
  {
    number: "04",
    title: "Shopping & Lifestyle",
    description:
      "From supermarkets and cafés to shopping destinations and daily conveniences nearby.",
    image:
      "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80&auto=format&fit=crop",
  },
];