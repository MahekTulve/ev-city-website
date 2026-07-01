import Image from "next/image";
import styles from "./extraordinary.module.css";

interface ExtraordinaryProps {
  isEntering: boolean;
  isActive: boolean;
}

export default function ExtraordinarySection({ isEntering, isActive }: ExtraordinaryProps) {
  
  // Section Wrapper class
  const sectionClass = `${styles.extraordinarySection} ${
    isEntering ? styles.slideInActive : styles.slideOutBelow
  }`;

  // CHANGE HERE: text ab isEntering hote hi move hona shuru karega
  const leftContentClass = `${styles.leftContent} ${
    isEntering ? styles.textMoveToPosition : styles.textCentered
  }`;

  // CHANGE HERE: container bhi isEntering hote hi slide-up aur fade-in hoga
  const containerClass = `${styles.container} ${
    isEntering ? styles.containerReveal : styles.containerHidden
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
            <div className={styles.imageWrapper}>
              <img 
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop" 
                alt="Minimalist Architectural High-rise Tower" 
                className={styles.buildingImage}
              />
            </div>
          </div>
          
          {/* Right Content */}
          <div className={styles.rightContent}>
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