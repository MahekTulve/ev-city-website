"use client";

import type { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import styles from "./WhyCopenhange.module.css";

export type CopenhagenPillar = {
  title: string;
  text: string;
  icon: ReactNode;
};

interface WhyCopenhagenMobileProps {
  pillars: CopenhagenPillar[];
}

export default function WhyCopenhagenMobile({
  pillars,
}: WhyCopenhagenMobileProps) {
  return (
    <div className={styles.mobilePillars}>
      <Swiper
        modules={[Autoplay]}
        loop
        centeredSlides
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
        className={styles.swiperContainer}
      >
        {pillars.map((pillar) => (
          <SwiperSlide key={pillar.title}>
            {({ isActive }) => (
              <div
                className={`${styles.pillar} ${
                  isActive ? styles.activeCenter : ""
                }`}
              >
                <div className={styles.iconWrap}>{pillar.icon}</div>
                <h3 className={styles.pillarTitle}>{pillar.title}</h3>
                <p className={styles.pillarText}>{pillar.text}</p>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
