"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ServicesCard({ title, className }) {
  return (
    <motion.div
      className="relative overflow-hidden flex items-center justify-center group"
      whileHover={{ padding: "0.3rem" }}
      initial={{ padding: "0rem" }}
    >
      <Image
        src={"/slide2.webp"}
        alt="Card Background"
        width={600}
        height={600}
        className="absolute object-cover h-full w-full -z-10"
      />
      <motion.div
        className="bg-white w-full h-full p-5 space-y-4 flex items-center justify-center"
        whileHover={{ background: "#fff" }}
        initial={{ background: "#f3f3f2e6" }}
      >
        <h1 className="text-app text-xl text-center">{title}</h1>
        {/* <ul className="text-xs list-disc px-4">
          {list.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul> */}
      </motion.div>
    </motion.div>
  );
}
