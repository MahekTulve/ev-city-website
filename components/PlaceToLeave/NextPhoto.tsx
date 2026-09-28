"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import styles from "./NextPhoto.module.css";
import NextDesign from "./NextDesign";

export default function NextPhoto() {
    const ref = useRef(null);
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
        /* Outer Section wrapper jo dono sections ko hold karega */
        <div className={styles.outerWrapper}>
            <div className={styles.bgWrapper}>
                <picture>
                    <source
                        media="(max-width: 1000px)"
                        srcSet="/images/mobile_denmark_bottom.webp"
                    />

                    <Image
                        src="/images/new_bootom_cut.webp"
                        alt="Background Landscape"
                        fill
                        loading="lazy"
                        fetchPriority="low"
                        className={styles.bgImage}
                        sizes="100vw"
                    />
                </picture>
                <div className={styles.bgOverlayBottom} />
            </div>

            {/* Section 1: NextPhoto Hero */}
            <section id="home" className={styles.hero} ref={ref}>
                <motion.div
                    className={styles.bottTextCont}
                    style={{ opacity: contentOpacity, y: contentY }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                    variants={containerVariants}
                >
                    <motion.div
                        className={styles.parabottom}
                        variants={itemVariants}
                    >
                        <p className={styles.oneCity}>
                            <span className={styles.oneCitySPan}>
                                One city
                            </span>

                            <span className={styles.changed}>
                                changed
                            </span>
                        </p>
                        <p className={styles.paradist}>
                            the way we think about
                            <span> Distance...</span>
                        </p>
                    </motion.div>
                    <motion.div
                        className={styles.parabottomMobile}
                        variants={itemVariants}
                    >
                        <div className={styles.mobileWrapper}>
                            <div className={styles.oneCityMobil}>
                                <p>One City</p>
                                <div className={styles.linedev}></div>
                            </div>
                            <h1 className={styles.changedMobile}>
                                changed
                            </h1>
                        </div>
                        <p className={styles.paradistmobile}>
                            the way we think about
                            <span> Distance...</span>
                        </p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Section 2: NextDesign */}
            <NextDesign />
        </div>
    );
}