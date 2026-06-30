'use client'
import { useEffect, useState, useRef } from "react";
import SliderSection from "@/app/components/AboutSections/SliderSection";
import QuoteSection from "@/app/components/AboutSections/QuoteSection";
import styles from "./about.module.css";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1778731525372-0ec34ead8d08?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    line2: "the spaces",
    line3: "we create.",
  },
  {
    image: "https://images.unsplash.com/photo-1776482127999-81dd824eb42c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    line2: "the quality",
    line3: "we stand by.",
  },
  {
    image: "https://images.unsplash.com/photo-1778731525362-d4236da27aa4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
  const [isQuoteActive, setIsQuoteActive] = useState(false);

  const isTransitioning = useRef(false);
  const lockPage = useRef(true);

  useEffect(() => {
    if (lockPage.current) {
      document.body.style.overflow = "hidden";
    }

    const handleWheel = (e: WheelEvent) => {
      if (isTransitioning.current) return;

      if (isQuoteActive && e.deltaY < 0) {
        e.preventDefault();
        isTransitioning.current = true;
        setDirection("up");
        setIsLastExiting(false);
        setIsLastEntering(true);
        setIsQuoteActive(false);
        lockPage.current = true;
        document.body.style.overflow = "hidden";
        setIndex(slides.length - 1);

        setTimeout(() => {
          setIsLastEntering(false);
          isTransitioning.current = false;
        }, 4500);
        return;
      }

      if (window.scrollY < 50 && lockPage.current && !isQuoteActive) {
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
              lockPage.current = false;
              setIsQuoteActive(true);
              document.body.style.overflow = "unset";
              window.scrollTo(0, window.innerHeight);
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

    const handleScroll = () => {
      if (window.scrollY === 0 && !lockPage.current) {
        lockPage.current = true;
        setIsQuoteActive(false);
        document.body.style.overflow = "hidden";
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "unset";
    };
  }, [index, isQuoteActive]);

  return (
    <div className={styles.page}>
      <SliderSection 
        slides={slides}
        index={index}
        isInitial={isInitial}
        isLastExiting={isLastExiting}
        isLastEntering={isLastEntering}
        direction={direction}
      />
      
      <QuoteSection 
        isLastExiting={isLastExiting}
        isLastEntering={isLastEntering}
        isQuoteActive={isQuoteActive}
      />
    </div>
  );
}