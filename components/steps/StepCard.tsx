import type { ProcessStep } from "./data";

export function StepCard({ step, align }: { step: ProcessStep; align: "left" | "right" }) {
  return (
    <div className="process-card__shape">
      <span className="process-card__num">{step.number}</span>
      <div className="process-card__content">
        {/* For left-aligned cards, image is on the left; for right, you may need to swap order */}
        <div className="process-card__media">
          <img src={step.image} alt={step.title} />
        </div>
        <div className="process-card__text">
          <h3 className="process-card__title">{step.title}</h3>
          <p className="process-card__desc">{step.description}</p>
        </div>
      </div>
    </div>
  );
}