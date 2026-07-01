'use client'
import { useEffect, useState, useRef } from "react";
import SliderSection from "@/components/AboutSections/SliderSection";
import QuoteSection from "@/components/AboutSections/QuoteSection";
import ExtraordinarySection from "@/components/AboutSections/ExtraordinarySection";
import styles from "./about.module.css";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1778731525372-0ec34ead8d08?q=80&w=2070&auto=format&fit=crop",
    line2: "the spaces",
    line3: "we create.",
  },
  {
    image: "https://images.unsplash.com/photo-1776482127999-81dd824eb42c?q=80&w=1170&auto=format&fit=crop",
    line2: "the quality",
    line3: "we stand by.",
  },
  {
    image: "https://images.unsplash.com/photo-1778731525362-d4236da27aa4?q=80&w=2070&auto=format&fit=crop",
    line2: "the stories",
    line3: "we fulfil.",
  },
];

export default function About() {
  const [index, setIndex] = useState(0);
  const [isInitial, setIsInitial] = useState(true);
  const [isLastExiting, setIsLastExiting] = useState(false);
  const [isLastEntering, setIsLastEntering] = useState(false);
  const [direction, setDirection] = useState("down");

  // Section states
  const [isQuoteActive, setIsQuoteActive] = useState(false);

  // Nayi states 3rd section ke animation ko lock aur trigger karne ke liye
  const [isExtraordinaryActive, setIsExtraordinaryActive] = useState(false);
  const [isExtraordinaryEntering, setIsExtraordinaryEntering] = useState(false);

  const isTransitioning = useRef(false);
  const lockPage = useRef(true);
  const paragraphRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (lockPage.current) {
      document.body.style.overflow = "hidden";
    }

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) return;

      // --- SECTION 3: EXTRAORDINARY SECTION LOGIC ---
      if (isExtraordinaryActive) {
        if (e.deltaY < 0) {
          // User upar scroll kare toh 3rd section ko exit karein aur 2nd active karein
          e.preventDefault();
          isTransitioning.current = true;
          setDirection("up");

          setIsExtraordinaryEntering(false);
          setIsExtraordinaryActive(false);
          setIsQuoteActive(true);

          setTimeout(() => {
            if (paragraphRef.current) {
              paragraphRef.current.scrollTop = paragraphRef.current.scrollHeight;
            }
            isTransitioning.current = false;
          }, 4500); // Wahi timing jo aapke standard component exit ki hai
          return;
        }
        return;
      }

      // --- SECTION 2: PARAGRAPH SCROLL LOGIC (QUOTE SECTION) ---
      if (isQuoteActive) {
        const para = paragraphRef.current;
        if (para) {
          const isAtTop = para.scrollTop <= 0;
          const isAtBottom = para.scrollHeight - para.scrollTop <= para.clientHeight + 1;

          if (e.deltaY < 0 && !isAtTop) {
            para.scrollTop += e.deltaY * 0.6;
            return;
          }

          if (e.deltaY > 0 && !isAtBottom) {
            para.scrollTop += e.deltaY * 0.6;
            return;
          }
        }

        // Paragraph top par hai aur upar scroll kiya -> Back to Slider
        if (e.deltaY < 0) {
          e.preventDefault();
          isTransitioning.current = true;
          setDirection("up");
          setIsLastExiting(false);
          setIsLastEntering(true);
          setIsQuoteActive(false);
          lockPage.current = true;
          setIndex(slides.length - 1);

          setTimeout(() => {
            setIsLastEntering(false);
            isTransitioning.current = false;
          }, 4500);
          return;
        }

        // About.tsx ke andar jahan section change ho raha hai:
        if (e.deltaY > 0) {
          e.preventDefault();
          isTransitioning.current = true;
          setDirection("down");

          setIsQuoteActive(false);
          setIsExtraordinaryEntering(true);

          setTimeout(() => {
            setIsExtraordinaryActive(true);
            isTransitioning.current = false;
          }, 3000); // Isko 3000ms (3s) rakhein taaki jab tak section slow slide complete kare, tab tak scroll lock rahe.
          return;
        }
      }

      // --- SECTION 1: STANDARD SLIDER LOGIC ---
      if (lockPage.current && !isQuoteActive && !isExtraordinaryActive) {
        if (e.deltaY > 0) {
          e.preventDefault();

          if (index < slides.length - 1) {
            setIsInitial(false);
            setDirection("down");
            isTransitioning.current = true;
            setIndex((prev) => prev + 1);
            setTimeout(() => { isTransitioning.current = false; }, 7500);
          }
          else if (index === slides.length - 1) {
            isTransitioning.current = true;
            setIsLastExiting(true);
            setIsLastEntering(false);
            setDirection("down");

            setTimeout(() => {
              setIsQuoteActive(true);
              if (paragraphRef.current) paragraphRef.current.scrollTop = 0;
              isTransitioning.current = false;
            }, 4500);
          }
        }
        else if (e.deltaY < 0) {
          if (index > 0) {
            e.preventDefault();
            setIsInitial(false);
            setIsLastExiting(false);
            setIsLastEntering(false);
            setDirection("up");
            isTransitioning.current = true;
            setIndex((prev) => prev - 1);
            setTimeout(() => { isTransitioning.current = false; }, 7500);
          }
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      document.body.style.overflow = "unset";
    };
  }, [index, isQuoteActive, isExtraordinaryActive]);

  return (
    <div className={styles.page}>
      {/* 1. Slider Section */}
      <SliderSection
        slides={slides}
        index={index}
        isInitial={isInitial}
        isLastExiting={isLastExiting}
        isLastEntering={isLastEntering}
        direction={direction}
      />

      {/* 2. Quote Section (Yahan hum class wrapper add kar rahe hain parallax ke liye) */}
      <div className={`${styles.quoteWrapper} ${isExtraordinaryEntering ? styles.quoteMovingUp : ''}`}>
        <QuoteSection
          ref={paragraphRef}
          isLastExiting={isLastExiting}
          isLastEntering={isLastEntering}
          isQuoteActive={isQuoteActive}
        />
      </div>

      {/* 3. Extraordinary Section */}
      <ExtraordinarySection
        isEntering={isExtraordinaryEntering}
        isActive={isExtraordinaryActive}
      />
    </div>
  );
}