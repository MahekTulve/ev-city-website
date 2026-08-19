"use client";
import styles from './NextPhoto.module.css';
import ViewportVideo from '../performance/ViewportVideo';

export default function NextDesign() {


    return (
        <section >
            <div className={styles.place}>
                {/* <div className={styles.placeTopBanner}>
                    A <span className={styles.boxTag}>PLACE</span> TO LIVE — TO <br />
                    RETURN YEAR AFTER YEAR
                </div> */}


                <div className={styles.placeCenterContent}>
                    <h1 className={styles.placeMainTitle}>
                        DEVELOPER<sup>+</sup><br />
                        SALES & MARKETING<sup>+</sup><br />
                        LICENSE OBTAINED<sup>+</sup><br />
                        2026<sup>+</sup>
                    </h1>
                </div>
              {/*   <ViewportVideo

                    className={`${styles["flower"]} ${styles["flowerTopRight"]}`}
                    src="/videos/flower-2.webm"
                    aria-hidden="true"
                />
                <ViewportVideo
                    className={`${styles["flower"]} ${styles["flowerTopLeft"]}`}
                    src="/videos/flower-2.webm"
                    aria-hidden="true"
                /> */}


            </div>


        </section>
    );
}
