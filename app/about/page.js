import HeroSection from "./sections/hero";
import OurLeadership from "./sections/our-leadership";
import OurMethodologySection from "./sections/our-methodology";
import OurMissionOurGoal from "./sections/our-mission-our-goal";
import OurTeam from "./sections/our-team";
import OurValuesSection from "./sections/our-values";
import WhoWeAreSection from "./sections/who-we-are";
import WhyUsSection from "./sections/why-us";

export default function AboutUs() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <WhoWeAreSection />
      <OurMissionOurGoal />
      <OurValuesSection />
      {/* <WhyUsSection /> */}
      <OurMethodologySection />
      <OurLeadership />
      <OurTeam />
    </main>
  );
}
