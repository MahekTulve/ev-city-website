"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import ConceptSection from "./ConceptSection";
import styles from "./HorizontalStory.module.css";

const PANELS = 3;
const SCROLL_LENGTH_VH = 420;
const HORIZONTAL_END = 0.72;
const TIMELINE_START = 0.75;

const PATH_D =
  "M20 70 C 120 76 180 30 280 34 C 360 37 380 58 470 54 C 540 51 560 34 640 38 C 720 42 730 74 800 68 C 860 63 880 26 980 30 C 1080 34 1220 52 1460 48";

const STOPS = [
  {
    name: "9 SQUARE",
    time: "50 min",
    image: "/images/9-square.png",
    x: -200,
    y: 70,
  },
  {
    name: "10 MARINA BAY",
    time: "10 min",
    image: "/images/10-marina.png",
    x: 280,
    y: 34,
  },
  {
    name: "9 VTC",
    time: "5 min",
    image: "/images/9-vtc.png",
    x: 440,
    y: 54,
  },
  {
    name: "10 HQ",
    time: "4 min",
    image: "/images/10-hq.png",
    x: 640,
    y: 38,
  },
  {
    name: "23 MALIBU WEST",
    time: "20 min",
    image: "/images/23-malibu.png",
    x: 800,
    y: 68,
  },
  {
    name: "CAPITOL 9",
    time: "25 min",
    image: "/images/capitol-9.png",
    x: 980,
    y: 30,
  },
  {
    name: "PARKSIDE VISTA",
    time: "45 min",
    image: "/images/parkside-vista.png",
    x: 1420,
    y: 48,
  },
];

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const mapProgress = (value: number, start: number, end: number) =>
  clamp((value - start) / (end - start));

export default function HorizontalStory() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let targetProgress = 0;
    let displayedProgress = 0;
    let animationFrame = 0;
    let initialized = false;

    const measureProgress = () => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return 0;

      const rect = wrapper.getBoundingClientRect();
      const scrollableDistance = wrapper.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) return 0;
      return clamp(-rect.top / scrollableDistance);
    };

    const animateToTarget = () => {
      displayedProgress += (targetProgress - displayedProgress) * 0.12;

      if (Math.abs(targetProgress - displayedProgress) < 0.0001) {
        displayedProgress = targetProgress;
      }

      setProgress(displayedProgress);

      if (displayedProgress !== targetProgress) {
        animationFrame = window.requestAnimationFrame(animateToTarget);
      } else {
        animationFrame = 0;
      }
    };

    const updateTarget = () => {
      targetProgress = measureProgress();

      if (!initialized) {
        initialized = true;
        displayedProgress = targetProgress;
        setProgress(displayedProgress);
        return;
      }

      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(animateToTarget);
      }
    };

    updateTarget();
    window.addEventListener("scroll", updateTarget, { passive: true });
    window.addEventListener("resize", updateTarget);

    return () => {
      window.removeEventListener("scroll", updateTarget);
      window.removeEventListener("resize", updateTarget);

      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  const horizontalProgress = mapProgress(progress, 0, HORIZONTAL_END);
  const timelineProgress = mapProgress(progress, TIMELINE_START, 1);
  const shift = horizontalProgress * (PANELS - 1) * 100;

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      style={{ height: `${SCROLL_LENGTH_VH}vh` }}
    >
      <div className={styles.sticky}>
   

        <div className={styles.rail}>
          <span className={styles.railNumber}>
            {String(Math.round(progress * 15)).padStart(2, "0")}
          </span>
          <span className={styles.railLabel}>Scroll</span>
          <span className={styles.railLine} />
        </div>

        <div
          className={styles.track}
          style={{ transform: `translate3d(-${shift}vw, 0, 0)` }}
        >
          <div className={styles.panel}>
            <ConceptSection hideChrome />
          </div>

          <div className={`${styles.panel} ${styles.golden}`}>
            <h2 className={styles.goldenType}>
              <span>THE 5</span>
              <span>MINUTE</span>
              <span>CITY</span>
            </h2>

            <span className={styles.spain}>Vashi</span>

            <img
              className={styles.goldenImage}
              src="/images/why-vashi.png"
              alt="Terrace with sea views and flowering plants"
              loading="lazy"
              width={912}
              height={900}
            />

            <div className={styles.caption}>
              <p className={styles.captionTitle}>
                Between Mumbai and Navi Mumbai
              </p>
              <p className={styles.captionBody}>
                Surrounded by beaches, golf courses, wellness clubs and
                established neighbourhoods on Marbella&apos;s THE 5 Minute City.
              </p>
            </div>
          </div>

          <div className={`${styles.panel} ${styles.coast}`}>
            <video
              className={styles.coastFlower}
              src="/videos/flower2.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            />

            {/* Coast title intentionally hidden for now. */}

            <div className={styles.timeline}>
              <div className={styles.routeStage}>
              <svg
  className={styles.timelineSvg}
  viewBox="0 0 1480 90"
  preserveAspectRatio="none"
  aria-hidden="true"
>
  <path
    className={styles.timelinePath}
    d={PATH_D}
    pathLength={1}
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    vectorEffect="non-scaling-stroke"
    style={{
      strokeDasharray: 1,
      strokeDashoffset: 1 - timelineProgress,
    }}
  />

  {/* Start Dot (Coordinates matching M20 70) */}
  <circle
    className={styles.timelineEndDot}
    cx={20}
    cy={70}
    r="4"
    fill="currentColor"
    style={{
      opacity: mapProgress(timelineProgress, 0, 0.05),
      transform: `scale(${0.25 + mapProgress(timelineProgress, 0, 0.05) * 0.75})`,
    }}
  />

  {/* Intermediate stop dots only.
      Skip the first stop because it sits before the visible route,
      and skip the last stop because the dedicated end dot is used there. */}
  {STOPS.slice(1, -1).map((stop, slicedIndex) => {
    const index = slicedIndex + 1;
    const revealPoint = (index / (STOPS.length - 1)) * 0.9;
    const dotProgress = mapProgress(
      timelineProgress,
      revealPoint,
      Math.min(1, revealPoint + 0.055)
    );

    return (
      <circle
        className={styles.timelineDot}
        key={stop.name}
        cx={stop.x}
        cy={stop.y}
        r="3.4"
        fill="currentColor"
        style={{
          opacity: dotProgress,
          transform: `scale(${0.25 + dotProgress * 0.75})`,
        }}
      />
    );
  })}

  {/* End dot exactly matches the PATH_D endpoint: 1460, 48. */}
  <circle
    className={styles.timelineEndDot}
    cx={1460}
    cy={48}
    r="4"
    fill="currentColor"
    style={{
      opacity: mapProgress(timelineProgress, 0.95, 1),
      transform: `scale(${0.25 + mapProgress(timelineProgress, 0.95, 1) * 0.75})`,
    }}
  />
</svg>

                {STOPS.map((stop, index) => {
                  const revealPoint =
                    (index / (STOPS.length - 1)) * 0.9;
                  const stopProgress = mapProgress(
                    timelineProgress,
                    revealPoint,
                    Math.min(1, revealPoint + 0.065),
                  );

                  const xPercentage = (stop.x / 1200) * 100;
                  const xTranslation =
                    index === 0
                      ? "0%"
                      : index === STOPS.length - 1
                        ? "-100%"
                        : "-50%";

                  // Keeps the complete stop group directly above its SVG dot.
                  const dotBottomRatio = (90 - stop.y) / 90;

                  return (
                    <Fragment key={stop.name}>
                      <div
                        className={styles.stopItem}
                        style={{
                          left: `${xPercentage}%`,
                          bottom: `calc(var(--route-height) * ${dotBottomRatio} + var(--stop-gap))`,
                          opacity: stopProgress,
                          transform: `translateX(${xTranslation}) translateY(${
                            (1 - stopProgress) * 20
                          }px) scale(${0.9 + stopProgress * 0.1})`,
                        }}
                      >
                        <span
                          className={styles.stopArtwork}
                          // style={{
                          //   clipPath: `inset(${(1 - stopProgress) * 100}% 0 0 0)`,
                          // }}
                        >
                          <img
                            className={styles.stopImage}
                            src={stop.image}
                            alt={`${stop.name} building`}
                            loading="lazy"
                          />
                        </span>

                        <span className={styles.stopName}>{stop.name}</span>
                        <span className={styles.stopTime}>{stop.time}</span>
                      </div>
                    </Fragment>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
