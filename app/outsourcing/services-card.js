import Image from "next/image";

export default function ServicesCard({ title, list }) {
  return (
    <div className=" w-[300px] py-5 pb-24 space-y-4 bg-white">
      {/* <Image
        src={"/e2fd35a8-8b88-486d-9ff1-41a184962e5d.avif"}
        alt="PV Logo"
        width={500}
        height={500}
        className="object-cover  h-60 w-full"
      /> */}
      <div className="relative px-7 py-1.5 bg-app">
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        {/* <div className="absolute h-full w-1.5 top-0 left-0 bg-app"></div> */}
      </div>

      <ul className="list-[square] px-11 text-gray-600">
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
