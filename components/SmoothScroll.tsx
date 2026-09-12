"use client";

import type Lenis from "lenis";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    let cancelled = false;
    let instance: Lenis | null = null;
    let rafId = 0;
    let handleAnchorClick: ((event: MouseEvent) => void) | null = null;

    void import("lenis").then(({ default: LenisConstructor }) => {
      if (cancelled) return;

      instance = new LenisConstructor({
        duration: 5,
        easing: (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.8,
        syncTouch: true,
      });

      setLenis(instance);
      document.documentElement.classList.add("lenis");

      const raf = (time: number) => {
        if (!instance) return;
        instance.raf(time);
        rafId = requestAnimationFrame(raf);
      };

      rafId = requestAnimationFrame(raf);

      handleAnchorClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        const anchor = target.closest("a");

        if (!anchor || !anchor.hash || !anchor.hash.startsWith("#")) return;

        const targetElement = document.querySelector(anchor.hash) as HTMLElement | null;
        if (!targetElement || !instance) return;

        event.preventDefault();
        instance.scrollTo(targetElement, {
          offset: -80,
          duration: 1.2,
        });
      };

      document.addEventListener("click", handleAnchorClick);
    });

    return () => {
      cancelled = true;

      if (handleAnchorClick) {
        document.removeEventListener("click", handleAnchorClick);
      }

      document.documentElement.classList.remove("lenis");

      if (rafId) cancelAnimationFrame(rafId);
      instance?.destroy();
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
