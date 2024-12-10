import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCarousel } from "../ui/carousel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";

export default function ProjectCard({ id, title, description, className }) {
  // const { api: emblaApi } = useCarousel();
  // const [activeIndex, setActiveIndex] = useState(null);

  // const logSlidesInView = useCallback((emblaApi) => {
  //   const slides = emblaApi.slidesInView();
  //   console.log(slides);
  //   console.log(emblaApi.selectedScrollSnap());
  //   if (slides && slides.length >= 1) setActiveIndex(slides[1]);
  // }, []);

  // useEffect(() => {
  //   if (emblaApi) emblaApi.on("slidesInView", logSlidesInView);
  // }, [emblaApi, logSlidesInView]);

  return (
    <div
      className={cn(
        "overflow-hidden flex flex-col items-start",
        // activeIndex === id ? "bg-gray-200 scale-125" : "scale-75",
        className
      )}
    >
      <div className="relative w-full h-[150px]">
        <Image
          src="/e2fd35a8-8b88-486d-9ff1-41a184962e5d.avif"
          alt="PV Logo"
          width={500}
          height={500}
          className="object-cover h-full w-full  -z-10 transition-all duration-200 group-hover:scale-105"
        />
      </div>
      <h3 className="text-xl p-2">{title}</h3>
      <p className="text-xs font-normal line-clamp-4 px-2">{description}</p>
      <div className="flex-1"></div>
      <button className="mt-4 text-sm p-2 font-normal text-primary flex items-center gap-1">
        Read more
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
