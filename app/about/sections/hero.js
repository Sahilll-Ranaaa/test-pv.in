import Image from "next/image";
import BlurIn from "@/components/text-animations/blur-in";
import { FadeText } from "@/components/text-animations/fade-text";

export default function HeroSection() {
  const tags = ["Consulting", "Outsourcing", "Tech Solutions", "Start-up Solutions", "Ex-EY Founded"];
  const services = [
    { title: "Consulting", href: "/consulting" },
    { title: "Outsourcing", href: "/outsourcing" },
    { title: "Technology Solutions", href: "/technology" },
    { title: "Start-up Solutions", href: "/start-up-solution" }
  ];

  return (
    <section className="relative min-h-[85vh] flex items-center pt-32 pb-16 bg-white border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
        
        {/* Left Content */}
        <div className="space-y-8">
          <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-400 uppercase tracking-[0.15em]">
            Company <span className="text-gray-300">/</span> <span className="text-app">About Us</span>
          </div>
          
          <h1 className="text-[40px] md:text-[56px] lg:text-[64px] font-semibold text-gray-900 leading-[1.05] -tracking-[0.03em]">
            Implementation <br />
            consulting built on <br />
            <span className="text-app">real expertise.</span>
          </h1>

          <p className="text-gray-500 text-[16px] leading-[1.8] max-w-xl">
            Founded by ex-EY senior professionals, PV Advisory delivers consulting, outsourcing, tech, and start-up solutions to clients across India and the world.
          </p>

          <div className="flex flex-wrap gap-3">
            {tags.map(tag => (
              <span key={tag} className="px-5 py-2.5 rounded-full border border-gray-200 bg-white text-[13px] font-medium text-gray-600 transition-colors hover:border-gray-300">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Card */}
        <div className="lg:pl-8">
          <div className="bg-[#F8F6F2] rounded-[16px] p-8 md:p-10 relative">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-app/10 text-app text-[11px] font-bold tracking-wider rounded-full w-fit mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-app"></span>
              Ex-EY Founded
            </div>
            
            <h3 className="text-[22px] font-semibold text-gray-900 mb-4 mt-2">Comprehensive Services</h3>
            <p className="text-gray-500 text-[14.5px] leading-[1.75] mb-8 pr-4">
              PV Advisory delivers end-to-end implementation expertise across four key practice areas designed to drive real business outcomes.
            </p>

            <div className="space-y-3">
              {services.map((service, idx) => (
                <a 
                  key={idx} 
                  href={service.href}
                  className="flex items-center justify-between p-4 rounded-xl transition-all bg-white border border-transparent hover:border-app hover:shadow-md group/item"
                >
                  <span className="text-[14.5px] font-medium text-gray-800 group-hover/item:text-app transition-colors">
                    {service.title}
                  </span>
                  <span className="text-gray-400 group-hover/item:text-app transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
