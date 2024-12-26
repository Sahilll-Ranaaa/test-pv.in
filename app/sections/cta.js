import { RainbowButton } from "@/components/buttons/rainbow-btn";

export default function CTA() {
  return (
    <section className=" bg-app">
      <div className="max-w-screen-lg mx-auto p-10 space-y-10 text-center">
        <div className="space-y-4">
          <div className="flex items-center justify-center gap-10">
            <h1 className="text-6xl text-white flex-1 text-right">
              Let&apos;s Work
            </h1>
            <h3 className="text-lg text-gray-300 text-left flex-1 flex justify-start">
              <p className="max-w-sm">
                Is there a business challenge that is bothering you?
              </p>
            </h3>
          </div>
          <div className="flex justify-center items-center gap-10">
            <h3 className="text-lg text-gray-300 text-right flex-1 flex justify-end">
              <p className="max-w-sm">
                Write to us and we will get back to you with a response soon.
              </p>
            </h3>
            <h2 className="text-6xl text-white flex-1 text-left">together</h2>
          </div>
        </div>

        <RainbowButton>Engage Us</RainbowButton>
      </div>
    </section>
  );
}
