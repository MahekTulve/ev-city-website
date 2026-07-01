"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";

import { processSteps } from "./data";
import { StepCard } from "./StepCard";
import { FinalCircles } from "./FinalCircles";
import ScrollVideo from "@/components/scrollvideo/scrollvideo";
import VisionHero from "./VisionHero";

function buildSnakePath(
  steps: number,
  isMobile: boolean,
  xLeft = 140,
  xRight = 1060,
  segH = 350,
  topPad = 40,
  extraBottom = 400
) {
  if (isMobile) {
    const mobileX = 65;
    return `M ${mobileX} 0 L ${mobileX} ${
      topPad + steps * segH + extraBottom
    }`;
  }

  let d = `M 600 0
           L 600 ${topPad}
           L ${xLeft} ${topPad}`;

  let currentX = xLeft;

  for (let i = 0; i < steps; i++) {
    const yTop = topPad + i * segH;
    const yBottom = yTop + segH;

    d += ` L ${currentX} ${yBottom}`;

    if (i < steps - 1) {
      const nextX = currentX === xLeft ? xRight : xLeft;

      d += ` L ${nextX} ${yBottom}`;

      currentX = nextX;
    }
  }

  const endY = topPad + steps * segH;

  d += `
      L 600 ${endY}
      L 600 ${endY + extraBottom}
  `;

  return d;
}

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Active path
  const activePathRef = useRef<SVGPathElement>(null);

  // Moving glowing head
  const headGlowRef = useRef<SVGCircleElement>(null);
const headCoreRef = useRef<SVGCircleElement>(null);

  const [isMobile, setIsMobile] = useState(false);
  const [rawProgress, setRawProgress] = useState(0);

  const progressValue = useMotionValue(0);

  const smoothProgress = useSpring(progressValue, {
    stiffness: 140,
    damping: 20,
    mass: 0.25,
  });

  const stepCount = processSteps.length;

  const segH = 350;
  const topPad = 40;
  const extraBottom = 400;

  const svgHeight =
    topPad +
    stepCount * segH +
    extraBottom;

  const pathD = buildSnakePath(
    stepCount,
    isMobile,
    140,
    1060,
    segH,
    topPad,
    extraBottom
  );

  // Responsive layout
  useEffect(() => {
    const resize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    resize();

    window.addEventListener("resize", resize);

    return () =>
      window.removeEventListener("resize", resize);
  }, []);

  // Scroll Progress
  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;

      const rect =
        containerRef.current.getBoundingClientRect();

      const viewport = window.innerHeight;

      const trigger = viewport * 0.65;

      const amount = trigger - rect.top;

      const progress = Math.max(
        0,
        Math.min(1, amount / rect.height)
      );

      progressValue.set(progress);

      setRawProgress(progress * 100);
    };

    update();

    window.addEventListener("scroll", update, {
      passive: true,
    });

    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [progressValue]);

  // Move glowing head along path
 useMotionValueEvent(
  smoothProgress,
  "change",
  (latest) => {
    if (
      !activePathRef.current ||
      !headGlowRef.current ||
      !headCoreRef.current
    )
      return;

    const length = activePathRef.current.getTotalLength();

    const point = activePathRef.current.getPointAtLength(
      latest * length
    );

    headGlowRef.current.setAttribute(
      "cx",
      point.x.toString()
    );

    headGlowRef.current.setAttribute(
      "cy",
      point.y.toString()
    );

    headCoreRef.current.setAttribute(
      "cx",
      point.x.toString()
    );

    headCoreRef.current.setAttribute(
      "cy",
      point.y.toString()
    );
  }
);

  return (
  <section className="process-section">
    <VisionHero />

    <div className="process-container">
      <div
        className="process-timeline"
        ref={containerRef}
      >
        <svg
          className="timeline-svg"
          viewBox={`0 0 1200 ${svgHeight}`}
          preserveAspectRatio="none"
          fill="none"
        >
          {/* =========================
               DEFINITIONS
          ========================== */}

          <defs>
            <linearGradient
              id="goldGradient"
              x1="0%"
              y1="0%"
              x2="0%"
              y2="100%"
            >
              <stop
                offset="0%"
                stopColor="#FFFCE8"
              />

              <stop
                offset="20%"
                stopColor="#FFE9A0"
              />

              <stop
                offset="55%"
                stopColor="#F5D36B"
              />

              <stop
                offset="100%"
                stopColor="#D4AF37"
              />
            </linearGradient>

            <filter
              id="goldGlow"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur
                stdDeviation="5"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            <filter
              id="headGlow"
              x="-300%"
              y="-300%"
              width="600%"
              height="600%"
            >
              <feGaussianBlur
                stdDeviation="8"
                result="blur"
              />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* =========================
              BACKGROUND TRACK
          ========================== */}

          <path
            d={pathD}
            fill="none"
            stroke="#2b2b2b"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* =========================
              SOFT GLOW PATH
          ========================== */}

          <motion.path
            d={pathD}
            fill="none"
            stroke="#c2b99c"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.35}
            filter="url(#goldGlow)"
            style={{
              pathLength: smoothProgress,
            }}
          />

          {/* =========================
               MAIN GOLD PATH
          ========================== */}

          <motion.path
            ref={activePathRef}
            d={pathD}
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              pathLength: smoothProgress,
            }}
          />

    
        </svg>

        {/* =========================
             TIMELINE CARDS
        ========================== */}

        <ol className="process-list">
          {processSteps.map((step, i) => {
            const align =
              i % 2 === 0 ? "left" : "right";

            const reached =
              rawProgress >=
              (i / processSteps.length) * 100;

            return (
              <li
                key={step.number}
                className={`process-row process-row--${align} ${
                  reached ? "is-reached" : ""
                }`}
                style={{
                  minHeight: `${segH}px`,
                }}
              >
                <div className="process-row__side">
                  <StepCard
                    step={step}
                    align={align}
                  />
                </div>

               
              </li>
            );
          })}
        </ol>

        <FinalCircles />
      </div>

      <div className="process-scrollvideo">
        <ScrollVideo
          src="/images/earth-scrub.mp4"
          scrollLength={4}
        />
      </div>
    </div>
  </section>
);
}