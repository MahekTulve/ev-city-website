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
  Crown,
  Hotel,
  Utensils,
  Film,
  Building,
} from "lucide-react";
import styles from "./vashidenmark.module.css";
import { BsHandIndexThumb } from "react-icons/bs";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

type NodeData = {
  id: number;
  time: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
  video: string;
};

const ALL_NODES: NodeData[] = [
  { id: 1, time: "2", label: "RAILWAY STATION", sub: "Seamless Connectivity", icon: <Train size={28} />, video: "/videos/aboutvideo.mp4" },
  { id: 2, time: "3", label: "NEXUS MALL", sub: "Shopping & Dining", icon: <ShoppingBag size={26} />, video: "/videos/school.mp4" },
  { id: 3, time: "4", label: "APOLLO HOSPITAL", sub: "Quality Healthcare", icon: <Plus size={26} />, video: "/videos/aboutvideo.mp4" },
  { id: 4, time: "5", label: "TOP SCHOOLS", sub: "Bright Futures", icon: <GraduationCap size={26} />, video: "/videos/school.mp4" },
  { id: 5, time: "5", label: "BUSINESS HUB", sub: "Work & Thrive", icon: <Briefcase size={26} />, video: "/videos/aboutvideo.mp4" },
  { id: 6, time: "15", label: "AIRPORT", sub: "Travel with Ease", icon: <Plane size={26} />, video: "/videos/school.mp4" },
  { id: 7, time: "7", label: "5-STAR HOTEL", sub: "Luxury Stay & Hospitality", icon: <Hotel size={26} />, video: "/videos/aboutvideo.mp4" },
  { id: 8, time: "4", label: "FINE DINING", sub: "Gourmet Cuisines", icon: <Utensils size={26} />, video: "/videos/school.mp4" },
  { id: 9, time: "6", label: "MULTIPLEX", sub: "Entertainment Hub", icon: <Film size={26} />, video: "/videos/aboutvideo.mp4" },
  { id: 10, time: "8", label: "IT PARK", sub: "Corporate Neighborhood", icon: <Building size={26} />, video: "/videos/school.mp4" },
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
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const nodesContainerRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);

  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const activeIndexRef = useRef<number>(1);
  const gsapTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Dynamic direction state ('next' = Right to Left, 'prev' = Left to Right)
  const slideDirection = useRef<"next" | "prev">("next");

  const totalNodes = ALL_NODES.length;
  const visibleCount = ARC_POSITIONS.length;
  const handleNext = () => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true); // Buttons ko lock karein
    slideDirection.current = "next";
    setStartIndex((prev) => (prev + 1) % totalNodes);
  };

  const handlePrev = () => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true); // Buttons ko lock karein
    slideDirection.current = "prev";
    setStartIndex((prev) => (prev - 1 + totalNodes) % totalNodes);
  };
  // AUTO SCROLL TIMER: 9 SECONDS (Always slides Right to Left)
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const centerNodeIndex = (startIndex + 3) % totalNodes;
  const currentCenterData = ALL_NODES[centerNodeIndex];

  // DYNAMIC DIRECTIONAL VIDEO SLIDE ANIMATION
  useEffect(() => {
    const targetVideoSrc = currentCenterData?.video;
    if (!targetVideoSrc) {
      setIsButtonDisabled(false);
      return;
    }

    const currentVideo = activeIndexRef.current === 1 ? videoRef1.current : videoRef2.current;
    const nextVideo = activeIndexRef.current === 1 ? videoRef2.current : videoRef1.current;

    if (!currentVideo || !nextVideo) {
      setIsButtonDisabled(false);
      return;
    }

    const isNext = slideDirection.current === "next";
    const nextStartPos = isNext ? "100%" : "-100%";
    const currentExitPos = isNext ? "-100%" : "100%";

    gsap.set(nextVideo, { x: nextStartPos });

    nextVideo.src = targetVideoSrc;
    nextVideo.setAttribute("data-src", targetVideoSrc);
    nextVideo.currentTime = 0;
    nextVideo.play().catch(() => { });

    const tl = gsap.timeline({
      onComplete: () => {
        activeIndexRef.current = activeIndexRef.current === 1 ? 2 : 1;
        gsap.set(currentVideo, { x: nextStartPos });
        currentVideo.pause();

        // --- ANIMATION COMPLETE HO GAYI, AB BUTTONS DUSRE CLICK KE LIYE READY HAIN ---
        setIsButtonDisabled(false);
      },
    });

    gsapTimelineRef.current = tl;

    tl.to(currentVideo, {
      x: currentExitPos,
      duration: 1.5,
      ease: "power2.out",
    }, 0);

    tl.to(nextVideo, {
      x: "0%",
      duration: 1.5,
      ease: "power2.out",
    }, 0);

  }, [centerNodeIndex, currentCenterData]);

  // NODES SCROLL ANIMATION
  useEffect(() => {
    if (nodesContainerRef.current) {
      const nodeElements = nodesContainerRef.current.querySelectorAll(`.${styles.node}`);

      nodeElements.forEach((el) => {
        const targetLeft = el.getAttribute("data-left");
        const targetTop = el.getAttribute("data-top");
        const isVisible = el.getAttribute("data-visible") === "true";
        const isGoingCenter = el.getAttribute("data-going-center") === "true";

        if (targetLeft && targetTop) {
          if (isGoingCenter) {
            gsap.set(el, { visibility: "visible", zIndex: 2 });
            gsap.to(el, {
              left: "50%",
              top: "10%",
              opacity: 0,
              scale: 0.35,
              duration: 1.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          } else if (!isVisible) {
            gsap.killTweensOf(el);
            gsap.set(el, {
              visibility: "hidden",
              opacity: 0,
              scale: 0.3,
              left: `${targetLeft}%`,
              top: `${targetTop}%`,
            });
          } else {
            gsap.set(el, { visibility: "visible", zIndex: 4 });
            gsap.to(el, {
              left: `${targetLeft}%`,
              top: `${targetTop}%`,
              opacity: 1,
              scale: 1,
              duration: 1.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          }
        }
      });
    }

    if (centerContentRef.current) {
      const tlText = gsap.timeline({ overwrite: "auto" });

      tlText
        .to(centerContentRef.current, {
          opacity: 0,
          scale: 0.7,
          filter: "blur(4px)",
          duration: 0.4,
          ease: "power2.in",
        })
        .fromTo(
          centerContentRef.current,
          {
            opacity: 0,
            scale: 0.6,
            filter: "blur(3px)",
            zIndex: 10,
          },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            duration: 1.0,
            ease: "back.out(1.2)",
          }
        );
    }
  }, [startIndex]);

  return (
    <main className={styles.page}>
      {/* Background Double Video Player */}
      <div className={styles.videoContainer}>
        <video
          ref={videoRef1}
          className={styles.bgVideo}
          style={{ transform: "translateX(0%)" }}
          autoPlay
          muted
          loop
          playsInline
          data-src={ALL_NODES[3].video}
          src={ALL_NODES[3].video}
        />
        <video
          ref={videoRef2}
          className={styles.bgVideo}
          style={{ transform: "translateX(100%)" }}
          autoPlay
          muted
          loop
          playsInline
        />
      </div>

      <div className={styles.bgOverlay} />

      <div className={styles.layout}>
        <div className={styles.cardrow}>
          <aside>
            <p className={styles.topLabel}>EVERYTHING WITHIN REACH</p>
            <h1 className={styles.title}>
              LIFE AT <span className={styles.big}>DENMARK</span>
            </h1>
            <p className={styles.subtitle}>
              At Denmark, every essential is just minutes away.
              <br />
              Live a life of unmatched convenience and connectivity.
            </p>
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

          {/* DYNAMIC CENTER DISPLAY */}
          <div className={styles.center}>
            <div className={styles.centerCircle}>
              <div
                ref={centerContentRef}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  textAlign: "center",
                  padding: "0 8px",
                }}
              >
                {currentCenterData ? (
                  <>
                    <div className={styles.centerBrand}>{currentCenterData.icon}</div>
                    <div className={styles.centerName}>{currentCenterData.time} MINS</div>
                    <div className={styles.centerCity}>{currentCenterData.label}</div>
                  </>
                ) : (
                  <>
                    <div className={styles.centerBrand}>
                      <Crown size={26} />
                    </div>
                    <div className={styles.centerName}>DENMARK</div>
                    <div className={styles.centerCity}>VASHI</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* CONTINUOUS SCROLLING NODES */}
          <div className={styles.nodes} ref={nodesContainerRef}>
            {ALL_NODES.map((n, globalIndex) => {
              let relativeIndex = (globalIndex - startIndex + totalNodes) % totalNodes;

              const isGoingCenter = relativeIndex === 3;
              const isVisible = relativeIndex < visibleCount && !isGoingCenter;

              let pos = { x: 50, y: 90 };

              if (isVisible) {
                pos = ARC_POSITIONS[relativeIndex];
              } else if (isGoingCenter) {
                pos = ARC_POSITIONS[4] || { x: 66, y: 28 };
              } else {
                if (relativeIndex === totalNodes - 1) {
                  pos = { x: -2, y: 100 };
                } else if (relativeIndex < 3) {
                  pos = { x: -30, y: 120 };
                } else {
                  pos = { x: 130, y: 140 };
                }
              }

              return (
                <div
                  key={n.id}
                  className={styles.node}
                  data-left={pos.x}
                  data-top={pos.y}
                  data-visible={isVisible ? "true" : "false"}
                  data-going-center={isGoingCenter ? "true" : "false"}
                  style={{
                    position: "absolute",
                    pointerEvents: isVisible ? "auto" : "none",
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
            <button
              onClick={handlePrev}
              disabled={isButtonDisabled}
              className={styles.arrowBtn}
              aria-label="Previous Slide"
              style={{ opacity: isButtonDisabled ? 0.5 : 1, cursor: isButtonDisabled ? 'not-allowed' : 'pointer' }}
            >
              <MdArrowBack size={22} />
            </button>
            <span>DRAG TO</span>
            <div className={styles.handIcon}>
              <BsHandIndexThumb size={18} />
            </div>
            <span>EXPLORE</span>
            <button
              onClick={handleNext}
              disabled={isButtonDisabled}
              className={styles.arrowBtn}
              aria-label="Next Slide"
              style={{ opacity: isButtonDisabled ? 0.5 : 1, cursor: isButtonDisabled ? 'not-allowed' : 'pointer' }}
            >
              <MdArrowForward size={22} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}