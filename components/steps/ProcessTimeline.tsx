"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion"; // Adjusted to standard package name if needed, or keep "motion/react"
import { processSteps } from "./data";
import { StepCard } from "./StepCard";
import { FinalCircles } from "./FinalCircles";
import ScrollVideo from "@/components/scrollvideo/scrollvideo";
import VisionHero from "./VisionHero";

// Updated path builder with realistic 1200px wide coordinate system
function buildSnakePath(
  steps: number,
  isMobile: boolean,
  xLeft = 140,       // Perfectly balances card alignment on a 1200px canvas
  xRight = 1060,     // Perfectly balances right card alignment
  segH = 700,
  topPad = 40,
  extraBottom = 1100
) {
  // SAFEGUARD FOR MOBILE: If screen is small, draw a clean straight line down the left axis
  if (isMobile) {
    const mobileX = 65; // Aligns perfectly with your 20px/24px mobile CSS left positioning
    return `M ${mobileX} 0 L ${mobileX} ${topPad + steps * segH + extraBottom}`;
  }

  // DESKTOP SNAKE PATH
  let d = `M 600 0 L 600 ${topPad}`; // Canvas center is now 600 (1200 / 2)
  d += ` L ${xLeft} ${topPad}`;

  let currentX = xLeft;

  for (let i = 0; i < steps; i++) {
    const yTop = topPad + i * segH;
    const yBot = yTop + segH;

    d += ` L ${currentX} ${yBot}`;

    if (i < steps - 1) {
      const nextX = currentX === xLeft ? xRight : xLeft;
      d += ` L ${nextX} ${yBot}`;
      currentX = nextX;
    }
  }

  const endY = topPad + steps * segH;
  d += ` L 600 ${endY} L 600 ${endY + extraBottom}`;

  return d;
}

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  
  // Track mobile layout state dynamically to fix responsive tracking
  const [isMobile, setIsMobile] = useState(false);
  const [rawProgress, setRawProgress] = useState(0);

  const pathProgressValue = useMotionValue(0);

  const smoothProgress = useSpring(pathProgressValue, {
    stiffness: 150,
    damping: 15,
    mass: 0.1,
  });

  const stepCount = processSteps.length;
  const segH = 350;
  const topPad = 40;
  const extraBottom = 400;

  const viewH = topPad + stepCount * segH + extraBottom;
  
  // Generate the updated stable path
  const pathD = buildSnakePath(stepCount, isMobile, 140, 1060, segH, topPad, extraBottom);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      const triggerOffset = viewportHeight * 0.65;
      const totalHeight = rect.height;
      const amountScrolled = triggerOffset - rect.top;

      const currentProgress = Math.max(0, Math.min(1, amountScrolled / totalHeight));
      
      pathProgressValue.set(currentProgress);
      setRawProgress(currentProgress * 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [pathProgressValue]);

  return (
    <section className="process-section">
      <VisionHero />
      <div className="process-container">
        <div className="process-timeline" ref={containerRef}>
          <svg
            className="timeline-svg"
            viewBox={`0 0 1200 ${viewH}`} // Expanded canvas width from 100 to 1200
            preserveAspectRatio="none"
            fill="none"
          >
            {/* Background trace line */}
            <path
              d={pathD}
              stroke="#3f3f46"
              strokeWidth="2"
              opacity="0.15"
              vectorEffect="non-scaling-stroke"
            />

            {/* Stable active line path */}
            <motion.path
              ref={pathRef}
              d={pathD}
              stroke="#d4af37"
              strokeWidth="4"
              vectorEffect="non-scaling-stroke"
              style={{
                pathLength: smoothProgress,
              }}
            />
          </svg>

          <ol className="process-list">
            {processSteps.map((step, i) => {
              const align: "left" | "right" = i % 2 === 0 ? "left" : "right";
              const activationPoint = (i / processSteps.length) * 100;
              const reached = rawProgress >= activationPoint;

              return (
                <li
                  key={step.title || step.number}
                  className={`process-row process-row--${align} ${
                    reached ? "is-reached" : ""
                  }`}
                  style={{ minHeight: `${segH}px` }}
                >
                  <div className="process-row__side">
                    <StepCard step={step} align={align} />
                  </div>
                  <div className="process-node" aria-hidden="true" />
                </li>
              );
            })}
          </ol>

          <FinalCircles />
        </div>

        <div className="process-scrollvideo">
          <ScrollVideo src="/images/earth-scrub.mp4" scrollLength={4} />
        </div>
      </div>
    </section>
  );
}