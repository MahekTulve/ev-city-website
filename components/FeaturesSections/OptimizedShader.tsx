"use client";
import React, { useRef, useState, useEffect } from "react";
import { MeshGradient } from "@paper-design/shaders-react";

interface OptimizedShaderProps {
  className?: string;
  colors: string[];
  speed?: number;
  style?: React.CSSProperties;
}

export function OptimizedShader({ className, colors, speed, style }: OptimizedShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 } // Triggers when at least 5% visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ width: "100%", height: "100%", ...style }}>
      {isVisible && (
        <MeshGradient
          className={className}
          colors={colors}
          speed={speed}
        />
      )}
    </div>
  );
}