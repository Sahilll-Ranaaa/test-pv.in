import ReadMoreBtn from "@/components/buttons/read-more";
import { TextFade } from "@/components/text-animations/text-fade";
import { WordsPullUp } from "@/components/text-animations/words-pull-up";

export default function AboutSection() {
  return (
    <section className="flex items-center justify-center py-16 bg-gray-100">
      <div className="max-w-screen-lg mx-auto flex gap-4 items-center">
        <div className="flex-1 flex items-center flex-col gap-5">
          <h1>
            <WordsPullUp
              className="text-4xl md:text-4xl font-bold tracking-[-0.02em] text-app dark:text-white md:leading-[5rem]"
              text="About Us"
            />
          </h1>
          <div className="space-y-4 max-w-xl">
            <TextFade>
              <p className="text-center">
                We are an implementation consulting firm that specializes in
                delivering cutting-edge solutions to clients in India and around
                the globe. Founded by a team of highly experienced ex-EY senior
                professionals, we offer a comprehensive range of services,
                including Consulting, Outsourcing, Tech Solutions and Start-up
                Solutions.
              </p>
            </TextFade>
            <TextFade>
              <p className="text-center">
                With a deep understanding of the business landscape, industry
                trends, and emerging technologies, we are dedicated to helping
                organizations achieve their goals and stay competitive in a
                rapidly evolving world.
              </p>
            </TextFade>
          </div>
          <ReadMoreBtn link={"/about"} />
        </div>
      </div>
    </section>
  );
}
