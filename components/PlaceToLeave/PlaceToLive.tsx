'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './PlaceToLive.module.css';
import NextPhoto from './NextPhoto';

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
        <div className={`${styles.cloudLayer} ${layerClass}`} aria-hidden="true">
            <div className={`${styles.cloudMarquee} ${trackClass}`}>
                {[0, 1].map((groupIndex) => (
                    <div className={styles.cloudGroup} key={groupIndex}>
                        {[0, 1, 2, 3].map((itemIndex) => {
                            const flipped = itemIndex % 2 === 1;

                            return (
                                <div
                                    className={`${styles.cloudItem} ${cloudPositions[itemIndex]}`}
                                    key={`${groupIndex}-${itemIndex}`}
                                >
                                    <img
                                        src={src}
                                        alt=""
                                        loading="lazy"
                                        decoding="async"
                                        draggable={false}
                                        className={`${styles.cloudImage} ${imageClass} ${
                                            flipped ? styles.cloudImageFlipped : ''
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
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1000);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: el,
                    start: 'top top',
                    end: '+=1800',
                    scrub: 0.5,
                    pin: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        setShowText(self.progress > 0.9);
                    },
                },
            });

            // PHASE 1: Align Top/Bottom offsets
            tl.to(
                cardOneRef.current,
                { marginTop: '0px', ease: 'none' },
                'phase1'
            )
                .to(
                    cardTwoRef.current,
                    { marginBottom: '0px', ease: 'none' },
                    'phase1'
                )
                // PHASE 2: Gap 0px (Dono aadhi image aur text aapas me jud jayenge)
                .to(
                    galleryRef.current,
                    { gap: '0px', ease: 'none' },
                    'phase2'
                )
                // PHASE 3: Dono cards aur text sath me expand / zoom honge
                .to(
                    [cardOneRef.current, cardTwoRef.current],
                    {
                        width: '50vw',
                        height: '100vh',
                        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                        ease: 'power1.inOut',
                    },
                    'phase3'
                );
        }, el);

        return () => ctx.revert();
    }, []);

    const masterImage = isMobile
        ? '/images/den_mobile_top.png'
        : '/images/new_cut_example.png';

    // Text structure element
    const TextOverlay = () => (
        <div className={styles.copehe}>
            <h1>COPENHAGEN</h1>
            <div className={styles.denma}>
                <span></span>
                denmark
                <span></span>
            </div>
        </div>
    );

    return (
        <div className={styles.wrapper}>
            <div className={styles.container} ref={containerRef}>
                {/* CLOUDS SECTION */}
                <div className={styles.cloudTransition} aria-hidden="true">
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

                {/* SPLIT IMAGE & TEXT GALLERY */}
                <div className={styles.imageGallery} ref={galleryRef}>
                    {/* LEFT PIECE (Left Image + Left Half Text) */}
                    <div className={styles.imageCardOne} ref={cardOneRef}>
                        <img
                            src={masterImage}
                            alt="Master Image Left Half"
                            className={styles.fullClipImage}
                            loading="lazy"
                        />
                        <div className={styles.textWrapperLeft}>
                            <TextOverlay />
                        </div>
                    </div>

                    {/* RIGHT PIECE (Right Image + Right Half Text) */}
                    <div className={styles.imageCard} ref={cardTwoRef}>
                        <img
                            src={masterImage}
                            alt="Master Image Right Half"
                            className={styles.fullClipImage}
                            loading="lazy"
                        />
                        <div className={styles.textWrapperRight}>
                            <TextOverlay />
                        </div>
                    </div>
                </div>

                {showText && <div className={styles.overlayTextContainer} />}
            </div>
            <NextPhoto />
        </div>
    );
};

export default PlaceToLive;