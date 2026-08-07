"use client";

import {
  motion,
  useMotionValueEvent,
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
  mobileSrc?: string;
  poster?: string;
  ariaLabel: string;
};

type SideVideoCardProps = {
  item: VideoItem;
  src: string;
  className: string;
  progress: MotionValue<number>;
  exitX: number;
  exitY: number;
  shouldPlay: boolean;
  startDelay: number;
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
    src: "/images/square-1.mp4",
    poster: "/images/ocean-room-poster.jpg",
    ariaLabel: "Ocean-facing luxury interior",
  },
  {
    id: 2,
    src: "/videos/city-desktop.mp4",
    mobileSrc: "/videos/city-mob.mp4",
    poster: "/images/concrete-stairs-poster.jpg",
    ariaLabel: "Modern city view",
  },
  {
    id: 3,
    src: "/images/rectangle-1.mp4",
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
    src: "/images/16x9.mp4",
    poster: "/images/vintage-rd oom-poster.jpg",
    ariaLabel: "Vintage plant-filled interior",
  },
  {
    id: 6,
    src: "/images/square-2.mp4",
    poster: "/images/bright-living-room-poster.jpg",
    ariaLabel: "Bright modern living room",
  },
  {
    id: 7,
    src: "/images/rectangle-2.mp4",
    poster: "/images/zen-room-poster.jpg",
    ariaLabel: "Minimal Zen-inspired interior",
  },
];

const SIDE_POSITIONS = [
  { className: styles.topLeft, exitX: -34, exitY: -20 },
  { className: styles.bottomLeft, exitX: -34, exitY: 28 },
  { className: styles.topCenter, exitX: 0, exitY: -36 },
  { className: styles.topRight, exitX: 34, exitY: -20 },
  { className: styles.rightBottom, exitX: 34, exitY: 20 },
  { className: styles.bottomCenter, exitX: 0, exitY: 38 },
] as const;

const EXPAND_START = 0.2;
const EXPAND_END = 0.63;
const EXIT_START = 0.72;
const EXIT_END = 0.94;
const SIDE_VIDEO_PAUSE_POINT = 0.69;

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

function usePageVisible() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const update = () => setIsVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return isVisible;
}

function AutoPlayVideo({
  item,
  src,
  className,
  shouldPlay,
  priority = false,
  startDelay = 0,
}: {
  item: VideoItem;
  src: string;
  className?: string;
  shouldPlay: boolean;
  priority?: boolean;
  startDelay?: number;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasFrame, setHasFrame] = useState(false);

  useEffect(() => {
    setHasFrame(false);
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let playTimer: number | undefined;
    let cancelled = false;

    video.muted = true;
    video.defaultMuted = true;

    const pauseVideo = () => {
      if (playTimer !== undefined) {
        window.clearTimeout(playTimer);
        playTimer = undefined;
      }

      if (!video.paused) video.pause();
    };

    const playVideo = () => {
      pauseVideo();

      if (!shouldPlay || document.visibilityState !== "visible") return;

      playTimer = window.setTimeout(() => {
        if (cancelled || !shouldPlay || document.visibilityState !== "visible") {
          return;
        }

        void video.play().catch(() => {
          // Autoplay can briefly fail while the source is still buffering.
          // If this fails, the next visibility/play-state change will retry it.
        });
      }, startDelay);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") playVideo();
      else pauseVideo();
    };

    const handleCanPlay = () => {
      // Only reveal the first decodable frame here.
      // Do NOT call play() from canplay: doing so bypasses startDelay and
      // makes all desktop decoders start together.
      setHasFrame(true);
    };

    video.addEventListener("canplay", handleCanPlay);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    playVideo();

    return () => {
      cancelled = true;
      pauseVideo();
      video.removeEventListener("canplay", handleCanPlay);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [shouldPlay, src, startDelay]);

  return (
    <video
      ref={videoRef}
      key={src}
      className={[
        styles.videoElement,
        hasFrame ? styles.videoReady : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      src={src}
      poster={item.poster}
      aria-label={item.ariaLabel}
      muted
      loop
      playsInline
      preload={priority || shouldPlay ? "auto" : "metadata"}
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      tabIndex={-1}
      onLoadedData={() => setHasFrame(true)}
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

  const opacity = useTransform(progress, [start, end], [0, 1]);
  const x = useTransform(progress, [start, end], [-30, 0]);
  const filter = useTransform(
    progress,
    [start, end],
    ["blur(12px)", "blur(0px)"],
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
  src,
  className,
  progress,
  exitX,
  exitY,
  shouldPlay,
  startDelay,
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
    [0, 0.48, EXPAND_END, SIDE_VIDEO_PAUSE_POINT, 1],
    [1, 1, 0.36, 0, 0],
  );

  return (
    <motion.div
      className={`${styles.sideCard} ${className}`}
      style={{ x, y, scale, opacity }}
    >
      <AutoPlayVideo
        item={item}
        src={src}
        shouldPlay={shouldPlay}
        startDelay={startDelay}
      />
    </motion.div>
  );
}

export default function CinematicPlacesGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isSmallMobile = useMediaQuery("(max-width: 480px)");
  const isTablet = useMediaQuery(
    "(min-width: 701px) and (max-width: 1100px)",
  );
  const isPageVisible = usePageVisible();

  const [isNearViewport, setIsNearViewport] = useState(false);
  const [sidePlaybackEnabled, setSidePlaybackEnabled] = useState(true);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      {
        // Begin buffering before the user reaches the section, rather than
        // starting seven files on the same frame when it becomes sticky.
        rootMargin: "250px 0px",
        threshold: 0,
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 40%", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 27,
    mass: 0.4,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const nextValue = latest < SIDE_VIDEO_PAUSE_POINT;
    setSidePlaybackEnabled((current) =>
      current === nextValue ? current : nextValue,
    );
  });

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
          top: "32%",
          left: "29%",
          width: "42%",
          height: "36%",
        },
        exit: {
          top: "8%",
          left: "12%",
          width: "70%",
          height: "58%",
          cardBottomRadius: "300px",
          sceneHeight: "72%",
          sceneBottomRadius: "50px",
        },
      };
    }

    if (isTablet) {
      return {
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
        left: "29%",
        width: "42%",
        height: "80%",
        cardBottomRadius: "220px",
        sceneHeight: "92%",
        sceneBottomRadius: "86px",
      },
    };
  }, [isMobile, isTablet]);

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
  const sideVideos = VIDEOS.filter((video) => video.id !== mainVideo.id).slice(
    0,
    6,
  );

  const mainVideoSrc =
    isSmallMobile && mainVideo.mobileSrc ? mainVideo.mobileSrc : mainVideo.src;

  const shouldPlayMain = isNearViewport && isPageVisible;
  const shouldPlaySides =
    isNearViewport && isPageVisible && sidePlaybackEnabled;

  const visibleSideEntries = sideVideos
    .map((item, index) => ({ item, index, position: SIDE_POSITIONS[index] }))
    // These two cards are display:none in your mobile CSS. Do not mount and
    // decode their MP4s when they cannot be seen.
    .filter(({ index }) => !isMobile || (index !== 1 && index !== 3));

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stickyContainer}>
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
              {visibleSideEntries.map(({ item, index, position }) => (
                <SideVideoCard
                  key={item.id}
                  item={item}
                  src={item.src}
                  className={position.className}
                  progress={smoothProgress}
                  exitX={position.exitX}
                  exitY={position.exitY}
                  shouldPlay={shouldPlaySides}
                  startDelay={index * 180}
                />
              ))}

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
                    src={mainVideoSrc}
                    className={styles.mainVideo}
                    shouldPlay={shouldPlayMain}
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
