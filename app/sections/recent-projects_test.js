import ProjectCard from "@/components/cards/project-carousel-card";
import EmblaCarousel, {
  EmblaCarouselItem,
} from "@/components/embla-carousel/embla-scale-carousel";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const recentProjects = [
  {
    id: 1,
    title: "Finance Function Effectiveness",
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-1.png",

    description:
      "We were engaged to review key finance processes to reduce the finance cost by bringing in efficiencies. During the project, we mapped and reviewed the AS IS processes and created process documents for all the existing finance processes. We also identified the areas of improvement in existing finance processes, policies, and systems and prepared the implementation plan for improvements.",
  },

  {
    id: 2,
    title: "Virtual CFO",
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-2.png",
    description:
      "We implemented forecasting and planning function, working capital management and treasury processes for a medium sized organisation based in Singapore and in India. We were also engaged to lay down a billing structure in line with Double Taxation Avoidance Agreement between India and Singapore. We assisted the client in setting up operations in the Special Economic Zone to benefit from direct and indirect tax exemptions. We also created Business Intelligence Dashboards for the management.",
  },
  {
    id: 3,
    title: "Optimizing Accounts Receivables - Outsourcing for Billing",
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-3.png",
    description:
      "Using the Oracle application, we analysed various revenue models and their billing process and ensured timely and accurate processing of 250+ invoices. In addition, we ensured regular reporting and required follow-up with the end customer to ensure faster invoice processing.",
  },
  {
    id: 4,
    title: "Turnaround Strategy",
    image: "/e2fd35a8-8b88-486d-9ff1-41a184962e5d.avif",

    description:
      "We diagnosed the financial health of sick company which was running into financial trouble. We assisted the client in creating a turnaround strategy, formulating and implementing a comprehensive business plan for 5 years.",
  },
  {
    id: 5,
    title: "Restructuring",
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-1.png",
    description:
      "We managed the implementation of a large restructuring project spanning across 5 countries and 10,000 employees.",
  },
  {
    id: 6,
    title: "Conversion into LLP",
    image: "/e2fd35a8-8b88-486d-9ff1-41a184962e5d.avif",
    description:
      "We assisted the client in managing conversion of 3 companies into a Limited Liability Partnership.",
  },
  {
    id: 7,
    title: "COVID - 19 Preparedness",
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-3.png",
    description:
      "We were engaged to perform scenario analysis, considering various shutdown periods, and to advise and implement, immediate cost cutting measures to conserve cash.",
  },
  {
    id: 8,
    title: "Performance Improvement",
    image: "/e2fd35a8-8b88-486d-9ff1-41a184962e5d.avif",
    description:
      "We reviewed the Order to Cash process and advised recommendations to increase efficiencies.",
  },
  {
    id: 9,
    title: "Start-up Solution",
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-1.png",
    description:
      "We assisted a start-up in selecting the right form of legal entity, incorporating the company and providing Virtual CFO services.",
  },
  {
    id: 10,
    title: "Stock Audit",
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-2.png",
    description:
      "We performed the Physical verification of Fixed Assets and reconciliation of the fixed assets along with assisting in tagging of fixed assets with QR codes.",
  },
  {
    id: 11,
    title: "Conceptualization of a workflow tool",
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-3.png",
    description:
      "We were engaged to conceptualize a workflow tool for preparation of proposals, tracking engagement deliverables, invoicing and management reporting.",
  },
  {
    id: 12,
    title: "Setup of HR Function",
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-1.png",
    description:
      "We formulated the HR policies & procedures and the HR manual. We also designed and implemented the Performance Management System.",
  },
  {
    id: 13,
    title: "Standardization of Processes",
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-1.png",
    description:
      "We were engaged to review, identify the scope for improvement and standardise finance processes across 8 cities in 5 countries to bring in consistencies.",
  },
  {
    id: 14,
    title: "Fixed Asset Register",
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-2.png",
    description:
      "We reviewed and finalised the FAR of the organization and carried out the physical verification of fixed assets. Additionally, we assisted with tagging fixed assets with QR codes and reconciled the fixed assets.",
  },
  {
    id: 15,
    title: "Lower Tax Deduction",
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-1.png",
    description:
      "We assisted the client in preparing financial statements along with filing of Lower tax Deduction application with the Assessing Officer.",
  },
];

export default function RecentProjectsTest({ autoplay = true }) {
  const [active, setActive] = useState(0);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % recentProjects.length);
  };

  const handlePrev = () => {
    setActive(
      (prev) => (prev - 1 + recentProjects.length) % recentProjects.length
    );
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <section>
      <div className="max-w-screen-lg mx-auto py-11">
        <h1 className=" text-2xl text-center font-bold tracking-[-0.02em] text-app dark:text-white md:text-5xl md:leading-[5rem]">
          Case Studies
        </h1>
        {/* <p className="text-center text-gray-500 mx-auto text-sm mb-7 max-w-md">
          We measure our success by the success of our clients and strive to
          build long-term relationships based on trust, integrity, and mutual
          growth.
        </p> */}
        <div>
          <div className="max-w-sm md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20">
            <div className="relative grid grid-cols-1 md:grid-cols-2  gap-20">
              <div>
                <div className="relative h-80 w-full">
                  <AnimatePresence>
                    {recentProjects.map((project, index) => (
                      <motion.div
                        key={project.title}
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                          z: -100,
                          rotate: randomRotateY(),
                        }}
                        animate={{
                          opacity: isActive(index) ? 1 : 0.7,
                          scale: isActive(index) ? 1 : 0.95,
                          z: isActive(index) ? 0 : -100,
                          rotate: isActive(index) ? 0 : randomRotateY(),
                          zIndex: isActive(index)
                            ? 999
                            : recentProjects.length + 2 - index,
                          y: isActive(index) ? [0, -80, 0] : 0,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                          z: 100,
                          rotate: randomRotateY(),
                        }}
                        transition={{
                          duration: 0.4,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 origin-bottom"
                      >
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={500}
                          height={500}
                          draggable={false}
                          className="h-full w-full rounded-3xl object-cover object-center"
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
              <div className="flex justify-between flex-col py-4">
                <motion.div
                  key={active}
                  initial={{
                    y: 20,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    y: -20,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                  }}
                >
                  <h3 className="text-2xl font-bold dark:text-white text-black">
                    {recentProjects[active].title}
                  </h3>
                  {/* <p className="text-sm text-gray-500 dark:text-neutral-500">
              {recentProjects[active].description}
            </p> */}
                  <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300 line-clamp-4">
                    {recentProjects[active].description
                      .split(" ")
                      .map((word, index) => (
                        <motion.span
                          key={index}
                          initial={{
                            filter: "blur(10px)",
                            opacity: 0,
                            y: 5,
                          }}
                          animate={{
                            filter: "blur(0px)",
                            opacity: 1,
                            y: 0,
                          }}
                          transition={{
                            duration: 0.2,
                            ease: "easeInOut",
                            delay: 0.02 * index,
                          }}
                          className="inline-block"
                        >
                          {word}&nbsp;
                        </motion.span>
                      ))}
                  </motion.p>
                </motion.div>

                <div className="flex gap-4 pt-12 md:pt-0">
                  <button
                    onClick={handlePrev}
                    className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
                  >
                    <ArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
                  >
                    <ArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
                  </button>
                </div>
              </div>
              <div className="">
                <button className="text-sm font-normal text-primary flex items-center gap-1">
                  Read more
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
