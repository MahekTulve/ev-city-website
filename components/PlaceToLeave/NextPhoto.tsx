"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import styles from "./NextPhoto.module.css";
import Reveal from "./Reveal";
export default function NextPhoto() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 0.5], [0, -80]);

    return (
        <section id="home" className={styles.hero} ref={ref}>
            <motion.div className={styles.bg} style={{ y: bgY }}>
                <Image
                    src="/images/bottomass.webp"
                    alt="Atmospheric mountain landscape"
                    fill
                    priority
                    className={styles.bgImage}
                    sizes="100vw"
                />
                {/* <div className={styles.bgOverlay} /> */}
            </motion.div>

            <motion.div
                className={styles.bottTextCont}
                style={{ opacity: contentOpacity, y: contentY }}
            >
                <Reveal direction="blur" delay={0.2}>
                    <div className={styles.bottTextCont} >
                        <h3 className={styles.parabottom}>
                            The architecture of ERA Residences balances clean contemporary lines with Mediterranean warmth and texture
                        </h3>
                        <div className={styles.botomtext}>
                            By Schiemann Weyers<br />
                            Architects OCWA Architects
                        </div>
                    </div>

                </Reveal>
            </motion.div>


        </section>
    );
}
