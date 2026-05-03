"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SurveySection from "../sections/survey-section";
import { motion } from "framer-motion";
import Link from "next/link";

function AssessmentContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col relative">
      {/* Standalone Header (Back button removed as requested) */}
      <nav className="w-full p-6 bg-white border-b border-gray-100 flex justify-center items-center shadow-sm z-50">
        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
          Secure Assessment Portal
        </div>
      </nav>

      {/* Main Focus Area */}
      <div className="flex-1 flex flex-col items-center justify-center py-8 px-4">
        <div className="w-full max-w-4xl flex justify-center">
          <SurveySection preselectedType={type} isStandalone={true} />
        </div>
      </div>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-400 text-[10px] uppercase tracking-widest bg-white/50 border-t border-gray-100">
        &copy; 2026 PV Advisory • Confidential Business Health Assessment
      </footer>
    </div>
  );
}

export default function AssessmentPage() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);
  if (!isClient) return null;

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>}>
      <AssessmentContent />
    </Suspense>
  );
}
