"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./ScrollCarousel.module.css";
export type Slide = {
  id: string | number;
  title: string;
  location: string;
  description: string;
  image: string;
};
interface ScrollCarouselProps {
  slides: Slide[];
  /** Scroll distance per slide in viewport heights. Default 1.1. */
  slideHeight?: number;
}
/**
 * Scroll-driven horizontal carousel.
 * - Section pins (sticky) for the full duration.
 * - Slides cross-fade with a subtle image scale/parallax.
 * - A single full-width timeline at the bottom fills as you scroll.
 */
export default function ScrollCarousel({ slides, slideHeight = 1.1 }: ScrollCarouselProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0..slides.length
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? (scrolled / total) * slides.length : 0;
      setProgress(p);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [slides.length]);
  const totalProgress = slides.length > 0 ? progress / slides.length : 0;
  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      style={{ height: `${slides.length * slideHeight * 100}vh` }}
    >
      <div className={styles.sticky}>
        {slides.map((slide, i) => {
          const distance = i - progress; // -inf..+inf, 0 = active
          const abs = Math.abs(distance);
          // Cross-fade window (only current + neighbor visible)
          const opacity = abs >= 1 ? 0 : 1 - abs;
          // Subtle Ken-Burns style parallax
          const scale = 1.05 - Math.min(0.05, abs * 0.05);
          // Incoming from right, outgoing to left — small offset
          const translateX = distance * 8; // percent
          // Text: rise/fall + fade with the same window
          const textOpacity = opacity;
          const textY = distance * 30; // px
          return (
            <div
              key={slide.id}
              className={styles.slide}
              style={{
                opacity,
                zIndex: slides.length - Math.round(abs),
                pointerEvents: abs < 0.5 ? "auto" : "none",
              }}
              aria-hidden={abs >= 0.5}
            >
              <div
                className={styles.imageWrap}
                style={{
                  transform: `translate3d(${translateX}%, 0, 0) scale(${scale})`,
                }}
              >
                <img src={slide.image} alt={slide.title} className={styles.image} />
                <div className={styles.overlay} />
              </div>
              <div className={styles.content}>
                <div className={styles.contentOverlay} />
                <h2
                  className={styles.title}
                  style={{
                    opacity: textOpacity,
                    transform: `translateY(${textY}px)`,
                  }}
                >
                  {slide.title}
                </h2>
                <div
                  className={styles.copy}
                  style={{
                    opacity: textOpacity,
                    transform: `translateY(${textY}px)`,
                  }}
                >
                  <p className={styles.description}>{slide.description}</p>
                  <button className={styles.button}>Learn More</button>
                </div>
                <div
                  className={styles.location}
                  style={{ opacity: textOpacity }}
                >
                  <span className={styles.pin} aria-hidden />
                  {slide.location}
                </div>
              </div>
            </div>
          );
        })}
        {/* Single shared timeline — full width, fills with overall scroll */}
        <div className={styles.timeline}>
          <div
            className={styles.timelineFill}
            style={{ width: `${Math.min(1, totalProgress) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}