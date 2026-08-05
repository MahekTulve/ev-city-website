import { ProcessTimeline } from "@/components/5min-citySections/ProcessTimeline";
import "@/components/5min-citySections/process.css";
import VashiIsLit from "@/components/ev-city/VashiIsLit";

export const metadata = {
  title: "EV 5 Minute City",
  description:
    "Experience a lifestyle where hospitals, schools, parks, shopping, and everyday essentials are all just five minutes away, creating a smarter, more connected way of living.",
};

export default function CityPage() {
  return (
    <main>
       <VashiIsLit/>
      <ProcessTimeline />
    </main>
  );
}