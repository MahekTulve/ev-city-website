"use client";

import { useEffect, useId, useRef, useState } from "react";
import ConceptSection from "./ConceptSection";
import styles from "./HorizontalStory.module.css";
import ViewportVideo from "../performance/ViewportVideo";

const PANELS = 3;
const SCROLL_LENGTH_VH = 400;

const HORIZONTAL_END = 0.6;
const TIMELINE_START = 0.55;
const TIMELINE_END = 0.85;

// The cloud bridge fades in as the sticky section hands over to VashiLetter.
const CLOUD_START = 0.82;

const PATH_WIDTH = 1480;
const PATH_HEIGHT = 100;
const PATH_SIDE_PADDING = 36;
const PATH_END_X = PATH_WIDTH - PATH_SIDE_PADDING;

const PATH_D = [
  "M36 70",
  "C120 72 205 46 285 52",
  "C380 58 445 72 530 66",
  "C625 60 690 45 775 54",
  "C875 64 915 82 1020 74",
  "C1110 67 1170 45 1265 52",
  `C1340 57 1395 58 ${PATH_END_X} 58`,
].join(" ");

const STOPS = [
  {
    name: "9 SQUARE",
    time: "50 min",
    image: "/images/9-square.webp",
    x: 36,
    y: 70,
  },
  {
    name: "10 MARINA BAY",
    time: "10 min",
    image: "/images/10-marina.webp",
    x: 285,
    y: 52,
  },
  {
    name: "9 VTC",
    time: "5 min",
    image: "/images/9-vtc.webp",
    x: 530,
    y: 66,
  },
  {
    name: "10 HQ",
    time: "4 min",
    image: "/images/10-hq.webp",
    x: 775,
    y: 54,
  },
  {
    name: "23 MALIBU WEST",
    time: "20 min",
    image: "/images/23-malibu.webp",
    x: 1020,
    y: 74,
  },
  {
    name: "CAPITOL 9",
    time: "25 min",
    image: "/images/capitol-9.webp",
    x: 1265,
    y: 52,
  },
  {
    name: "PARKSIDE VISTA",
    time: "45 min",
    image: "/images/parkside-vista.webp",
    x: PATH_END_X,
    y: 58,
  },
] as const;

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const mapProgress = (value: number, start: number, end: number) =>
  clamp((value - start) / (end - start));

export default function HorizontalStory() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const generatedId = useId();
  const routeClipId = `route-clip-${generatedId.replace(/:/g, "")}`;

  useEffect(() => {
    let targetProgress = 0;
    let displayedProgress = 0;
    let animationFrame = 0;
    let initialized = false;

    const measureProgress = () => {
      const wrapper = wrapperRef.current;

      if (!wrapper) {
        return 0;
      }

      const rect = wrapper.getBoundingClientRect();

      const scrollableDistance = wrapper.offsetHeight - window.innerHeight;

      if (scrollableDistance <= 0) {
        return 0;
      }

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

    window.addEventListener("scroll", updateTarget, {
      passive: true,
    });

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

  const timelineProgress = mapProgress(progress, TIMELINE_START, TIMELINE_END);

  const cloudProgress = mapProgress(progress, CLOUD_START, 1);

  const shift = horizontalProgress * (PANELS - 1) * 100;

  const routeRevealWidth =
    timelineProgress >= 0.999
      ? PATH_WIDTH
      : Math.min(PATH_WIDTH, PATH_WIDTH * timelineProgress + 2);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      style={{
        height: `${SCROLL_LENGTH_VH}vh`,
      }}
    >
      <div className={styles.sticky}>
        <div
          className={styles.track}
          style={{
            transform: `translate3d(-${shift}vw, 0, 0)`,
          }}
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
              src="/images/why-vashi.webp"
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
            <ViewportVideo
              className={styles.coastFlower}
              src="/videos/flower2.webm"
              aria-hidden="true"
            />

            <div className={styles.coastHeadingWrap}>
              <span className={styles.coastOrnament} aria-hidden="true">
                ✥
              </span>

              <h2 className={styles.coastHeading}>
                EVERY ICON, MINUTES AWAY.
              </h2>

              <span className={styles.coastHeadingDivider} aria-hidden="true">
                <span />
                <i />
                <span />
              </span>
            </div>

            <div className={styles.timeline}>
              <div className={styles.routeStage}>
                <svg
                  className={styles.timelineSvg}
                  viewBox={`0 0 ${PATH_WIDTH} ${PATH_HEIGHT}`}
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <defs>
                    <clipPath id={routeClipId} clipPathUnits="userSpaceOnUse">
                      <rect
                        x="0"
                        y="-10"
                        width={routeRevealWidth}
                        height={PATH_HEIGHT + 20}
                      />
                    </clipPath>
                  </defs>

                  <path
                    className={styles.timelinePath}
                    d={PATH_D}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                    clipPath={`url(#${routeClipId})`}
                  />

                  {STOPS.map((stop, index) => {
                    const revealPoint = (index / (STOPS.length - 1)) * 0.94;

                    const dotProgress = mapProgress(
                      timelineProgress,
                      revealPoint,
                      Math.min(1, revealPoint + 0.055),
                    );

                    return (
                      <circle
                        className={styles.timelineDot}
                        key={stop.name}
                        cx={stop.x}
                        cy={stop.y}
                        r={index === 0 || index === STOPS.length - 1 ? 4 : 3.4}
                        fill="currentColor"
                        style={{
                          opacity: dotProgress,
                          transform: `scale(${0.25 + dotProgress * 0.75})`,
                        }}
                      />
                    );
                  })}
                </svg>

                {STOPS.map((stop, index) => {
                  const revealPoint = (index / (STOPS.length - 1)) * 0.9;

                  const stopProgress = mapProgress(
                    timelineProgress,
                    revealPoint,
                    Math.min(1, revealPoint + 0.065),
                  );

                  const xPercentage = (stop.x / PATH_WIDTH) * 100;

                  const dotBottomRatio = (PATH_HEIGHT - stop.y) / PATH_HEIGHT;

                  return (
                    <div
                      className={styles.stopItem}
                      key={stop.name}
                      style={{
                        left: `${xPercentage}%`,
                        bottom: `calc(var(--route-height) * ${dotBottomRatio} + var(--stop-gap))`,
                        opacity: stopProgress,
                        transform: `translateX(-50%) translateY(${
                          (1 - stopProgress) * 20
                        }px) scale(${0.9 + stopProgress * 0.1})`,
                      }}
                    >
                      <span className={styles.stopArtwork}>
                        <img
                          className={`${styles.stopImage} ${
                            stop.name === "9 VTC"
                              ? styles.vtcImage
                              : stop.name === "23 MALIBU WEST"
                                ? styles.malibuImage
                                : ""
                          }`}
                          src={stop.image}
                          alt={`${stop.name} building`}
                          loading="lazy"
                        />
                      </span>

                      <span className={styles.stopName}>{stop.name}</span>

                      <span className={styles.stopTime}>{stop.time}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          className={styles.cloudVeil}
          aria-hidden="true"
          style={{ opacity: cloudProgress }}
        />

        <div
          className={styles.clouds}
          aria-hidden="true"
          style={{ opacity: cloudProgress }}
        >
          <div className={styles.cloudCore} />

          <div className={styles.cloudTrack}>
            {[0, 1].map((groupIndex) => (
              <div className={styles.cloudGroup} key={groupIndex}>
                {[0, 1, 2, 3].map((itemIndex) => {
                  const flipped = itemIndex % 2 === 1;

                  return (
                    <div className={styles.cloudItem} key={itemIndex}>
                      <img
                        src="/images/cloud_5.avif"
                        alt=""
                        className={`${styles.cloudImage} ${
                          flipped ? styles.cloudImageFlipped : ""
                        } ${
                          itemIndex === 1
                            ? styles.cloudImageB
                            : itemIndex === 2
                              ? styles.cloudImageC
                              : itemIndex === 3
                                ? styles.cloudImageD
                                : styles.cloudImageA
                        }`}
                        draggable={false}
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.sectionSeamBridge} aria-hidden="true">
        <div className={styles.sectionSeamMist} />

        <div
          className={`${styles.sectionSeamTexture} ${styles.sectionSeamBack}`}
        />

        <div
          className={`${styles.sectionSeamTexture} ${styles.sectionSeamMiddle}`}
        />

        <div
          className={`${styles.sectionSeamTexture} ${styles.sectionSeamFront}`}
        />

        <div className={styles.sectionSeamCore} />
      </div>
    </div>
  );
}