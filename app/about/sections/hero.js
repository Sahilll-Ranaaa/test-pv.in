import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative">
      <Image
        src={"/slide3.jpg"}
        alt={"slide"}
        width={2000}
        height={1500}
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
        priority
      />
      <div className="max-w-screen-lg mx-auto ">
        <div className="max-w-md mr-auto bg-app p-10 pt-20 h-[90vh] my-auto space-y-3 flex flex-col justify-center">
          <h1 className="text-6xl font-bold text-white">About Us</h1>
          <p className="text-white text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>
    </section>
  );
}
