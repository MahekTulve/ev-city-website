import { useEffect, useRef } from "react";
import { useScroll, useTransform, useMotionValueEvent, type MotionValue } from "framer-motion";

type Particle = {
  tx: number; // target x
  ty: number; // target y
  ox: number; // scatter offset x
  oy: number; // scatter offset y
  delay: number; // 0..1 — when in scroll progress this particle assembles
  size: number;
  hue: number;
};

type Props = {
  text: string;
  /** Optional external scroll progress (0..1). If omitted, uses page scroll. */
  progress?: MotionValue<number>;
  /** Reveal (assemble) as progress increases, or dissolve (scatter). */
  mode?: "reveal" | "dissolve";
  fontFamily?: string;
  fontWeight?: number | string;
  /** Font size in px at 1x DPR. */
  fontSize?: number;
  /** Sampling step in px — smaller = more particles = heavier. */
  sampleStep?: number;
  /** Base color for particles (any CSS color). */
  color?: string;
  /** How far particles scatter (in px). */
  scatter?: number;
  className?: string;
  style?: React.CSSProperties;
  /** Width/height of the canvas box; defaults to auto-fit text. */
  width?: number;
  height?: number;
};

export default function ParticleTextReveal({
  text,
  progress,
  mode = "reveal",
  fontFamily = "Georgia, serif",
  fontWeight = 700,
  fontSize = 120,
  sampleStep = 4,
  color = "#DAA520",
  scatter = 260,
  className,
  style,
  width,
  height,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const boxRef = useRef({ w: 0, h: 0 });
  const progressRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Fallback: use page scroll if no progress passed in.
  const { scrollYProgress } = useScroll();
  const src = progress ?? scrollYProgress;
  const p = useTransform(src, (v) => v);

  useMotionValueEvent(p, "change", (v) => {
    progressRef.current = v;
  });

  // Build particles from the text (once per text/size change).
  useEffect(() => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Measure text on an offscreen canvas.
    const off = document.createElement("canvas");
    const octx = off.getContext("2d")!;
    octx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    const metrics = octx.measureText(text);
    const textW = Math.ceil(metrics.width);
    const textH = Math.ceil(fontSize * 1.25);

    const boxW = width ?? textW + 40;
    const boxH = height ?? textH + 40;
    boxRef.current = { w: boxW, h: boxH };

    off.width = boxW;
    off.height = boxH;
    octx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    octx.fillStyle = "#fff";
    octx.textBaseline = "middle";
    octx.textAlign = "center";
    octx.fillText(text, boxW / 2, boxH / 2);

    const data = octx.getImageData(0, 0, boxW, boxH).data;
    const parts: Particle[] = [];
    for (let y = 0; y < boxH; y += sampleStep) {
      for (let x = 0; x < boxW; x += sampleStep) {
        const alpha = data[(y * boxW + x) * 4 + 3];
        if (alpha > 128) {
          const nx = x / boxW; // 0..1 left→right
          // Left assembles first, right last (stagger by x with a bit of noise).
          const delay = Math.min(1, Math.max(0, nx * 0.75 + Math.random() * 0.25));
          const angle = Math.random() * Math.PI * 2;
          const dist = scatter * (0.4 + Math.random() * 0.9);
          parts.push({
            tx: x,
            ty: y,
            ox: Math.cos(angle) * dist,
            oy: Math.sin(angle) * dist - 40,
            delay,
            size: (sampleStep - 1) * (0.6 + Math.random() * 0.6),
            hue: Math.random(),
          });
        }
      }
    }
    particlesRef.current = parts;

    // Prepare main canvas.
    const canvas = canvasRef.current!;
    canvas.width = boxW * dpr;
    canvas.height = boxH * dpr;
    canvas.style.width = `${boxW}px`;
    canvas.style.height = `${boxH}px`;
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const spread = 0.35; // each particle takes ~35% of scroll to fully assemble

    const render = () => {
      const { w, h } = boxRef.current;
      ctx.clearRect(0, 0, w, h);
      const gp = progressRef.current;
      for (const pt of particlesRef.current) {
        // local progress: 0 = scattered, 1 = at target
        let local = (gp - pt.delay) / spread;
        local = Math.min(1, Math.max(0, local));
        if (mode === "dissolve") local = 1 - local;
        const e = easeOut(local);
        const x = pt.tx + pt.ox * (1 - e);
        const y = pt.ty + pt.oy * (1 - e);
        ctx.globalAlpha = e;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(x, y, pt.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, fontFamily, fontWeight, fontSize, sampleStep, color, scatter, width, height, mode]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", ...style }}
      aria-label={text}
      role="img"
    />
  );
}
