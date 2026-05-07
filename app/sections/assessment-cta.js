"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Wallet } from "lucide-react";
import Link from "next/link";

export default function AssessmentCTA() {
  return (
    <section id="assessment" className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-1/4 h-full bg-gray-50 -skew-x-12 transform translate-x-1/2" />
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#9f0202]/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
            
            {/* Left Content: Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-6 text-left"
            >
              <div className="inline-block px-3 py-1 bg-[#9f0202]/5 rounded-full border border-[#9f0202]/10">
                <span className="text-[#9f0202] text-[10px] font-bold uppercase tracking-widest">Self Assessment</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                Assess Your <br/>
                <span className="text-[#9f0202]">Business Health</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed max-w-sm">
                Identify operational gaps and unlock growth potential with our specialized assessment tools designed for modern finance functions.
              </p>
            </motion.div>

            {/* Right Content: Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hiding Pay-Ally P2P card as requested */}
              {/* <motion.div ... /> */}

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:border-[#9f0202]/20 transition-all group max-w-sm"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#9f0202] mb-5 group-hover:bg-[#9f0202] group-hover:text-white transition-all">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Finance Health Checkup</h3>
                <p className="text-gray-500 text-xs mb-6 leading-relaxed">
                  Deep dive into governance and technology readiness.
                </p>
                <Link href="/assessment?type=finance">
                  <Button variant="ghost" className="p-0 h-auto text-[#9f0202] hover:bg-transparent hover:text-[#7a0101] font-bold group/btn">
                    Start Assessment <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
