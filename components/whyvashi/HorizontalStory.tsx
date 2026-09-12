"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import ConceptSection from "./ConceptSection";
import styles from "./HorizontalStory.module.css";
import VashiDenmark from "../AboutSections/Vashidenmark";

const SCROLL_LENGTH_VH = 650;
const DENMARK_REACH = 0.24;
const DENMARK_HOLD_END = 0.54;
const HORIZONTAL_END = 0.72;
const TIMELINE_START = HORIZONTAL_END;
const TIMELINE_END = 0.92;
const CLOUD_START = 0.91;
const MOBILE_BREAKPOINT = 520;
const MOBILE_SCROLL_LENGTH_VH = 750;
const MOBILE_DENMARK_REACH = 0.23;
const MOBILE_DENMARK_HOLD_END = 0.49;
const MOBILE_HORIZONTAL_END = 0.67;
const MOBILE_TIMELINE_START = MOBILE_HORIZONTAL_END;
const MOBILE_TIMELINE_END = 0.94;
const MOBILE_CLOUD_START = 0.92;
const MOBILE_ROUTE_START_X_VW = 18;
const MOBILE_ROUTE_TRAVEL_VW = 232;
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
    link: "https://9square.co.in",
    x: 36,
    y: 70,
  },
  {
    name: "10 MARINA BAY",
    time: "10 min",
    image: "/images/10-marina.webp",
    link: "https://10marinabay.com",
    x: 285,
    y: 52,
  },
  {
    name: "9 VTC",
    time: "5 min",
    image: "/images/9-vtc.webp",
    link: "https://www.evgroup.in/home.html",
    x: 530,
    y: 66,
  },
  {
    name: "10 HQ",
    time: "4 min",
    image: "/images/10-hq.webp",
    link: "https://www.evgroup.in/home.html",
    x: 775,
    y: 54,
  },
  {
    name: "23 MALIBU WEST",
    time: "20 min",
    image: "/images/23-malibu.webp",
    link: "https://ev23malibuwest.com/",
    x: 1020,
    y: 74,
  },
  {
    name: "CAPITOL 9",
    time: "25 min",
    image: "/images/capitol-9.webp",
    link: "https://www.evgroup.in/home.html",
    x: 1265,
    y: 52,
  },
  {
    name: "PARKSIDE VISTA",
    time: "45 min",
    image: "/images/parkside-vista.webp",
    link: "https://www.evgroup.in/home.html",
    x: PATH_END_X,
    y: 58,
  },
] as const;

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const mapProgress = (value: number, start: number, end: number) =>
  clamp((value - start) / (end - start));

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const update = () => setMatches(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, [query]);

  return matches;
}

export default function HorizontalStory() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const isPhone = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT}px)`);

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

  const horizontalEnd = isPhone ? MOBILE_HORIZONTAL_END : HORIZONTAL_END;
  const denmarkReach = isPhone ? MOBILE_DENMARK_REACH : DENMARK_REACH;
  const denmarkHoldEnd = isPhone ? MOBILE_DENMARK_HOLD_END : DENMARK_HOLD_END;
  const timelineStart = isPhone ? MOBILE_TIMELINE_START : TIMELINE_START;
  const timelineEnd = isPhone ? MOBILE_TIMELINE_END : TIMELINE_END;
  const cloudStart = isPhone ? MOBILE_CLOUD_START : CLOUD_START;
  const shift =
    progress <= denmarkReach
      ? mapProgress(progress, 0, denmarkReach) * 100
      : progress <= denmarkHoldEnd
        ? 100
        : 100 + mapProgress(progress, denmarkHoldEnd, horizontalEnd) * 100;

  const timelineProgress = mapProgress(progress, timelineStart, timelineEnd);
  const cloudProgress = mapProgress(progress, cloudStart, 1);

  const routeRevealProgress = isPhone
    ? Math.max(0.23, timelineProgress)
    : timelineProgress;

  const routeRevealWidth =
    routeRevealProgress >= 0.999
      ? PATH_WIDTH
      : Math.min(PATH_WIDTH, PATH_WIDTH * routeRevealProgress + 2);

  const mobileRouteX =
    MOBILE_ROUTE_START_X_VW - timelineProgress * MOBILE_ROUTE_TRAVEL_VW;

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      style={{
        height: `${isPhone ? MOBILE_SCROLL_LENGTH_VH : SCROLL_LENGTH_VH}vh`,
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
            <VashiDenmark />

            {/* <h2 className={styles.goldenType}>
              <span>THE 5</span>
              <span>MINUTE</span>
              <span>CITY</span>
            </h2>

            <span className={styles.spain}>Vashi</span>

         

            <div className={styles.caption}>
              <p className={styles.captionTitle}>
                Between Mumbai and Navi Mumbai
              </p>

              <p className={styles.captionBody}>
                Surrounded by beaches, golf courses, wellness clubs and
                established neighbourhoods on Marbella&apos;s THE 5 Minute City.
              </p>
            </div> */}
          </div>

          <div className={`${styles.panel} ${styles.coast}`}>
            {/* <video
              className={styles.coastFlower}
              src="/videos/flower-2.webm"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
            /> */}

            <div className={styles.coastHeadingWrap}>
              <span className={styles.coastOrnament} aria-hidden="true">
                ✥
              </span>

              <h2 className={styles.coastHeading}>EVERY ICON, MINUTES AWAY.</h2>

              <span className={styles.coastHeadingDivider} aria-hidden="true">
                <span />
                <i />
                <span />
              </span>
            </div>

            <div className={styles.timeline}>
              <div className={styles.timelineViewport}>
                <div
                  className={styles.routeStage}
                  style={
                    {
                      "--mobile-route-x": `${mobileRouteX}vw`,
                    } as CSSProperties
                  }
                >
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
                      const revealPoint = isPhone
                        ? index <= 1
                          ? 0
                          : ((index - 1) / (STOPS.length - 2)) * 0.88
                        : (index / (STOPS.length - 1)) * 0.94;

                      const dotProgress =
                        isPhone && index <= 1
                          ? 1
                          : mapProgress(
                              timelineProgress,
                              revealPoint,
                              Math.min(
                                1,
                                revealPoint + (isPhone ? 0.05 : 0.055),
                              ),
                            );

                      return (
                        <circle
                          className={styles.timelineDot}
                          key={stop.name}
                          cx={stop.x}
                          cy={stop.y}
                          r={
                            index === 0 || index === STOPS.length - 1 ? 4 : 3.4
                          }
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
                    const revealPoint = isPhone
                      ? index <= 1
                        ? 0
                        : ((index - 1) / (STOPS.length - 2)) * 0.88
                      : (index / (STOPS.length - 1)) * 0.9;

                    const stopProgress =
                      isPhone && index <= 1
                        ? 1
                        : mapProgress(
                            timelineProgress,
                            revealPoint,
                            Math.min(
                              1,
                              revealPoint + (isPhone ? 0.055 : 0.065),
                            ),
                          );

                    const xPercentage = (stop.x / PATH_WIDTH) * 100;

                    const dotBottomRatio = (PATH_HEIGHT - stop.y) / PATH_HEIGHT;

                    return (
                      <div
                        className={styles.stopItem}
                        key={stop.name}
                        data-stop-index={index}
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

                          <a
                            className={styles.stopVisitLink}
                            href={stop.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Visit ${stop.name} project website`}
                          >
                            <span>Visit</span>
                            <svg
                              className={styles.stopVisitArrow}
                              viewBox="0 0 16 16"
                              aria-hidden="true"
                            >
                              <path d="M4 12 12 4M6 4h6v6" />
                            </svg>
                          </a>
                        </span>

                        <span className={styles.stopName}>{stop.name}</span>

                        {/* <span className={styles.stopTime}>{stop.time}</span> */}
                      </div>
                    );
                  })}
                </div>
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
