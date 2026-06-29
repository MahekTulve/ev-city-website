import "@/components/steps/process.css";
import { ProcessTimeline } from "@/components/steps/ProcessTimeline";
import "@/components/steps/process.css";

export const metadata = {
  title: "EV 5 Minute City",
  description:
    "Experience a lifestyle where hospitals, schools, parks, shopping, and everyday essentials are all just five minutes away, creating a smarter, more connected way of living.",
};

export default function StepsPage() {
  return (
    <main>
      <ProcessTimeline />
    </main>
  );
}