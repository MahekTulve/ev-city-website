import React, { useState, useEffect } from "react";
import styles from "./AboutFiveMinute.module.css";

export default function AboutFiveMinute() {
  const [activeNode, setActiveNode] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const conceptNodes = [
    {
      id: "transit",
      time: "2 MINS",
      title: "Express Mobility & Transit",
      tagline: "ZERO TRAFFIC STRESS",
      icon: "⚡",
      conceptText: "A 5-Minute City eliminates long, exhausting commutes. Arterial highways, rail, and transit junctions are placed right at your exit point.",
      benefits: [
        "Instant connectivity to major arterial roads",
        "Seamless access to railway & transit hubs",
        "Save 1-2 hours daily in travel time"
      ],
      // Coordinates for SVG dynamic connecting beam
      lineCoords: { x2: "20%", y2: "20%" }
    },
    {
      id: "education",
      time: "3 MINS",
      title: "Academic Perimeter",
      tagline: "SAFE & NEARBY LEARNING",
      icon: "🎓",
      conceptText: "Children don't need to wake up at 5 AM or travel in long bus rides. Premier IB & CBSE schools are built within the immediate neighborhood ring.",
      benefits: [
        "Walking or short-drive distance to schools",
        "Safer, hassle-free morning routines for kids",
        "Top-rated international curriculum institutes"
      ],
      lineCoords: { x2: "80%", y2: "20%" }
    },
    {
      id: "health",
      time: "4 MINS",
      title: "24/7 Healthcare Shield",
      tagline: "EMERGENCY READY",
      icon: "🏥",
      conceptText: "In medical emergencies, every minute counts. A 5-Minute City ensures multispecialty hospitals and urgent care are reachable within moments.",
      benefits: [
        "24/7 Emergency medical care & trauma centers",
        "Multispecialty hospital infrastructure",
        "Pharmacies & wellness clinics next door"
      ],
      lineCoords: { x2: "20%", y2: "80%" }
    },
    {
      id: "retail",
      time: "5 MINS",
      title: "High-Street Lifestyle Hub",
      tagline: "EVERYDAY CONVENIENCE",
      icon: "🛍️",
      conceptText: "Work-life balance requires effortless leisure. Malls, cafes, fine dining, grocery hubs, and parks are all inside your 5-minute radius.",
      benefits: [
        "Shopping malls & multiplexes for weekends",
        "High-street dining & daily grocery markets",
        "Green parks and sports arenas for evening walks"
      ],
      lineCoords: { x2: "80%", y2: "80%" }
    }
  ];

  // Auto-play feature
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % conceptNodes.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, conceptNodes.length]);

  return (
    <section className={styles.section}>
      {/* Dynamic Background Animated Glow Orbs */}
      <div className={styles.bgGlow}></div>
      <div className={styles.bgGlowSecondary}></div>
      <div className={styles.bgGridOverlay}></div>

      {/* Main Header */}
      <header className={styles.header}>
        <span className={styles.tag}>
          <span className={styles.tagDot}></span> URBAN PLANNING CONCEPT
        </span>
        <h2 className={styles.mainTitle}>
          WHAT IS A <span className={styles.goldText}>5-MINUTE CITY?</span>
        </h2>
        <p className={styles.subTitle}>
          A 5-Minute City means <strong>putting your home at the center of the universe</strong>. Instead of driving hours across town, every essential aspect of modern life—Work, Education, Health, and Shopping—encircles you within 5 minutes.
        </p>
      </header>

      {/* Interactive Visualizer */}
      <div 
        className={styles.visualizerContainer}
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        {/* Left: Interactive Animated Radar Ring Visualizer */}
        <div className={styles.radarWrapper}>
          
          {/* Active SVG Beam Connecting Line */}
          <svg className={styles.svgBeamLayer}>
            <line 
              x1="50%" 
              y1="50%" 
              x2={conceptNodes[activeNode].lineCoords.x2} 
              y2={conceptNodes[activeNode].lineCoords.y2} 
              className={styles.activeBeamLine}
            />
          </svg>

          {/* Radar Scanner Beam */}
          <div className={styles.radarSweep}></div>

          {/* Radar Pulsing Wave Ripples */}
          <div className={styles.rippleWave1}></div>
          <div className={styles.rippleWave2}></div>

          {/* Radar Rings */}
          <div className={`${styles.ring} ${styles.ring1}`}></div>
          <div className={`${styles.ring} ${styles.ring2}`}></div>
          <div className={`${styles.ring} ${styles.ring3}`}></div>

          {/* Center Point */}
          <div className={styles.centerNode}>
            <div className={styles.centerGlowRing}></div>
            <span className={styles.homeIcon}>🏠</span>
            <span className={styles.centerLabel}>YOUR HOME</span>
          </div>

          {/* Interactive Floating Radar Buttons */}
          {conceptNodes.map((node, index) => {
            const isActive = activeNode === index;
            return (
              <button
                key={node.id}
                className={`${styles.radarNode} ${styles[`node${index + 1}`]} ${
                  isActive ? styles.activeRadarNode : ""
                }`}
                onClick={() => setActiveNode(index)}
              >
                <span className={styles.nodeIcon}>{node.icon}</span>
                <span className={styles.nodeTime}>{node.time}</span>
                {isActive && <div className={styles.nodePulseRing}></div>}
              </button>
            );
          })}
        </div>

        {/* Right: Glassmorphic Interactive Card */}
        <div className={styles.card3DWraper}>
          <div className={`${styles.contentCard} ${styles.cardAnimKey}`} key={activeNode}>
            
            <div className={styles.cardHeader}>
              <span className={styles.badge}>
                <span className={styles.badgePulse}></span>
                {conceptNodes[activeNode].time} RADIUS
              </span>
              <span className={styles.categoryTag}>{conceptNodes[activeNode].tagline}</span>
            </div>

            <h3 className={styles.nodeTitle}>
              <span className={styles.titleIcon}>{conceptNodes[activeNode].icon}</span> 
              {conceptNodes[activeNode].title}
            </h3>

            <div className={styles.animatedShimmerLine}></div>

            <p className={styles.conceptText}>
              {conceptNodes[activeNode].conceptText}
            </p>

            <div className={styles.benefitsContainer}>
              <span className={styles.benefitHeader}>WHY IT MATTERS</span>
              <div className={styles.pillsList}>
                {conceptNodes[activeNode].benefits.map((benefit, idx) => (
                  <div 
                    key={idx} 
                    className={styles.pill} 
                    style={{ animationDelay: `${idx * 0.12}s` }}
                  >
                    <span className={styles.dot}>◆</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Auto-play Timer Indicator */}
            <div className={styles.progressBarWrapper}>
              <div 
                className={`${styles.progressBar} ${isAutoPlaying ? styles.animateProgress : ""}`}
              ></div>
            </div>
          </div>
        </div>

      </div>
      <div className={styles.extraspace}></div>
    </section>
  );
}