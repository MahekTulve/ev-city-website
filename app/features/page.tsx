// import RealEstateJourney from "@/components/ev-city/denmark";
import HoverFooter from "@/components/footer/footer-demo";
import PerspectiveScrollDemo from "@/components/scroll-showcase/scroll-demo";
import Hero from "@/components/scrollvideo/hero";
import Projects from "@/components/scrollvideo/Projects";

export const metadata = {
  title: "Our Projects | EV Group",
};

export default function FeaturesPage() {
  return (
    <>
      {/* <FeaturesSection /> */}
      <PerspectiveScrollDemo />

      <Projects />
      <HoverFooter />
      <Hero />
    </>
  );
}
