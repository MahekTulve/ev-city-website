"use client";

import styles from "./WhyCopenhange.module.css";
import { GiWalk } from "react-icons/gi";
import { IoIosBicycle } from "react-icons/io";
import { LiaConnectdevelop } from "react-icons/lia";
import { RiTreeLine } from "react-icons/ri";
import { FaRegHeart } from "react-icons/fa";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const pillars = [
  {
    title: "People First",
    text: "Designed for people, not just for traffic.",
    icon: <GiWalk />
  },
  {
    title: "Liveable by Design",
    text: "Walkable. Cyclable. Human scale.",
    icon: <IoIosBicycle />
  },
  {
    title: "Connected City",
    text: "Seamless public transit that brings the city closer.",
    icon: <LiaConnectdevelop />
  },
  {
    title: "Sustainable Future",
    text: "Green thinking for a better tomorrow.",
    icon: <RiTreeLine />
  },
  {
    title: "Quality of Life",
    text: "More time living, less time commuting.",
    icon: <FaRegHeart />
  },
];

export default function WhyCopenhagen() {
  return (
    <div className={styles["page"]} data-section>
      <section className={styles["why"]} id="why">
        <div className={styles["blush"]} />

        <img
          className={styles["skechImage"]}
          src={"images/waybgimage.png"}
          alt="skech"
          loading="lazy"
          decoding="async"
        />

        {/* Desktop View Grid */}
        <div className={`${styles["pillars"]} ${styles["desktopPillars"]}`}>
          {pillars.map((p) => (
            <div className={styles["pillar"]} key={p.title}>
              <div className={styles["iconWrap"]}>{p.icon}</div>
              <h3 className={styles["pillarTitle"]}>{p.title}</h3>
              <p className={styles["pillarText"]}>{p.text}</p>
            </div>
          ))}
        </div>

        {/* Mobile & Tablet Infinite Swiper */}
        <div className={styles["mobilePillars"]}>
          <Swiper
            modules={[Autoplay]}
            loop={true}
            centeredSlides={true}
            slidesPerView={1.3}
            spaceBetween={20}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2.8,
                spaceBetween: 30,
              },
            }}
            className={styles["swiperContainer"]}
          >
            {pillars.map((p) => (
              <SwiperSlide key={p.title}>
                {({ isActive }) => (
                  <div
                    className={`${styles["pillar"]} ${
                      isActive ? styles["activeCenter"] : ""
                    }`}
                  >
                    <div className={styles["iconWrap"]}>{p.icon}</div>
                    <h3 className={styles["pillarTitle"]}>{p.title}</h3>
                    <p className={styles["pillarText"]}>{p.text}</p>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className={styles["closingQuote"]} id="impact">
          <span className={styles["bigQuote"]}>&ldquo;</span>
          <p>
            A city isn&rsquo;t just its buildings, it&rsquo;s its{" "}
            <em className={styles["italicGold"]}>beliefs in action.</em>
          </p>
          <span className={styles["bigQuote"]}>&rdquo;</span>
        </div>
      </section>
    </div>
  );
}