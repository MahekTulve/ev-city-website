"use client";

import { RefObject, useEffect, useRef } from "react";

type Props = {
  containerRef: RefObject<HTMLDivElement | null>;
};

export function TimelineSVG({ containerRef }: Props) {
  const progressRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = progressRef.current;
    const container = containerRef.current;

    if (!path || !container) return;

    const totalLength = path.getTotalLength();

    path.style.strokeDasharray = `${totalLength}`;
    path.style.strokeDashoffset = `${totalLength}`;

    const update = () => {
      const rect = container.getBoundingClientRect();

      const viewport = window.innerHeight;

      // amount of section revealed

      const start = viewport * 0.80;

      const end = rect.height + viewport * 0.20;

      const travelled = start - rect.top;

      const progress = Math.max(
        0,
        Math.min(travelled / end, 1)
      );

      path.style.strokeDashoffset =
        `${totalLength - progress * totalLength}`;
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
  }, [containerRef]);

  const path = `
M550 0

L550 170

C550 210 520 240 470 240
L250 240
C185 240 170 270 170 330
L170 620
C170 690 220 720 300 720
L550 720

C630 720 700 760 700 830
L700 1140
C700 1210 650 1240 590 1240
L550 1240

C470 1240 390 1290 390 1360
L390 1510
C390 1560 360 1600 310 1600
L170 1600
C120 1600 110 1640 110 1700
L110 2000
C110 2080 180 2120 250 2120
L550 2120




`;

  return (
    <svg
      className="timeline-svg"
      viewBox="0 0 1100 4050"
      preserveAspectRatio="none"
    >
      {/* Background */}

      <path
        d={path}
        className="timeline-track"
      />

      {/* Animated */}

      <path
        ref={progressRef}
        d={path}
        className="timeline-progress"
      />
    </svg>
  );
}