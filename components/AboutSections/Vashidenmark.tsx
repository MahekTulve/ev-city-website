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
import styles from "./vashidenmark.module.css";

type NodeData = {
  id: number;
  time: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
};

const ALL_NODES: NodeData[] = [
  { id: 1, time: "2", label: "RAILWAY STATION", sub: "Seamless Connectivity", icon: <Train size={28} /> },
  { id: 2, time: "3", label: "NEXUS MALL", sub: "Shopping & Dining", icon: <ShoppingBag size={26} /> },
  { id: 3, time: "4", label: "APOLLO HOSPITAL", sub: "Quality Healthcare", icon: <Plus size={26} /> },
  { id: 4, time: "5", label: "TOP SCHOOLS", sub: "Bright Futures", icon: <GraduationCap size={26} /> },
  { id: 5, time: "5", label: "BUSINESS HUB", sub: "Work & Thrive", icon: <Briefcase size={26} /> },
  { id: 6, time: "15", label: "AIRPORT", sub: "Travel with Ease", icon: <Plane size={26} /> },
  { id: 7, time: "7", label: "5-STAR HOTEL", sub: "Luxury Stay & Hospitality", icon: <Hotel size={26} /> },
  { id: 8, time: "4", label: "FINE DINING", sub: "Gourmet Cuisines", icon: <Utensils size={26} /> },
  { id: 9, time: "6", label: "MULTIPLEX", sub: "Entertainment Hub", icon: <Film size={26} /> },
  { id: 10, time: "8", label: "IT PARK", sub: "Corporate Neighborhood", icon: <Building size={26} /> },
];

const ARC_POSITIONS = [
  { x: 7, y: 68 },
  { x: 20, y: 43 },
  { x: 34, y: 27 },
  { x: 50, y: 10 },
  { x: 66, y: 28 },
  { x: 80, y: 46 },
  { x: 92, y: 68 },
];

export default function VashiDenmark() {
  const [startIndex, setStartIndex] = useState(0);
  const nodesContainerRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);

  const totalNodes = ALL_NODES.length;
  const visibleCount = ARC_POSITIONS.length;

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % totalNodes);
  };

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + totalNodes) % totalNodes);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const centerNodeIndex = (startIndex + 3) % totalNodes;
  const currentCenterData = ALL_NODES[centerNodeIndex];

  // GSAP Animation Engine
  useEffect(() => {
    if (nodesContainerRef.current) {
      const nodeElements = nodesContainerRef.current.querySelectorAll(`.${styles.node}`);
      nodeElements.forEach((el) => {
        const targetLeft = el.getAttribute("data-left");
        const targetTop = el.getAttribute("data-top");
        const isVisible = el.getAttribute("data-visible") === "true";
        const isCenter = el.getAttribute("data-center") === "true";

        if (targetLeft && targetTop) {
          if (isCenter) {
            gsap.to(el, {
              left: `${targetLeft}%`,
              top: `${targetTop}%`,
              opacity: 0,
              scale: 0.6,
              duration: 0.8,
              ease: "power2.out",
              overwrite: "auto",
            });
          } else if (!isVisible) {
            gsap.to(el, {
              left: `${targetLeft}%`,
              top: `${targetTop}%`,
              opacity: 0,
              scale: 0.3,
              duration: 0.2,
              ease: "power2.in",
              overwrite: "auto",
            });
          } else {
            gsap.to(el, {
              left: `${targetLeft}%`,
              top: `${targetTop}%`,
              opacity: 1,
              scale: 1,
              duration: 0.85,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        }
      });
    }

    const centerCircleEl = document.querySelector(`.${styles.centerCircle}`);
    if (centerCircleEl) {
      gsap.to(centerCircleEl, {
        boxShadow: "0 0 45px rgba(212, 175, 55, 0.4), inset 0 0 25px rgba(212, 175, 55, 0.2)",
        duration: 0.6,
        ease: "power1.inOut",
        overwrite: "auto",
      });
    }

    if (centerContentRef.current) {
      const tlText = gsap.timeline({ overwrite: "auto" });

      tlText.to(centerContentRef.current, {
        opacity: 0,
        scale: 0.7,
        filter: "blur(4px)",
        duration: 0.25,
        ease: "power2.in",
      })
        .fromTo(
          centerContentRef.current,
          {
            opacity: 0,
            scale: 0.6,
            filter: "blur(3px)",
            zIndex: 10
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "back.out(1.2)",
          }
        );
    }
  }, [startIndex]);

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.cardrow}>
          <aside className={styles.card}>
            <div className={styles.brandMark}><Crown size={22} /></div>
            <h2 className={styles.brandName}>DENMARK</h2>
            <p className={styles.brandCity}>VASHI</p>
            <div className={styles.divder}></div>
            <p className={styles.brandDesc}>
              A landmark address that puts the best of lifestyle, business,
              education, healthcare & entertainment within 5 minutes.
            </p>
          </aside>

          <aside>
            <p className={styles.topLabel}>EVERYTHING WITHIN REACH</p>
            <h1 className={styles.title}>LIFE AT <span className={styles.big}>DENMARK</span></h1>
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
              <div className={styles.divderscond}></div>

              <div className={styles.infoRow}>
                <Diamond className={styles.infoIcon} size={22} />
                <div>
                  <p className={styles.infoSub}>LUXURY RESIDENCES</p>
                  <p className={styles.infoSub}>Redefined</p>
                </div>
              </div>
            </div>
          </aside>
        </div>

        <section className={styles.mapWrap}>
          <svg className={styles.arcSvg} viewBox="0 0 100 50" preserveAspectRatio="none">
            <defs>
              <linearGradient id="arcGrad" x1="0" x2="1">
                <stop offset="0" stopColor="#d4af370f" stopOpacity="0" />
                <stop offset="0.5" stopColor="#fed167" stopOpacity="0.9" />
                <stop offset="1" stopColor="#d4af370a" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 0 50 Q 50 -5 100 50" fill="none" stroke="url(#arcGrad)" strokeWidth="0.3" />
          </svg>

          {/* DYNAMIC CENTER DIV */}
          <div className={styles.center}>
            <div className={styles.centerCircle}>
              <div ref={centerContentRef} style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", textAlign: "center", padding: "0 8px" }}>
                {currentCenterData ? (
                  <>
                    <div className={styles.centerBrand} >
                      {currentCenterData.icon}
                    </div>
                    <div className={styles.centerName}>
                      {currentCenterData.time} MINS
                    </div>
                    <div className={styles.centerCity} >
                      {currentCenterData.label}
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.centerBrand}><Crown size={26} /></div>
                    <div className={styles.centerName}>DENMARK</div>
                    <div className={styles.centerCity}>VASHI</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* PHYSICAL CONTINUOUS SCROLLING NODES BLOCK */}
          <div className={styles.nodes} ref={nodesContainerRef}>
            {ALL_NODES.map((n, globalIndex) => {
              let relativeIndex = (globalIndex - startIndex + totalNodes) % totalNodes;

              const isCenterSlot = relativeIndex === 3;
              const isVisible = relativeIndex < visibleCount && !isCenterSlot;

              let pos = { x: 50, y: 90 };

              if (isVisible) {
                pos = ARC_POSITIONS[relativeIndex];
              } else if (isCenterSlot) {
                pos = ARC_POSITIONS[3];
              } else {
                if (relativeIndex < 3) {
                  pos = { x: -20, y: 75 };
                } else {
                  pos = { x: 115, y: 160 };
                }
              }

              return (
                <div
                  key={n.id}
                  className={styles.node}
                  data-left={pos.x}
                  data-top={pos.y}
                  data-visible={isVisible ? "true" : "false"}
                  data-center={isCenterSlot ? "true" : "false"}
                  style={{
                    position: "absolute",
                    pointerEvents: isVisible ? "auto" : "none",
                    visibility: (isVisible || isCenterSlot) ? "visible" : "hidden",
                  }}
                >
                  <div className={styles.nodeTime}>{n.time}</div>
                  <div className={styles.nodeMin}>MIN</div>
                  <div className={styles.nodeCircle}>{n.icon}</div>
                  <div className={styles.nodeLabel}>{n.label}</div>
                  <div className={styles.nodeSub}>{n.sub}</div>
                </div>
              );
            })}
          </div>

          <div className={styles.dragBar}>
            <button onClick={handlePrev} className={styles.arrowBtn} aria-label="Previous Slide">
              <ChevronLeft size={16} />
            </button>
            <span>DRAG TO</span>
            <Hand size={18} />
            <span>EXPLORE</span>
            <button onClick={handleNext} className={styles.arrowBtn} aria-label="Next Slide">
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