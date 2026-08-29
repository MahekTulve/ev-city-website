"use client";
import { createFileRoute } from "@tanstack/react-router";
import {
  Footprints,
  Bike,
  TrainFront,
  Users,
  BookOpen,
  Flower2,
  TreePine,
  Coffee,
  Laptop,
  ShoppingBag,
  BusFront,
  Network,
  Leaf,
  Heart,
} from "lucide-react";
import wedgePark from "@/public/images/wedge-park.jpg";
import wedgeCafe from "@/public/images/wedge-cafe.jpg";
import wedgeCulture from "@/public/images/wedge-culture.jpg";
import wedgeWork from "@/public/images/wedge-work.jpg";
import wedgeRetail from "@/public/images/wedge-retail.jpg";
import wedgeTransit from "@/public/images/wedge-transit.jpg";
import styles from "./NextDesign.module.css";
const CX = 320;
const CY = 320;
const R_OUT = 296;
const R_IN = 148;

function polar(angleDeg: number, r: number): [number, number] {
  const a = (angleDeg * Math.PI) / 180;
  return [CX + r * Math.sin(a), CY - r * Math.cos(a)];
}

function wedgePath(a0: number, a1: number): string {
  const [x0, y0] = polar(a0, R_OUT);
  const [x1, y1] = polar(a1, R_OUT);
  const [x2, y2] = polar(a1, R_IN);
  const [x3, y3] = polar(a0, R_IN);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${x0} ${y0} A ${R_OUT} ${R_OUT} 0 ${large} 1 ${x1} ${y1} L ${x2} ${y2} A ${R_IN} ${R_IN} 0 ${large} 0 ${x3} ${y3} Z`;
}

const WEDGE_SIZE = 29;
const WEDGE_GAP = 6;
const WEDGE_START = -18;
const IMG_BOX = 320;

const wedges = [
  { img: wedgePark, alt: "People relaxing in a sunlit Copenhagen park" },
  { img: wedgeCafe, alt: "Warm café interior with guests at wooden tables" },
  { img: wedgeCulture, alt: "Cobblestone street with pedestrians and bicycles" },
  { img: wedgeWork, alt: "Bright coworking space with people working" },
  { img: wedgeRetail, alt: "Glowing boutique storefront at dusk" },
  { img: wedgeTransit, alt: "Tram crossing a canal bridge at dusk" },
].map((w, i) => {
  const a0 = WEDGE_START + i * (WEDGE_SIZE + WEDGE_GAP);
const [mx, my] = polar(
  a0 + WEDGE_SIZE / 2,
  (R_IN + R_OUT) / 2
);

return {
  ...w,
  id: `wedge-${i}`,
  d: wedgePath(a0, a0 + WEDGE_SIZE),
  ix: Math.round(mx * 100) / 100 - IMG_BOX / 2,
  iy: Math.round(my * 100) / 100 - IMG_BOX / 2,
};
});


const sideLabels = [
  { icon: TreePine, text: "Parks & Nature", pos: { top: "4%", left: "57%" }, line: "34px" },
  { icon: Coffee, text: "Cafés & Restaurants", pos: { top: "17%", left: "84%" }, line: "34px" },
  { icon: Users, text: "Culture & Community", pos: { top: "33%", left: "95%" }, line: "34px" },
  { icon: Laptop, text: "Workspaces", pos: { top: "49%", left: "95%" }, line: "34px" },
  { icon: ShoppingBag, text: "Retail & Services", pos: { top: "65%", left: "90%" }, line: "34px" },
  { icon: BusFront, text: "Public Transit", pos: { top: "83%", left: "72%" }, line: "34px" },
  { icon: BookOpen, text: "Schools & Education", pos: { top: "36%", left: "-34%" }, line: "30px" },
  { icon: Flower2, text: "Wellness & Health", pos: { top: "60%", left: "-28%" }, line: "30px" },
];

const iconRow = [
  { icon: Footprints, label: "Walk" },
  { icon: Bike, label: "Cycle" },
  { icon: TrainFront, label: "Connect" },
  { icon: Users, label: "Belong" },
];

const pillars = [
  { icon: Footprints, title: "People First", desc: "Designed around people, not traffic." },
  { icon: Bike, title: "Within Minutes", desc: "Daily essentials, closer to home." },
  { icon: Network, title: "Connected", desc: "Seamless connections that bring the city closer." },
  { icon: Leaf, title: "Sustainable", desc: "Greener choices for everyday living." },
  { icon: Heart, title: "More Life", desc: "Less commuting. More living." },
];


export default function NextDesign() {
  return (
    <main className={styles['page']}>
      <section className={styles['hero']}>
        <div className={styles['left']}>
        
          <h1 className={styles['title']}>
            Denmark&rsquo;s
            <span className={styles['titleGold']}>Inspiration</span>
          </h1>

          <div className={styles['ruleRow']}>
            <span className={styles['rule']} />
          </div>

          <div className={styles['blockRow']}>
            <div>
              <p className={styles['kicker']}>Copenhagen&rsquo;s 5-minute city</p>
              <p className={styles['kickerSub']}>Everything you need, within minutes.</p>
            </div>
          </div>

          <ul className={styles['iconRow']}>
            {iconRow.map(({ icon: Icon, label }) => (
              <li key={label} className={styles['iconItem']}>
                <Icon size={30} strokeWidth={1.1} />
                <span>{label}</span>
              </li>
            ))}
          </ul>

          <div className={styles['blockRow']}>
            <div>
              <h2 className={styles['subTitle']}>
                Less travel.
                <br />
                More life.
              </h2>
              <p className={styles['body']}>
                A city designed for people.
                <br />
                Where daily life, nature
                <br />
                and community are
                <br />
                always close.
              </p>
              <p className={styles['bodyStrong']}>
                That is the inspiration
                <br />
                we bring to <em>Vashi.</em>
              </p>
            </div>
          </div>

          <img
            className={styles['nyhavn']}
            src="/images/denmark_city.jpeg"
            alt="Nyhavn harbour in Copenhagen with colourful waterfront houses"
            width={1536}
            height={1024}
          />
        </div>

        {/* ------ right column : the wheel ------ */}
        <div className={styles['right']}>
          <div className={styles['wheel']}>
            <svg viewBox="0 0 640 640" className={styles['wheelSvg']} role="img" aria-label="Five minute city wheel">
              <defs>
                {wedges.map((w) => (
                  <clipPath key={w.id} id={w.id}>
                    <path d={w.d} />
                  </clipPath>
                ))}
              </defs>

              {/* dotted guide rings */}
              <circle cx={CX} cy={CY} r={R_OUT + 16} className={styles['dotted']} />
              <circle cx={CX} cy={CY} r={R_IN - 14} className={styles['dotted']} />

              {wedges.map((w) => (
                <g key={w.id}>
                  <path d={w.d} className={styles['wedgeBase']} />
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
                </g>
              ))}
            </svg>

            {/* centre medallion */}
            <div className={styles['medallion']}>
              <span className={styles['big5']}>5&prime;</span>
              <span className={styles['minutes']}>Minutes</span>
              <span className={styles['walkBike']}>Walk or bike</span>
              <Footprints size={18} strokeWidth={1.2} />
            </div>

            {/* labels around the wheel */}
            {sideLabels.map(({ icon: Icon, text, pos, line }) => (
              <div key={text} className={styles['wheelLabel']} style={pos}>
                <span className={styles['labelChip']}>
                  <Icon size={16} strokeWidth={1.3} />
                </span>
                <span className={styles['labelText']}>{text}</span>
                <span className={styles['labelLine']} style={{ width: line }} />
              </div>
            ))}
          </div>

          
        </div>
      </section>

      
    </main>
  );
}