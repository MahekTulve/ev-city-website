"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  motion,
  AnimatePresence,
  Variants,
} from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { ZoomParallax } from "@/components/FeaturesSections/zoom-parallax";
import VashiLetter from "../AboutSections/VashiLetter";
import RealEstateJourney from "../ev-city/denmark";

import styles from "./FeaturesSection.module.css";
import VashiDenmark from "../AboutSections/Vashidenmark";
import FlashingIntroWords from "./FlashingIntroWords";
import CinematicText from "../AboutSections/cinematicTex";
import ExplainDenmark from "../AboutSections/ExplainDenmark";
import AboutFiveMinute from "../AboutSections/AboutFiveMinute";
import DenmarkToVashi from "../AboutSections/DenmarkToVashi";
import { MeshGradient } from "@paper-design/shaders-react";
import { OptimizedShader } from "./OptimizedShader";
import LandingPage from "../LandingPage";
import CinematicPlacesGallery from "./CinematicPlacesGallery";
import WayVashi from "../wayVashi";
import HorizontalStory from "../whyvashi/HorizontalStory";
import PlaceToLive from "../PlaceToLeave/PlaceToLive";
import NextPhoto from "../PlaceToLeave/NextPhoto";
import NextDesign from "../PlaceToLeave/NextDesign";
import Clouds from "../whyvashi/clouds";

// --- Timing constants ---
const WORD_DURATION = 500; // Increased to 600ms so words are easier to read
const FINISH_HOLD = 300; // ms pause after last word before heading appears

export default function ZoomParallaxDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isNight, setIsNight] = useState(true);
  const cinematicTextRef = useRef<HTMLDivElement>(null);

  const [isCinematicVisible, setIsCinematicVisible] = useState(false);
  const [sparkleBurstKey, setSparkleBurstKey] = useState(0);


  // States for tracking the animation timeline
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);
  const [triggerMainHeading, setTriggerMainHeading] = useState(false);

  // Tracks whether the section has hit the 80% visibility threshold
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const introText =
    "EV HOMES PRESENTS THE FUTURE OF CONNECTED LIVING WHERE EVERYTHING YOU NEED IS JUST FIVE MINUTES AWAY";
  const introWords = introText.split(" ");

  /*
   * Keep the sparkle burst synchronized with CinematicText without editing
   * cinematicTex.tsx. Its active slide already updates aria-hidden, so this
   * observer restarts the particles whenever that active slide changes.
   */
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

        // Give an immediate burst when the user reaches the text section.
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

  // Handle the flashing word intro
  useEffect(() => {
    // Only run if the section is 80% visible AND the intro isn't finished yet
    if (isSectionVisible && !introFinished) {
      if (currentWordIndex < introWords.length) {
        const timer = setTimeout(() => {
          setCurrentWordIndex((prev) => prev + 1);
        }, WORD_DURATION);
        return () => clearTimeout(timer);
      } else {
        const finishTimer = setTimeout(() => {
          setIntroFinished(true);
          setTimeout(() => setTriggerMainHeading(true), 50);
        }, FINISH_HOLD);
        return () => clearTimeout(finishTimer);
      }
    }
  }, [currentWordIndex, introFinished, introWords.length, isSectionVisible]);

  // Triggered when section hits 80% visibility
  const handleViewportEnter = () => {
    setIsSectionVisible(true);
  };

  // Revert everything back to original state when it goes off screen
  const handleViewportLeave = () => {
    setIsSectionVisible(false);
    setIntroFinished(false);
    setCurrentWordIndex(0);
    setTriggerMainHeading(false);
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const isEntering = useTransform(scrollYProgress, [0, 1], [true, true]);
  const isFinal = useTransform(scrollYProgress, [0.05, 0.25], [false, true]);       // V (Direct start)
  const isStepThree = useTransform(scrollYProgress, [0.25, 0.4], [false, true]);   // A
  const isStepFour = useTransform(scrollYProgress, [0.4, 0.55], [false, true]);    // S
  const isStepFive = useTransform(scrollYProgress, [0.55, 0.7], [false, true]);    // H
  const isStepSix = useTransform(scrollYProgress, [0.7, 0.9], [false, true]);     // I (Stops here)
  const isVideoActive = useTransform(scrollYProgress, [0.9, 1.0], [false, true]);
  const [states, setStates] = useState({
    isEntering: false,
    isFinal: false,
    isStepThree: false,
    isStepFour: false,
    isStepFive: false,
    isStepSix: false,
    isVideoActive: false,
  });

  useEffect(() => {
    const unsub1 = isEntering.on("change", (v) =>
      setStates((prev) => ({ ...prev, isEntering: v })),
    );
    const unsub2 = isFinal.on("change", (v) =>
      setStates((prev) => ({ ...prev, isFinal: v })),
    );
    const unsub3 = isStepThree.on("change", (v) =>
      setStates((prev) => ({ ...prev, isStepThree: v })),
    );
    const unsub4 = isStepFour.on("change", (v) =>
      setStates((prev) => ({ ...prev, isStepFour: v })),
    );
    const unsub5 = isStepFive.on("change", (v) =>
      setStates((prev) => ({ ...prev, isStepFive: v })),
    );
    const unsub6 = isStepSix.on("change", (v) =>
      setStates((prev) => ({ ...prev, isStepSix: v })),
    );
    const unsub7 = isVideoActive.on("change", (v) =>
      setStates((prev) => ({ ...prev, isVideoActive: v })),
    );

    return () => {
      unsub1();
      unsub2();
      unsub3();
      unsub4();
      unsub5();
      unsub6();
      unsub7();
    };
  }, [
    isEntering,
    isFinal,
    isStepThree,
    isStepFour,
    isStepFive,
    isStepSix,
    isVideoActive,
  ]);

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

  const videos = [
    {
      src: "/images/vid2.mp4",
      ariaLabel: "City skyline",
    },
    {
      src: "/images/vid4.mp4",
      ariaLabel: "EV 9 Square",
    },
    {
      src: "/images/vid3.mp4",
      ariaLabel: "23 Malibu West",
    },
    {
      src: "/images/vid1.mp4",
      ariaLabel: "Capitol 9",
    },
    {
      src: "/images/vid5.mp4",
      ariaLabel: "9 VTC",
    },
    {
      src: "/images/vid6.mp4",
      ariaLabel: "9 HQ",
    },
    {
      src: "/images/vid7.mp4",
      ariaLabel: "10 Marina",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const blockWordVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      y: 40,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 11,
        stiffness: 120,
      },
    },
  };
  useEffect(() => {
    let idleTimer: NodeJS.Timeout;

    const handleScrollActivity = () => {
      clearTimeout(idleTimer);

      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const isInContainer = rect.top <= 0 && rect.bottom >= windowHeight;
      if (isInContainer && !states.isStepSix) {
        idleTimer = setTimeout(() => {
          window.scrollBy({
            top: windowHeight * 0.5, 
            behavior: "smooth",
          });
        }, 2000); 
      }
    };

    window.addEventListener("scroll", handleScrollActivity);

    return () => {
      window.removeEventListener("scroll", handleScrollActivity);
      clearTimeout(idleTimer);
    };
  }, [states.isStepSix]);
  const headingText = "THE 5 MINUTE CITY";

  return (
    <main className="w-full">
      {/* Scroll-Aware Retriggerable Header Section */}
      {/* <CinematicText /> */}
      {/* <FlashingIntroWords
        introText="EV HOMES PRESENTS THE FUTURE OF CONNECTED LIVING WHERE EVERYTHING YOU NEED IS JUST FIVE MINUTES AWAY"
        headingText="THE 5 MINUTE CITY"
        emphasizedWords={["FUTURE", "CONNECTED", "FIVE", "MINUTES"]}
        highlightHeadingWords={["5", "MINUTE", "CITY"]}
    /> */}
      {/* <motion.div
        onViewportEnter={handleViewportEnter}
        onViewportLeave={handleViewportLeave}
        viewport={{ once: false, amount: 0.8 }} // Triggers precisely at 80% visibility
        className="relative flex flex-col h-[65vh] items-center justify-center overflow-hidden py-12 px-4 bg-transparent select-none"
      >
        <AnimatePresence mode="wait">
          {!introFinished ? (
          
            <motion.div
              key="intro-words"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-0 flex items-center justify-center p-4"
            >
              <AnimatePresence mode="wait">
                {introWords.map((word, index) => {
                  if (index !== currentWordIndex) return null;
                  const isEmphasized = ["FUTURE", "CONNECTED", "FIVE", "MINUTES"].includes(word);

                  return (
                    <motion.span
                      key={word + index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className={`text-center text-5xl md:text-7xl font-black tracking-tight uppercase break-words px-4 ${
                        isEmphasized
                          ? "bg-gradient-to-b from-[#FDE68A] via-[#D4AF37] to-[#8B6B16] bg-clip-text text-transparent"
                          : "text-white"
                      }`}
                    >
                      {word}
                    </motion.span>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          ) : (
          
            <motion.div
              key="main-heading"
              initial="hidden"
              animate={triggerMainHeading ? "visible" : "hidden"}
              variants={containerVariants}
              className="flex flex-col items-center justify-center text-center"
            >
              <motion.span
                variants={blockWordVariants}
                className="text-xs md:text-sm font-bold tracking-[0.4em] text-neutral-500 uppercase mb-6"
              >
                Presenting
              </motion.span>

              <motion.h1 className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-5xl md:text-7xl lg:text-8xl font-black tracking-tight uppercase">
                {headingText.split(" ").map((word, index) => {
                  const highlight = word === "5" || word === "MINUTE" || word === "CITY";

                  return (
                    <motion.span
                      key={index}
                      variants={blockWordVariants}
                      className={`relative inline-block ${
                        highlight
                          ? styles.cityGlow
                          : "bg-gradient-to-b from-white to-neutral-300 bg-clip-text text-transparent"
                      }`}
                    >
                      {word}

                      {highlight && (
                        <>
                          <span
                            className={styles.sparkle}
                            style={{ top: "-10px", left: "-8px", animationDelay: "0s" }}
                          />
                          <span
                            className={styles.sparkle}
                            style={{ top: "12px", right: "-10px", animationDelay: ".6s" }}
                          />
                          <span
                            className={styles.sparkle}
                            style={{ bottom: "-10px", left: "50%", animationDelay: "1.2s" }}
                          />
                        </>
                      )}
                    </motion.span>
                  );
                })}
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div> */}
      <section className={styles.sharedSequence}>

        <div className={styles.sharedShaderTrack} aria-hidden="true">
          <div className={styles.sharedShaderSticky}>

            <OptimizedShader
              className={styles.sharedShader}
              colors={[
                // "#000000",
                // "#01040a",
                // "#1F1611",
                // "#523828",
                // "#4e3e10",
                // "#251a04",

                // option 1
                "#03050f",
                "#0e1420",
                "#10131b",
                "#1b2232",
                "#12161e",
                "#020202",

                //option 2
                //  "#020202",
                // "#100b1f",
                // "#1a1622",
                // "#1c1a2b",
                // "#181620",
                // "#0f0a13",

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

          {/*   <ZoomParallax videos={videos} /> */}
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
      {/* Pinned VashiLetter Section - Yeh tab tak pin rahega jab tak "I" (isStepSix) nahi aata */}
      {/* <div ref={containerRef} data-section className="relative h-[800vh] w-full">
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
      </div> */}

      {/* Yeh new section tab tak screen par nahi aayega jab tak upar wala "I" step khatam nahi hota */}
      <div data-section>
        <HorizontalStory />
      </div>

      <div data-section>
        <Clouds />
      </div>

      {/* <AboutFiveMinute /> */}

      {/* <div ref={containerRef} data-section className="relative h-[600vh] w-full ">
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
      </div> */}
      <PlaceToLive />
      <NextPhoto />
      <NextDesign />
      <div data-section>
        <ExplainDenmark />
      </div>
      <div data-section>
        <VashiDenmark />
      </div>
      <div data-section>
        <DenmarkToVashi />
      </div>

      {/* <RealEstateJourney /> */}
    </main>
  );
}
