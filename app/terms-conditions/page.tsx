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
                    <p className={styles.subtitle}>Welcome to<span> EV Homes Constructions Pvt Ltd’s</span> website for the <span>EV CITY</span> project. By accessing and using this website, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully before proceeding.</p>

                </header>

                {/* Content Sections */}
                <main>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>1. Project Information</h2>
                        <p className={styles.paragraph}>
                            The EV CITY project is registered under the Maharashtra Real Estate Regulatory Authority (MAHARERA) as per the granted under section 5 of the Act.
                            <br />
                            <b>MAHARERA Registration Number :</b> <span style={{ color: "#d8b86a" }}>P51700028722</span>
                            <br />
                            <b>Website :</b> <a href='https://ev-city-website.vercel.app/' className={styles.sublink}>ev-city-website.vercel.app</a>
                            <br />
                            For detailed project information, you may visit the MAHARERA website or contact our office.
                        </p>

                    </section>

                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>2. Rights To Advertise</h2>
                        <p className={styles.paragraph}>EV Homes Constructions Pvt Ltd has received full rights to Market/Advertise/Sell the apartments in EV CITY vide applicable MAHARERA Registration permissions and approvals.</p>

                    </section>

                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>3. Disclaimer</h2>
                        <p className={styles.paragraph}>
                            The information and content provided on this website are for informational purposes only and do not constitute an offer or invitation to purchase any units or services.
                            <br />
                            All information about the EV CITY project, including prices, availability, and specifications, is subject to change without prior notice.
                            EV Homes Constructions Pvt Ltd strives to ensure the accuracy of the content displayed on this site but does not warrant or guarantee the completeness or correctness of such information.
                            <br />
                            Buyers are encouraged to verify all project-related details from the official MAHARERA website.
                        </p>
                    </section>

                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>4. Pricing and Availability</h2>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>All prices mentioned on this website are indicative and subject to change without prior notice.</li>
                            <li className={styles.listItem}>The availability of properties mentioned on the website is subject to confirmation.</li>
                            <li className={styles.listItem}>Contact our sales team for the most up-to-date pricing and availability information.</li>

                        </ul>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>5. Communication</h2>
                        <p className={styles.paragraph}>
                            By providing your contact details on our website (including phone numbers and email addresses), you agree to receive communication from EV Homes Constructions Pvt Ltd.
                            <br />
                            This may include phone calls, SMS, and emails regarding project updates, offers, or information about our products and services.
                            <br />
                            You can opt out of marketing communication at any time by contacting us or by following the unsubscribe instructions in our emails.
                        </p>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>6. Legal Compliance and Registration</h2>
                        <p className={styles.paragraph}>
                            The EV CITY project is developed and marketed in accordance with the Real Estate (Regulation and Development) Act, granted under section 5.
                            <br />
                            Buyers are encouraged to visit the official MAHARERA website for complete project details, approvals, and registration status.
                        </p>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>7. Intellectual Property</h2>
                        <p className={styles.paragraph}>
                            All content, logos, images, and trademarks displayed on the website are the property of EV Homes Constructions Pvt Ltd or its affiliates and are protected under applicable copyright laws.
                            <br />
                            You are prohibited from copying, distributing, or reproducing any content from this site without prior written consent from the company.
                        </p>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>8. Third-Party Links</h2>
                        <p className={styles.paragraph}>
                            The website may contain links to third-party websites. These links are provided for your convenience and do not imply any endorsement by EV Homes Constructions Pvt Ltd.
                            <br />
                            We are not responsible for the content or privacy practices of such third-party sites.</p>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>9. Limitation of Liability</h2>
                        <p className={styles.paragraph}>
                            EV Homes Constructions Pvt Ltd shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this website or the information provided herein.                       </p>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>10. Governing Law</h2>
                        <p className={styles.paragraph}>
                            These Terms and Conditions are governed by and construed in accordance with the laws of India.
                            <br />
                            Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts located in <b> Navi Mumbai, Maharashtra.</b>
                        </p>
                    </section>
                    <section className={styles.article}>
                        <h2 className={styles.sectionTitle}>11. Amendments</h2>
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