'use client';

import { useEffect, useState } from "react";
import CopenhagenLoader, { MIN_LOADER_MS } from "@/components/CopenhagenLoader";

const LOADER_FADE_MS = 850;

export default function Hero() {
  const [loaderFading, setLoaderFading] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const fadeTimer = window.setTimeout(() => {
      setLoaderFading(true);
    }, MIN_LOADER_MS);

    const removeTimer = window.setTimeout(() => {
      setShowLoader(false);
    }, MIN_LOADER_MS + LOADER_FADE_MS);

    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(removeTimer);
    };
  }, []);

  return (
    <div
      data-section
      className="relative h-screen w-full overflow-hidden"
      id="vidiosection"
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/vashicityDayOne.webp"
        className="h-full w-full object-cover"
      >
        <source
          src="/videos/intro-mob.webm"
          type="video/webm"
          media="(max-width: 480px)"
        />
        <source src="/videos/intro-desktop.webm" type="video/webm" />
      </video>

      {showLoader && <CopenhagenLoader fading={loaderFading} />}
    </div>
  );
}
