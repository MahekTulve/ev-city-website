import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./SlideOverStack.module.css";

type Props = {
  /** The section that stays pinned while the next one slides over it. */
  previous: ReactNode;
  /** The section that slides up over the previous one. */
  children: ReactNode;
};

/**
 * Pins the previous section and slides the next section up over it as the user
 * scrolls: the pinned content dims and settles back while the incoming panel
 * rises with rounded corners and a soft shadow lip.
 */
export default function SlideOverStack({ previous, children }: Props) {
  const stackRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "start -100vh"],
  });

  const prevScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const prevOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.15]);
  const prevY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <div ref={stackRef} className={styles["stack"]}>
      <section className={styles["pinned"]}>
        <motion.div
          className={styles["pinnedInner"]}
          style={{ scale: prevScale, opacity: prevOpacity, y: prevY }}
        >
          {previous}
        </motion.div>
      </section>

      <motion.div
        className={styles["slideOver"]}
        initial={{ y: "12vh" }}
        whileInView={{ y: 0 }}
        viewport={{ once: false, amount: 0.02 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles["slideOverHandle"]} />
        {children}
      </motion.div>
    </div>
  );
}
