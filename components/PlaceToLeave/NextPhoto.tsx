"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./NextPhoto.module.css";
import { useMediaQuery } from "../performance/useMediaQuery";

const NextDesign = dynamic(() => import("./NextDesign"), {
  ssr: false,
});

function AnimatedPhotoContent({ isMobile }: { isMobile: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -200]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

  return (
    <>
      <div className={styles.bgWrapper}>
        <Image
          src={isMobile ? "/images/den_mobile_bottom.png" : "/images/new_bootom_cut.webp"}
          alt="Background landscape"
          fill
          loading="lazy"
          quality={58}
          className={styles.bgImage}
          sizes="100vw"
        />
        <div className={styles.bgOverlayBottom} />
      </div>

      <section id="home" className={styles.hero} ref={ref}>
        <motion.div
          className={styles.bottTextCont}
          style={{ opacity: contentOpacity, y: contentY }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.h3 className={styles.parabottom} variants={itemVariants}>
            One city changed the way we think about distance..
          </motion.h3>
        </motion.div>
      </section>

      <NextDesign />
    </>
  );
}

export default function NextPhoto() {
  const outerRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1000px)");

  useEffect(() => {
    const root = outerRef.current;
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
    <div ref={outerRef} className={styles.outerWrapper}>
      {isNearViewport ? (
        <AnimatedPhotoContent isMobile={isMobile} />
      ) : (
        <div className={styles.deferredPlaceholder} aria-hidden="true" />
      )}
    </div>
  );
}
