import ProjectCard from "@/components/cards/project-carousel-card";
import EmblaCarousel, {
  EmblaCarouselItem,
} from "@/components/embla-carousel/embla-carousel-default";

const recentProjects = [
  {
    id: 1,
    title: "Finance Function Effectiveness",
    description:
      "We were engaged to review key finance processes to reduce the finance cost by bringing in efficiencies. During the project, we mapped and reviewed the AS IS processes and created process documents for all the existing finance processes. We also identified the areas of improvement in existing finance processes, policies, and systems and prepared the implementation plan for improvements.",
  },
  {
    id: 2,
    title: "Virtual CFO",
    description:
      "We implemented forecasting and planning function, working capital management and treasury processes for a medium sized organisation based in Singapore and in India. We were also engaged to lay down a billing structure in line with Double Taxation Avoidance Agreement between India and Singapore. We assisted the client in setting up operations in the Special Economic Zone to benefit from direct and indirect tax exemptions. We also created Business Intelligence Dashboards for the management.",
  },
  {
    id: 3,
    title: "Optimizing Accounts Receivables - Outsourcing for Billing",
    description:
      "Using the Oracle application, we analysed various revenue models and their billing process and ensured timely and accurate processing of 250+ invoices. In addition, we ensured regular reporting and required follow-up with the end customer to ensure faster invoice processing.",
  },
  {
    id: 4,
    title: "Turnaround Strategy",
    description:
      "We diagnosed the financial health of sick company which was running into financial trouble. We assisted the client in creating a turnaround strategy, formulating and implementing a comprehensive business plan for 5 years.",
  },
  {
    id: 5,
    title: "Restructuring",
    description:
      "We managed the implementation of a large restructuring project spanning across 5 countries and 10,000 employees.",
  },
  {
    id: 6,
    title: "Conversion into LLP",
    description:
      "We assisted the client in managing conversion of 3 companies into a Limited Liability Partnership.",
  },
  {
    id: 7,
    title: "COVID - 19 Preparedness",
    description:
      "We were engaged to perform scenario analysis, considering various shutdown periods, and to advise and implement, immediate cost cutting measures to conserve cash.",
  },
  {
    id: 8,
    title: "Performance Improvement",
    description:
      "We reviewed the Order to Cash process and advised recommendations to increase efficiencies.",
  },
  {
    id: 9,
    title: "Start-up Solution",
    description:
      "We assisted a start-up in selecting the right form of legal entity, incorporating the company and providing Virtual CFO services.",
  },
  {
    id: 10,
    title: "Stock Audit",
    description:
      "We performed the Physical verification of Fixed Assets and reconciliation of the fixed assets along with assisting in tagging of fixed assets with QR codes.",
  },
  {
    id: 11,
    title: "Conceptualization of a workflow tool",
    description:
      "We were engaged to conceptualize a workflow tool for preparation of proposals, tracking engagement deliverables, invoicing and management reporting.",
  },
  {
    id: 12,
    title: "Setup of HR Function",
    description:
      "We formulated the HR policies & procedures and the HR manual. We also designed and implemented the Performance Management System.",
  },
  {
    id: 13,
    title: "Standardization of Processes",
    description:
      "We were engaged to review, identify the scope for improvement and standardise finance processes across 8 cities in 5 countries to bring in consistencies.",
  },
  {
    id: 14,
    title: "Fixed Asset Register",
    description:
      "We reviewed and finalised the FAR of the organization and carried out the physical verification of fixed assets. Additionally, we assisted with tagging fixed assets with QR codes and reconciled the fixed assets.",
  },
  {
    id: 15,
    title: "Lower Tax Deduction",
    description:
      "We assisted the client in preparing financial statements along with filing of Lower tax Deduction application with the Assessing Officer.",
  },
];

export default function RecentProjects() {
  return (
    <section>
      <div className="max-w-screen-lg mx-auto py-11">
        <h1 className=" text-2xl text-center font-bold tracking-[-0.02em] text-app dark:text-white md:text-5xl md:leading-[5rem]">
          Recent Projects
        </h1>
        <p className="text-center text-gray-500 mx-auto text-sm mb-7 max-w-md">
          We measure our success by the success of our clients and strive to
          build long-term relationships based on trust, integrity, and mutual
          growth.
        </p>
        <div className="relative space-y-2">
          <EmblaCarousel options={{ loop: true }}>
            {recentProjects.map((project, idx) => (
              <EmblaCarouselItem key={project.id}>
                <ProjectCard
                  key={project.id}
                  {...project}
                  className="h-[250px] max-w-2xl"
                />
              </EmblaCarouselItem>
            ))}
          </EmblaCarousel>
        </div>
      </div>
    </section>
  );
}
