'use client';
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Style from "./Badge.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Badge() {
  const ringRef = useRef<SVGSVGElement | null>(null);
  const badgeContainerRef = useRef<HTMLDivElement | null>(null); // 1. Badge wrapper ref
  const [activeSection, setActiveSection] = useState("00");
  const [sectionProgress, setSectionProgress] = useState(0);
  const [totalSections, setTotalSections] = useState(0);

  useEffect(() => {
    if (!ringRef.current) return;

    // Base infinite rotation
    const baseTween = gsap.to(ringRef.current, {
      rotation: "+=360",
      duration: 10,
      repeat: -1,
      ease: "none",
    });

    const speedProxy = { scale: 1 };
    const setTimeScale = gsap.quickTo(speedProxy, "scale", {
      duration: 0.6,
      ease: "power2.out",
      onUpdate: () => baseTween.timeScale(speedProxy.scale),
    });

    let scrollTimeout: NodeJS.Timeout;

    const speedTrigger = ScrollTrigger.create({
      onUpdate: (self) => {
        clearTimeout(scrollTimeout);
        const isUp = self.direction === -1;
        const direction = isUp ? -1 : 1;
        const rawVelocity = Math.abs(self.getVelocity());
        const speedBoost = Math.min(1 + rawVelocity / 450, 2.5);

        setTimeScale(direction * speedBoost);

        scrollTimeout = setTimeout(() => {
          const currentDirection = speedProxy.scale >= 0 ? 1 : -1;
          setTimeScale(currentDirection);
        }, 120);
      },
    });

    const timer = setTimeout(() => {
      let sections = document.querySelectorAll("[data-section]");
      if (sections.length === 0) {
        sections = document.querySelectorAll("section");
      }

      setTotalSections(sections.length);

      sections.forEach((section, index) => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => setSectionProgress(self.progress * 100),
          onEnter: () => setActiveSection(String(index).padStart(2, "0")),
          onEnterBack: () => setActiveSection(String(index).padStart(2, "0")),
        });
      });

      // 2. Footer me badge ko hide karne ka ScrollTrigger logic
      const footerElement = document.querySelector("footer");
      if (footerElement && badgeContainerRef.current) {
        ScrollTrigger.create({
          trigger: footerElement,
          start: "top 80%", // Jab footer screen par dikhna shuru ho
          end: "top top",
          onEnter: () => {
            gsap.to(badgeContainerRef.current, {
              opacity: 0,
              pointerEvents: "none",
              duration: 0.4,
              ease: "power2.out",
            });
          },
          onLeaveBack: () => {
            gsap.to(badgeContainerRef.current, {
              opacity: 1,
              pointerEvents: "auto",
              duration: 0.4,
              ease: "power2.out",
            });
          },
        });
      }

      ScrollTrigger.refresh();
    }, 200);

    return () => {
      clearTimeout(timer);
      clearTimeout(scrollTimeout);
      speedTrigger.kill();
      baseTween.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  const currentIndex = parseInt(activeSection, 10);
  const isLastSection = totalSections > 0 && currentIndex >= totalSections - 1;
  const nextSection = isLastSection ? "END" : String(currentIndex + 1).padStart(2, "0");

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
            <path id="badgeCircle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
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
          <div
            className={Style.railLineProgress}
            style={{ height: `${sectionProgress}%` }}
          />
        </div>
        <span className={Style.nextnum}>{nextSection}</span>
        <span className={Style.railLabel}>Scroll</span>
        <span className={Style.railArrow} />
      </div>
    </div>
  );
}