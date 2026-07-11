import FeaturesSection from "@/components/FeaturesSections/zoom-parallax-demo";

export default function Home() {
  return (
    <main>
      <video
  src="/images/ev_city_vid.mp4"
  autoPlay
  muted
  loop
  playsInline
  className="w-full h-screen object-cover"
/>

     <div className="min-h-screen flex flex-col items-center justify-center border-t transition-colors duration-500 border-black/5 dark:border-white/10">
  <FeaturesSection />
</div>
    </main>
  );
}