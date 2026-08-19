import styles from "./videoSection.module.css";
import ViewportVideo from "../performance/ViewportVideo";

interface VideoSectionProps {
  isActive: boolean;
  isMinimized: boolean;
  isFinalText: boolean; 
}

export default function VideoSection({ isActive, isMinimized, isFinalText }: VideoSectionProps) {
  
  // Conditionally apply class based on steps
  const videoSectionClass = `${styles.videoSection} ${
    isFinalText ? styles.videoWipeUp : (isMinimized ? styles.videoMinimized : (isActive ? styles.videoReveal : styles.videoHidden))
  }`;

  return (
    <section className={videoSectionClass}>
      <div className={styles.videoWrapper}>
        <ViewportVideo
          className={styles.mainVideo}
          src="/videos/aboutvideo.mp4"
          preloadWhenNear="metadata"
        />
        <div className={`${styles.videoOverlay} ${isMinimized ? styles.overlayFadeOut : ''}`}>
          <h2 className={styles.videoTitle}>Shaping Dimensions</h2>
        </div>
      </div>
      
      {/* FIXED: Yahan se pehle wala text layout remove kar diya gaya hai */}
    </section>
  );
}