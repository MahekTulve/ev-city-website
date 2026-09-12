"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import styles from "./WhyCopenhange.module.css";
import { GiWalk } from "react-icons/gi";
import { IoIosBicycle } from "react-icons/io";
import { LiaConnectdevelop } from "react-icons/lia";
import { RiTreeLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";
import { useMediaQuery } from "../performance/useMediaQuery";
import type { CopenhagenPillar } from "./WhyCopenhagenMobile";

const WhyCopenhagenMobile = lazy(() => import("./WhyCopenhagenMobile"));

const pillars: CopenhagenPillar[] = [
  {
    title: "People First",
    text: "Designed for people, not just for traffic.",
    icon: <GiWalk />,
  },
  {
    title: "Liveable by Design",
    text: "Walkable. Cyclable. Human scale.",
    icon: <IoIosBicycle />,
  },
  {
    title: "Connected City",
    text: "Seamless public transit that brings the city closer.",
    icon: <LiaConnectdevelop />,
  },
  {
    title: "Sustainable Future",
    text: "Green thinking for a better tomorrow.",
    icon: <RiTreeLine />,
  },
  {
    title: "Quality of Life",
    text: "More time living, less time commuting.",
    icon: <FaRegHeart />,
  },
];

function DesktopPillars() {
  return (
    <div className={`${styles.pillars} ${styles.desktopPillars}`}>
      {pillars.map((pillar) => (
        <div className={styles.pillar} key={pillar.title}>
          <div className={styles.iconWrap}>{pillar.icon}</div>
          <h3 className={styles.pillarTitle}>{pillar.title}</h3>
          <p className={styles.pillarText}>{pillar.text}</p>
        </div>
      ))}
    </div>
  );
}

export default function WhyCopenhagen() {
  const rootRef = useRef<HTMLDivElement>(null);
  const isCompact = useMediaQuery("(max-width: 1024px)");
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "900px 0px", threshold: 0 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={styles.page} data-section>
      <section className={styles.why} id="why">
        <div className={styles.blush} />

        <img
          className={styles.skechImage}
          src="images/waybgimage.png"
          alt=""
          loading="lazy"
          decoding="async"
        />

        {isNearViewport &&
          (isCompact ? (
            <Suspense fallback={<div className={styles.pillarsPlaceholder} />}>
              <WhyCopenhagenMobile pillars={pillars} />
            </Suspense>
          ) : (
            <DesktopPillars />
          ))}

        <div className={styles.closingQuote} id="impact">
          <span className={styles.bigQuote}>&ldquo;</span>
          <p>
            A city isn&rsquo;t just its buildings, it&rsquo;s its{" "}
            <em className={styles.italicGold}>beliefs in action.</em>
          </p>
          <span className={styles.bigQuote}>&rdquo;</span>
        </div>
      </section>
    </div>
  );
}
