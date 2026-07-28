import { useEffect, useState } from "react";
import styles from "./CinematicText.module.css";

type Slide =
  | { kind: "title"; small?: string; text: string }
  | { kind: "credit"; small: string; big: string };

const SLIDES: Slide[] = [
  { kind: "title", small: "EV Homes", text: "EV Homes Presents" },
  { kind: "credit", small: "An Original Vision", big: "THE FUTURE OF" },
  { kind: "credit", small: "Featuring", big: "CONNECTED LIVING" },
  { kind: "credit", small: "A World Where", big: "EVERYTHING YOU NEED" },
  { kind: "credit", small: "Is Just", big: "FIVE MINUTES AWAY" },
  { kind: "title", small: "Coming Soon", text: "EV HOMES" },
];

const SLIDE_MS = 3000;

export default function CinematicTrailer() {
  const [i, setI] = useState(0);
  const [runKey, setRunKey] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      setI((prevI) => {
        // Agar last slide par pohench gaye hain, toh wapas 0 se start karein
        if (prevI >= SLIDES.length - 1) {
          setRunKey((k) => k + 1); // Key update hone se animation restart hoga
          return 0;
        }
        return prevI + 1;
      });
    }, SLIDE_MS);

    return () => clearTimeout(t);
  }, [i, runKey]);

  return (
    <div className={styles.stage}>
      <div className={styles.grain} />
      <div className={`${styles.bar} ${styles.barTop}`} />
      <div className={`${styles.bar} ${styles.barBot}`} />
      <div className={styles.slides}>
        {SLIDES.map((s, idx) => (
          <div
            key={`${runKey}-${idx}`}
            className={`${styles.slide} ${idx === i ? styles.slideActive : ""}`}
            aria-hidden={idx !== i}
          >
            <div className={styles.block}>
              {"small" in s && s.small && <span className={styles.small}>{s.small}</span>}
              <Headline
                text={s.kind === "title" ? s.text : s.big}
                variant={s.kind === "title" ? "title" : "credit"}
              />
              <div className={styles.rule} />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.progress}>
        {SLIDES.map((_, idx) => (
          <span
            key={idx}
            className={`${styles.tick} ${idx === i ? styles.tickOn : ""}`}
          />
        ))}
      </div>
    </div>
  );
}

function Headline({ text, variant }: { text: string; variant: "title" | "credit" }) {
  const words = text.split(" ");
  let letterIndex = 0;
  return (
    <h1 className={`${styles.headline} ${variant === "title" ? styles.title : styles.credit}`}>
      {words.map((w, wi) => (
        <span key={wi} className={styles.word}>
          {w.split("").map((ch, ci) => {
            const delay = 100 + letterIndex * 70;
            letterIndex++;
            return (
              <span
                key={ci}
                className={styles.letter}
                data-ch={ch}
                style={{ ["--d" as string]: `${delay}ms`, animationDelay: `${delay}ms` }}
              >
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}