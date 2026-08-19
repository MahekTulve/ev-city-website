"use client";

import React, { useEffect, useRef, useState } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

type ParticleLayout = "full" | "text";
type ParticleType = "tiny" | "small" | "glow" | "medium" | "large";

interface OptimizedShaderProps {
  className?: string;
  colors: string[];
  speed?: number;
  style?: React.CSSProperties;

  showParticles?: boolean;
  particleColor?: string;
  particleCount?: number;

  /**
   * Change this value whenever a new text slide becomes active.
   * The canvas will generate a fresh sparkle burst.
   */
  burstKey?: number;

  /** "text" keeps particles clustered around the centre headline. */
  particleLayout?: ParticleLayout;

  /** false creates one burst; true continuously respawns particles. */
  continuous?: boolean;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  type: ParticleType;
  startTime: number;
  duration: number;
  maxOpacity: number;
  driftX: number;
  driftY: number;
  pulseSpeed: number;
  pulseOffset: number;
}

const random = (minimum: number, maximum: number) =>
  minimum + Math.random() * (maximum - minimum);

const clamp = (value: number, minimum: number, maximum: number) =>
  Math.min(Math.max(value, minimum), maximum);

const smoothStep = (value: number) => {
  const progress = clamp(value, 0, 1);
  return progress * progress * (3 - 2 * progress);
};

const hexToRgb = (hexColor: string) => {
  const cleanHex = hexColor.replace("#", "");
  const fullHex =
    cleanHex.length === 3
      ? cleanHex
          .split("")
          .map((character) => character + character)
          .join("")
      : cleanHex;

  const parsedColor = Number.parseInt(fullHex, 16);

  if (Number.isNaN(parsedColor)) {
    return { red: 232, green: 207, blue: 151 };
  }

  return {
    red: (parsedColor >> 16) & 255,
    green: (parsedColor >> 8) & 255,
    blue: parsedColor & 255,
  };
};

export function OptimizedShader({
  className,
  colors,
  speed = 0.4,
  style,
  showParticles = true,
  particleColor = "#e8cf97",
  particleCount = 38,
  burstKey = 0,
  particleLayout = "full",
  continuous = true,
}: OptimizedShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas || !isVisible || !showParticles) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationFrameId = 0;
    let canvasWidth = 0;
    let canvasHeight = 0;
    let particles: Particle[] = [];
    let lastRenderedAt = 0;

    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    const frameInterval = 1000 / (isSmallScreen ? 30 : 60);

    const rgb = hexToRgb(particleColor);

    const getParticleSize = (): {
      type: ParticleType;
      radius: number;
      opacity: number;
    } => {
      const chance = Math.random();

      if (particleLayout === "text") {
        if (chance < 0.48) {
          return {
            type: "tiny",
            radius: random(0.55, 1.15),
            opacity: random(0.28, 0.62),
          };
        }

        if (chance < 0.72) {
          return {
            type: "small",
            radius: random(1.1, 2.05),
            opacity: random(0.24, 0.5),
          };
        }

        if (chance < 0.87) {
          return {
            // This replaces the old plus-shaped star with a blurred glow dot.
            type: "glow",
            radius: random(2.2, 4.2),
            opacity: random(0.16, 0.38),
          };
        }

        if (chance < 0.97) {
          return {
            type: "medium",
            radius: random(4, 7.5),
            opacity: random(0.1, 0.24),
          };
        }

        return {
          type: "large",
          radius: random(8, 13),
          opacity: random(0.06, 0.14),
        };
      }

      if (chance < 0.55) {
        return {
          type: "tiny",
          radius: random(0.8, 1.4),
          opacity: random(0.45, 0.72),
        };
      }

      if (chance < 0.85) {
        return {
          type: "small",
          radius: random(1.5, 2.6),
          opacity: random(0.34, 0.58),
        };
      }

      if (chance < 0.97) {
        return {
          type: "medium",
          radius: random(3, 4.8),
          opacity: random(0.22, 0.4),
        };
      }

      return {
        type: "large",
        radius: random(5, 7),
        opacity: random(0.14, 0.28),
      };
    };

    const getRandomPosition = () => {
      if (particleLayout === "text") {
        const centreX = canvasWidth * 0.5;
        const centreY = canvasHeight * 0.5;

        // Spread particles across the complete headline region.
        const textWidth = Math.min(canvasWidth * 0.85, 900);
        const textHeight = Math.min(canvasHeight * 0.45, 320);

        return {
          x: centreX + (Math.random() - 0.5) * textWidth,
          y: centreY + (Math.random() - 0.5) * textHeight,
        };
      }

      const horizontalPadding = Math.min(25, canvasWidth * 0.04);
      const verticalPadding = Math.min(25, canvasHeight * 0.04);

      return {
        x: random(
          horizontalPadding,
          Math.max(horizontalPadding, canvasWidth - horizontalPadding),
        ),
        y: random(
          verticalPadding,
          Math.max(verticalPadding, canvasHeight - verticalPadding),
        ),
      };
    };

    const createParticle = (
      currentTime: number,
      initialParticle = false,
    ): Particle => {
      const size = getParticleSize();
      const position = getRandomPosition();
      const cinematic = particleLayout === "text";

      return {
        x: position.x,
        y: position.y,
        radius: size.radius,
        type: size.type,
        startTime:
          currentTime +
          (cinematic
            ? random(0, initialParticle ? 650 : 350)
            : initialParticle
              ? random(0, 2200)
              : random(400, 1500)),
        duration: cinematic
          ? size.type === "large" || size.type === "medium"
            ? random(1500, 2450)
            : random(900, 1950)
          : size.type === "large"
            ? random(3400, 4800)
            : random(2400, 4200),
        maxOpacity: size.opacity,
        driftX: cinematic ? random(-18, 18) : random(-3, 3),
        driftY: cinematic ? random(-9, 7) : random(-2, 2),
        pulseSpeed: random(0.001, 0.0024),
        pulseOffset: random(0, Math.PI * 2),
      };
    };

    const createParticles = () => {
      const currentTime = performance.now();
      particles = Array.from({ length: particleCount }, () =>
        createParticle(currentTime, true),
      );
    };

    const resizeCanvas = () => {
      const bounds = container.getBoundingClientRect();
      canvasWidth = bounds.width;
      canvasHeight = bounds.height;

      const pixelRatio = Math.min(
        window.devicePixelRatio || 1,
        isSmallScreen ? 1.25 : 2,
      );
      canvas.width = Math.round(canvasWidth * pixelRatio);
      canvas.height = Math.round(canvasHeight * pixelRatio);
      canvas.style.width = `${canvasWidth}px`;
      canvas.style.height = `${canvasHeight}px`;

      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      createParticles();
    };

    const drawSolidDot = (
      particle: Particle,
      x: number,
      y: number,
      opacity: number,
      scale: number,
    ) => {
      context.save();
      context.globalCompositeOperation = "screen";
      context.globalAlpha = opacity;
      context.fillStyle = `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
      context.shadowColor = `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0.55)`;
      context.shadowBlur = particle.type === "tiny" ? 2.5 : 4.5;
      context.beginPath();
      context.arc(x, y, particle.radius * scale, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const drawSoftCircle = (
      particle: Particle,
      x: number,
      y: number,
      opacity: number,
      scale: number,
    ) => {
      const coreRadius = particle.radius * scale;
      const outerRadius =
        particleLayout === "text"
          ? coreRadius *
            (particle.type === "large"
              ? 3.8
              : particle.type === "glow"
                ? 3.2
                : 2.9)
          : coreRadius * (particle.type === "large" ? 1.7 : 1.55);

      const gradient = context.createRadialGradient(
        x,
        y,
        0,
        x,
        y,
        outerRadius,
      );

      gradient.addColorStop(
        0,
        `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0.92)`,
      );
      gradient.addColorStop(
        0.25,
        `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0.42)`,
      );
      gradient.addColorStop(
        0.62,
        `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0.11)`,
      );
      gradient.addColorStop(
        1,
        `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, 0)`,
      );

      context.save();
      context.globalCompositeOperation = "screen";
      context.globalAlpha = opacity;
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, outerRadius, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const render = (currentTime: number) => {
      if (currentTime - lastRenderedAt < frameInterval) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      lastRenderedAt = currentTime;
      context.clearRect(0, 0, canvasWidth, canvasHeight);
      let hasPendingParticles = false;

      particles.forEach((particle) => {
        if (currentTime < particle.startTime) {
          hasPendingParticles = true;
          return;
        }

        const elapsedTime = currentTime - particle.startTime;
        const progress = elapsedTime / particle.duration;

        if (progress >= 1) {
          if (continuous) {
            Object.assign(particle, createParticle(currentTime, false));
            hasPendingParticles = true;
          }
          return;
        }

        hasPendingParticles = true;

        let visibility = 0;
        let scale = 0.55;

        if (progress < 0.18) {
          const entrance = smoothStep(progress / 0.18);
          visibility = entrance;
          scale = 0.55 + entrance * 0.45;
        } else if (progress < 0.42) {
          visibility = 1;
          scale = 1;
        } else {
          const exit = smoothStep((progress - 0.42) / 0.58);
          visibility = 1 - exit;
          scale =
            particle.type === "medium" || particle.type === "large"
              ? 1 + exit * 0.32
              : 1 - exit * 0.2;
        }

        const pulse =
          1 +
          Math.sin(
            currentTime * particle.pulseSpeed + particle.pulseOffset,
          ) *
            (particle.type === "glow" ? 0.07 : 0.04);

        const movementProgress = smoothStep(progress);
        const currentX =
          particle.x + particle.driftX * movementProgress;
        const currentY =
          particle.y + particle.driftY * movementProgress;
        const finalOpacity = particle.maxOpacity * visibility;
        const finalScale = scale * pulse;

        if (
          particle.type === "glow" ||
          particle.type === "medium" ||
          particle.type === "large"
        ) {
          drawSoftCircle(
            particle,
            currentX,
            currentY,
            finalOpacity,
            finalScale,
          );
        } else {
          drawSolidDot(
            particle,
            currentX,
            currentY,
            finalOpacity,
            finalScale,
          );
        }
      });

      if (continuous || hasPendingParticles) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const resizeObserver = new ResizeObserver(resizeCanvas);
    resizeObserver.observe(container);
    resizeCanvas();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      context.clearRect(0, 0, canvasWidth, canvasHeight);
    };
  }, [
    burstKey,
    continuous,
    isVisible,
    particleColor,
    particleCount,
    particleLayout,
    showParticles,
  ]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        ...style,
      }}
    >
      {isVisible && (
        <MeshGradient className={className} colors={colors} speed={speed} />
      )}

      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 3,
          opacity: isVisible && showParticles ? 1 : 0,
          transition: "opacity 260ms ease",
        }}
      />
    </div>
  );
}