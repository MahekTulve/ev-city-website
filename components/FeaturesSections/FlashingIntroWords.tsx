import { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const WORD_DURATION = 1400; 
const FINISH_HOLD = 1000;   // hold before heading appears

interface FlashingIntroWordsProps {
  introText?: string;
  headingText?: string;
  emphasizedWords?: string[];
  highlightHeadingWords?: string[];
}

function OutlineToFillLetter({
  letter,
  index,
  emphasized,
}: {
  letter: string;
  index: number;
  emphasized: boolean;
}) {
  const delay = index * 0.05;

  return (
    <motion.span
      className="relative inline-block leading-none select-none"
      initial={{ y: 25, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.4,
        delay: delay,
        ease: [0.215, 0.61, 0.355, 1],
      }}
    >
      {/* 1. Underlying Outline Layer */}
      <span
        aria-hidden
        className="block"
        style={{
          color: "transparent",
          WebkitTextStroke: emphasized ? "1.5px #D4AF37" : "1.5px rgba(255, 255, 255, 0.5)",
        }}
      >
        {letter}
      </span>

      {/* 2. Solid Fill Layer + Backside Gold Glow */}
      <motion.span
        className="absolute inset-0 block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.25,
          delay: delay + 0.12, 
          ease: "linear",
        }}
        style={
          emphasized
            ? {
                color: "transparent",
                backgroundImage:
                  "linear-gradient(180deg,#FDE68A 0%,#D4AF37 55%,#8B6B16 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                textShadow: "0 0 20px rgba(212,175,55,0.75), 0 0 40px rgba(212,175,55,0.4)",
              }
            : {
                color: "#ffffff",
                textShadow: "0 0 18px rgba(211, 207, 195, 0.42), 0 0 35px rgba(212,175,55,0.3)",
              }
        }
      >
        {letter}
      </motion.span>
    </motion.span>
  );
}

function GhostWord({
  word,
  position,
}: {
  word: string;
  position: "below" | "above";
}) {
  return (
    <motion.div
      key={`${position}-${word}`}
      initial={{
        opacity: 0,
        y: 24,
      }}
      animate={{
        opacity: 0.15,
        y: 8,
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="text-4xl md:text-6xl font-black tracking-tight uppercase text-white/60 select-none"
      style={{ filter: "blur(1px)" }}
    >
      {word}
    </motion.div>
  );
}

export default function FlashingIntroWords({
  introText = "EV HOMES PRESENTS THE FUTURE OF CONNECTED LIVING WHERE EVERYTHING YOU NEED IS JUST FIVE MINUTES AWAY",
  headingText = "THE 5 MINUTE CITY",
  emphasizedWords = ["FUTURE", "CONNECTED", "FIVE", "MINUTES"],
  highlightHeadingWords = ["5", "MINUTE", "CITY"],
}: FlashingIntroWordsProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);
  const [triggerMainHeading, setTriggerMainHeading] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  const introWords = introText.split(" ");

  useEffect(() => {
    if (!isSectionVisible || introFinished) return;

    if (currentWordIndex < introWords.length) {
      const t = setTimeout(
        () => setCurrentWordIndex((p) => p + 1),
        WORD_DURATION,
      );
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setIntroFinished(true);
      setTimeout(() => setTriggerMainHeading(true), 50);
    }, FINISH_HOLD);
    return () => clearTimeout(t);
  }, [currentWordIndex, introFinished, introWords.length, isSectionVisible]);

  const handleViewportEnter = () => setIsSectionVisible(true);
  const handleViewportLeave = () => {
    setIsSectionVisible(false);
    setIntroFinished(false);
    setCurrentWordIndex(0);
    setTriggerMainHeading(false);
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
  };

  const blockWordVariants: Variants = {
    hidden: { opacity: 0, scale: 0.85, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 11, stiffness: 120 },
    },
  };

  const currWord = introWords[currentWordIndex];
  const nextWord =
    currentWordIndex < introWords.length - 1
      ? introWords[currentWordIndex + 1]
      : null;

  return (
    <motion.div
      onViewportEnter={handleViewportEnter}
      onViewportLeave={handleViewportLeave}
      viewport={{ once: false, amount: 0.8 }}
      className="relative flex flex-col h-[70vh] items-center justify-center overflow-hidden py-12 px-4 select-none"
    >
      <AnimatePresence mode="wait">
        {!introFinished ? (
          <motion.div
            key="intro-words"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4"
          >
            {/* Top Spacer placeholder */}
            <div className="h-12 md:h-16 invisible" aria-hidden />

            {/* Direct Hand-off Stage with Scale/Zoom Integration */}
            <div className="relative flex justify-center items-center h-28 md:h-40 w-full">
              <AnimatePresence mode="popLayout">
                {currWord && (
                  <motion.div
                    key={currWord + currentWordIndex}
                    // Increased zoom variance from 0.85 to 1.15 for better recognition
                    initial={{ scale: 0.85, opacity: 0.3, y: 10 }}
                    animate={{ scale: 1.15, opacity: 1, y: 0 }}
                    exit={{ 
                      opacity: 0, 
                      y: -50, 
                      scale: 0.75,
                      filter: "blur(2px)",
                    }}
                    transition={{
  duration: WORD_DURATION / 1000,
  ease: [0.16, 1, 0.3, 1],
}}
                    className="absolute flex justify-center gap-[0.08em] text-center text-6xl md:text-8xl font-black tracking-tight uppercase px-4"
                  >
                    {currWord.split("").map((letter, letterIdx) => (
                      <OutlineToFillLetter
                        key={letterIdx}
                        letter={letter}
                        index={letterIdx}
                        emphasized={emphasizedWords.includes(currWord)}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Upcoming Hint Container */}
            <div className="h-12 md:h-16 flex items-start justify-center">
              <AnimatePresence mode="wait">
                {nextWord && <GhostWord word={nextWord} position="below" />}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="main-heading"
            initial="hidden"
            animate={triggerMainHeading ? "visible" : "hidden"}
            variants={containerVariants}
            className="flex flex-col items-center justify-center text-center"
          >
            <motion.span
              variants={blockWordVariants}
              className="text-xs md:text-sm font-bold tracking-[0.4em] text-neutral-500 uppercase mb-6"
            >
              Presenting
            </motion.span>

            <motion.h1 className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-6xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase">
              {headingText.split(" ").map((word, index) => {
                const highlight = highlightHeadingWords.includes(word);
                return (
                  <motion.span
                    key={index}
                    variants={blockWordVariants}
                    className={`relative inline-block ${
                    highlight
                        ? "bg-gradient-to-b from-[#FDE68A] via-[#D4AF37] to-[#8B6B16] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                        : "bg-gradient-to-b from-white to-neutral-300 bg-clip-text text-transparent"
                    }`}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}