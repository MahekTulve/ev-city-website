import HoverFooter from "@/components/footer/footer-demo";
import PerspectiveScrollDemo from "@/components/scroll-showcase/scroll-demo";

export const metadata = {
  title: "Our Projects | EV Group",
};

export default function FeaturesPage() {
   return (
    <>
      {/* <FeaturesSection /> */}
      <PerspectiveScrollDemo />

      <HoverFooter />
    </>
  );
}
