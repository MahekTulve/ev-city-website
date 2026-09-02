'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PlaceToLive.module.css';

gsap.registerPlugin(ScrollTrigger);

const cloudPositions = [
    styles.cloudPositionA,
    styles.cloudPositionB,
    styles.cloudPositionC,
    styles.cloudPositionD,
];

interface CloudLayerProps {
    src: string;
    layerClass: string;
    trackClass: string;
    imageClass: string;
}

function CloudLayer({
    src,
    layerClass,
    trackClass,
    imageClass,
}: CloudLayerProps) {
    return (
        <div
            className={`${styles.cloudLayer} ${layerClass}`}
            aria-hidden="true"
        >
            <div className={`${styles.cloudMarquee} ${trackClass}`}>
                {[0, 1].map((groupIndex) => (
                    <div
                        className={styles.cloudGroup}
                        key={groupIndex}
                    >
                        {[0, 1, 2, 3].map((itemIndex) => {
                            const flipped = itemIndex % 2 === 1;

                            return (
                                <div
                                    className={`${styles.cloudItem} ${
                                        cloudPositions[itemIndex]
                                    }`}
                                    key={`${groupIndex}-${itemIndex}`}
                                >
                                    <img
                                        src={src}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                        draggable={false}
                                        className={`${styles.cloudImage} ${imageClass} ${
                                            flipped
                                                ? styles.cloudImageFlipped
                                                : ''
                                        }`}
                                    />
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
}

const PlaceToLive = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const cardOneRef = useRef<HTMLDivElement>(null);
    const cardTwoRef = useRef<HTMLDivElement>(null);
    const galleryRef = useRef<HTMLDivElement>(null);

    const [showText, setShowText] = useState(false);

    useEffect(() => {
        const el = containerRef.current;

        if (!el) return;

        const ctx = gsap.context(() => {
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
                    },
                },
            });

            tl.to(
                cardOneRef.current,
                {
                    marginTop: '0px',
                    ease: 'none',
                },
                'step1'
            )
                .to(
                    cardTwoRef.current,
                    {
                        marginBottom: '0px',
                        ease: 'none',
                    },
                    'step1'
                )
                .to(
                    galleryRef.current,
                    {
                        gap: '0px',
                        ease: 'none',
                    },
                    'step2'
                )
                .to(
                    [cardOneRef.current, cardTwoRef.current],
                    {
                        width: '50vw',
                        height: '100vh',
                        ease: 'power1.inOut',
                    },
                    'step3'
                    
                );
        }, el);

        return () => ctx.revert();
    }, []);

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.container}
                ref={containerRef}
            >
                {/* TOP CLOUDS */}
                <div
                    className={styles.cloudTransition}
                    aria-hidden="true"
                >
                    <div className={styles.cloudBase} />
                    <div className={styles.cloudCore} />
                    <div className={styles.cloudFog} />

                    <CloudLayer
                        src="/images/cloud_6.avif"
                        layerClass={styles.cloudLayerBack}
                        trackClass={styles.cloudTrackBack}
                        imageClass={styles.cloudImageBack}
                    />

                    <CloudLayer
                        src="/images/cloud_5.avif"
                        layerClass={styles.cloudLayerMiddle}
                        trackClass={styles.cloudTrackMiddle}
                        imageClass={styles.cloudImageMiddle}
                    />

                    <CloudLayer
                        src="/images/cloud_4.avif"
                        layerClass={styles.cloudLayerFront}
                        trackClass={styles.cloudTrackFront}
                        imageClass={styles.cloudImageFront}
                    />
                </div>

                {/* IMAGE GALLERY */}
                <div
                    className={styles.imageGallery}
                    ref={galleryRef}
                >
                    <div
                        className={styles.imageCardOne}
                        ref={cardOneRef}
                    >
                        <img
                            src="/images/new_left_cut.webp"
                            alt="Architecture 1"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>

                    <div
                        className={styles.imageCard}
                        ref={cardTwoRef}
                    >
                        <img
                            src="/images/new_right_cut.webp"
                            alt="Architecture 2"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                </div>

                {showText && (
                    <div
                        className={styles.overlayTextContainer}
                    />
                )}
            </div>
        </div>
    );
};

export default PlaceToLive;