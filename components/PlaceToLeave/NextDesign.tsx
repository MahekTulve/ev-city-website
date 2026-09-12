"use client";
import { createFileRoute } from "@tanstack/react-router";
import { motion, Variants } from "framer-motion";
import {
  Footprints,
  Bike,
  TrainFront,
  Users,
  BookOpen,
  Flower2,
  TreePine,
  Coffee,
  ShoppingBag,
  Laptop2,
} from "lucide-react";
import { PiUsersThreeLight } from "react-icons/pi";

import wedgePark from "@/public/images/wedge-park.jpg";
import wedgeCafe from "@/public/images/wedge-cafe.jpg";
import wedgeCulture from "@/public/images/wedge-culture.jpg";
import wedgeWork from "@/public/images/wedge-work.jpg";
import wedgeRetail from "@/public/images/wedge-retail.jpg";
import styles from "./NextDesign.module.css";

const CX = 250;
const CY = 300;
const R_OUT = 310
const I_OUT = 210

const R_IN = 100;

function polar(angleDeg: number, r: number): [number, number] {
  const a = (angleDeg * Math.PI) / 180;
  return [CX + r * Math.sin(a), CY - r * Math.cos(a)];
}

function wedgePath(a0: number, a1: number, rIn = R_IN, rOut = R_OUT): string {
  const [x0, y0] = polar(a0, rOut);
  const [x1, y1] = polar(a1, rOut);
  const [x2, y2] = polar(a1, rIn);
  const [x3, y3] = polar(a0, rIn);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${x0} ${y0} A ${rOut} ${rOut} 0 ${large} 1 ${x1} ${y1} L ${x2} ${y2} A ${rIn} ${rIn} 0 ${large} 0 ${x3} ${y3} Z`;
}

const WEDGE_SIZE = 42;
const WEDGE_GAP = 4;
const WEDGE_START = -25;
const IMG_BOX = 320;

const wedgeData = [
  {
    img: wedgePark,
    alt: "People relaxing in a sunlit Copenhagen park",
    label: { icon: TreePine, text: "Parks & Nature", pos: { top: "-4%", left: "33%" }, line: "150px", mobline: "60px" },
  },
  {
    img: wedgeCafe, // Index 1
    alt: "Warm café interior with guests at wooden tables",
    label: { icon: Coffee, text: "Cafés & Restaurants", pos: { top: "5%", left: "72%" }, line: "40px", mobline: "20px" },
  },
  {
    img: wedgeCulture,
    alt: "Cobblestone street with pedestrians and bicycles",
    label: { icon: Users, text: "Culture & Community", pos: { top: "43%", left: "84%" }, line: "5px", mobline: "5px" },
  },
  {
    img: wedgeWork, // Index 3
    alt: "Bright coworking space with people working",
    label: { icon: Laptop2, text: "Workspaces", pos: { top: "81%", left: "73%" }, line: "34px", mobline: "17px" },
  },
  {
    img: wedgeRetail,
    alt: "Glowing boutique storefront at dusk",
    label: { icon: ShoppingBag, text: "Retail & Services", pos: { top: "91%", left: "38%" }, line: "130px", mobline: "17px" },
  },
].map((w, i) => {
  const a0 = WEDGE_START + i * (WEDGE_SIZE + WEDGE_GAP);

  // wedgeCafe (i === 1) aur wedgeWork (i === 3) ke liye condition
  const isTargetWedge = i === 1 || i === 3;
  const currentRIn = isTargetWedge ? R_IN + 20 : R_IN;   // Center circle se padding
  const currentROut = isTargetWedge ? R_OUT + 35 : R_OUT; // Outside border se bahar nikalna

  const [mx, my] = polar(a0 + WEDGE_SIZE / 2, (currentRIn + currentROut) / 2);

  return {
    ...w,
    id: `wedge-${i}`,
    d: wedgePath(a0, a0 + WEDGE_SIZE, currentRIn, currentROut),
    ix: Math.round(mx * 100) / 100 - IMG_BOX / 2,
    iy: Math.round(my * 100) / 100 - IMG_BOX / 2,
  };
});
const extraIcons = [
  {
    id: "school",
    icon: BookOpen,
    text: (
      <>
        Schools &<br /> Education
      </>
    ),
    className: styles["schoolIcon"],
  },
  {
    id: "wellness",
    icon: Flower2,
    text: (
      <>
        Wellness &<br /> Health
      </>
    ),
    className: styles["WellnessIcon"],
  },
];

const iconRow = [
  { icon: Footprints, label: "Walk" },
  { icon: Bike, label: "Cycle" },
  { icon: TrainFront, label: "Connect" },
  { icon: PiUsersThreeLight, label: "Belong" },
];

const itemPairVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -50,
    scale: 0.9,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.22,
      duration: 0.5,
      type: "spring",
      stiffness: 75,
      damping: 14,
    },
  }),
};

const TOTAL_STEPS = wedgeData.length + extraIcons.length;

const medallionVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: TOTAL_STEPS * 0.22 + 0.1,
      duration: 0.6,
      type: "spring",
      stiffness: 90,
      damping: 15,
    },
  },
};
const leftContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15, // Har element ke beech ka delay duration
    },
  },
};

// Title Animation (Fade Up)
const titleVariants: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Decorative Line Animation (Scale Width)
const ruleVariants: Variants = {
  hidden: { opacity: 0, scaleX: 0 },
  visible: {
    opacity: 1,
    scaleX: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

// Sub-text & Kickers Animation (Fade Slide Right)
const fadeRightVariants: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

// Icon List Items Staggering
const iconRowContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const iconItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 15 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 12 },
  },
};

// Bottom Nyhavn Image Animation (Fade Up from Bottom)
const imageVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 0.88, // Preserve original CSS opacity
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};
export default function NextDesign() {
  return (
    <main className={styles["page"]}>
      <section className={styles["hero"]}>
        <motion.div
          className={styles["left"]}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.3, once: false }}
          variants={leftContainerVariants}
        >
          <motion.div variants={titleVariants} className={styles["starttext"]}>
            <p className={styles["titleGold"]}>Inspired By</p>
            <h1 className={styles["title"]} >
              <span className={styles["letterC"]}>C</span><span className={styles["zeroHero"]}>O</span>PENHAGEN
            </h1>
          </motion.div>
          <motion.div className={styles["ruleRow"]} variants={ruleVariants} style={{ originX: 0 }}>
            <span className={styles["rule"]} />
          </motion.div>

          <motion.div className={styles["blockRow"]} variants={fadeRightVariants}>
            <p className={styles["kicker"]}>A 5 - MINUTE CITY, REIMAGINED FOR VASHI</p>
            <p className={styles["kickerSub"]}></p>
          </motion.div>

          <motion.div className={styles["blockRow"]} variants={fadeRightVariants}>
            <div>

              <p className={styles["body"]}>
                Thoughtfully planned, inspired by Copenhagen's
                <br /> 5-minute city philosophy where life, nature and
                <br />community are always within reach.
              </p>

            </div>
          </motion.div>
          <p className={styles["bodyStrong"]}>
            THIS IS WHAT WE BRING TO <em>Vashi..!</em>
          </p>
        </motion.div>

        {/* ------ right column : the wheel ------ */}
        <div className={styles["right"]}>
          <div className={styles["wheel"]}>
            <svg viewBox="0 0 640 640" className={styles["wheelSvg"]} role="img" aria-label="Five minute city wheel">
              <defs>
                {wedgeData.map((w) => (
                  <clipPath key={w.id} id={w.id}>
                    <path d={w.d} />
                  </clipPath>
                ))}
              </defs>

              <circle cx={CX} cy={CY} r={I_OUT + 15} className={styles["dotted"]} />

              {/* Wedge Images */}
              {wedgeData.map((w, index) => (
                <motion.g
                  key={w.id}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ amount: 0.5, once: false }}
                  variants={itemPairVariants}
                >
                  <path d={w.d} className={styles["wedgeBase"]} />
                  <image
                    href={w.img.src}
                    x={w.ix}
                    y={w.iy}
                    width={IMG_BOX}
                    height={IMG_BOX}
                    preserveAspectRatio="xMidYMid slice"
                    clipPath={`url(#${w.id})`}
                    aria-label={w.alt}
                  />
                </motion.g>
              ))}
            </svg>

            {/* Centre Medallion */}
            <motion.div
              className={styles["medallion"]}
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5, once: false }}
              variants={medallionVariants}
            >
              <span className={styles["big5"]}>5'</span>
              <span className={styles["minutes"]}>Minutes</span>
              {/* <span className={styles["walkBike"]}>Walk or bike</span>
              <Footprints strokeWidth={1.2} className={styles["walkicon"]} /> */}
              {/* <div className={styles["walkunder"]} /> */}
            </motion.div>

            {wedgeData.map(({ id, label: { icon: Icon, text, pos, line, mobline } }, index) => (
              <motion.div
                key={`label-${id}`}
                className={styles["wheelLabel"]}
                style={pos}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.5, once: false }}
                variants={itemPairVariants}
              >
                <span className={styles["labelChip"]}>
                  <Icon size={16} strokeWidth={2} />
                </span>
                <span className={styles["labelText"]}>{text}</span>
                <span className={styles["mobilelabelLine"]} style={{ width: mobline }} />

                <span className={styles["labelLine"]} style={{ width: line }} />
              </motion.div>
            ))}
            {extraIcons.map(({ id, icon: Icon, text, className }, extraIdx) => (
              <motion.div
                key={id}
                className={className}
                custom={wedgeData.length + extraIdx}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.5, once: false }}
                variants={itemPairVariants}
              >
                <span className={styles["labelChip"]}>
                  <Icon size={16} strokeWidth={2} />
                </span>
                <span className={styles["labelText"]}>{text}</span>
              </motion.div>
            ))}
          </div>


        </div>
      </section>
    </main>
  );
}