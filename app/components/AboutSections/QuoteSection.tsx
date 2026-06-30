import styles from "./quote.module.css";

interface QuoteSectionProps {
  isLastExiting: boolean;
  isLastEntering: boolean;
  isQuoteActive: boolean;
}

export default function QuoteSection({
  isLastExiting,
  isLastEntering,
  isQuoteActive,
}: QuoteSectionProps) {
  return (
    <section
      className={`${styles.quoteSection} ${
        isLastExiting
          ? styles.sectionEnterActive
          : isLastEntering
          ? styles.sectionExitReverse
          : isQuoteActive
          ? styles.sectionStaticActive
          : ""
      }`}
    >
      <div className={styles.quoteLeft}>
        <h2 className={styles.author}>EV Thomas</h2>
        <div className={styles.divider} />
        <div className={styles.role}>Managing Director</div>
      </div>
      <div className={styles.quoteRight}>
        <span className={styles.quoteMark}>“</span>
        We transform locations into extraordinary destinations by placing people at the heart of our design philosophy.
      </div>
    </section>
  );
}