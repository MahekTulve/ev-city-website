"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation, useInView } from "motion/react";

export const TextHoverEffect = ({
  text,
  duration,
  className,
  variant = "gradient",
}: {
  text: string;
  duration?: number;
  automatic?: boolean;
  className?: string;
  variant?: "white" | "gradient";
}) => {
  const controls = useAnimation();
  const containerRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(containerRef, {
    once: false,
    amount: 0.4,
  });
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: "50%", cy: "50%" });

  useEffect(() => {
    if (svgRef.current && cursor.x !== null && cursor.y !== null) {
      const svgRect = svgRef.current.getBoundingClientRect();
      const cxPercentage = ((cursor.x - svgRect.left) / svgRect.width) * 100;
      const cyPercentage = ((cursor.y - svgRect.top) / svgRect.height) * 100;
      setMaskPosition({
        cx: `${cxPercentage}%`,
        cy: `${cyPercentage}%`,
      });
    }
  }, [cursor]);

  useEffect(() => {
    if (isInView) {
      controls.set({
        strokeDashoffset: 1000,
        strokeDasharray: 1000,
      });

      controls.start({
        strokeDashoffset: 0,
        strokeDasharray: 1000,
        transition: {
          duration: 8, // Made slower (from 4s to 8s) for a cinematic, premium experience
          ease: "easeInOut",
        },
      });
    }
  }, [isInView, controls]);

  // Determine colors based on variant prop
  const activeStroke = variant === "white" ? "#FFFFFF" : "url(#mainStrokeGradient)";
  const revealStroke = variant === "white" ? "#FFFFFF" : "url(#textGradient)";

  return (
    <svg
      ref={containerRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 24"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className={`select-none uppercase cursor-pointer ${className}`}
    >
      <defs>
        {/* Premium Soft Glow Filter */}
        <filter id="premiumGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="0.9" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Dynamic Colorful Gradients for 5 MINUTE CITY */}
        <linearGradient id="mainStrokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#969695" />
          <stop offset="100%" stopColor="#c59a0c" />
        </linearGradient>

        <linearGradient
          id="textGradient"
          gradientUnits="userSpaceOnUse"
          cx="50%"
          cy="50%"
          r="25%"
        >
          {hovered && (
            <>
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="25%" stopColor="#FF4500" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="75%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </>
          )}
        </linearGradient>

        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r="20%"
          initial={{ cx: "50%", cy: "50%" }}
          animate={maskPosition}
          transition={{ duration: duration ?? 0, ease: "easeOut" }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>
      </defs>

      {/* Background Track Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.4"
        className="fill-transparent stroke-neutral-700 font-sans tracking-tighter font-black text-[22px]"
        style={{ opacity: hovered ? 0.4 : 0 }}
      >
        {text}
      </text>

      {/* Main Animated Outlined Text with slow entry and premium glow filter */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.4"
        stroke={activeStroke}
        filter="url(#premiumGlow)"
        className="fill-transparent font-sans tracking-tighter font-black text-[22px]"
        initial={{
          strokeDashoffset: 1000,
          strokeDasharray: 1000,
        }}
        animate={controls}
      >
        {text}
      </motion.text>

      {/* Cursor Reveal Interactive Fill Text */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke={revealStroke}
        strokeWidth="0.4"
        mask="url(#textMask)"
        className="fill-transparent font-sans tracking-tighter font-black text-[22px]"
      >
        {text}
      </text>
    </svg>
  );
};

export const FooterBackgroundGradient = () => {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        background:
          "radial-gradient(125% 125% at 50% 10%, #0F0F1166 50%, #3ca2fa33 100%)",
      }}
    />
  );
};