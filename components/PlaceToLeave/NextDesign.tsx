"use client";

import styles from "./NextDesign.module.css";

const pillars = [
  {
    title: "People First",
    text: "Designed for people, not just for traffic.",
    icon: (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="4.6" r="2.1" />
        <path d="M12 6.8v6.4M12 13.2 8.6 21M12 13.2 15.4 21M7.5 9h9" />
      </svg>
    ),
  },
  {
    title: "Liveable by Design",
    text: "Walkable. Cyclable. Human scale.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="5.5" cy="16.5" r="3.6" />
        <circle cx="18.5" cy="16.5" r="3.6" />
        <path d="M5.5 16.5 10 8h5l3.5 8.5M9 8h4M14 8l2.5 4" />
      </svg>
    ),
  },
  {
    title: "Connected City",
    text: "Seamless public transit that brings the city closer.",
    icon: (
      <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <circle cx="12" cy="12" r="2.2" />
        <circle cx="4.4" cy="7.4" r="1.8" />
        <circle cx="19.6" cy="7.4" r="1.8" />
        <circle cx="4.4" cy="16.6" r="1.8" />
        <circle cx="19.6" cy="16.6" r="1.8" />
        <path d="m6 8.4 4 2.4M18 8.4l-4 2.4M6 15.6l4-2.4M18 15.6l-4-2.4" />
      </svg>
    ),
  },
  {
    title: "Sustainable Future",
    text: "Green thinking for a better tomorrow.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 2.5c3 3.2 4.6 5.8 4.6 8.4A4.6 4.6 0 0 1 12 15.5a4.6 4.6 0 0 1-4.6-4.6c0-2.6 1.6-5.2 4.6-8.4Z" />
        <path d="M12 15.5v6" />
      </svg>
    ),
  },
  {
    title: "Quality of Life",
    text: "More time living, less time commuting.",
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M12 20.5S3.5 15.2 3.5 9.4A4.6 4.6 0 0 1 12 6.9a4.6 4.6 0 0 1 8.5 2.5c0 5.8-8.5 11.1-8.5 11.1Z" />
      </svg>
    ),
  },
];

export default function NextDesign() {
  return (
    <div className={styles["page"]}>
      <section className={styles["hero"]}>

        <div className={styles["left"]}>
          <div className={styles["brand"]}>
            <svg className={styles["crown"]} viewBox="0 0 40 34" fill="none" stroke="currentColor" strokeWidth="1.3">
              <path d="M2 12l7 6 5-13 6 13 6-13 5 13 7-6-4 20H6L2 12Z" />
              <path d="M20 2v3" />
            </svg>
            <span className={styles["brandName"]}>Denmark</span>
          </div>

          <div className={styles["heroBody"]}>
            <h1 className={styles["title"]}>
              Denmark&rsquo;s
              <span>Inspiration</span>
            </h1>
            <div className={styles["rule"]} />
            <p className={styles["lede"]}>
              Denmark, and especially Copenhagen, has redefined how a city can work{" "}
              <em className={styles["italicGold"]}>for people.</em>
            </p>

            <div className={styles["quoteBlock"]}>
              <span className={styles["bigQuote"]}>&ldquo;</span>
              <div className={styles["quoteText"]}>
                <p>
                  The best cities
                  <br /> aren&rsquo;t built for cars.
                  <br /> They&rsquo;re built for people.
                </p>
                <div className={styles["attribution"]}>&mdash; The Copenhagen Way</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles["right"]} id="inspiration">
          <img
            className={styles["heroImg"]}
            src={"images/startDenmark.jpg"}
            alt="Sunrise over the Nyhavn canal in Copenhagen with cyclists riding along the quay"
            width={1600}
            height={1104}
          />
          <div className={styles["fade"]} />
          <div className={styles["overlayText"]}>
            <div className={styles["overlayKicker"]}>The inspiration isn&rsquo;t just</div>
            <h2 className={styles["overlayHeadline"]}>in its beauty.</h2>
            <p className={styles["overlaySub"]}>
              It&rsquo;s in its <span className={styles["italicGold"]}>beliefs in action.</span>
            </p>
          </div>
        </div>
      </section>

      <section className={styles["why"]} id="why">
        <div className={styles["blush"]} />
        <div className={styles["sectionIndex"]}>
          <span>02</span>
          <i />
          <span>Why Copenhagen?</span>
        </div>

        {/* <h2 className={styles["whyHeading"]}>
          A city that proves progress is possible when{" "}
          <em className={styles["italicGold"]}>design</em>, <em className={styles["italicGold"]}>values</em>, and{" "}
          <em className={styles["italicGold"]}>vision</em> come together.
        </h2> */}

        <div className={styles["pillars"]}>
          {pillars.map((p) => (
            <div className={styles["pillar"]} key={p.title}>
              <div className={styles["iconWrap"]}>{p.icon}</div>
              <h3 className={styles["pillarTitle"]}>{p.title}</h3>
              <p className={styles["pillarText"]}>{p.text}</p>
            </div>
          ))}
        </div>
        <div className={styles["closingQuote"]} id="impact">
          <span className={styles["bigQuote"]}>&ldquo;</span>
          <p>
            A city isn&rsquo;t just its buildings, it&rsquo;s its{" "}
            <em className={styles["italicGold"]}>beliefs in action.</em>
          </p>
          <span className={styles["bigQuote"]}>&rdquo;</span>
        </div>

      </section>
    </div>
  );
}