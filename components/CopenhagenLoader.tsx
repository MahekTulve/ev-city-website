'use client';
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

const GROUND = 300;
const ACCENT = "#34D399";
const WINDOW = "#FFF8E7";

function House({ x, house, index }: { x: number; house: (typeof HOUSES)[number]; index: number }) {
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
          rx={1.5}
          fill={WINDOW}
          className={styles['window']}
          style={{ 
            animationDelay: `${(r * cols + c) * 160}ms`,
            filter: "drop-shadow(0 0 3px rgba(255, 248, 231, 0.8))"
          }}
        />,
      );
    }
  }

  return (
    <g className={styles['house']}>
      {/* Roof & House Main Body */}
      <polygon points={`${x},${y} ${x + w / 2},${y - 22} ${x + w},${y}`} fill={color} />
      <rect x={x} y={y} width={w} height={h} fill={color} rx={1} />
      <rect x={x} y={y} width={w} height={h} fill="black" opacity={0.12} />

      {/* Roof Trim Accent */}
      <polygon
        points={`${x},${y} ${x + w / 2},${y - 22} ${x + w},${y}`}
        fill="none"
        stroke={ACCENT}
        strokeWidth={1}
        opacity={0.4}
      />

      {/* EV Charging Stations */}
      {index % 2 === 0 && (
        <g className={styles['chargerGlow']}>
          <rect x={x + w / 2 - 4} y={GROUND - 11} width={8} height={11} rx={1.5} fill="#0284C7" />
          <circle cx={x + w / 2} cy={GROUND - 6} r={2.5} fill="#34D399" />
        </g>
      )}

      {/* Spire/Tower Architecture */}
      {spire && (
        <>
          <rect x={x + w / 2 - 2} y={y - 40} width={4} height={20} fill={color} />
          <circle cx={x + w / 2} cy={y - 42} r={3.5} fill={ACCENT} />
        </>
      )}

      {tower === "spire" && (
        <>
          <rect x={x + w / 2 - 10} y={y - 52} width={20} height={34} fill={color} />
          <polygon
            points={`${x + w / 2 - 12},${y - 52} ${x + w / 2},${y - 104} ${x + w / 2 + 12},${y - 52}`}
            fill="#10B981"
            stroke={ACCENT}
            strokeWidth={1}
            opacity={0.95}
          />
          <circle cx={x + w / 2} cy={y - 108} r={4.5} fill={ACCENT} />
        </>
      )}

      {windows}
    </g>
  );
}

export default function CopenhagenLoader({ fading }: { fading: boolean }) {
  const totalW = HOUSES.reduce((s, h) => s + h.w + 8, -8);
  const startX = (1200 - totalW) / 2;
  let cursor = startX;

  return (
    <div aria-hidden className={`${styles['loader']} ${fading ? styles['out'] : ""}`}>
      {/* LUXURY ORGANIC AMBIENT BACKGROUND */}
      <div className={styles['ambientBg']}>
        <div className={`${styles['orb']} ${styles['orb1']}`} />
        <div className={`${styles['orb']} ${styles['orb2']}`} />
        <div className={`${styles['orb']} ${styles['orb3']}`} />
        <div className={styles['fogLayer']} />
      </div>

      <div className={styles['moon']} />
      <div className={styles['frame']} />

      {/* Header HUD Elements */}
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

      {/* Main SVG Waterfront Skyline */}
      <svg viewBox="0 0 1200 340" preserveAspectRatio="xMidYMax meet" className={styles['skyline']}>
        <rect x="0" y={GROUND} width="1200" height="40" fill="#05101a" />
        <line x1="0" y1={GROUND - 1} x2="1200" y2={GROUND - 1} stroke="#34D399" strokeWidth="2" strokeDasharray="14 7" opacity="0.85" />

        {/* Waterfront Houses */}
        <g>
          {HOUSES.map((house, i) => {
            const x = cursor;
            cursor += house.w + 8;
            return <House key={i} x={x} house={house} index={i} />;
          })}
        </g>

        {/* Shimmering Water Reflections */}
        <g opacity={0.85}>
          {HOUSES.map((house, i) => {
            const rx = startX + HOUSES.slice(0, i).reduce((s, h) => s + h.w + 8, 0);
            return (
              <rect
                key={`r${i}`}
                x={rx}
                y={GROUND + 4}
                width={house.w}
                height={28}
                fill={house.color}
                className={styles['reflect']}
              />
            );
          })}
        </g>
      </svg>

      {/* Glassmorphic Progress Tracker */}
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