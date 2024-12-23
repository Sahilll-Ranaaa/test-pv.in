import { ArrowRight, ChevronRight, MoveRight } from "lucide-react";
import Image from "next/image";

export default function StartUpSolution() {
  return (
    <main className="min-h-screen">
      <section className="bg-app space-y-5 p-11 pt-28">
        <div className="max-w-screen-lg mx-auto space-y-9">
          <div className="text-white flex items-center gap-1 text-xs">
            <span>What We Do?</span>
            <ChevronRight className="inline-block h-4 w-4" />
            <span>Start-up Solution</span>
          </div>
          <h1 className="text-6xl font-bold text-white">Start-up Solution</h1>
          {/* <p className="text-white text-sm space-y-2 w-1/2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p> */}
        </div>
      </section>
      <section className=" py-10">
        <div className="h-full max-w-screen-lg mx-auto flex items-center justify-center direction-reverse gap-8">
          <div className="flex-1 overflow-hidden h-full">
            <Image
              src="/slide3.jpg"
              alt="logo"
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="text-sm w-1/2 py-10">
            <div className="space-y-2 max-w-lg">
              <p>
                Start-up solutions is an outsourced service that provides
                holistic ecosystem to start-ups and small and medium
                enterprises. It provides specialised services from setting up of
                the businesses to managing their support functions like finance,
                human resources and ongoing compliances. For an entrepreneur,
                managing these non-core activities consumes a lot of time and
                effort which can be invested in their core business.
              </p>
              <p>
                Start-ups and SMEs need a trusted business partner who can
                manage all the non-core functions so that the business owner can
                focus on their core businesses.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section></section>
    </main>
  );
}
