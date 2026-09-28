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
  shouldLoad: boolean;
  shouldPlay: boolean;
  loadDelayMs: number;
  playDelayMs: number;
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
    src: "/images/square-1.webm",
    poster: "",
    ariaLabel: "Ocean-facing luxury interior",
  },
  {
    id: 2,
    src: "/videos/city-desktop.mp4",
    mobileSrc: "/videos/city-mob.mp4",
    poster: "",
    ariaLabel: "Modern city view",
  },
  {
    id: 3,
    src: "/images/rectangle-1.webm",
    poster: "",
    ariaLabel: "Winter landscape interior",
  },
  {
    id: 4,
    src: "/images/vid1.webm",
    poster: "",
    ariaLabel: "Garden house interior",
  },
  {
    id: 5,
    src: "/images/16x9.webm",
    poster: "",
    ariaLabel: "Vintage plant-filled interior",
  },
  {
    id: 6,
    src: "/images/square-2.webm",
    poster: "",
    ariaLabel: "Bright modern living room",
  },
  {
    id: 7,
    src: "/images/rectangle-2.webm",
    poster: "",
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

/*
 * SCROLL TIMELINE
 *
 * 0.00 ───────────── Initial gallery
 * 0.20 ───────────── Expansion starts
 * 0.63 ───────────── Video reaches fullscreen
 *
 * 0.63 ───────────────────────────── 0.90
 *              FULLSCREEN HOLD
 *
 * 0.90 ───────────── Exit starts
 * 0.98 ───────────── Exit finished
 * 1.00 ───────────── Sticky section releases
 */
const EXPAND_START = 0.2;
const EXPAND_END = 0.63;

const FULLSCREEN_HOLD_END = 0.9;

const EXIT_START = FULLSCREEN_HOLD_END;
const EXIT_END = 0.98;

const SIDE_VIDEO_PAUSE_POINT = 0.69;

const TITLE_LINES = ["Explore", "Places"] as const;
const TITLE_LETTER_COUNT = TITLE_LINES.join("").length;

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const updateMatch = () => {
      setMatches(mediaQuery.matches);
    };

    updateMatch();

    mediaQuery.addEventListener("change", updateMatch);

    return () => {
      mediaQuery.removeEventListener("change", updateMatch);
    };
  }, [query]);

  return matches;
}

function usePageVisible() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const update = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    update();

    document.addEventListener("visibilitychange", update);

    return () => {
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  return isVisible;
}

function AutoPlayVideo({
  item,
  src,
  className,
  shouldLoad,
  shouldPlay,
  preload = "metadata",
  loadDelayMs = 0,
  playDelayMs = 0,
}: {
  item: VideoItem;
  src: string;
  className?: string;
  shouldLoad: boolean;
  shouldPlay: boolean;
  preload?: "none" | "metadata" | "auto";
  loadDelayMs?: number;
  playDelayMs?: number;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [hasFrame, setHasFrame] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !shouldLoad) return;

    let cancelled = false;
    let loadTimer: ReturnType<typeof setTimeout> | undefined;

    setHasFrame(false);

    video.muted = true;
    video.defaultMuted = true;
    video.preload = preload;

    const markReady = () => {
      if (!cancelled) {
        setHasFrame(true);
      }
    };

    video.addEventListener("loadeddata", markReady);
    video.addEventListener("canplay", markReady);

    const beginLoad = () => {
      if (cancelled) return;

      video.load();

      if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
        markReady();
      }
    };

    if (loadDelayMs > 0) {
      loadTimer = setTimeout(beginLoad, loadDelayMs);
    } else {
      beginLoad();
    }

    return () => {
      cancelled = true;

      if (loadTimer) {
        clearTimeout(loadTimer);
      }

      video.removeEventListener("loadeddata", markReady);
      video.removeEventListener("canplay", markReady);
    };
  }, [loadDelayMs, preload, shouldLoad, src]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    let cancelled = false;
    let playTimer: ReturnType<typeof setTimeout> | undefined;

    const pauseVideo = () => {
      if (!video.paused) {
        video.pause();
      }
    };

    const playVideo = () => {
      if (
        cancelled ||
        !shouldLoad ||
        !shouldPlay ||
        document.visibilityState !== "visible"
      ) {
        pauseVideo();
        return;
      }

      const promise = video.play();

      if (promise !== undefined) {
        void promise.catch(() => {});
      }
    };

    const queuePlay = () => {
      if (playTimer) {
        clearTimeout(playTimer);
      }

      if (playDelayMs > 0) {
        playTimer = setTimeout(playVideo, playDelayMs);
      } else {
        playVideo();
      }
    };

    const handleCanPlay = () => {
      setHasFrame(true);
      queuePlay();
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        queuePlay();
      } else {
        pauseVideo();
      }
    };

    video.addEventListener("canplay", handleCanPlay);

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange,
    );

    queuePlay();

    return () => {
      cancelled = true;

      if (playTimer) {
        clearTimeout(playTimer);
      }

      pauseVideo();

      video.removeEventListener("canplay", handleCanPlay);

      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
    };
  }, [playDelayMs, shouldLoad, shouldPlay, src]);

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
      src={shouldLoad ? src : undefined}
      poster={item.poster || undefined}
      aria-label={item.ariaLabel}
      muted
      loop
      playsInline
      preload={shouldLoad ? preload : "none"}
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      tabIndex={-1}
      onLoadedData={() => setHasFrame(true)}
      onCanPlay={() => setHasFrame(true)}
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

  const opacity = useTransform(
    progress,
    [start, end],
    [0, 1],
  );

  return (
    <motion.span
      className={styles.titleLetter}
      style={{ opacity }}
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
  shouldLoad,
  shouldPlay,
  loadDelayMs,
  playDelayMs,
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
    [
      0,
      0.48,
      EXPAND_END,
      SIDE_VIDEO_PAUSE_POINT,
      1,
    ],
    [1, 1, 0.36, 0, 0],
  );

  return (
    <motion.div
      className={`${styles.sideCard} ${className}`}
      style={{
        x,
        y,
        scale,
        opacity,
      }}
    >
      <AutoPlayVideo
        item={item}
        src={src}
        shouldLoad={shouldLoad}
        shouldPlay={shouldPlay}
        preload="metadata"
        loadDelayMs={loadDelayMs}
        playDelayMs={playDelayMs}
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
  const [shouldWarmVideos, setShouldWarmVideos] = useState(false);
  const [sidePlaybackEnabled, setSidePlaybackEnabled] = useState(true);
  const [isMainVideoPaused, setIsMainVideoPaused] = useState(false);
  const [isMainVideoExpanded, setIsMainVideoExpanded] =
    useState(false);

  /*
   * Keep the section active for a much longer physical scroll
   * distance. The sticky viewport itself remains 100svh.
   *
   * This is the important difference from the previous version:
   * the fullscreen phase now has enough physical scroll distance
   * to feel like a dedicated scene rather than a quick transition.
   */
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const preloadObserver = new IntersectionObserver(
      ([entry]) => {
        setShouldWarmVideos(entry.isIntersecting);
      },
      {
        rootMargin: isMobile
          ? "500px 0px"
          : "800px 0px",
        threshold: 0.01,
      },
    );

    const playbackObserver = new IntersectionObserver(
      ([entry]) => {
        setIsNearViewport(entry.isIntersecting);
      },
      {
        rootMargin: "0px",
        threshold: 0.01,
      },
    );

    preloadObserver.observe(section);
    playbackObserver.observe(section);

    return () => {
      preloadObserver.disconnect();
      playbackObserver.disconnect();
    };
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 40%", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: isMobile ? 145 : 90,
    damping: isMobile ? 28 : 27,
    mass: isMobile ? 0.24 : 0.4,
  });

  const sidePlaybackEnabledRef = useRef(true);
  const mainVideoExpandedRef = useRef(false);

  useMotionValueEvent(
    smoothProgress,
    "change",
    (latest) => {
      /*
       * Side videos disappear before fullscreen and stay paused
       * throughout the fullscreen hold.
       */
      const nextSidePlayback =
        latest < SIDE_VIDEO_PAUSE_POINT;

      if (
        sidePlaybackEnabledRef.current !==
        nextSidePlayback
      ) {
        sidePlaybackEnabledRef.current =
          nextSidePlayback;

        setSidePlaybackEnabled(nextSidePlayback);
      }

      /*
       * The main video is considered expanded for the entire
       * fullscreen hold.
       */
      const expanded =
        latest >= EXPAND_END - 0.015 &&
        latest <= EXIT_START + 0.015;

      if (
        mainVideoExpandedRef.current !== expanded
      ) {
        mainVideoExpandedRef.current = expanded;

        setIsMainVideoExpanded(expanded);
      }
    },
  );

  const {
    scrollYProgress: titleScrollYProgress,
  } = useScroll({
    target: sectionRef,
    offset: ["start 88%", "start 28%"],
  });

  const smoothTitleProgress = useSpring(
    titleScrollYProgress,
    {
      stiffness: isMobile ? 150 : 105,
      damping: isMobile ? 27 : 24,
      mass: isMobile ? 0.22 : 0.35,
    },
  );

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

  /*
   * Scene remains completely fullscreen until EXIT_START.
   */
  const sceneHeight = useTransform(
    smoothProgress,
    [0, EXIT_START, EXIT_END, 1],
    [
      "100%",
      "100%",
      layout.exit.sceneHeight,
      layout.exit.sceneHeight,
    ],
  );

  const sceneBottomLeftRadius = useTransform(
    smoothProgress,
    [0, EXIT_START, EXIT_END, 1],
    [
      "0px",
      "0px",
      layout.exit.sceneBottomRadius,
      layout.exit.sceneBottomRadius,
    ],
  );

  const sceneBottomRightRadius = useTransform(
    smoothProgress,
    [0, EXIT_START, EXIT_END, 1],
    [
      "0px",
      "0px",
      layout.exit.sceneBottomRadius,
      layout.exit.sceneBottomRadius,
    ],
  );

  const sceneShadowOpacity = useTransform(
    smoothProgress,
    [0, EXIT_START, EXIT_END, 1],
    [0, 0, 0.28, 0.28],
  );

  /*
   * Main video:
   *
   * Initial card
   *     ↓
   * Expands to 100%
   *     ↓
   * HOLDS at 100%
   *     ↓
   * Exit happens only from 90% onward
   */
  const mainTop = useTransform(
    smoothProgress,
    [
      0,
      EXPAND_START,
      EXPAND_END,
      EXIT_START,
      EXIT_END,
      1,
    ],
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
    [
      0,
      EXPAND_START,
      EXPAND_END,
      EXIT_START,
      EXIT_END,
      1,
    ],
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
    [
      0,
      EXPAND_START,
      EXPAND_END,
      EXIT_START,
      EXIT_END,
      1,
    ],
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
    [
      0,
      EXPAND_START,
      EXPAND_END,
      EXIT_START,
      EXIT_END,
      1,
    ],
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
    [
      0,
      EXPAND_START,
      EXPAND_END,
      EXIT_START,
      EXIT_END,
      1,
    ],
    [
      "9px",
      "9px",
      "0px",
      "0px",
      "0px",
      "0px",
    ],
  );

  const mainTopRightRadius = useTransform(
    smoothProgress,
    [
      0,
      EXPAND_START,
      EXPAND_END,
      EXIT_START,
      EXIT_END,
      1,
    ],
    [
      "9px",
      "9px",
      "0px",
      "0px",
      "0px",
      "0px",
    ],
  );

  const mainBottomLeftRadius = useTransform(
    smoothProgress,
    [
      0,
      EXPAND_START,
      EXPAND_END,
      EXIT_START,
      EXIT_END,
      1,
    ],
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
    [
      0,
      EXPAND_START,
      EXPAND_END,
      EXIT_START,
      EXIT_END,
      1,
    ],
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
    [
      0,
      EXPAND_START,
      EXPAND_END,
      EXIT_START,
      EXIT_END,
      1,
    ],
    [
      1,
      1,
      1.06,
      1.1,
      1.02,
      1.02,
    ],
  );

  const backgroundOpacity = useTransform(
    smoothProgress,
    [0, EXPAND_START, 0.6, EXIT_START, 1],
    [1, 1, 0.42, 0.18, 0.18],
  );

  /*
   * Title entrance remains independent from the long
   * fullscreen hold.
   */
  const titleEntranceRotateX = useTransform(
    smoothTitleProgress,
    [0, 0.22, 1],
    isMobile
      ? [0, 0, 0]
      : [76, 76, 0],
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
    isMobile
      ? [0, 0, 0]
      : [0, 0, -45],
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

  const mainVideo = VIDEOS[1];

  const sideVideos = VIDEOS.filter(
    (video) => video.id !== mainVideo.id,
  ).slice(0, 6);

  const mainVideoSrc =
    isSmallMobile && mainVideo.mobileSrc
      ? mainVideo.mobileSrc
      : mainVideo.src;

  const shouldLoadMain =
    shouldWarmVideos || isNearViewport;

  const shouldLoadSides =
    shouldWarmVideos || isNearViewport;

  const shouldPlayMain =
    isNearViewport &&
    isPageVisible &&
    !isMainVideoPaused;

  const shouldPlaySides =
    isNearViewport &&
    isPageVisible &&
    sidePlaybackEnabled;

  const sidePlaybackPriority = [
    0,
    4,
    5,
    2,
    1,
    3,
  ];

  const visibleSideEntries = sideVideos
    .map((item, index) => ({
      item,
      index,
      position: SIDE_POSITIONS[index],
    }))
    .filter(
      ({ index }) =>
        !isMobile ||
        (index !== 1 && index !== 3),
    );

  return (
    <section
      ref={sectionRef}
      className={styles.section}
    >
      <div className={styles.stickyContainer}>
        <div
          className={styles.exitSurface}
          aria-hidden="true"
        />

        <motion.div
          className={styles.sceneClip}
          style={{
            height: sceneHeight,
            borderBottomLeftRadius:
              sceneBottomLeftRadius,
            borderBottomRightRadius:
              sceneBottomRightRadius,
          }}
        >
          <div className={styles.sceneCanvas}>
            <motion.div
              className={styles.sceneShadow}
              style={{
                opacity: sceneShadowOpacity,
              }}
              aria-hidden="true"
            />

            <motion.div
              className={
                styles.backgroundDecoration
              }
              style={{
                opacity: backgroundOpacity,
              }}
            >
              <div
                className={styles.backgroundGlow}
              />
            </motion.div>

            <motion.div
              className={styles.titleStage}
              style={{
                y: titleExitY,
                scale: titleExitScale,
                rotateX: titleExitRotateX,
                opacity: titleExitOpacity,
              }}
            >
              <motion.div
                className={styles.titleEntrance}
                style={{
                  y: titleEntranceY,
                  scale: titleEntranceScale,
                  rotateX:
                    titleEntranceRotateX,
                }}
              >
                <h2
                  className={
                    styles.galleryTitle
                  }
                  aria-label="Explore Places"
                >
                  {TITLE_LINES.map(
                    (line, lineIndex) => {
                      const lineOffset =
                        TITLE_LINES.slice(
                          0,
                          lineIndex,
                        ).reduce(
                          (
                            total,
                            currentLine,
                          ) =>
                            total +
                            currentLine.length,
                          0,
                        );

                      return (
                        <span
                          key={line}
                          className={
                            styles.titleLine
                          }
                          aria-hidden="true"
                        >
                          {Array.from(
                            line,
                          ).map(
                            (
                              character,
                              characterIndex,
                            ) => (
                              <RevealLetter
                                key={`${line}-${characterIndex}`}
                                character={
                                  character
                                }
                                index={
                                  lineOffset +
                                  characterIndex
                                }
                                progress={
                                  smoothTitleProgress
                                }
                              />
                            ),
                          )}
                        </span>
                      );
                    },
                  )}
                </h2>
              </motion.div>
            </motion.div>

            <div className={styles.gallery}>
              {visibleSideEntries.map(
                ({
                  item,
                  index,
                  position,
                }) => (
                  <SideVideoCard
                    key={item.id}
                    item={item}
                    src={item.src}
                    className={
                      position.className
                    }
                    progress={smoothProgress}
                    exitX={position.exitX}
                    exitY={position.exitY}
                    shouldLoad={
                      shouldLoadSides
                    }
                    shouldPlay={
                      shouldPlaySides
                    }
                    loadDelayMs={
                      sidePlaybackPriority.indexOf(
                        index,
                      ) * 90
                    }
                    playDelayMs={
                      sidePlaybackPriority.indexOf(
                        index,
                      ) * 45
                    }
                  />
                ),
              )}

              <motion.div
                className={styles.mainCard}
                style={{
                  top: mainTop,
                  left: mainLeft,
                  width: mainWidth,
                  height: mainHeight,
                  borderTopLeftRadius:
                    mainTopLeftRadius,
                  borderTopRightRadius:
                    mainTopRightRadius,
                  borderBottomLeftRadius:
                    mainBottomLeftRadius,
                  borderBottomRightRadius:
                    mainBottomRightRadius,
                }}
              >
                <motion.div
                  className={
                    styles.mainVideoWrapper
                  }
                  style={{
                    scale: mainVideoScale,
                  }}
                >
                  <AutoPlayVideo
                    item={mainVideo}
                    src={mainVideoSrc}
                    className={
                      styles.mainVideo
                    }
                    shouldLoad={
                      shouldLoadMain
                    }
                    shouldPlay={
                      shouldPlayMain
                    }
                    preload="auto"
                  />
                </motion.div>

                <div
                  className={
                    styles.mainVideoOverlay
                  }
                />

                <button
                  type="button"
                  className={[
                    styles.mainVideoControl,
                    !isMainVideoExpanded ||
                    isMainVideoPaused
                      ? styles.mainVideoControlVisible
                      : styles.mainVideoControlHidden,
                  ].join(" ")}
                  onClick={() =>
                    setIsMainVideoPaused(
                      (paused) => !paused,
                    )
                  }
                  aria-label={
                    isMainVideoPaused
                      ? "Play center video"
                      : "Pause center video"
                  }
                  aria-pressed={
                    isMainVideoPaused
                  }
                >
                  <span
                    className={
                      styles.mainVideoControlIcon
                    }
                    aria-hidden="true"
                  >
                    {isMainVideoPaused ? (
                      <svg
                        viewBox="0 0 24 24"
                        focusable="false"
                      >
                        <path
                          d="M8 5.5v13l10-6.5-10-6.5Z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        focusable="false"
                      >
                        <rect
                          x="7"
                          y="5"
                          width="3.5"
                          height="14"
                          rx="1"
                          fill="currentColor"
                        />
                        <rect
                          x="13.5"
                          y="5"
                          width="3.5"
                          height="14"
                          rx="1"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}