"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import styles from "./HorizontalSequence.module.css";
import DenmarkToVashi from "./AboutSections/DenmarkToVashi";
import VashiDenmark from "./AboutSections/Vashidenmark";
import { OptimizedShader } from "./FeaturesSections/OptimizedShader";

const SCROLL_LENGTH_VH = 250;

const clamp = (value: number, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

export default function HorizontalSequence() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const track = trackRef.current;

        if (!wrapper || !track) return;

        let targetProgress = 0;
        let displayedProgress = 0;
        let animationFrame = 0;
        let initialized = false;
        let isNearViewport = false;
        const applyProgress = (progress: number) => {

            const shift = progress * 100;
            track.style.transform = `translate3d(-${shift}vw, 0, 0)`;
        };

        const measureProgress = () => {
            const rect = wrapper.getBoundingClientRect();
            const scrollableDistance = wrapper.offsetHeight - window.innerHeight;

            if (scrollableDistance <= 0) return 0;
            return clamp(-rect.top / scrollableDistance);
        };

        const animateToTarget = () => {
            displayedProgress += (targetProgress - displayedProgress) * 0.15;

            if (Math.abs(targetProgress - displayedProgress) < 0.0001) {
                displayedProgress = targetProgress;
            }

            applyProgress(displayedProgress);

            if (displayedProgress !== targetProgress) {
                animationFrame = window.requestAnimationFrame(animateToTarget);
            } else {
                animationFrame = 0;
            }
        };

        const updateTarget = (force = false) => {
            if (!isNearViewport && !force) return;

            targetProgress = measureProgress();

            if (!initialized) {
                initialized = true;
                displayedProgress = targetProgress;
                applyProgress(displayedProgress);
                return;
            }

            if (!animationFrame) {
                animationFrame = window.requestAnimationFrame(animateToTarget);
            }
        };

        const visibilityObserver = new IntersectionObserver(
            ([entry]) => {
                isNearViewport = entry.isIntersecting;

                if (isNearViewport) {
                    updateTarget(true);
                } else if (animationFrame) {
                    window.cancelAnimationFrame(animationFrame);
                    animationFrame = 0;
                }
            },
            {
                rootMargin: "100% 0px",
                threshold: 0,
            }
        );

        const handleScroll = () => updateTarget(false);
        const handleResize = () => updateTarget(isNearViewport);

        visibilityObserver.observe(wrapper);
        applyProgress(0);

        window.addEventListener("scroll", handleScroll, { passive: true });
        window.addEventListener("resize", handleResize);

        return () => {
            visibilityObserver.disconnect();
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);

            if (animationFrame) {
                window.cancelAnimationFrame(animationFrame);
            }
        };
    }, []);

    return (
        <div
            ref={wrapperRef}
            className={styles.wrapper}
            style={{ height: `${SCROLL_LENGTH_VH}vh` }}
        >
            <div className={styles.sticky}>
                <div ref={trackRef} className={styles.track}>
                    <section className={styles.sharedSequence}>
                        <div className={styles.sharedShaderTrack} aria-hidden="true">
                            <div className={styles.sharedShaderSticky}>
                                <Suspense fallback={null}>
                                    <OptimizedShader
                                        className={styles.sharedShader}
                                        colors={[
                                            "#03050f",
                                            "#0e1420",
                                            "#10131b",
                                            "#1b2232",
                                            "#12161e",
                                            "#020202",
                                        ]}
                                        mobileColors={[
                                            "#03050f",
                                            "#0e1420",
                                            "#222737",
                                            "#222d46",
                                            "#12161e",
                                            "#020202",
                                        ]}
                                        speed={0.7}
                                        particleColor="#e6c88d"
                                        mobileParticleColor="#34d399"
                                        particleCount={48}
                                        particleLayout="text"
                                        continuous={true}
                                    />
                                </Suspense>
                                <div className={styles.sharedShaderOverlay} />
                            </div>
                        </div>

                        <div className={`${styles.sharedSequenceContent} $className={styles.panel}`} data-section>
                            <DenmarkToVashi />
                        </div>
                    </section>
                    {/* <div className={styles.panel}>
            <DenmarkToVashi />
          </div> */}
                    <div className={styles.panel}>
                        <VashiDenmark />
                    </div>
                </div>
            </div>
        </div>
    );
}