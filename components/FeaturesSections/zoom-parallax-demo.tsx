"use client";
import  { useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import styles from "./FeaturesSection.module.css";
import CinematicText from "../AboutSections/cinematicTex";
import DenmarkToVashi from "../AboutSections/DenmarkToVashi";
import { OptimizedShader } from "./OptimizedShader";
import LandingPage from "../LandingPage";
import CinematicPlacesGallery from "./CinematicPlacesGallery";
import WayVashi from "../wayVashi";
import HorizontalStory from "../whyvashi/HorizontalStory";
import PlaceToLive from "../PlaceToLeave/PlaceToLive";
import NextPhoto from "../PlaceToLeave/NextPhoto";
import SlideOverStack from "../SlideOverStack";
import WhyCopenhagen from "../PlaceToLeave/whyCopenhagen";



export default function ZoomParallaxDemo() {
  const [isNight, setIsNight] = useState(true);
  const cinematicTextRef = useRef<HTMLDivElement>(null);

  const [isCinematicVisible, setIsCinematicVisible] = useState(false);
  const [sparkleBurstKey, setSparkleBurstKey] = useState(0);


  const toggleNightMode = () => {
    setIsNight((prev) => !prev);
  };
  useEffect(() => {
    const cinematicSection = cinematicTextRef.current;

    if (!cinematicSection) return;

    let activeSlideSignature = "";

    const triggerForActiveSlide = (force = false) => {
      const activeSlide = cinematicSection.querySelector<HTMLElement>(
        '[aria-hidden="false"]',
      );

      const signature = activeSlide?.textContent?.trim() ?? "";

      if (signature && (force || signature !== activeSlideSignature)) {
        activeSlideSignature = signature;
        setSparkleBurstKey((current) => current + 1);
      }
    };

    const slideObserver = new MutationObserver(() => {
      triggerForActiveSlide();
    });

    slideObserver.observe(cinematicSection, {
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-hidden"],
    });

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsCinematicVisible(visible);

        if (visible) {
          triggerForActiveSlide(true);
        }
      },
      { threshold: 0.15 },
    );

    visibilityObserver.observe(cinematicSection);
    triggerForActiveSlide();

    return () => {
      slideObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);


  useEffect(() => {
    const lenis = new Lenis();
    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="w-full">
      <section className={styles.sharedSequence}>

        <div className={styles.sharedShaderTrack} aria-hidden="true">
          <div className={styles.sharedShaderSticky}>

            <OptimizedShader
              className={styles.sharedShader}
              colors={[
                "#03050f",
                "#0e1420",
                "#10131b",
                "#1b2232",
                "#12161e",
                "#020202",

              ]}
              speed={0.7}
              showParticles={isCinematicVisible}
              particleColor="#e6c88d"
              particleCount={48}
              particleLayout="text"
              continuous={true}
              burstKey={sparkleBurstKey}
            />
            <div className={styles.sharedShaderOverlay} />
          </div>
        </div>

        <div className={styles.sharedSequenceContent}>
          <div ref={cinematicTextRef} data-section>
            <CinematicText />
          </div>

          <div data-section>
            <CinematicPlacesGallery />
          </div>
          <div data-section className="-mb-[2px] relative z-10">
            <LandingPage isNight={isNight} />
          </div>

        </div>
      </section>

      <div data-section className="-mt-[2px] relative z-20">
        <WayVashi isNight={isNight} setIsNight={toggleNightMode} />
      </div>
      <div data-section>
        <HorizontalStory />
      </div>
      <div data-section>
        <PlaceToLive />
        <NextPhoto />
      </div>
      <SlideOverStack previous={<WhyCopenhagen />}>
        <section className={styles.sharedSequence}>

          <div className={styles.sharedShaderTrack} aria-hidden="true">
            <div className={styles.sharedShaderSticky}>

              <OptimizedShader
                className={styles.sharedShader}
                colors={[

                  "#03050f",
                  "#0e1420",
                  "#10131b",
                  "#1b2232",
                  "#12161e",
                  "#020202",

                ]}
                speed={0.7}
                showParticles={isCinematicVisible}
                particleColor="#e6c88d"
                particleCount={48}
                particleLayout="text"
                continuous={true}
                burstKey={sparkleBurstKey}
              />
              <div className={styles.sharedShaderOverlay} />
            </div>
          </div>

          <div className={styles.sharedSequenceContent} data-section>
            <DenmarkToVashi />
          </div>
        </section>
      </SlideOverStack>

    </main>
  );
}