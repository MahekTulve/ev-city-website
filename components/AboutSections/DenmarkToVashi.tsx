

import { useRef } from "react";
import {
  motion,
  useScroll,
} from "framer-motion";
import styles from "./DenmarkToVashi.module.css";
// import GlowingTextReveal from "../ev-city/GlowingReveal";


export default function DenmarkToVashi() {
  const containerRef = useRef<HTMLDivElement>(null);
  // const heroRef = useRef<HTMLDivElement>(null);

  // const { scrollYProgress: heroProgress } = useScroll({
  //   target: heroRef,
  //   offset: ["start 80%", "end 30%"],
  // });
  return (
    <div ref={containerRef} className={styles.cityscape}>

      <section className={styles.hero}>
        <div className={styles.heroContentWrapper}>

          {/* <motion.div
            className={styles.heroBadge}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className={styles.badgeDot} />
            <span>Architectural Landmark</span>
          </motion.div> */}

          {/* <div ref={heroRef} className={styles.titleWrapper}>
            <GlowingTextReveal
              text="Denmark to Vashi"
              progress={heroProgress}
              color="#d4af37"
              className={styles.particleTitle}
              titleClassName={styles.glowingTitle}
            />
          </div> */}

          {/* <motion.div
            className={styles.centerDividerWrapper}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className={styles.dividerLine} />
            <div className={styles.dividerDiamond} />
            <div className={styles.dividerLine} />
          </motion.div> */}

          {/* <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className={styles.subtitle}
          >
            Vashi encompasses every virtue of a globally benchmarked urban sanctuary — elite infrastructure, healthcare, education, and seamless connection.
          </motion.p>

          <motion.div
            className={styles.scrollHintContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.8 }}
          >
            <span className={styles.scrollHint}>Explore Experience</span>
            <div className={styles.scrollPill}>
              <div className={styles.scrollDot} />
            </div>
          </motion.div> */}
          {/* Background Gradient Arc Rings */}
          <span className={styles.orbitTop} aria-hidden="true" />
          <span className={styles.orbitBottom} aria-hidden="true" />

          {/* Main Title Section */}
          <header className={styles.heading}>
            <span className={styles.the}>THE</span>
            <span className={styles.danish}>DANISH</span>
            <div className={styles.secondRow}>
              <span className={styles.artOf}>art of</span>
              <span className={styles.living}>LIVING</span>
            </div>
          </header>

          {/* Divider Subtitle Line */}
          <div className={styles.reimagined}>
            REIMAGINED FOR
          </div>

          {/* Main Landmark Text */}
          <h1 className={styles.vashi}>VASHI.</h1>

          {/* Bottom Subtitle / Description */}
          <p className={styles.description}>
            Denmark taught the world that luxury can be effortless.
            <br />
            EV City brings that philosophy to Vashi through considered design,
            <br />
            seamless connectivity and spaces created around the way you truly live.
          </p>
        </div>
      </section>

    </div>
  );
}

