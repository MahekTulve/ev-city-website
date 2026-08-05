import { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./LandingPage.module.css";
import WayVashi from "./wayVashi";

gsap.registerPlugin(ScrollTrigger);

const HOTSPOTS = [
  {
    id: "sanctuary",
    x: "27%",
    y: "26%",
    title: "Your private sanctuary",
    body: "Instead of corridors, walking paths connect the apartments — making Era Residence feel closer to a group of private homes than a standard apartment building.",
  },
  {
    id: "gardens",
    x: "57%",
    y: "34%",
    title: "Gardens that breathe",
    body: "Bougainvillea, cypress and olive shape every terrace, so each home opens onto planting rather than a neighbour's window.",
  },
  {
    id: "service",
    x: "76%",
    y: "55%",
    title: "Service, quietly",
    body: "Poolside attendance, concierge and housekeeping run in the background — present when you want it, invisible when you don't.",
  },
] as const;

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



export default function LandingPage() {
  const [night, setNight] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [tone, setTone] = useState<"light" | "dark">("light");

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

      // 1. Text reveal
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

      // 2. Lockup fades, arch expands revealing the hero inside
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

  const panel = HOTSPOTS.find((spot) => spot.id === active);

  const renderMainSections = () => (
    <div className={styles.heroSceneWrapper} style={{
      backgroundImage: night
        ? "url('/images/vashiCitybbbb.jpg')"
        : "url('/images/vashicityDayOne.png')"
    }}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1>
            <span className={styles.heroEra}>THE</span>
            <span className={styles.heroResidence}>5 Minute</span>
            <span className={styles.heroScript}>City Vashi</span>
          </h1>
        </div>

        <div className={styles.heroTagline}>
          <span className={styles.taglineWord}>A place</span>
          <button
            type="button"
            className={styles.toggle}
            onClick={() => setNight((value) => !value)}
            aria-pressed={night}
          >
            <span className={night ? styles.toggleOff : styles.toggleOn}>By day</span>
            <span className={styles.toggleTrack}>
              <span className={styles.toggleKnob} style={{ left: night ? "100%" : "0%" }} />
            </span>
            <span className={night ? styles.toggleOn : styles.toggleOff}>By night</span>
          </button>
          <span className={styles.taglineWord}>To return to</span>
        </div>
      </header>
    </div>
  );

  return (
    <div
      className={styles.root}
      style={{ ["--scene-img" as string]: "url('/images/landingImg.webp')" }}
    >

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

      {/* ---------------- Section 2: Scene with hotspots ---------------- */}
      {/* <section
        className={styles.scene}
        id="apartments"
        style={{ backgroundImage: "url('/images/landingImg.webp')" }}
      >
        {HOTSPOTS.map((spot) => (
          <button
            key={spot.id}
            type="button"
            className={`${styles.hotspot} ${active === spot.id ? styles.hotspotActive : ""}`}
            style={{ left: spot.x, top: spot.y }}
            onClick={() => setActive(active === spot.id ? null : spot.id)}
            aria-label={spot.title}
          >
            <span className={styles.hotspotPulse} />
          </button>
        ))}

        <button type="button" className={styles.sceneCta}>
          <span>View available apartments</span>
        </button>

        <aside className={`${styles.panel} ${panel ? styles.panelOpen : ""}`}>
          <button
            type="button"
            className={styles.panelClose}
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <h2 className={styles.panelTitle}>{panel?.title}</h2>
          <p className={styles.panelBody}>{panel?.body}</p>
        </aside>
      </section> */}

      {/* ---------------- Sections 3+: the new scroll story ---------------- */}
      {/* <WayVashi onTone={setTone} /> */}
    </div>
  );
}