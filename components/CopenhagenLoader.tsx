'use client';
import styles from "./CopenhagenLoader.module.css";

export const MIN_LOADER_MS = 2000;

type RoofType = "spire" | "helipad" | "solar" | "slanted" | "stepped";

interface BuildingConfig {
  colorGrad: string;
  h: number;
  w: number;
  roofType?: RoofType;
  facadeType: "grid" | "vertical" | "luxury" | "mesh";
}

const HOUSES: BuildingConfig[] = [
  { colorGrad: "bGrad1", h: 210, w: 85, roofType: "spire", facadeType: "grid" },
  { colorGrad: "bGrad2", h: 160, w: 70, roofType: "solar", facadeType: "luxury" },
  { colorGrad: "bGrad3", h: 260, w: 95, roofType: "helipad", facadeType: "mesh" },
  { colorGrad: "bGrad1", h: 190, w: 75, roofType: "slanted", facadeType: "vertical" },
  { colorGrad: "bGrad2", h: 280, w: 105, roofType: "spire", facadeType: "grid" },
  { colorGrad: "bGrad3", h: 220, w: 80, roofType: "stepped", facadeType: "luxury" },
  { colorGrad: "bGrad1", h: 250, w: 90, roofType: "helipad", facadeType: "mesh" },
  { colorGrad: "bGrad2", h: 180, w: 70, roofType: "solar", facadeType: "vertical" },
  { colorGrad: "bGrad3", h: 230, w: 85, roofType: "slanted", facadeType: "grid" },
  { colorGrad: "bGrad1", h: 170, w: 65, roofType: "stepped", facadeType: "luxury" }
];

const GROUND = 300;
const ACCENT = "#34D399";

function House({ x, house, index }: { x: number; house: BuildingConfig; index: number }) {
  const { colorGrad, h, w, roofType, facadeType } = house;
  const y = GROUND - h;

  return (
    <g className={`${styles['house']} ${styles[`house-${index}`]}`}>
      {/* Base Structure with Gradient & Glass Texture */}
      <rect x={x} y={y} width={w} height={h} fill={`url(#${colorGrad})`} rx={1} />
      
      {/* Facade Textures for Realism */}
      {facadeType === "grid" && (
        <rect x={x} y={y} width={w} height={h} fill="url(#gridPattern)" opacity={0.45} />
      )}
      {facadeType === "vertical" && (
        <rect x={x} y={y} width={w} height={h} fill="url(#vertPattern)" opacity={0.35} />
      )}
      {facadeType === "luxury" && (
        <g opacity={0.4}>
          {Array.from({ length: Math.floor(h / 20) }).map((_, i) => (
            <line
              key={i}
              x1={x}
              y1={y + i * 20}
              x2={x + w}
              y2={y + i * 20}
              stroke="#38BDF8"
              strokeWidth="0.8"
              opacity="0.5"
            />
          ))}
        </g>
      )}

      {/* Glass Reflection Highlight */}
      <polygon
        points={`${x},${y} ${x + w * 0.4},${y} ${x + w * 0.1},${y + h} ${x},${y + h}`}
        fill="url(#glassReflection)"
        opacity={0.35}
      />

      {/* Roof Architecture */}
      {roofType === "spire" && (
        <g>
          <line x1={x + w / 2} y1={y} x2={x + w / 2} y2={y - 35} stroke="#38BDF8" strokeWidth="2" />
          <circle cx={x + w / 2} cy={y - 35} r="2.5" fill="#34D399" className={styles['chargerGlow']} />
        </g>
      )}

      {roofType === "helipad" && (
        <g>
          <rect x={x + 8} y={y - 6} width={w - 16} height={6} fill="#1E293B" stroke="#34D399" strokeWidth="0.8" />
          <circle cx={x + w / 2} cy={y - 3} r={3} fill="none" stroke="#38BDF8" strokeWidth="0.8" />
        </g>
      )}

      {roofType === "slanted" && (
        <polygon
          points={`${x},${y} ${x + w},${y - 12} ${x + w},${y}`}
          fill="url(#roofGradient)"
          stroke="#34D399"
          strokeWidth="0.8"
        />
      )}

      {roofType === "stepped" && (
        <g fill="#0F172A" stroke="#38BDF8" strokeWidth="0.5">
          <rect x={x + 10} y={y - 10} width={w - 20} height={10} />
          <rect x={x + 20} y={y - 18} width={w - 40} height={8} />
        </g>
      )}

      {/* Edge Highlights */}
      <line x1={x} y1={y} x2={x} y2={y + h} stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1={x + w} y1={y} x2={x + w} y2={y + h} stroke="rgba(0,0,0,0.5)" strokeWidth="1" />
      <line x1={x} y1={y} x2={x + w} y2={y} stroke={ACCENT} strokeWidth="1.2" opacity={0.8} />
    </g>
  );
}

export default function CopenhagenLoader({ fading }: { fading: boolean }) {
  const totalW = HOUSES.reduce((s, h) => s + h.w + 10, -10);
  const startX = (1200 - totalW) / 2;
  let cursor = startX;

  return (
    <div aria-hidden className={`${styles['loader']} ${fading ? styles['out'] : ""}`}>
      <div className={styles['ambientBg']}>
        <div className={`${styles['orb']} ${styles['orb1']}`} />
        <div className={`${styles['orb']} ${styles['orb2']}`} />
        <div className={`${styles['orb']} ${styles['orb3']}`} />
        <div className={styles['fogLayer']} />
      </div>

      <div className={styles['moon']} />
      <div className={styles['frame']} />

      <div className={styles['headerHud']}>
        <div className={styles['title']}>
          <span className={styles['titleText']}>The <span>5</span> MINUTE CITY</span>
          <div className={styles['rule']}>
            <span className={styles['ruleLine']} />
            <span className={styles['ruleDiamond']} />
            <span className={styles['ruleLine']} />
          </div>
          <div className={styles['subtitle']}>ev city</div>
        </div>
      </div>

      <svg viewBox="0 0 1200 340" preserveAspectRatio="xMidYMax meet" className={styles['skyline']}>
        <defs>
          <linearGradient id="bGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>

          <linearGradient id="bGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#243348" />
            <stop offset="60%" stopColor="#111C2D" />
            <stop offset="100%" stopColor="#060D17" />
          </linearGradient>

          <linearGradient id="bGrad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#172554" />
            <stop offset="50%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#030712" />
          </linearGradient>

          <linearGradient id="glassReflection" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
          </linearGradient>

          <linearGradient id="roofGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1E293B" stopOpacity="0.2" />
          </linearGradient>

          {/* Patterns for Architectural Windows & Facades */}
          <pattern id="gridPattern" width="10" height="14" patternUnits="userSpaceOnUse">
            <rect width="8" height="10" fill="#E0F2FE" opacity="0.15" rx="0.5" />
            <line x1="0" y1="14" x2="10" y2="14" stroke="#000" strokeWidth="1" opacity="0.4" />
          </pattern>

          <pattern id="vertPattern" width="6" height="16" patternUnits="userSpaceOnUse">
            <rect width="3" height="12" fill="#38BDF8" opacity="0.2" />
          </pattern>
        </defs>

        {/* Base Road & Reflection */}
        <rect x="0" y={GROUND} width="1200" height="40" fill="#030712" />
        <line x1="0" y1={GROUND - 1} x2="1200" y2={GROUND - 1} stroke="#34D399" strokeWidth="2" strokeDasharray="14 7" opacity="0.85" />

        {/* Buildings Render */}
        <g>
          {HOUSES.map((house, i) => {
            const x = cursor;
            cursor += house.w + 10;
            return <House key={i} x={x} house={house} index={i} />;
          })}
        </g>

        {/* Ground Reflections */}
        <g opacity={0.6}>
          {HOUSES.map((house, i) => {
            const rx = startX + HOUSES.slice(0, i).reduce((s, h) => s + h.w + 10, 0);
            return (
              <rect
                key={`r${i}`}
                x={rx}
                y={GROUND + 2}
                width={house.w}
                height={35}
                fill="url(#bGrad1)"
                className={`${styles['reflect']} ${styles[`reflect-${i}`]}`}
              />
            );
          })}
        </g>
      </svg>

      <div className={styles['progressWrap']}>
        <div className={styles['track']}>
          <div className={styles['bar']} />
        </div>
        <div className={styles['progressLabel']}>
          <span>LOADING ENVIRONMENT</span>
          <span style={{ color: "#34D399", fontWeight: "700" }}>100%</span>
        </div>
      </div>
    </div>
  );
}