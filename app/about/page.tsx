'use client'
import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./about.module.css"; 

import heroLobby from "@/public/images/heroOne.jpg";
import heroStaircase from "@/public/images/heroTwo.jpg";
import heroDining from "@/public/images/herothree.jpg";

const slides = [
  { image: heroLobby, text: ["Known for", "the spaces", "we create."] },
  { image: heroStaircase, text: ["Known for", "the quality", "we stand by."] },
  { image: heroDining, text: ["Known for", "the stories", "we fulfil."] },
];

export default function About() {
  // useEffect aur interval ka saara code hata diya hai kyunki ab automatic scroll nahi chahiye

  return (
    <section className={styles.section}>
      {slides.map((slide, index) => (
        <div key={index} className={styles.slideWrapper}>
          
          {/* Background Image */}
          <div className={styles.imageContainer}>
            <Image
              src={slide.image}
              alt={slide.text.join(" ")}
              fill
              priority={index === 0}
              className={styles.objectCover}
            />
          </div>

          {/* Text Overlay - Jab ye screen par scroll hokar aayega tabhi animate hoga */}
          <div className={styles.textOverlay}> 
            <div className={styles.textCenter}>
              {slide.text.map((line, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }} // Jab screen me aaye tab animate ho
                  viewport={{ once: false, amount: 0.6 }} // Re-animate hoga jab wapas scroll karenge
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  className={`${styles.textLine} ${
                    i === slide.text.length - 1 ? styles.textLineLast : ""
                  }`}
                >
                  {line}
                </motion.span>
              ))}
            </div>
          </div>

        </div>
      ))}
    </section>
  );
}




