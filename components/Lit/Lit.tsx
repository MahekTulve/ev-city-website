"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import styles from "./Lit.module.css";

const s = styles as Record<string, string>;

function LargestIcon() {
  return (
    <svg
      className={s.cardIcon}
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 62H64"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M14 62V34H27V62"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      <path
        d="M29 62V15H46V62"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      <path
        d="M48 62V27H59V62"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      <path
        d="M35 15V9M32 9H38"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path d="M18 40H23" stroke="currentColor" strokeWidth="1.2" />
      <path d="M18 47H23" stroke="currentColor" strokeWidth="1.2" />
      <path d="M18 54H23" stroke="currentColor" strokeWidth="1.2" />

      <path d="M34 23H41" stroke="currentColor" strokeWidth="1.2" />
      <path d="M34 31H41" stroke="currentColor" strokeWidth="1.2" />
      <path d="M34 39H41" stroke="currentColor" strokeWidth="1.2" />
      <path d="M34 47H41" stroke="currentColor" strokeWidth="1.2" />
      <path d="M34 55H41" stroke="currentColor" strokeWidth="1.2" />

      <path d="M52 35H56" stroke="currentColor" strokeWidth="1.2" />
      <path d="M52 43H56" stroke="currentColor" strokeWidth="1.2" />
      <path d="M52 51H56" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function IntegratedIcon() {
  return (
    <svg
      className={s.cardIcon}
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="36" cy="36" r="8" stroke="currentColor" strokeWidth="1.4" />

      <circle cx="36" cy="11" r="4" stroke="currentColor" strokeWidth="1.4" />

      <circle cx="60" cy="27" r="4" stroke="currentColor" strokeWidth="1.4" />

      <circle cx="54" cy="57" r="4" stroke="currentColor" strokeWidth="1.4" />

      <circle cx="18" cy="57" r="4" stroke="currentColor" strokeWidth="1.4" />

      <circle cx="12" cy="27" r="4" stroke="currentColor" strokeWidth="1.4" />

      <path
        d="M36 15V28"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M56 29L43 33"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M51 54L41 42"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M21 54L31 42"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <path
        d="M16 29L29 33"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />

      <circle cx="36" cy="36" r="2.4" fill="currentColor" />

      <path
        d="M21 17C29 11 43 10 51 17"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="2 4"
        opacity=".55"
      />
    </svg>
  );
}

function TownshipIcon() {
  return (
    <svg
      className={s.cardIcon}
      viewBox="0 0 72 72"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M9 18L25 12L45 18L63 11V55L46 62L26 56L9 62V18Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      <path
        d="M25 12L26 56M45 18L46 62"
        stroke="currentColor"
        strokeWidth="1.2"
        opacity=".65"
      />

      <path
        d="M36 24C30.7 24 27 27.8 27 32.6C27 39.3 36 48 36 48C36 48 45 39.3 45 32.6C45 27.8 41.3 24 36 24Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />

      <circle
        cx="36"
        cy="32.5"
        r="3.3"
        stroke="currentColor"
        strokeWidth="1.3"
      />

      <path
        d="M13 24L21 21M51 22L59 19M13 51L21 48M51 51L59 48"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        opacity=".6"
      />
    </svg>
  );
}

const cards = [
  {
    letter: "L",
    title: "Largest",
    copy: "A township of unparalleled scale.",
    Icon: LargestIcon,
  },
  {
    letter: "I",
    title: "Integrated",
    copy: "Everything you need, seamlessly connected.",
    Icon: IntegratedIcon,
  },
  {
    letter: "T",
    title: "Township",
    copy: "Planned for today, designed for tomorrow.",
    Icon: TownshipIcon,
  },
];

const LETTER_PATHS: Record<"L" | "I" | "T", string> = {
  L: "M34 24V184H154V154H68V24Z",
  I: "M28 24H152V52H106V156H152V184H28V156H74V52H28Z",
  T: "M20 24H160V54H106V184H74V54H20Z",
};

function DrawLetter({
  letter,
  delay,
}: {
  letter: "L" | "I" | "T";
  delay: number;
}) {
  return (
    <svg
      className={`${s.drawLetter} ${s.heroDrawLetter}`}
      data-letter={letter}
      viewBox="0 0 180 210"
      fill="none"
      aria-hidden="true"
      style={
        {
          "--draw-delay": `${delay}ms`,
        } as CSSProperties
      }
    >
      <path
        className={s.drawLetterPath}
        pathLength="1"
        d={LETTER_PATHS[letter]}
      />

      <path
        className={s.shineLetterPath}
        pathLength="1"
        d={LETTER_PATHS[letter]}
      />
    </svg>
  );
}

function DrawDot({ delay }: { delay: number }) {
  return (
    <span className={s.litDotWrap} aria-hidden="true">
      <svg
        className={s.drawDot}
        viewBox="0 0 20 20"
        fill="none"
        style={
          {
            "--draw-delay": `${delay}ms`,
          } as CSSProperties
        }
      >
        <circle
          className={s.drawDotPath}
          pathLength="1"
          cx="10"
          cy="10"
          r="6.75"
        />
      </svg>
    </span>
  );
}

export default function Lit() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(false);

          requestAnimationFrame(() => {
            setAnimate(true);
          });
        } else {
          setAnimate(false);
        }
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${s.wrapper} ${animate ? s.animate : ""}`}
    >
      {/* Background-only overlays.
          They sit above a3-cut.jpeg but below every LIT text/card layer. */}
      <div className={s.backgroundOverlay} aria-hidden="true" />
      <div className={s.bottomOverlay} aria-hidden="true" />

      <div className={s.hero}>
        <div className={s.bg} aria-hidden="true" />

        <div className={s.content}>
          <p className={s.eyebrow} aria-label="VASHI IS">
            <span className={s.eyebrowVashi} aria-hidden="true">
              {"VASHI".split("").map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className={s.eyebrowLetter}
                  style={
                    {
                      "--eyebrow-letter-delay": `${index * 95}ms`,
                    } as CSSProperties
                  }
                >
                  {char}
                </span>
              ))}
            </span>

            <span className={s.eyebrowIs} aria-hidden="true">
              {"IS".split("").map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className={s.eyebrowLetter}
                  style={
                    {
                      "--eyebrow-letter-delay": `${560 + index * 110}ms`,
                    } as CSSProperties
                  }
                >
                  {char}
                </span>
              ))}
            </span>
          </p>

          <h1
            className={s.lit}
            aria-label="L.I.T — Largest Integrated Township"
          >
          <span className={s.litGroup}>
  <span
    className={s.heroLetterRow}
    style={{ "--zoom-delay": "100ms" } as CSSProperties}
  >
    <DrawLetter letter="L" delay={100} />
    <DrawDot delay={1420} />
  </span>

  <span
    className={s.heroWord}
    style={{ "--word-delay": "450ms" } as CSSProperties}
  >
    LARGEST
  </span>
</span>

<span className={s.litGroup}>
  <span
    className={s.heroLetterRow}
    style={{ "--zoom-delay": "2000ms" } as CSSProperties}
  >
    <DrawLetter letter="I" delay={2000} />
    <DrawDot delay={3320} />
  </span>

  <span
    className={s.heroWord}
    style={{ "--word-delay": "2350ms" } as CSSProperties}
  >
    INTEGRATED
  </span>
</span>

<span className={s.litGroup}>
  <span
    className={s.heroLetterRow}
    style={{ "--zoom-delay": "3900ms" } as CSSProperties}
  >
    <DrawLetter letter="T" delay={3900} />
  </span>

  <span
    className={s.heroWord}
    style={{ "--word-delay": "4250ms" } as CSSProperties}
  >
    TOWNSHIP
  </span>
</span>
          </h1>
        </div>
      </div>

      <div className={s.cards}>
        {cards.map(({ letter, title, copy, Icon }, index) => {
          const cardRevealDelays = [450, 2350, 4250];

          return (
            <article
              key={letter}
              className={s.card}
              style={
                {
                  "--card-delay": `${cardRevealDelays[index]}ms`,
                } as CSSProperties
              }
            >
              <div className={s.iconHolder}>
                <Icon />
              </div>

              <div className={s.cardBody}>
                <h3>{title}</h3>

                <p>{copy}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className={s.bottomSpace} />
    </section>
  );
}