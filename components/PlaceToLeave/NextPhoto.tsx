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
                    src="/images/denmark3.png"
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
                            One city changed the way we think about distance..
                        </h3>
                        <div className={styles.botomtext}>
                           It's not about building more, its a bout building closer.<br />
                        -The Copenhagen Way
                        </div>
                    </div>

                </Reveal>
            </motion.div>


        </section>
    );
}
