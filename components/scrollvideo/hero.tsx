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
    </div>
  );
}
