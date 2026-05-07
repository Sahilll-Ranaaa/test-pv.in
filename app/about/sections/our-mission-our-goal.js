const values = [
  { title: "Customer delight", desc: "Exceeding expectations" },
  { title: "Quality", desc: "Whatever we do, we do it well" },
  { title: "Passion", desc: "Commitment and love for work" },
  { title: "Integrity", desc: "Do the right thing always" },
  { title: "Growth mindset", desc: "Act like an entrepreneur" },
  { title: "Teaming", desc: "Collaborate and help each other" },
];

export default function OurMissionOurGoal() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mission & Vision Column */}
          <div className="col-span-1 space-y-6 bg-app text-white p-8 rounded-2xl">
            <div>
              <h3 className="text-xl font-bold mb-2">Our Vision</h3>
              <p className="text-sm text-white/80">To be a preferred and trusted change implementation partner by 2030, recognized for quality and customer delight.</p>
            </div>
            <div className="w-8 h-px bg-white/30"></div>
            <div>
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-sm text-white/80">To experience the joy of passionately contributing and making a difference to our clients’ businesses.</p>
            </div>
          </div>

          {/* Values Grid */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Core Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {values.map((val, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start gap-3">
                  <div className="w-1.5 h-full min-h-[40px] bg-app rounded-full"></div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">{val.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{val.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
