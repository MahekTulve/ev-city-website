"use client";

import styles from "./clouds.module.css";

const cloudPositions = [
  styles.cloudPositionA,
  styles.cloudPositionB,
  styles.cloudPositionC,
  styles.cloudPositionD,
];

interface CloudLayerProps {
  src: string;
  layerClass: string;
  trackClass: string;
  imageClass: string;
}

function CloudLayer({
  src,
  layerClass,
  trackClass,
  imageClass,
}: CloudLayerProps) {
  return (
    <div className={`${styles.cloudLayer} ${layerClass}`}>
      <div className={`${styles.cloudMarquee} ${trackClass}`}>
        {[0, 1].map((groupIndex) => (
          <div className={styles.cloudGroup} key={groupIndex}>
            {[0, 1, 2, 3].map((itemIndex) => {
              const flipped = itemIndex % 2 === 1;

              return (
                <div
                  className={`${styles.cloudItem} ${cloudPositions[itemIndex]}`}
                  key={`${groupIndex}-${itemIndex}`}
                >
                  <img
                    src={src}
                    alt=""
                    draggable={false}
                    className={`${styles.cloudImage} ${imageClass} ${
                      flipped ? styles.cloudImageFlipped : ""
                    }`}
                  />
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Blue() {
  return (
    <section className={styles.cloudPage}>
      <div className={styles.bottomOverlay}  />
      <div className={styles.cloudTransition} aria-hidden="true">
      </div>
    </section>
  );
}