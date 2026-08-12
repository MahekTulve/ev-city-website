import styles from "./extraordinary.module.css";
import { FaSquareFull } from "react-icons/fa";
import { motion, Variants } from "framer-motion";

interface ExtraordinaryProps {
  isEntering: boolean;
  isActive: boolean;
  isFinal: boolean;
  isStepThree: boolean;
  isStepFour: boolean;
  isStepFive: boolean;
  isStepSix: boolean;
  isVideoActive: boolean;
}

export default function VashiLetter({
  isEntering,
  isActive,
  isFinal,
  isStepThree,
  isStepFour,
  isVideoActive,
  isStepFive,
  isStepSix,
}: ExtraordinaryProps) {
  const sectionClass = `
    ${styles.extraordinarySection}
    ${isEntering ? styles.extraordinarySection : styles.extraordinarySection}
    ${isStepSix ? styles.extraordinarySection : styles.extraordinarySection}
  `;

  const leftContentClass = `${styles.leftContent} ${
    isFinal
      ? styles.textDisappear
      : isEntering
        ? styles.textMoveToPosition
        : styles.textCentered
  }`;

  const containerClass = `${styles.container} ${
    isStepThree
      ? styles.containerExitUp
      : isFinal
        ? styles.containerFinalStage
        : isEntering
          ? styles.containerReveal
          : styles.containerHidden
  }`;

  const stepThreeClass = `${styles.stepThreeContainer} ${
    isStepFour
      ? styles.stepThreeExitUp
      : isStepThree
        ? styles.stepThreeReveal
        : styles.stepThreeHidden
  }`;

  const stepFourClass = `${styles.stepFourContainer} ${
    isStepFive
      ? styles.stepFourExitUp
      : isStepFour
        ? styles.stepFourReveal
        : styles.stepFourHidden
  }`;

  const stepFiveClass = `${styles.stepFiveContainer} ${
    isStepSix
      ? styles.stepFiveExitUp
      : isStepFive
        ? styles.stepFiveReveal
        : styles.stepFiveHidden
  }`;

  const stepSixClass = `${styles.stepSixContainer} ${
    isStepSix ? styles.stepSixReveal : styles.stepSixHidden
  } ${isVideoActive ? styles.section3ShiftLeft : ""}`;

  const showCircle =
    isFinal ||
    isStepThree ||
    isStepFour ||
    isStepFive ||
    isStepSix;

  const showTransitionClouds =
    !isFinal &&
    !isStepThree &&
    !isStepFour &&
    !isStepFive &&
    !isStepSix;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const blockWordVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.85,
      y: 40,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 50,
      },
    },
  };

  return (
    <section className={sectionClass}>
      <div
        className={styles.cloudVeil}
        aria-hidden="true"
        style={{
          opacity: showTransitionClouds ? 1 : 0,
        }}
      />

      <div
        className={styles.cloudTransition}
        aria-hidden="true"
        style={{
          opacity: showTransitionClouds ? 1 : 0,
        }}
      >
        <div className={styles.cloudCore} />

        <div className={styles.cloudMarquee}>
          {[0, 1].map((groupIndex) => (
            <div
              className={styles.cloudGroup}
              key={groupIndex}
            >
              {[0, 1, 2, 3].map((itemIndex) => {
                const flipped = itemIndex % 2 === 1;

                return (
                  <div
                    className={styles.cloudItem}
                    key={itemIndex}
                  >
                    <img
                      src="/images/cloud_1.avif"
                      alt=""
                      className={`${styles.cloudImage} ${
                        flipped
                          ? styles.cloudImageFlipped
                          : ""
                      } ${
                        itemIndex === 1
                          ? styles.cloudImageB
                          : itemIndex === 2
                            ? styles.cloudImageC
                            : itemIndex === 3
                              ? styles.cloudImageD
                              : styles.cloudImageA
                      }`}
                      draggable={false}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {showCircle && (
        <div className={styles.circle}>
          {["V", "A", "S", "H", "I"].map(
            (letter, index) => {
              let isActiveLetter = false;

              if (isStepSix) {
                isActiveLetter = letter === "I";
              } else if (isStepFive) {
                isActiveLetter = letter === "H";
              } else if (isStepFour) {
                isActiveLetter = letter === "S";
              } else if (isStepThree) {
                isActiveLetter = letter === "A";
              } else if (isFinal) {
                isActiveLetter = letter === "V";
              }

              return (
                <div
                  key={index}
                  className={`${styles.circleV} ${
                    isActiveLetter
                      ? styles.activeLetter
                      : ""
                  }`}
                >
                  {letter}
                </div>
              );
            }
          )}
        </div>
      )}

      <div className={styles.maincontainer}>
        <div className={leftContentClass}>
          <motion.p
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: false,
              amount: 0.3,
            }}
            className={styles.mainthe}
          >
            <motion.span
              variants={blockWordVariants}
              className={`${styles.thestart} bg-gradient-to-b from-[#e7bd65] via-[#f2e18b] to-[#b98d3d] bg-clip-text text-transparent transform-gpu`}
            >
              the
            </motion.span>

            <motion.span
              variants={blockWordVariants}
              className={`${styles.fivenumber} bg-gradient-to-b from-[#e7bd65] via-[#f2e18b] to-[#b98d3d] bg-clip-text text-transparent transform-gpu`}
            >
              05
            </motion.span>

            <motion.span
              variants={blockWordVariants}
              className={`${styles.minttop} bg-gradient-to-b from-[#e7bd65] via-[#f2e18b] to-[#b98d3d] bg-clip-text text-transparent transform-gpu`}
            >
              Minute City
            </motion.span>

            <motion.span
              variants={blockWordVariants}
              className={`${styles.vashitop} bg-gradient-to-b from-[#e7bd65] via-[#f2e18b] to-[#b98d3d] bg-clip-text text-transparent transform-gpu`}
            >
              VASHI
            </motion.span>
          </motion.p>
        </div>

        <div className={containerClass}>
          <div className={styles.centerContainer}>
            <div
              className={styles.dotgridtwo}
              aria-hidden="true"
            />

            <div
              className={`${styles.bgcircle} ${
                isFinal
                  ? styles.bgcircleremove
                  : ""
              }`}
            />

            <div
              className={`${styles.cornerHighlight} ${
                isFinal
                  ? styles.bgcircleremove
                  : ""
              }`}
            />

            <div
              className={`${styles.imageWrapper} ${
                isFinal ? styles.imageLarge : ""
              }`}
            >
              <img
                src="/images/VletterImag.png"
                alt="Minimalist Architectural High-rise Tower"
                className={styles.buildingImage}
              />
            </div>
          </div>

          <div
            className={`${styles.rightContent} ${
              isFinal
                ? styles.rightContentLarge
                : ""
            }`}
          >
            <h4 className={styles.headingRight}>
              V
            </h4>

            <div className={styles.diviDescrip}>
              <div className={styles.divider} />

              <span className={styles.letterspace}>
                VALUE
              </span>

              <p className={styles.description}>
                <br />

                <span
                  className={
                    styles.letterspaSecon
                  }
                >
                  The rarest luxury
                  <br />
                  isn&apos;t space. It&apos;s{" "}
                  <span
                    style={{
                      color: "#f8c367",
                      fontStyle: "italic",
                    }}
                  >
                    time.
                  </span>
                </span>

                <br />

                <FaSquareFull
                  className={`${styles.activeIcon} ${
                    isFinal
                      ? styles.lettersIcon
                      : ""
                  }`}
                />

                A city that gives you back the
                moments usually lost in traffic.
              </p>
            </div>

            <div
              className={styles.dotgrid}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className={stepThreeClass}>
          <div
            className={`${styles.step3LeftContent} ${
              isStepThree
                ? styles.step3TextScaleUp
                : styles.step3TextScaleDown
            }`}
          >
            <h4 className={styles.step3Heading}>
              A
            </h4>

            <div
              className={
                styles.diviStep3Descrip
              }
            >
              <div
                className={styles.step3Divider}
              />

              <span className={styles.letterA}>
                ACCESS
              </span>

              <p
                className={
                  styles.step3Description
                }
              >
                <br />

                <span
                  className={
                    styles.letterspaAsec
                  }
                >
                  The rarest luxury
                  <br />
                  isn&apos;t space. It&apos;s
                  <span
                    style={{
                      color: "#e7bd65",
                      fontStyle: "italic",
                    }}
                  >
                    {" "}
                    time.
                  </span>
                </span>

                <FaSquareFull
                  className={
                    styles.lettersIcon
                  }
                />

                A city where everything you need…
                feels effortlessly close.
              </p>
            </div>
          </div>

          <div
            className={
              styles.step3RightContainer
            }
          >
            <div
              className={styles.dotgridtwo}
              aria-hidden="true"
            />

            <div
              className={`${styles.step3ImageWrapper} ${
                isStepThree
                  ? styles.step3ImageExpanded
                  : styles.step3ImageSquare
              }`}
            >
              <img
                src="/images/letterA.png"
                alt="Modern Luxury Villa Exterior"
                className={styles.buildingImage}
              />
            </div>

            <div
              className={styles.dotALettgrid}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className={stepFourClass}>
          <div
            className={
              styles.step4LeftContainer
            }
          >
            <div
              className={styles.dotgridtwo}
              aria-hidden="true"
            />

            <div
              className={`${styles.step4ImageWrapper} ${
                isStepFour
                  ? styles.step4ImageExpanded
                  : styles.step4ImageSquare
              }`}
            >
              <img
                src="/images/VletterImag.png"
                alt="S"
                className={styles.buildingImage}
              />
            </div>
          </div>

          <div
            className={`${styles.step4RightContent} ${
              isStepFour
                ? styles.step4TextScaleUp
                : styles.step4TextScaleDown
            }`}
          >
            <h4 className={styles.step4Heading}>
              S
            </h4>

            <div
              className={
                styles.diviDescripcon
              }
            >
              <div
                className={styles.step4Divider}
              />

              <span
                className={styles.lettersSle}
              >
                Smart Living
              </span>

              <p
                className={
                  styles.step4Description
                }
              >
                <br />

                <span
                  className={
                    styles.letterspaSecontext
                  }
                >
                  The rarest luxury
                  <br />
                  isn&apos;t space. It&apos;s{" "}
                  <span
                    style={{
                      color: "#e7bd65",
                      fontStyle: "italic",
                    }}
                  >
                    time.
                  </span>
                </span>

                <br />

                <FaSquareFull
                  className={
                    styles.lettersIcon
                  }
                />

                A city that gives you back the
                moments usually lost in traffic.
              </p>
            </div>

            <div
              className={styles.dotgrid}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className={stepFiveClass}>
          <div
            className={`${styles.step5LeftContent} ${
              isStepFive
                ? styles.step5TextScaleUp
                : styles.step5TextScaleDown
            }`}
          >
            <h4 className={styles.step5Heading}>
              H
            </h4>

            <div
              className={
                styles.diviStep3Descrip
              }
            >
              <div
                className={styles.step5Divider}
              />

              <span className={styles.letterA}>
                ACCESS
              </span>

              <p
                className={
                  styles.step5Description
                }
              >
                <br />

                <span
                  className={
                    styles.letterspaAsec
                  }
                >
                  The rarest luxury
                  <br />
                  isn&apos;t space. It&apos;s{" "}
                  <span
                    style={{
                      color: "#e7bd65",
                      fontStyle: "italic",
                    }}
                  >
                    time.
                  </span>
                </span>

                <FaSquareFull
                  className={
                    styles.lettersIcon
                  }
                />

                A city where everything you need…
                feels effortlessly close.
              </p>
            </div>
          </div>

          <div
            className={
              styles.step5RightContainer
            }
          >
            <div
              className={styles.dotgridtwo}
              aria-hidden="true"
            />

            <div
              className={`${styles.step5ImageWrapper} ${
                isStepFive
                  ? styles.step5ImageExpanded
                  : styles.step5ImageSquare
              }`}
            >
              <img
                src="/images/letterA.png"
                alt="H"
                className={styles.buildingImage}
              />
            </div>

            <div
              className={styles.dotALettgrid}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className={stepSixClass}>
          <div
            className={
              styles.step6LeftContainer
            }
          >
            <div
              className={styles.dotgridtwo}
              aria-hidden="true"
            />

            <div
              className={`${styles.step6ImageWrapper} ${
                isStepSix
                  ? styles.step6ImageExpanded
                  : styles.step6ImageSquare
              }`}
            >
              <img
                src="/images/VletterImag.png"
                alt="I"
                className={styles.buildingImage}
              />
            </div>
          </div>

          <div
            className={`${styles.step6RightContent} ${
              isStepSix
                ? styles.step6TextScaleUp
                : styles.step6TextScaleDown
            }`}
          >
            <h4 className={styles.step6Heading}>
              I
            </h4>

            <div
              className={
                styles.diviDescripcon
              }
            >
              <div
                className={styles.step6Divider}
              />

              <span
                className={styles.lettersSle}
              >
                VALUE
              </span>

              <p
                className={
                  styles.step6Description
                }
              >
                <br />

                <span
                  className={
                    styles.letterspaSecontext
                  }
                >
                  The rarest luxury
                  <br />
                  isn&apos;t space. It&apos;s{" "}
                  <span
                    style={{
                      color: "#e7bd65",
                      fontStyle: "italic",
                    }}
                  >
                    time.
                  </span>
                </span>

                <br />

                <FaSquareFull
                  className={
                    styles.lettersIcon
                  }
                />

                A city that gives you back the
                moments usually lost in traffic.
              </p>
            </div>

            <div
              className={styles.dotgrid}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}