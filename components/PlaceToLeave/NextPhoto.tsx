"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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

    return (
        <section id="home" className={styles.hero} ref={ref}>
            <motion.div className={styles.bg} >
                <Image
                    src="/images/denmarkbottom.png"
                    alt="Atmospheric mountain landscape"
                    fill
                    priority
                    className={styles.bgImage}
                    sizes="100vw"
                />
                <div className={styles.bgOverlayBottom} />
            </motion.div>
            <motion.div
                className={styles.bottTextCont}
                style={{ opacity: contentOpacity, y: contentY }}
            >
                <div className={styles.bottTextCont} >
                    <h3 className={styles.parabottom}>
                        One city changed the way we think about distance..
                    </h3>
                    <div className={styles.botomtext}>
                        It's not about building more, <br />its a bout building closer.
                        <br />
                        <span className={styles.thirdline}>
                            -The Copenhagen Way
                        </span>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}