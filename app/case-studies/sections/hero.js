import BlurIn from "@/components/text-animations/blur-in";
import { FadeText } from "@/components/text-animations/fade-text";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-[90vh] flex items-center">
      <Image
        src={"/case-studies-hero.png"}
        alt={"Case Studies Background"}
        width={2000}
        height={1500}
        className="absolute top-0 left-0 w-full h-full object-cover -z-20"
        priority
      />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black/80 via-black/50 to-transparent -z-10" />
      
      <div className="w-full max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="max-w-xl space-y-6">
          <div className="inline-block border-l-4 border-app pl-4">
            <BlurIn
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight"
              word="Case Studies"
              duration={0.5}
            />
          </div>

          <FadeText
            direction="up"
            duration={0.6}
            className="text-gray-200 text-lg md:text-xl font-light leading-relaxed"
            text="Turning Challenges into Opportunities"
          />
        </div>
      </div>
    </section>
  );
}
