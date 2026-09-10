import Hero from "@/components/Hero";
const Badge = lazy(() => import("@/components/Badge"));

import { lazy, Suspense } from "react";
const FeaturesSection = lazy(() => import("@/components/FeaturesSections/zoom-parallax-demo"));

export default function Home() {
  return (
    <main>
      <Hero />
      <Suspense fallback={<div className="h-[60vh] bg-neutral-900 animate-pulse" />}>
        <Badge />
      </Suspense>


      <div className="min-h-screen flex flex-col items-center justify-center border-t transition-colors duration-500 border-black/5 dark:border-white/10">
        <FeaturesSection />
      </div>
    </main>
  );
}
