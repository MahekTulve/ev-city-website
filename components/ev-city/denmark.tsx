"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import styles from "./denmark.module.css";
import ParticleTextReveal from "./ParticleTextReveal";
import GlowingTextReveal from "./GlowingReveal";

// Note: this project uses TanStack Router, not Next.js — no router imports
// are needed here, but keep that in mind if you add navigation later.

type ElementType = "crane" | "mixer" | "blueprint" | "hardhat" | "frame";

type ConstructionElementConfig = {
  type: ElementType;
  hue: number;
  size: number;
  startX: string;
  endX: string;
  startY: number;
  endY: number;
  rotateRange: [number, number];
  scaleRange: [number, number];
  scrollRange: [number, number];
};

const elements: ConstructionElementConfig[] = [
  {
    type: "crane",
    hue: 0,
    size: 170,
    startX: "8vw",
    endX: "65vw",
    startY: 40,
    endY: 1550,
    rotateRange: [-4, 4],
    scaleRange: [0.7, 1.15],
    scrollRange: [0, 1],
  },
  {
    type: "mixer",
    hue: 0,
    size: 130,
    startX: "80vw",
    endX: "20vw",
    startY: 260,
    endY: 1950,
    rotateRange: [0, 0],
    scaleRange: [0.75, 1.1],
    scrollRange: [0, 0.9],
  },
  {
    type: "blueprint",
    hue: 0,
    size: 110,
    startX: "42vw",
    endX: "78vw",
    startY: 540,
    endY: 2260,
    rotateRange: [-10, 8],
    scaleRange: [0.6, 1.15],
    scrollRange: [0.05, 1],
  },
  {
    type: "hardhat",
    hue: 0,
    size: 95,
    startX: "62vw",
    endX: "12vw",
    startY: 920,
    endY: 2650,
    rotateRange: [-8, 10],
    scaleRange: [0.7, 1.2],
    scrollRange: [0.1, 1],
  },
  {
    type: "frame",
    hue: 0,
    size: 150,
    startX: "18vw",
    endX: "50vw",
    startY: 1320,
    endY: 3050,
    rotateRange: [-3, 3],
    scaleRange: [0.65, 1.1],
    scrollRange: [0.15, 1],
  },
];

/* ---------------------------- Construction icons --------------------------- */

function CraneIcon() {
  return (
    <motion.svg
      viewBox="0 0 160 200"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <linearGradient id="craneSteel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#5c6470" />
          <stop offset="45%" stopColor="#3a4149" />
          <stop offset="100%" stopColor="#22262c" />
        </linearGradient>
        <linearGradient id="craneBrass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d8bd83" />
          <stop offset="55%" stopColor="#af8c52" />
          <stop offset="100%" stopColor="#8a6c3c" />
        </linearGradient>
        <linearGradient id="craneCab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#454c55" />
          <stop offset="100%" stopColor="#2a2f35" />
        </linearGradient>
        <linearGradient id="craneGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9dce6" />
          <stop offset="100%" stopColor="#8fa8b6" />
        </linearGradient>
      </defs>

      {/* base */}
      <rect
        x="58"
        y="184"
        width="44"
        height="10"
        rx="2"
        fill="url(#craneSteel)"
      />
      <rect
        x="58"
        y="184"
        width="44"
        height="2.5"
        rx="1.2"
        fill="#6c7580"
        opacity="0.6"
      />

      {/* mast */}
      <rect
        x="75"
        y="32"
        width="10"
        height="156"
        fill="url(#craneBrass)"
        stroke="#5a4526"
        strokeWidth="0.75"
      />
      {/* mast lattice, finer and more numerous */}
      {[46, 62, 78, 94, 110, 126, 142, 158, 174].map((y) => (
        <g key={y} stroke="#4a3a20" strokeWidth="0.6" opacity="0.55">
          <line x1="75" y1={y} x2="85" y2={y - 9} />
          <line x1="75" y1={y - 9} x2="85" y2={y} />
        </g>
      ))}

      {/* operator cab */}
      <rect
        x="79"
        y="27"
        width="28"
        height="17"
        rx="1.5"
        fill="url(#craneCab)"
        stroke="#181b1e"
        strokeWidth="1"
      />
      <rect
        x="83"
        y="30"
        width="10"
        height="9"
        rx="1"
        fill="url(#craneGlass)"
        opacity="0.9"
      />

      {/* jib group (subtle sway) */}
      <motion.g
        animate={{ rotate: [-1.2, 1.2, -1.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "80px 24px" }}
      >
        {/* long jib */}
        <line
          x1="80"
          y1="24"
          x2="152"
          y2="24"
          stroke="url(#craneBrass)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* counter-jib */}
        <line
          x1="80"
          y1="24"
          x2="42"
          y2="24"
          stroke="url(#craneBrass)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* fine top-chord lattice along jib */}
        {[88, 100, 112, 124, 136].map((x) => (
          <line
            key={x}
            x1={x}
            y1="19"
            x2={x + 6}
            y2="24"
            stroke="#4a3a20"
            strokeWidth="0.6"
            opacity="0.5"
          />
        ))}
        {/* counterweight */}
        <rect
          x="29"
          y="19"
          width="15"
          height="13"
          fill="url(#craneSteel)"
          stroke="#181b1e"
          strokeWidth="0.6"
        />
        {/* support cables */}
        <line
          x1="80"
          y1="7"
          x2="150"
          y2="24"
          stroke="#7d8590"
          strokeWidth="0.9"
        />
        <line
          x1="80"
          y1="7"
          x2="44"
          y2="24"
          stroke="#7d8590"
          strokeWidth="0.9"
        />
        <line
          x1="80"
          y1="7"
          x2="80"
          y2="24"
          stroke="#7d8590"
          strokeWidth="0.9"
        />
        {/* hook cable + hook */}
        <line
          x1="140"
          y1="24"
          x2="140"
          y2="68"
          stroke="#2a2f35"
          strokeWidth="0.9"
        />
        <path
          d="M136 68 h8 v5 a4 4 0 0 1 -8 0 z"
          fill="url(#craneBrass)"
          stroke="#5a4526"
          strokeWidth="0.5"
        />
      </motion.g>
    </motion.svg>
  );
}

function MixerIcon() {
  return (
    <svg
      viewBox="0 0 200 140"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <linearGradient id="mixerChassis" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4a5058" />
          <stop offset="100%" stopColor="#2b2f35" />
        </linearGradient>
        <linearGradient id="mixerCab" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#eee9dc" />
          <stop offset="100%" stopColor="#cfc7b0" />
        </linearGradient>
        <radialGradient id="mixerDrum" cx="38%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#c99a6b" />
          <stop offset="55%" stopColor="#a06a3e" />
          <stop offset="100%" stopColor="#7a4c2a" />
        </radialGradient>
        <linearGradient id="mixerGlass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c9dce6" />
          <stop offset="100%" stopColor="#8fa8b6" />
        </linearGradient>
        <radialGradient id="wheelHub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#c9a660" />
          <stop offset="100%" stopColor="#8a6c3c" />
        </radialGradient>
      </defs>

      {/* chassis */}
      <rect
        x="10"
        y="80"
        width="150"
        height="26"
        rx="3"
        fill="url(#mixerChassis)"
        stroke="#15171a"
        strokeWidth="1"
      />
      {/* cab */}
      <rect
        x="10"
        y="53"
        width="42"
        height="55"
        rx="3"
        fill="url(#mixerCab)"
        stroke="#8f8770"
        strokeWidth="1"
      />
      <rect
        x="16"
        y="61"
        width="20"
        height="15"
        rx="1.5"
        fill="url(#mixerGlass)"
      />

      {/* mixing drum support */}
      <rect x="60" y="61" width="70" height="8" fill="url(#mixerChassis)" />

      {/* rotating drum */}
      <motion.g
        animate={{ rotate: 360 }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: "100px 60px" }}
      >
        <ellipse
          cx="100"
          cy="60"
          rx="42"
          ry="29"
          fill="url(#mixerDrum)"
          stroke="#4a2f1a"
          strokeWidth="1"
        />
        <path
          d="M62 60 a38 25 0 0 1 76 0"
          fill="none"
          stroke="#5c3a20"
          strokeWidth="1.6"
          opacity="0.6"
        />
        <path
          d="M68 45 l64 30"
          stroke="#5c3a20"
          strokeWidth="1.6"
          opacity="0.5"
        />
        <path
          d="M68 75 l64 -30"
          stroke="#5c3a20"
          strokeWidth="1.6"
          opacity="0.5"
        />
        <ellipse cx="86" cy="48" rx="14" ry="7" fill="#e8c9a0" opacity="0.25" />
      </motion.g>

      {/* chute */}
      <path
        d="M132 78 l19 17 l-7 4 l-17 -15 z"
        fill="#6c6f74"
        stroke="#22262c"
        strokeWidth="0.75"
      />

      {/* wheels */}
      <circle cx="34" cy="112" r="14" fill="#1c1e21" />
      <circle cx="34" cy="112" r="5" fill="url(#wheelHub)" />
      <circle cx="130" cy="112" r="14" fill="#1c1e21" />
      <circle cx="130" cy="112" r="5" fill="url(#wheelHub)" />
    </svg>
  );
}

function BlueprintIcon() {
  return (
    <motion.svg
      viewBox="0 0 140 160"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
      animate={{ rotate: [-1.5, 1.5, -1.5] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="blueprintPaper" x1="0" y1="0" x2="1" y2="0.2">
          <stop offset="0%" stopColor="#2c4c72" />
          <stop offset="55%" stopColor="#1f3a58" />
          <stop offset="100%" stopColor="#152A42" />
        </linearGradient>
        <linearGradient id="blueprintRoll" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#14243a" />
          <stop offset="100%" stopColor="#0d1928" />
        </linearGradient>
      </defs>

      {/* rolled edge */}
      <ellipse
        cx="20"
        cy="80"
        rx="9"
        ry="69"
        fill="url(#blueprintRoll)"
        stroke="#0a1523"
        strokeWidth="1"
      />
      {/* main sheet */}
      <rect
        x="20"
        y="10"
        width="100"
        height="140"
        fill="url(#blueprintPaper)"
        stroke="#0a1523"
        strokeWidth="1"
      />
      {/* subtle paper sheen */}
      <rect
        x="20"
        y="10"
        width="38"
        height="140"
        fill="#ffffff"
        opacity="0.04"
      />

      {/* grid lines, fine gold thread */}
      {[30, 50, 70, 90, 110, 130].map((y) => (
        <line
          key={y}
          x1="28"
          y1={y}
          x2="112"
          y2={y}
          stroke="#c9a660"
          strokeWidth="0.4"
          opacity="0.28"
        />
      ))}
      {[40, 60, 80, 100].map((x) => (
        <line
          key={x}
          x1={x}
          y1="14"
          x2={x}
          y2="146"
          stroke="#c9a660"
          strokeWidth="0.4"
          opacity="0.28"
        />
      ))}

      {/* drafted building outline */}
      <path
        d="M40 130 v-50 h16 v-14 h12 v14 h16 v50 z"
        fill="none"
        stroke="#e9dfc4"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <line
        x1="48"
        y1="90"
        x2="48"
        y2="130"
        stroke="#e9dfc4"
        strokeWidth="0.8"
        opacity="0.85"
      />
      <line
        x1="72"
        y1="90"
        x2="72"
        y2="130"
        stroke="#e9dfc4"
        strokeWidth="0.8"
        opacity="0.85"
      />
      {/* dimension ticks for a drafted feel */}
      <line
        x1="40"
        y1="134"
        x2="72"
        y2="134"
        stroke="#c9a660"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <line
        x1="40"
        y1="132"
        x2="40"
        y2="136"
        stroke="#c9a660"
        strokeWidth="0.5"
        opacity="0.5"
      />
      <line
        x1="72"
        y1="132"
        x2="72"
        y2="136"
        stroke="#c9a660"
        strokeWidth="0.5"
        opacity="0.5"
      />
    </motion.svg>
  );
}

function HardHatIcon() {
  return (
    <motion.svg
      viewBox="0 0 140 100"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
      animate={{ y: [0, -5, 0] }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="hatBrim" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d7bd86" />
          <stop offset="100%" stopColor="#a3833f" />
        </linearGradient>
        <radialGradient id="hatDome" cx="38%" cy="28%" r="80%">
          <stop offset="0%" stopColor="#eddcb2" />
          <stop offset="35%" stopColor="#d3ae6c" />
          <stop offset="100%" stopColor="#98773f" />
        </radialGradient>
      </defs>

      {/* brim */}
      <ellipse
        cx="70"
        cy="66"
        rx="61"
        ry="13"
        fill="url(#hatBrim)"
        stroke="#6e5527"
        strokeWidth="1"
      />
      {/* dome */}
      <path
        d="M18 62 a52 42 0 0 1 104 0 z"
        fill="url(#hatDome)"
        stroke="#6e5527"
        strokeWidth="1"
      />
      {/* soft highlight */}
      <ellipse cx="48" cy="38" rx="16" ry="10" fill="#ffffff" opacity="0.2" />
      {/* center ridge */}
      <path
        d="M70 21 v41"
        stroke="#8a6a35"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.8"
      />
      {/* side ridge */}
      <path
        d="M34 60 a40 34 0 0 1 72 0"
        fill="none"
        stroke="#8a6a35"
        strokeWidth="1.2"
        opacity="0.7"
      />
      {/* headband hint */}
      <rect
        x="30"
        y="58"
        width="80"
        height="5"
        rx="2.5"
        fill="#2a2f35"
        opacity="0.35"
      />
    </motion.svg>
  );
}

function BuildingFrameIcon() {
  return (
    <svg
      viewBox="0 0 160 220"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%", overflow: "visible" }}
    >
      <defs>
        <linearGradient id="frameSteel" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6b7280" />
          <stop offset="100%" stopColor="#3d434c" />
        </linearGradient>
        <linearGradient id="frameGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#bcd6e3" />
          <stop offset="100%" stopColor="#7f9dab" />
        </linearGradient>
      </defs>

      {/* steel frame grid */}
      <g stroke="url(#frameSteel)" strokeWidth="2.25">
        <line x1="30" y1="20" x2="30" y2="210" />
        <line x1="80" y1="20" x2="80" y2="210" />
        <line x1="130" y1="20" x2="130" y2="210" />
        {[20, 55, 90, 125, 160, 195].map((y) => (
          <line key={y} x1="30" y1={y} x2="130" y2={y} />
        ))}
        {/* cross braces */}
        <line x1="30" y1="20" x2="80" y2="55" />
        <line x1="80" y1="20" x2="30" y2="55" />
        <line x1="80" y1="90" x2="130" y2="125" />
        <line x1="130" y1="90" x2="80" y2="125" />
      </g>

      {/* completed floors (partial glass) */}
      <rect
        x="34"
        y="160"
        width="42"
        height="34"
        fill="url(#frameGlass)"
        opacity="0.75"
      />
      <rect
        x="84"
        y="160"
        width="42"
        height="34"
        fill="url(#frameGlass)"
        opacity="0.55"
      />
      <line
        x1="55"
        y1="160"
        x2="55"
        y2="194"
        stroke="#3d434c"
        strokeWidth="0.6"
        opacity="0.4"
      />
      <line
        x1="105"
        y1="160"
        x2="105"
        y2="194"
        stroke="#3d434c"
        strokeWidth="0.6"
        opacity="0.4"
      />

      {/* small crane on top */}
      <line
        x1="105"
        y1="8"
        x2="105"
        y2="20"
        stroke="#af8c52"
        strokeWidth="2.25"
      />
      <motion.line
        x1="80"
        y1="8"
        x2="140"
        y2="8"
        stroke="#af8c52"
        strokeWidth="2.25"
        animate={{ rotate: [-3, 3, -3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transformOrigin: "105px 8px" }}
      />

      {/* scaffolding on side */}
      <g stroke="#af8c52" strokeWidth="1" opacity="0.55">
        <line x1="20" y1="20" x2="20" y2="210" />
        {[40, 80, 120, 160, 200].map((y) => (
          <line key={y} x1="14" y1={y} x2="30" y2={y} />
        ))}
      </g>
    </svg>
  );
}

function renderIcon(type: ElementType) {
  switch (type) {
    case "crane":
      return <CraneIcon />;
    case "mixer":
      return <MixerIcon />;
    case "blueprint":
      return <BlueprintIcon />;
    case "hardhat":
      return <HardHatIcon />;
    case "frame":
      return <BuildingFrameIcon />;
  }
}

function ScrollConstructionElement({
  config,
  progress,
}: {
  config: ConstructionElementConfig;
  progress: MotionValue<number>;
}) {
  const x = useTransform(progress, config.scrollRange, [
    config.startX,
    config.endX,
  ]);
  const y = useTransform(progress, config.scrollRange, [
    config.startY,
    config.endY,
  ]);
  const rotate = useTransform(progress, config.scrollRange, config.rotateRange);
  const scale = useTransform(progress, config.scrollRange, config.scaleRange);
  return (
    <motion.div
      className={styles.floatingElement}
      style={{
        x,
        y,
        rotate,
        scale,
        width: config.size,
        height: config.size,
        filter: "drop-shadow(0 14px 20px rgba(30, 30, 40, 0.25))",
      }}
    >
      {renderIcon(config.type)}
    </motion.div>
  );
}

/* --------------------------------- Skyline --------------------------------- */

type BuildingConfig = {
  left: string;
  height: number;
  width: number;
  color: string;
  underConstruction?: boolean;
  delay?: number;
};

const skylineBuildings: BuildingConfig[] = [
  { left: "3%", height: 130, width: 60, color: "#5b6b7a" },
  {
    left: "13%",
    height: 190,
    width: 46,
    color: "#6d7f8f",
    underConstruction: true,
    delay: 0.4,
  },
  { left: "24%", height: 100, width: 70, color: "#8a7a63" },
  { left: "37%", height: 230, width: 50, color: "#54697a" },
  {
    left: "48%",
    height: 150,
    width: 56,
    color: "#7a6b57",
    underConstruction: true,
    delay: 0.9,
  },
  { left: "60%", height: 180, width: 44, color: "#5b6b7a" },
  { left: "70%", height: 110, width: 66, color: "#84756a" },
  {
    left: "82%",
    height: 210,
    width: 48,
    color: "#4f6577",
    underConstruction: true,
    delay: 0.15,
  },
  { left: "92%", height: 140, width: 54, color: "#6d7f8f" },
];

function Building({ config }: { config: BuildingConfig }) {
  const cols = Math.max(2, Math.floor(config.width / 16));
  const rows = Math.max(3, Math.floor(config.height / 22));
  const windows = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      windows.push({ r, c, id: `${r}-${c}` });
    }
  }
  const winW = (config.width - 12) / cols;
  const winH = (config.height - 16) / rows;

  return (
    <div
      className={styles.building}
      style={{ left: config.left, width: config.width, height: config.height }}
    >
      <svg
        viewBox={`0 0 ${config.width} ${config.height}`}
        width={config.width}
        height={config.height}
      >
        <rect
          x="0"
          y="0"
          width={config.width}
          height={config.height}
          fill={config.color}
        />
        {windows.map(({ r, c, id }) => (
          <motion.rect
            key={id}
            x={6 + c * winW}
            y={8 + r * winH}
            width={winW * 0.62}
            height={winH * 0.55}
            fill="#ffe9a8"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.85, 0.15] }}
            transition={{
              duration: 4 + ((r + c) % 5),
              repeat: Infinity,
              ease: "easeInOut",
              delay: (config.delay ?? 0) + (r + c) * 0.15,
            }}
          />
        ))}
      </svg>
      {config.underConstruction && (
        <div className={styles.miniCrane}>
          <svg viewBox="0 0 60 40" width="60" height="40">
            <line
              x1="30"
              y1="6"
              x2="30"
              y2="36"
              stroke="#f4b400"
              strokeWidth="2.5"
            />
            <motion.line
              x1="8"
              y1="6"
              x2="54"
              y2="6"
              stroke="#f4b400"
              strokeWidth="2.5"
              animate={{ rotate: [-4, 4, -4] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              style={{ transformOrigin: "30px 6px" }}
            />
          </svg>
        </div>
      )}
    </div>
  );
}

/* --------------------------------- Page --------------------------------- */

export default function RealEstateJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start 80%", "end 30%"],
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className={styles.cityscape}>
      {/* <motion.div
        className={styles.sun}
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      /> */}

      <section className={`${styles.section} ${styles.hero}`}>
        <div
          ref={heroRef}
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <GlowingTextReveal
            text="Scroll Into the Skyline"
            progress={heroProgress}
            color="#DAA520"
            className={styles.particleTitle} // Reusing your layout styles
          />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9 }}
          className={styles.subtitle}
        >
          From blueprint to breaking ground to the finished tower — watch a city
          rise with every scroll of your hand.
        </motion.p>
        <motion.div
          className={styles.scrollHint}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          scroll ↓
        </motion.div>
      </section>

      <section className={`${styles.section} ${styles.sectionLeft}`}>
        <div className={styles.sectionText}>
          <h2 className={styles.sectionHeading}>Groundbreaking begins</h2>
          <p className={styles.sectionCopy}>
            Every skyline starts with a blueprint and a crew ready to break
            ground. The first crane rises to mark where the tower will stand.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionRight}`}>
        <div className={styles.sectionText}>
          <h2 className={styles.sectionHeading}>Steel rises against the sky</h2>
          <p className={styles.sectionCopy}>
            Beam by beam, the frame climbs higher — each floor a promise of the
            homes and offices still to come.
          </p>
        </div>
      </section>

      <section className={`${styles.section} ${styles.sectionCenter}`}>
        <div className={styles.sectionText} style={{ maxWidth: "40rem" }}>
          <h2 className={styles.sectionHeading}>A city takes shape</h2>
          <p className={styles.sectionCopy}>
            React · Framer Motion · SVG — three tiny pieces, one living
            construction site.
          </p>
        </div>
      </section>

      <div className={styles.elementLayer}>
        {elements.map((config, i) => (
          <ScrollConstructionElement
            key={i}
            config={config}
            progress={scrollYProgress}
          />
        ))}
      </div>

      <div className={styles.skyline}>
        {skylineBuildings.map((config, i) => (
          <Building key={i} config={config} />
        ))}
        <div className={styles.ground} />
      </div>
    </div>
  );
}
