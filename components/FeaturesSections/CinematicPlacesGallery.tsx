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
  {
    className: styles.topLeft,
    exitX: -45,
    exitY: -18,
  },
  {
    className: styles.bottomLeft,
    exitX: -45,
    exitY: 28,
  },
  {
    className: styles.topCenter,
    exitX: 0,
    exitY: -40,
  },
  {
    className: styles.topRight,
    exitX: 45,
    exitY: -18,
  },
  {
    className: styles.rightBottom,
    exitX: 48,
    exitY: 30,
  },
  {
    className: styles.bottomCenter,
    exitX: 5,
    exitY: 42,
  },
];

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
        // Some browsers may delay autoplay until the video becomes visible.
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
    [0, 0.6, 0.78, 1],
    ["0vw", `${exitX * 0.45}vw`, `${exitX}vw`, `${exitX}vw`],
  );

  const y = useTransform(
    progress,
    [0, 0.6, 0.78, 1],
    ["0vh", `${exitY * 0.45}vh`, `${exitY}vh`, `${exitY}vh`],
  );

  const scale = useTransform(
    progress,
    [0, 0.5, 0.78, 1],
    [1, 0.96, 0.82, 0.82],
  );

  const opacity = useTransform(
    progress,
    [0, 0.45, 0.72, 1],
    [1, 0.8, 0, 0],
  );

  const filter = useTransform(
    progress,
    [0, 0.55, 0.75],
    ["blur(0px)", "blur(2px)", "blur(8px)"],
  );

  return (
    <motion.div
      className={`${styles.sideCard} ${className}`}
      style={{
        x,
        y,
        scale,
        opacity,
        filter,
      }}
    >
      <AutoPlayVideo item={item} />
    </motion.div>
  );
}

export default function ScrollVideoGallery() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const isMobile = useMediaQuery("(max-width: 700px)");
  const isTablet = useMediaQuery(
    "(min-width: 701px) and (max-width: 1100px)",
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 95,
    damping: 26,
    mass: 0.35,
  });

  const startingPosition = useMemo(() => {
  if (isMobile) {
    return {
      top: "30%",
      left: "5%",
      width: "90%",
      height: "38%",
    };
  }

  if (isTablet) {
    return {
      top: "29%",
      left: "20%",
      width: "60%",
      height: "40%",
    };
  }

  // Desktop layout matching the screenshot
  return {
    top: "28%",
    left: "26.7%",
    width: "46.8%",
    height: "34%",
  };
}, [isMobile, isTablet]);

  const mainTop = useTransform(
    smoothProgress,
    [0, 0.74, 1],
    [startingPosition.top, "0%", "0%"],
  );

  const mainLeft = useTransform(
    smoothProgress,
    [0, 0.74, 1],
    [startingPosition.left, "0%", "0%"],
  );

  const mainWidth = useTransform(
    smoothProgress,
    [0, 0.74, 1],
    [startingPosition.width, "100%", "100%"],
  );

  const mainHeight = useTransform(
    smoothProgress,
    [0, 0.74, 1],
    [startingPosition.height, "100%", "100%"],
  );

  const mainRadius = useTransform(
    smoothProgress,
    [0, 0.65, 0.74, 1],
    ["9px", "6px", "0px", "0px"],
  );

  const mainVideoScale = useTransform(
    smoothProgress,
    [0, 0.74, 1],
    [1, 1.06, 1.1],
  );

  const backgroundOpacity = useTransform(
    smoothProgress,
    [0, 0.7, 1],
    [1, 0.45, 0],
  );

  const mainVideo = VIDEOS[1];

  const sideVideos = VIDEOS.filter(
    (video) => video.id !== mainVideo.id,
  ).slice(0, 6);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.stickyContainer}>
        <motion.div
          className={styles.backgroundDecoration}
          style={{ opacity: backgroundOpacity }}
        >
          <div className={styles.backgroundGlow} />
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
              borderRadius: mainRadius,
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
    </section>
  );
}