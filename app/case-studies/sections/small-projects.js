import { cn } from "@/lib/utils";

const items = [
  {
    title: "Standardization of Processes",
    subTitle: "Unified Finance Operations Across 5 Nations",
    description: "Standardized finance processes across 8 cities in 5 countries, bringing consistency and efficiency to global operations.",
  },
  {
    title: "Internal Audits",
    subTitle: "Recovered $1 Million via Asset Management",
    description: "Revamped fixed asset management processes, delivering $1 million in savings by optimizing disposal strategies.",
  },
  {
    title: "Standardization of Processes",
    subTitle: "HR Excellence & Performance Management",
    description: "Formulated HR policies, developed a comprehensive manual, and implemented a performance management system.",
  },
  {
    title: "Virtual CFO",
    subTitle: "Fixed Assets Tagged & Reconciled",
    description: "Verified and reconciled fixed assets, introducing QR code tagging for streamlined tracking and inventory accuracy.",
  },
];

export default function SmallProjects() {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            Additional Success Stories
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((project, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm flex items-start gap-4 hover:border-app transition-colors"
            >
              <div className="mt-1 min-w-8 h-8 rounded-full bg-app/10 flex items-center justify-center flex-shrink-0 text-app font-bold text-sm">
                0{idx + 1}
              </div>
              <div>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  {project.title}
                </span>
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                  {project.subTitle}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
