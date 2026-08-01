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

/*
 * Scroll timeline
 * 0.08 -> 0.63 : gallery expands into a full-screen video
 * 0.63 -> 0.72 : short full-screen hold
 * 0.72 -> 0.94 : Obsidian-style contraction/reveal phase
 * 0.94 -> 1.00 : hold the final composition before sticky releases
 */
const EXPAND_START = 0.08;
const EXPAND_END = 0.63;
const EXIT_START = 0.72;
const EXIT_END = 0.94;

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
}: {
  item: VideoItem;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playVideo = async () => {
      try {
        await video.play();
      } catch {
        // iOS/Safari can wait until the element is visibly rendered.
      }
    };

    void playVideo();
  }, []);

  return (
    <video
      ref={videoRef}
      className={className}
      src={item.src}
      poster={item.poster}
      aria-label={item.ariaLabel}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      controls={false}
      tabIndex={-1}
      onCanPlay={(event) => {
        event.currentTarget.muted = true;
        void event.currentTarget.play().catch(() => undefined);
      }}
    />
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

  const filter = useTransform(
    progress,
    [0, 0.5, EXPAND_END, 1],
    ["blur(0px)", "blur(0px)", "blur(3px)", "blur(6px)"],
  );

  return (
    <motion.div
      className={`${styles.sideCard} ${className}`}
      style={{ x, y, scale, opacity, filter }}
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 40%", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 27,
    mass: 0.4,
  });

  const layout = useMemo<ResponsiveLayout>(() => {
    if (isMobile) {
      return {
        start: {
          top: "30%",
          left: "5%",
          width: "90%",
          height: "38%",
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
        start: {
          top: "29%",
          left: "20%",
          width: "60%",
          height: "40%",
        },
        exit: {
          top: "8%",
          left: "33%",
          width: "34%",
          height: "54%",
          cardBottomRadius: "145px",
          sceneHeight: "69%",
          sceneBottomRadius: "92px",
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

  const titleRotateX = useTransform(
    smoothProgress,
    [0, 0.05, 0.16, 0.46, 0.61],
    [82, 82, 0, 0, -45],
  );

  const titleY = useTransform(
    smoothProgress,
    [0, 0.05, 0.16, 0.46, 0.61],
    ["12vh", "12vh", "0vh", "0vh", "-18vh"],
  );

  const titleScale = useTransform(
    smoothProgress,
    [0, 0.05, 0.16, 0.46, 0.61],
    [0.72, 0.72, 1, 1, 1.08],
  );

  const titleOpacity = useTransform(
    smoothProgress,
    [0, 0.05, 0.14, 0.48, 0.61],
    [0, 0, 1, 1, 0],
  );

  const titleBlur = useTransform(
    smoothProgress,
    [0, 0.06, 0.16, 0.48, 0.61],
    [
      "blur(18px)",
      "blur(18px)",
      "blur(0px)",
      "blur(0px)",
      "blur(12px)",
    ],
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
                y: titleY,
                scale: titleScale,
                rotateX: titleRotateX,
                opacity: titleOpacity,
                filter: titleBlur,
              }}
            >
              <h2 className={styles.galleryTitle} aria-label="Explore Places">
                <span aria-hidden="true">Explore</span>
                <span aria-hidden="true">Places</span>
              </h2>
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
