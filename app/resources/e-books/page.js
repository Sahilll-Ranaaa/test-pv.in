"use client";

import { useState, useMemo, useEffect } from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Download, 
  Search, 
  ArrowRight, 
  ChevronRight, 
  CheckCircle2,
  Loader2,
  FileText,
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { saveLead } from "@/lib/admin-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";

const EBOOKS_DATA = [
  {
    id: "eb-1",
    title: "Mastering Procurement ROI",
    description: "A comprehensive guide on identifying hidden savings and maximizing return on investment in your procurement function.",
    category: "Strategy",
    size: "1.2 MB"
  },
  {
    id: "eb-2",
    title: "The Future of CFO Strategy 2026",
    description: "Expert predictions and frameworks for the evolving role of the CFO in a post-AI financial landscape.",
    category: "Finance",
    size: "2.4 MB"
  },
  {
    id: "eb-3",
    title: "AI Integration in Finance",
    description: "Practical steps to implementing artificial intelligence in your daily finance and accounting workflows.",
    category: "Operations",
    size: "0.8 MB"
  },
  {
    id: "eb-4",
    title: "Statutory Compliance Handbook",
    description: "The definitive guide to navigating Indian statutory compliance for high-growth startups and enterprises.",
    category: "Compliance",
    size: "3.1 MB"
  },
  {
    id: "eb-5",
    title: "Global Spend Visibility Guide",
    description: "Learn how to achieve 100% spend visibility across global operations using modern data analytics.",
    category: "Reporting",
    size: "1.5 MB"
  },
  {
    id: "eb-6",
    title: "CFO Playbook: Scaling Fast",
    description: "A step-by-step roadmap for scaling finance operations from Seed to Series C and beyond.",
    category: "Business",
    size: "4.2 MB"
  },
  {
    id: "eb-7",
    title: "Vendor Risk Management",
    description: "Protect your supply chain with our proven framework for assessing and mitigating vendor-related risks.",
    category: "Strategy",
    size: "1.1 MB"
  },
  {
    id: "eb-8",
    title: "Automating P2P Lifecycle",
    description: "Reduce manual errors and processing time by 70% with our automated procurement-to-pay guide.",
    category: "Operations",
    size: "0.9 MB"
  },
  {
    id: "eb-9",
    title: "Digital Transformation Blueprint",
    description: "The complete guide to leading digital transformation within your finance organization.",
    category: "Strategy",
    size: "2.8 MB"
  }
];

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid business email"),
  mobile: z.string().min(10, "Valid mobile number required"),
});

export default function EbooksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedResource, setSelectedResource] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(schema)
  });

  const filteredEbooks = useMemo(() => {
    return EBOOKS_DATA.filter(eb => 
      eb.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      eb.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  // PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredEbooks.length / itemsPerPage);
  
  const paginatedEbooks = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredEbooks.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredEbooks, currentPage]);

  const handleDownloadClick = (ebook) => {
    setSelectedResource(ebook);
    setIsSuccess(false);
    reset();
  };

  const onLeadSubmit = async (data) => {
    setIsGenerating(true);
    try {
      await saveLead({
        ...data,
        resourceId: selectedResource.id,
        resourceTitle: selectedResource.title,
        type: "E-book",
        timestamp: new Date().toISOString()
      });
      setIsSuccess(true);
      setTimeout(() => {
        setIsGenerating(false);
      }, 1500);
    } catch (error) {
      console.error("Lead storage failed:", error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-32">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-28 bg-white border-b border-gray-100">
        <MaxWidthWrapper>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-7xl font-bold text-gray-900 leading-tight">
                Exclusive <span className="text-[#9f0202]">E-books</span>
              </h1>
              <p className="text-gray-500 text-xl leading-relaxed max-w-xl">
                Deep-dive into strategic financial insights and procurement frameworks with our curated library of professional e-books.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative hidden lg:block aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
            >
              <Image 
                src="/about-us-hero.webp" 
                alt="Ebooks Hero" 
                fill 
                className="object-cover"
              />
            </motion.div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* SEARCH */}
      <section className="bg-white border-b border-gray-100 py-10">
        <MaxWidthWrapper>
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="relative w-full md:w-[500px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search our e-books library..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-gray-50 border-gray-100 rounded-full focus:bg-white focus:border-[#9f0202] transition-all text-sm shadow-sm"
              />
            </div>
            <div className="text-sm font-medium text-gray-400">
              Showing {filteredEbooks.length} E-books
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* GRID */}
      <MaxWidthWrapper className="py-24 max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {paginatedEbooks.map((ebook, idx) => (
              <motion.div 
                key={ebook.id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                className="relative min-h-[340px] rounded-[1.5rem] overflow-hidden group cursor-pointer shadow-xl bg-white border border-gray-100 transition-all duration-500 hover:shadow-2xl"
                onClick={() => handleDownloadClick(ebook)}
              >
                <div className="relative h-full p-0 flex flex-col z-10">
                  {/* ICON SECTION */}
                  <div className="pt-12 pb-6 flex flex-col items-center justify-center">
                     <div className="w-20 h-20 bg-red-50/50 rounded-2xl flex items-center justify-center border border-red-100 group-hover:scale-110 group-hover:border-[#9f0202]/20 transition-all duration-500">
                        <BookOpen size={32} className="text-[#9f0202]" />
                     </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 px-8 pb-6 text-center space-y-3">
                    <div className="inline-block px-3 py-1 bg-red-50 rounded-lg text-[9px] font-black text-[#9f0202] uppercase tracking-[0.2em] mb-1">
                       {ebook.category}
                    </div>
                    <h3 className="text-lg font-black text-[#9f0202] leading-tight">
                      {ebook.title}
                    </h3>
                    <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-3 mx-auto">
                      {ebook.description}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="px-8 pb-8 mt-auto">
                    <div className="w-full h-12 rounded-xl border-2 border-[#9f0202]/10 flex items-center justify-center gap-2 text-[12px] font-bold text-[#9f0202] group-hover:bg-[#9f0202] group-hover:text-white group-hover:border-[#9f0202] transition-all duration-300">
                      Read E-book <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div className="mt-20 flex items-center justify-center gap-2">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="rounded-xl h-12 w-12 border-gray-200"
            >
              <ChevronRight size={20} className="rotate-180" />
            </Button>
            
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
                className={cn(
                  "rounded-xl h-12 w-12 font-bold",
                  currentPage === i + 1 ? "bg-[#9f0202] hover:bg-[#7a0101]" : "border-gray-200 text-gray-500"
                )}
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="rounded-xl h-12 w-12 border-gray-200"
            >
              <ChevronRight size={20} />
            </Button>
          </div>
        )}
      </MaxWidthWrapper>

      {/* LEAD GATE MODAL */}
      <AnimatePresence>
        {selectedResource && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedResource(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden"
            >
              {!isSuccess ? (
                <div className="p-8 md:p-10">
                  <div className="flex flex-col items-center text-center space-y-4 mb-10">
                     <div className="w-16 h-16 bg-[#9f0202]/5 rounded-3xl flex items-center justify-center border border-[#9f0202]/10">
                        <BookOpen size={28} className="text-[#9f0202]" />
                     </div>
                     <div className="space-y-2">
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight">Get Free Access</h2>
                        <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                          Submit your professional details to receive <span className="font-bold text-[#9f0202]">&quot;{selectedResource.title}&quot;</span> directly in your inbox.
                        </p>
                     </div>
                  </div>

                  <form onSubmit={handleSubmit(onLeadSubmit)} className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Full Name</Label>
                      <Input {...register("name")} placeholder="John Doe" className="bg-gray-50 border-gray-100 h-12 rounded-xl focus:bg-white focus:border-[#9f0202] px-6 transition-all" />
                      {errors.name && <p className="text-[10px] text-red-500 ml-1">{errors.name.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Business Email</Label>
                      <Input {...register("email")} placeholder="john@company.com" className="bg-gray-50 border-gray-100 h-12 rounded-xl focus:bg-white focus:border-[#9f0202] px-6 transition-all" />
                      {errors.email && <p className="text-[10px] text-red-500 ml-1">{errors.email.message}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Mobile Number</Label>
                      <Input {...register("mobile")} placeholder="+91 98765 43210" className="bg-gray-50 border-gray-100 h-12 rounded-xl focus:bg-white focus:border-[#9f0202] px-6 transition-all" />
                      {errors.mobile && <p className="text-[10px] text-red-500 ml-1">{errors.mobile.message}</p>}
                    </div>

                    <div className="pt-4">
                      <Button type="submit" disabled={isGenerating} className="w-full bg-[#9f0202] hover:bg-[#7a0101] text-white h-14 font-bold rounded-xl shadow-xl shadow-[#9f0202]/20 text-md transition-all active:scale-[0.98]">
                        {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <BookOpen className="mr-2 h-4 w-4" />}
                        {isGenerating ? "Processing..." : "Get Free E-book"}
                      </Button>
                      <p className="text-[9px] text-center text-gray-400 mt-4 uppercase tracking-widest font-medium">
                        Secure Access • Premium Strategic Content
                      </p>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="p-10 md:p-14 text-center space-y-6">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto border-4 border-green-100 shadow-sm">
                    <CheckCircle2 size={32} />
                  </div>
                  <div className="space-y-2">
                     <h2 className="text-2xl font-black text-gray-900 tracking-tight">Email Sent</h2>
                     <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">Your e-book has been sent. Please check your inbox for the link.</p>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedResource(null)} className="border-gray-200 text-gray-600 h-12 px-8 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm">
                    Browse More Books
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
