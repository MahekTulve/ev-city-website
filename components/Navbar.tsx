"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import styles from "./Navbar.module.css";
import { useMediaQuery } from "./performance/useMediaQuery";

export const Navbar: React.FC = () => {
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");

  useEffect(() => {
    let lastScrolled = window.scrollY > 5;
    setIsScrolled(lastScrolled);

    const handleScroll = () => {
      const nextScrolled = window.scrollY > 5;
      if (nextScrolled === lastScrolled) return;

      lastScrolled = nextScrolled;
      setIsScrolled(nextScrolled);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(
    () => {
      const container = navRef.current;
      if (!container || window.matchMedia("(max-width: 768px)").matches) {
        return;
      }

      const links = container.querySelectorAll<HTMLElement>(`.${styles.lnNavbarLink}`);
      const highlight = highlightRef.current;
      const logo = container.querySelector<HTMLElement>(`.${styles.lnNavbarLogo}`);
      const divider = container.querySelector<HTMLElement>(`.${styles.lnNavbarDivider}`);
      const rightSideElements = container.querySelectorAll<HTMLElement>(
        `.${styles.lnNavbarPro}, .${styles.lnNavbarBrowse}`,
      );
      const navBarInner = container.querySelector<HTMLElement>(`.${styles.lnNavbarInner}`);

      if (!links.length || !highlight || !navBarInner) return;

      const timeline = gsap.timeline({ defaults: { ease: "power4.out" } });
      const targetsToHide: HTMLElement[] = [];

      if (logo) targetsToHide.push(logo);
      if (divider) targetsToHide.push(divider);
      targetsToHide.push(...(Array.from(links) as HTMLElement[]));
      targetsToHide.push(...(Array.from(rightSideElements) as HTMLElement[]));

      if (targetsToHide.length) {
        gsap.set(targetsToHide, { opacity: 0, y: -15 });
      }
      gsap.set(navBarInner, { scaleX: 0.9, opacity: 0 });
      gsap.set(highlight, { opacity: 0, scale: 0.85 });

      timeline.to(navBarInner, { scaleX: 1, opacity: 1, duration: 0.8 });

      if (logo) {
        timeline.to(logo, { opacity: 1, y: 0, duration: 0.5 }, "-=0.4");
      }
      if (divider) {
        timeline.to(divider, { opacity: 0.3, y: 0, duration: 0.3 }, "-=0.3");
      }

      timeline.to(
        Array.from(links),
        { opacity: 0.75, y: 0, duration: 0.5, stagger: 0.08 },
        "-=0.3",
      );

      if (rightSideElements.length) {
        timeline.to(
          Array.from(rightSideElements),
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 },
          "-=0.4",
        );
      }

      const enterHandlers = new Map<HTMLElement, EventListener>();

      links.forEach((link) => {
        const handleMouseEnter: EventListener = (event) => {
          const target = event.currentTarget as HTMLElement;
          const { offsetLeft, offsetWidth, offsetHeight } = target;

          gsap.to(highlight, {
            x: offsetLeft,
            width: offsetWidth,
            height: offsetHeight,
            opacity: 1,
            scale: 1,
            duration: 0.35,
            ease: "power3.out",
            overwrite: "auto",
          });
        };

        enterHandlers.set(link, handleMouseEnter);
        link.addEventListener("mouseenter", handleMouseEnter);
      });

      const handleMouseLeave = () => {
        gsap.to(highlight, {
          opacity: 0,
          scale: 0.85,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });
      };

      container.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        enterHandlers.forEach((handler, link) => {
          link.removeEventListener("mouseenter", handler);
        });
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { scope: navRef },
  );

  useEffect(() => {
    if (!mobileMenuOpen || !mobileMenuRef.current || !isMobile) return;

    gsap.fromTo(
      mobileMenuRef.current,
      { x: "100%" },
      {
        x: "0%",
        duration: 0.5,
        ease: "power4.out",
      },
    );
  }, [isMobile, mobileMenuOpen]);

  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);

  return (
    <header
      className={`${styles.landingWrapper} ${styles.lnLoaded}`}
      ref={navRef}
    >
      <div
        className={`${styles.lnNavbar} ${
          isScrolled ? styles.lnNavbarScrolled : ""
        }`}
      >
        <div className={styles.lnNavbarInner}>
          <div className={styles.lnNavbarLeft}>
            {!isMobile && (
              <>
                <Link href="/" className={styles.lnNavbarLogo}>
                  EV CITY
                </Link>
                <span className={styles.lnNavbarDivider}>/</span>

                <nav className={styles.lnNavbarLinks}>
                  <div
                    className={styles.lnNavbarLinkHighlight}
                    ref={highlightRef}
                  />
                  <Link href="/" className={styles.lnNavbarLink}>
                    Home
                  </Link>
                  <Link href="/about" className={styles.lnNavbarLink}>
                    About
                  </Link>
                  <Link href="/features" className={styles.lnNavbarLink}>
                    Projects
                  </Link>
                  <Link href="/5min-city" className={styles.lnNavbarLink}>
                    5 Min City
                  </Link>
                </nav>
              </>
            )}
          </div>

          <div className={styles.lnNavbarRight}>
            {isMobile ? (
              <button
                className={styles.lnNavbarHamburger}
                aria-label="Menu"
                aria-expanded={mobileMenuOpen}
                onClick={() => setMobileMenuOpen((open) => !open)}
              >
                <span />
                <span />
                <span />
              </button>
            ) : (
              <a
                href="https://pro.reactbits.dev"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.lnNavbarPro}
              >
                ENQUIRE NOW
              </a>
            )}
          </div>
        </div>
      </div>

      {isMobile && mobileMenuOpen && (
        <>
          <div
            className={styles.sidebarOverlay}
            onClick={() => setMobileMenuOpen(false)}
          />

          <aside ref={mobileMenuRef} className={styles.mobileSidebar}>
            <button
              className={styles.closeButton}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ✕
            </button>

            <nav className={styles.mobileNav}>
              <Link
                href="/"
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/features"
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                Projects
              </Link>
              <Link
                href="/5min-city"
                className={styles.mobileNavLink}
                onClick={() => setMobileMenuOpen(false)}
              >
                5 Min City
              </Link>
              <a
                href="#"
                className={styles.mobileEnquire}
                onClick={() => setMobileMenuOpen(false)}
              >
                ENQUIRE NOW
              </a>
            </nav>
          </aside>
        </>
      )}
    </header>
  );
};
