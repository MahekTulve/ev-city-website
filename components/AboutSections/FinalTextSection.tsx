import styles from "./finalText.module.css";

interface FinalTextSectionProps {
  isActive: boolean;
}

export default function FinalTextSection({ isActive }: FinalTextSectionProps) {
  return (
    <section 
      className={`${styles.finalTextSection} ${isActive ? styles.textReveal : styles.textHidden}`}
    >
      <div className={styles.contentContainer}>
        <h3 className={styles.finalTitle}>The Legacy</h3>
        <h4 className={styles.finalSubtitle}>Built for Generations</h4>
        <div className={styles.finalDivider} />
        <p className={styles.finalDescription}>
          Every milestone we create is rooted in our obsession with absolute perfection. 
          We build not just structures, but timeless legacies where architecture meets soul, 
          crafting experiences that endure for centuries.
        </p>
      </div>
    </section>
  );
}