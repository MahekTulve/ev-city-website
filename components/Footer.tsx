import React from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import styles from "./Footer.module.css";

const FooterSection = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerVideoBackground}>
        {/* Un-comment when video assets are ready
        <video autoPlay muted loop playsInline preload="none" className={`${styles.footerVideo} ${styles.desktopVideo}`}>
          <source src="images/footer_two.mp4" type="video/mp4" />
        </video>
        <video autoPlay muted loop playsInline preload="none" className={`${styles.footerVideo} ${styles.mobileVideo}`}>
          <source src="images/foooter1.mp4" type="video/mp4" />
        </video> 
        */}
        <div className={styles.videoOverlay}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.top}>
          {/* Brand Column */}
          <div className={styles.brand}>
            <img
              src="/images/logo.png"
              alt="E V Group Logo"
              loading="lazy"
              decoding="async"
            />
            <p className={styles.footerText}>
              Luxury waterfront living crafted for comfort, elegance, and modern lifestyles.
            </p>
            <div className={styles.socials}>
              <a href="https://www.facebook.com/evgindia" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/evhomesofficial" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/company/ev-homes" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="https://www.youtube.com/@evhomes3892" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li><a href="#evHomes">About Us</a></li>
              <li><a href="https://app.monstercampaigns.com/c/suwgu4evn9yahzpkw5hq/">Contact</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className={styles.colTitle}>Get in Touch</h4>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>For Bookings</span>
              <a href="https://wa.me/918291668777" target="_blank" rel="noopener noreferrer">
                +91 82916 68777
              </a>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactLabel}>Official Website</span>
              <a href="https://www.evgroup.in/home.html" target="_blank" rel="noopener noreferrer">
                www.evgroup.in
              </a>
            </div>
          </div>

          {/* Projects Column */}
          <div>
            <h4 className={styles.colTitle}>Our Projects</h4>
            <ul className={styles.linkList}>
              <li><a href="#marina">EV 10 Marina Bay</a></li>
              <li><a href="#malibu">EV 23 Malibu West</a></li>
              <li><a href="#square">EV 9 Square</a></li>
              <li><a href="#solaries">Solaries</a></li>
            </ul>
          </div>

          {/* Location Map Column */}
          <div>
            <h4 className={styles.colTitle}>Location</h4>
            <div
              className={styles.footerMap}
              // onClick={() =>
              //   window.open(
              //     "https://www.google.com/maps/place/EV+-+10+Marina+Bay/@19.083533,72.996246,692m/data=!3m1!1e3!4m6!3m5!1s0x3be7c198d6327a0b:0xb7a8dd3bd3c83e8f!8m2!3d19.0831975!4d72.9992938!16s%2Fg%2F11j5g85dyg",
              //     "_blank"
              //   )
              // }
            >
              <iframe
                src="https://www.google.com/maps?q=E.v+Homes+Vashi+Navi+Mumbai&z=15&output=embed"
                loading="lazy"
                title="Location Map"
              ></iframe>
              <div className={styles.mapOverlay}>
                <span>View Map</span>
              </div>
            </div>

            <div className={styles.addressContainer}>
              <p>
                2nd Floor, Office No A-212, Vardhaman Chambers, Sector-17, Vashi, Navi Mumbai, 400703.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottom}>
          <div>© {new Date().getFullYear()} E V Group. All rights reserved.</div>
          <nav>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#sitemap">Sitemap</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;