import type { ProcessStep } from "./data";
import { motion } from "framer-motion";

export function StepCard({ 
  step, 
  align, 
  isReached 
}: { 
  step: ProcessStep; 
  align: "left" | "right";
  isReached: boolean; // Add this prop
}) {
  return (
    <motion.div 
      className="process-card__shape"
      // Use animate to toggle the styles based on isReached
      animate={{
        borderColor: isReached ? "rgba(194, 185, 156, 0.65)" : "rgba(194, 185, 156, 0.18)",
        boxShadow: isReached 
          ? "0 40px 80px rgba(0, 0, 0, 0.8), 0 0 15px rgba(194, 185, 156, 0.35), 0 0 45px rgba(194, 185, 156, 0.18)"
          : "0 20px 50px rgba(0, 0, 0, 0.6), 0 0 20px rgba(194, 185, 156, 0.02)"
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <span className="process-card__num">{step.number}</span>
      <div className="process-card__content">
        <div className="process-card__media">
          <img src={step.image} alt={step.title} />
        </div>
        <div className="process-card__text">
          <h3 className="process-card__title">{step.title}</h3>
          <p className="process-card__desc">{step.description}</p>
        </div>
      </div>
    </motion.div>
  );
}