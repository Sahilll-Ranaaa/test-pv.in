"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function WhatWeDoCard({
  title,
  description,
  backgroundImage,
  className,
}) {
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
      className={cn("w-52 h-52 relative group overflow-hidden", className)}
      initial="hidden"
      whileHover="visible"
    >
      <Image
        src={backgroundImage || "/e2fd35a8-8b88-486d-9ff1-41a184962e5d.avif"}
        alt="PV Logo"
        width={500}
        height={500}
        className="object-cover position h-full w-full -z-10 transition-all duration-200 group-hover:scale-105"
      />

      <motion.div
        className="absolute w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-black"
        variants={backDropOverlayVariants}
        transition={{
          type: "spring",
          duration: 0.5,
          // stiffness: 120,
          damping: 20,
        }}
      />
      <div className="absolute top-0 p-4">
        <h2 className=" text-xl text-white">{title ?? "Consulting"}</h2>
      </div>
      {/* <div className="absolute w-full h-full bg-gradient-to-b duration-200 transition-all from-[rgba(0,0,0,0.3)] to-black top-full group-hover:top-0"></div> */}
      <motion.div
        className="absolute w-full duration-500 overflow-hidden bottom-0"
        variants={textOverlayVariants}
        transition={{
          type: "spring",
          duration: 0.5,
          // stiffness: 120,
          damping: 20,
        }}
      >
        {/* <p className="text-xs text-white p-4">
          {description ??
            "Finance Transformation, Virtual CFO, Managed Services, Financial Risk Advisory"}
        </p> */}
        {
          <ul className="text-xs list-[circle]  text-white p-8">
            {description?.split(",")?.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        }
      </motion.div>
    </motion.div>
  );
}
