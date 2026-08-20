"use client";

import { useEffect, useRef } from "react";
import styles from "./scrollvideo.module.css";

interface ScrollVideoProps {
  src: string;
  scrollLength?: number;
}

export default function ScrollVideo({
  src,
  scrollLength = 8,
}: ScrollVideoProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const targetTime = useRef(0);
  const currentTime = useRef(0);

  const raf = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    if (!section || !video) return;

    let duration = 0;

    video.pause();
    video.muted = true;
    video.playsInline = true;

    const updateDuration = () => {
      duration = video.duration || 0;
    };

    video.addEventListener("loadedmetadata", updateDuration);

    if (video.readyState >= 1) {
      updateDuration();
    }

    const updateScroll = () => {
      if (!duration) return;

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;

      const maxScroll = section.offsetHeight - viewport;

      const scroll = Math.min(Math.max(-rect.top, 0), maxScroll);

      const progress = maxScroll > 0 ? scroll / maxScroll : 0;

      targetTime.current = progress * duration;

      if (raf.current === null) {
  animate();
}
    };

    const animate = () => {
      const diff = targetTime.current - currentTime.current;

      // Smooth easing
      currentTime.current += diff * 0.08;

      if (Math.abs(diff) < 0.005) {
        currentTime.current = targetTime.current;
      }

      try {
        video.currentTime = currentTime.current;
      } catch {}

      if (Math.abs(diff) > 0.005) {
        raf.current = requestAnimationFrame(animate);
      } else {
        raf.current = null;
      }
    };

    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    window.addEventListener("resize", updateScroll);

    updateScroll();

    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      video.removeEventListener("loadedmetadata", updateDuration);

      if (raf.current) {
        cancelAnimationFrame(raf.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      style={{
        height: `${scrollLength * 100}vh`,
      }}
    >
      <div className={styles.sticky}>
        <video
          ref={videoRef}
          className={styles.video}
          src={src}
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
        />
      </div>
    </section>
  );
}