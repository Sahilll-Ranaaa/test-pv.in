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
    <div className="flex-1 max-w-sm bg-app bg-opacity-70">
      <div className="bg-white space-y-3 p-5 h-full translate-x-2 -translate-y-2 shadow-lg border border-black">
        <h1 className="text-app text-xl">{title}</h1>
        <p className="text-gray-700 text-sm">{description}</p>
      </div>
    </div>
  );
}
