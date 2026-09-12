'use client';

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CopenhagenLoader, {
  MIN_LOADER_MS,
  MOBILE_MIN_LOADER_MS,
} from "@/components/CopenhagenLoader";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [posterReady, setPosterReady] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [minTimeDone, setMinTimeDone] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const desktopQuery = window.matchMedia("(min-width: 769px)");

    const updateDevice = () => {
      setIsDesktop(desktopQuery.matches);
    };

    updateDevice();
    desktopQuery.addEventListener("change", updateDevice);

    return () => desktopQuery.removeEventListener("change", updateDevice);
  }, []);

  useEffect(() => {
    const loaderDuration = window.matchMedia("(max-width: 768px)").matches
      ? Math.min(MOBILE_MIN_LOADER_MS, 700)
      : MIN_LOADER_MS;

    const timer = window.setTimeout(() => {
      setMinTimeDone(true);
    }, loaderDuration);

    return () => window.clearTimeout(timer);
  }, []);

  const visualReady = isDesktop ? videoReady || posterReady : posterReady;
  const ready = visualReady && minTimeDone;

  useEffect(() => {
    if (!ready) return;

    const timer = window.setTimeout(() => {
      setShowLoader(false);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [ready]);

  return (
    <div
      data-section
      className="relative h-screen w-full overflow-hidden"
      id="vidiosection"
    >
      <Image
        src="/images/vashicityDayOne.webp"
        alt="Vashi city"
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        onLoad={() => setPosterReady(true)}
        className="object-cover"
      />

      {isDesktop === true && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/vashicityDayOne.webp"
          onCanPlay={() => setVideoReady(true)}
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/intro-desktop.webm" type="video/webm" />
        </video>
      )}

      {showLoader && <CopenhagenLoader fading={ready} />}
    </div>
  );
}
