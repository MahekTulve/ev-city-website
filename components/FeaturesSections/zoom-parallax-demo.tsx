"use client";
import React from "react";
import Lenis from "@studio-freight/lenis";
import { ZoomParallax } from "@/components/FeaturesSections/zoom-parallax";
import { TextHoverEffect } from "@/components/footer/hover-footer";
import Vashi from "../Vashi/vashi";

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
      {/* Container for Stacked Animated Text */}
      <div className="relative flex flex-col h-[42vh] items-center justify-center overflow-hidden py-4">
        <div aria-hidden className="absolute inset-0" />

        {/* Normal White "PRESENTING" Text Effect */}
        <TextHoverEffect
          text="PRESENTING"
          className="h-16 w-full max-w-xl"
          variant="white"
        />
        
        {/* Massive Colorful "5 MINUTE CITY" Text Effect */}
        <TextHoverEffect
          text="THE 5 MINUTE CITY"
          className="h-44 w-full"
          variant="gradient"
        />
      </div>

      <ZoomParallax images={images} />

      {/* <section className="flex h-screen items-center justify-center bg-white">
        <h2 className="text-6xl font-bold text-black">
          V A S H I
        </h2>
      </section> */}
      <Vashi />
    </main>
  );
}