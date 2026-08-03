"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./CinematicPlacesGallery.module.css";

type VideoItem = {
  id: number;
  src: string;
  poster?: string;
  ariaLabel: string;
};

type SideVideoCardProps = {
  item: VideoItem;
  className: string;
  progress: MotionValue<number>;
  exitX: number;
  exitY: number;
};

type ResponsiveLayout = {
  start: {
    top: string;
    left: string;
    width: string;
    height: string;
  };
  exit: {
    top: string;
    left: string;
    width: string;
    height: string;
    cardBottomRadius: string;
    sceneHeight: string;
    sceneBottomRadius: string;
  };
};

const VIDEOS: VideoItem[] = [
  {
    id: 1,
    src: "/images/vid2.mp4",
    poster: "/images/ocean-room-poster.jpg",
    ariaLabel: "Ocean-facing luxury interior",
  },
  {
    id: 2,
    src: "/images/vid4.mp4",
    poster: "/images/concrete-stairs-poster.jpg",
    ariaLabel: "Modern concrete staircase",
  },
  {
    id: 3,
    src: "/images/vid3.mp4",
    poster: "/images/winter-room-poster.jpg",
    ariaLabel: "Winter landscape interior",
  },
  {
    id: 4,
    src: "/images/vid1.mp4",
    poster: "/images/garden-house-poster.jpg",
    ariaLabel: "Garden house interior",
  },
  {
    id: 5,
    src: "/images/vid5.mp4",
    poster: "/images/vintage-room-poster.jpg",
    ariaLabel: "Vintage plant-filled interior",
  },
  {
    id: 6,
    src: "/images/vid6.mp4",
    poster: "/images/bright-living-room-poster.jpg",
    ariaLabel: "Bright modern living room",
  },
  {
    id: 7,
    src: "/images/vid7.mp4",
    poster: "/images/zen-room-poster.jpg",
    ariaLabel: "Minimal Zen-inspired interior",
  },
];

const SIDE_POSITIONS = [
  { className: styles.topLeft, exitX: -34, exitY: -20 },
  { className: styles.bottomLeft, exitX: -34, exitY: 28 },
  { className: styles.topCenter, exitX: 18, exitY: -36 },
  { className: styles.topRight, exitX: 34, exitY: -20 },
  { className: styles.rightBottom, exitX: 34, exitY: 30 },
  { className: styles.bottomCenter, exitX: -16, exitY: 38 },
];

const EXPAND_START = 0.2;
const EXPAND_END = 0.63;
const EXIT_START = 0.72;
const EXIT_END = 0.94;

const TITLE_LINES = ["Explore", "Places"] as const;
const TITLE_LETTER_COUNT = TITLE_LINES.join("").length;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatch = () => setMatches(mediaQuery.matches);

    updateMatch();
    mediaQuery.addEventListener("change", updateMatch);

    return () => mediaQuery.removeEventListener("change", updateMatch);
  }, [query]);

  return matches;
}

function AutoPlayVideo({
  item,
  className,
  priority = false,
}: {
  item: VideoItem;
  className?: string;
  /** The main/hero video loads eagerly; side videos load only when visible. */
  priority?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  /*
   * Playing 7 videos at once is what makes the section stutter: every visible
   * <video> keeps its own decoder running, even when the section is scrolled
   * far off screen. An IntersectionObserver pauses the decoders that nobody
   * can see and resumes them right before they come back into view.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const play = () => {
      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
        } else if (!video.paused) {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.01 },
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      src={item.src}
      poster={item.poster}
      aria-label={item.ariaLabel}
      muted
      loop
      playsInline
      // Only the hero clip buffers ahead; the side clips fetch on demand so the
      // network/decoder budget isn't spent on 7 parallel streams at load time.
      preload={priority ? "auto" : "none"}
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      tabIndex={-1}
    />
  );
}

function RevealLetter({
  character,
  index,
  progress,
}: {
  character: string;
  index: number;
  progress: MotionValue<number>;
}) {
  const staggerStart = 0.06;
  const staggerEnd = 0.78;
  const letterDuration = 0.24;
  const step =
    TITLE_LETTER_COUNT > 1
      ? (staggerEnd - staggerStart) / (TITLE_LETTER_COUNT - 1)
      : 0;

  const start = staggerStart + index * step;
  const end = Math.min(start + letterDuration, 1);

  // Smooth Fade-In + Horizontal Slide-In from the Left/Right + Blur
  const opacity = useTransform(progress, [start, end], [0, 1]);
  // Slide sideways (from -30px left to 0px)
  const x = useTransform(progress, [start, end], [-30, 0]); 
  const filter = useTransform(
    progress,
    [start, end],
    ["blur(12px)", "blur(0px)"]
  );

  return (
    <motion.span
      className={styles.titleLetter}
      style={{ opacity, x, filter }}
      aria-hidden="true"
    >
      {character}
    </motion.span>
  );
}

function SideVideoCard({
  item,
  className,
  progress,
  exitX,
  exitY,
}: SideVideoCardProps) {
  const x = useTransform(
    progress,
    [0, EXPAND_START, EXPAND_END, 1],
    ["0vw", "0vw", `${exitX}vw`, `${exitX}vw`],
  );

  const y = useTransform(
    progress,
    [0, EXPAND_START, EXPAND_END, 1],
    ["0vh", "0vh", `${exitY}vh`, `${exitY}vh`],
  );

  const scale = useTransform(
    progress,
    [0, EXPAND_START, EXPAND_END, 1],
    [1, 1, 0.86, 0.82],
  );

  const opacity = useTransform(
    progress,
    [0, 0.48, EXPAND_END, 0.69, 1],
    [1, 1, 0.36, 0, 0],
  );

  /*
   * Removed: an animated `filter: blur()` on a playing <video>. Blur forces the
   * browser to re-rasterize every decoded frame on the CPU, per scroll frame,
   * for all 6 side cards - the single biggest source of the stutter. The cards
   * already fade out here, so the visual difference is negligible.
   */

  return (
    <motion.div
      className={`${styles.sideCard} ${className}`}
      style={{ x, y, scale, opacity }}
    >
      <AutoPlayVideo item={item} />
    </motion.div>
  );
}

export default function CinematicPlacesGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery(
    "(min-width: 701px) and (max-width: 1100px)",
  );

  // Keep this progress only for the gallery/card movement.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 40%", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 27,
    mass: 0.4,
  });

  // Separate progress for the heading, so it can reveal earlier without
  // changing the card expansion/movement timing above.
  const { scrollYProgress: titleScrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 88%", "start 28%"],
  });

  const smoothTitleProgress = useSpring(titleScrollYProgress, {
    stiffness: 105,
    damping: 24,
    mass: 0.35,
  });

  const layout = useMemo<ResponsiveLayout>(() => {
    if (isMobile) {
      return {
        start: {
        top: "36%",     // Matches CSS initial top
        left: "17.5%",  // Perfectly centered ( (100% - 65%) / 2 )
        width: "65%",   // Reduced width (down from 90%)
        height: "30%",  // Reduced height (down from 38%)
      },
        exit: {
          top: "8%",
          left: "16%",
          width: "68%",
          height: "52%",
          cardBottomRadius: "108px",
          sceneHeight: "70%",
          sceneBottomRadius: "58px",
        },
      };
    }

    if (isTablet) {
      return {
        // Keep the same visual proportions as the desktop/laptop layout.
        // The previous 60% width made the middle video dominate tablet view.
        start: {
          top: "28%",
          left: "26.6%",
          width: "46.8%",
          height: "34%",
        },
        exit: {
          top: "8%",
          left: "34%",
          width: "32%",
          height: "58%",
          cardBottomRadius: "130px",
          sceneHeight: "72%",
          sceneBottomRadius: "86px",
        },
      };
    }

    return {
      start: {
        top: "28%",
        left: "26.6%",
        width: "46.8%",
        height: "34%",
      },
      exit: {
        top: "8%",
        left: "38%",
        width: "24%",
        height: "80%",
        cardBottomRadius: "190px",
        sceneHeight: "92%",
        sceneBottomRadius: "130px",
      },
    };
  }, [isMobile, isTablet]);

  /* The dark gallery scene contracts to expose the next-section surface. */
  const sceneHeight = useTransform(
    smoothProgress,
    [0, EXIT_START, EXIT_END, 1],
    ["100%", "100%", layout.exit.sceneHeight, layout.exit.sceneHeight],
  );

  const sceneBottomLeftRadius = useTransform(
    smoothProgress,
    [0, EXIT_START, EXIT_END, 1],
    ["0px", "0px", layout.exit.sceneBottomRadius, layout.exit.sceneBottomRadius],
  );

  const sceneBottomRightRadius = useTransform(
    smoothProgress,
    [0, EXIT_START, EXIT_END, 1],
    ["0px", "0px", layout.exit.sceneBottomRadius, layout.exit.sceneBottomRadius],
  );

  const sceneShadowOpacity = useTransform(
    smoothProgress,
    [0, EXIT_START, EXIT_END, 1],
    [0, 0, 0.28, 0.28],
  );

  const mainTop = useTransform(
    smoothProgress,
    [0, EXPAND_START, EXPAND_END, EXIT_START, EXIT_END, 1],
    [
      layout.start.top,
      layout.start.top,
      "0%",
      "0%",
      layout.exit.top,
      layout.exit.top,
    ],
  );

  const mainLeft = useTransform(
    smoothProgress,
    [0, EXPAND_START, EXPAND_END, EXIT_START, EXIT_END, 1],
    [
      layout.start.left,
      layout.start.left,
      "0%",
      "0%",
      layout.exit.left,
      layout.exit.left,
    ],
  );

  const mainWidth = useTransform(
    smoothProgress,
    [0, EXPAND_START, EXPAND_END, EXIT_START, EXIT_END, 1],
    [
      layout.start.width,
      layout.start.width,
      "100%",
      "100%",
      layout.exit.width,
      layout.exit.width,
    ],
  );

  const mainHeight = useTransform(
    smoothProgress,
    [0, EXPAND_START, EXPAND_END, EXIT_START, EXIT_END, 1],
    [
      layout.start.height,
      layout.start.height,
      "100%",
      "100%",
      layout.exit.height,
      layout.exit.height,
    ],
  );

  /*
   * During the exit, the TOP corners stay square and the strong circular
   * treatment is applied to the opposite BOTTOM corners, as requested.
   */
  const mainTopLeftRadius = useTransform(
    smoothProgress,
    [0, EXPAND_START, EXPAND_END, EXIT_START, EXIT_END, 1],
    ["9px", "9px", "0px", "0px", "0px", "0px"],
  );

  const mainTopRightRadius = useTransform(
    smoothProgress,
    [0, EXPAND_START, EXPAND_END, EXIT_START, EXIT_END, 1],
    ["9px", "9px", "0px", "0px", "0px", "0px"],
  );

  const mainBottomLeftRadius = useTransform(
    smoothProgress,
    [0, EXPAND_START, EXPAND_END, EXIT_START, EXIT_END, 1],
    [
      "9px",
      "9px",
      "0px",
      "0px",
      layout.exit.cardBottomRadius,
      layout.exit.cardBottomRadius,
    ],
  );

  const mainBottomRightRadius = useTransform(
    smoothProgress,
    [0, EXPAND_START, EXPAND_END, EXIT_START, EXIT_END, 1],
    [
      "9px",
      "9px",
      "0px",
      "0px",
      layout.exit.cardBottomRadius,
      layout.exit.cardBottomRadius,
    ],
  );

  const mainVideoScale = useTransform(
    smoothProgress,
    [0, EXPAND_START, EXPAND_END, EXIT_START, EXIT_END, 1],
    [1, 1, 1.06, 1.1, 1.02, 1.02],
  );

  const mainCardShadow = useTransform(
    smoothProgress,
    [0, EXPAND_START, EXPAND_END, EXIT_START, EXIT_END, 1],
    [
      "0 30px 90px rgba(0,0,0,.38)",
      "0 30px 90px rgba(0,0,0,.38)",
      "0 0 0 rgba(0,0,0,0)",
      "0 0 0 rgba(0,0,0,0)",
      "0 26px 80px rgba(0,0,0,.34)",
      "0 26px 80px rgba(0,0,0,.34)",
    ],
  );

  const backgroundOpacity = useTransform(
    smoothProgress,
    [0, EXPAND_START, 0.6, EXIT_START, 1],
    [1, 1, 0.42, 0.18, 0.18],
  );

  // Early entrance: controlled only by the dedicated heading progress.
  const titleEntranceRotateX = useTransform(
    smoothTitleProgress,
    [0, 0.22, 1],
    [76, 76, 0],
  );

  const titleEntranceY = useTransform(
    smoothTitleProgress,
    [0, 0.22, 1],
    ["9vh", "9vh", "0vh"],
  );

  const titleEntranceScale = useTransform(
    smoothTitleProgress,
    [0, 0.22, 1],
    [0.78, 0.78, 1],
  );

  // Exit remains attached to the gallery progress, preserving your old timing.
  const titleExitY = useTransform(
    smoothProgress,
    [0, 0.46, 0.61],
    ["0vh", "0vh", "-18vh"],
  );

  const titleExitRotateX = useTransform(
    smoothProgress,
    [0, 0.46, 0.61],
    [0, 0, -45],
  );

  const titleExitScale = useTransform(
    smoothProgress,
    [0, 0.46, 0.61],
    [1, 1, 1.08],
  );

  const titleExitOpacity = useTransform(
    smoothProgress,
    [0, 0.48, 0.61],
    [1, 1, 0],
  );

  const titleExitBlur = useTransform(
    smoothProgress,
    [0, 0.48, 0.61],
    ["blur(0px)", "blur(0px)", "blur(12px)"],
  );

  const mainVideo = VIDEOS[1];
  const sideVideos = VIDEOS.filter(
    (video) => video.id !== mainVideo.id,
  ).slice(0, 6);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stickyContainer}>
        {/*
          Match --gallery-next-bg with the background of the section that
          comes immediately after this component.
        */}
        <div className={styles.exitSurface} aria-hidden="true" />

        <motion.div
          className={styles.sceneClip}
          style={{
            height: sceneHeight,
            borderBottomLeftRadius: sceneBottomLeftRadius,
            borderBottomRightRadius: sceneBottomRightRadius,
          }}
        >
          <div className={styles.sceneCanvas}>
            <motion.div
              className={styles.sceneShadow}
              style={{ opacity: sceneShadowOpacity }}
              aria-hidden="true"
            />

            <motion.div
              className={styles.backgroundDecoration}
              style={{ opacity: backgroundOpacity }}
            >
              <div className={styles.backgroundGlow} />
            </motion.div>

            <motion.div
              className={styles.titleStage}
              style={{
                y: titleExitY,
                scale: titleExitScale,
                rotateX: titleExitRotateX,
                opacity: titleExitOpacity,
                filter: titleExitBlur,
              }}
            >
              <motion.div
                className={styles.titleEntrance}
                style={{
                  y: titleEntranceY,
                  scale: titleEntranceScale,
                  rotateX: titleEntranceRotateX,
                }}
              >
                <h2 className={styles.galleryTitle} aria-label="Explore Places">
                  {TITLE_LINES.map((line, lineIndex) => {
                    const lineOffset = TITLE_LINES.slice(0, lineIndex).reduce(
                      (total, currentLine) => total + currentLine.length,
                      0,
                    );

                    return (
                      <span
                        key={line}
                        className={styles.titleLine}
                        aria-hidden="true"
                      >
                        {Array.from(line).map((character, characterIndex) => (
                          <RevealLetter
                            key={`${line}-${characterIndex}`}
                            character={character}
                            index={lineOffset + characterIndex}
                            progress={smoothTitleProgress}
                          />
                        ))}
                      </span>
                    );
                  })}
                </h2>
              </motion.div>
            </motion.div>

            <div className={styles.gallery}>
              {sideVideos.map((item, index) => {
                const position = SIDE_POSITIONS[index];

                return (
                  <SideVideoCard
                    key={item.id}
                    item={item}
                    className={position.className}
                    progress={smoothProgress}
                    exitX={position.exitX}
                    exitY={position.exitY}
                  />
                );
              })}

              <motion.div
                className={styles.mainCard}
                style={{
                  top: mainTop,
                  left: mainLeft,
                  width: mainWidth,
                  height: mainHeight,
                  borderTopLeftRadius: mainTopLeftRadius,
                  borderTopRightRadius: mainTopRightRadius,
                  borderBottomLeftRadius: mainBottomLeftRadius,
                  borderBottomRightRadius: mainBottomRightRadius,
                  boxShadow: mainCardShadow,
                }}
              >
                <motion.div
                  className={styles.mainVideoWrapper}
                  style={{ scale: mainVideoScale }}
                >
                  <AutoPlayVideo
                    item={mainVideo}
                    className={styles.mainVideo}
                    priority
                  />
                </motion.div>

                <div className={styles.mainVideoOverlay} />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
