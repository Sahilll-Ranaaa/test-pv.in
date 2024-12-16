import { ArrowRight, ChevronRight, MoveRight } from "lucide-react";
import Image from "next/image";

export default function Outsourcing() {
  return (
    <main className="min-h-screen">
      <section className="bg-app space-y-5 p-11 pt-28">
        <div className="max-w-screen-lg mx-auto space-y-9">
          <div className="text-white flex items-center gap-1 text-xs">
            <span>What We Do?</span>
            <ChevronRight className="inline-block h-4 w-4" />
            <span>Outsourcing</span>
          </div>
          <h1 className="text-6xl font-bold text-white">Outsourcing</h1>
          <p className="text-white text-sm space-y-2 w-1/2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>
      <section className="min-h-[80vh] py-10">
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
                Outsourcing services is a business practice where a company
                delegates specific tasks or functions to external service
                providers. This strategic approach allows businesses to focus on
                their core competencies while benefiting from the expertise and
                cost-efficiency of specialized service providers. Outsourcing
                can help companies reduce operational costs, improve
                scalability, access global talent, and enhance overall
                efficiency, making it a valuable tool in today&apos;s
                competitive business landscape.
              </p>
              <p>
                We are a renowned global firm specializing in outsourcing
                services. With a strong presence across the world, we offer
                expert solutions in various domains. Our extensive experience
                and diverse team make us a top choice for businesses seeking
                outsourcing partnerships.
              </p>
              <p>
                We are primarily based in India which is a prime destination for
                outsourcing due to its blend of cost-effectiveness and
                high-quality services. Its vast talent pool, technological
                prowess, and English proficiency make it an ideal choice for
                global businesses looking to enhance efficiency and reduce
                operational costs without compromising on excellence.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="min-h-screen py-10">

      </section> */}
      <section></section>
    </main>
  );
}
