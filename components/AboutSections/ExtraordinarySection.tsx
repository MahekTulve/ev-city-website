import Image from "next/image";
import styles from "./extraordinary.module.css";

interface ExtraordinaryProps {
  isEntering: boolean;
  isActive: boolean;
  isFinal: boolean;
  isStepThree: boolean;
  isStepFour: boolean; // Received here
  isStepFive: boolean; // Received here
  isStepSix: boolean;  // Received here
  isVideoActive: boolean;
}

export default function ExtraordinarySection({ isEntering, isActive, isFinal, isStepThree, isStepFour, isVideoActive,isStepFive,isStepSix, }: ExtraordinaryProps) {

  const sectionClass = `${styles.extraordinarySection} ${isEntering ? styles.slideInActive : styles.slideOutBelow
    } `;

  const leftContentClass = `${styles.leftContent} ${isFinal ? styles.textDisappear : (isEntering ? styles.textMoveToPosition : styles.textCentered)
    }`;

  const containerClass = `${styles.container} ${isStepThree ? styles.containerExitUp : (isFinal ? styles.containerFinalStage : (isEntering ? styles.containerReveal : styles.containerHidden))
    }`;

  // STEP 3 CONTAINER: Agar step 4 active ho jaye, to ise upar slide karke exit kar do
  const stepThreeClass = `${styles.stepThreeContainer} ${isStepFour ? styles.stepThreeExitUp : (isStepThree ? styles.stepThreeReveal : styles.stepThreeHidden)
    }`;

  // STEP 4 CONTAINER: Shuruat me hidden rahega, trigger hone par center me slide hoga
  const stepFourClass = `${styles.stepFourContainer} ${isStepFive ? styles.stepFourExitUp : (isStepFour ? styles.stepFourReveal : styles.stepFourHidden)}`;
const stepFiveClass = `${styles.stepFiveContainer} ${isStepSix ? styles.stepFiveExitUp : (isStepFive ? styles.stepFiveReveal : styles.stepFiveHidden)}`;
const stepSixClass = `${styles.stepSixContainer} ${isStepSix ? styles.stepSixReveal : styles.stepSixHidden} ${isVideoActive ? styles.section3ShiftLeft : ''}`;
  return (
    <section className={sectionClass}>
      <div className={styles.maincontainer}>

        {/* --- STEP 1 & 2 CONTENT --- */}
        <div className={leftContentClass}>
          <p className={styles.titleMain}>5 Minutes City</p>
          <p className={styles.titleSub}>VASHI</p>
        </div>

        <div className={containerClass}>
          <div className={styles.centerContainer}>
            <div className={`${styles.imageWrapper} ${isFinal ? styles.imageLarge : ''}`}>
              <img
                src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop"
                alt="Minimalist Architectural High-rise Tower"
                className={styles.buildingImage}
              />
            </div>
          </div>
          <div className={`${styles.rightContent} ${isFinal ? styles.rightContentLarge : ''}`}>
            <h4 className={styles.headingRight}>V</h4>
            <div className={styles.divider} />
            <p className={styles.description}>
              Designing for ever-evolving lifestyles, creating amenities,
              and features that enhance modern living, crafting for lasting relevance.
            </p>
          </div>
        </div>

        {/* --- STEP 3 CONTENT (TEXT LEFT, IMAGE RIGHT) --- */}
        <div className={stepThreeClass}>
          <div className={`${styles.step3LeftContent} ${isStepThree ? styles.step3TextScaleUp : styles.step3TextScaleDown}`}>
            <h4 className={styles.step3Heading}>A</h4>
            <div className={styles.step3Divider} />
            <p className={styles.step3Description}>
              Redefining luxury through meticulously planned spaces and sustainable
              architecture that inspires a superior way of life.
            </p>
          </div>
          <div className={styles.step3RightContainer}>
            <div className={`${styles.step3ImageWrapper} ${isStepThree ? styles.step3ImageExpanded : styles.step3ImageSquare}`}>
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
                alt="Modern Luxury Villa Exterior"
                className={styles.buildingImage}
              />
            </div>
          </div>
        </div>

        {/* --- NEW STEP 4 CONTENT (IMAGE LEFT, TEXT RIGHT) --- */}
       <div className={stepFourClass}>
          <div className={styles.step4LeftContainer}>
            <div className={`${styles.step4ImageWrapper} ${isStepFour ? styles.step4ImageExpanded : styles.step4ImageSquare}`}>
              <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000&auto=format&fit=crop" alt="S" className={styles.buildingImage} />
            </div>
          </div>
          <div className={`${styles.step4RightContent} ${isStepFour ? styles.step4TextScaleUp : styles.step4TextScaleDown}`}>
            <h4 className={styles.step4Heading}>S</h4>
            <div className={styles.step4Divider} />
            <p className={styles.step4Description}>Blending art and functionality to build iconic structures that stand as monuments of design elegance.</p>
          </div>
        </div>
        <div className={stepFiveClass}>
          <div className={`${styles.step5LeftContent} ${isStepFive ? styles.step5TextScaleUp : styles.step5TextScaleDown}`}>
            <h4 className={styles.step5Heading}>H</h4>
            <div className={styles.step5Divider} />
            <p className={styles.step5Description}>Crafting holistic neighborhoods where health, connectivity, and absolute peace of mind live in perfect harmony.</p>
          </div>
          <div className={styles.step5RightContainer}>
            <div className={`${styles.step5ImageWrapper} ${isStepFive ? styles.step5ImageExpanded : styles.step5ImageSquare}`}>
              <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000&auto=format&fit=crop" alt="H" className={styles.buildingImage} />
            </div>
          </div>
        </div>

        {/* --- NEW STEP 6 CONTENT (I) - Image Left, Text Right --- */}
        <div className={stepSixClass}>
          <div className={styles.step6LeftContainer}>
            <div className={`${styles.step6ImageWrapper} ${isStepSix ? styles.step6ImageExpanded : styles.step6ImageSquare}`}>
              <img src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1000&auto=format&fit=crop" alt="I" className={styles.buildingImage} />
            </div>
          </div>
          <div className={`${styles.step6RightContent} ${isStepSix ? styles.step6TextScaleUp : styles.step6TextScaleDown}`}>
            <h4 className={styles.step6Heading}>I</h4>
            <div className={styles.step6Divider} />
            <p className={styles.step6Description}>Inspiring innovations that anchor timeless infrastructure, paving the path for futuristic premium townships.</p>
          </div>
        </div>
      </div>
    </section>
  );
}