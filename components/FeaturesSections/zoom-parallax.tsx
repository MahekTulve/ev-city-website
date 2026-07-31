"use client";

import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface VideoItem {
  src: string;
  poster?: string;
  ariaLabel?: string;
}

interface ZoomParallaxProps {
  videos: VideoItem[];
}

interface ParallaxVideoProps extends VideoItem {
  index: number;
  scale: MotionValue<number>;
  opacity?: MotionValue<number>;
}

/*
  IMPORTANT:

  index 0 = center video
  index 1 = top-left
  index 2 = top-center
  index 3 = middle-left
  index 4 = middle-right
  index 5 = bottom-center
  index 6 = bottom-right
*/

const getVideoLayout = (index: number) => {
  switch (index) {
    // 0 — Main center frame
    case 0:
      return `
        [&>div]:!top-0
        [&>div]:!left-0
        [&>div]:!h-[29vh]
        [&>div]:!w-[26vw]
      `;

    // 1 — Top-left portrait
    case 1:
      return `
        [&>div]:!-top-[27vh]
        [&>div]:!-left-[21.5vw]
        [&>div]:!h-[30vh]
        [&>div]:!w-[15vw]
      `;

    // 2 — Top-center landscape
    case 2:
      return `
        [&>div]:!-top-[27vh]
        [&>div]:!left-[0vw]
        [&>div]:!h-[20vh]
        [&>div]:!w-[25vw]
      `;

    // 3 — Middle-left portrait
    case 3:
      return `
        [&>div]:!top-[1vh]
        [&>div]:!-left-[20vw]
        [&>div]:!h-[22.5vh]
        [&>div]:!w-[12vw]
      `;

    // 4 — Middle-right portrait
    case 4:
      return `
        [&>div]:!top-[-4vh]
        [&>div]:!left-[20.5vw]
        [&>div]:!h-[35.5vh]
        [&>div]:!w-[13vw]
      `;

    // 5 — Bottom-center landscape
    case 5:
      return `
        [&>div]:!top-[26vh]
        [&>div]:!-left-[1vw]
        [&>div]:!h-[18vh]
        [&>div]:!w-[28vw]
      `;

    // 6 — Bottom-right landscape
    case 6:
      return `
        [&>div]:!top-[28vh]
        [&>div]:!left-[23vw]
        [&>div]:!h-[23vh]
        [&>div]:!w-[18vw]
      `;

    default:
      return "";
  }
};

function ParallaxVideo({
  src,
  poster,
  ariaLabel,
  index,
  scale,
  opacity,
}: ParallaxVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const restartTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  const [videoOpacity, setVideoOpacity] = useState(1);
  const [isRestarting, setIsRestarting] = useState(false);

  const fadeDuration = 0.6;
  const fadeBeforeEnd = 0.6;
  const resetGap = 300;

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video || !Number.isFinite(video.duration)) {
      return;
    }

    const remainingTime = video.duration - video.currentTime;

    if (remainingTime <= fadeBeforeEnd && !isRestarting) {
      setIsRestarting(true);
      setVideoOpacity(0);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    restartTimerRef.current = setTimeout(async () => {
      video.currentTime = 0;

      try {
        await video.play();

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setVideoOpacity(1);
            setIsRestarting(false);
          });
        });
      } catch (error) {
        console.error(
          `Could not restart video ${index + 1}:`,
          error,
        );

        setVideoOpacity(1);
        setIsRestarting(false);
      }
    }, resetGap);
  };

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playsInline = true;

      video.play().catch(() => {
        // Browser may wait for user interaction.
      });
    }

    return () => {
      if (restartTimerRef.current) {
        clearTimeout(restartTimerRef.current);
      }
    };
  }, []);

  return (
    <motion.div
  style={{
    scale,
    zIndex: index === 0 ? 10 : 1,
    ...(opacity ? { opacity } : {}),
  }}
  className={`
    pointer-events-none
    absolute
    inset-0
    flex
    h-full
    w-full
    origin-center
    items-center
    justify-center
    will-change-transform
    ${getVideoLayout(index)}
  `}
>
  <div
    className="
      pointer-events-auto
      relative
      overflow-hidden
      bg-black
    "
  >
    <motion.video
      ref={videoRef}
      src={src}
      poster={poster}
      aria-label={ariaLabel || `Parallax video ${index + 1}`}
      autoPlay
      muted
      playsInline
      preload={index === 0 ? "auto" : "metadata"}
      onTimeUpdate={handleTimeUpdate}
      onEnded={handleEnded}
      animate={{
        opacity: videoOpacity,
      }}
      transition={{
        duration: fadeDuration,
        ease: "easeInOut",
      }}
      className="block h-full w-full object-cover object-center"
    />
  </div>
</motion.div>
  );
}

export function ZoomParallax({
  videos,
}: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  const lastVideoOpacity = useTransform(
    scrollYProgress,
    [0.85, 1],
    [1, 0],
  );

  /*
    Keep the original scale behavior.

    index 0 is the center video.
    It stays centered during the entire zoom.
  */

 const scale4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
const scale5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
const scale6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
const scale8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
const scale9 = useTransform(scrollYProgress, [0, 1], [1, 7]);

const scales = [
  scale4,
  scale5,
  scale6,
  scale5,
  scale6,
  scale8,
  scale9,
];

  return (
    <div
      ref={container}
      className="
        relative
        h-[200vh]
        w-full
        bg-transparent
      "
    >
      <div
        className="
          sticky
          top-0
          h-screen
          w-full
          overflow-hidden
        "
      >
        {videos.slice(0, 7).map((video, index) => (
          <ParallaxVideo
            key={`${video.src}-${index}`}
            {...video}
            index={index}
            scale={scales[index % scales.length]}
            opacity={
              index === videos.length - 1
                ? lastVideoOpacity
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}