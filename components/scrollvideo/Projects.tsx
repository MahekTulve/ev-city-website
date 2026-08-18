"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Projects.module.css";

type Item = {
  id: number;
  name: string;
  label: string;
  blueprint: string;
  photo: string;
};

const items: Item[] = [
  {
    id: 0,
    name: "Marina Bay Heights",
    label: "Waterfront Tower",
    blueprint: "/images/blueprint-marina.webp",
    photo: "/images/building-marina.webp",
  },
  {
    id: 1,
    name: "23 Malibu West",
    label: "Skyline Residence",
    blueprint: "/images/blueprint-malibu.webp",
    photo: "/images/building-malibu.webp",
  },
  {
    id: 2,
    name: "EV 9 Square",
    label: "Urban Landmark",
    blueprint: "/images/blueprint-ev9.webp",
    photo: "/images/building-ev9.webp",
  },
];

const AUTOPLAY_MS = 3500;
const mod = (n: number, m: number) => ((n % m) + m) % m;

export default function Projects() {
  const [centerIndex, setCenterIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const prev = useCallback(() => {
    setCenterIndex((c) => mod(c - 1, items.length));
  }, []);

  const next = useCallback(() => {
    setCenterIndex((c) => mod(c + 1, items.length));
  }, []);

  // Autoplay handler
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setCenterIndex((c) => mod(c + 1, items.length));
    }, AUTOPLAY_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused]);

  // Dynamic relative position calculator for seamless sliding
  const getPositionStyle = (index: number) => {
    const total = items.length;
    const diff = (index - centerIndex + total) % total;

    if (diff === 0) return "center";
    if (diff === 1 || (total === 2 && diff === 1)) return "right";
    if (diff === total - 1) return "left";

    return diff > total / 2 ? "hidden-left" : "hidden-right";
  };

  return (
    <div className={styles.blueprintReveal}>
      <div className={styles.blueprintRevealContainer}>
        <div className={styles.blueprintRevealHeader}>
          <p className={styles.blueprintRevealEyebrow}>
            From Vision to Reality
          </p>
          <h1 className={styles.blueprintRevealTitle}>
            Every Landmark Begins with a Blueprint
          </h1>
        </div>

        <div
          className={styles.blueprintCarousel}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <button
            type="button"
            aria-label="Previous"
            onClick={prev}
            className={`${styles.blueprintCarouselArrow} ${styles.blueprintCarouselArrowPrev}`}
          >
            <ChevronLeft />
          </button>

          <div className={styles.blueprintCarouselTrack}>
            {items.map((item, index) => {
              const position = getPositionStyle(index);
              const isCenter = position === "center";

              const handleClick = () => {
                if (position === "left") prev();
                if (position === "right") next();
              };

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={handleClick}
                  data-position={position}
                  className={styles.blueprintCard}
                  aria-label={item.name}
                >
                  {/* Blueprint Image Base */}
                  <img
                    src={item.blueprint}
                    alt={`${item.name} blueprint`}
                    className={styles.blueprintCardImage}
                  />

                  <img
                    src={item.photo}
                    alt={item.name}
                    className={`${styles.blueprintCardImage} ${styles.blueprintCardPhoto}`}
                  />

                  {/* Scanning sweep effect */}
                  <div className={styles.blueprintCardScan} />

                  {/* Metadata overlay */}
                  <div className={styles.blueprintCardMeta}>
                    <div className={styles.blueprintCardContent}>
                      <span className={styles.blueprintCardLabel}>
                        {item.label}
                      </span>
                      <span className={styles.blueprintCardName}>
                        {item.name}
                      </span>
                      <span className={styles.blueprintCardHint}>
                        {isCenter
                          ? "From Concept to Reality"
                          : "Click to Focus"}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            aria-label="Next"
            onClick={next}
            className={`${styles.blueprintCarouselArrow} ${styles.blueprintCarouselArrowNext}`}
          >
            <ChevronRight />
          </button>
        </div>

        {/* Indicators / Dots */}
        <div className={styles.blueprintCarouselDots}>
          {items.map((it, i) => (
            <button
              key={it.id}
              type="button"
              aria-label={`Go to ${it.name}`}
              onClick={() => setCenterIndex(i)}
              className={`${styles.blueprintCarouselDot} ${
                i === centerIndex ? styles.blueprintCarouselDotActive : ""
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
