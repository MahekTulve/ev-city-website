"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef } from "react";
import styles from "./NextPhoto.module.css";
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
                staggerChildren: 0.2, // Har element ke beech mein 0.2 seconds ka gap hoga
                delayChildren: 0.1,
            },
        },
    };

    // 2. Har ek line/child ke liye individual animation variants
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.25, 1, 0.5, 1], // Smooth easing
            },
        },
    };
    return (
        <section id="home" className={styles.hero} ref={ref}>
            <motion.div className={styles.bg} >
                <Image
                    src="/images/denmarkbottom.png"
                    alt="Atmospheric mountain landscape"
                    fill
                    loading="lazy"
                    className={styles.bgImage}
                    sizes="100vw"
                />
                <div className={styles.bgOverlayBottom} />
            </motion.div>
            <motion.div
                className={styles.bottTextCont}
                style={{ opacity: contentOpacity, y: contentY }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
                variants={containerVariants}
            >
                <div className={styles.bottTextCont}>

                    <motion.h3
                        className={styles.parabottom}
                        variants={itemVariants}
                    >
                        One city changed the way we think about distance..
                    </motion.h3>

                    {/* <div className={styles.botomtext}>
                        <motion.div variants={itemVariants}>
                            It's not about building more, <br />its a bout building closer.
                        </motion.div>

                        <motion.span
                            className={styles.thirdline}
                            variants={itemVariants}
                        >
                            -The Copenhagen Way
                        </motion.span>
                    </div> */}

                </div>
            </motion.div>
        </section>
    );
}