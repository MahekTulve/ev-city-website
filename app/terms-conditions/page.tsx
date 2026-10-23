'use client'
import React, { useEffect } from 'react';
import styles from '../privacy-policy/PrivacyPolicy.module.css';

const TermsCondition: React.FC = () => {
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
                    <h1 className={styles.title}>Terms and Conditions</h1>
                    <div className={styles.divider}></div>
                    <p className={styles.subtitle}>Welcome to the <span>EV CITY</span> website by<span> EV Homes Constructions Pvt. Ltd.</span> By accessing or using this website, you agree to these <span>Terms and Conditions</span>. Please read them carefully.</p>

                </header>

                {/* Content Sections */}
                <main>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>1. Project Information</h2>
                        <p className={styles.paragraph}>
                            EV CITY presents a vision of connected urban living inspired by Copenhagen’s people-centric city planning and five-minute city philosophy, focusing on convenience, connectivity, nature, and community.
                            <br />
                            <b>Website :</b> <a href='https://ev-city-website.vercel.app/' className={styles.sublink}>ev-city-website.vercel.app</a>
                        </p>

                    </section>

                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>2. Rights to Advertise</h2>
                        <p className={styles.paragraph}>
                            EV Homes Constructions Pvt. Ltd. may market and advertise EV CITY developments to the extent authorised and subject to applicable approvals and regulatory requirements.   </p>

                    </section>

                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>3. Disclaimer</h2>
                        <p className={styles.paragraph}>
                            The information on this website is provided for general informational purposes only and does not constitute a binding offer to sell.
                            <br />
                            Information may change without prior notice. Visitors should verify relevant project details before making any property-related decision. </p>
                    </section>

                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}><span className={styles.dontFamily}>4.</span> Pricing and Availability</h2>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>This website presents the EV CITY concept and does not display property prices.</li>
                            <li className={styles.listItem}>Property prices and availability are subject to confirmation by the respective project team.</li>
                            <li className={styles.listItem}>For pricing or booking enquiries, please contact the relevant sales team.</li>

                        </ul>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>5. Communication and Marketing</h2>
                        <p className={styles.paragraph}>
                            When you provide your contact details, we may use them to respond to your enquiries and share relevant information, subject to applicable consent requirements.
                            <br />
                            Marketing communications may be sent by phone, SMS, WhatsApp, or email where permitted.
                            <br />
                            You may opt out of marketing communications at any time by contacting us or using the available unsubscribe option.
                        </p>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>6. Legal Compliance and Registration</h2>
                        <p className={styles.paragraph}>
                            Individual EV CITY developments are subject to their respective legal and regulatory requirements.
                            Visitors should verify applicable approvals and MahaRERA registration details on the official MahaRERA website.
                        </p>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>7. Intellectual Property</h2>
                        <p className={styles.paragraph}>
                            All content, logos, images, and trademarks displayed on the website are the property of EV Homes Constructions Pvt. Ltd. or its affiliates and are protected under applicable copyright laws.
                            <br />
                            You are prohibited from copying, distributing, or reproducing any content from this website without prior written consent from the company.
                        </p>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>8. Third<span className={styles.dontFamily}>-</span>Party Links</h2>
                        <p className={styles.paragraph}>
                            This website may contain links to third-party websites and services. These links are provided for convenience.
                            <br />
                            EV Homes Constructions Pvt. Ltd. does not control and is not responsible for third-party content or privacy practices.
                            <br />
                            Users should review the relevant third-party terms and privacy policies.</p>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>9. Privacy, Cookies and Browser Storage</h2>
                        <p className={styles.paragraph}>
                            We may collect personal information, such as your name, phone number, or email address, when you voluntarily provide it through available contact or enquiry channels. Cookies and browser storage may be used where applicable for website functionality, preferences, or analytics.
                            <br />
                            Personal information may be shared with authorised service providers, such as website hosting, communication, or analytics providers, where necessary and permitted by law. Please refer to our Privacy Policy for further details.
                        </p>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>10. Personal Data Rights, Deletion and Overseas Processing</h2>
                        <p className={styles.paragraph}>
                            Subject to applicable laws, users may request access to, correction of, or deletion of their personal information and withdraw consent where applicable.
                            <br />
                            Some of our service providers may store or process data outside India. When that happens we rely on providers with appropriate security safeguards, and we will follow any restrictions the Government of India places on such transfers.
                        </p>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>11. Governing Law</h2>
                        <p className={styles.paragraph}>
                            These Terms and Conditions are governed by and construed in accordance with the laws of India.
                            Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in <b>Navi Mumbai, Maharashtra.</b>
                        </p>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>12. Amendments</h2>
                        <p className={styles.paragraph}>
                            EV Homes Constructions Pvt Ltd reserves the right to update or modify these Terms and Conditions at any time without prior notice.
                            <br />
                            It is your responsibility to review these terms periodically for any changes.
                        </p>
                    </section>

                    <section className={styles.contactBox}>
                        <h3 className={styles.contactTitle}>Contact Us</h3>
                        <p className={styles.paragraph} style={{ textAlign: 'center', marginBottom: 0, }}>
                            <b>Corporate Office: </b>
                            <span className={styles.dontFamily}>
                                2 ND FLOOR, OFFICE NO A-212,
                                VARDHAMAN CHEMBERS,
                                PLOT NO 84, SECTOR 17,
                                VASHI, NAVI MUMBAI,
                                Mumbai City, Maharashtra, 400703
                            </span>

                            <br />
                            <a href="tel:+919820909893" style={{ marginTop: "20" }}>
                                <b>Phone:</b> +<span className={styles.contLast}>91 9820909893</span> <br />
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

export default TermsCondition;