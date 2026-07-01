// app/components/AboutSections/QuoteSection.tsx
import { ForwardedRef, forwardRef } from "react";
import styles from "./quote.module.css";

interface QuoteSectionProps {
  isLastExiting: boolean;
  isLastEntering: boolean;
  isQuoteActive: boolean;
}

const QuoteSection = forwardRef(function QuoteSection(
  { isLastExiting, isLastEntering, isQuoteActive }: QuoteSectionProps,
  ref: ForwardedRef<HTMLDivElement>
) {
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
      
      {/* paragraph me inner content check karne ke liye ref bound kiya */}
      <div className={styles.quoteRight} ref={ref}>
        We transform locations into extraordinary destinations by placing people at the heart of our design philosophy. 
        Our spaces inspire collaboration, foster sustainable growth, and create communities where generations thrive. 
       
      </div>
    </section>
  );
});

export default QuoteSection;