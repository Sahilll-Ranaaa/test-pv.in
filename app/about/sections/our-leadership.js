import LinkedIn from "@/components/icons/linkedin";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const items = [
  {
    id: 1,
    image:
      "https://pvadvisory.in/wp-content/uploads/elementor/thumbs/Kapil-Bagadia-1-q1144xgivl040tf8sm8uvco6lbckdeeuj47xkj3x4g.jpeg",
    designation: "Country Managing Partner",
    name: "Kapil Bagadia",
    description:
      "Kapil Bagadia, (ex-CFO of EY India) CMP at PV, is a finance veteran with over 25 years of experience in varied Finance & Accounts functions.",
    linkedIn: "Country Managing Partner",
    longDescription: [
      "Following his passion for digital transformation, he has led various initiatives including conceptualizing and creating inhouse ERP, implementation of SAP, automations, dashboards, and MIS.",
      "He has spearheaded various strategic restructuring projects, including the EY and Andersen merger, demerger of Real Estate for value creation, various acquisitions, LLP conversions, GST implementations, and regulatory projects without time/cost overruns.",
      "He has been instrumental in setting up of a ‘Shared Service Centre’ like structure where he centralized all F&A processes, resulting in improved accountability and reduced overheads.",
      "He has been awarded 14 Best CFO accolades during his seven+ years as EY’s CFO, including one by Whitepage International for Asia’s most powerful leaders in Finance 2022.",
    ],
  },
  {
    id: 2,
    image:
      "https://pvadvisory.in/wp-content/uploads/elementor/thumbs/sumit-Kukreja-e1675410827397-q1lvx3vjp8p47ad1v0gzc4zuux7t5pnjpmmokgair4.png",
    designation: "Founding and Managing Partner",
    name: "Sumit Kukreja",
    description:
      "Sumit Kukreja, (ex-EY India & GDS) founding and managing partner of PV, is a seasoned finance professional with over 15 years of experience in corporate restructuring, corporate finance and performance improvement.",
    linkedIn: "https://www.linkedin.com/in/sumit-kukreja-ab390a9",
    longDescription: [
      "He is currently vCFO to many MSMEs and has been associated with several corporate clients from diverse industries like investment banking, manufacturing, garments, real estate, telecom and consulting.",
      "He has led various restructuring, finance transformation and automations projects along with various sub-functions within finance for one of the big four accounting firms.",
      "Implementation of large corporate restructuring projects, finance transformation, integration of finance functions, and designing finance processes are his areas of expertise.",
      "He holds an honours degree in Economics from Delhi University and MBA in finance.",
    ],
  },
  {
    id: 3,
    image:
      "https://pvadvisory.in/wp-content/uploads/elementor/thumbs/Namita-Arora-q114517vmx59b99s6nvd5bq0yuu186trvmtvhmycfk.jpeg",
    designation: "Associate Consultant",
    name: "Namita Arora",
    description:
      "Namita Arora (ex-EY India) is an associate consultant at PV. She has held various senior management positions and has led various teams in multinational organizations like EY and Birla Group.",
    linkedIn: "",
    longDescription: [
      "She is an accomplished Accounting and Tax professional with over 20 years of experience in the field of accounting and indirect tax.",
      "She has been instrumental in implementing GST and has played a key role in establishing P2P and O2C processes for one of the big four accounting firms in India.",
      "She has also led implementation of various restructuring projects, business process improvements and automation.",
      "She specialises in accounting, tax, process improvements and automation.",
      "She is a qualified Chartered Accountant and holds an honours degree in commerce.",
    ],
  },
  {
    id: 4,
    image:
      "https://pvadvisory.in/wp-content/uploads/elementor/thumbs/Ankur-Goyal-q1144enr2wadkm6jue4bhheyplx83gc7sj67yzvskw.jpeg",
    designation: "Partner",
    name: "Ankur Goyal",
    description:
      "Ankur Goyal (Ex-KPMG) is a technology partner at PV. Having knowledge and experience in product design, programming, and project management, he is well-equipped to handle any project.",
    linkedIn: "https://www.linkedin.com/in/imankurgoyal",
    longDescription: [
      "Ankur Goyal (Ex-KPMG) is a technology partner at Panchavaktra Fintech LLP.",
      "Having knowledge and experience in product design, programming, and project management, he is well-equipped to handle any project.",
      "Throughout his career, he has led various projects including conceptualizing and developing in-house tools, implementing SAP, automating processes, creating dashboards.",
      "He holds a bachelor’s degree in Computer Science and Engineering.",
    ],
  },
];
export default function OurLeadership() {
  return (
    <section className="p-10 bg-gray-100">
      <div className="max-w-screen-lg mx-auto space-y-4">
        <h1 className="text-center text-4xl font-bold text-app">
          Our Leadership
        </h1>
        <div className="grid grid-cols-4 gap-2">
          {items.map((item) => (
            <div
              key={item.id}
              className={cn(
                "h-[500px] space-y-3 rounded-md p-2 shadow bg-white"
              )}
            >
              <Image
                src={item.image}
                alt={item.name}
                width={400}
                height={400}
                className="w-full rounded-md"
              />
              <div>
                <h3 className="text-lg text-app">{item.name}</h3>
                <h4 className="text-sm text-gray-400">{item.designation}</h4>
              </div>

              <p className="text-sm text-gray-600">{item.description}</p>
              <div>
                <Link href={item.linkedIn}>
                  <LinkedIn className="w-6 h-6" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
