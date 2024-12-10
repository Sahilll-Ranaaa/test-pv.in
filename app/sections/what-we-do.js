import WhatWeDoCard from "@/components/cards/what-we-do-card";
import { TextFade } from "@/components/text-animations/text-fade";
import { WordsPullUp } from "@/components/text-animations/words-pull-up";

const whatWeDo = [
  {
    id: 1,
    title: "Consulting",
    description:
      "Finance Transformation, Virtual CFO, Managed Services, Financial Risk Advisory",
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-1.png",
  },
  {
    id: 2,
    title: "Outsourcing",
    description:
      "Finance & Accounts, Assurance, Data Analytics, Technology, Other Back-office services",
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-2.png",
  },
  {
    id: 3,
    title: "Technology",
    description: "This box will redirect to thepvhub website.",
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-3.png",
  },
  {
    id: 4,
    title: "Start-Up Solutions",
    description:
      "Managed Services, Virtual CFO, Financial Planning and Analysis, Facilitate Business Strategy, Analytics, Policies, Processes and Procedures, Due Diligence, Investment Memorandum.",
    image: "https://pvadvisory.in/wp-content/uploads/2022/12/Slider-1.png",
  },
];

export default function WhatWeDoSection() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="max-w-screen-lg mx-auto grid grid-cols-4 gap-1">
        <div className="flex items-start flex-col col-span-2 row-span-2 py-3 px-5 shadow border border-gray-400">
          <h1>
            <WordsPullUp
              className=" text-2xl font-bold tracking-[-0.02em] text-app dark:text-white md:text-5xl md:leading-[5rem]"
              text="What We Do ?"
            />
          </h1>
          <div className="space-y-4 text-sm">
            <TextFade>
              <p>
                With the ever-evolving business landscape, it is becoming
                increasingly important for businesses to have the right tools
                and resources to keep up with the changing demands of the
                market. We understand that implementation of any project is the
                most challenging aspect and yet it receives limited focus from
                the management. Organizations struggle to successfully execute a
                project within the defined timelines.
              </p>
            </TextFade>
            <TextFade>
              <p>
                What sets us apart is our unwavering focus on implementation,
                ensuring that our clients not only receive innovative ideas but
                also see them come to fruition. At PV, we are fuelled by a
                passion for excellence and a strong commitment to client
                satisfaction, making us a trusted partner for businesses seeking
                to thrive in today&apos;s dynamic environment.
              </p>
            </TextFade>
            <TextFade>
              <p>
                We measure our success by the success of our clients and strive
                to build long-term relationships based on trust, integrity, and
                mutual growth. Experience the difference of working with a
                consulting firm that not only provides insightful advice but
                also implements solutions that create a lasting impact.
              </p>
            </TextFade>
          </div>
        </div>

        {whatWeDo.map((item) => (
          <WhatWeDoCard
            key={item.id}
            title={item.title}
            backgroundImage={item.image}
            className="w-full h-full"
            description={item.description}
          />
        ))}
      </div>
    </section>
  );
}
