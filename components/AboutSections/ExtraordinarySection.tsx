import Image from "next/image";
import styles from "./extraordinary.module.css";

interface ExtraordinaryProps {
  isEntering: boolean;
  isActive: boolean;
  isFinal: boolean; // Received here
}

export default function ExtraordinarySection({ isEntering, isActive, isFinal }: ExtraordinaryProps) {
  
  const sectionClass = `${styles.extraordinarySection} ${
    isEntering ? styles.slideInActive : styles.slideOutBelow
  }`;

  // Agar isFinal true hai, to text disappear hone wali class lagao
  const leftContentClass = `${styles.leftContent} ${
    isFinal ? styles.textDisappear : (isEntering ? styles.textMoveToPosition : styles.textCentered)
  }`;

  // Agar isFinal true hai, to container ko scale-up aur center karne wali class lagao
  const containerClass = `${styles.container} ${
    isFinal ? styles.containerFinalStage : (isEntering ? styles.containerReveal : styles.containerHidden)
  }`;

  return (
    <section className={sectionClass}>
      <div className={styles.maincontainer}>
        
        {/* Left Content text wrapper */}
        <div className={leftContentClass}>
          <p className={styles.titleMain}>Extraordinary</p>
          <p className={styles.titleSub}>to us is</p>
        </div>

        {/* Bottom Container (Image + Right Content) */}
        <div className={containerClass}>
          {/* Center Image */}
          <div className={styles.centerContainer}>
            {/* Wrapper ko scale karne ke liye dynamic class */}
            <div className={`${styles.imageWrapper} ${isFinal ? styles.imageLarge : ''}`}>
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop" 
                alt="Minimalist Architectural High-rise Tower" 
                className={styles.buildingImage}
              />
            </div>
          </div>
          
          {/* Right Content */}
          <div className={`${styles.rightContent} ${isFinal ? styles.rightContentLarge : ''}`}>
            <h4 className={styles.headingRight}>Pioneering<br />the future</h4>
            <div className={styles.divider} />
            <p className={styles.description}>
              Designing for ever-evolving lifestyles, creating amenities, 
              and features that enhance modern living, crafting for lasting relevance.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}