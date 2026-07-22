import PerspectiveScrollShowcase from "@/components/scroll-showcase/scroll-showcase";
import ScrollCarousel from "./ScrollCarousel";

const dummyProjects = [
  {
    title: "EV10 Marina Bay",
    tags: ["2&3 BHK", "Vashi"],
    bgText: "RESIDENTIAL • VASHI • RESIDENTIAL • VASHI •",
    src: "https://evhomes.tech/images/marina1.png",
  },
  {
    title: "EV23 Malibu West",
    tags: ["1&2 BHK", "Koparkhairane"],
    bgText: "RESIDENTIAL • KOPARKHAIRANE • RESIDENTIAL • KOPARKHAIRANE •",
    src: "https://cdn.evhomes.tech/d9445019-76eb-4b18-bbe0-639007906396-malibu%20carousel%20(1).jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6ImQ5NDQ1MDE5LTc2ZWItNGIxOC1iYmUwLTYzOTAwNzkwNjM5Ni1tYWxpYnUgY2Fyb3VzZWwgKDEpLmpwZyIsImlhdCI6MTczNzQ2MDg2M30.unL5N-",
  },
  {
    title: "EV9 Square",
    tags: ["2&3 BHK", "Vashi"],
    bgText: "RESIDENTIAL • VASHI • RESIDENTIAL • VASHI •",
    src: "https://evhomes.tech/images/ninequareigm.png",
  },
  {
    title: "EV Heart City",
    tags: ["2 BHK", "Mosare"],
    bgText: "RESIDENTIAL • MOSARE • RESIDENTIAL • MOSARE •",
    src: "/images/ev-heart-city-1.jpg",
  },
];

const slides = [
  {
    id: 1,
    index: "01",
    title: "EV HEART CITY",
    location: "MOSARE",
    description:
      "A place where mountains, coastline, and culture converge.A place where mountains, coastline, and culture converge.A place where mountains, coastline, and culture converge.A place where mountains, coastline, and culture converge.",
    image: "/images/ev-heart-city-1.jpg",
  },
  {
    id: 2,
    index: "02",
    title: "EV10 MARINA BAY",
    location: "VASHI",
    description: "A world of calm waters.A world of calm waters.A world of calm waters.A world of calm waters.",
    image: "https://evhomes.tech/images/marina1.png",
  },
];

export default function PerspectiveScrollDemo() {
  return (
    <div className="w-full min-h-screen overflow-x-clip transition-colors duration-500 bg-white dark:bg-black text-black dark:text-white font-sans antialiased">
      {/* Top Filler Content */}
      <div className="h-[10vh] flex items-center justify-center border-t transition-colors duration-500 bg-gray-50 dark:bg-black border-black/5 dark:border-white/10">
        <h1 className="text-4xl text-black/50 dark:text-white/50">
          Visionary Communities
        </h1>
      </div>

      <PerspectiveScrollShowcase projects={dummyProjects} />

      {/* <ScrollCarousel slides={slides} slideHeight={1.2} /> */}
    </div>
  );
}
