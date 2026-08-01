import { useState, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import classes from "./LandingPage.module.css";

gsap.registerPlugin(ScrollTrigger);

const styles = classes as Record<string, string>;
const cx = (...names: Array<string | false | undefined>) =>
  names.filter((name): name is string => Boolean(name)).map((name) => styles[name] ?? "").join(" ");

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

  const introRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
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

      // 2. Lockup text fade out & Arch expansion showing BOTH SECTIONS inside
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
          "-=0.4"
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

  // DONO SECTIONS (Hero + Scene) ek hi wrapper me hain:
  const renderMainSections = () => (
    <div className={cx("heroSceneWrapper")}>
      {/* Section 2: Hero */}
      <header className={cx("hero")}>
        <div className={cx("heroInner")}>
          <h1>
            <span className={cx("heroEra")}>THE</span>
            <span className={cx("heroResidence")}>5 Minute</span>
            <span className={cx("heroScript")}>City Vashi</span>
          </h1>
        </div>

        <div className={cx("heroTagline")}>
          <span className={cx("taglineWord")}>A place</span>
          <button
            type="button"
            className={cx("toggle")}
            onClick={() => setNight((value) => !value)}
            aria-pressed={night}
          >
            <span className={night ? cx("toggleOff") : cx("toggleOn")}>By day</span>
            <span className={cx("toggleTrack")}>
              <span className={cx("toggleKnob")} style={{ left: night ? "100%" : "0%" }} />
            </span>
            <span className={night ? cx("toggleOn") : cx("toggleOff")}>By night</span>
          </button>
          <span className={cx("taglineWord")}>To return to</span>
        </div>
      </header>

      {/* Section 3: Scene */}

    </div>
  );

  return (
    <div className={cx("root")}>
      {/* ---------------- Section 1: Intro Section ---------------- */}
      <section className={cx("introSection")} ref={introRef}>
        <span className={cx("preloaderFrame")} />
        <span className={cx("watermark")}>Vashi</span>
        <Glyph className={cx("preloaderGlyph")} />

        <div className={cx("preloaderRow")}>
          <span className={`${cx("side")} ${cx("sideLeft")}`}>Costa</span>
          <span className={cx("lockup")}>
            <span className={cx("lockupEra")}>THe</span>
            <span className={cx("lockupResidence")}>5 Minute City</span>
            <span className={cx("lockupScript")}>Time,Redefined </span>
          </span>
          <span className={`${cx("side")} ${cx("sideRight")}`}>Del Sol</span>
        </div>

        <span className={cx("preloaderRule")} />
        <p className={cx("preloaderFoot")}>
          ev homes
          <br />
          A place to return to.
        </p>

        {/* Arch Mask Container - Containing BOTH SECTIONS inside */}
        <div className={cx("arch")} ref={archRef}>
          <div className={cx("archInnerWrapper")}>
            {renderMainSections()}
          </div>
        </div>
      </section>

      {/* ---------------- Shared Chrome ---------------- */}
      <div className={cx("badge")}>
        <svg className={cx("badgeRing")} viewBox="0 0 120 120" aria-hidden="true">
          <defs>
            <path id="badgeCircle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <text>
            <textPath href="#badgeCircle" startOffset="0%">
             EV CITY · THE 5 MINUTE CITY . EV CITY · THE 5 MINUTE CITY .
            </textPath>
          </text>
        </svg>
        <Glyph className={cx("badgeGlyph")} />
      </div>


      <div className={cx("rail")} aria-hidden="true">
        <span className={cx("railCount")}>00</span>
        <span className={cx("railLine")} />
        <span className={cx("railLabel")}>Scroll</span>
        <span className={cx("railArrow")} />
      </div>

      {/* ---------------- Actual Main Content (Post Animation) ---------------- */}
      <section className={cx("scene")} id="apartments">
        {HOTSPOTS.map((spot) => (
          <button
            key={spot.id}
            type="button"
            className={`${cx("hotspot")} ${active === spot.id ? cx("hotspotActive") : ""}`}
            style={{ left: spot.x, top: spot.y }}
            onClick={() => setActive(active === spot.id ? null : spot.id)}
            aria-label={spot.title}
          >
            <span className={cx("hotspotPulse")} />
          </button>
        ))}

        <button type="button" className={cx("sceneCta")}>
          <span>View available opportunity</span>
        </button>

        <aside className={`${cx("panel")} ${panel ? cx("panelOpen") : ""}`}>
          <button
            type="button"
            className={cx("panelClose")}
            onClick={() => setActive(null)}
            aria-label="Close"
          >
            ✕
          </button>
          <h2 className={cx("panelTitle")}>{panel?.title}</h2>
          <p className={cx("panelBody")}>{panel?.body}</p>
        </aside>
      </section>
    </div>
  );
}