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
        <div
            className={`${styles.cloudLayer} ${layerClass}`}
            aria-hidden="true"
        >
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

    // Aspire-style freeze state
    const isFrozenRef = useRef(false);

    // Prevent repeated enter/leave triggers
    const animationStartedRef = useRef(false);

    const [showText, setShowText] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // ---------------------------------------------------------
    // MOBILE CHECK
    // ---------------------------------------------------------
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 1000);
        };

        checkMobile();

        window.addEventListener('resize', checkMobile);

        return () => {
            window.removeEventListener('resize', checkMobile);
        };
    }, []);

useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {

        // Aspire-style freeze flag
        const isFrozenRef = {
            current: false,
        };

        const tl = gsap.timeline({
            paused: true,

            onStart: () => {
                isFrozenRef.current = true;
            },

            onComplete: () => {
                isFrozenRef.current = false;
                setShowText(true);
            },

            onReverseComplete: () => {
                isFrozenRef.current = false;
                setShowText(false);
            },
        });

        // --------------------------------
        // STEP 1
        // --------------------------------
        tl.to(
            cardOneRef.current,
            {
                marginTop: '0px',
                duration: 0.2,
                ease: 'power2.out',
            },
            'step1'
        )

        // --------------------------------
        // STEP 1
        // --------------------------------
        .to(
            cardTwoRef.current,
            {
                marginBottom: '0px',
                duration: 0.2,
                ease: 'power2.out',
            },
            'step1'
        )

        // --------------------------------
        // STEP 2
        // --------------------------------
        .to(
            galleryRef.current,
            {
                gap: '0px',
                duration: 0.4,
                ease: 'power2.inOut',
            },
            'step2'
        )

        // --------------------------------
        // STEP 3
        // --------------------------------
        .to(
            [cardOneRef.current, cardTwoRef.current],
            {
                width: '50vw',
                height: '100vh',
                clipPath:
                    'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                duration: 0.5,
                ease: 'power3.inOut',
            },
            'step3'
        );

        // --------------------------------
        // SCROLL TRIGGER
        // --------------------------------
        ScrollTrigger.create({
            trigger: el,

            start: 'top top',

            end: '+=1000',

            pin: true,
            pinSpacing: true,
            anticipatePin: 1,

            onEnter: () => {

                // Animation already running
                if (isFrozenRef.current) return;

                // Start animation
                tl.play();
            },

            onEnterBack: () => {

                // Reverse animation
                if (isFrozenRef.current) return;

                tl.reverse();
            },

            onLeaveBack: () => {

                // If animation is still running,
                // don't allow another reverse
                if (isFrozenRef.current) return;

                tl.reverse();
            },
        });

    }, el);

    return () => {
        ctx.revert();
    };

}, []);
    const masterImage = isMobile
        ? '/images/mobil_denmark_top.webp'
        : '/images/new_cut_example.webp';

    const TextOverlay = () => (
        <div className={styles.copehe}>
            <h2>COPENHAGEN</h2>

            <div className={styles.denma}>
                <span></span>
                denmark
                <span></span>
            </div>
        </div>
    );

    return (
        <div className={styles.wrapper}>

            <div
                className={styles.container}
                ref={containerRef}
            >

                {/* CLOUDS SECTION */}
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

                {/* SPLIT IMAGE & TEXT GALLERY */}
                <div
                    className={styles.imageGallery}
                    ref={galleryRef}
                >

                    <div
                        className={styles.imageCardOne}
                        ref={cardOneRef}
                    >
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

                    <div
                        className={styles.imageCard}
                        ref={cardTwoRef}
                    >
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

                {showText && (
                    <div
                        className={styles.overlayTextContainer}
                    />
                )}

            </div>

            <NextPhoto />

        </div>
    );
};

export default PlaceToLive;