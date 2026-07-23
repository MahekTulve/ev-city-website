import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  type MotionValue,
} from "framer-motion";
import styles from "./DenmarkToVashi.module.css";
import GlowingTextReveal from "../ev-city/GlowingReveal";

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
    size: 160,
    startX: "8vw",
    endX: "65vw",
    startY: 40,
    endY: 1550,
    rotateRange: [-2, 2],
    scaleRange: [0.7, 1.1],
    scrollRange: [0, 1],
  },
  {
    type: "mixer",
    hue: 0,
    size: 120,
    startX: "80vw",
    endX: "20vw",
    startY: 260,
    endY: 1950,
    rotateRange: [0, 0],
    scaleRange: [0.75, 1.05],
    scrollRange: [0, 0.9],
  },
  {
    type: "blueprint",
    hue: 0,
    size: 100,
    startX: "42vw",
    endX: "78vw",
    startY: 540,
    endY: 2260,
    rotateRange: [-5, 5],
    scaleRange: [0.6, 1.1],
    scrollRange: [0.05, 1],
  },
  {
    type: "hardhat",
    hue: 0,
    size: 90,
    startX: "62vw",
    endX: "12vw",
    startY: 920,
    endY: 2650,
    rotateRange: [-4, 6],
    scaleRange: [0.7, 1.1],
    scrollRange: [0.1, 1],
  },
  {
    type: "frame",
    hue: 0,
    size: 140,
    startX: "18vw",
    endX: "50vw",
    startY: 1320,
    endY: 3050,
    rotateRange: [-2, 2],
    scaleRange: [0.65, 1.05],
    scrollRange: [0.15, 1],
  },
];

function CraneIcon() {
  return (
    <motion.svg viewBox="0 0 160 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id="craneSteel" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#5c6470" /><stop offset="45%" stopColor="#3a4149" /><stop offset="100%" stopColor="#22262c" /></linearGradient>
        <linearGradient id="craneBrass" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#d8bd83" /><stop offset="55%" stopColor="#af8c52" /><stop offset="100%" stopColor="#8a6c3c" /></linearGradient>
        <linearGradient id="craneCab" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#454c55" /><stop offset="100%" stopColor="#2a2f35" /></linearGradient>
        <linearGradient id="craneGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#c9dce6" /><stop offset="100%" stopColor="#8fa8b6" /></linearGradient>
      </defs>
      <rect x="58" y="184" width="44" height="10" rx="2" fill="url(#craneSteel)" />
      <rect x="58" y="184" width="44" height="2.5" rx="1.2" fill="#6c7580" opacity="0.6" />
      <rect x="75" y="32" width="10" height="156" fill="url(#craneBrass)" stroke="#5a4526" strokeWidth="0.75" />
      {[46, 62, 78, 94, 110, 126, 142, 158, 174].map((y) => (
        <g key={y} stroke="#4a3a20" strokeWidth="0.6" opacity="0.55">
          <line x1="75" y1={y} x2="85" y2={y - 9} />
          <line x1="75" y1={y - 9} x2="85" y2={y} />
        </g>
      ))}
      <rect x="79" y="27" width="28" height="17" rx="1.5" fill="url(#craneCab)" stroke="#181b1e" strokeWidth="1" />
      <rect x="83" y="30" width="10" height="9" rx="1" fill="url(#craneGlass)" opacity="0.9" />
      <motion.g animate={{ rotate: [-1.2, 1.2, -1.2] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} style={{ transformOrigin: "80px 24px" }}>
        <line x1="80" y1="24" x2="152" y2="24" stroke="url(#craneBrass)" strokeWidth="4" strokeLinecap="round" />
        <line x1="80" y1="24" x2="42" y2="24" stroke="url(#craneBrass)" strokeWidth="4" strokeLinecap="round" />
        {[88, 100, 112, 124, 136].map((x) => (
          <line key={x} x1={x} y1="19" x2={x + 6} y2="24" stroke="#4a3a20" strokeWidth="0.6" opacity="0.5" />
        ))}
        <rect x="29" y="19" width="15" height="13" fill="url(#craneSteel)" stroke="#181b1e" strokeWidth="0.6" />
        <line x1="80" y1="7" x2="150" y2="24" stroke="#7d8590" strokeWidth="0.9" />
        <line x1="80" y1="7" x2="44" y2="24" stroke="#7d8590" strokeWidth="0.9" />
        <line x1="80" y1="7" x2="80" y2="24" stroke="#7d8590" strokeWidth="0.9" />
        <line x1="140" y1="24" x2="140" y2="68" stroke="#2a2f35" strokeWidth="0.9" />
        <path d="M136 68 h8 v5 a4 4 0 0 1 -8 0 z" fill="url(#craneBrass)" stroke="#5a4526" strokeWidth="0.5" />
      </motion.g>
    </motion.svg>
  );
}

function MixerIcon() {
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id="mixerChassis" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#4a5058" /><stop offset="100%" stopColor="#2b2f35" /></linearGradient>
        <linearGradient id="mixerCab" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#eee9dc" /><stop offset="100%" stopColor="#cfc7b0" /></linearGradient>
        <radialGradient id="mixerDrum" cx="38%" cy="30%" r="75%"><stop offset="0%" stopColor="#c99a6b" /><stop offset="55%" stopColor="#a06a3e" /><stop offset="100%" stopColor="#7a4c2a" /></radialGradient>
        <linearGradient id="mixerGlass" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#c9dce6" /><stop offset="100%" stopColor="#8fa8b6" /></linearGradient>
        <radialGradient id="wheelHub" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#c9a660" /><stop offset="100%" stopColor="#8a6c3c" /></radialGradient>
      </defs>
      <rect x="10" y="80" width="150" height="26" rx="3" fill="url(#mixerChassis)" stroke="#15171a" strokeWidth="1" />
      <rect x="10" y="53" width="42" height="55" rx="3" fill="url(#mixerCab)" stroke="#8f8770" strokeWidth="1" />
      <rect x="16" y="61" width="20" height="15" rx="1.5" fill="url(#mixerGlass)" />
      <rect x="60" y="61" width="70" height="8" fill="url(#mixerChassis)" />
      <motion.g animate={{ rotate: 360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} style={{ transformOrigin: "100px 60px" }}>
        <ellipse cx="100" cy="60" rx="42" ry="29" fill="url(#mixerDrum)" stroke="#4a2f1a" strokeWidth="1" />
        <path d="M62 60 a38 25 0 0 1 76 0" fill="none" stroke="#5c3a20" strokeWidth="1.6" opacity="0.6" />
        <path d="M68 45 l64 30" stroke="#5c3a20" strokeWidth="1.6" opacity="0.5" />
        <path d="M68 75 l64 -30" stroke="#5c3a20" strokeWidth="1.6" opacity="0.5" />
      </motion.g>
      <circle cx="34" cy="112" r="14" fill="#1c1e21" />
      <circle cx="34" cy="112" r="5" fill="url(#wheelHub)" />
      <circle cx="130" cy="112" r="14" fill="#1c1e21" />
      <circle cx="130" cy="112" r="5" fill="url(#wheelHub)" />
    </svg>
  );
}

function BlueprintIcon() {
  return (
    <motion.svg viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", overflow: "visible" }} animate={{ rotate: [-1, 1, -1] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}>
      <defs>
        <linearGradient id="blueprintPaper" x1="0" y1="0" x2="1" y2="0.2"><stop offset="0%" stopColor="#2c4c72" /><stop offset="55%" stopColor="#1f3a58" /><stop offset="100%" stopColor="#152A42" /></linearGradient>
      </defs>
      <rect x="20" y="10" width="100" height="140" fill="url(#blueprintPaper)" stroke="#0a1523" strokeWidth="1" />
      {[30, 50, 70, 90, 110, 130].map((y) => (
        <line key={y} x1="28" y1={y} x2="112" y2={y} stroke="#c9a660" strokeWidth="0.4" opacity="0.28" />
      ))}
      {[40, 60, 80, 100].map((x) => (
        <line key={x} x1={x} y1="14" x2={x} y2="146" stroke="#c9a660" strokeWidth="0.4" opacity="0.28" />
      ))}
      <path d="M40 130 v-50 h16 v-14 h12 v14 h16 v50 z" fill="none" stroke="#e9dfc4" strokeWidth="1.4" strokeLinejoin="round" />
    </motion.svg>
  );
}

function HardHatIcon() {
  return (
    <motion.svg viewBox="0 0 140 100" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <defs>
        <linearGradient id="hatBrim" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#d7bd86" /><stop offset="100%" stopColor="#a3833f" /></linearGradient>
        <radialGradient id="hatDome" cx="38%" cy="28%" r="80%"><stop offset="0%" stopColor="#eddcb2" /><stop offset="35%" stopColor="#d3ae6c" /><stop offset="100%" stopColor="#98773f" /></radialGradient>
      </defs>
      <ellipse cx="70" cy="66" rx="61" ry="13" fill="url(#hatBrim)" stroke="#6e5527" strokeWidth="1" />
      <path d="M18 62 a52 42 0 0 1 104 0 z" fill="url(#hatDome)" stroke="#6e5527" strokeWidth="1" />
    </motion.svg>
  );
}

function BuildingFrameIcon() {
  return (
    <svg viewBox="0 0 160 220" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", overflow: "visible" }}>
      <g stroke="#6b7280" strokeWidth="2">
        <line x1="30" y1="20" x2="30" y2="210" />
        <line x1="80" y1="20" x2="80" y2="210" />
        <line x1="130" y1="20" x2="130" y2="210" />
        {[20, 55, 90, 125, 160, 195].map((y) => (
          <line key={y} x1="30" y1={y} x2="130" y2={y} />
        ))}
      </g>
    </svg>
  );
}

function renderIcon(type: ElementType) {
  switch (type) {
    case "crane": return <CraneIcon />;
    case "mixer": return <MixerIcon />;
    case "blueprint": return <BlueprintIcon />;
    case "hardhat": return <HardHatIcon />;
    case "frame": return <BuildingFrameIcon />;
  }
}

function ScrollConstructionElement({
  config,
  progress,
}: {
  config: ConstructionElementConfig;
  progress: MotionValue<number>;
}) {
  const smoothProgress = useSpring(progress, { stiffness: 60, damping: 25 });
  const x = useTransform(smoothProgress, config.scrollRange, [config.startX, config.endX]);
  const y = useTransform(smoothProgress, config.scrollRange, [config.startY, config.endY]);
  const rotate = useTransform(smoothProgress, config.scrollRange, config.rotateRange);
  const scale = useTransform(smoothProgress, config.scrollRange, config.scaleRange);

  return (
    <motion.div
      className={styles.floatingElement}
      style={{
        x, y, rotate, scale,
        width: config.size, height: config.size,
        opacity: 0.85,
      }}
    >
      {renderIcon(config.type)}
    </motion.div>
  );
}

type BuildingConfig = {
  left: string;
  height: number;
  width: number;
  underConstruction?: boolean;
  delay?: number;
  color: string;
};

const skylineBuildings: BuildingConfig[] = [
  { left: "3%", height: 130, width: 60, color: "#5b6b7a" },
  { left: "13%", height: 190, width: 46, color: "#6d7f8f", underConstruction: true, delay: 0.4 },
  { left: "24%", height: 100, width: 70, color: "#8a7a63" },
  { left: "37%", height: 230, width: 50, color: "#54697a" },
  { left: "48%", height: 150, width: 56, color: "#7a6b57", underConstruction: true, delay: 0.9 },
  { left: "60%", height: 180, width: 44, color: "#5b6b7a" },
  { left: "70%", height: 110, width: 66, color: "#84756a" },
  { left: "82%", height: 210, width: 48, color: "#4f6577", underConstruction: true, delay: 0.15 },
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
    <div className={styles.building} style={{ left: config.left, width: config.width, height: config.height }}>
      <svg viewBox={`0 0 ${config.width} ${config.height}`} width={config.width} height={config.height}>
        <rect x="0" y="0" width={config.width} height={config.height} fill={config.color} />
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
            <line x1="30" y1="6" x2="30" y2="36" stroke="#f4b400" strokeWidth="2.5" />
            <motion.line
              x1="8" y1="6" x2="54" y2="6"
              stroke="#f4b400" strokeWidth="2.5"
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

function AmenityIcon({ type }: { type: string }) {
  switch (type) {
    case "01": // School
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      );
    case "02": // Hospital
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 6v12M6 12h12" />
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
      );
    case "03": // Malls
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
        </svg>
      );
    case "04": // Transit
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="3" width="16" height="16" rx="2" />
          <path d="M4 11h16M12 3v8M8 19l-2 3M16 19l2 3M8 15h.01M16 15h.01" />
        </svg>
      );
    case "05": // Green Wetlands
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      );
    case "06": // Fine Dining
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#d4af37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M12 2v2M12 17v5" />
        </svg>
      );
    default:
      return null;
  }
}

export default function DenmarkToVashi() {
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

  const amenitiesData = [
    { num: "01", title: "Top Schools", copy: "DAV, Ryan International, Fr. Agnel within walking distance.", align: "left" },
    { num: "02", title: "Hospitals", copy: "Multi-specialty care including Fortis & Apollo Healthcare.", align: "right" },
    { num: "03", title: "Retail & Malls", copy: "Inorbit & Raghuleela lifestyle avenues.", align: "left" },
    { num: "04", title: "Transit Access", copy: "Harbour Line & upcoming Metro corridors.", align: "right" },
    { num: "05", title: "Green Wetlands", copy: "Lush gardens & expansive pedestrian boulevards.", align: "left" },
    { num: "06", title: "Fine Dining", copy: "A rich culinary scene right inside your neighborhood grid.", align: "right" },
  ];

  return (
    <div ref={containerRef} className={styles.cityscape}>

      {/* 1. GRAND CENTER-ALIGNED DESIGNER HERO SECTION */}
      <section className={`${styles.section} ${styles.hero}`}>
        <div className={styles.heroContentWrapper}>

          <motion.div
            className={styles.heroBadge}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.badgeDot} />
            <span>Architectural Landmark</span>
          </motion.div>

          <div ref={heroRef} className={styles.titleWrapper}>
            <GlowingTextReveal
              text="Denmark to Vashi"
              progress={heroProgress}
              color="#d4af37"
              className={styles.particleTitle}
            />
          </div>

          <motion.div
            className={styles.centerDividerWrapper}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className={styles.dividerLine} />
            <div className={styles.dividerDiamond} />
            <div className={styles.dividerLine} />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className={styles.subtitle}
          >
            Vashi encompasses every virtue of a globally benchmarked urban sanctuary — elite infrastructure, healthcare, education, and seamless connection.
          </motion.p>

          <motion.div
            className={styles.scrollHintContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.8 }}
          >
            <span className={styles.scrollHint}>Explore Experience</span>
            <div className={styles.scrollPill}>
              <div className={styles.scrollDot} />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. AMENITIES SECTION WITH CURTAIN / PARDA WIPE ANIMATION */}
      <section className={styles.section}>
        <div className={styles.amenityContainer}>

          <div className={styles.amenityHeaderCenter}>
            <span className={styles.eyebrow}>── Infrastructure Overview</span>
            <h2 className={styles.editorialHeading}>
              Unmatched <em className={styles.italicGold}>Proximity</em>
            </h2>
          </div>

       <div className={styles.zigzagTimeline}>
  {amenitiesData.map((item) => {
    const isLeft = item.align === "left";

    return (
      <div
        key={item.num}
        className={`${styles.zigzagRow} ${isLeft ? styles.rowLeft : styles.rowRight}`}
      >
        <motion.div
          className={styles.amenityCardLuxury}
          style={{
            // Left card left side se open hoga, Right card right side se
            transformOrigin: isLeft ? "left center" : "right center",
          }}
          initial={{
            opacity: 0,
            scaleX: 0, // Curtain closed (band parda)
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1, // Curtain wipe open (parda khulega)
          }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.85,
            ease: [0.25, 1, 0.5, 1], // Smooth Video Reveal Motion
          }}
        >
          <div className={styles.cornerTL} />
          <div className={styles.cornerBR} />

          {/* Background Glow */}
          <div className={styles.cardGlowOverlay} />

          {/* Card Header */}
          <div className={styles.cardHeader}>
            <div className={styles.iconBadge}>
              <AmenityIcon type={item.num} />
            </div>
            <span className={styles.cardNumber}>{item.num}</span>
          </div>

          {/* Card Content */}
          <div className={styles.cardBody}>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <div className={styles.titleUnderline} />
            <p className={styles.cardDesc}>{item.copy}</p>
          </div>

        </motion.div>
      </div>
    );
  })}
</div>

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

      {/* SKYLINE */}
      <div className={styles.skyline}>
        {skylineBuildings.map((config, i) => (
          <Building key={i} config={config} />
        ))}
        <div className={styles.ground} />
      </div>
    </div>
  );
}