"use client";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Lenis from "@studio-freight/lenis";
import styles from "./FeaturesSection.module.css";
const CinematicText = lazy(() => import("../AboutSections/cinematicTex"));

const DenmarkToVashi = lazy(() => import("../AboutSections/DenmarkToVashi"));
const OptimizedShader = lazy(() =>
  import("./OptimizedShader").then((mod) => ({ default: mod.OptimizedShader }))
);
const LandingPage = lazy(() => import("../LandingPage"));
const CinematicPlacesGallery = lazy(() => import("./CinematicPlacesGallery"));
const WayVashi = lazy(() => import("../wayVashi"));
const HorizontalStory = lazy(() => import("../whyvashi/HorizontalStory"));
const PlaceToLive = lazy(() => import("../PlaceToLeave/PlaceToLive"));
const SlideOverStack = lazy(() => import("../SlideOverStack"));
const WhyCopenhagen = lazy(() => import("../PlaceToLeave/whyCopenhagen"));

const ComponentFallback = () => (
  <div className="w-full h-[50vh] bg-neutral-900/40 animate-pulse rounded-lg my-4" />
);
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
          <Suspense fallback={<div className="h-[60vh] bg-neutral-900 animate-pulse" />}>
            <div ref={cinematicTextRef} data-section>
              <CinematicText />
            </div>
          </Suspense>


          <div data-section>
            <CinematicPlacesGallery />
          </div>
          <div data-section className="-mb-[2px] relative z-10">
            <LandingPage isNight={isNight} />
          </div>

        </div>
      </section>
      <Suspense fallback={<div className="h-[60vh] bg-neutral-900 animate-pulse" />}>
        <div data-section className="-mt-[2px] relative z-20">
          <WayVashi isNight={isNight} setIsNight={toggleNightMode} />
        </div>
      </Suspense>

      <div data-section>
        <HorizontalStory />
      </div>
      <Suspense fallback={<div className="h-[60vh] bg-neutral-900 animate-pulse" />}>
        <div data-section>
          <PlaceToLive />

        </div>
      </Suspense>

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
          <Suspense fallback={<div className="h-[60vh] bg-neutral-900 animate-pulse" />}>
            <div className={styles.sharedSequenceContent} data-section>
              <DenmarkToVashi />
            </div>
          </Suspense>

        </section>
      </SlideOverStack>

    </main>
  );
}