"use client";

import { motion, Variants } from "framer-motion";
import styles from "./ConceptSection.module.css";

// Parent Container Variant (Controls overall sequence & children delay)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.1,
    },
  },
};

// Content Children Variant (Text & Image entry animation)
const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Side Chrome Rail Variant
const railVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// Side Chrome Nav Variant
const navVariants: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function ConceptSection({
  hideChrome = false,
}: {
  hideChrome?: boolean;
}) {
  return (
    <section className={styles["section"]}>
      {/* Background Floating Elements */}
      <motion.div
        className={`${styles.flower} ${styles.flowerTopLeft}`}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
      <motion.div
        className={`${styles.flower} ${styles.flowerBottomRight}`}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
      />

      {!hideChrome && (
        <>
          {/* Left Rail */}
          <motion.div
            className={styles["rail"]}
            variants={railVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }} // once: false har baar animation trigger karega
          >
            <span className={styles["railNumber"]}>26</span>
            <span className={styles["railLabel"]}>Scroll</span>
            <motion.span
              className={styles["railLine"]}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              transition={{ duration: 0.9, delay: 0.4 }}
              style={{ originY: 0 }}
            />
          </motion.div>

          {/* Top-Right Nav */}
          <motion.div
            className={styles["nav"]}
            variants={navVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }} // once: false
          >
            <span className={styles["navPrimary"]}>
              Select
              <br />
              an Apartment
            </span>
            <div className={styles["navLinks"]}>
              <motion.a 
                href="#book"
                whileHover={{ x: -4 }} 
                transition={{ type: "spring", stiffness: 400 }}
              >
                Book a call
              </motion.a>
              <motion.a 
                href="#contact"
                whileHover={{ x: -4 }} 
                transition={{ type: "spring", stiffness: 400 }}
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
        </>
      )}

      {/* Main Content (Parent Container for Stagger Effect) */}
      <motion.div
        className={styles["content"]}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }} // once: false har baar replay karega
      >
        <motion.p className={styles["eyebrow"]} variants={fadeInUpVariants}>
          The Concept
        </motion.p>

        <motion.h2 className={styles["headline"]} variants={fadeInUpVariants}>
          In today’s evolving era EV HOMES has made sure Vashi shows the
          timeless development, a city which defines the term “One Stop Shop”
        </motion.h2>

        <motion.p className={styles["body"]} variants={fadeInUpVariants}>
          Inspired by Copenhagen’s (Denmark) approach to connected urban living,
          the project asks a simple question: what if everything that makes life better was just five minutes away?
        </motion.p>

        <motion.img
          className={styles.ornament}
          src="/images/logo.png"
          alt=""
          aria-hidden="true"
          variants={fadeInUpVariants}
          whileHover={{ scale: 1.08, rotate: 3 }}
          transition={{ type: "spring", stiffness: 300 }}
        />
      </motion.div>
    </section>
  );
}