import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./wayvashi.module.css"; // Direct import as styles
import DayNightButton from "./DayNightButton";

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    src: " /images/city.png",
    alt: "Planted stone terraces of the residence",
  },
  {
    src: " /images/city.png",
    alt: "Garden path towards the sea",
  },
];

const TITLE = "REAL-LIFE LOCATION";

const QUOTE_LINES = [
  "Instead of corridors, walking paths",
  "connect the apartments — making",
  "Era Residence feel closer to a group",
  "of private homes than a standard",
  "apartment building.",
];

function Rosette({ className }: { className?: string }) {
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
interface WayVashiProps {
  isNight?: boolean;
  setIsNight?: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function WayVashi({ isNight: initialIsNight = true, setIsNight }: WayVashiProps) {

  const rootRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const domeRef = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const [night, setNight] = useState<boolean>(initialIsNight);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Arch / dome rises out of the scene and swallows the viewport
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=100%",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(
        domeRef.current,
        { height: "0vh" },
        { height: "128vh", duration: 1, ease: "power1.inOut" },
      )
        .to(
          `.${styles.curvedText}`,
          { opacity: 0, duration: 0.35, ease: "power1.out" },
          "-=0.28",
        )
        .to(`.${styles.domeInner}`, { opacity: 1, duration: 0.4 }, "-=0.35");

      // 2. Headline reveals letter by letter
      gsap.to(`.${styles.bigTitle} span`, {
        opacity: 1,
        y: 0,
        translate: "0 0",
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.045,
        scrollTrigger: { trigger: `.${styles.bigTitle}`, start: "top 85%" },
      });

      // 3. Eyebrow + slider block ease up
      gsap.from(`.${styles.sliderFrame}`, {
        yPercent: 12,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: { trigger: `.${styles.sliderSection}`, start: "top 80%" },
      });

      // 3b. Chrome flips to ink while the sky sections own the screen
      ScrollTrigger.create({
        trigger: `.${styles.titleSection}`,
        start: "top bottom+=90%",
        endTrigger: quoteRef.current,
        end: "top 40%",

      });

      // 4. Quote lines slide up from their mask
      gsap.to(`.${styles.quoteLine} span`, {
        translate: "0 0",
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: { trigger: `.${styles.quote}`, start: "top 85%" },
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  const handleToggle = () => {
    const nextState = !night;
    setNight(nextState);
    if (setIsNight) {
      setIsNight(nextState);
    }
  };
  return (
    <div className={styles.next} ref={rootRef}>
      {/* ---------- Arch reveal ---------- */}
      <section
        className={styles.archStage}
        ref={stageRef}

      >
        <div
          className={`${styles.archBgLayer} ${styles.dayStageBg}`}
          style={{ opacity: night ? 0 : 1 }}
        />
        <div
          className={`${styles.archBgLayer} ${styles.nightStageBg}`}
          style={{ opacity: night ? 1 : 0 }}
        />

        <div className={styles.dayNightButtonContainer}>
          <div className={styles.heroTagline}>
            <span className={styles.taglineWord}>A PLACE</span>
            <DayNightButton isNight={night} onToggle={handleToggle} />
            <span className={styles.taglineWord}>TO RETURN TO</span>
          </div>
        </div>
        <div className={styles.dome} ref={domeRef}>
          <svg className={styles.curvedText} viewBox="0 0 1200 340" aria-hidden="true">
            <path id="archCurve" d="M 40 340 A 560 320 0 0 1 1160 340" fill="none" />
            <text textAnchor="middle">
              <textPath href="#archCurve" startOffset="50%">
                Three reasons to choose Era
              </textPath>
            </text>
          </svg>

          <div className={styles.domeInner}>
            <span className={styles.domeMark}>
              Costa
              <Rosette />
              Del Sol
            </span>
            <span className={styles.domeRule} />
            <p className={styles.eyebrow}>
              A place to live — to
              <br />
              return year after year
            </p>
          </div>
        </div>

        <h2 className="sr-only">Three reasons to choose Era</h2>
      </section>

      {/* ---------- Headline ---------- */}
      
      <section className={styles.titleSection}>
        <p className={styles.eyebrow}>
          A place to live — to
          <br />
          return year after year
        </p>
        <h2 className={styles.bigTitle}>
          {TITLE.split("").map((char, index) => (
            <span key={`${char}-${index}`}>{char === " " ? "\u00A0" : char}</span>
          ))}
        </h2>
      </section>

      {/* ---------- Slider ---------- */}
      <section className={styles.sliderSection}>
        <div className={styles.sliderFrame}>
          {SLIDES.map((item, index) => (
            <img
              key={item.alt}
              src={item.src}
              alt={item.alt}
              loading="lazy"
              width={1280}
              height={864}
              className={`${styles.slide} ${index === slide ? styles.slideActive : ""}`}
            />
          ))}
        </div>

        <div className={styles.sliderNav}>
          <button
            type="button"
            aria-label="Previous image"
            onClick={() => setSlide((value) => (value === 0 ? SLIDES.length - 1 : value - 1))}
          >
            ‹
          </button>
          <span>1</span>
          <span className={styles.sliderTrack}>
            <span
              className={styles.sliderProgress}
              style={{ width: `${((slide + 1) / SLIDES.length) * 100}%` }}
            />
          </span>
          <span>{SLIDES.length}</span>
          <button
            type="button"
            aria-label="Next image"
            onClick={() => setSlide((value) => (value + 1) % SLIDES.length)}
          >
            ›
          </button>
        </div>

        <p className={styles.sliderCopy}>
          Nestled between pristine beaches, world-class golf courses and exclusive wellness clubs,
          Era Residence offers a rare balance of seclusion and seamless access to the finest
          Mediterranean lifestyle.
        </p>

        <p className={styles.sliderNote}>
          Designed as a community,
          <br />
          not a complex
        </p>
      </section>

      {/* ---------- Quote over image ---------- */}
      <section ref={quoteRef} className={styles.quoteSection} style={{ backgroundImage: "url('/images/city.png')" }}>
        <blockquote className={styles.quote}>
          <span className={styles.quoteMark}>“</span>
          {QUOTE_LINES.map((line) => (
            <span key={line} className={styles.quoteLine}>
              <span>{line}</span>
            </span>
          ))}
        </blockquote>
      </section>
    </div>
  );
}