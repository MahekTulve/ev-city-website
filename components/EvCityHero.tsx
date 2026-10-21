"use client";

import { motion, Variants } from "framer-motion";
import styles from "./EvCityHero.module.css";

// Animation variants with explicit Types
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // Saare elements ek ke baad ek sequential tarike se aayenge
    },
  },
};

const topbarVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: "easeOut" as const } 
  },
};

const leftSlideVariants: Variants = {
  hidden: { opacity: 0, x: -100 },
  visible: { 
    opacity: 1, 
    x: 0, 
    transition: { duration: 1.3, ease: "easeOut" as const }
  },
};

const rightSlideVariants: Variants = {
  hidden: { opacity: 0, x: 100 },
  visible: { 
    opacity: 1, 
    x: 0, 
   transition: { duration: 1.3, ease: "easeOut" as const }
  },
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" as const } 
  },
};

// Line Animation: Absolute width maintain rakhega aur scale hoke grow karega
const scaleLineVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: { 
    opacity: 1, 
    scaleX: 1, 
    transition: { duration: 0.6, ease: "easeOut" as const } 
  },
};

export default function EvCityHero() {
  return (
    <main className={styles["hero"]}>
      <picture>
        <source media="(max-width: 768px)" srcSet="/images/EVHeroMobile.webp" />
        <img
          className={styles["landscape"]}
          src="/images/lastSection.webp"
          alt="Sunset over a coastal city, its waterfront and a sweeping bridge"
        />
      </picture>
      <div className={styles["EVOverlay"]} />

      {/* Topbar Animation */}
      <motion.header 
        className={styles["topbar"]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={topbarVariants}
      >
        <div className={`${styles["location"]} ${styles["desktop"]}`}>
          A SMARTER NAVI MUMBAI<span className={styles["locationRule"]} />
        </div>
        <div className={`${styles["location"]} ${styles["mobile"]}`}>
          NAVI MUMBAI<span className={styles["locationRule"]} />
        </div>
      </motion.header>

      {/* Main Content Animation Container */}
      <motion.div 
        className={styles["content"]}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
        variants={containerVariants}
      >
        {/* Headline Desktop */}
        <div className={`${styles["headline"]} ${styles["desktop"]}`}>
          <motion.span variants={leftSlideVariants}>
            A CITY WITHIN <em>A CITY.</em>
          </motion.span>
          <motion.span className={styles["secondLine"]} variants={rightSlideVariants}>
            <em>A FUTURE</em> WITHIN REACH.
          </motion.span>
        </div>

        {/* Headline Mobile */}
        <div className={`${styles["headline"]} ${styles["mobile"]}`}>
          <motion.span variants={leftSlideVariants}>
            <em>A CITY </em><br />WITHIN A CITY.
          </motion.span>
          <motion.span className={styles["secondLine"]} variants={rightSlideVariants}>
            <em>A FUTURE</em> <br />WITHIN REACH.
          </motion.span>
        </div>

        {/* Short Rule Line Fix: scaleX ka use structural width bigade bina kar raha hai */}
        <motion.span 
          className={styles["shortRule"]} 
          aria-hidden="true"
          style={{ transformOrigin: "left" }}
          variants={scaleLineVariants}
        />

        <div className={styles["intro"]}>
          {/* Intro Paragraph */}
          <motion.p variants={fadeUpVariants}>
            Smart living isn’t just a place to live.It’s a <br />place to belong to the future. The next chapter <br />of Navi Mumbai has 
          </motion.p>

          {/* Poem Lines */}
          <motion.div 
            className={styles["poem"]}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.25,
                },
              },
            }}
          >
            <motion.span variants={fadeUpVariants}>a location.</motion.span>
            <motion.span variants={fadeUpVariants}>a shape.</motion.span>
            <motion.span variants={fadeUpVariants}>a heartbeat.</motion.span>
            <motion.span variants={fadeUpVariants}>a meaning.</motion.span>
          </motion.div>
        </div>

        {/* Signoff Section: Sequence me Poem ke baad hi play hoga */}
        <motion.div 
          className={styles["signoff"]}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.3,
                delayChildren: 0.2, // Ensures it triggers right after poem sequence
              },
            },
          }}
        >
          <motion.p variants={fadeUpVariants}>AND IT BEGINS HERE AT</motion.p>
          <motion.div className={styles["signature"]} variants={fadeUpVariants}>
            Ev City.
          </motion.div>
          <motion.span 
            className={styles["signatureRule"]} 
            aria-hidden="true"
            style={{ transformOrigin: "left" }}
            variants={scaleLineVariants}
          />
        </motion.div>
      </motion.div>
    </main>
  );
}