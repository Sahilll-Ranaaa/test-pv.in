"use client";

import Image from "next/image";

import MaxWidthWrapper from "../max-width-wrapper";
import NavItems from "./nav-items";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { RainbowButton } from "../buttons/rainbow-btn";
import Link from "next/link";

export default function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar on scroll up, hide on scroll down
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Update the last scroll position
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -80 }} // Adjust -80 to navbar height
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: "white",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <div className="fixed top-0 z-50 w-full shadow bg-white">
        <MaxWidthWrapper>
          <nav className="flex items-center justify-between py-2">
            <Link href="/">
              <div className="relative h-[3.3rem] w-[3.3rem]">
                <Image
                  src="https://pvadvisory.in/wp-content/uploads/2020/03/PV_Logo.png"
                  alt="PV Logo"
                  fill
                  objectFit="contain"
                />
              </div>
            </Link>

            <NavItems />

            <RainbowButton className="h-9 px-4">Contact Us</RainbowButton>
          </nav>
        </MaxWidthWrapper>
      </div>
    </motion.div>
  );
}
