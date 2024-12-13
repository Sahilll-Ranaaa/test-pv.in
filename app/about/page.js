import HeroSection from "./sections/hero";
import OurLeadership from "./sections/our-leadership";
import OurMethodologySection from "./sections/our-methodology";
import WhoWeAreSection from "./sections/who-we-are";

export default function AboutUs() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WhoWeAreSection />
      <OurMethodologySection />
      <OurLeadership />
    </main>
  );
}
