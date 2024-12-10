import Image from "next/image";
import { Meteors } from "./backgound/meteors";
import MaxWidthWrapper from "./max-width-wrapper";
import Link from "next/link";
import { RainbowButton } from "./buttons/rainbow-btn";
import Facebook from "./icons/facebook";
import LinkedIn from "./icons/linkedin";

const quickLinks = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "What we do?",
    url: "#",
  },
  {
    label: "About Us",
    url: "#",
  },
  {
    label: "Recent Projects",
    url: "#",
  },
  {
    label: "Careers",
    url: "#",
  },
  {
    label: "Engage Us",
    url: "#",
  },
];

export default function Footer() {
  return (
    <div>
      <div className="relative overflow-hidden border-t bg-[#272727] p-6">
        <MaxWidthWrapper>
          <div className="flex justify-between">
            <div className="space-y-2">
              <div className="relative h-16 w-16">
                <Image
                  src="https://pvadvisory.in/wp-content/uploads/2020/03/PV_Logo.png"
                  alt="PV Logo"
                  fill
                  objectFit="contain"
                />
              </div>
              <p className="max-w-[300px] text-white">
                We are an implementation consulting firm providing comprehensive
                services in finance transformation, Virtual CFO, analytics,
                start-up solutions, and IT solutions.
              </p>
              <div className="space-y-1">
                <h1 className="text-white text-lg">Stay Connected</h1>
                <div className="flex gap-3 items-center">
                  <Link href="#">
                    <Facebook className="h-7 w-7" />
                  </Link>
                  <Link href="#">
                    <LinkedIn className="h-7 w-7 bg-white rounded-sm overflow-hidden" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="flex gap-10">
              <div className="space-y-4">
                <h1 className="text-white">Quick Links</h1>
                <ul className="space-y-3   text-xs">
                  {quickLinks.map(({ label, url }) => (
                    <li key={label}>
                      <Link href={url} className="text-white hover:underline">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h1 className="text-white">Engage Us</h1>
                <ul className="space-y-3 text-xs max-w-[270px]">
                  <li className="flex items-center gap-3 text-sm text-white">
                    <span className="fill-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2c-4.418 0-8 4.003-8 8.5c0 4.462 2.553 9.312 6.537 11.174a3.45 3.45 0 0 0 2.926 0C17.447 19.812 20 14.962 20 10.5C20 6.003 16.418 2 12 2m0 10a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span>
                      K9/40, DLF Phase 2, Sector 25, Gurugram, Haryana-122 002
                    </span>
                  </li>

                  <li className="flex items-center gap-3 text-sm text-white">
                    <span className="fill-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path d="m16.556 12.906l-.455.453s-1.083 1.076-4.038-1.862s-1.872-4.014-1.872-4.014l.286-.286c.707-.702.774-1.83.157-2.654L9.374 2.86C8.61 1.84 7.135 1.705 6.26 2.575l-1.57 1.56c-.433.432-.723.99-.688 1.61c.09 1.587.808 5 4.812 8.982c4.247 4.222 8.232 4.39 9.861 4.238c.516-.048.964-.31 1.325-.67l1.42-1.412c.96-.953.69-2.588-.538-3.255l-1.91-1.039c-.806-.437-1.787-.309-2.417.317"></path>
                      </svg>
                    </span>
                    <span>+91-97419 16444, +91-98992 31644</span>
                  </li>
                  <li className="flex items-center gap-3 text-sm text-white">
                    <span className="fill-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path d="M9.5 20v2a.75.75 0 0 0 1.5 0v-2zm5.5 0h-1.5v2a.75.75 0 0 0 1.5 0z"></path>
                        <path
                          fillRule="evenodd"
                          d="m17.385 6.585l.256-.052a2.181 2.181 0 0 1 1.24.115c.69.277 1.446.328 2.165.148l.061-.015c.524-.131.893-.618.893-1.178v-2.13c0-.738-.664-1.282-1.355-1.109c-.396.1-.812.071-1.193-.081l-.073-.03a3.517 3.517 0 0 0-2-.185l-.449.09c-.54.108-.93.6-.93 1.17v6.953c0 .397.31.719.692.719a.706.706 0 0 0 .693-.72z"
                          clipRule="evenodd"
                        ></path>
                        <path d="M14.5 6v4.28c0 1.172.928 2.22 2.192 2.22c1.265 0 2.193-1.048 2.193-2.22V8.229c.76.205 1.56.23 2.335.067c.492.842.78 1.86.78 2.955v6.175C22 18.847 21.012 20 19.793 20H12.5v-8.75c0-2.03-.832-3.974-2.217-5.25z"></path>
                        <path
                          fillRule="evenodd"
                          d="M2 11.25C2 8.35 4.015 6 6.5 6S11 8.35 11 11.25V20H4.233C3 20 2 18.834 2 17.395zM4.25 16a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 0 1.5H5a.75.75 0 0 1-.75-.75"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span>info@pvadvisory.in</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>

        <Meteors number={20} />
      </div>
      <div className="bg-[#1e1c1c] p-5">
        <MaxWidthWrapper>
          <div>
            <p className="text-xs font-extralight text-center text-white">
              © 2023 PV Advisory LLP. All Rights Reserved
            </p>
          </div>
        </MaxWidthWrapper>
      </div>
    </div>
  );
}
