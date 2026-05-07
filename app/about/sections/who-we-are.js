export default function WhoWeAreSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-app/10 text-app text-xs font-semibold uppercase tracking-widest rounded-full mb-4">
            Who We Are
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-semibold text-gray-900 leading-[1.2] -tracking-[0.02em]">
            More than advisors —<br />
            we're <span className="text-app">implementation partners.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-12 lg:gap-20 items-start">
          {/* Left: Body Text */}
          <div className="space-y-6">
            <p className="text-gray-500 text-base leading-[1.8]">
              PV Advisory is an implementation consulting firm that stands at the forefront of delivering cutting-edge solutions to clients in India and around the globe. Founded by highly experienced ex-EY senior professionals, the firm boasts a wealth of expertise in a comprehensive range of services.
            </p>
            <p className="text-gray-500 text-base leading-[1.8]">
              PV Advisory sets itself apart with a deep understanding of the business landscape, industry trends, and emerging technologies, enabling it to offer strategic insights and innovative solutions that are grounded in practical reality.
            </p>
            <p className="text-gray-500 text-base leading-[1.8]">
              Our unwavering focus on implementation serves as a unique differentiator, highlighting our commitment to turning ideas into tangible results. At PV, excellence is not just a goal but a passion, and client satisfaction is the driving force behind every endeavor.
            </p>
            <p className="text-gray-500 text-base leading-[1.8]">
              With a dedication to staying at the forefront of industry best practices, PV Advisory is poised to continue making a significant impact in the world of implementation consulting.
            </p>
          </div>

          {/* Right: Vision & Mission Cards */}
          <div className="space-y-6">
            {/* Vision Card */}
            <div className="bg-[#F8F6F2] border border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-app/10 flex items-center justify-center text-app">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                </div>
                <h4 className="text-[14px] font-semibold uppercase tracking-[0.08em] text-app">Our Vision</h4>
              </div>
              <p className="text-gray-500 text-[14.5px] leading-[1.75]">
                To be a preferred and trusted change implementation partner by 2030, recognized for quality and customer delight, and to be a great place to work where people matter.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-[#F8F6F2] border border-gray-200 rounded-xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-app/10 flex items-center justify-center text-app">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                </div>
                <h4 className="text-[14px] font-semibold uppercase tracking-[0.08em] text-app">Our Mission</h4>
              </div>
              <p className="text-gray-500 text-[14.5px] leading-[1.75]">
                To experience the joy of passionately contributing and making a difference to our clients' businesses and thereby, adding value to our own business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
