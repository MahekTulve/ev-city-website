import styles from "./ConceptSection.module.css";

/**
 * Drop-in section for a Next.js (or any React) project.
 * Requires: /public/videos/flower-1.webm and /public/videos/flower2.webm
 * (transparent-alpha VP9 WebM). Serif font: Playfair Display.
 */
export default function ConceptSection({
  hideChrome = false,
}: {
  hideChrome?: boolean;
}) {
  return (
    <section className={styles["section"]}>
      {/* <video
        className={`${styles["flower"]} ${styles["flowerTopLeft"]}`}
        src="/videos/flower-2.webm"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      /> */}
      {/* <video
        className={`${styles["flower"]} ${styles["flowerBottomRight"]}`}
        src=""
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      /> */}

      {!hideChrome && (
        <>
          <div className={styles["rail"]}>
            <span className={styles["railNumber"]}>26</span>
            <span className={styles["railLabel"]}>Scroll</span>
            <span className={styles["railLine"]} />
          </div>

          <div className={styles["nav"]}>
            <span className={styles["navPrimary"]}>
              Select
              <br />
              an Apartment
            </span>
            <div className={styles["navLinks"]}>
              <a href="#book">Book a call</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </>
      )}

      <div className={styles["content"]}>
        <p className={styles["eyebrow"]}>The Concept</p>
        <h2 className={styles["headline"]}>
          In today’s evolving era EV HOMES has made sure Vashi shows the
          timeless development, a city which defines the term “One Stop Shop”
        </h2>
        <p className={styles["body"]}>
          Inspired by the atmosphere of Marbella&apos;s golden era, the project
          combines contemporary architecture with warm materials, natural
          landscaping and carefully curated spaces.
        </p>

        <img
          className={styles.ornament}
          src="/images/logo.png"
          alt=""
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
