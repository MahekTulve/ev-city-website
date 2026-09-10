'use client';
import { useEffect, useRef, useState } from "react";
import CopenhagenLoader, { MIN_LOADER_MS } from "@/components/CopenhagenLoader";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [minTimeDone, setMinTimeDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setMinTimeDone(true);
    }, MIN_LOADER_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (videoRef.current && videoRef.current.readyState >= 3) {
      setCanPlay(true);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setCanPlay(true), 8000);
    return () => clearTimeout(t);
  }, []);

  const ready = canPlay && minTimeDone;

  return (
    <div data-section className="relative h-screen w-full overflow-hidden" id="vidiosection">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="images/vashicityDayOne.webp"
        onCanPlayThrough={() => setCanPlay(true)}
        className="h-full w-full object-cover"
      >
        <source src="/videos/intro-mob.webp" type="video/webm" media="(max-width: 480px)" />
        <source src="/videos/intro-desktop.webm" type="video/webm" />
      </video>

      <CopenhagenLoader fading={ready} />
    </div>
  );
}