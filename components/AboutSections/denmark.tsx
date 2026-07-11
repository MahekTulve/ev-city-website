import {
  Train,
  ShoppingBag,
  Plus,
  GraduationCap,
  Briefcase,
  Plane,
  MapPin,
  Diamond,
  Crown,
  Phone,
  MessageCircle,
  Navigation,
  Timer,
  Share2,
  Shield,
  Heart,
  ChevronLeft,
  ChevronRight,
  Hand,
  ArrowRight,
} from "lucide-react";
import styles from "./denmark.module.css";


type Node = {
  time: string;
  label: string;
  sub: string;
  icon: React.ReactNode;
  x: number;
  y: number;
};

const NODES: Node[] = [
  { time: "2", label: "RAILWAY STATION", sub: "Seamless Connectivity", icon: <Train size={28} />, x: 8, y: 55 },
  { time: "3", label: "NEXUS MALL", sub: "Shopping & Dining", icon: <ShoppingBag size={26} />, x: 22, y: 35 },
  { time: "4", label: "APOLLO HOSPITAL", sub: "Quality Healthcare", icon: <Plus size={26} />, x: 36, y: 25 },
  { time: "5", label: "TOP SCHOOLS", sub: "Bright Futures", icon: <GraduationCap size={26} />, x: 64, y: 25 },
  { time: "5", label: "BUSINESS HUB", sub: "Work & Thrive", icon: <Briefcase size={26} />, x: 78, y: 35 },
  { time: "15", label: "AIRPORT", sub: "Travel with Ease", icon: <Plane size={26} />, x: 92, y: 55 },
];

export default  function Denmark() {
  return (
    <main className={styles.page}>
      <p className={styles.topLabel}>EVERYTHING WITHIN REACH</p>
      <h1 className={styles.title}>
        THE <span className={styles.big}>5</span> MINUTE CITY
      </h1>
      <p className={styles.subtitle}>
        At Denmark, every essential is just minutes away.
        <br />
        Live a life of unmatched convenience and connectivity.
      </p>
      <div className={styles.divider} />

      <div className={styles.layout}>
        <aside className={styles.card}>
          <div className={styles.brandMark}><Crown size={22} /></div>
          <h2 className={styles.brandName}>DENMARK</h2>
          <p className={styles.brandCity}>VASHI</p>
          <p className={styles.brandDesc}>
            A landmark address that puts the best of lifestyle, business,
            education, healthcare & entertainment within 5 minutes.
          </p>
        </aside>

        <section className={styles.mapWrap}>
          <svg className={styles.arcSvg} viewBox="0 0 100 80" preserveAspectRatio="none">
            <defs>
              <linearGradient id="arcGrad" x1="0" x2="1">
                <stop offset="0" stopColor="#d4af37" stopOpacity="0.2" />
                <stop offset="0.5" stopColor="#d4af37" stopOpacity="0.9" />
                <stop offset="1" stopColor="#d4af37" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d="M 8 55 Q 50 -10 92 55"
              fill="none"
              stroke="url(#arcGrad)"
              strokeWidth="0.3"
            />
          </svg>

          <div className={styles.nodes}>
            <div className={styles.center}>
              <div className={styles.centerCircle}>
                <div className={styles.centerBrand}><Crown size={26} /></div>
                <div className={styles.centerName}>DENMARK</div>
                <div className={styles.centerCity}>VASHI</div>
              </div>
            </div>

            {NODES.map((n) => (
              <div
                key={n.label}
                className={styles.node}
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <div className={styles.nodeTime}>{n.time}</div>
                <div className={styles.nodeMin}>MIN</div>
                <div className={styles.nodeCircle}>{n.icon}</div>
                <div className={styles.nodeLabel}>{n.label}</div>
                <div className={styles.nodeSub}>{n.sub}</div>
              </div>
            ))}

            <div className={styles.towerGlow} />
            <div className={styles.tower} />
          </div>

          <div className={styles.dragBar}>
            <button><ChevronLeft size={16} /></button>
            <span>DRAG TO</span>
            <Hand size={18} />
            <span>EXPLORE</span>
            <button><ChevronRight size={16} /></button>
          </div>
        </section>

        <aside>
          <div className={styles.card}>
            <div className={styles.infoRow}>
              <MapPin className={styles.infoIcon} size={22} />
              <div>
                <p className={styles.infoTitle}>PRIME LOCATION</p>
                <p className={styles.infoSub}>Heart of Vashi</p>
              </div>
            </div>
            <div className={styles.infoRow}>
              <Diamond className={styles.infoIcon} size={22} />
              <div>
                <p className={styles.infoTitle}>LUXURY RESIDENCES</p>
                <p className={styles.infoSub}>Redefined</p>
              </div>
            </div>
          </div>

          <div className={styles.explore360}>
            <small>EXPLORE</small>
            <span>360°</span>
            <button className={styles.viewBtn}>
              VIEW LOCATION <ArrowRight size={14} />
            </button>
          </div>
        </aside>
      </div>

      <div className={styles.features}>
        {[
          { icon: <Timer size={22} />, a: "SAVE TIME", b: "MORE LIFE" },
          { icon: <Share2 size={22} />, a: "UNMATCHED", b: "CONNECTIVITY" },
          { icon: <Diamond size={22} />, a: "PREMIUM", b: "LIFESTYLE" },
          { icon: <Shield size={22} />, a: "TRUSTED", b: "DEVELOPER" },
          { icon: <Heart size={22} />, a: "DESIGNED FOR", b: "BETTER LIVING" },
        ].map((f) => (
          <div key={f.a} className={styles.feature}>
            {f.icon}
            <div className={styles.featureText}>
              <p>{f.a}</p>
              <p>{f.b}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.sideDock}>
        <button><Phone size={16} /></button>
        <button><MessageCircle size={16} /></button>
        <button><Navigation size={16} /></button>
      </div>
    </main>
  );
}
