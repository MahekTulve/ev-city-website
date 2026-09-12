"use client";

import {
  lazy,
  Suspense,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import styles from "./FeaturesSection.module.css";

const CinematicText = lazy(() => import("../AboutSections/cinematicTex"));
const DenmarkToVashi = lazy(() => import("../AboutSections/DenmarkToVashi"));
const OptimizedShader = lazy(() =>
  import("./OptimizedShader").then((mod) => ({ default: mod.OptimizedShader })),
);
const LandingPage = lazy(() => import("../LandingPage"));
const CinematicPlacesGallery = lazy(() => import("./CinematicPlacesGallery"));
const WayVashi = lazy(() => import("../wayVashi"));
const HorizontalStory = lazy(() => import("../whyvashi/HorizontalStory"));
const PlaceToLive = lazy(() => import("../PlaceToLeave/PlaceToLive"));
const SlideOverStack = lazy(() => import("../SlideOverStack"));
const WhyCopenhagen = lazy(() => import("../PlaceToLeave/whyCopenhagen"));

type DeferredMountProps = {
  children: ReactNode;
  minHeight: string;
  rootMargin?: string;
  sectionMarker?: boolean;
  placeholder?: ReactNode;
};

function DeferredMount({
  children,
  minHeight,
  rootMargin = "900px 0px",
  sectionMarker = true,
  placeholder = null,
}: DeferredMountProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    const host = hostRef.current;
    if (!host) return;

    if (!("IntersectionObserver" in window)) {
      setShouldRender(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldRender(true);
        observer.disconnect();
      },
      {
        rootMargin,
        threshold: 0,
      },
    );

    observer.observe(host);
    return () => observer.disconnect();
  }, [rootMargin, shouldRender]);

  return (
    <div
      ref={hostRef}
      style={shouldRender ? undefined : { minHeight }}
      data-deferred-section
      data-section={sectionMarker ? "" : undefined}
    >
      {shouldRender ? (
        <Suspense
          fallback={
            placeholder ?? <div aria-hidden="true" style={{ minHeight }} />
          }
        >
          {children}
        </Suspense>
      ) : (
        placeholder
      )}
    </div>
  );
}

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

  return (
    <main className="w-full">
      <section className={styles.sharedSequence}>
        <div className={styles.sharedShaderTrack} aria-hidden="true">
          <div className={styles.sharedShaderSticky}>
            <Suspense fallback={null}>
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
            </Suspense>
            <div className={styles.sharedShaderOverlay} />
          </div>
        </div>

        <div className={styles.sharedSequenceContent}>
          <Suspense fallback={<div className="h-[100vh] bg-neutral-900" />}>
            <div ref={cinematicTextRef} data-section>
              <CinematicText />
            </div>
          </Suspense>

          <DeferredMount minHeight="240vh" rootMargin="500px 0px">
            <div>
              <CinematicPlacesGallery />
            </div>
          </DeferredMount>

          <DeferredMount minHeight="400vh" rootMargin="900px 0px">
            <div className="-mb-[2px] relative z-10">
              <LandingPage isNight={isNight} />
            </div>
          </DeferredMount>
        </div>
      </section>

      <DeferredMount minHeight="380vh" rootMargin="1200px 0px">
        <div className="-mt-[2px] relative z-20">
          <WayVashi isNight={isNight} setIsNight={toggleNightMode} />
        </div>
      </DeferredMount>

      <DeferredMount minHeight="750vh" rootMargin="1400px 0px">
        <div>
          <HorizontalStory />
        </div>
      </DeferredMount>

      <DeferredMount minHeight="300vh" rootMargin="1200px 0px">
        <div>
          <PlaceToLive />
        </div>
      </DeferredMount>

      <DeferredMount
        minHeight="450vh"
        rootMargin="1200px 0px"
        sectionMarker={false}
        placeholder={
          <>
            <div data-section aria-hidden="true" style={{ minHeight: "100vh" }} />
            <div data-section aria-hidden="true" style={{ minHeight: "350vh" }} />
          </>
        }
      >
        <SlideOverStack previous={<WhyCopenhagen />}>
          <section className={styles.sharedSequence}>
            <div className={styles.sharedShaderTrack} aria-hidden="true">
              <div className={styles.sharedShaderSticky}>
                <Suspense fallback={null}>
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
                </Suspense>
                <div className={styles.sharedShaderOverlay} />
              </div>
            </div>

            <div className={styles.sharedSequenceContent} data-section>
              <DenmarkToVashi />
            </div>
          </section>
        </SlideOverStack>
      </DeferredMount>
    </main>
  );
}
