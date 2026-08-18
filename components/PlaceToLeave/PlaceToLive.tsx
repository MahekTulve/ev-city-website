'use client'
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PlaceToLive.module.css';

gsap.registerPlugin(ScrollTrigger);

const PlaceToLive = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardOneRef = useRef<HTMLDivElement>(null);
    const cardTwoRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);
    const videoLeftRef = useRef<HTMLVideoElement>(null);
    const videoRightRef = useRef<HTMLVideoElement>(null);
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const el = containerRef.current;

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: 'top top',
                end: '+=1600',
                scrub: 0.5,
                pin: true,
                anticipatePin: 1,

                onUpdate: (self) => {
                    if (self.progress > 0.9) {
                        setShowText(true);
                    } else {
                        setShowText(false);
                    }
                }
            },
        });

        tl.to(cardOneRef.current, {
            marginTop: '0px',
            ease: 'none',
        }, 'step1')
            .to(cardTwoRef.current, {
                marginBottom: '0px',
                ease: 'none',
            }, 'step1')
            .to(galleryRef.current, {
                gap: '0px',
                ease: 'none',
            }, 'step2')
            .to([cardOneRef.current, cardTwoRef.current], {
                width: '50vw',
                height: '100vh',
                ease: 'power1.inOut',
            }, 'step3')
            .to(videoLeftRef.current, {
                x: '-80vw',
                scale: 2,
                ease: 'power1.inOut',
            }, 'step3')
            .to(videoRightRef.current, {
                x: '80vw',
                scale: 2,
                ease: 'power1.inOut',
            }, 'step3');

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const headingText = "ARCHITECTURE";

    return (
        <div className={styles.wrapper}>
            <div className={styles.container} ref={containerRef}>
                <div className={styles.imageGallery} ref={galleryRef}>
                    <div className={styles.imageCardOne} ref={cardOneRef}>
                        <img
                            src="/images/denmark1.png"
                            alt="Architecture 1"
                        />
                    </div>
                    <div className={styles.imageCard} ref={cardTwoRef}>
                        <img
                            src="/images/denmark2.png"
                            alt="Architecture 2"
                        />
                    </div>
                </div>

                {showText && (
                    <div className={styles.overlayTextContainer}>
                        {/* <h1 className={styles.animatedTitle}>
                            {headingText.split("").map((char, index) => (
                                <span 
                                    key={index} 
                                    className={styles.letter}
                                    style={{ animationDelay: `${index * 0.08}s` }}
                                >
                                    {char === " " ? "\u00A0" : char}
                                </span>
                            ))}
                        </h1> */}
                    </div>
                )}

                <video
                    ref={videoRightRef}
                    className={`${styles["flower"]} ${styles["flowerTopRight"]}`}
                    src="/videos/flower-2.webm"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                />
                {/* <div
                    className={styles.imageTopRight} >
                    <img src="/images/tree4.png" alt="right-image" />

                </div>
                <div
                    className={styles.imageTopLeft} >
                    <img src="/images/tree2.png" alt="right-image" />

                </div> */}
                <video
                    ref={videoLeftRef}
                    className={`${styles["flower"]} ${styles["flowerTopLeft"]}`}
                    src="/videos/flower-2.webm"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    aria-hidden="true"
                />
            </div>
            {/* <div className={styles.bottompart}>
                <img
                    src="/images/why-vashi-bottom.png"
                    alt="Architecture 3"
                />
            </div> */}
        </div>
    );
};

export default PlaceToLive;