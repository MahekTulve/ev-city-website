import type { ProcessStep } from "./data";

export function StepCard({
  step,
  align,
}: {
  step: ProcessStep;
  align: "left" | "right";
}) {
  return (
    <div className={`process-card process-card--${align}`}>
    <div className="process-card__shape">

  <span className="process-card__num">
    {step.number}
  </span>

  <div className="process-card__content">

    <div className="process-card__media">
      <img
        src={step.image}
        alt={step.title}
        loading="lazy"
      />
    </div>

    <div className="process-card__text">
      <h3 className="process-card__title">
        {step.title}
      </h3>

      <p className="process-card__desc">
        {step.description}
      </p>
    </div>

  </div>

</div>
    </div>
  );
}