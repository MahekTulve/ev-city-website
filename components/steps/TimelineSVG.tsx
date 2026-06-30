"use client";

import { RefObject, useEffect, useRef } from "react";

type Props = {
  containerRef: RefObject<HTMLDivElement | null>;
  steps?: number;
  rowHeight?: number;
  topOffset?: number;
  bottomOffset?: number;   // small straight bit right after last card
  tailLength?: number;     // NEW: extra straight line through circles → scroll video
  leftX?: number;
  rightX?: number;
  centerX?: number;
  radius?: number;
  width?: number;
  initialDraw?: number;    // NEW: fraction (0–1) pre-drawn before scroll starts
};

export function TimelineSVG({
  containerRef,
  steps = 4,
  rowHeight = 520,
  topOffset = 180,
  bottomOffset = 120,
  tailLength = 1200,        // long enough to reach past FinalCircles + into video
  leftX = 170,
  rightX = 930,
  centerX = 550,
  radius = 60,
  width = 1100,
  initialDraw = 0.04,       // ~4% of the line shows immediately
}: Props) {
  const progressRef = useRef<SVGPathElement>(null);

  // ---- Build path: serpentine through cards, then snap back to centerX and run straight down ----
  const R = radius;
  const segments: string[] = [];
  segments.push(`M ${centerX} 0`);
  segments.push(`L ${centerX} ${topOffset - R}`);

  let y = topOffset;
  const firstX = leftX;
  segments.push(`Q ${centerX} ${y} ${centerX - R} ${y}`);
  segments.push(`L ${firstX + R} ${y}`);
  segments.push(`Q ${firstX} ${y} ${firstX} ${y + R}`);

  let currentX = firstX;
  for (let i = 1; i < steps; i++) {
    const nextX = currentX === leftX ? rightX : leftX;
    const goingRight = nextX > currentX;
    const yEnd = y + rowHeight;

    segments.push(`L ${currentX} ${yEnd - R}`);
    segments.push(
      `Q ${currentX} ${yEnd} ${currentX + (goingRight ? R : -R)} ${yEnd}`
    );
    segments.push(`L ${nextX + (goingRight ? -R : R)} ${yEnd}`);
    segments.push(`Q ${nextX} ${yEnd} ${nextX} ${yEnd + R}`);

    currentX = nextX;
    y = yEnd;
  }

  // After the last card: short drop, curve back to centerX, then long straight tail
  segments.push(`L ${currentX} ${y + bottomOffset - R}`);
  // quarter curve from vertical-down to horizontal toward center
  const towardCenter = centerX > currentX ? R : -R;
  segments.push(
    `Q ${currentX} ${y + bottomOffset} ${currentX + towardCenter} ${y + bottomOffset}`
  );
  // horizontal across to just before center
  segments.push(`L ${centerX - towardCenter} ${y + bottomOffset}`);
  // curve from horizontal to vertical-down at centerX
  segments.push(
    `Q ${centerX} ${y + bottomOffset} ${centerX} ${y + bottomOffset + R}`
  );
  // long straight tail going through FinalCircles centre into the scroll video
  segments.push(`L ${centerX} ${y + bottomOffset + tailLength}`);

  const d = segments.join(" ");
  const viewBoxHeight = y + bottomOffset + tailLength + 20;

  // ---- Scroll-driven draw with a pre-drawn head segment ----
  useEffect(() => {
    const path = progressRef.current;
    const container = containerRef.current;
    if (!path || !container) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    // Pre-draw the first `initialDraw` fraction so the line head is visible immediately
    path.style.strokeDashoffset = `${len - len * initialDraw}`;

    const update = () => {
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      const start = vh * 0.8;
      const total = rect.height + vh * 0.2;
      const travelled = start - rect.top;
      const scrollP = Math.max(0, Math.min(travelled / total, 1));
      // never go below the initial draw amount
      const p = Math.max(initialDraw, scrollP);
      path.style.strokeDashoffset = `${len - p * len}`;
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [containerRef, d, initialDraw]);

  return (
    <svg
      className="timeline-svg"
      viewBox={`0 0 ${width} ${viewBoxHeight}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <path d={d} className="timeline-track" />
      <path ref={progressRef} d={d} className="timeline-progress" />
    </svg>
  );
}
