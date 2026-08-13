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

export default function Clouds() {
  return (
    <section className={styles.cloudPage}>
      <div className={styles.cloudTransition} aria-hidden="true">
        <div className={styles.cloudBase} />
        <div className={styles.cloudCore} />
        <div className={styles.cloudFog} />

        <CloudLayer
          src="/images/cloud_6.avif"
          layerClass={styles.cloudLayerBack}
          trackClass={styles.cloudTrackBack}
          imageClass={styles.cloudImageBack}
        />

        <CloudLayer
          src="/images/cloud_5.avif"
          layerClass={styles.cloudLayerMiddle}
          trackClass={styles.cloudTrackMiddle}
          imageClass={styles.cloudImageMiddle}
        />

        <CloudLayer
          src="/images/cloud_4.avif"
          layerClass={styles.cloudLayerFront}
          trackClass={styles.cloudTrackFront}
          imageClass={styles.cloudImageFront}
        />
      </div>
    </section>
  );
}