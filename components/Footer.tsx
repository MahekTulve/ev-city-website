import { FaInstagram } from "react-icons/fa6";
import styles from "./Footer.module.css"
import { FaFacebookF, FaLinkedinIn, FaYoutube } from "react-icons/fa";
const FooterSection = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.footerVideoBackground}>
        {/* <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className={`${styles.footerVideo} ${styles.desktopVideo}`}
        >
          <source src="images/footer_two.mp4" type="video/mp4" />
        </video>

        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          className={`${styles.footerVideo} ${styles.mobileVideo}`}
        >
          <source src="images/foooter1.mp4" type="video/mp4" />
        </video> */}

        <div className={styles.videoOverlay}></div>
      </div>

      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <img
              src="/images/logo.png"
              alt="10 Marina Bay Logo"
              loading="lazy"
              decoding="async"
            />
            <p className={styles.footerText}>
              Luxury waterfront living crafted for comfort, elegance, and modern
              lifestyles.
            </p>
            <div className={styles.socials}>
              <a
                href="https://www.facebook.com/evgindia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/evhomesofficial"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/company/ev-homes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.youtube.com/@evhomes3892"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="#evHomes">About</a>
              </li>
              <li>
                <a
                  href="https://app.monstercampaigns.com/c/suwgu4evn9yahzpkw5hq/"
                  target="_self"
                  rel="noopener noreferrer"
                >
                  Contact
                </a>
              </li>
              <li>
                Privacy Policy
              </li>
              <li>
                Terms & Conditions
              </li>
            </ul>
          </div>

          <div className={styles.contactCol}>
            <h4 className={styles.colTitle}>Get in Touch</h4>
            <div className={styles.contactItem}>
              <span>
                <strong> 📞 For Bookings</strong>
                <a
                  href="https://wa.me/918291668777"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  +91 82916 68777
                </a>
              </span>
            </div>
            <div className={styles.contactItem}>
              <span>
                <strong> ✉️ Website</strong>
                <a
                  href="https://www.evgroup.in/home.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  www.evgroup.in
                </a>
              </span>
            </div>
          </div>
          <div className={styles.linksCol}>
            <h4 className={styles.colTitle}>Our Project</h4>
            <ul className={styles.linkList}>
              <li>
                EV 10 Marina Bay
              </li>
              <li>
                EV 23 Malibu West
              </li>
              <li>
                EV 9 Square
              </li>
              <li>
                Solaries
              </li>
            </ul>
          </div>
          <div className={styles.mapCol}>
            <h4 className={styles.colTitle}>Explore</h4>
            <div
              className={styles.footerMap}
            // onClick={() =>
            //   window.open(
            //     "https://www.google.com/maps/place/EV+-+10+Marina+Bay/@19.083533,72.996246,692m/data=!3m1!1e3!4m6!3m5!1s0x3be7c198d6327a0b:0xb7a8dd3bd3c83e8f!8m2!3d19.0831975!4d72.9992938!16s%2Fg%2F11j5g85dyg?entry=ttu&g_ep=EgoyMDI2MDUwNi4wIKXMDSoASAFQAw%3D%3D",
            //     "_blank",
            //   )
            // }
            >
              <iframe
                src="https://www.google.com/maps?q=E.v+Homes+Vashi+Navi+Mumbai&z=15&output=embed"
                loading="lazy"
                title="Location Map"
              ></iframe>
              <div className={styles.mapOverlay}>
                <span>View Location</span>
              </div>
            </div>

            <div className={styles.addressContainer}>
              <p>
                2nd Floor, Office No A-212, Vardhaman Chambers, Plot No-84,
                Sector-17, <br />
                Vashi, Navi Mumbai, 400703.
              </p>
            </div>
          </div>


        </div>

        <div className={styles.bottom}>
          <div>
            © {new Date().getFullYear()} E V Group. All rights reserved.
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterSection;
