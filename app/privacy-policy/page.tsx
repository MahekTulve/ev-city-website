'use client'
import React, { useEffect } from 'react';
import styles from './PrivacyPolicy.module.css';

const PrivacyPolicy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleClose = () => {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = "/";
        }
    };

    return (
        <div className={styles.pageContainer}>
            <button
                className={styles.closeButton}
                onClick={handleClose}
                aria-label="Close"
            >
                ✕
            </button>
            <div className={styles.wrapper}>

                {/* Header */}
                <header className={styles.header}>
                    <h1 className={styles.title}>Privacy Policy</h1>
                    <div className={styles.divider}></div>
                    <p className={styles.subtitle}>At <span>EV Homes Constructions Private Limited</span> Project <span>EV CITY</span>, accessible from <a href='https://ev-city-website.vercel.app/' className={styles.sublink}>ev-city-website.vercel.app</a>, we are committed to protecting and respecting your privacy. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website.</p>

                </header>

                {/* Content Sections */}
                <main>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>1. Information We Collect</h2>
                        <ul className={styles.list}>
                            <li className={styles.listItembold}>
                                Personal Information
                            </li>
                        </ul>
                        <p className={styles.paragraph}>
                            This includes names, email addresses, phone numbers, and any other contact details you voluntarily provide when you fill out a form on our website.
                        </p>
                        <ul className={styles.list}>
                            <li className={styles.listItembold}>
                                Non-Personal Information
                            </li>
                        </ul>
                        <p className={styles.paragraph}>
                            We may collect information about how you access our website, including your IP address, browser type, device information, and browsing behavior.
                        </p>
                    </section>

                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>2. How We Use Your Information</h2>

                        <ul className={styles.list}>
                            <li className={styles.listItem}>To provide information and services that you request (e.g., property details, newsletters).</li>
                            <li className={styles.listItem}>To improve our website and tailor it to user preferences.</li>
                            <li className={styles.listItem}>To communicate with you, including responding to inquiries or sending marketing materials with your consent.</li>
                            <li className={styles.listItem}>To comply with legal requirements.</li>

                        </ul>
                    </section>

                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>3. Data Security</h2>
                        <p className={styles.paragraph}>
                            We take reasonable measures to protect the personal information we collect from unauthorized access, disclosure, alteration, or destruction. Your data is stored on secure servers, and we use industry-standard practices to ensure its safety.
                        </p>
                    </section>

                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}><span className={styles.dontFamily}>4.</span> Third<span className={styles.dontFamily}>-</span>Party Services</h2>
                        <p className={styles.paragraph}>
                            We may use third-party services (such as Google Analytics) to analyze traffic and improve our website. These third-party services may collect non-personal information about your usage of our site.
                        </p>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>5. Cookies</h2>
                        <p className={styles.paragraph}>
                            Our website uses cookies to improve your browsing experience. Cookies are small files stored on your device that help us understand your preferences and usage patterns. You can choose to disable cookies in your browser settings, but doing so may affect your experience on our site.
                        </p>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>6. Your Rights</h2>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>Request access to the personal information we hold about you.</li>
                            <li className={styles.listItem}>Request correction of any inaccurate information.</li>
                            <li className={styles.listItem}>Request deletion of your personal information, subject to legal obligations.</li>
                            <li className={styles.listItem}>Withdraw your consent to data processing at any time.</li>

                        </ul>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>7. Changes to This Policy</h2>
                        <p className={styles.paragraph}>
                            We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the effective date will be updated accordingly.
                        </p>
                    </section>
                    <section className={styles.contactBox}>
                        <h3 className={styles.contactTitle}>Contact Us</h3>
                        <p className={styles.paragraph} style={{ textAlign: 'center', marginBottom: 0, }}>
                            <a href="tel:+919820909893">
                                Phone:+<span className={styles.contLast}>91 9820909893</span><br />
                            </a>

                            <a href="mailto:sales@evhomes.net" className={styles.link}>
                                sales@evhomes.net
                            </a>
                        </p>
                    </section>
                </main>

            </div>
        </div>
    );
};

export default PrivacyPolicy;