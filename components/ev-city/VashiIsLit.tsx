import React from 'react';
import styles from './VashiIsLit.module.css';

export const VashiIsLit: React.FC = () => {
    return (
        <section className={styles.heroSection}>
            {/* Background Overlay */}
            <div className={styles.overlay}></div>

            {/* Main Content Container */}
            <div className={styles.contentContainer}>


                {/* Subtitle Top */}
                <p className={styles.subHeader}>VASHI IS</p>

                <div className={styles.niceContainer}>
                    {/* N Section */}
                    <div className={`${styles.column} ${styles.activeColumn}`}>
                        <span className={styles.bigLetter}>L.</span>
                        <span className={styles.wordLabel}>
                            <strong className={styles.orangeText}>L</strong>ARGEST
                        </span>
                        <div className={styles.activeBorder}></div>
                    </div>

                    {/* I Section */}
                    <div className={styles.column}>
                        <span className={styles.bigLetter}>I.</span>
                        <span className={styles.wordLabel}>
                            <strong className={styles.orangeText}>I</strong>NTEGRATED
                        </span>
                    </div>

                    {/* C Section */}
                    <div className={styles.column}>
                        <span className={styles.bigLetter}>T.</span>
                        <span className={styles.wordLabel}>
                            <strong className={styles.orangeText} style={{ marginLeft: "40px" }}>T</strong>OWNSHIP
                        </span>
                    </div>

                    <span className={styles.trademark}>™</span>
                </div>

                {/* Bottom Description Section */}
                <div className={styles.textDetails}>
                    <h2 className={styles.headline}>
                        Thane is writing India's next economic chapter.
                    </h2>
                    <p className={styles.bodyText}>
                        Thane Coastal Road. Intra-city Ring Metro. Bullet Train. Twin Tunnel.
                        Waterways. Thane is not an extension of anything — It is a city becoming
                        the <strong>new commercial capital</strong>.
                    </p>
                </div>
                
            </div>

        </section>
    );
};

export default VashiIsLit;