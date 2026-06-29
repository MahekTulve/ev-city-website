"use client";

import { useEffect, useRef, useState } from "react";
import { processSteps } from "./data";
import { StepCard } from "./StepCard";
import { FinalCircles } from "./FinalCircles";
import ScrollVideo from "@/components/scrollvideo/scrollvideo";

export function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = progressRef.current;
    if (!path) return;

    const length = path.getTotalLength();

    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    const update = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const total = rect.height + window.innerHeight;
      const current = window.innerHeight - rect.top;

      const progress = Math.max(0, Math.min(current / total, 1));

      path.style.strokeDashoffset = `${length - progress * length}`;
    };

    update();

    window.addEventListener("scroll", update, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Triggers line drawing precisely when the container hits 65% of viewport
      const triggerOffset = viewportHeight * 0.65;
      const totalHeight = rect.height;
      const amountScrolled = triggerOffset - rect.top;

      const currentProgress = Math.max(
        0,
        Math.min(100, (amountScrolled / totalHeight) * 100),
      );
      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <section className="process-section">
      <div className="process-container">
        <header className="process-header">
          <p className="process-eyebrow">EVHomes</p>
          <h2 className="process-heading">EV 5 Minute City</h2>
          <p className="process-sub">
            Experience a lifestyle where hospitals, schools, parks, shopping,
            and everyday essentials are all just five minutes away, creating a
            smarter, more connected way of living.
          </p>
        </header>

        <div className="process-timeline" ref={containerRef}>
          {/* <div className="process-line" aria-hidden="true">
            <div className="process-line__fill" style={{ height: `${progress}%` }} />
          </div> */}
          <svg
            className="timeline-svg"
            viewBox="0 0 1100 4000"
            preserveAspectRatio="none"
          >
            {/* Gray Background Path */}
            <path
              className="timeline-track"
              d={`
M550 0

L550 180

C550 220 520 240 470 240
L260 240
C180 240 170 270 170 340
L170 620
C170 690 220 720 290 720
L550 720

C620 720 690 760 690 820
L690 1100
C690 1170 640 1200 570 1200
L550 1200

C480 1200 420 1240 420 1300
L420 1460
C420 1520 380 1560 320 1560
L170 1560
C120 1560 110 1600 110 1660
L110 1940
C110 2010 170 2050 240 2050
L550 2050

C620 2050 700 2090 700 2160
L700 2450
C700 2520 650 2550 590 2550
L550 2550

C470 2550 400 2600 400 2660
L400 2840
C400 2900 360 2940 300 2940
L170 2940
C120 2940 110 2980 110 3040
L110 3320
C110 3390 180 3430 250 3430
L550 3430

C630 3430 710 3470 710 3540
L710 3820
C710 3890 660 3930 590 3930
L550 3930

L550 4180
`}
            />

            {/* Animated Progress Path */}
            <path
              ref={progressRef}
              className="timeline-progress"
              d={`
M550 0

L550 180

C550 220 520 240 470 240
L260 240
C180 240 170 270 170 340
L170 620
C170 690 220 720 290 720
L550 720

C620 720 690 760 690 820
L690 1100
C690 1170 640 1200 570 1200
L550 1200

C480 1200 420 1240 420 1300
L420 1460
C420 1520 380 1560 320 1560
L170 1560
C120 1560 110 1600 110 1660
L110 1940
C110 2010 170 2050 240 2050
L550 2050

C620 2050 700 2090 700 2160
L700 2450
C700 2520 650 2550 590 2550
L550 2550

C470 2550 400 2600 400 2660
L400 2840
C400 2900 360 2940 300 2940
L170 2940
C120 2940 110 2980 110 3040
L110 3320
C110 3390 180 3430 250 3430
L550 3430

C630 3430 710 3470 710 3540
L710 3820
C710 3890 660 3930 590 3930
L550 3930

L550 4180

L550 4360

L550 4520

L550 4700

L550 5000

`}
            />
          </svg>

          <ol className="process-list">
            {processSteps.map((step, i) => {
              // Switches alternate side properties sequentially
              const align: "left" | "right" = i % 2 === 0 ? "left" : "right";

              // Calculates active intersection offsets for individual cards
              const activationPoint = (i / processSteps.length) * 100;
              const reached = progress >= activationPoint;

              return (
                <li
                  key={step.number}
                  className={`process-row process-row--${align} ${reached ? "is-reached" : ""}`}
                >
                  <div className="process-row__side">
                    <StepCard step={step} align={align} />
                  </div>

                  {/* Intersection Anchor point */}
                  <div className="process-node" aria-hidden="true">
                    <span className="process-node__dot" />
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <FinalCircles />
        <div className="process-scrollvideo">
          <ScrollVideo src="/images/earth-scrub.mp4" scrollLength={4} />
        </div>
      </div>
    </section>
  );
}
