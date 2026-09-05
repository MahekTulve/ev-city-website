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
                        srcSet="/images/mobile_cute_bottom.png"
                    />

                    <Image
                        src="/images/new_bootom_cut.webp"
                        alt="Background Landscape"
                        fill
                        priority
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
                    <motion.h3
                        className={styles.parabottom}
                        variants={itemVariants}
                    >
                        One city changed the way we think about distance..
                    </motion.h3>
                </motion.div>
            </section>

            {/* Section 2: NextDesign */}
            <NextDesign />
        </div>
    );
}