import { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";
import styles from "./DenmarkToVashi.module.css";

// Individual letter animation variant
const letterVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.04 },
  },
};

// Component for rendering text letter-by-letter based on section visibility
const AnimatedSequenceText = ({
  text,
  className,
  isInView,
  delay = 0,
  staggerSpeed = 0.05,
}: {
  text: string;
  className?: string;
  isInView: boolean;
  delay?: number;
  staggerSpeed?: number;
}) => {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        delayChildren: delay,
        staggerChildren: staggerSpeed,
      },
    },
  };

  return (
    <motion.span
      className={className}
      style={{ display: "inline-block" }}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function DenmarkToVashi() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // 20% section visible hone par trigger hoga (80% non-visible hote hi gayab ho jayega)
  const isInView = useInView(sectionRef, { amount: 0.2, once: false });

  // Exact Sequence Timing Delays (in seconds)
  const theDelay = 0;
  const danishDelay = 0.25;
  const artOfLivingDelay = danishDelay + 0.45;
  const reimaginedTextDelay = artOfLivingDelay + 0.75;
  const linesDelay = reimaginedTextDelay + 0.75;
  const vashiDelay = linesDelay + 0.5;
  const descriptionDelay = vashiDelay + 0.65;
  const orbitDelay = descriptionDelay + 0.6;

  return (
    <div className={styles.cityscape}>
      <section ref={sectionRef} className={styles.hero}>
        <div className={styles.heroContentWrapper}>
          
          {/* Circle (Orbit) - 20% visible hone par delay se aayega, exit par reset ho jayega */}
          <motion.span
            className={styles.orbitTop}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
            animate={
              isInView
                ? { opacity: 1, scale: 1, rotate: -160 }
                : { opacity: 0, scale: 0.8, rotate: -180 }
            }
            transition={{ delay: isInView ? orbitDelay : 0, duration: 1.2, ease: "easeOut" }}
          />

          <header className={styles.heading}>
            {/* 1. "THE" */}
            <AnimatedSequenceText
              text="THE"
              className={styles.the}
              isInView={isInView}
              delay={theDelay}
              staggerSpeed={0.06}
            />
            <br />

            {/* 2. "DANISH" */}
            <AnimatedSequenceText
              text="DANISH"
              className={styles.danish}
              isInView={isInView}
              delay={danishDelay}
              staggerSpeed={0.06}
            />

            {/* 3. "art of LIVING" */}
            <div className={styles.secondRow}>
              <AnimatedSequenceText
                text="art of "
                className={styles.artOf}
                isInView={isInView}
                delay={artOfLivingDelay}
                staggerSpeed={0.05}
              />
              <AnimatedSequenceText
                text="LIVING"
                className={styles.living}
                isInView={isInView}
                delay={artOfLivingDelay + 0.3}
                staggerSpeed={0.05}
              />
            </div>
          </header>

          {/* 4 & 5. REIMAGINED FOR Text and Aaju-Baju Lines */}
          <div className={styles.reimaginedContainer}>
            {/* Left Line */}
            <motion.div
              className={styles.lineLeft}
              initial={{ scaleX: 0, originX: 1 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: isInView ? linesDelay : 0, duration: 0.6, ease: "easeInOut" }}
            />

            {/* REIMAGINED FOR Text */}
            <AnimatedSequenceText
              text="REIMAGINED FOR"
              className={styles.reimaginedText}
              isInView={isInView}
              delay={reimaginedTextDelay}
              staggerSpeed={0.05}
            />

            {/* Right Line */}
            <motion.div
              className={styles.lineRight}
              initial={{ scaleX: 0, originX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ delay: isInView ? linesDelay : 0, duration: 0.6, ease: "easeInOut" }}
            />
          </div>

          {/* 6. "VASHI." */}
          <h1 style={{ margin: 0 }}>
            <AnimatedSequenceText
              text="VASHI."
              className={styles.vashi}
              isInView={isInView}
              delay={vashiDelay}
              staggerSpeed={0.08}
            />
          </h1>

          {/* 7. Paragraph Description */}
          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
            transition={{ delay: isInView ? descriptionDelay : 0, duration: 0.8 }}
          >
            Denmark taught the world that luxury can be effortless. EV City brings that philosophy to
            Vashi through <br /> considered design, seamless connectivity and spaces created around the
            way you truly live.
          </motion.p>
        </div>
      </section>
    </div>
  );
}