import { useLayoutEffect, useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LandingPage.module.css";
import { motion, type Variants } from "framer-motion";

interface LandingPageProps {
  isNight: boolean;
}
gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.config({ ignoreMobileResize: true });

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

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  letterVariants: Variants;
  delay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, className, letterVariants, delay = 0 }) => {
  const letters = Array.from(text);

  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.04,
      },
    },
  };

  return (
    <motion.span
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      style={{ display: 'inline-block' }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          variants={letterVariants}
          style={{ display: 'inline-block', whiteSpace: 'pre' }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.span>
  );
};

export default function LandingPage({ isNight }: LandingPageProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNearViewport(true);
          observer.disconnect();
        }
      },
      { rootMargin: "1000px 0px", threshold: 0 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobileDevice = () => window.innerWidth <= 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: () => (isMobileDevice() ? "+=220%" : "+=300%"),
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      if (!isMobileDevice()) {
        tl.to(`.${styles['preloaderGlyph']}`, { opacity: 1, duration: 0.4 })
          .to(`.${styles['lockupEra']}`, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
          .to(`.${styles['lockupResidence']}`, { opacity: 1, y: 0, duration: 0.4 }, "-=0.25")
          .to(`.${styles['lockupScript']}`, { opacity: 1, duration: 0.4 }, "-=0.25")
          .to(`.${styles['watermark']}`, { opacity: 1, duration: 0.5 }, "-=0.25")
          .to(`.${styles['preloaderFrame']}`, { opacity: 1, duration: 0.5 }, "-=0.25")
          .to(`.${styles['preloaderRule']}`, { opacity: 1, duration: 0.4 }, "-=0.25")
          .to(`.${styles['preloaderFoot']}`, { opacity: 1, duration: 0.4 }, "-=0.25");
      }

      tl.to(`.${styles['lockup']}`, { opacity: 0, scale: 1.08, duration: 0.7 }, "+=0.1")
        .to(
          archRef.current,
          {
            scaleX: () => (isMobileDevice() ? 0.85 : 0.34),
            scaleY: () => (isMobileDevice() ? 0.7 : 0.78),
            duration: 1,
            ease: "power1.inOut",
          },
          "-=0.45",
        )
        .to(archRef.current, {
          scaleX: 1,
          scaleY: 1,
          borderTopLeftRadius: "0% 0%",
          borderTopRightRadius: "0% 0%",
          duration: 1.2,
          ease: "power2.out",
        });
    }, introRef);

    return () => ctx.revert();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: isMobile ? 0.1 : 0.8,
        staggerChildren: isMobile ? 0.15 : 0.25,
      },
    },
  };

  const blockVariants: Variants = {
    hidden: {
      opacity: 0,
      y: isMobile ? 35 : 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.6 : 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const preloaderItemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: isMobile ? 25 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.01 },
    },
  };

  // --- MOBILE SEQUENTIAL WORD ANIMATION VARIANTS ---
  const mobileSequentialContainer: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4, // Har ek WORD ke aane ke beech ka gap (0.4s)
        delayChildren: 0.1,
      },
    },
  };

  const wordChildVariant: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const getPreloaderMotionProps = (amount = 0.3) => {
    if (isMobile) {
      return {
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: false, amount },
        variants: preloaderItemVariants,
      };
    }
    return {};
  };

  const renderMainSections = () => (
    <div className={styles['heroSceneWrapper']}>
      <div
        className={`${styles.bgLayer} ${
          isNearViewport ? (isNight ? styles.nightBg : styles.dayBg) : ""
        }`}
      />
      <header className={styles['hero']}>
        <motion.div
          className={`${styles['heroInner']} ${isNight ? styles['nightTheme'] : styles['dayTheme']}`}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.p className={styles['subHeaderGold']} variants={blockVariants}>
            THE FUTURE OF
          </motion.p>

          <motion.h1 className={styles['heroEra']} variants={blockVariants}>
            <span>THE CITY</span>
          </motion.h1>

          <motion.div className={styles['glowingBorderLine']} variants={blockVariants} />

          <motion.span className={styles['subHeaderGoldBottom']} variants={blockVariants}>
            ISN’T MEASURED IN KMS
          </motion.span>

          <div className={styles['rightContentBlock']}>
            <motion.span className={styles['subHeaderGoldRight']} variants={blockVariants}>
              IT’S MEASURED IN
            </motion.span>

            <motion.h2 className={styles['secondaryTitleLarge']} variants={blockVariants}>
              <span>MOMENTS</span>
            </motion.h2>

            <motion.div
              className={styles['glowintwo']}
              style={{ transformOrigin: "center" }}
              variants={blockVariants}
            />

            <div className={styles['momentsSubtitleRow']}>
              <TypewriterText text="moments saved," letterVariants={letterVariants} delay={2.8} />
              <TypewriterText text="moments shared," letterVariants={letterVariants} delay={3.4} />
              <TypewriterText text="moments remembered." letterVariants={letterVariants} delay={4.0} />
            </div>
          </div>
        </motion.div>
      </header>
    </div>
  );

  return (
    <div ref={rootRef} className={styles['root']}>
      <section className={styles['introSection']} ref={introRef}>
        <motion.span className={styles['preloaderFrame']} {...getPreloaderMotionProps(0.1)} />
        <motion.span className={styles['watermark']} {...getPreloaderMotionProps(0.2)}>Vashi</motion.span>

        {/* <motion.div {...getPreloaderMotionProps(0.2)}>
          <Glyph className={styles['preloaderGlyph']} />
        </motion.div> */}

        {isMobile ? (
          <motion.div
            variants={mobileSequentialContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            style={{ width: "100%", textAlign: "center", position: "relative" }}
          >
            <div className={styles['preloaderRow']}>
              <div className={styles['lockup']}>
                {/* Word 1: THe */}
                <motion.span className={styles['lockupEra']} variants={wordChildVariant}>
                  THe
                </motion.span>

                <div className={styles['lockupResidence']}>
                  {/* Word 2: 5 */}
                  <motion.span className={styles['fivenum']} variants={wordChildVariant}>
                    5
                  </motion.span>

                  <div className={styles['colum']}>
                    {/* Word 3: Minute */}
                    <motion.span className={styles['Minutecs']} variants={wordChildVariant}>
                      Minute
                    </motion.span>
                    <motion.span className={styles['citycs']} variants={wordChildVariant}>
                      City
                    </motion.span>
                  </div>
                </div>
                <motion.div className={styles['watermarkdo']} variants={wordChildVariant}>
                  <span>V</span>
                  <span>A</span>
                  <span>S</span>
                  <span>H</span>
                  <span>I</span>
                </motion.div>
                <motion.span className={styles['lockupScript']} variants={wordChildVariant}>
                  Time, Redefined
                </motion.span>
              </div>
            </div>

          </motion.div>
        ) : (
          /* DESKTOP ORIGINAL CODE */
          <>
            <div className={styles['watermarkdo']}>
              <span>V</span>
              <span>A</span>
              <span>S</span>
              <span>H</span>
              <span>I</span>
            </div>

            <div className={styles['preloaderRow']}>
              <div className={styles['lockup']}>
                <motion.span className={styles['lockupEra']} {...getPreloaderMotionProps(0.3)}>
                  THe
                </motion.span>

                <motion.span className={styles['lockupResidence']} {...getPreloaderMotionProps(0.4)}>
                  <span className={styles['fivenum']}>5</span>
                  <div className={styles['colum']}>
                    <span className={styles['Minutecs']}>Minute</span>
                    <span className={styles['citycs']}>City</span>
                  </div>
                </motion.span>

                <motion.span className={styles['lockupScript']} {...getPreloaderMotionProps(0.5)}>
                  Time, Redefined
                </motion.span>
              </div>
            </div>
          </>
        )}

        <motion.span className={styles['preloaderRule']} {...getPreloaderMotionProps(0.5)} />

        <motion.p className={styles['preloaderFoot']} {...getPreloaderMotionProps(0.6)}>
          ev homes
          <br />
          A place to return to.
        </motion.p>

        <div className={styles['arch']} ref={archRef}>
          <div className={styles['archInnerWrapper']}>{renderMainSections()}</div>
        </div>
      </section>
    </div>
  );
}