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
import { ArrowDown } from "lucide-react";
import { useEffect, useState } from "react";

const carouselItems = [
  {
    id: 1,
    image:
      "https://fiserv.scene7.com/is/image/fiserv/fiserv-marine-drive-mumbai-530819947-2880x1984",
    title: ["Your Finance", "Transformation Partner"],
    description: {
      text: "We are an implementation consulting firm. In the ever-evolving business landscape, we help you achieve full potential of your strategy and add long-term value to your business.",
    },
    url: "/",
  },
  {
    id: 2,
    image:
      "https://fiserv.scene7.com/is/image/fiserv/fiserv-bandra-worli-sea-link-957919884-2880x1984",
    title: ["What do we bring", "to the table?"],
    description: {
      text: "With an overall combined expertise of over 65+ years in diverse industry verticals, we offer services in the space of business restructuring, finance effectiveness, performance improvement, tax and human resources to businesses of all sizes.",
    },
    url: "/",
  },
  {
    id: 3,
    image:
      "https://fiserv.scene7.com/is/image/fiserv/fiserv-woman-using-mobile-689071133-rt-2880x1984",
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

export default function HeroSectionTest() {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % carouselItems.length
      );
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <section
      className="w-full bg-cover bg-center transition-all duration-1000"
      style={{
        backgroundImage: `url(${carouselItems[currentImageIndex].image})`,
      }}
    >
      <div className="max-w-5xl mx-auto h-screen">
        <div className=" h-full w-1/2">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
              }),
            ]}
            orientation="vertical"
            className="w-full max-w-5xl backdrop-blur-3xl"
          >
            <CarouselContent className="-mt-1 h-screen relative">
              {carouselItems.map((item, index) => (
                <CarouselItem key={index} className="">
                  <div className="p-10 pt-32 flex flex-col justify-center items-center text-white">
                    <div className="flex flex-col justify-center mb-4">
                      {item.title.map((title, index) => (
                        <GradualSpacing
                          key={title}
                          text={title}
                          duration={0.5}
                          className="text-2xl md:text-5xl"
                        />
                      ))}
                    </div>

                    <TextFade className="" direction="up">
                      <p>{item.description.text}</p>
                    </TextFade>
                    {item.description.list && (
                      <ul className="list-inside list-none">
                        <TextFade className="" direction="up">
                          {item.description.list.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </TextFade>
                      </ul>
                    )}
                  </div>
                </CarouselItem>
              ))}
              {/* <div className="absolute bottom-0 left-0 text-white px-3 flex items-center gap-2">
                <ArrowDown />
                See how we help
              </div> */}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
