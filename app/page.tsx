import Badge from "@/components/Badge";
import FeaturesSection from "@/components/FeaturesSections/zoom-parallax-demo";

export default function Home() {
  return (
    <main>
      <div data-section className="h-screen w-full overflow-hidden" id="vidiosection">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover"
        >
          <source
            src="/videos/intro-mob.mp4"
            type="video/mp4"
            media="(max-width: 480px)"
          />
          <source
            src="/videos/intro-desktop.mp4"
            type="video/mp4"
          />
        </video>
      </div>
      <Badge />
      <div className="min-h-screen flex flex-col items-center justify-center border-t transition-colors duration-500 border-black/5 dark:border-white/10">
        <FeaturesSection />
      </div>
    </main>
  );
}
