"use client";

import { AnimatePresence, motion } from "framer-motion";
import { processSteps } from "./data";
import "./ProcessFloatingImages.css";

type Props = {
  activeIndex: number;
};

export default function ProcessFloatingImages({ activeIndex }: Props) {
  const step = processSteps[activeIndex];

  if (!step) return null;

  return (
    <div className="pfi-wrapper">
      {/* Left Image Stream */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={`left-${activeIndex}`}
          src={step.floatingImages[0]}
          className="pfi-left"
          initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -40, filter: "blur(4px)" }}
          transition={{
            duration: 0.65,
            ease: [0.16, 1, 0.3, 1], // Premium custom cubic-bezier
          }}
        />
      </AnimatePresence>

      {/* Right Image Stream */}
      <AnimatePresence mode="popLayout">
        <motion.img
          key={`right-${activeIndex}`}
          src={step.floatingImages[1]}
          className="pfi-right"
          initial={{ opacity: 0, y: -40 }}
          animate={{
            y: [0, -12, 0], // Continuous gentle drift
            rotateY: 0,
            opacity: 1,
          }}
          transition={{
            // Keep your existing transition for the entry, but add a loop for the Y axis:
            y: {
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            },
            default: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
          }}
          exit={{ opacity: 0, y: 40 }}
        />
      </AnimatePresence>
    </div>
  );
}
