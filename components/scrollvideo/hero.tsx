"use client";
import { useEffect, useRef, useState } from "react";
import { MeshGradient, PulsingBorder } from "@paper-design/shaders-react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import styles from "./hero.module.css";

export default function ShaderShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [, setIsActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const onEnter = () => setIsActive(true);
    const onLeave = () => setIsActive(false);
    container.addEventListener("mouseenter", onEnter);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mouseenter", onEnter);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div className={styles.shaderLayer}>
        <MeshGradient
          className={styles.shader}
          colors={["#0a0a0a", "#523828", "#1F1611", "#F9F0D6", "#BEA256"]}
          speed={0.35}
        />
        <MeshGradient
          className={styles.shader}
          colors={["#000000", "#523828", "#A07f3A", "#E3D5BB"]}
          speed={0.25}
          style={{ opacity: 0.55, mixBlendMode: "overlay" }}
        />
      </div>
      <div className={styles.overlay} />

      {/* <div className={styles.pulseWrap}>
        <PulsingBorder
          className={styles.pulseBorder}
          colors={["#7c3aed", "#ec4899", "#ffffff"]}
          colorBack="#00000000"
          roundness={1}
          thickness={0.05}
          softness={0.3}
          intensity={2}
          spotSize={0.3}
          pulse={0.15}
          smoke={0.4}
          smokeSize={0.5}
        /> */}
        {/* <div className={styles.rotatingText}>
          <svg viewBox="0 0 100 100">
            <defs>
              <path
                id="circlePath"
                d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              />
            </defs>
            <text>
              <textPath href="#circlePath">
                Loxt • Paper Shaders • Beautiful Experiences •
              </textPath>
            </text>
          </svg>
        </div> */}
      {/* </div> */}
    </div>
  );
}
