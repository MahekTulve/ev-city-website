"use client";

import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import gsap from "gsap";
import {
  Train,
  ShoppingBag,
  GraduationCap,
  Plane,
  Utensils,
  Film,
  Building,
  Crown,
  Hospital,
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
  {
    id: 1,
    time: "10",
    label: "RAILWAY STATION",
    sub: "Seamless Connectivity",
    icon: <Train size={28} />,
    video: "/videos/railway-station.mp4",
  },
  {
    id: 2,
    time: "12",
    label: "NEXUS MALL",
    sub: "Shopping & Dining",
    icon: <ShoppingBag size={26} />,
    video: "/videos/mall.mp4",
  },
  {
    id: 3,
    time: "4",
    label: "APOLLO HOSPITAL",
    sub: "Quality Healthcare",
    icon: <Hospital size={26} />,
    video: "/videos/hospital.mp4",
  },
  {
    id: 4,
    time: "5",
    label: "TOP SCHOOLS",
    sub: "Bright Futures",
    icon: <GraduationCap size={26} />,
    video: "/videos/school.mp4",
  },
  // {
  //   id: 5,
  //   time: "11",
  //   label: "BUSINESS HUB",
  //   sub: "Work & Thrive",
  //   icon: <Briefcase size={26} />,
  //   video: "/videos/aboutvideo.mp4",
  // },
  {
    id: 6,
    time: "30",
    label: "AIRPORT",
    sub: "Travel with Ease",
    icon: <Plane size={26} />,
    video: "/videos/airport.mp4",
  },
  // {
  //   id: 7,
  //   time: "18",
  //   label: "5-STAR HOTEL",
  //   sub: "Luxury Stay & Hospitality",
  //   icon: <Hotel size={26} />,
  //   video: "/videos/aboutvideo.mp4",
  // },
  {
    id: 8,
    time: "9",
    label: "FINE DINING",
    sub: "Gourmet Cuisines",
    icon: <Utensils size={26} />,
    video: "/videos/dining.mp4",
  },
  {
    id: 9,
    time: "10",
    label: "MULTIPLEX",
    sub: "Entertainment Hub",
    icon: <Film size={26} />,
    video: "/videos/entertainment-hub.mp4",
  },
  {
    id: 10,
    time: "12",
    label: "IT PARK",
    sub: "Corporate Neighborhood",
    icon: <Building size={26} />,
    video: "/videos/IT-park.mp4",
  },
];

const DESKTOP_ARC_POSITIONS = [
  { x: 7, y: 60 },
  { x: 20, y: 36 },
  { x: 34, y: 24 },
  { x: 50, y: 10 },
  { x: 66, y: 24 },
  { x: 80, y: 36 },
  { x: 92, y: 60 },
];

const TABLET_ARC_POSITIONS = [
  { x: 14, y: 42 },
  { x: 30, y: 25 },
  { x: 50, y: 14 },
  { x: 70, y: 26 },
  { x: 86, y: 42 },
];

const MOBILE_ARC_POSITIONS = [
  { x: 18, y: 36 },
  { x: 50, y: 20 },
  { x: 82, y: 36 },
];

export default function VashiDenmark() {
  const [startIndex, setStartIndex] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [deviceType, setDeviceType] = useState<DeviceType>("desktop");
  const AUTO_SCROLL_MS = 2500;

  type DeviceType = "mobile" | "tablet" | "desktop";

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 600) {
        setDeviceType("mobile");
      } else if (width <= 1024) {
        setDeviceType("tablet");
      } else {
        setDeviceType("desktop");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const pageRef = useRef<HTMLElement>(null);
  const [isSectionActive, setIsSectionActive] = useState(false);
  const nodesContainerRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const activeIndexRef = useRef<number>(1);
  const gsapTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const slideDirection = useRef<"next" | "prev">("next");
  const previousStartIndexRef = useRef(startIndex);
  const hasInitializedVideoRef = useRef(false);

  const totalNodes = ALL_NODES.length;

  const arcPositions =
    deviceType === "mobile"
      ? MOBILE_ARC_POSITIONS
      : deviceType === "tablet"
        ? TABLET_ARC_POSITIONS
        : DESKTOP_ARC_POSITIONS;

  const centerOffset =
    deviceType === "mobile" ? 1 : deviceType === "tablet" ? 2 : 3;

  const visibleCount = arcPositions.length;

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionActive(entry.isIntersecting),
      { rootMargin: "300px 0px", threshold: 0.01 },
    );

    observer.observe(page);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isSectionActive) return;
    videoRef1.current?.pause();
    videoRef2.current?.pause();
  }, [isSectionActive]);

  const handleNext = useCallback(() => {
    if (isButtonDisabled) return;
    setIsButtonDisabled(true);
    slideDirection.current = "next";
    setStartIndex((prev) => (prev + 1) % totalNodes);
  }, [isButtonDisabled, totalNodes]);

  const handlePrev = useCallback(() => {
    if (isButtonDisabled) return;

    setIsButtonDisabled(true);
    slideDirection.current = "prev";

    setStartIndex((prev) => (prev - 1 + totalNodes) % totalNodes);
  }, [isButtonDisabled, totalNodes]);

  useEffect(() => {
    if (!isSectionActive) return;

    const autoScrollInterval = window.setInterval(() => {
      if (!document.hidden) {
        handleNext();
      }
    }, AUTO_SCROLL_MS);

    return () => {
      window.clearInterval(autoScrollInterval);
    };
  }, [handleNext, isSectionActive]);

  const centerNodeIndex = (startIndex + centerOffset) % totalNodes;

  const currentCenterData = ALL_NODES[centerNodeIndex];

  useEffect(() => {
    const targetVideoSrc = currentCenterData?.video;

    if (!isSectionActive) {
      setIsButtonDisabled(false);
      return;
    }

    if (!targetVideoSrc) {
      setIsButtonDisabled(false);
      return;
    }

    const currentVideo =
      activeIndexRef.current === 1 ? videoRef1.current : videoRef2.current;
    const nextVideo =
      activeIndexRef.current === 1 ? videoRef2.current : videoRef1.current;

    if (!currentVideo || !nextVideo) {
      setIsButtonDisabled(false);
      return;
    }

    if (!hasInitializedVideoRef.current) {
      currentVideo.src = targetVideoSrc;
      currentVideo.setAttribute("data-src", targetVideoSrc);
      currentVideo.preload = "metadata";
      gsap.set(currentVideo, { xPercent: 0, zIndex: 1 });
      const initialPlay = currentVideo.play();
      if (initialPlay !== undefined) initialPlay.catch(() => {});
      hasInitializedVideoRef.current = true;
      setIsButtonDisabled(false);
      return;
    }

    if (currentVideo.getAttribute("data-src") === targetVideoSrc) {
      const resumePlay = currentVideo.play();
      if (resumePlay !== undefined) resumePlay.catch(() => {});
      setIsButtonDisabled(false);
      return;
    }

    const isNext = slideDirection.current === "next";
    const nextStartPos = isNext ? 100 : -100;
    const currentExitPos = isNext ? -100 : 100;

    if (gsapTimelineRef.current) {
      gsapTimelineRef.current.kill();
    }

    gsap.set(nextVideo, { xPercent: nextStartPos, zIndex: 2 });
    gsap.set(currentVideo, { zIndex: 1 });

    if (nextVideo.getAttribute("data-src") !== targetVideoSrc) {
      nextVideo.src = targetVideoSrc;
      nextVideo.setAttribute("data-src", targetVideoSrc);
    }

    const playPromise = nextVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {});
    }

    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut", duration: 0.5 },
      onComplete: () => {
        activeIndexRef.current = activeIndexRef.current === 1 ? 2 : 1;
        gsap.set(currentVideo, { xPercent: nextStartPos });
        currentVideo.pause();
        setIsButtonDisabled(false);
      },
    });

    gsapTimelineRef.current = tl;

    tl.to(currentVideo, { xPercent: currentExitPos }, 0).to(
      nextVideo,
      { xPercent: 0 },
      0,
    );
  }, [centerNodeIndex, currentCenterData, isSectionActive]);

  useLayoutEffect(() => {
    const didIndexChange = previousStartIndexRef.current !== startIndex;
    const direction = slideDirection.current;

    if (nodesContainerRef.current) {
      const nodeElements = nodesContainerRef.current.querySelectorAll(
        `.${styles.node}`,
      );

      nodeElements.forEach((el) => {
        const targetLeft = el.getAttribute("data-left");
        const targetTop = el.getAttribute("data-top");
        const relativeIndex = Number(
          el.getAttribute("data-relative-index") ?? -1,
        );
        const isVisible = el.getAttribute("data-visible") === "true";
        const isGoingCenter = el.getAttribute("data-going-center") === "true";

        if (!targetLeft || !targetTop) return;

        const isEnteringEdgeNode =
          didIndexChange &&
          isVisible &&
          ((direction === "next" && relativeIndex === visibleCount - 1) ||
            (direction === "prev" && relativeIndex === 0));

        const isExitingEdgeNode =
          didIndexChange &&
          !isVisible &&
          !isGoingCenter &&
          ((direction === "next" && relativeIndex === totalNodes - 1) ||
            (direction === "prev" && relativeIndex === visibleCount));

        gsap.killTweensOf(el);

        if (isGoingCenter) {
          gsap.set(el, { visibility: "visible", zIndex: 2 });
          gsap.to(el, {
            left: "50%",
            top:
              deviceType === "mobile"
                ? "30%"
                : deviceType === "tablet"
                  ? "25%"
                  : "24%",
            opacity: 0,
            scale: 0.35,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else if (isEnteringEdgeNode) {
          gsap.set(el, {
            visibility: "visible",
            zIndex: 4,
            left: direction === "next" ? "120%" : "-20%",
            top: "90%",
            opacity: 0,
            scale: 0.3,
          });

          gsap.to(el, {
            left: `${targetLeft}%`,
            top: `${targetTop}%`,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else if (isExitingEdgeNode) {
          gsap.set(el, { visibility: "visible", zIndex: 3 });

          gsap.to(el, {
            left: direction === "next" ? "-20%" : "120%",
            top: "90%",
            opacity: 0,
            scale: 0.3,
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
            onComplete: () => {
              gsap.set(el, { visibility: "hidden" });
            },
          });
        } else if (!isVisible) {
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
            duration: 0.5,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    }

    if (centerContentRef.current) {
      gsap
        .timeline({ overwrite: "auto" })
        .to(centerContentRef.current, {
          opacity: 0,
          scale: 0.85,
          duration: 0.15,
          ease: "power1.in",
        })
        .to(centerContentRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power1.out",
        });
    }

    previousStartIndexRef.current = startIndex;
  }, [startIndex, deviceType, visibleCount, totalNodes]);

  return (
    <main ref={pageRef} className={styles.page}>
      <div className={styles.videoContainer}>
        <video
          ref={videoRef1}
          className={styles.bgVideo}
          preload="none"
          muted
          loop
          playsInline
        />
        <video
          ref={videoRef2}
          className={styles.bgVideo}
          preload="none"
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
              LIFE AT <span className={styles.big}>VASHI</span>
            </h1>
            <p className={styles.subtitle}>
              At Denmark, every essential is just minutes away.
              <br />
              Live a life of unmatched convenience and connectivity.
            </p>
          </aside>
        </div>

        <section className={styles.mapWrap}>
          <div className={styles.arcStage}>
            <svg
              className={styles.arcSvg}
              viewBox="0 0 100 50"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="arcGrad" x1="0" x2="1">
                  <stop offset="0" stopColor="#d4af370f" stopOpacity="0" />
                  <stop offset="0.5" stopColor="#fed167" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#d4af370a" stopOpacity="0" />
                </linearGradient>
              </defs>

              <path
                d="M 0 50 Q 50 5 100 50"
                fill="none"
                stroke="url(#arcGrad)"
                strokeWidth="0.3"
              />
            </svg>

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
                      <div className={styles.centerBrand}>
                        {currentCenterData.icon}
                      </div>

                      <div className={styles.centerName}>
                        {currentCenterData.time} MINS
                      </div>

                      <div className={styles.centerCity}>
                        {currentCenterData.label}
                      </div>
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

            <div className={styles.nodes} ref={nodesContainerRef}>
              {ALL_NODES.map((n, globalIndex) => {
                const relativeIndex =
                  (globalIndex - startIndex + totalNodes) % totalNodes;

                const isGoingCenter = relativeIndex === centerOffset;
                const isVisible =
                  relativeIndex < visibleCount && !isGoingCenter;

                let pos = { x: 50, y: 90 };

                if (isVisible) {
                  pos = arcPositions[relativeIndex];
                } else if (isGoingCenter) {
                  pos = arcPositions[centerOffset] || { x: 50, y: 20 };
                } else if (relativeIndex < centerOffset) {
                  pos = { x: -20, y: 90 };
                } else {
                  pos = { x: 120, y: 90 };
                }

                return (
                  <div
                    key={n.id}
                    className={styles.node}
                    data-left={pos.x}
                    data-top={pos.y}
                    data-relative-index={relativeIndex}
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
          </div>

          <div className={styles.dragBar}>
            <button
              onClick={handlePrev}
              disabled={isButtonDisabled}
              className={styles.arrowBtn}
              aria-label="Previous Slide"
              style={{
                opacity: isButtonDisabled ? 0.5 : 1,
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
              }}
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
              style={{
                opacity: isButtonDisabled ? 0.5 : 1,
                cursor: isButtonDisabled ? "not-allowed" : "pointer",
              }}
            >
              <MdArrowForward size={22} />
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
