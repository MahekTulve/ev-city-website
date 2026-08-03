import Badge from "@/components/Badge";
import FeaturesSection from "@/components/FeaturesSections/zoom-parallax-demo";
import ScrollVideo from "@/components/scrollvideo/scrollvideo";
import StackFeatureSection from "@/components/scrollvideo/StackFeatureSection";

export default function Home() {
  return (
    <main>
      <div data-section>
        <video
          src="/images/ev_city_vid.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-screen object-cover"
        />
      </div>

      <Badge />
      {/* <ScrollVideo src="/images/ev_city_scrub.mp4" scrollLength={5} /> */}

      {/* <StackFeatureSection /> */}

      <div className="min-h-screen flex flex-col items-center justify-center border-t transition-colors duration-500 border-black/5 dark:border-white/10">
        <FeaturesSection />
      </div>
    </main>
  );
}
