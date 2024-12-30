import Image from "next/image";

export default function Career() {
  return (
    <main className="min-h-screen">
      <section class="text-gray-600 pt-20">
        <h1 className="text-4xl font-extrabold text-center text-app md:pr-5">
          Careers
        </h1>
        <div class="container mx-auto flex px-4 md:px-24 py-8 md:flex-row flex-col items-center">
          <div class="lg:max-w-md lg:w-full md:w-1/2 w-full mb-10 md:mb-0 -mt-16 md:-mt-32">
            <Image
              class="object-cover w-full h-full"
              alt="hero"
              src="/career-description.png"
              width={500}
              height={500}
            />
          </div>
          <div class="lg:flex-grow md:w-1/2 lg:pl-20 md:pl-16 -mt-16 md:-mt-0 flex flex-col md:text-left">
            <h2 class="text-2xl text-app font-medium pt-10 mb-4">
              What we look for?
            </h2>
            <p class="mb-3 leading-relaxed">
              We seek professionals who are passionate and are prepared to live
              our values – people who can help us grow into one of the finest
              professional service organizations in the business world. We hire
              exceptional people with a go-getter attitude and a willingness to
              accept challenges.
            </p>
            <p class="mb-3 leading-relaxed">
              We lay strong emphasis on the right attitude, ability to learn and
              deliver, practical work experience, an agile mind, professional
              commitment and good interpersonal written and oral communication
              skills.
            </p>
            <p class="mb-3 leading-relaxed font-semibold">
              To post your resume, please send an email to{" "}
              <span class="text-maroonDark">careers@pvadvisory.in</span>
            </p>
            <p class="mb-8 leading-relaxed italic">
              Panchavaktra Fintech LLP is an equal opportunity employer and
              hires candidates based on key attributes they possess in line with
              the position applied for. Selection is based solely on merit
              without regard to race, color, religion, age, gender, national
              origin, political affiliation, disability, marital or family
              status or other differences. Candidates are encouraged to put
              forward their candidature without references. Any undue reference
              or pressure on the recruitment team may negatively impact the
              candidature.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
