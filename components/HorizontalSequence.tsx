"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import styles from "./HorizontalSequence.module.css";
import DenmarkToVashi from "./AboutSections/DenmarkToVashi";
import VashiDenmark from "./AboutSections/Vashidenmark";
import { OptimizedShader } from "./FeaturesSections/OptimizedShader";

// Extra scroll while DenmarkToVashi stays fully visible, then horizontal transition,
 // followed by the existing hold on VashiDenmark.
const SCROLL_LENGTH_VH = 600;
const INTRO_HOLD_VH = 100;
const FORWARD_END_HOLD_VH = 150;

const clamp = (value: number, min = 0, max = 1) =>
    Math.min(max, Math.max(min, value));

export default function HorizontalSequence() {
    const [shaderActive, setShaderActive] = useState(false);
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
            track.style.transform = `translate3d(-${progress * 100}vw, 0, 0)`;
        };

        const getScrollMetrics = () => {
            const rect = wrapper.getBoundingClientRect();
            const wrapperTop = window.scrollY + rect.top;
            const scrollableDistance = Math.max(0, wrapper.offsetHeight - window.innerHeight);
            const introHoldDistance = window.innerHeight * (INTRO_HOLD_VH / 100);
            const endHoldDistance = window.innerHeight * (FORWARD_END_HOLD_VH / 100);
            const horizontalAnimationDistance = Math.max(
                1,
                scrollableDistance - introHoldDistance - endHoldDistance
            );
            const scrollWithinWrapper = clamp(
                window.scrollY - wrapperTop,
                0,
                scrollableDistance
            );

            return {
                scrollableDistance,
                introHoldDistance,
                endHoldDistance,
                horizontalAnimationDistance,
                scrollWithinWrapper,
            };
        };

        const measureProgress = () => {
            const { introHoldDistance, horizontalAnimationDistance, scrollWithinWrapper } =
                getScrollMetrics();

            // Keep DenmarkToVashi fixed for the first extra scroll.
            return clamp((scrollWithinWrapper - introHoldDistance) / horizontalAnimationDistance);
        };

        const animateToTarget = () => {
            displayedProgress += (targetProgress - displayedProgress) * 0.08;

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
                setShaderActive(isNearViewport);

                if (isNearViewport) {
                    updateTarget(true);
                } else if (animationFrame) {
                    window.cancelAnimationFrame(animationFrame);
                    animationFrame = 0;
                }
            },
            {
                rootMargin: "150% 0px",
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
                                        particleCount={16}
                                        particleLayout="text"
                                        showParticles={shaderActive}
                                        continuous={shaderActive}
                                    />
                                </Suspense>
                                <div className={styles.sharedShaderOverlay} />
                            </div>
                        </div>

                        <div className={`${styles.sharedSequenceContent} ${styles.panel}`} data-section>
                            <DenmarkToVashi />
                        </div>
                    </section>
            
                    <div className={styles.panel}>
                        <VashiDenmark />
                    </div>
                </div>
            </div>
        </div>
    );
}