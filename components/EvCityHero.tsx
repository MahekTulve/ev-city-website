import styles from "./EvCityHero.module.css";

export default function EvCityHero() {

  return (
    <main className={styles["hero"]}>
      <picture className={styles["landscapePicture"]}>
        <source media="(max-width: 768px)" srcSet="/images/EVHeroMobile.webp" />
        <img
          className={styles["landscape"]}
          src="/images/lastSection.webp"
          alt="Sunset over a coastal city, its waterfront and a sweeping bridge"
        />
      </picture>      <div className={styles["EVOverlay"]} />

      <header className={styles["topbar"]}>
        <div className={`${styles["location"]} ${styles["desktop"]}`}>A SMARTER NAVI MUMBAI<span className={styles["locationRule"]} /></div>
        <div className={`${styles["location"]} ${styles["mobile"]}`}>NAVI MUMBAI<span className={styles["locationRule"]} /></div>

      </header>

      <div className={styles["content"]}>

        <h1 className={`${styles["headline"]} ${styles["desktop"]}`}>
          <span>A CITY WITHIN <em>A CITY.</em></span>
          <span className={styles["secondLine"]}><em>A FUTURE</em> WITHIN REACH.</span>
        </h1>
        <h1 className={`${styles["headline"]} ${styles["mobile"]}`}>
          <span><em>A CITY </em><br />WITHIN A CITY.</span>
          <span className={styles["secondLine"]}><em>A FUTURE</em> <br />WITHIN REACH.</span>
        </h1>
        <span className={styles["shortRule"]} aria-hidden="true" />

        <div className={styles["intro"]}>
          <p>Smart living isn’t just a place to live.It’s a <br />place to belong to the future. The next chapter <br />of Navi Mumbai has </p>
          <div className={`${styles["poem"]} `}>
            <span>a location.</span>
            <span>a shape.</span>
            <span>a heartbeat.</span>
            <span>a meaning.</span>
          </div>
     
        </div>

        <div className={styles["signoff"]}>
          <p>AND IT BEGINS HERE AT</p>
          <div className={styles["signature"]}>Ev City.</div>
          <span className={styles["signatureRule"]} aria-hidden="true" />
        </div>
      </div>
    </main>
  );
}