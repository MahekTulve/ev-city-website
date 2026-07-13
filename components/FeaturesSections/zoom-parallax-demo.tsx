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
import VashiDenmark from "../AboutSections/denmark";
import FlashingIntroWords from "./FlashingIntroWords";

// --- Timing constants ---
const WORD_DURATION = 500; // Increased to 600ms so words are easier to read
const FINISH_HOLD = 300; // ms pause after last word before heading appears


export default function ZoomParallaxDemo() {
  const containerRef = useRef<HTMLDivElement>(null);

  // States for tracking the animation timeline
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);
  const [triggerMainHeading, setTriggerMainHeading] = useState(false);
  
  // Tracks whether the section has hit the 80% visibility threshold
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const introText =
    "EV HOMES PRESENTS THE FUTURE OF CONNECTED LIVING WHERE EVERYTHING YOU NEED IS JUST FIVE MINUTES AWAY";
  const introWords = introText.split(" ");

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
    offset: ["start end", "end end"],
  });

  const isEntering = useTransform(scrollYProgress, [0, 0.15], [false, true]);
  const isFinal = useTransform(scrollYProgress, [0.15, 0.3], [false, true]);
  const isStepThree = useTransform(scrollYProgress, [0.3, 0.45], [false, true]);
  const isStepFour = useTransform(scrollYProgress, [0.45, 0.6], [false, true]);
  const isStepFive = useTransform(scrollYProgress, [0.6, 0.75], [false, true]);
  const isStepSix = useTransform(scrollYProgress, [0.75, 0.9], [false, true]);
  const isVideoActive = useTransform(
    scrollYProgress,
    [0.9, 1.0],
    [false, true],
  );

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

  const headingText = "THE 5 MINUTE CITY";

  return (
    <main className="w-full">
      {/* Scroll-Aware Retriggerable Header Section */}
         <FlashingIntroWords
        introText="EV HOMES PRESENTS THE FUTURE OF CONNECTED LIVING WHERE EVERYTHING YOU NEED IS JUST FIVE MINUTES AWAY"
        headingText="THE 5 MINUTE CITY"
        emphasizedWords={["FUTURE", "CONNECTED", "FIVE", "MINUTES"]}
        highlightHeadingWords={["5", "MINUTE", "CITY"]}
    />
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

      <ZoomParallax images={images} />

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
      <VashiDenmark/>
      <RealEstateJourney />
      
    </main>
  );
}