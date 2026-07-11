"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import {
  Train,
  ShoppingBag,
  Plus,
  GraduationCap,
  Briefcase,
  Plane,
  MapPin,
  Diamond,
  Crown,
  Timer,
  Share2,
  Shield,
  Heart,
  ChevronLeft,
  ChevronRight,
  Hand,
  Hotel,
  Utensils,
  Film,
  Building,
} from "lucide-react";
import styles from "./denmark.module.css";

type NodeData = {
  time: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
};

// 10 Icons Total (6 Old + 4 New Added)
const ALL_NODES: NodeData[] = [
  { time: "2", label: "RAILWAY STATION", sub: "Seamless Connectivity", icon: <Train size={28} /> },
  { time: "3", label: "NEXUS MALL", sub: "Shopping & Dining", icon: <ShoppingBag size={26} /> },
  { time: "4", label: "APOLLO HOSPITAL", sub: "Quality Healthcare", icon: <Plus size={26} /> },
  { time: "5", label: "TOP SCHOOLS", sub: "Bright Futures", icon: <GraduationCap size={26} /> },
  { time: "5", label: "BUSINESS HUB", sub: "Work & Thrive", icon: <Briefcase size={26} /> },
  { time: "15", label: "AIRPORT", sub: "Travel with Ease", icon: <Plane size={26} /> },
  { time: "7", label: "5-STAR HOTEL", sub: "Luxury Stay & Hospitality", icon: <Hotel size={26} /> },
  { time: "4", label: "FINE DINING", sub: "Gourmet Cuisines", icon: <Utensils size={26} /> },
  { time: "6", label: "MULTIPLEX", sub: "Entertainment Hub", icon: <Film size={26} /> },
  { time: "8", label: "IT PARK", sub: "Corporate Neighborhood", icon: <Building size={26} /> },
];

// Fixed layout coordinates on the Arc curve line (6 slots visible at once)
const ARC_POSITIONS = [
  { x: 8, y: 55 },
  { x: 22, y: 35 },
  { x: 36, y: 25 },
  { x: 64, y: 25 },
  { x: 78, y: 35 },
  { x: 92, y: 55 },
];

export default function VashiDenmark() {
  // Slider index pointer tracking
  const [startIndex, setStartIndex] = useState(0);
  const nodesContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (nodesContainerRef.current) {
      gsap.fromTo(
        nodesContainerRef.current.querySelectorAll(`.${styles.nodeInner}`),
        { scale: 0.8, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.2)", stagger: 0.05 }
      );
    }
  }, [startIndex]);

  const handleNext = () => {
    // Right button click (Explore) -> Moves forward to new data
    setStartIndex((prev) => (prev + 1) % (ALL_NODES.length - ARC_POSITIONS.length + 1));
  };

  const handlePrev = () => {
    // Left button click (Drag To) -> Moves backward to previous data
    setStartIndex((prev) => (prev === 0 ? ALL_NODES.length - ARC_POSITIONS.length : prev - 1));
  };

  // Extract exactly 6 items from list starting from active slice pointer
  const visibleNodes = ALL_NODES.slice(startIndex, startIndex + ARC_POSITIONS.length);

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.cardrow}>
          <aside className={styles.card}>
            <div className={styles.brandMark}><Crown size={22} /></div>
            <h2 className={styles.brandName}>DENMARK</h2>
            <p className={styles.brandCity}>VASHI</p>
            <p className={styles.brandDesc}>
              A landmark address that puts the best of lifestyle, business,
              education, healthcare & entertainment within 5 minutes.
            </p>
          </aside>
          
          <aside>
            <p className={styles.topLabel}>EVERYTHING WITHIN REACH</p>
            <h1 className={styles.title}>
              THE <span className={styles.big}>5</span> MINUTE CITY
            </h1>
            <p className={styles.subtitle}>
              At Denmark, every essential is just minutes away.
              <br />
              Live a life of unmatched convenience and connectivity.
            </p>
          </aside>

          <aside>
            <div className={styles.card}>
              <div className={styles.infoRow}>
                <MapPin className={styles.infoIcon} size={22} />
                <div>
                  <p className={styles.infoTitle}>PRIME LOCATION</p>
                  <p className={styles.infoSub}>Heart of Vashi</p>
                </div>
              </div>
              <div className={styles.infoRow}>
                <Diamond className={styles.infoIcon} size={22} />
                <div>
                  <p className={styles.infoTitle}>LUXURY RESIDENCES</p>
                  <p className={styles.infoSub}>Redefined</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section className={styles.mapWrap}>
          {/* Background SVG - Perfectly STATIC */}
          <svg className={styles.arcSvg} viewBox="0 0 100 120" preserveAspectRatio="none">
            <defs>
              <linearGradient id="arcGrad" x1="0" x2="1">
                <stop offset="0" stopColor="#d4af37" stopOpacity="0.2" />
                <stop offset="0.5" stopColor="#d4af37" stopOpacity="0.9" />
                <stop offset="1" stopColor="#d4af37" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d="M 8 55 Q 50 -10 92 55"
              fill="none"
              stroke="url(#arcGrad)"
              strokeWidth="0.3"
            />
          </svg>
          
          {/* Center Brand Plate - Perfectly STATIC */}
          <div className={styles.center}>
            <div className={styles.centerCircle}>
              <div className={styles.centerBrand}><Crown size={26} /></div>
              <div className={styles.centerName}>DENMARK</div>
              <div className={styles.centerCity}>VASHI</div>
            </div>
          </div>

          {/* Nodes Box - Data morphs dynamically inside fixed slots */}
          <div className={styles.nodes} ref={nodesContainerRef}>
            {visibleNodes.map((n, index) => {
              const pos = ARC_POSITIONS[index];
              return (
                <div
                  key={n.label}
                  className={styles.node}
                  style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                >
                  <div className={styles.nodeInner}>
                    <div className={styles.nodeTime}>{n.time}</div>
                    <div className={styles.nodeMin}>MIN</div>
                    <div className={styles.nodeCircle}>{n.icon}</div>
                    <div className={styles.nodeLabel}>{n.label}</div>
                    <div className={styles.nodeSub}>{n.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Controls triggers slide data change */}
          <div className={styles.dragBar}>
            <button onClick={handlePrev} className={styles.arrowBtn} aria-label="Slide Left">
              <ChevronLeft size={16} />
            </button>
            <span>DRAG TO</span>
            <Hand size={18} />
            <span>EXPLORE</span>
            <button onClick={handleNext} className={styles.arrowBtn} aria-label="Slide Right">
              <ChevronRight size={16} />
            </button>
          </div>

          <div className={styles.features}>
            {[
              { icon: <Timer size={22} />, a: "SAVE TIME", b: "MORE LIFE" },
              { icon: <Share2 size={22} />, a: "UNMATCHED", b: "CONNECTIVITY" },
              { icon: <Diamond size={22} />, a: "PREMIUM", b: "LIFESTYLE" },
              { icon: <Shield size={22} />, a: "TRUSTED", b: "DEVELOPER" },
              { icon: <Heart size={22} />, a: "DESIGNED FOR", b: "BETTER LIVING" },
            ].map((f) => (
              <div key={f.a} className={styles.feature}>
                {f.icon}
                <div className={styles.featureText}>
                  <p>{f.a}</p>
                  <p>{f.b}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}