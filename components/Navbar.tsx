// app/components/Navbar.tsx
import Link from 'next/link';
import styles from './Navbar.module.css'; // CSS Module ko import kiya

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          EV City
        </Link>
      </div>
      
      <div className={styles.navLinks}>
        <Link href="/" className={styles.link}>
          Home
        </Link>
        <Link href="/about" className={styles.link}>
          About
        </Link>
         <Link href="/projects" className={styles.link}>
          Projects
        </Link>
        <Link href="/5min-city" className={styles.link}>
          5 Min City
        </Link>
      </div>
    </nav>
  );
}