"use client";
import { motion, useTransform, type MotionValue } from "framer-motion";
interface GlowingTextRevealProps {
  text: string;
  progress: MotionValue<number>;
  color?: string;
  className?: string;
}
interface LetterProps {
  letter: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  color: string;
}
function Letter({
  letter,
  index,
  total,
  progress,
  color,
}: LetterProps) {
  const start = index / total;
  const end = (index + 1) / total;
  // Gold reveal
 const opacity = useTransform(progress, [start, end], [0, 1], {
  clamp: true,
});
  const scale = useTransform(
    progress,
    [start, start + 0.03, end],
    [0.9, 1.12, 1]
  );
  // Glow
  const glowOpacity = useTransform(
  progress,
  [start - 0.02, start + 0.02, end],
  [0, 0.85, 0]
);

const glowScale = useTransform(
  progress,
  [start, start + 0.03],
  [0.8, 1.45]
);
  return (
    <span
      style={{
        position: "relative",
        display: "inline-block",
      }}
    >
      {/* Invisible placeholder */}
      <span
        style={{
          opacity: 0,
        }}
      >
        {letter === " " ? "\u00A0" : letter}
      </span>
      {/* Gold Letter */}
   <motion.span
  style={{
    position: "absolute",
    inset: 0,
    color,
    opacity,
    scale,
    textShadow: `
      0 0 8px ${color}66,
      0 0 16px ${color}44
    `,
  }}
>
  {letter === " " ? "\u00A0" : letter}
</motion.span>
      {/* Colored Bloom */}
     <motion.span
  style={{
    position: "absolute",
    inset: 0,
    color,
    opacity: glowOpacity,
    scale: glowScale,
    filter: "blur(5px)",
    textShadow: `
      0 0 20px ${color},
      0 0 40px ${color},
      0 0 80px ${color},
      0 0 120px ${color}
    `,
    pointerEvents: "none",
  }}
>
  {letter === " " ? "\u00A0" : letter}
</motion.span>
     
    </span>
  );
}
export default function GlowingTextReveal({
  text,
  progress,
  color = "#DAA520",
  className,
}: GlowingTextRevealProps) {
  const letters = text.split("");
  return (
    <div
      className={className}
      style={{
        display: "inline-block",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontFamily: "Inter, sans-serif",
          fontWeight: 500,
          fontSize: "5vw",
          textTransform: "uppercase",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          whiteSpace: "nowrap",
        }}
      >
        {letters.map((letter, index) => (
          <Letter
            key={index}
            letter={letter}
            index={index}
            total={letters.length}
            progress={progress}
            color={color}
          />
        ))}
      </h1>
    </div>
  );
}