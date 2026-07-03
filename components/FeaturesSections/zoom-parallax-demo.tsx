"use client";
import React from "react";
import Lenis from "@studio-freight/lenis";
import { ZoomParallax } from "@/components/FeaturesSections/zoom-parallax";

export default function ZoomParallaxDemo() {
  React.useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const images = [
    {
      src: "/images/5min_city.png",
      alt: "City skyline with modern buildings",
    },
    {
      src: "https://evhomes.tech/images/ninesquare1.png",
      alt: "9square",
    },
    {
      src: "https://evhomes.tech/images/malibu.jpeg",
      alt: "23malibu",
    },
    {
      src: "https://evhomes.tech/images/capitol_9.png",
      alt: "capitol9",
    },
    {
      src: "https://evhomes.tech/images/9vtc_new.png",
      alt: "9vtc",
    },
    {
      src: "https://evhomes.tech/images/9hq.png",
      alt: "9hq",
    },
    {
      src: "https://evhomes.tech/images/marina1.png",
      alt: "10marina",
    },
  ];

  return (
    <main className="min-h-screen w-full">
      <div className="relative flex h-[20vh] items-center justify-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-1/2 left-1/2 h-[120vmin] w-[120vmin] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)] blur-[30px]"
        />
        <h1 className="text-center text-4xl font-bold text-[#DAA520]
    drop-shadow-[0_0_20px_rgba(218,165,32,0.6)]">
          PRESENTING 5 MINUTE CITY
        </h1>
      </div>
       <ZoomParallax images={images} />

      {/* Next Section */}
      <section className="flex h-screen items-center justify-center bg-white">
        <h2 className="text-6xl font-bold text-black">
          MORE CONTENT
        </h2>
      </section>
    </main>
  );
}