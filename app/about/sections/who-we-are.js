import { WordsPullUp } from "@/components/text-animations/words-pull-up";

export default function WhoWeAreSection() {
  return (
    <section className="p-10">
      <div className="max-w-screen-lg h-screen mx-auto space-y-4 flex items-center">
        <div className="w-1/2 space-y-5">
          <h1 className="flex">
            <WordsPullUp
              text="Who We Are?"
              className="text-left text-6xl text-app"
            />
          </h1>
          <div className="space-y-3">
            <p>
              PV Advisory is an implementation consulting firm providing
              comprehensive services in finance transformation, Virtual CFO,
              analytics, start-up solutions, and IT solutions. Through our
              offerings, we aid organizations in streamlining their operations,
              processes, and systems, and build robust Finance Functions.
            </p>
            <p>
              The company has a diverse team with over two decades of experience
              in change management and finance transformation initiatives and
              offers solutions to organizations of all sizes across various
              industries.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
