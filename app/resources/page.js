"use client";

import { useState, useMemo, useEffect } from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Download,
  ShieldCheck,
  Zap,
  BarChart,
  BookOpen,
  Search,
  Filter,
  ArrowRight,
  ChevronRight,
  X,
  User,
  Mail,
  Phone,
  CheckCircle2,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getCustomResources, saveLead } from "@/lib/admin-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import Image from "next/image";

const CATEGORIES = ["All", "Business life", "Finance management", "Company creation", "Invoicing", "Assessment", "Operations", "Reporting", "Compliance", "Strategy", "Reports", "E-books"];

const STATIC_RESOURCES = [
  {
    title: "CFO Health Score Checklist",
    description: "The complete 30-point diagnostic framework used by our professionals to assess finance function maturity.",
    icon: <ShieldCheck size={28} />,
    type: "PDF Guide",
    size: "1.2 MB",
    category: "Assessment",
    designedFor: "Medium-sized businesses",
    featured: true
  },
  {
    title: "P2P Efficiency Blueprint",
    description: "A step-by-step guide to automating your procurement-to-pay lifecycle and reducing manual entry by 40%.",
    icon: <Zap size={28} />,
    type: "Whitepaper",
    size: "2.5 MB",
    category: "Operations",
    designedFor: "Small businesses",
    featured: true
  },
  {
    title: "Monthly MIS Master Template",
    description: "A professional-grade financial reporting structure designed for growth-stage startups and SMEs.",
    icon: <BarChart size={28} />,
    type: "Excel Tool",
    size: "850 KB",
    category: "Reporting",
    designedFor: "Entrepreneurs",
    featured: false
  },
  {
    title: "2026 Compliance Calendar",
    description: "Stay ahead of statutory deadlines for GST, TDS, and corporate filings across India and SE Asia.",
    icon: <FileText size={28} />,
    type: "Interactive PDF",
    size: "500 KB",
    category: "Compliance",
    designedFor: "Accountants",
    featured: false
  },
  {
    title: "Virtual CFO Value Guide",
    description: "Understanding the ROI of fractional leadership: Case studies and cost-benefit analysis for founders.",
    icon: <BookOpen size={28} />,
    type: "E-Book",
    size: "3.1 MB",
    category: "Strategy",
    designedFor: "Medium-sized businesses",
    featured: false
  },
  {
    title: "Corporate Expense Policy Template",
    description: "Take control of team expenditures with this corporate expense policy template.",
    icon: <FileText size={28} />,
    type: "Template",
    size: "450 KB",
    category: "Finance management",
    designedFor: "Small businesses",
    featured: false
  },
  {
    title: "Business Account Switch Checklist",
    description: "Our essential guide for switching business accounts, so that you're sure to cover all the key steps.",
    icon: <FileText size={28} />,
    type: "Checklist",
    size: "300 KB",
    category: "Business life",
    designedFor: "Freelancers",
    featured: false
  }
];

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid business email"),
  mobile: z.string().min(10, "Valid mobile number is required"),
});

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [allResources, setAllResources] = useState(STATIC_RESOURCES);

  // Lead Gate State
  const [selectedResource, setSelectedResource] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    // Sync with URL params if any
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat && CATEGORIES.includes(cat)) {
      setActiveCategory(cat);
    }

    const custom = getCustomResources().map(r => ({
      ...r,
      icon: <FileText size={28} />,
    }));
    setAllResources([...custom, ...STATIC_RESOURCES]);
  }, []);

  const filteredResources = useMemo(() => {
    return allResources.filter(resource => {
      const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === "All" || resource.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, allResources]);

  const handleDownloadClick = (resource) => {
    setSelectedResource(resource);
    setIsSuccess(false);
    reset();
  };

  const triggerFileDownload = (resource) => {
    let downloadUrl = "";
    let fileName = resource.title;

    if (resource.fileData) {
      downloadUrl = resource.fileData;
      fileName = resource.fileName || (resource.title + ".pdf");
    } else {
      const blob = new Blob([`Asset: ${resource.title}\nDescription: ${resource.description}\n\nThank you for choosing PV Advisory.`], { type: 'text/plain' });
      downloadUrl = URL.createObjectURL(blob);
      fileName = resource.title.replace(/\s+/g, '_') + ".txt";
    }

    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // PAGINATION LOGIC
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredResources.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredResources, currentPage]);

  // Reset to page 1 on search or category change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);


  const onLeadSubmit = async (data) => {
    setIsGenerating(true);
    try {
      await saveLead({
        ...data,
        resourceId: selectedResource.id,
        resourceTitle: selectedResource.title,
        timestamp: new Date().toISOString()
      });
      setIsSuccess(true);
      // Simulate download
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
                Knowledge <span className="text-[#9f0202]">Repository</span>
              </h1>
              <p className="text-gray-500 text-xl leading-relaxed max-w-xl">
                Expert-vetted frameworks, automated tools, and strategic guides designed to scale your finance operations with precision.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative hidden lg:block aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl border-8 border-white"
            >
              <Image
                src="/about-us-hero.webp"
                alt="Hero Resource"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* SEARCH & FILTERS */}
      <section className="bg-white border-b border-gray-100 py-10">
        <MaxWidthWrapper>
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="relative w-full md:w-[400px]">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search Knowledge Repository..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-gray-50 border-gray-100 rounded-full focus:bg-white focus:border-[#9f0202] transition-all text-sm shadow-sm"
              />
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full flex-1">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-6 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border",
                    activeCategory === category
                      ? "bg-[#9f0202] text-white border-[#9f0202] shadow-md shadow-[#9f0202]/10"
                      : "bg-white text-gray-400 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </MaxWidthWrapper>
      </section>

      {/* GRID */}
      <MaxWidthWrapper className="py-24 max-w-[1440px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {paginatedResources.map((resource, idx) => (
              <motion.div 
                key={resource.id || resource.title}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -10 }}
                className="relative min-h-[340px] rounded-[1.5rem] overflow-hidden group cursor-pointer shadow-xl bg-white border border-gray-100 transition-all duration-500"
                onClick={() => handleDownloadClick(resource)}
              >
                {/* PATTERNED MAROON HEADER */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-[#9f0202] overflow-hidden">
                  {/* Micro-Grid Pattern Overlay */}
                  <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:12px_12px]" />
                  {/* Gradient Fade */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
                </div>
                
                <div className="relative h-full flex flex-col z-10">
                  {/* ICON SECTION */}
                  <div className="pt-12 pb-4 flex flex-col items-center justify-center">
                     <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-xl border border-gray-50 group-hover:scale-110 transition-all duration-500">
                        <FileText size={28} className="text-[#9f0202]" />
                     </div>
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 px-8 pb-6 text-center space-y-2">
                    <div className="inline-block px-3 py-1 bg-red-50 rounded-lg text-[9px] font-black text-[#9f0202] uppercase tracking-[0.2em] mb-1">
                       {resource.category}
                    </div>
                    <h3 className="text-lg font-black text-gray-900 leading-tight">
                      {resource.title}
                    </h3>
                    <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-3 mx-auto">
                      {resource.description}
                    </p>
                  </div>

                  {/* Footer Action */}
                  <div className="px-8 pb-8 mt-auto">
                    <div className="w-full h-12 rounded-xl border-2 border-[#9f0202]/10 flex items-center justify-center gap-2 text-[12px] font-bold text-[#9f0202] group-hover:bg-[#9f0202] group-hover:text-white group-hover:border-[#9f0202] transition-all duration-300">
                      Access Asset <ArrowRight size={14} />
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
                    <div className="w-16 h-16 bg-[#9f0202]/5 rounded-3xl flex items-center justify-center border border-[#9f0202]/10 shadow-sm">
                      <FileText size={28} className="text-[#9f0202]" />
                    </div>
                    <div className="space-y-3">
                      <h2 className="text-2xl font-black text-gray-900 tracking-tight">Access Asset</h2>
                      <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                        Secure your copy of <span className="font-bold text-[#9f0202]">&quot;{selectedResource.title}&quot;</span> by providing your professional details.
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit(onLeadSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Full Name</Label>
                        <Input {...register("name")} placeholder="John Doe" className="bg-gray-50 border-gray-100 h-12 rounded-xl focus:bg-white focus:border-[#9f0202] focus:ring-0 px-6 transition-all" />
                        {errors.name && <p className="text-[10px] text-red-500 ml-1">{errors.name.message}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Business Email</Label>
                        <Input {...register("email")} placeholder="john@company.com" className="bg-gray-50 border-gray-100 h-12 rounded-xl focus:bg-white focus:border-[#9f0202] focus:ring-0 px-6 transition-all" />
                        {errors.email && <p className="text-[10px] text-red-500 ml-1">{errors.email.message}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] text-gray-400 font-black uppercase tracking-widest ml-1">Mobile Number</Label>
                      <Input {...register("mobile")} placeholder="+91 98765 43210" className="bg-gray-50 border-gray-100 h-12 rounded-xl focus:bg-white focus:border-[#9f0202] focus:ring-0 px-6 transition-all" />
                      {errors.mobile && <p className="text-[10px] text-red-500 ml-1">{errors.mobile.message}</p>}
                    </div>

                    <div className="pt-4">
                      <Button type="submit" disabled={isGenerating} className="w-full bg-[#9f0202] hover:bg-[#7a0101] text-white h-14 font-bold rounded-xl shadow-xl shadow-[#9f0202]/20 text-md transition-all active:scale-[0.98]">
                        {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <Download className="mr-2 h-4 w-4" />}
                        {isGenerating ? "Preparing Asset..." : "Get Detailed Resource"}
                      </Button>
                      <p className="text-[9px] text-center text-gray-400 mt-4 uppercase tracking-widest font-medium">
                        Instant Access • Professional PDF & Excel Assets
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
                    <h2 className="text-2xl font-black text-gray-900 tracking-tight">Started</h2>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">Your file is being downloaded now.</p>
                  </div>
                  <Button variant="outline" onClick={() => setSelectedResource(null)} className="border-gray-200 text-gray-600 h-12 px-8 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm">
                    Return to Repository
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
