import "./globals.css";
import "./embla.css";
import Navbar from "@/components/navbar/navbar";
import { Poppins, Syne, Instrument_Sans } from "next/font/google";
import Footer from "@/components/footer";

export const metadata = {
  title: "PV Advisory",
  description: "PV Advisory",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${syne.variable} ${instrumentSans.variable} font-poppins antialiased relative`}>
        {/* <GlobalBackground /> */}
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
