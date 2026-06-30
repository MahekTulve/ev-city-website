import styles from "./slider.module.css";

interface Slide {
  image: string;
  line2: string;
  line3: string;
}

interface SliderSectionProps {
  slides: Slide[];
  index: number;
  isInitial: boolean;
  isLastExiting: boolean;
  isLastEntering: boolean;
  direction: string;
}

export default function SliderSection({
  slides,
  index,
  isInitial,
  isLastExiting,
  isLastEntering,
  direction,
}: SliderSectionProps) {
  return (
    <section className={styles.slider}>
      {slides.map((s, i) => {
        let slideClass = styles.slide;

        if (i === index) {
          if (isInitial) {
            slideClass += ` ${styles.initialActive}`;
          } else if (isLastExiting && i === slides.length - 1) {
            slideClass += ` ${styles.lastExit}`;
          } else if (isLastEntering && i === slides.length - 1) {
            slideClass += ` ${styles.lastEnterReverse}`;
          } else {
            if (direction === "up" && i === slides.length - 1 && !isLastEntering) {
              slideClass += ` ${styles.initialActive}`;
            } else {
              slideClass += direction === "down" ? ` ${styles.active}` : ` ${styles.activeReverse}`;
            }
          }
        } else if (i < index) {
          slideClass += ` ${styles.prev}`;
        } else {
          slideClass += direction === "up" ? ` ${styles.next} ${styles.nextReverse}` : ` ${styles.next}`;
        }

        return (
          <div key={i} className={slideClass}>
            <div
              className={styles.slideImage}
              style={{ backgroundImage: `url(${s.image})` }}
            />
          </div>
        );
      })}

      {/* Headlines Container */}
      <div
        key={`headline-${index}-${isLastExiting}-${isLastEntering}-${isInitial}`}
        className={`
            ${styles.headline} 
            ${isInitial ? styles.headlineInitial : styles.headlineActive}
            ${isLastExiting ? styles.headlineLastExit : ''}
            ${isLastEntering ? styles.headlineLastEnterReverse : ''}
          `}
      >
        <div className={styles.line1}>Known for</div>
        <div className={styles.line2}>{slides[index].line2}</div>
        <div className={styles.line3}>{slides[index].line3}</div>
      </div>

      {/* HUD Overlay Elements */}
      <div className={styles.header}>
        <div className={styles.logoMain}><b>5Minutes</b>City</div>
        <div className={styles.logoSub}>BY EV Homes</div>
      </div>

      <div className={styles.diamond} />

      {/* Indicators */}
      <div
        key={`indicators-${index}-${isLastExiting}-${isLastEntering}`}
        className={`
          ${styles.indicators} 
          ${isLastExiting ? styles.indicatorsLastExit : ''}
          ${isLastEntering ? styles.indicatorsLastEnterReverse : ''}
        `}
      >
        <span>{String(index + 1).padStart(2, "0")}</span>
        <div className={styles.bar}>
          <div key={index} className={styles.barFill} />
        </div>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}