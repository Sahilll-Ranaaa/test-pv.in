"use client";

import { BackgroundBeamsWithCollision } from "@/components/backgound/background-beams-with-collision";
import { GradualSpacing } from "@/components/text-animations/gradual-spacing";
import { TextFade } from "@/components/text-animations/text-fade";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";

const carouselItems = [
  {
    id: 1,
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-1.png",
    title: ["Your Finance", "Transformation Partner"],
    description: {
      text: "We are an implementation consulting firm. In the ever-evolving business landscape, we help you achieve full potential of your strategy and add long-term value to your business.",
    },
    url: "/",
  },
  {
    id: 2,
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-2.png",
    title: ["What do we bring", "to the table?"],
    description: {
      text: "With an overall combined expertise of over 65+ years in diverse industry verticals, we offer services in the space of business restructuring, finance effectiveness, performance improvement, tax and human resources to businesses of all sizes.",
    },
    url: "/",
  },
  {
    id: 3,
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-1.png",
    title: ["Leverage", "Transformation!"],
    description: {
      text: "We understand the importance of execution in your transformation journey. With our approach, we help you:",
      list: [
        "Diagnose obstacles and identify required changes",
        "Design an effective plan that aligns with your goals",
        "Ensure a smooth and measured implementation at all stages",
      ],
    },
    url: "/",
  },
];

export default function HeroSection() {
  return (
    <section className="w-full">
      <BackgroundBeamsWithCollision className="bg-none">
        <Carousel
          plugins={[
            Autoplay({
              delay: 4000,
            }),
          ]}
        >
          <CarouselContent className="">
            {carouselItems.map((item) => (
              <CarouselItem key={item.id} className="h-screen box-border p-20">
                <div
                  className={cn(
                    "h-full flex flex-col items-center justify-center "
                  )}
                >
                  <div className="flex flex-col items-center mb-4">
                    {item.title.map((title, index) => (
                      <GradualSpacing
                        key={title}
                        text={title}
                        duration={0.5}
                        className="text-2xl md:text-5xl"
                      />
                    ))}
                  </div>

                  <TextFade
                    className="max-w-[500px] text-center"
                    direction="up"
                  >
                    <p>{item.description.text}</p>
                  </TextFade>
                  {item.description.list && (
                    <ul className="list-inside text-center list-none">
                      <TextFade className="max-w-[500px]" direction="up">
                        {item.description.list.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </TextFade>
                    </ul>
                  )}

                  {/* <WordsPullUp
                text={item.description.text}
                className="text-black"
                className="inline-block max-w-xl text-sm md:text-lg text-neutral-700 dark:text-neutral-400"
              /> */}

                  {/* <span >
                {item.description}
              </span> */}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </BackgroundBeamsWithCollision>
    </section>
  );
}
