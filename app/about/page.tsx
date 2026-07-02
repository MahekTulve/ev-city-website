'use client'
import { useEffect, useState, useRef } from "react";
import SliderSection from "@/components/AboutSections/SliderSection";
import QuoteSection from "@/components/AboutSections/QuoteSection";
import ExtraordinarySection from "@/components/AboutSections/ExtraordinarySection";
import styles from "./about.module.css";
import VideoSection from "@/components/AboutSections/VideoSection";
import FinalTextSection from "@/components/AboutSections/FinalTextSection";

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
  const [isVideoActive, setIsVideoActive] = useState(false);
  // Section states
  const [isQuoteActive, setIsQuoteActive] = useState(false);

  // Nayi states 3rd section ke animation ko lock aur trigger karne ke liye
  const [isExtraordinaryActive, setIsExtraordinaryActive] = useState(false);
  const [isExtraordinaryFinal, setIsExtraordinaryFinal] = useState(false);
  const [isExtraordinaryStepThree, setIsExtraordinaryStepThree] = useState(false); // Nayi state
  const [isExtraordinaryEntering, setIsExtraordinaryEntering] = useState(false);
  const [isExtraordinaryStepFour, setIsExtraordinaryStepFour] = useState(false);
  const [isVideoMinimize, setIsVideoMinimize] = useState(false);
  const [isFinalTextActive, setIsFinalTextActive] = useState(false);
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
        if (e.deltaY > 0) {
          if (!isExtraordinaryFinal) {
            e.preventDefault();
            isTransitioning.current = true;
            setIsExtraordinaryFinal(true);
            setTimeout(() => { isTransitioning.current = false; }, 1200);
            return;
          }
          else if (!isExtraordinaryStepThree) {
            e.preventDefault();
            isTransitioning.current = true;
            setIsExtraordinaryStepThree(true);
            setTimeout(() => { isTransitioning.current = false; }, 1500);
            return;
          }
          else if (!isExtraordinaryStepFour) {
            e.preventDefault();
            isTransitioning.current = true;
            setIsExtraordinaryStepFour(true);
            setTimeout(() => { isTransitioning.current = false; }, 1500);
            return;
          }
          // NEW SCROLL 5: Video Section Reveal Trigger!
          else if (!isVideoActive) {
            e.preventDefault();
            isTransitioning.current = true;
            setIsVideoActive(true); // Video section triggers here!
            setTimeout(() => { isTransitioning.current = false; }, 1500);
            return;
          }
          else if (!isVideoMinimize) {
            e.preventDefault();
            isTransitioning.current = true;
            setIsVideoMinimize(true); // Video minimize trigger!
            setTimeout(() => { isTransitioning.current = false; }, 1500);
            return;
          }
          else if (!isFinalTextActive) {
            e.preventDefault();
            isTransitioning.current = true;
            setIsFinalTextActive(true); // Final Curtain effect trigger!
            setTimeout(() => { isTransitioning.current = false; }, 1500);
            return;
          }
          return;
        }

        if (e.deltaY < 0) {
          e.preventDefault();
          isTransitioning.current = true;

         if (isFinalTextActive) {
            setIsFinalTextActive(false);
            setTimeout(() => { isTransitioning.current = false; }, 1200);
          } else if (isVideoMinimize) {
            setIsVideoMinimize(false);
            setTimeout(() => { isTransitioning.current = false; }, 1200);
          } else if (isVideoActive) {
            setIsVideoActive(false);
            setTimeout(() => { isTransitioning.current = false; }, 1200);
          } else if (isExtraordinaryStepFour) {
            setIsExtraordinaryStepFour(false);
            setTimeout(() => { isTransitioning.current = false; }, 1200);
          } else if (isExtraordinaryStepThree) {
            setIsExtraordinaryStepThree(false);
            setTimeout(() => { isTransitioning.current = false; }, 1200);
          } else if (isExtraordinaryFinal) {
            setIsExtraordinaryFinal(false);
            setTimeout(() => { isTransitioning.current = false; }, 1200);
          } else {
            setDirection("up");
            setIsExtraordinaryActive(false);
            setIsExtraordinaryEntering(false);
            setIsQuoteActive(true);
            setTimeout(() => { isTransitioning.current = false; }, 1200);
          }
          return;
        }
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
          }, 2000); // 4500ms bohot zyada laggy tha, optimized to 2s
          return;
        }

        // Section 2 se Section 3 par jaane ka trigger
        if (e.deltaY > 0) {
          e.preventDefault();
          isTransitioning.current = true;
          setDirection("down");

          setIsQuoteActive(false);
          setIsExtraordinaryEntering(true);

          // TIMING OPTIMIZED: 3000ms ke bade block ko 1200ms kiya taaki user ko wait na karna pade
          setTimeout(() => {
            setIsExtraordinaryActive(true);
            isTransitioning.current = false;
          }, 1200);
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
  }, [index, isQuoteActive, isExtraordinaryActive, isExtraordinaryFinal, isExtraordinaryStepThree, isExtraordinaryStepFour, isVideoActive, isVideoMinimize, isFinalTextActive]);

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
        isFinal={isExtraordinaryFinal} // Naya prop pass kiya
        isStepThree={isExtraordinaryStepThree}
        isStepFour={isExtraordinaryStepFour}
        isVideoActive={isVideoActive}
      />
      <VideoSection isActive={isVideoActive}
        isMinimized={isVideoMinimize}
        isFinalText={isFinalTextActive}
      />
      <FinalTextSection isActive={isFinalTextActive} />
    </div>
  );
}