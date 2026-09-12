"use client";

import {
  lazy,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./FeaturesSection.module.css";
import { useMediaQuery } from "../performance/useMediaQuery";

const CinematicText = memo(lazy(() => import("../AboutSections/cinematicTex")));
const DenmarkToVashi = memo(lazy(() => import("../AboutSections/DenmarkToVashi")));
const OptimizedShader = memo(
  lazy(() =>
    import("./OptimizedShader").then((mod) => ({ default: mod.OptimizedShader })),
  ),
);
const LandingPage = memo(lazy(() => import("../LandingPage")));
const CinematicPlacesGallery = memo(lazy(() => import("./CinematicPlacesGallery")));
const WayVashi = memo(lazy(() => import("../wayVashi")));
const HorizontalStory = memo(lazy(() => import("../whyvashi/HorizontalStory")));
const PlaceToLive = memo(lazy(() => import("../PlaceToLeave/PlaceToLive")));
const SlideOverStack = memo(lazy(() => import("../SlideOverStack")));
const WhyCopenhagen = memo(lazy(() => import("../PlaceToLeave/whyCopenhagen")));

const SHADER_COLORS = [
  "#03050f",
  "#0e1420",
  "#10131b",
  "#1b2232",
  "#12161e",
  "#020202",
];

export default function ZoomParallaxDemo() {
  const [isNight, setIsNight] = useState(true);
  const cinematicTextRef = useRef<HTMLDivElement>(null);
  const [isCinematicVisible, setIsCinematicVisible] = useState(false);
  const [sparkleBurstKey, setSparkleBurstKey] = useState(0);
  const isMobile = useMediaQuery("(max-width: 768px)");

  const toggleNightMode = useCallback(() => {
    setIsNight((prev) => !prev);
  }, []);

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

    const slideObserver = new MutationObserver(() => triggerForActiveSlide());
    slideObserver.observe(cinematicSection, {
      subtree: true,
      attributes: true,
      attributeFilter: ["aria-hidden"],
    });

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting;
        setIsCinematicVisible((current) =>
          current === visible ? current : visible,
        );

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

  const shaderProps = {
    className: styles.sharedShader,
    colors: SHADER_COLORS,
    speed: isMobile ? 0.45 : 0.7,
    showParticles: isCinematicVisible,
    particleColor: "#e6c88d",
    particleCount: isMobile ? 20 : 48,
    particleLayout: "text" as const,
    continuous: !isMobile,
    burstKey: sparkleBurstKey,
  };

  return (
    <main className="w-full">
      <section className={styles.sharedSequence}>
        <div className={styles.sharedShaderTrack} aria-hidden="true">
          <div className={styles.sharedShaderSticky}>
            <OptimizedShader {...shaderProps} />
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
              <OptimizedShader {...shaderProps} showParticles={false} />
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
