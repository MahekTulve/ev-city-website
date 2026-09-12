"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import styles from "./CinematicPlacesGallery.module.css";

const CinematicPlacesGalleryImpl = dynamic(
  () => import("./CinematicPlacesGalleryImpl"),
  {
    ssr: false,
  },
);

export default function CinematicPlacesGallery() {
  const placeholderRef = useRef<HTMLElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const placeholder = placeholderRef.current;
    if (!placeholder) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1200px 0px", threshold: 0 },
    );

    observer.observe(placeholder);
    return () => observer.disconnect();
  }, []);

  if (isNearViewport) {
    return <CinematicPlacesGalleryImpl />;
  }

  return (
    <section
      ref={placeholderRef}
      className={styles.section}
      aria-hidden="true"
    />
  );
}
