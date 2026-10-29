import { useState } from "react";
import styles from "./Enquirydialog.module.css"

interface EnquiryDialogProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function EnquiryDialog({ isOpen, onClose }: EnquiryDialogProps) {
    const [formData, setFormData] = useState({
        name: "",
        countryCode: "+91",
        phone: "",
        email: "",
        optIn: true,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const { name, value } = target;
        const checked = target instanceof HTMLInputElement ? target.checked : false;
        const type = target.type;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Submitted (Dummy):", formData);
        alert("Form submitted successfully! (Dummy)");
        handleClose();
    };

    const handleClose = () => {
        setFormData({
            name: "",
            countryCode: "+91",
            phone: "",
            email: "",
            optIn: true,
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles["aspire-enquiry-wrapper"]}>
            <div className={styles["dialog-overlay"]} onClick={handleClose}>
                <div className={styles["dialog-content"]} onClick={(e) => e.stopPropagation()}>
                    <button className={styles["close-btn"]} onClick={handleClose} aria-label="Close dialog">
                        ×
                    </button>

                    <div className={styles["dialog-header"]}>
                        <h2 className={styles["dialog-title"]}>Live More. Travel Less.</h2>
                        <p className={styles["dialog-subtitle"]}>
                          Discover a smarter way to live, where everything you need is just five minutes away.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles["dialog-form"]}>
                        <div className={styles["form-group"]}>
                            <label className={styles["form-label"]}>
                                <span className={styles["required"]}>*</span>Full Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={styles["form-input"]}
                                placeholder="Enter your full name"
                                required
                                autoComplete="off"
                            />
                        </div>

                        <div className={styles["form-row"]}>
                            <div className={styles["form-group"]}>
                                <label className={styles["form-label"]}>
                                    <span className={styles["required"]}>*</span>Mobile Number
                                </label>
                                <div style={{ display: "flex", gap: "8px" }}>
                                    <select
                                        name="countryCode"
                                        value={formData.countryCode}
                                        onChange={handleInputChange}
                                        className={styles["form-select"]}
                                        style={{ width: "auto", minWidth: "120px" }}
                                    >
                                        <option value="+91">+91 (India)</option>
                                    </select>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className={styles["form-input"]}
                                        autoComplete="off"
                                        placeholder="Enter your phone"
                                        required
                                    />
                                </div>
                            </div>

                            <div className={styles["form-group"]}>
                                <label className={styles["form-label"]}>
                                    <span className={styles["required"]}>*</span>Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={styles["form-input"]}
                                    placeholder="Enter your email address"
                                    autoComplete="off"
                                    required
                                />
                            </div>
                        </div>

                        <div className={styles["form-checkbox"]}>
                            <input
                                type="checkbox"
                                id="optIn"
                                name="optIn"
                                checked={formData.optIn}
                                onChange={handleInputChange}
                                className={styles["checkbox-input"]}
                            />
                            <label htmlFor="optIn" className={styles["checkbox-label"]}>
                                I would like to receive curated updates, private previews, and exclusive offers via WhatsApp, Email, SMS, or Call.
                            </label>
                        </div>

                        <button type="submit" className={styles["submit-btn"]}>
                            Begin Your Next Chapter →
                        </button>
                    </form>

                    <div className={styles["dialog-footer"]}>
                        <p className={styles["footer-text"]}>
                            Your Private Consultation Awaits: <span className={styles["phone-number"]}>+91 8291668777</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}