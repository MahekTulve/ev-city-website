import { useState } from "react";
import styles from "./ExplainDenmark.module.css";

const pillars = [
  {
    id: "01",
    category: "Design & Structure",
    title: "Architectural Marvel",
    subtitle: "A European-Inspired Blueprint",
    description:
      "Denmark is crafted with modern aesthetics and a European-inspired design language, offering an iconic silhouette that redefines the Vashi skyline with sculptural presence and timeless proportion.",
    highlights: ["Iconic Silhouette", "European Facade", "Vashi Landmark"],
  },
  {
    id: "02",
    category: "Location & Transit",
    title: "Unmatched Connectivity",
    subtitle: "The Effortless Commute Hub",
    description:
      "Positioned strategically at the confluence of Navi Mumbai's most vital arteries — bringing business hubs, premier schools, healthcare, and transit networks within a graceful reach of home.",
    highlights: ["Strategic Position", "Expressway Access", "Proximity to Hubs"],
  },
  {
    id: "03",
    category: "Luxury & Lifestyle",
    title: "World-Class Amenities",
    subtitle: "A Curated Sky Experience",
    description:
      "Designed for elevated living — sky lounges suspended above the city, private wellness sanctuaries, curated green terraces, and leisure zones composed with the discipline of a five-star hotel.",
    highlights: ["Sky Lounges", "Private Wellness", "Lush Greenery"],
  },
];

export default function ExplainDenmark() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className={styles.explainSection}>
      <div className={styles.ambientGlow} />

      <span className={`${styles.cornerOrnament} ${styles.cornerTL}`} aria-hidden />
      <span className={`${styles.cornerOrnament} ${styles.cornerTR}`} aria-hidden />
      <span className={`${styles.cornerOrnament} ${styles.cornerBL}`} aria-hidden />
      <span className={`${styles.cornerOrnament} ${styles.cornerBR}`} aria-hidden />

      <div className={styles.bgNumberOverlay} aria-hidden>
        {pillars[activeIndex].id}
      </div>

      <div className={styles.mainContainer}>
        <header className={styles.header}>
          <div className={styles.tagLine}>
            <span className={styles.diamond}>◆</span>
            The Three Pillars Of Excellence
            <span className={styles.diamond}>◆</span>
          </div>
          <h1 className={styles.mainHeading}>
            Explaining <span className={styles.goldText}>Denmark</span>
          </h1>
          <div className={styles.headerFlourish}>✦</div>
          <p className={styles.subHeading}>
            A residence conceived at the intersection of European craftsmanship and
            Navi Mumbai's rising skyline — every detail an heirloom in the making.
          </p>
        </header>

        <div className={styles.accordionGrid}>
          {pillars.map((item, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={item.id}
                className={`${styles.panel} ${isActive ? styles.panelActive : ""}`}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
              >
                <div className={styles.collapsedContent}>
                  <span className={styles.panelNumber}>{item.id}</span>
                  <span className={styles.collapsedDiamond}>◆</span>
                  <h3 className={styles.verticalTitle}>{item.title}</h3>
                </div>

                <div className={styles.expandedContent}>
                  <div className={styles.cardTop}>
                    <span className={styles.badge}>{item.category}</span>
                    <span className={styles.cardNum}>{item.id}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <div className={styles.cardDivider} />
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <h4 className={styles.cardSubtitle}>{item.subtitle}</h4>
                    <p className={styles.cardDesc}>{item.description}</p>

                    <div className={styles.highlightList}>
                      {item.highlights.map((point) => (
                        <span key={point} className={styles.highlightTag}>
                          {point}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className={styles.bottomLine} />
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.footerSignature}>Denmark · Vashi · Est. Excellence</div>
      </div>
    </section>
  );
}
