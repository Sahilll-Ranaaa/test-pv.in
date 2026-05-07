export default function OurMethodologySection() {
  const steps = [
    { num: "Step 01", title: "Diagnosis", desc: "To provide an effective solution, it is imperative to diagnose the problem — understand where we are and where we want to be." },
    { num: "Step 02", title: "Design", desc: "We collaborate with your key personnel and teams to design the implementation plan aligned to your goals, with buy-in from those who drive change." },
    { num: "Step 03", title: "Implement", desc: "This phase is equally critical as design. Once timelines are agreed, we partner in the execution of the plan with full commitment." },
    { num: "Step 04", title: "Measure", desc: "We constantly monitor the effectiveness of the change initiative, reporting deviations and root causes to management." },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-app/10 text-app text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
          Our Methodology
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-semibold text-gray-900 leading-[1.2] mb-6 -tracking-[0.02em]">
              The DDIM<br />
              <span className="text-app">Framework</span>
            </h2>
            <p className="text-gray-500 text-[15px] leading-[1.8]">
              At each stage, we collaborate with your teams to ensure that the objectives of the intervention are clearly understood and successfully implemented.
            </p>
          </div>
          <div className="hidden lg:block text-[110px] font-bold text-app/5 leading-none tracking-tighter select-none text-right">
            DDIM
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border border-gray-200 rounded-xl overflow-hidden">
          {steps.map((step, idx) => (
            <div 
              key={idx} 
              className={`p-10 transition-all duration-500 ${
                idx === 0 ? "bg-app text-white" : "bg-white text-gray-900 border-t md:border-t-0 md:border-l border-gray-200"
              }`}
            >
              <div className={`text-[11px] font-bold uppercase tracking-[0.12em] mb-4 flex items-center gap-2 ${
                idx === 0 ? "text-white/70" : "text-app"
              }`}>
                <span className={`w-5 h-[2px] rounded-full ${idx === 0 ? "bg-white/50" : "bg-app"}`}></span>
                {step.num}
              </div>
              <h3 className={`text-[16px] font-bold mb-3 ${idx === 0 ? "text-white" : "text-gray-900"}`}>{step.title}</h3>
              <p className={`text-[13.5px] leading-[1.7] ${idx === 0 ? "text-white/75" : "text-gray-500"}`}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
