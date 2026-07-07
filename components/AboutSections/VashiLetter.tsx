import Image from "next/image";
import styles from "./extraordinary.module.css";
import { RxComponentInstance } from "react-icons/rx";
import { FaSquareFull } from "react-icons/fa";

interface ExtraordinaryProps {
    isEntering: boolean;
    isActive: boolean;
    isFinal: boolean;
    isStepThree: boolean;
    isStepFour: boolean; // Received here
    isStepFive: boolean; // Received here
    isStepSix: boolean;  // Received here
    isVideoActive: boolean;
}

export default function VashiLetter({ isEntering, isActive, isFinal, isStepThree, isStepFour, isVideoActive, isStepFive, isStepSix, }: ExtraordinaryProps) {

    const sectionClass = `${styles.extraordinarySection} ${isEntering ? styles.slideInActive : styles.slideOutBelow} `;
    const leftContentClass = `${styles.leftContent} ${isFinal ? styles.textDisappear : (isEntering ? styles.textMoveToPosition : styles.textCentered)}`;
    const containerClass = `${styles.container} ${isStepThree ? styles.containerExitUp : (isFinal ? styles.containerFinalStage : (isEntering ? styles.containerReveal : styles.containerHidden))}`;
    const stepThreeClass = `${styles.stepThreeContainer} ${isStepFour ? styles.stepThreeExitUp : (isStepThree ? styles.stepThreeReveal : styles.stepThreeHidden)}`;
    const stepFourClass = `${styles.stepFourContainer} ${isStepFive ? styles.stepFourExitUp : (isStepFour ? styles.stepFourReveal : styles.stepFourHidden)}`;
    const stepFiveClass = `${styles.stepFiveContainer} ${isStepSix ? styles.stepFiveExitUp : (isStepFive ? styles.stepFiveReveal : styles.stepFiveHidden)}`;
    const stepSixClass = `${styles.stepSixContainer} ${isStepSix ? styles.stepSixReveal : styles.stepSixHidden} ${isVideoActive ? styles.section3ShiftLeft : ''}`;
    return (
        <section className={sectionClass}>
            <div className={styles.circle}>
                {['V', 'A', 'S', 'H', 'I'].map((letter, index) => {
                    // Ekdum strict single-selection logic
                    let isActiveLetter = false;

                    if (isStepSix) {
                        isActiveLetter = (letter === 'I');
                    } else if (isStepFive) {
                        isActiveLetter = (letter === 'H');
                    } else if (isStepFour) {
                        isActiveLetter = (letter === 'S');
                    } else if (isStepThree) {
                        isActiveLetter = (letter === 'A');
                    } else if (isFinal) {
                        isActiveLetter = (letter === 'V');
                    }

                    return (
                        <div
                            key={index}
                            className={`${styles.circleV} ${isActiveLetter ? styles.activeLetter : ''}`}
                        >
                            {letter}
                        </div>
                    );
                })}
            </div>
            <div className={styles.maincontainer}>

                {/* --- STEP 1 & 2 CONTENT --- */}
                <div className={leftContentClass}>
                    <p className={styles.titleMain}>5 Minutes City</p>
                    <p className={styles.titleSub}>VASHI</p>
                </div>

                <div className={containerClass}>
                    <div className={styles.centerContainer}>
                        <div className={styles.dotgridtwo} aria-hidden="true"></div>

                        <div className={`${styles.imageWrapper} ${isFinal ? styles.imageLarge : ''}`}>

                            <img
                                src="/images/V_Letter_Imgae.png"
                                alt="Minimalist Architectural High-rise Tower"
                                className={styles.buildingImage}
                            />
                        </div>


                    </div>
                    <div className={`${styles.rightContent} ${isFinal ? styles.rightContentLarge : ''}`}>
                        <h4 className={styles.headingRight}>V</h4>

                        <div className={styles.diviDescrip} >
                            <div className={styles.divider} />
                            <span className={styles.letterspace}>VALUE</span>
                            <p className={styles.description}>
                                <br /><span className={styles.letterspaSecon}>The rarest luxury<br /> isn't space. It's <span style={{ color: "#bfae91", fontStyle: "italic" }}>time.</span></span>
                                <br />

                                <FaSquareFull className={styles.lettersIcon} />
                                A city that gives you back the moments usually lost in traffic.
                            </p>
                        </div>
                        <div className={styles.dotgrid} aria-hidden="true"></div>

                    </div>

                </div>

                {/* --- STEP 3 CONTENT (TEXT LEFT, IMAGE RIGHT) --- */}
                <div className={stepThreeClass}>

                    <div className={`${styles.step3LeftContent} ${isStepThree ? styles.step3TextScaleUp : styles.step3TextScaleDown}`}>
                        <h4 className={styles.step3Heading}>A</h4>

                        <div className={styles.diviStep3Descrip} >
                            <div className={styles.step3Divider} />
                            <span className={styles.letterA}>ACCESS</span>

                            <p className={styles.step3Description}>
                              <br/>  <span className={styles.letterspaAsec}>A city's true measure isn’t distance.<br />It’s how quickly life comes<span style={{ color: "#bfae91", fontStyle: "italic" }}> to you.</span> </span>
                                <FaSquareFull className={styles.lettersIcon} />
                                A city where everything you need… feels effortlessly close.
                            </p>
                        </div>

                    </div>
                    <div className={styles.step3RightContainer}>
                        <div className={styles.dotgridtwo} aria-hidden="true"></div>

                        <div className={`${styles.step3ImageWrapper} ${isStepThree ? styles.step3ImageExpanded : styles.step3ImageSquare}`}>
                            <img
                                src="/images/A_Letter_.png"
                                alt="Modern Luxury Villa Exterior"
                                className={styles.buildingImage}
                            />
                        </div>
                        <div className={styles.dotALettgrid} aria-hidden="true"></div>

                    </div>
                </div>

                {/* --- NEW STEP 4 CONTENT (IMAGE LEFT, TEXT RIGHT) --- */}
                <div className={stepFourClass}>
                    <div className={styles.step4LeftContainer}>
                        <div className={styles.dotgridtwo} aria-hidden="true"></div>

                        <div className={`${styles.step4ImageWrapper} ${isStepFour ? styles.step4ImageExpanded : styles.step4ImageSquare}`}>
                            <img src="/images/V_Letter_Imgae.png" alt="S" className={styles.buildingImage} />
                        </div>
                    </div>
                    <div className={`${styles.step4RightContent} ${isStepFour ? styles.step4TextScaleUp : styles.step4TextScaleDown}`}>
                        <h4 className={styles.step4Heading}>S</h4>
                        <div className={styles.diviDescrip} >

                            <div className={styles.step4Divider} />
                            <span className={styles.lettersSle}>Smart Living</span>
                            <p className={styles.step4Description}>
                                <br /><span className={styles.letterspaSecon}>The rarest luxury<br /> isn't space. It's <span style={{ color: "#bfae91", fontStyle: "italic" }}>time.</span></span>
                                <br />
                                <FaSquareFull className={styles.lettersIcon} />
                                A city that gives you back the moments usually lost in traffic.
                            </p>

                        </div>
                        <div className={styles.dotgrid} aria-hidden="true"></div>

                    </div>
                </div>
                <div className={stepFiveClass}>
                    <div className={`${styles.step5LeftContent} ${isStepFive ? styles.step5TextScaleUp : styles.step5TextScaleDown}`}>
                        <h4 className={styles.step5Heading}>H</h4>
                        <div className={styles.diviStep3Descrip} >
                                <div className={styles.step5Divider} />
                            <span className={styles.letterA}>ACCESS</span>
                        
                            <p className={styles.step5Description}>
                               <br/> <span className={styles.letterspaAsec}>A city's true measure isn’t distance.<br />It’s how quickly life comes<span style={{ color: "#bfae91", fontStyle: "italic" }}> to you.</span> </span>
                                <FaSquareFull className={styles.lettersIcon} />
                                A city where everything you need… feels effortlessly close.

                            </p>

                        </div>
                    </div>
                    <div className={styles.step5RightContainer}>
                        <div className={styles.dotgridtwo} aria-hidden="true"></div>

                        <div className={`${styles.step5ImageWrapper} ${isStepFive ? styles.step5ImageExpanded : styles.step5ImageSquare}`}>
                            <img src="/images/A_Letter_.png" alt="H" className={styles.buildingImage} />
                        </div>
                        <div className={styles.dotALettgrid} aria-hidden="true"></div>

                    </div>
                </div>

                {/* --- NEW STEP 6 CONTENT (I) - Image Left, Text Right --- */}
                <div className={stepSixClass}>
                    <div className={styles.step6LeftContainer}>
                        <div className={styles.dotgridtwo} aria-hidden="true"></div>

                        <div className={`${styles.step6ImageWrapper} ${isStepSix ? styles.step6ImageExpanded : styles.step6ImageSquare}`}>

                            <img src="/images/V_Letter_Imgae.png" alt="I" className={styles.buildingImage} />
                        </div>
                    </div>
                    <div className={`${styles.step6RightContent} ${isStepSix ? styles.step6TextScaleUp : styles.step6TextScaleDown}`}>
                        <h4 className={styles.step6Heading}>I</h4>
                        <div className={styles.diviDescrip} >
                            <div className={styles.step6Divider} />
                            <span className={styles.lettersSle}>VALUE</span>

                            <p className={styles.step6Description}>
                                <br /><span className={styles.letterspaSecon}>The rarest luxury<br /> isn't space. It's <span style={{ color: "#bfae91", fontStyle: "italic" }}>time.</span></span>
                                <br />
                                <FaSquareFull className={styles.lettersIcon} />
                                A city that gives you back the moments usually lost in traffic.

                            </p>

                        </div>
                    </div>
                    <div className={styles.dotgrid} aria-hidden="true"></div>

                </div>
            </div>
        </section>
    );
}