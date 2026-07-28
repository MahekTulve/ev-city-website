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

function ParallaxVideo({
  src,
  poster,
  ariaLabel,
  index,
  scale,
  opacity,
}: ParallaxVideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const restartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [videoOpacity, setVideoOpacity] = useState(1);
  const [isRestarting, setIsRestarting] = useState(false);

  const fadeDuration = 0.6;
  const fadeBeforeEnd = 0.6;

  // How long the video remains completely invisible.
  const resetGap = 300;

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video || !Number.isFinite(video.duration)) return;

    const remainingTime = video.duration - video.currentTime;

    if (remainingTime <= fadeBeforeEnd && !isRestarting) {
      setIsRestarting(true);
      setVideoOpacity(0);
    }
  };

  const handleEnded = () => {
    const video = videoRef.current;

    if (!video) return;

    // Keep the video hidden for a moment.
    restartTimerRef.current = setTimeout(async () => {
      video.currentTime = 0;

      try {
        await video.play();

        // Wait briefly after the first frame loads.
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setVideoOpacity(1);
            setIsRestarting(false);
          });
        });
      } catch (error) {
        console.error(`Could not restart video ${index + 1}:`, error);

        setVideoOpacity(1);
        setIsRestarting(false);
      }
    }, resetGap);
  };

  useEffect(() => {
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
        ...(opacity ? { opacity } : {}),
      }}
      className={`
  absolute top-0 flex h-full w-full items-center justify-center

  ${
    index === 0
      ? `
        [&>div]:!top-[0vh]
        [&>div]:!left-[0vw]
        [&>div]:!h-[19vh]
        [&>div]:!w-[29vw]

        md:[&>div]:!top-0
        md:[&>div]:!left-0
        md:[&>div]:!h-[25vh]
        md:[&>div]:!w-[25vw]
      `
      : ""
  }

  ${
    index === 1
      ? `
        [&>div]:!-top-[25vh]
        [&>div]:!left-[7vw]
        [&>div]:!h-[22vh]
        [&>div]:!w-[35vw]

        md:[&>div]:!-top-[30vh]
        md:[&>div]:!left-[5vw]
        md:[&>div]:!h-[30vh]
        md:[&>div]:!w-[35vw]
      `
      : ""
  }

  ${
    index === 2
      ? `
        [&>div]:!-top-[4vh]
        [&>div]:!-left-[30vw]
        [&>div]:!h-[25vh]
        [&>div]:!w-[24vw]

        md:[&>div]:!-top-[10vh]
        md:[&>div]:!-left-[25vw]
        md:[&>div]:!h-[45vh]
        md:[&>div]:!w-[20vw]
      `
      : ""
  }

  ${
    index === 3
      ? `
        [&>div]:!-top-[3vh]
        [&>div]:!left-[30vw]
        [&>div]:!h-[18vh]
        [&>div]:!w-[24vw]

        md:[&>div]:!top-0
        md:[&>div]:!left-[27.5vw]
        md:[&>div]:!h-[25vh]
        md:[&>div]:!w-[25vw]
      `
      : ""
  }

  ${
    index === 4
      ? `
        [&>div]:!top-[22vh]
        [&>div]:!left-[6vw]
        [&>div]:!h-[20vh]
        [&>div]:!w-[24vw]

        md:[&>div]:!top-[27.5vh]
        md:[&>div]:!left-[5vw]
        md:[&>div]:!h-[25vh]
        md:[&>div]:!w-[20vw]
      `
      : ""
  }

  ${
    index === 5
      ? `
        [&>div]:!top-[22vh]
        [&>div]:!-left-[27vw]
        [&>div]:!h-[21vh]
        [&>div]:!w-[27vw]

        md:[&>div]:!top-[27.5vh]
        md:[&>div]:!-left-[22.5vw]
        md:[&>div]:!h-[25vh]
        md:[&>div]:!w-[30vw]
      `
      : ""
  }

  ${
    index === 6
      ? `
        [&>div]:!top-[18vh]
        [&>div]:!left-[34vw]
        [&>div]:!h-[18vh]
        [&>div]:!w-[20vw]

        md:[&>div]:!top-[22.5vh]
        md:[&>div]:!left-[25vw]
        md:[&>div]:!h-[15vh]
        md:[&>div]:!w-[15vw]
      `
      : ""
  }
`}
    >
      <div className="relative overflow-hidden bg-black">
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
          animate={{ opacity: videoOpacity }}
          transition={{
            duration: fadeDuration,
            ease: "easeInOut",
          }}
          className={`h-full w-full object-cover ${
  index === 2
    ? "object-[50%_center] md:object-center"
    : "object-center"
}`}
        />
      </div>
    </motion.div>
  );
}

export function ZoomParallax({ videos }: ZoomParallaxProps) {
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
      className="relative h-[200vh] w-full bg-transparent"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-transparent">
        {videos.map((video, index) => (
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