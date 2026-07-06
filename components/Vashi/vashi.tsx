"use client";

import React, { useState, useEffect } from "react";
import {
  FaCampground,
  FaFire,
  FaTint,
  FaHotTub,
  FaHiking,
} from "react-icons/fa";
import styles from "./vashi.module.css";

interface Option {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

const Vashi = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);

  const options: Option[] = [
    {
      title: "Vision",
      description:
        "A future-ready lifestyle with thoughtfully planned residences and premium living spaces.",
      image:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      icon: <span className={styles.letterIcon}>V</span>,
    },
    {
      title: "Accessibility",
      description:
        "Excellent connectivity to business hubs, railway stations, highways, and daily conveniences.",
      image:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80",
      icon: <span className={styles.letterIcon}>A</span>,
    },
    {
      title: "Smart Living",
      description:
        "Modern homes designed with intelligent layouts, quality amenities, and sustainable features.",
      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
      icon: <span className={styles.letterIcon}>S</span>,
    },
    {
      title: "Harmony",
      description:
        "A perfect balance of green surroundings, urban lifestyle, and peaceful community living.",
      image:
        "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80",
      icon: <span className={styles.letterIcon}>H</span>,
    },
    {
      title: "Investment",
      description:
        "A thriving destination offering excellent appreciation potential and long-term value.",
      image:
        "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",
      icon: <span className={styles.letterIcon}>I</span>,
    },
  ];

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: NodeJS.Timeout[] = [];

    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 180 * i);
      timers.push(timer);
    });

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.headerSection}>
        <h1 className={styles.title}>Vashi</h1>
        <p className={styles.subtitle}>
          Discover thoughtfully designed residences in the heart of Vashi,
          <br />
          where connectivity, comfort, and contemporary living come together.
        </p>
      </div>

      <div className={styles.spacer}></div>

      {/* Options Container */}
      <div className={styles.optionsContainer}>
        {options.map((option, index) => (
          <div
            key={index}
            className={`${styles.option} ${activeIndex === index ? styles.active : ""}`}
            style={{
              backgroundImage: `url('${option.image}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: animatedOptions.includes(index) ? 1 : 0,
              transform: animatedOptions.includes(index)
                ? "translateX(0)"
                : "translateX(-60px)",
            }}
            onClick={() => handleOptionClick(index)}
          >
            {/* Shadow effect */}
            <div
              className={`${styles.shadow} ${activeIndex === index ? styles.active : ""}`}
            ></div>

            {/* Label with icon and info */}
            <div className={styles.label}>
              <div className={styles.icon}>{option.icon}</div>
              <div className={styles.info}>
                <div
                  className={`${styles.main} ${activeIndex === index ? styles.active : ""}`}
                >
                  {option.title}
                </div>
                <div
                  className={`${styles.sub} ${activeIndex === index ? styles.active : ""}`}
                >
                  {option.description}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Vashi;
