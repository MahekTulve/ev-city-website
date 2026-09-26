import styles from "./EvCityHero.module.css";

export default function EvCityHero() {
  return (
    <main className={styles["hero"]}>
      <img className={styles["landscape"]} src={'/images/ev-city-panorama.jpg'} alt="Sunset over a coastal city, its waterfront and a sweeping bridge" />

      <header className={styles["topbar"]}>
        <div className={styles["wordmark"]}></div>
        <div className={styles["location"]}>A SMARTER NAVI MUMBAI<span className={styles["locationRule"]} /></div>
      </header>

      <div className={styles["content"]}>
        <h1 className={styles["headline"]}>
          <span>A CITY WITHIN <em>A CITY.</em></span>
          <span className={styles["secondLine"]}><em>A FUTURE</em> WITHIN REACH.</span>
        </h1>
        <span className={styles["shortRule"]} aria-hidden="true" />

        <div className={styles["intro"]}>
          <p>Smart living isn’t just a place to live.It’s a <br />place to belong to the future. The next chapter <br />of Navi Mumbai has</p>
          <div className={styles["poem"]}>
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