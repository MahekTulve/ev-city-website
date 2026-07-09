"use client";
import React, { useEffect, useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { ZoomParallax } from "@/components/FeaturesSections/zoom-parallax";
import { TextHoverEffect } from "@/components/footer/hover-footer";
import VashiLetter from "../AboutSections/VashiLetter";
import Vashi from "../Vashi/vashi";
import RealEstateJourney from "../ev-city/denmark";

export default function ZoomParallaxDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Normal scroll tracker for tracking the section position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Mapping scroll percentages directly to specific conditional states cleanly
  const isEntering = useTransform(scrollYProgress, [0, 0.15], [false, true]);
  const isFinal = useTransform(scrollYProgress, [0.15, 0.30], [false, true]);
  const isStepThree = useTransform(scrollYProgress, [0.30, 0.45], [false, true]);
  const isStepFour = useTransform(scrollYProgress, [0.45, 0.60], [false, true]);
  const isStepFive = useTransform(scrollYProgress, [0.60, 0.75], [false, true]);
  const isStepSix = useTransform(scrollYProgress, [0.75, 0.90], [false, true]);
  const isVideoActive = useTransform(scrollYProgress, [0.90, 1.00], [false, true]);

  // Pass active states downstream as raw booleans inside React context/lifecycle safely
  const [states, setStates] = React.useState({
    isEntering: false, isFinal: false, isStepThree: false, 
    isStepFour: false, isStepFive: false, isStepSix: false, isVideoActive: false
  });

  useEffect(() => {
    const unsub1 = isEntering.on("change", (v) => setStates(prev => ({ ...prev, isEntering: v })));
    const unsub2 = isFinal.on("change", (v) => setStates(prev => ({ ...prev, isFinal: v })));
    const unsub3 = isStepThree.on("change", (v) => setStates(prev => ({ ...prev, isStepThree: v })));
    const unsub4 = isStepFour.on("change", (v) => setStates(prev => ({ ...prev, isStepFour: v })));
    const unsub5 = isStepFive.on("change", (v) => setStates(prev => ({ ...prev, isStepFive: v })));
    const unsub6 = isStepSix.on("change", (v) => setStates(prev => ({ ...prev, isStepSix: v })));
    const unsub7 = isVideoActive.on("change", (v) => setStates(prev => ({ ...prev, isVideoActive: v })));

    return () => {
      unsub1(); unsub2(); unsub3(); unsub4(); unsub5(); unsub6(); unsub7();
    };
  }, [isEntering, isFinal, isStepThree, isStepFour, isStepFive, isStepSix, isVideoActive]);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  const images = [
    { src: "/images/5min_city.png", alt: "City skyline" },
    { src: "https://evhomes.tech/images/ninesquare1.png", alt: "9square" },
    { src: "https://evhomes.tech/images/malibu.jpeg", alt: "23malibu" },
    { src: "https://evhomes.tech/images/capitol_9.png", alt: "capitol9" },
    { src: "https://evhomes.tech/images/9vtc_new.png", alt: "9vtc" },
    { src: "https://evhomes.tech/images/9hq.png", alt: "9hq" },
    { src: "https://evhomes.tech/images/marina1.png", alt: "10marina" },
  ];

  return (
    <main className="w-full">
      <div className="relative flex flex-col h-[42vh] items-center justify-center overflow-hidden py-4">
        <TextHoverEffect text="PRESENTING" className="h-16 w-full max-w-xl" variant="white" />
        <TextHoverEffect text="THE 5 MINUTE CITY" className="h-44 w-full" variant="gradient" />
      </div>

      <ZoomParallax images={images} />

      {/* Ye container animation elements ko continuous screen par hold karega scroll karte waqt */}
      {/* <Vashi/> */}
      <div ref={containerRef} className="relative h-[600vh] w-full">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <VashiLetter
            isActive={true}
            isEntering={states.isEntering}
            isFinal={states.isFinal}
            isStepThree={states.isStepThree}
            isStepFour={states.isStepFour}
            isStepFive={states.isStepFive}
            isStepSix={states.isStepSix}
            isVideoActive={states.isVideoActive}
          />
        </div>
      </div>
      <RealEstateJourney />
    </main>
  );
}