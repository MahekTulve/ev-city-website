import Badge from "@/components/Badge";
import FeaturesSection from "@/components/FeaturesSections/zoom-parallax-demo";
import ScrollVideo from "@/components/scrollvideo/scrollvideo";
import StackFeatureSection from "@/components/scrollvideo/StackFeatureSection";

export default function Home() {
  return (
    <main>
           <div data-section className="h-screen w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          {/* Mobile video */}
          <source
            src="/videos/intro-mob.mp4"
            type="video/mp4"
            media="(max-width: 480px)"
          />

          {/* Tablet and desktop video */}
          <source
            src="/videos/intro-desktop.mp4"
            type="video/mp4"
          />
        </video>
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
