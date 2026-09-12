'use client';

import React, { useEffect, useRef, useState } from "react";
import Style from "./Badge.module.css";

export default function Badge() {
  const ringRef = useRef<SVGSVGElement | null>(null);
  const badgeContainerRef = useRef<HTMLDivElement | null>(null);
  const railProgressRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState("00");
  const [totalSections, setTotalSections] = useState(0);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring) return;

    const ringAnimation = ring.animate(
      [
        { transform: "rotate(0deg)" },
        { transform: "rotate(360deg)" },
      ],
      {
        duration: 10000,
        iterations: Infinity,
        easing: "linear",
      },
    );

    let sections: HTMLElement[] = [];
    let activeIndex = -1;
    let rafId = 0;
    let lastScrollY = window.scrollY;
    let lastFrameTime = performance.now();
    let currentDirection = 1;
    let speedResetTimer: ReturnType<typeof setTimeout> | undefined;
    let mutationTimer: ReturnType<typeof setTimeout> | undefined;

    const updateSections = () => {
      const dataSections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-section]"),
      );

      sections =
        dataSections.length > 0
          ? dataSections
          : Array.from(document.querySelectorAll<HTMLElement>("section"));

      setTotalSections((previous) =>
        previous === sections.length ? previous : sections.length,
      );
    };

    const updateBadge = () => {
      rafId = 0;

      const now = performance.now();
      const scrollY = window.scrollY;
      const elapsed = Math.max(now - lastFrameTime, 16);
      const delta = scrollY - lastScrollY;

      if (delta !== 0) {
        currentDirection = delta < 0 ? -1 : 1;
        const velocity = (Math.abs(delta) / elapsed) * 1000;
        const speedBoost = Math.min(1 + velocity / 450, 2.5);
        ringAnimation.playbackRate = currentDirection * speedBoost;

        if (speedResetTimer) clearTimeout(speedResetTimer);
        speedResetTimer = setTimeout(() => {
          ringAnimation.playbackRate = currentDirection;
        }, 120);
      }

      lastScrollY = scrollY;
      lastFrameTime = now;

      if (sections.length === 0) {
        updateSections();
      }

      if (sections.length > 0) {
        let nextActiveIndex = 0;
        let nextActiveRect = sections[0].getBoundingClientRect();

        for (let index = 0; index < sections.length; index += 1) {
          const rect = sections[index].getBoundingClientRect();

          if (rect.top <= 1) {
            nextActiveIndex = index;
            nextActiveRect = rect;
          } else {
            break;
          }
        }

        if (nextActiveIndex !== activeIndex) {
          activeIndex = nextActiveIndex;
          setActiveSection(String(nextActiveIndex).padStart(2, "0"));
        }

        const sectionHeight = Math.max(nextActiveRect.height, 1);
        const progress = Math.min(
          100,
          Math.max(0, (-nextActiveRect.top / sectionHeight) * 100),
        );

        if (railProgressRef.current) {
          railProgressRef.current.style.height = `${progress}%`;
        }
      }
    };

    const scheduleUpdate = () => {
      if (rafId === 0) {
        rafId = requestAnimationFrame(updateBadge);
      }
    };

    updateSections();
    scheduleUpdate();

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    const footer = document.querySelector("footer");
    const footerObserver = footer
      ? new IntersectionObserver(
          ([entry]) => {
            if (!badgeContainerRef.current) return;

            const shouldHide = entry.isIntersecting;
            badgeContainerRef.current.style.opacity = shouldHide ? "0" : "1";
            badgeContainerRef.current.style.pointerEvents = shouldHide
              ? "none"
              : "auto";
          },
          {
            root: null,
            rootMargin: "0px 0px -20% 0px",
            threshold: 0,
          },
        )
      : null;

    if (footer && footerObserver) {
      footerObserver.observe(footer);
    }

    const mutationObserver = new MutationObserver(() => {
      if (mutationTimer) clearTimeout(mutationTimer);
      mutationTimer = setTimeout(() => {
        updateSections();
        scheduleUpdate();
      }, 100);
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (rafId) cancelAnimationFrame(rafId);
      if (speedResetTimer) clearTimeout(speedResetTimer);
      if (mutationTimer) clearTimeout(mutationTimer);

      footerObserver?.disconnect();
      mutationObserver.disconnect();
      ringAnimation.cancel();
    };
  }, []);

  const currentIndex = parseInt(activeSection, 10);
  const isLastSection = totalSections > 0 && currentIndex >= totalSections - 1;
  const nextSection = isLastSection
    ? "END"
    : String(currentIndex + 1).padStart(2, "0");

  const handleBadgeClick = () => {
    const targetSection = document.getElementById("vidiosection");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={badgeContainerRef} style={{ transition: "opacity 0.3s ease" }}>
      <div className={Style.badge} onClick={handleBadgeClick}>
        <svg
          ref={ringRef}
          className={Style.badgeRing}
          viewBox="0 0 120 120"
          aria-hidden="true"
        >
          <defs>
            <path
              id="badgeCircle"
              d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0"
            />
          </defs>
          <text>
            <textPath href="#badgeCircle" startOffset="0%">
              EV CITY · THE 5 MINUTE CITY ·
            </textPath>
          </text>
        </svg>
        <img
          className={Style.badgeLogo}
          src="/images/ev_city_logo.png"
          alt="EV Homes Logo"
        />
      </div>

      <div className={Style.rail} aria-hidden="true">
        <span className={Style.railCount}>{activeSection}</span>
        <div className={Style.railLine}>
          <div ref={railProgressRef} className={Style.railLineProgress} />
        </div>
        <span className={Style.nextnum}>{nextSection}</span>
        <span className={Style.railLabel}>Scroll</span>
        <span className={Style.railArrow} />
      </div>
    </div>
  );
}
