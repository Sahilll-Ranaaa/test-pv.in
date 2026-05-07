import HeroSection from "./sections/hero";
import OurMethodologySection from "./sections/our-methodology";
import OurValuesSection from "./sections/our-values";

import WhoWeAreSection from "./sections/who-we-are";

export default function AboutUs() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WhoWeAreSection />
      <OurValuesSection />

      <OurMethodologySection />
    </main>
  );
}
