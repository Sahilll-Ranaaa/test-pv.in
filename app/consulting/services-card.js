"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function ServicesCard({ title, description, className }) {
  const backDropOverlayVariants = {
    hidden: { top: "100%" },
    visible: { top: "0%" },
  };

  const textOverlayVariants = {
    hidden: { maxHeight: "0px" },
    visible: { maxHeight: "400px" },
  };
  return (
    <motion.div
      className="relative w-[280px] min-h-72 overflow-hidden flex items-center justify-center group"
      initial={{ padding: "1rem" }}
      whileHover={{ padding: "0rem" }}
    >
      <Image
        src={"/slide2.webp"}
        alt="Card Background"
        width={600}
        height={600}
        className="absolute object-cover h-full w-full -z-10"
      />
      <motion.div
        className="bg-white w-full h-full p-5 space-y-4"
        initial={{ background: "#fff" }}
        whileHover={{ background: "#f3f3f2e6" }}
      >
        <h1 className="text-app text-[16px]">{title}</h1>
        <ul className="text-xs list-[circle] px-4">
          {description?.split(", ").map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </motion.div>
      {/* <div className="absolute hidden p-6 space-y-5 group-hover:flex flex-col bg-gray-200 h-full w-full">
        <h1 className="text-app text-xl">{title}</h1>
        <ul className="text-xs list-[circle] px-4">
          {description?.split(", ").map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div> */}
    </motion.div>
  );
}

{
  /* <div className="flex-1 max-w-sm bg-app bg-opacity-70">
<div className="bg-white space-y-3 p-5 h-full translate-x-2 -translate-y-2 shadow-lg border border-black">
  <h1 className="text-app text-xl">{title}</h1>
  <p className="text-gray-700 text-sm">{description}</p>
</div>
</div> */
}
