import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LandingPage.module.css";
import { motion, type Variants } from "framer-motion";

interface LandingPageProps {
  isNight: boolean;
}
gsap.registerPlugin(ScrollTrigger);

// Mobile browsers fire resize events every time the address bar shows/hides.
// Ignoring those stops the pinned section from jumping mid-scroll.
ScrollTrigger.config({ ignoreMobileResize: true });
// ScrollTrigger.normalizeScroll(true)

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

// --- TRUE TYPEWRITER TEXT COMPONENT ---
interface TypewriterTextProps {
  text: string;
  className?: string;
  letterVariants: Variants;
  delay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, className, letterVariants, delay = 0 }) => {
  const letters = Array.from(text);

  const containerVariants: Variants = {
    hidden: { opacity: 1 }, // Container hamesha visible rahega taaki collapse na ho
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.04, // Typing speed (jitna kam, utna fast type hoga)
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

  const introRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);

  // --- GSAP Preloader + Arch Animation ---
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isMobile = () => window.innerWidth <= 768;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          // Mobile par chota scroll distance = arch jaldi aata hai
          end: () => (isMobile() ? "+=220%" : "+=300%"),
          // scrub: 1 = 1s smoothing, taaki fast flick par animation jump
          // na kare, smoothly catch-up ho
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          // Bahut tez scroll par end state par snap karo, aadha-adhura
          // arch state kabhi na dikhe
          fastScrollEnd: true,
          invalidateOnRefresh: true,
        },
      });

      // Step 1: Preloader text aur elements ka fade-in (thoda tight timing,
      // taaki arch jaldi arrive ho)
      tl.to(`.${styles['preloaderGlyph']}`, { opacity: 1, duration: 0.4 })
        .to(`.${styles['lockupEra']}`, { opacity: 1, y: 0, duration: 0.4 }, "-=0.2")
        .to(`.${styles['lockupResidence']}`, { opacity: 1, y: 0, duration: 0.4 }, "-=0.25")
        .to(`.${styles['lockupScript']}`, { opacity: 1, duration: 0.4 }, "-=0.25")
        .to(`.${styles['watermark']}`, { opacity: 1, duration: 0.5 }, "-=0.25")
        .to(`.${styles['preloaderFrame']}`, { opacity: 1, duration: 0.5 }, "-=0.25")
        .to(`.${styles['preloaderRule']}`, { opacity: 1, duration: 0.4 }, "-=0.25")
        .to(`.${styles['preloaderFoot']}`, { opacity: 1, duration: 0.4 }, "-=0.25");

      // Step 2: Lockup fade out aur arch ka scale-in.
      // IMPORTANT: width/height ki jagah scaleX/scaleY (GPU transform) —
      // layout recalculation nahi hota, isliye mobile par lag nahi hota.
      tl.to(`.${styles['lockup']}`, { opacity: 0, scale: 1.08, duration: 0.7 }, "+=0.1")
        .to(
          archRef.current,
          {
            scaleX: () => (isMobile() ? 0.85 : 0.34),
            scaleY: () => (isMobile() ? 0.7 : 0.78),
            duration: 1,
            ease: "power1.inOut",
          },
          "-=0.45",
        )
        // Step 3: Arch poori screen par scale-out (pin tabhi khulta hai jab
        // yeh complete ho jata hai)
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
        delayChildren: 0.8,
        staggerChildren: 0.25,
      },
    },
  };

  const blockVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 60,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // --- STRICT TYPEWRITER LETTER VARIANT (No sliding, only instant appear like typing) ---
  const letterVariants: Variants = {
    hidden: {
      opacity: 0, // Shuru mein bilkul invisible
    },
    visible: {
      opacity: 1, // Bina kisi movement (y: 0) ke seedha show hoga
      transition: {
        duration: 0.01, // Instant pop-in jo typewriter jaisa feel dega
      },
    },
  };

  const renderMainSections = () => (
    <div className={styles['heroSceneWrapper']}>
      <div
        className={`${styles.bgLayer} ${isNight ? styles.nightBg : styles.dayBg
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
          <motion.p
            className={styles['subHeaderGold']}
            variants={blockVariants}
          >
            THE FUTURE OF
          </motion.p>

          <motion.h1
            className={styles['heroEra']}
            variants={blockVariants}
          >
            <span>THE CITY</span>
          </motion.h1>

          <motion.div
            className={styles['glowingBorderLine']}
            variants={blockVariants}
          />

          <motion.span
            className={styles['subHeaderGoldBottom']}
            variants={blockVariants}
          >
            ISN’T MEASURED IN KMS
          </motion.span>

          <div className={styles['rightContentBlock']}>
            <motion.span
              className={styles['subHeaderGoldRight']}
              variants={blockVariants}
            >
              IT’S MEASURED IN
            </motion.span>

            <motion.h2
              className={styles['secondaryTitleLarge']}
              variants={blockVariants}
            >
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
    <div className={styles['root']}>
      <section className={styles['introSection']} ref={introRef}>
        <span className={styles['preloaderFrame']} />
        <span className={styles['watermark']}>Vashi</span>
        <Glyph className={styles['preloaderGlyph']} />

        <div className={styles['preloaderRow']}>
          <span className={styles['lockup']}>
            <span className={styles['lockupEra']}>THe</span>
            <span className={styles['lockupResidence']}>
              <span className={styles['fivenum']}>5</span> Minute City
            </span>
            <span className={styles['lockupScript']}>Time, Redefined</span>
          </span>
        </div>

        <span className={styles['preloaderRule']} />
        <p className={styles['preloaderFoot']}>
          ev homes
          <br />
          A place to return to.
        </p>

        <div className={styles['arch']} ref={archRef}>
          <div className={styles['archInnerWrapper']}>{renderMainSections()}</div>
        </div>
      </section>

    </div>
  );
}