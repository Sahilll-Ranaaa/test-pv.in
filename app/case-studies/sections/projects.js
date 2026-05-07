import { cn } from "@/lib/utils";

const projects = [
  {
    title: "Managed Services",
    subTitle: "Managing $500M+ Finances",
    result: "Streamlined financial reporting and secretarial compliance for a manufacturing giant, enhancing operational accuracy and governance.",
  },
  {
    title: "Finance Function",
    subTitle: "Reduced Core Process Costs",
    result: "Redesigned finance workflows, identified inefficiencies, and delivered a plan that significantly cut operational costs.",
  },
  {
    title: "Virtual CFO",
    subTitle: "Tax-Smart Operations in SG & IN",
    result: "Optimized tax structures under DTAA and leveraged SEZ benefits, enabling robust treasury management.",
  },
  {
    title: "Compliance Tool",
    subTitle: "100% Compliance Tracked",
    result: "Developed Comp-ally, leading to a 30% reduction in breaches and eliminating manual tracking via automated alerts.",
  },
  {
    title: "P2P Implementation",
    subTitle: "40% Cost Savings",
    result: "Deployed Pay-ally SaaS, reducing procurement cycle times by 50% and driving measurable savings.",
  },
  {
    title: "Custom CRM",
    subTitle: "25% Increase in Acquisition",
    result: "Streamlined customer onboarding and contract creation, vastly improving funnel management efficiency.",
  },
  {
    title: "Cash Application",
    subTitle: "Reduced AR Cycle by 60%",
    result: "Automated manual cash application efforts, optimizing receipt matching and accelerating cash flow turnaround.",
  },
  {
    title: "Data Analytics",
    subTitle: "25% Faster Insights",
    result: "Built a centralized KPI dashboard providing real-time trend analysis to drive immediate business growth decisions.",
  },
  {
    title: "Global Capability",
    subTitle: "300+ FTEs Deployed",
    result: "Setup a GCC supporting operations across 150+ countries for a leading global accounting firm.",
  },
  {
    title: "F&A Shared Services",
    subTitle: "30% Efficiency Gains",
    result: "Standardized processes and reduced overhead for an MNC by establishing an F&A Shared Services Centre in India.",
  },
  {
    title: "SaaS P2P",
    subTitle: "Supporting ID & VN",
    result: "Managed end-to-end procurement and payment support seamlessly from India for regional process efficiency.",
  },
  {
    title: "Start-up Solution",
    subTitle: "From Incorporation to CFO",
    result: "Delivered structured financial planning and strategic support to accelerate investor readiness.",
  },
];

export default function Projects() {
  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Core Transformations</h2>
          <div className="hidden sm:block h-px flex-1 bg-gray-200 ml-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
          {projects.map((project, idx) => (
            <div key={idx} className="group p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-app hover:bg-white hover:shadow-lg transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-app uppercase tracking-wider">{project.title}</span>
                <h3 className="text-lg font-bold text-gray-900 mt-1 leading-tight group-hover:text-app transition-colors">{project.subTitle}</h3>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-200 group-hover:border-app/20">
                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                  <strong className="text-gray-900 font-semibold mr-1">Result:</strong>
                  {project.result}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
