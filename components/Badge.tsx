'use client';

import React, { useEffect, useRef } from "react";
import Style from "./Badge.module.css";

type SectionMetric = {
  element: HTMLElement;
  top: number;
  height: number;
};

export default function Badge() {
  const badgeContainerRef = useRef<HTMLDivElement | null>(null);
  const activeSectionRef = useRef<HTMLSpanElement | null>(null);
  const nextSectionRef = useRef<HTMLSpanElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let sections: SectionMetric[] = [];
    let frame = 0;
    let resizeTimer = 0;

    const measureSections = () => {
      let nodes = Array.from(
        document.querySelectorAll<HTMLElement>("[data-section]"),
      );

      if (nodes.length === 0) {
        nodes = Array.from(document.querySelectorAll<HTMLElement>("section"));
      }

      sections = nodes.map((element) => ({
        element,
        top: element.offsetTop,
        height: Math.max(element.offsetHeight, 1),
      }));
    };

    const updateRail = () => {
      frame = 0;
      if (sections.length === 0) return;

      const marker = window.scrollY + window.innerHeight * 0.42;
      let activeIndex = 0;

      for (let index = sections.length - 1; index >= 0; index -= 1) {
        if (marker >= sections[index].top) {
          activeIndex = index;
          break;
        }
      }

      const active = sections[activeIndex];
      const localProgress = Math.min(
        1,
        Math.max(0, (marker - active.top) / active.height),
      );

      if (activeSectionRef.current) {
        activeSectionRef.current.textContent = String(activeIndex).padStart(2, "0");
      }

      if (nextSectionRef.current) {
        nextSectionRef.current.textContent =
          activeIndex >= sections.length - 1
            ? "END"
            : String(activeIndex + 1).padStart(2, "0");
      }

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleY(${localProgress})`;
      }
    };

    const requestUpdate = () => {
      if (frame !== 0) return;
      frame = window.requestAnimationFrame(updateRail);
    };

    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        measureSections();
        requestUpdate();
      }, 120);
    };

    measureSections();
    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("load", handleResize, { once: true });

    const footer = document.querySelector("footer");
    const footerObserver =
      footer && badgeContainerRef.current
        ? new IntersectionObserver(
            ([entry]) => {
              const badge = badgeContainerRef.current;
              if (!badge) return;

              badge.style.opacity = entry.isIntersecting ? "0" : "1";
              badge.style.pointerEvents = entry.isIntersecting ? "none" : "auto";
            },
            { rootMargin: "0px 0px -20% 0px", threshold: 0.01 },
          )
        : null;

    if (footer && footerObserver) {
      footerObserver.observe(footer);
    }

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(resizeTimer);
      if (frame !== 0) window.cancelAnimationFrame(frame);
      footerObserver?.disconnect();
    };
  }, []);

  const handleBadgeClick = () => {
    document.getElementById("vidiosection")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div
      ref={badgeContainerRef}
      className={Style.badgeContainer}
    >
      <button
        type="button"
        className={Style.badgeButton}
        onClick={handleBadgeClick}
        aria-label="Back to top"
      >
        <div className={Style.badge}>
          <svg
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
            width={44}
            height={40}
            decoding="async"
          />
        </div>
      </button>

      <div className={Style.rail} aria-hidden="true">
        <span ref={activeSectionRef} className={Style.railCount}>00</span>
        <div className={Style.railLine}>
          <div ref={progressRef} className={Style.railLineProgress} />
        </div>
        <span ref={nextSectionRef} className={Style.nextnum}>01</span>
        <span className={Style.railLabel}>Scroll</span>
        <span className={Style.railArrow} />
      </div>
    </div>
  );
}
