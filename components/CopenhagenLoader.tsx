'use client';
import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import styles from "./CopenhagenLoader.module.css";

export const MIN_LOADER_MS = 2000;

const HOUSES: { color: string; h: number; w: number; spire?: boolean; tower?: "round" | "spire" }[] = [
  { color: "#C9603B", h: 120, w: 64 },
  { color: "#E3A92B", h: 96, w: 56 },
  { color: "#5B8A72", h: 140, w: 72, spire: true },
  { color: "#B54A32", h: 108, w: 60 },
  { color: "#2F4858", h: 168, w: 60, tower: "spire" },
  { color: "#D97E4A", h: 100, w: 56 },
  { color: "#E8C85A", h: 132, w: 68, spire: true },
  { color: "#4E7A8A", h: 92, w: 52 },
  { color: "#A63D2F", h: 118, w: 62 },
  { color: "#7A9E7E", h: 88, w: 50 },
  { color: "#D9A03F", h: 128, w: 66, spire: true },
  { color: "#8C4A3C", h: 104, w: 58 },
];

const STARS: { top: string; left: string; delay: number }[] = [
  { top: "8%", left: "12%", delay: 0 },
  { top: "14%", left: "30%", delay: 400 },
  { top: "6%", left: "48%", delay: 900 },
  { top: "18%", left: "62%", delay: 300 },
  { top: "10%", left: "72%", delay: 1200 },
  { top: "22%", left: "20%", delay: 700 },
  { top: "5%", left: "85%", delay: 500 },
  { top: "26%", left: "8%", delay: 1500 },
  { top: "16%", left: "42%", delay: 1800 },
  { top: "28%", left: "78%", delay: 1000 },
];

const GROUND = 300;
const GOLD = "#E8C85A";
const WINDOW = "#F6EFDF";

function House({ x, house }: { x: number; house: (typeof HOUSES)[number] }) {
  const { color, h, w, spire, tower } = house;
  const y = GROUND - h;
  const windows = [];
  const cols = Math.max(2, Math.floor(w / 20));
  const rows = Math.max(2, Math.floor(h / 34));
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      windows.push(
        <rect
          key={`${r}-${c}`}
          x={x + 8 + c * ((w - 16) / Math.max(1, cols - 1)) - 3}
          y={y + 16 + r * ((h - 32) / Math.max(1, rows - 1)) - 5}
          width={7}
          height={10}
          rx={1}
          fill={WINDOW}
          className={styles['window']}
          style={{ animationDelay: `${(r * cols + c) * 180}ms` }}
        />,
      );
    }
  }
  return (
    <g className={styles['house']}>
      <polygon points={`${x},${y} ${x + w / 2},${y - 22} ${x + w},${y}`} fill={color} />
      <rect x={x} y={y} width={w} height={h} fill={color} />
      <rect x={x} y={y} width={w} height={h} fill="black" opacity={0.14} />
      <polygon
        points={`${x},${y} ${x + w / 2},${y - 22} ${x + w},${y}`}
        fill="none"
        stroke={GOLD}
        strokeWidth={1}
        opacity={0.35}
      />
      {spire && (
        <>
          <rect x={x + w / 2 - 2} y={y - 40} width={4} height={20} fill={color} />
          <circle cx={x + w / 2} cy={y - 42} r={3.5} fill={GOLD} />
        </>
      )}
      {tower === "spire" && (
        <>
          <rect x={x + w / 2 - 10} y={y - 52} width={20} height={34} fill={color} />
          <polygon
            points={`${x + w / 2 - 12},${y - 52} ${x + w / 2},${y - 104} ${x + w / 2 + 12},${y - 52}`}
            fill="#3E5C4B"
            stroke={GOLD}
            strokeWidth={1}
            opacity={0.95}
          />
          <circle cx={x + w / 2} cy={y - 108} r={4} fill={GOLD} />
        </>
      )}
      {windows}
    </g>
  );
}

export default function CopenhagenLoader({ fading }: { fading: boolean }) {
  const [progress, setProgress] = useState(0);
  const [showLoadingBar, setShowLoadingBar] = useState(true);

  useEffect(() => {
    const start = performance.now();
    const id = setInterval(() => {
      const elapsed = performance.now() - start;
      const t = elapsed / MIN_LOADER_MS;
      
      const currentProgress = Math.min(100, Math.round(t * 100));
      setProgress(currentProgress);

      // Buildings ke screen par poore tarah aane ke baad (~1.2s) loading bar gayab ho jayega
      if (elapsed >= 1200) {
        setShowLoadingBar(false);
      }

      if (t >= 1) {
        clearInterval(id);
      }
    }, 40);

    return () => clearInterval(id);
  }, []);

  const totalW = HOUSES.reduce((s, h) => s + h.w + 8, -8);
  const startX = (1200 - totalW) / 2;
  let cursor = startX;

  return (
    <div aria-hidden className={`${styles['loader']} ${fading ? styles['out'] : ""}`}>
      <div className={styles['stars']}>
        {STARS.map((s, i) => (
          <span
            key={i}
            className={styles['star']}
            style={{ top: s.top, left: s.left, animationDelay: `${s.delay}ms` }}
          />
        ))}
      </div>
      <div className={styles['moon']} />
      <div className={styles['frame']} />

      <div className={styles['title']}>
        <span className={styles['titleText']}>Cøpenhagen</span>
        <div className={styles['rule']}>
          <span className={styles['ruleLine']} />
          <span className={styles['ruleDiamond']} />
          <span className={styles['ruleLine']} />
        </div>
        <div className={styles['subtitle']}>Denmark</div>
      </div>

      <svg viewBox="0 0 1200 340" preserveAspectRatio="xMidYMax meet" className={styles['skyline']}>
        <rect x="0" y={GROUND} width="1200" height="40" fill="#0d1e2a" />
        <g>
          {HOUSES.map((house, i) => {
            const x = cursor;
            cursor += house.w + 8;
            return <House key={i} x={x} house={house} />;
          })}
        </g>
        <rect x="0" y={GROUND - 1.5} width="1200" height="3" fill={GOLD} opacity={0.4} />
        <g>
          {HOUSES.map((house, i) => {
            const rx = startX + HOUSES.slice(0, i).reduce((s, h) => s + h.w + 8, 0);
            return (
              <rect
                key={`r${i}`}
                x={rx}
                y={GROUND + 2}
                width={house.w}
                height={26}
                fill={house.color}
                className={styles['reflect']}
              />
            );
          })}
        </g>
      </svg>

      <div className={`${styles['progressWrap']} ${!showLoadingBar ? styles['progressWrapHidden'] : ''}`}>
        <div className={styles['track']}>
          <div className={styles['bar']} style={{ "--cp-progress": `${progress}%` } as CSSProperties} />
        </div>
        <div className={styles['progressLabel']}>Loading {progress}%</div>
      </div>
    </div>
  );
}