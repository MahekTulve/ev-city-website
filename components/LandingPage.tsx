import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LandingPage.module.css";

gsap.registerPlugin(ScrollTrigger);

function Glyph({ className }: { className?: string | undefined }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <path
        d="M24 3c2.2 6.4 4.4 9.2 8.2 11.4-3.8.6-6.6 1.8-8.2 3.6-1.6-1.8-4.4-3-8.2-3.6C19.6 12.2 21.8 9.4 24 3Z"
        fill="currentColor"
      />
      <path
        d="M24 45c-2.2-6.4-4.4-9.2-8.2-11.4 3.8-.6 6.6-1.8 8.2-3.6 1.6 1.8 4.4 3 8.2 3.6C28.4 35.8 26.2 38.6 24 45Z"
        fill="currentColor"
      />
      <path
        d="M3 24c6.4-2.2 9.2-4.4 11.4-8.2.6 3.8 1.8 6.6 3.6 8.2-1.8 1.6-3 4.4-3.6 8.2C12.2 28.4 9.4 26.2 3 24Z"
        fill="currentColor"
      />
      <path
        d="M45 24c-6.4 2.2-9.2 4.4-11.4 8.2-.6-3.8-1.8-6.6-3.6-8.2 1.8-1.6 3-4.4 3.6-8.2C35.8 19.6 38.6 21.8 45 24Z"
        fill="currentColor"
      />
      <circle cx="24" cy="24" r="2.6" fill="currentColor" />
    </svg>
  );
}

interface LandingPageProps {
  isNight: boolean;
  onToggleNight: () => void;
}

export default function LandingPage({ isNight, onToggleNight }: LandingPageProps) {
  const introRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        },
      });

      tl.to(`.${styles.preloaderGlyph}`, { opacity: 1, duration: 0.5 })
        .to(`.${styles.lockupEra}`, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(`.${styles.sideLeft}`, { opacity: 1, x: 0, duration: 0.5 }, "-=0.3")
        .to(`.${styles.sideRight}`, { opacity: 1, x: 0, duration: 0.5 }, "-=0.5")
        .to(`.${styles.lockupResidence}`, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
        .to(`.${styles.lockupScript}`, { opacity: 1, duration: 0.5 }, "-=0.2")
        .to(`.${styles.watermark}`, { opacity: 1, duration: 0.6 }, "-=0.4")
        .to(`.${styles.preloaderFrame}`, { opacity: 1, duration: 0.6 }, "-=0.4")
        .to(`.${styles.preloaderRule}`, { opacity: 1, duration: 0.5 }, "-=0.3")
        .to(`.${styles.preloaderFoot}`, { opacity: 1, duration: 0.5 }, "-=0.3");

      tl.to(`.${styles.lockup}`, { opacity: 0, scale: 1.08, duration: 0.8 }, "+=0.2")
        .to(
          archRef.current,
          {
            width: "34vw",
            height: "78vh",
            borderTopLeftRadius: "50% 38%",
            borderTopRightRadius: "50% 38%",
            duration: 0.8,
            ease: "power1.inOut",
          },
          "-=0.4",
        )
        .to(archRef.current, {
          width: "100vw",
          height: "100vh",
          borderTopLeftRadius: "0%",
          borderTopRightRadius: "0%",
          duration: 0.8,
          ease: "power2.out",
        });
    }, introRef);

    return () => ctx.revert();
  }, []);

  const renderMainSections = () => (
    <div className={styles.heroSceneWrapper}>
      <div
        className={`${styles.bgLayer} ${styles.dayBg}`}
        style={{ opacity: isNight ? 0 : 1 }}
      />
      <div
        className={`${styles.bgLayer} ${styles.nightBg}`}
        style={{ opacity: isNight ? 1 : 0 }}
      />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <p className={styles.subHeaderGold}>THE FUTURE OF</p>
          <h1 className={styles.heroEra}>
            THE CITY
          </h1>
          <div className={styles.glowingBorderLine}></div>
          <span className={styles.subHeaderGoldBottom}>ISN’T MEASURED IN KMS</span>
          <div className={styles.rightContentBlock}>
            <span className={styles.subHeaderGoldRight}>IT’S MEASURED IN</span>
            <h2 className={styles.secondaryTitleLarge}>MOMENTS</h2>
            <div className={styles.glowintwo}></div>

            <div className={styles.momentsSubtitleRow}>
              <span>moments saved,</span>
              <span className={styles.dotSeparator}>|</span>
              <span>moments shared,</span>
              <span className={styles.dotSeparator}>|</span>
              <span>moments remembered.</span>
            </div>
          </div>
        </div>

        <div className={styles.heroTagline}>
          <span className={styles.taglineWord}>A PLACE</span>

          <button
            type="button"
            className={styles.toggle}
            onClick={onToggleNight}
            aria-pressed={isNight}
          >
            <span className={isNight ? styles.toggleOff : styles.toggleOn}>BY DAY</span>
            <span className={styles.toggleTrack}>
              <span
                className={styles.toggleKnob}
                style={{ left: isNight ? "calc(100% - 5px)" : "0%" }}
              />
            </span>
            <span className={isNight ? styles.toggleOn : styles.toggleOff}>BY NIGHT</span>
          </button>

          <span className={styles.taglineWord}>TO RETURN TO</span>
        </div>
      </header>
    </div>
  );

  return (
    <div className={styles.root}>
      {/* ---------------- Section 1: Intro ---------------- */}
      <section className={styles.introSection} ref={introRef}>
        <span className={styles.preloaderFrame} />
        <span className={styles.watermark}>Vashi</span>
        <Glyph className={styles.preloaderGlyph} />

        <div className={styles.preloaderRow}>
          <span className={styles.lockup}>
            <span className={styles.lockupEra}>THe</span>
            <span className={styles.lockupResidence}>
              <span className={styles.fivenum}>5</span> Minute City
            </span>
            <span className={styles.lockupScript}>Time, Redefined</span>
          </span>
        </div>

        <span className={styles.preloaderRule} />
        <p className={styles.preloaderFoot}>
          ev homes
          <br />
          A place to return to.
        </p>

        <div className={styles.arch} ref={archRef}>
          <div className={styles.archInnerWrapper}>{renderMainSections()}</div>
        </div>
      </section>
    </div>
  );
}