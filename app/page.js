"use client";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { GradualSpacing } from "@/components/text-animations/gradual-spacing";
import { WordsPullUp } from "@/components/text-animations/words-pull-up";
import { TextFade } from "@/components/text-animations/text-fade";
import { BackgroundBeamsWithCollision } from "@/components/backgound/background-beams-with-collision";

import WhatWeDoCard from "@/components/cards/what-we-do-card";
import { NumberTicker } from "@/components/text-animations/number-ticker";
// import { WobbleCard } from "@/components/cards/wobble-card";
import AutoScroll from "embla-carousel-auto-scroll";
import ProjectCard from "@/components/cards/project-carousel-card";
import {
  CarouselCustomNext,
  CarouselCustomPrevious,
} from "@/components/carousel-custom";
import EmblaCarousel, {
  EmblaCarouselItem,
} from "@/components/embla-carousel/embla-scale-carousel";
import HeroSection from "./sections/hero";
import ClientsSection from "./sections/clients";
import AboutSection from "./sections/about";
import WhatWeDoSection from "./sections/what-we-do";
import WhatWeDoSectionTest from "./sections/what-we-do_test";
import RecentProjects from "./sections/recent-projects";
import OurStory from "./sections/our-story";
import RecentProjectsTest from "./sections/recent-projects_test";
import HeroSectionTest from "./sections/hero-test";

export default function Home() {
  return (
    <main className={cn("min-h-screen")}>
      <HeroSectionTest />
      {/* <HeroSection /> */}
      <ClientsSection />
      <WhatWeDoSectionTest />

      <AboutSection />
      {/* <WhatWeDoSection /> */}
      <RecentProjects />
      <RecentProjectsTest />
      <OurStory />

      {/* <StackedCarousel /> */}
    </main>
  );
}
