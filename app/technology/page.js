import { ArrowRight, ChevronRight, MoveRight } from "lucide-react";
import Image from "next/image";

export default function FinanceTransformation() {
  return (
    <main className="min-h-screen">
      <section className="bg-app space-y-5 p-11 pt-28">
        <div className="max-w-screen-lg mx-auto space-y-9">
          <div className="text-white flex items-center gap-1 text-xs">
            <span>What We Do?</span>
            <ChevronRight className="inline-block h-4 w-4" />
            <span>Technology</span>
          </div>
          <h1 className="text-6xl font-bold text-white">Technology</h1>
          {/* <p className="text-white text-sm space-y-2 w-1/2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p> */}
        </div>
      </section>
      <section className="">
        <div className="h-full flex items-center justify-center direction-reverse gap-8">
          <div className="text-sm w-1/2 py-10">
            <div className="ml-auto space-y-2 max-w-lg">
              <p>
                In the artificial intelligence (AI) era, anything seems
                possible. Untapped value, constant innovation, new frontiers.
                Especially with a knowledgeable guide by your side.
              </p>
              <p>
                We help clients harness the power and potential of AI. From
                strategy to implementation. Small steps to solving seemingly
                impenetrable problems. Underpinned by trust. PV’s network of
                professionals takes a business-led approach to technology –
                helping you select, implement, manage and monitor the right
                suite of technologies to meet the unique needs of your
                organization and its stakeholders. Our teams can take you from
                business vision and selection through to technology
                implementation and operations, providing valuable capabilities,
                capacity and insights to help you enable the business and
                empower the future.
              </p>
            </div>
          </div>
          <div className="flex-1 overflow-hidden h-full">
            <Image
              src="/slide3.jpg"
              alt="logo"
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
      <section></section>
    </main>
  );
}
