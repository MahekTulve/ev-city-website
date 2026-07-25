"use client";

import Link from "next/link";
// import logo from "/images/logo.png";

import styles from "./StackFeatureSection.module.css";

type IconCfg = {
  img: string;
  scale?: number;
};

const iconConfigs: IconCfg[] = [
  { img: "/images/9square.png", scale: 0.9 },
  { img: "/images/9vtc.png", scale: 2.2 },
  { img: "/images/10hq.png", scale: 1.4 },

  { img: "/images/10marina.webp", scale: 0.9 },
  { img: "/images/23malibu.png", scale: 1.7 },
  { img: "/images/23miami.png", scale: 1.3 },

  { img: "/images/capitol9.png", scale: 1.9 },
  { img: "/images/v10.png", scale: 1.2 },
  { img: "/images/solatire.png", scale: 1.3 },
];

export default function StackFeatureSection() {
  const orbitCount = 3;
  const orbitGap = 8; // rem between orbits
  const iconsPerOrbit = Math.ceil(iconConfigs.length / orbitCount);

  return (
    <section className={styles.section}>
      {/* Left: Heading + copy */}
      <div className={styles.left}>
        <h2 className={styles.title}>EV CITY</h2>
        <p className={styles.subtitle}>
          EV HOMES PRESENTS THE FUTURE OF CONNECTED LIVING WHERE EVERYTHING YOU
          NEED IS JUST FIVE MINUTES AWAY.
        </p>
        <div className={styles.actions}>
          <Link
            href="/get-started"
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            Get Started
          </Link>
          <Link
            href="/learn-more"
            className={`${styles.btn} ${styles.btnOutline}`}
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* Right: Orbit animation */}
      <div className={styles.right}>
        <div className={styles.orbitViewport}>
          <div className={styles.orbitStage}>
            {/* Center circle */}
            <div className={styles.center}>
              <img
                src="/images/logo.png"
                alt="EV Homes"
                draggable={false}
                style={{
                  width: "70%",
                  height: "70%",
                  objectFit: "contain",
                }}
              />
            </div>

            {[...Array(orbitCount)].map((_, orbitIdx) => {
              const size = `${12 + orbitGap * (orbitIdx + 1)}rem`;
              const angleStep = (2 * Math.PI) / iconsPerOrbit;
              const duration = 30 + orbitIdx * 15;
              const reverse = orbitIdx % 2 === 1;

              return (
                <div
                  key={orbitIdx}
                  className={styles.orbit}
                  style={{
                    width: size,
                    height: size,
                    animation: `${styles.spin} ${duration}s linear infinite ${reverse ? "reverse" : ""}`,
                  }}
                >
                  {iconConfigs
                    .slice(
                      orbitIdx * iconsPerOrbit,
                      orbitIdx * iconsPerOrbit + iconsPerOrbit,
                    )
                    .map((cfg, iconIdx) => {
                      const angle = iconIdx * angleStep;
                      const round = (n: number) => Number(n.toFixed(4));

                      const x = round(50 + 50 * Math.cos(angle));
                      const y = round(50 + 50 * Math.sin(angle));

                      return (
                        <div
                          key={iconIdx}
                          className={styles.iconWrap}
                          style={{
                            left: `${x}%`,
                            top: `${y}%`,
                            animation: `${styles.spin} ${duration}s linear infinite ${
                              reverse ? "" : "reverse"
                            }`,
                          }}
                        >
                          <img
                            src={cfg.img}
                            alt=""
                            draggable={false}
                            className={styles.orbitLogo}
                            style={
                              {
                                "--logo-scale": cfg.scale ?? 1,
                              } as React.CSSProperties
                            }
                          />
                        </div>
                      );
                    })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
