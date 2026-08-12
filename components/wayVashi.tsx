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
    subtitle:
      "The best addresses don’t chase growth. They become where growth happens.",
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
      "Established commercial districts, premium residential demand, retail, hospitality and a growing corporate ecosystem give Vashi something newer destinations are still building: *a functioning urban economy.",
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
      "Rail, road, metro expansion, major highways and proximity to the airport are turning Vashi into a *high-connectivity business address*, not just a residential node.",
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
  // {
  //   src: "/images/city.png",
  //   alt: "Vashi waterfront skyline at sunset",
  //   title: "THE GATEWAY CITY",
  //   subtitle:
  //     "Connected to Mumbai, Navi Mumbai, and beyond, Vashi sits at the intersection of business, mobility, and opportunity — making distance feel increasingly irrelevant.",
  //   features: [
  //     {
  //       icon: "connectivity",
  //       line1: "Vashi has the",
  //       line2: "connectivity.",
  //     },
  //     {
  //       icon: "ecosystem",
  //       line1: "Vashi has the",
  //       line2: "ecosystem.",
  //     },
  //     {
  //       icon: "momentum",
  //       line1: "Now, it has the",
  //       line2: "momentum.",
  //     },
  //   ],
  // },
  //  {
  //   src: "/images/vashicityDay.png",
  //   alt: "Vashi city during the day",
  //   title: "THE ECONOMIC SHIFT",
  //   subtitle:
  //     "As Mumbai’s growth moves outward, the next wave belongs to places that already have the infrastructure, connectivity, and commercial DNA to lead. *Vashi has been ahead of that curve.",
  //   features: [
  //     {
  //       icon: "connectivity",
  //       line1: "Move with",
  //       line2: "ease.",
  //     },
  //     {
  //       icon: "ecosystem",
  //       line1: "Live inside the",
  //       line2: "network.",
  //     },
  //     {
  //       icon: "momentum",
  //       line1: "Stay close to",
  //       line2: "opportunity.",
  //     },
  //   ],
  // },
];

const QUOTE_LINES = [
  "Instead of corridors, walking paths",
  "connect the apartments — making",
  "Era Residence feel closer to a group",
  "of private homes than a standard",
  "apartment building.",
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

interface WayVashiProps {
  isNight?: boolean;
  setIsNight?: Dispatch<SetStateAction<boolean>>;
}

export default function WayVashi({
  isNight: initialIsNight = true,
  setIsNight,
}: WayVashiProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const domeRef = useRef<HTMLDivElement>(null);

  const [slide, setSlide] = useState(0);
  const [night, setNight] = useState<boolean>(initialIsNight);

  const activeRecord = RECORDS[slide];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((value) => (value + 1) % RECORDS.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

 useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    const intro = `.${styles.domeIntro}`;
    const curvedText = `.${styles.curvedText}`;
    const domeInner = `.${styles.domeInner}`;

    gsap.set(intro, {
      autoAlpha: 1,
      y: 0,
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

        // More scroll distance because animation now has
        // clearly separated stages.
        end: "+=180%",

        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // -----------------------------------------
    // 1. DOME COMES UP
    // Intro remains completely visible
    // -----------------------------------------
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

    // -----------------------------------------
    // 2. HOLD INTRO FOR A LITTLE SCROLL
    // -----------------------------------------
    tl.to({}, { duration: 0.2 });

    // -----------------------------------------
    // 3. INTRO COMPLETELY GOES AWAY
    // -----------------------------------------
    tl.to(
      intro,
      {
        autoAlpha: 0,
        y: -35,
        duration: 0.4,
        ease: "power2.inOut",
      },
    );

    tl.to(
      curvedText,
      {
        autoAlpha: 0,
        duration: 0.15,
        ease: "power1.out",
      },
      "<",
    );

    // -----------------------------------------
    // 4. SMALL EMPTY MOMENT
    // Nothing overlaps here
    // -----------------------------------------
    tl.to({}, { duration: 0.16 });

    // -----------------------------------------
    // 5. NOW RECORD CONTENT COMES UP
    // Only after intro is 100% invisible
    // -----------------------------------------
    tl.to(domeInner, {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      ease: "power3.out",
    });

    // -----------------------------------------
    // QUOTE ANIMATION
    // -----------------------------------------
    gsap.to(`.${styles.quoteLine} span`, {
      translate: "0 0",
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: `.${styles.quote}`,
        start: "top 85%",
      },
    });
  }, rootRef);

  return () => ctx.revert();
}, []);

  const handleToggle = () => {
    const nextState = !night;
    setNight(nextState);
    setIsNight?.(nextState);
  };

  const goPrevious = () => {
    setSlide((value) =>
      value === 0 ? RECORDS.length - 1 : value - 1,
    );
  };

  const goNext = () => {
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
            <DayNightButton isNight={night} onToggle={handleToggle} />
            <span className={styles.taglineWord}>TO RETURN TO</span>
          </div>
        </div>

       <div className={styles.dome} ref={domeRef}>
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
      <textPath href="#archCurve" startOffset="50%">
        {/* Three reasons to choose Vashi */}
      </textPath>
    </text>
  </svg>

  {/* Intro header visible in the blank space before scrolling */}
  <div className={styles.domeIntro}>
    <h1 className={styles.introTitle}>WHAT MAKES VASHI THE NEXT BIG ADDRESS</h1>
    <p className={styles.introSubtitle}>
      Not just a location. A city built ahead of its time
    </p>
  </div>

          <div className={styles.domeInner}>
            <div className={styles.recordCopy} key={`copy-${slide}`}>
              <h2 className={styles.bigTitle}>{activeRecord.title}</h2>
              <p className={styles.recordSubtitle}>“{activeRecord.subtitle}”</p>
              <span className={styles.titleRule} />
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
                    index === slide ? styles.slideActive : ""
                  }`}
                />
              ))}
            </div>

            <div className={styles.featureRow} key={`features-${slide}`}>
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
            </div>

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
                    width: `${((slide + 1) / RECORDS.length) * 100}%`,
                  }}
                />
              </span>

              <span className={styles.slideNumber}>
                {String(RECORDS.length).padStart(2, "0")}
              </span>

              <button type="button" aria-label="Next record" onClick={goNext}>
                ›
              </button>
            </div>
          </div>
        </div>

        <h2 className="sr-only">Three reasons to choose Vashi</h2>
      </section>

      <Lit />

      {/* <section
        ref={quoteRef}
        className={styles.quoteSection}
        style={{ backgroundImage: "url('/images/city.png')" }}
      >
        <blockquote className={styles.quote}>
          <span className={styles.quoteMark}>“</span>
          {QUOTE_LINES.map((line) => (
            <span key={line} className={styles.quoteLine}>
              <span>{line}</span>
            </span>
          ))}
        </blockquote>
      </section> */}
    </div>
  );
}
