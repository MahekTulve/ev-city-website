"use client";

import dynamic from "next/dynamic";
import React, { type ReactNode, useEffect, useRef, useState } from "react";

import CinematicText from "../AboutSections/cinematicTex";
import { OptimizedShader } from "./OptimizedShader";
import styles from "./FeaturesSection.module.css";

const CinematicPlacesGallery = dynamic(() => import("./CinematicPlacesGallery"), {
  ssr: false,
});
const LandingPage = dynamic(() => import("../LandingPage"), { ssr: false });
const WayVashi = dynamic(() => import("../wayVashi"), { ssr: false });
const HorizontalStory = dynamic(() => import("../whyvashi/HorizontalStory"), {
  ssr: false,
});
const Clouds = dynamic(() => import("../whyvashi/clouds"), { ssr: false });
const PlaceToLive = dynamic(() => import("../PlaceToLeave/PlaceToLive"), {
  ssr: false,
});
const NextPhoto = dynamic(() => import("../PlaceToLeave/NextPhoto"), {
  ssr: false,
});
const NextDesign = dynamic(() => import("../PlaceToLeave/NextDesign"), {
  ssr: false,
});
const ExplainDenmark = dynamic(() => import("../AboutSections/ExplainDenmark"), {
  ssr: false,
});
const VashiDenmark = dynamic(() => import("../AboutSections/Vashidenmark"), {
  ssr: false,
});
const DenmarkToVashi = dynamic(() => import("../AboutSections/DenmarkToVashi"), {
  ssr: false,
});

type DeferredSectionProps = {
  children: ReactNode;
  minHeight: string;
  className?: string;
  rootMargin?: string;
};

/**
 * Do not hydrate/download heavy below-the-fold sections until the user reaches
 * them. minHeight reserves their existing scroll space so the page does not
 * collapse while a chunk is still deferred.
 */
function DeferredSection({
  children,
  minHeight,
  className,
  rootMargin = "0px",
}: DeferredSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || mounted) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted, rootMargin]);

  return (
    <div
      ref={ref}
      data-section
      className={className}
      style={{ minHeight }}
    >
      {mounted ? children : null}
    </div>
  );
}

export default function ZoomParallaxDemo() {
  const [isNight, setIsNight] = useState(true);
  const cinematicTextRef = useRef<HTMLDivElement>(null);
  const [isCinematicVisible, setIsCinematicVisible] = useState(false);
  const [sparkleBurstKey, setSparkleBurstKey] = useState(0);

  const toggleNightMode = () => {
    setIsNight((previous) => !previous);
  };

  // Warm only the next visual chunks after genuine user intent. This keeps
  // Lighthouse's initial load lean while avoiding a blank wait for real users
  // who start scrolling through the experience.
  useEffect(() => {
    let warmed = false;

    const warmNextSections = () => {
      if (warmed) return;
      warmed = true;

      void import("./CinematicPlacesGallery");
      void import("../LandingPage");
      void import("../wayVashi");

      window.removeEventListener("wheel", warmNextSections);
      window.removeEventListener("touchstart", warmNextSections);
      window.removeEventListener("pointerdown", warmNextSections);
      window.removeEventListener("keydown", handleKeyDown);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " ", "End"].includes(event.key)) {
        warmNextSections();
      }
    };

    window.addEventListener("wheel", warmNextSections, { passive: true });
    window.addEventListener("touchstart", warmNextSections, { passive: true });
    window.addEventListener("pointerdown", warmNextSections, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", warmNextSections);
      window.removeEventListener("touchstart", warmNextSections);
      window.removeEventListener("pointerdown", warmNextSections);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Synchronize the shader sparkle burst with the active CinematicText slide.
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
        setIsCinematicVisible(visible);
        if (visible) triggerForActiveSlide(true);
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
              continuous
              burstKey={sparkleBurstKey}
            />
            <div className={styles.sharedShaderOverlay} />
          </div>
        </div>

        <div className={styles.sharedSequenceContent}>
          <div ref={cinematicTextRef} data-section>
            <CinematicText />
          </div>

          <DeferredSection minHeight="240vh">
            <CinematicPlacesGallery />
          </DeferredSection>

          <DeferredSection
            minHeight="100vh"
            className="-mb-[2px] relative z-10"
            rootMargin="800px 0px"
          >
            <LandingPage isNight={isNight} />
          </DeferredSection>
        </div>
      </section>

      <DeferredSection
        minHeight="100vh"
        className="-mt-[2px] relative z-20"
        rootMargin="800px 0px"
      >
        <WayVashi isNight={isNight} setIsNight={toggleNightMode} />
      </DeferredSection>

      <DeferredSection minHeight="400vh" rootMargin="800px 0px">
        <HorizontalStory />
      </DeferredSection>

      <DeferredSection minHeight="100vh" rootMargin="800px 0px">
        <Clouds />
      </DeferredSection>

      <DeferredSection minHeight="100vh" rootMargin="800px 0px">
        <PlaceToLive />
      </DeferredSection>

      <DeferredSection minHeight="100vh" rootMargin="800px 0px">
        <NextPhoto />
      </DeferredSection>

      <DeferredSection minHeight="100vh" rootMargin="800px 0px">
        <NextDesign />
      </DeferredSection>

      <DeferredSection minHeight="100vh" rootMargin="800px 0px">
        <ExplainDenmark />
      </DeferredSection>

      <DeferredSection minHeight="110vh" rootMargin="800px 0px">
        <VashiDenmark />
      </DeferredSection>

      <DeferredSection minHeight="350vh" rootMargin="800px 0px">
        <DenmarkToVashi />
      </DeferredSection>
    </main>
  );
}
