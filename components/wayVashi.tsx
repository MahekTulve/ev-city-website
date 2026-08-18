'use client'
import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./wayvashi.module.css";

import DayNightButton from "./DayNightButton";
import Lit from "./Lit/Lit";

gsap.registerPlugin(ScrollTrigger);

type FeatureIconType = "connectivity" | "ecosystem" | "momentum";

type SlideRecord = {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
  subtitleHighlight: string;
  features: {
    icon: FeatureIconType;
    line1: string;
    line2: string;
  }[];
};

const RECORDS: SlideRecord[] = [
  {
    src: "/images/city.png",
    alt: "Vashi waterfront skyline at sunset",
    title: "BUILT TO COMPOUND",
    subtitle: "The best addresses don’t chase growth.",
    subtitleHighlight: "They become where growth happens.",
    features: [
      {
        icon: "connectivity",
        line1: "Vashi has the",
        line2: "connectivity.",
      },
      {
        icon: "ecosystem",
        line1: "Vashi has the",
        line2: "ecosystem.",
      },
      {
        icon: "momentum",
        line1: "Now, it has the",
        line2: "momentum.",
      },
    ],
  },
  {
    src: "/images/vashicityDay.png",
    alt: "Vashi city during the day",
    title: "THE BUSINESS CAPITAL",
    subtitle:
      "Established commercial districts, premium residential demand, retail, hospitality and a growing corporate ecosystem give Vashi something newer destinations are still building:",
    subtitleHighlight: "a functioning urban economy.",
    features: [
      {
        icon: "connectivity",
        line1: "Move with",
        line2: "ease.",
      },
      {
        icon: "ecosystem",
        line1: "Live inside the",
        line2: "network.",
      },
      {
        icon: "momentum",
        line1: "Stay close to",
        line2: "opportunity.",
      },
    ],
  },
  {
    src: "/images/VashiCity2.jpg",
    alt: "Vashi skyline illuminated at night",
    title: "THE ONE-HOUR ADVANTAGE",
    subtitle:
      "Rail, road, metro expansion, major highways and proximity to the airport are turning Vashi into",
    subtitleHighlight:
      "a high-connectivity business address, not just a residential node.",
    features: [
      {
        icon: "connectivity",
        line1: "Minutes from",
        line2: "everything.",
      },
      {
        icon: "ecosystem",
        line1: "Surrounded by",
        line2: "possibility.",
      },
      {
        icon: "momentum",
        line1: "Positioned for",
        line2: "growth.",
      },
    ],
  },
    {
    src: "/images/building-malibu.png",
    alt: "Vashi skyline illuminated at night",
    title: "THE GATEWAY CITY",
    subtitle:
      "Connected to Mumbai, Navi Mumbai, and beyond, Vashi sits at the intersection of business, mobility,",
    subtitleHighlight:
      "and opportunity — making distance feel increasingly irrelevant.",
    features: [
      {
        icon: "connectivity",
        line1: "Minutes from",
        line2: "everything.",
      },
      {
        icon: "ecosystem",
        line1: "Surrounded by",
        line2: "possibility.",
      },
      {
        icon: "momentum",
        line1: "Positioned for",
        line2: "growth.",
      },
    ],
  },
    {
    src: "/images/5min_city.png",
    alt: "Vashi skyline illuminated at night",
    title: "THE ECONOMIC SHIFT",
    subtitle:
      "As Mumbai’s growth moves outward, the next wave belongs to places that already have the infrastructure, connectivity, and commercial DNA to lead.",
    subtitleHighlight:
      "Vashi has been ahead of that curve.",
    features: [
      {
        icon: "connectivity",
        line1: "Minutes from",
        line2: "everything.",
      },
      {
        icon: "ecosystem",
        line1: "Surrounded by",
        line2: "possibility.",
      },
      {
        icon: "momentum",
        line1: "Positioned for",
        line2: "growth.",
      },
    ],
  },
];

function FeatureIcon({ type }: { type: FeatureIconType }) {
  if (type === "connectivity") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <rect x="14" y="8" width="20" height="27" rx="5" />
        <path d="M18 14h12M17 26h14M19 35l-4 5M29 35l4 5" />
        <circle cx="19" cy="30" r="1.5" />
        <circle cx="29" cy="30" r="1.5" />
      </svg>
    );
  }

  if (type === "ecosystem") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M10 38V24h9v14M19 38V15h11v23M30 38V20h8v18" />
        <path d="M23 15V9h4v6M13 28h3M13 32h3M23 20h3M23 25h3M23 30h3M33 25h2M33 30h2" />
        <path d="M7 38h34" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M10 38V28h7v10M21 38V22h7v16M32 38V14h7v24" />
      <path d="M9 21l9-7 7 3 13-10" />
      <path d="M32 7h6v6" />
    </svg>
  );
}

function RecordSubtitle({
  subtitle,
  subtitleHighlight,
}: {
  subtitle: string;
  subtitleHighlight: string;
}) {
  return (
    <div className={styles.subtitleBlock}>
      <p className={styles.recordSubtitle}>{subtitle}</p>

      <div className={styles.subtitleHighlightRow}>
        <span className={styles.subtitleRule} />

        <span className={styles.subtitleHighlight}>
          {subtitleHighlight}
        </span>

        <span className={styles.subtitleRule} />
      </div>
    </div>
  );
}

interface WayVashiProps {
  isNight?: boolean;
  setIsNight?: Dispatch<SetStateAction<boolean>>;
}

export default function WayVashi({
  isNight: initialIsNight = true,
  setIsNight,
}: WayVashiProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const domeRef = useRef<HTMLDivElement>(null);

  const [slide, setSlide] = useState(0);
  const [night, setNight] = useState<boolean>(initialIsNight);

  // Enabled on every fresh page load.
  // Any manual arrow click disables autoplay until the next refresh.
  const [autoPlayEnabled, setAutoPlayEnabled] = useState(true);
  const [isStageVisible, setIsStageVisible] = useState(false);

  const activeRecord = RECORDS[slide];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const intro = `.${styles.domeIntro}`;
      const introCrown = `.${styles.introCrown}`;
      const introCrownLines = `.${styles.introCrownLine}`;
      const introCrownBars = `.${styles.introCrownMark} span`;
      const introEyebrow = `.${styles.introEyebrow}`;
      const introVashi = `.${styles.introVashi}`;
      const introNextRow = `.${styles.introNextRow}`;
      const introRules = `.${styles.introRule}`;
      const introNext = `.${styles.introNext}`;
      const introAddress = `.${styles.introAddress}`;
      const introSubtitle = `.${styles.introSubtitle}`;
      const curvedText = `.${styles.curvedText}`;
      const domeInner = `.${styles.domeInner}`;

      gsap.set(intro, {
        autoAlpha: 1,
        y: 0,
      });

      // Initial states for the cinematic intro.
      // Each line/ornament starts differently so the composition does not
      // feel like one generic fade-up animation.
      gsap.set(introCrown, { autoAlpha: 0, scaleX: 0.72 });
      gsap.set(introCrownLines, { scaleX: 0, transformOrigin: "center center" });
      gsap.set(introCrownBars, { scaleY: 0, transformOrigin: "center bottom" });
      gsap.set(introEyebrow, { autoAlpha: 0, y: 22 });
      gsap.set(introVashi, { autoAlpha: 0, y: 34, scale: 0.82 });
      gsap.set(introNextRow, { autoAlpha: 0 });
      gsap.set(introRules, { scaleX: 0, transformOrigin: "center center" });
      gsap.set(introNext, { autoAlpha: 0, y: -12, scale: 0.92 });
      gsap.set(introAddress, { autoAlpha: 0, x: 58 });
      gsap.set(introSubtitle, {
        autoAlpha: 0,
        y: 24,
        clipPath: "inset(0 0 100% 0)",
      });

      gsap.set(curvedText, {
        autoAlpha: 1,
      });

      gsap.set(domeInner, {
        autoAlpha: 0,
        y: 90,
      });

     const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=180%",
          scrub: 0.5,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true, 
          preventOverlaps: true,
        },
      });

      tl.fromTo(
        domeRef.current,
        {
          height: "0vh",
        },
        {
          height: "128vh",
          duration: 1.2,
          ease: "none",
        },
      );

      // -------------------------------------------------------------
      // CINEMATIC INTRO ENTRANCE
      // Runs after the dome has opened, then the existing intro exit
      // continues exactly as before. Because this is part of the same
      // ScrollTrigger timeline, it naturally runs again when the section
      // is encountered again through scrolling.
      // -------------------------------------------------------------
      tl.to(introCrown, {
        autoAlpha: 1,
        scaleX: 1,
        duration: 0.18,
        ease: "power2.out",
      });

      tl.to(
        introCrownLines,
        {
          scaleX: 1,
          duration: 0.3,
          stagger: 0.04,
          ease: "power3.out",
        },
        "<0.02",
      );

      tl.to(
        introCrownBars,
        {
          scaleY: 1,
          duration: 0.28,
          stagger: 0.025,
          ease: "back.out(1.8)",
        },
        "<0.02",
      );

      tl.to(
        introEyebrow,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.28,
          ease: "power3.out",
        },
        "<0.09",
      );

      tl.to(
        introVashi,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.48,
          ease: "back.out(1.35)",
        },
        "<0.10",
      );

      tl.to(
        introNextRow,
        {
          autoAlpha: 1,
          duration: 0.12,
          ease: "power1.out",
        },
        "<0.18",
      );

      tl.to(
        introRules,
        {
          scaleX: 1,
          duration: 0.34,
          stagger: 0.035,
          ease: "power3.inOut",
        },
        "<",
      );

      tl.to(
        introNext,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.3,
          ease: "power3.out",
        },
        "<0.05",
      );

      tl.to(
        introAddress,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.45,
          ease: "power4.out",
        },
        "<0.10",
      );

      tl.to(
        introSubtitle,
        {
          autoAlpha: 1,
          y: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.42,
          ease: "power3.out",
        },
        "<0.14",
      );

      // Give the completed title a short readable hold before it exits.
      tl.to({}, { duration: 0.34 });

      tl.to(intro, {
        autoAlpha: 0,
        y: -35,
        duration: 0.4,
        ease: "power2.inOut",
      });

      tl.to(
        curvedText,
        {
          autoAlpha: 0,
          duration: 0.15,
          ease: "power1.out",
        },
        "<",
      );

      tl.to({}, { duration: 0.16 });

      tl.to(domeInner, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const stage = stageRef.current;

    if (!stage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsStageVisible(entry.isIntersecting);
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(stage);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!autoPlayEnabled || !isStageVisible) return;

    const autoSlideTimer = window.setInterval(() => {
      setSlide((value) => (value + 1) % RECORDS.length);
    }, 3000);

    return () => {
      window.clearInterval(autoSlideTimer);
    };
  }, [autoPlayEnabled, isStageVisible]);

  const handleToggle = () => {
    const nextState = !night;
    setNight(nextState);
    setIsNight?.(nextState);
  };

  const stopAutoPlay = () => {
    setAutoPlayEnabled(false);
  };

  const goPrevious = () => {
    stopAutoPlay();

    setSlide((value) =>
      value === 0 ? RECORDS.length - 1 : value - 1,
    );
  };

  const goNext = () => {
    stopAutoPlay();

    setSlide((value) => (value + 1) % RECORDS.length);
  };

  return (
    <div className={styles.next} ref={rootRef}>
      <section className={styles.archStage} ref={stageRef}>
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

            <DayNightButton
              isNight={night}
              onToggle={handleToggle}
            />

            <span className={styles.taglineWord}>
              TO RETURN TO
            </span>
          </div>
        </div>

        <div className={styles.dome} ref={domeRef}>
          <div className={styles.domeOverlay} aria-hidden="true" />
          <svg
            className={styles.curvedText}
            viewBox="0 0 1200 340"
            aria-hidden="true"
          >
            <path
              id="archCurve"
              d="M 40 340 A 560 320 0 0 1 1160 340"
              fill="none"
            />

            <text textAnchor="middle">
              <textPath
                href="#archCurve"
                startOffset="50%"
              />
            </text>
          </svg>

          <div className={styles.domeIntro}>
            <div className={styles.introCrown} aria-hidden="true">
              <span className={styles.introCrownLine} />
              <span className={styles.introCrownMark}>
                <span />
                <span />
                <span />
                <span />
                <span />
              </span>
              <span className={styles.introCrownLine} />
            </div>

            <p className={styles.introEyebrow}>WHAT MAKES</p>

            <h1 className={styles.introTitle}>
              <span className={styles.introVashi}>VASHI</span>

              <span className={styles.introNextRow}>
                <span className={styles.introRule} aria-hidden="true" />
                <span className={styles.introNext}>THE NEXT</span>
                <span className={styles.introRule} aria-hidden="true" />
              </span>

              <span className={styles.introAddress}>BIG ADDRESS</span>
            </h1>

            <p className={styles.introSubtitle}>
              Not just a location. A city built ahead of its time
            </p>
          </div>

          <div className={styles.domeInner}>
            <div
              className={styles.recordCopy}
              key={`copy-${slide}`}
            >
              <h2 className={styles.bigTitle}>
                {activeRecord.title}
              </h2>

              <RecordSubtitle
                subtitle={activeRecord.subtitle}
                subtitleHighlight={
                  activeRecord.subtitleHighlight
                }
              />
            </div>

            <div className={styles.sliderFrame}>
              {RECORDS.map((item, index) => (
                <img
                  key={item.src}
                  src={item.src}
                  alt={item.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  width={1280}
                  height={720}
                  className={`${styles.slide} ${
                    index === slide
                      ? styles.slideActive
                      : ""
                  }`}
                />
              ))}
            </div>

            {/* <div
              className={styles.featureRow}
              key={`features-${slide}`}
            >
              {activeRecord.features.map((feature) => (
                <div
                  className={styles.featureItem}
                  key={`${feature.line1}-${feature.line2}`}
                >
                  <span className={styles.featureIcon}>
                    <FeatureIcon type={feature.icon} />
                  </span>

                  <p className={styles.featureText}>
                    <span>{feature.line1}</span>
                    <strong>{feature.line2}</strong>
                  </p>
                </div>
              ))}
            </div> */}

            <div className={styles.sliderNav}>
              <button
                type="button"
                aria-label="Previous record"
                onClick={goPrevious}
              >
                ‹
              </button>

              <span className={styles.slideNumber}>
                {String(slide + 1).padStart(2, "0")}
              </span>

              <span className={styles.sliderTrack}>
                <span
                  className={styles.sliderProgress}
                  style={{
                    width: `${
                      ((slide + 1) / RECORDS.length) * 100
                    }%`,
                  }}
                />
              </span>

              <span className={styles.slideNumber}>
                {String(RECORDS.length).padStart(2, "0")}
              </span>

              <button
                type="button"
                aria-label="Next record"
                onClick={goNext}
              >
                ›
              </button>
            </div>
          </div>
        </div>

        <h2 className="sr-only">
          Three reasons to choose Vashi
        </h2>
      </section>

      <Lit />
    </div>
  );
}