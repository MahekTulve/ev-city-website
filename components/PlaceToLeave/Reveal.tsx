"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import React, { JSX } from "react";

const variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -56 },
  visible: { opacity: 1, x: 0 },
};

const fadeRight = {
  hidden: { opacity: 0, x: 56 },
  visible: { opacity: 1, x: 0 },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

const blurIn = {
  hidden: { opacity: 0, filter: "blur(12px)", y: 24 },
  visible: { opacity: 1, filter: "blur(0px)", y: 0 },
};

const MAP = {
  up: variants,
  left: fadeLeft,
  right: fadeRight,
  scale: scaleUp,
  blur: blurIn,
};

type DirectionKey = keyof typeof MAP;

interface RevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  direction?: DirectionKey;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  as?: keyof JSX.IntrinsicElements;
}

export default function Reveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.9,
  once = true,
  amount = 0.2,
  as = "div",
  ...props
}: RevealProps) {
  // Dynamic motion component casting safely
  const Component = (motion as Record<string, any>)[as] || motion.div;
  const variant = MAP[direction] || variants;

  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variant}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </Component>
  );
}