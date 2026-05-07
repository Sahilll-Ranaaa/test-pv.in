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
<<<<<<< HEAD
  ChevronRight,
  ChevronLeft,
=======
  Filter,
  ArrowRight,
  ChevronRight,
>>>>>>> 335a43b3608bfa3ea417469e77b65dd2246a57bc
  X,
  Loader2,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { getCustomResources, saveLead } from "@/lib/admin-store";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Image from "next/image";
import "./resources.css";
import { supabase } from "@/lib/supabase";
import { PhoneInput } from "@/components/ui/phone-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import { validateProfessionalEmail } from "@/lib/email-validator";

const CATEGORIES = ["All", "Business life", "Finance management", "Company creation", "Invoicing", "Assessment", "Operations", "Reporting", "Compliance", "Strategy"];

const STATIC_RESOURCES = [
  {
    title: "CFO Health Score Checklist",
    description: "The complete 30-point diagnostic framework used by our professionals to assess finance function maturity.",
    category: "Assessment",
    featured: true
  },
  {
    title: "P2P Efficiency Blueprint",
    description: "A step-by-step guide to automating your procurement-to-pay lifecycle and reducing manual entry by 40%.",
    category: "Operations",
    featured: true
  },
  {
    title: "Monthly MIS Master Template",
    description: "A professional-grade financial reporting structure designed for growth-stage startups and SMEs.",
    category: "Reporting",
    featured: false
  },
  {
    title: "2026 Compliance Calendar",
    description: "Stay ahead of statutory deadlines for GST, TDS, and corporate filings across India and SE Asia.",
    category: "Compliance",
    featured: false
  },
  {
    title: "Virtual CFO Value Guide",
    description: "Understanding the ROI of fractional leadership: Case studies and cost-benefit analysis for founders.",
    category: "Strategy",
    featured: false
  },
  {
    title: "Corporate Expense Policy Template",
    description: "Take control of team expenditures with this corporate expense policy template.",
    category: "Finance management",
    featured: false
  },
  {
    title: "Business Account Switch Checklist",
    description: "Our essential guide for switching business accounts, so that you're sure to cover all the key steps.",
    category: "Business life",
    featured: false
  },
  {
    title: "Startup Equity Guide",
    description: "Everything you need to know about cap tables and equity distribution for founders.",
    category: "Strategy",
    featured: false
  },
  {
    title: "Inventory Audit Manual",
    description: "A comprehensive guide to conducting internal inventory audits effectively.",
    category: "Operations",
    featured: false
  },
  {
    title: "Cash Flow Forecasting Tool",
    description: "A dynamic Excel framework for 13-week rolling cash flow projections.",
    category: "Finance management",
    featured: false
  },
  {
    title: "Vendor Onboarding Protocol",
    description: "Standardize your supplier relationship management with this compliance-first protocol.",
    category: "Operations",
    featured: false
  },
  {
    title: "Series B Readiness Audit",
    description: "Is your finance function ready for the next level of institutional funding?",
    category: "Assessment",
    featured: false
  },
  {
    title: "Tax Optimization Framework",
    description: "Strategic tax planning for cross-border operations in the digital economy.",
    category: "Compliance",
    featured: false
  },
  {
    title: "Board Reporting Dashboard",
    description: "Key metrics and visualizations that your board of directors actually cares about.",
    category: "Reporting",
    featured: false
  },
  {
    title: "Mergers & Acquisitions Playbook",
    description: "Financial due diligence and post-merger integration strategies for scaling companies.",
    category: "Strategy",
    featured: false
  },
  {
    title: "Employee Stock Option Plan (ESOP)",
    description: "Designing effective equity incentives to attract and retain top talent.",
    category: "Business life",
    featured: false
  },
  {
    title: "Risk Management Matrix",
    description: "Identify and mitigate operational and financial risks before they impact your bottom line.",
    category: "Compliance",
    featured: false
  },
  {
    title: "Working Capital Optimizer",
    description: "Strategies to reduce your cash conversion cycle and unlock trapped capital.",
    category: "Finance management",
    featured: false
  },
  {
    title: "Procurement Policy Template",
    description: "Establish clear guidelines for purchasing and spend management across your organization.",
    category: "Operations",
    featured: false
  },
  {
    title: "Annual Budgeting Framework",
    description: "A collaborative approach to setting and tracking financial goals for the fiscal year.",
    category: "Reporting",
    featured: false
  },
  {
    title: "Strategic Exit Planning",
    description: "Preparing your business for a successful acquisition or IPO: The financial roadmap.",
    category: "Strategy",
    featured: false
  },
  {
    title: "Digital Transformation Guide",
    description: "Navigating the shift to cloud-based finance systems and automated workflows.",
    category: "Operations",
    featured: false
  },
  {
    title: "Internal Controls Checklist",
    description: "Prevent fraud and ensure data integrity with these essential financial controls.",
    category: "Compliance",
    featured: false
  },
  {
    title: "Unit Economics Calculator",
    description: "Analyze CAC, LTV, and payback periods to ensure sustainable business growth.",
    category: "Finance management",
    featured: false
  },
  {
    title: "Quarterly Tax Planner",
    description: "Proactively manage your tax liabilities with our quarterly planning tool.",
    icon: <FileText size={28} />,
    type: "Template",
    size: "1.1 MB",
    category: "Compliance",
    designedFor: "Small businesses",
    featured: false
  },
  {
    title: "Startup Equity Guide",
    description: "Everything you need to know about cap tables and equity distribution for founders.",
    icon: <FileText size={28} />,
    type: "E-Book",
    size: "4.2 MB",
    category: "Strategy",
    designedFor: "Entrepreneurs",
    featured: false
  },
  {
    title: "Inventory Audit Manual",
    description: "A comprehensive guide to conducting internal inventory audits effectively.",
    icon: <FileText size={28} />,
    type: "PDF Guide",
    size: "1.8 MB",
    category: "Operations",
    designedFor: "Medium-sized businesses",
    featured: false
  },
  {
    title: "Digital Transformation Roadmap",
    description: "Strategy for migrating legacy finance processes to modern cloud-based solutions.",
    icon: <FileText size={28} />,
    type: "Whitepaper",
    size: "2.9 MB",
    category: "Technology",
    designedFor: "CFOs",
    featured: false
  },
  {
    title: "Payroll Processing Checklist",
    description: "Ensure error-free monthly payroll processing with our detailed checklist.",
    icon: <FileText size={28} />,
    type: "Checklist",
    size: "400 KB",
    category: "Operations",
    designedFor: "HR Managers",
    featured: false
  }
];

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email format").refine(val => {
    const res = validateProfessionalEmail(val);
    return res.isValid;
  }, {
    message: "Please provide a valid professional email address"
  }),
  mobile: z.string().min(10, "Phone number must be at least 10 digits"),
});

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [allResources, setAllResources] = useState(STATIC_RESOURCES);

  // Lead Gate State
  const [selectedResource, setSelectedResource] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

<<<<<<< HEAD
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
=======
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
>>>>>>> 335a43b3608bfa3ea417469e77b65dd2246a57bc
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      mobile: "",
    }
  });

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    const custom = getCustomResources().map(r => ({
      ...r,
<<<<<<< HEAD
=======
      icon: <FileText size={28} />,
>>>>>>> 335a43b3608bfa3ea417469e77b65dd2246a57bc
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

<<<<<<< HEAD
  // PAGINATION LOGIC
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
=======
  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredResources.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredResources, currentPage]);

  const totalPages = Math.ceil(filteredResources.length / ITEMS_PER_PAGE);
>>>>>>> 335a43b3608bfa3ea417469e77b65dd2246a57bc

  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredResources.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredResources, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const onLeadSubmit = async (data) => {
    setIsGenerating(true);
<<<<<<< HEAD
    try {
      // 1. Local storage fallback
      await saveLead({
        ...data,
        resourceId: selectedResource.id,
        resourceTitle: selectedResource.title,
        timestamp: new Date().toISOString()
      });
=======

    // Simulate generation delay to match survey experience
    await new Promise(r => setTimeout(r, 1500));
>>>>>>> 335a43b3608bfa3ea417469e77b65dd2246a57bc

      // 2. Supabase storage
      if (supabase) {
        const { error: supabaseError } = await supabase
          .from('PvAdvisoryLeadData')
          .insert([{
            name: data.name,
            email: data.email,
            mobile: data.mobile,
            activity_title: selectedResource.title,
            activity_type: "Resource Download",
            score: null,
            dimension_scores: null,
            answers: null,
            report_url: null
          }]);

        if (supabaseError) throw supabaseError;
      }

      setIsSuccess(true);
      setTimeout(() => {
        setIsGenerating(false);
      }, 1500);
    } catch (error) {
      console.error("Lead storage failed:", error);
      setIsGenerating(false);
      // We still show success if it failed but we might want to alert if it's critical
    }
  };

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-white pb-32">
      {/* HERO SECTION */}
      <section className="header-section pt-24 pb-8">
        <MaxWidthWrapper className="max-w-[1400px] px-8">
          <div className="max-w-2xl">
            <div className="hero-badge">RESOURCE LIBRARY</div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Knowledge <span className="text-[#8b0202]">Repository</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed font-medium">
              Expert-vetted frameworks, automated tools, and strategic guides designed to scale your finance operations with precision.
            </p>
=======
    <div className="min-h-screen bg-[#fafafa]">

      {/* COMPACT HERO HEADER */}
      <section className="relative pt-24 pb-10 bg-white border-b border-gray-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#9f0202]/[0.02] -skew-x-12 transform origin-top" />
        <MaxWidthWrapper>
          <div className="relative z-10 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#9f0202]/5 rounded-full border border-[#9f0202]/10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#9f0202]">Resource Library</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                Knowledge <span className="text-[#9f0202]">Repository</span>
              </h1>
              <p className="text-gray-500 text-base leading-relaxed max-w-2xl">
                Expert-vetted frameworks, automated tools, and strategic guides designed to scale your finance operations with precision.
              </p>
            </motion.div>
>>>>>>> 335a43b3608bfa3ea417469e77b65dd2246a57bc
          </div>
        </MaxWidthWrapper>
      </section>

<<<<<<< HEAD
      {/* MAIN CONTENT WITH SIDEBAR */}
      <MaxWidthWrapper className="max-w-[1400px] px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-16">

          {/* SIDEBAR */}
          <aside className="space-y-12">
            {/* SEARCH */}
            <div className="space-y-4">
              <h3 className="sidebar-label">Search</h3>
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#8b0202] transition-colors" size={14} />
=======
      <MaxWidthWrapper className="py-12 max-w-[920px]">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* LEFT SIDEBAR */}
          <aside className="w-full lg:w-1/4 space-y-10">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
>>>>>>> 335a43b3608bfa3ea417469e77b65dd2246a57bc
                <Input
                  placeholder="Find a tool or guide..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-10 bg-white border-gray-100 rounded-xl shadow-sm focus:border-[#8b0202] focus:ring-0 transition-all text-xs font-medium"
                />
              </div>
            </div>

            {/* CATEGORIES */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="sidebar-label">Categories</h3>
                <Filter size={14} className="text-gray-300" />
              </div>
              <div className="flex flex-col">
                {CATEGORIES.map(category => (
                  <div
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
<<<<<<< HEAD
                      "category-item",
                      activeCategory === category && "active"
=======
                      "text-left px-3 py-2.5 text-sm rounded-xl transition-all flex items-center justify-between group",
                      activeCategory === category
                        ? "bg-[#9f0202] text-white font-bold shadow-md shadow-[#9f0202]/10"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
>>>>>>> 335a43b3608bfa3ea417469e77b65dd2246a57bc
                    )}
                  >
                    <span>{category}</span>
                    <div className="dot-indicator" />
                    <ChevronRight className="chevron-icon" />
                  </div>
                ))}
              </div>
            </div>
          </aside>

<<<<<<< HEAD
          {/* GRID */}
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              <AnimatePresence mode="popLayout">
                {paginatedResources.map((resource) => (
                  <motion.div
                    key={resource.id || resource.title}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="resource-card px-6 py-12 group cursor-pointer"
                    onClick={() => setSelectedResource(resource)}
                  >

                    <div className="logo-square">
                      <Image
                        src="/pv-logo.png"
                        alt="PV Logo"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>

                    <div className="category-label flex flex-nowrap gap-[0.2em]">
                      {resource.category.split('').map((char, i) => (
                        <span key={i}>{char}</span>
                      ))}
                    </div>
                    <h3 className="resource-title">{resource.title}</h3>

                    {/* Bottom Gradient/Fade Effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#8b0202]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 pt-8">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => prev - 1)}
                  className="pagination-btn disabled:opacity-30"
                >
                  <span className="mr-1 text-gray-400">Previous</span>
                </button>

                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={cn(
                      "pagination-btn",
                      currentPage === i + 1 && "active"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  className="pagination-btn disabled:opacity-30"
                >
                  <span className="ml-1 text-gray-400">Next</span>
                </button>
              </div>
            )}
          </div>
=======
          {/* MAIN CONTENT AREA */}
          <main className="flex-1 space-y-12">


            {/* Regular Grid */}
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <AnimatePresence mode="popLayout">
                  {paginatedResources.map((resource) => (
                    <motion.div
                      layout
                      key={resource.id || resource.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ scale: 1.05, y: -8 }}
                      onClick={() => handleDownloadClick(resource)}
                      className="bg-white rounded-[2rem] border border-gray-100 p-8 hover:shadow-3xl transition-all duration-500 group relative overflow-hidden flex flex-col min-h-[340px] cursor-pointer"
                    >
                      {/* Soft Maroon Effect from Bottom Right */}
                      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-[#9f0202]/[0.12] group-hover:bg-[#9f0202]/[0.2] blur-[80px] rounded-full transition-all duration-500 pointer-events-none" />

                      {/* Wavy Background Effect */}
                      <div className="absolute top-0 right-0 w-full h-32 opacity-[0.15] group-hover:opacity-[0.25] transition-opacity pointer-events-none">
                        <svg width="100%" height="100%" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                          <path d="M0 50 C 50 20, 100 80, 150 50 C 200 20, 250 80, 300 50 C 350 20, 400 80, 450 50" stroke="#9f0202" fill="transparent" strokeWidth="1.5" />
                          <path d="M0 70 C 50 40, 100 100, 150 70 C 200 40, 250 100, 300 70 C 350 40, 400 100, 450 70" stroke="#9f0202" fill="transparent" strokeWidth="1.5" />
                          <path d="M0 90 C 50 60, 100 120, 150 90 C 200 60, 250 120, 300 90 C 350 60, 400 120, 450 90" stroke="#9f0202" fill="transparent" strokeWidth="1.5" />
                          <path d="M0 110 C 50 80, 100 140, 150 110 C 200 80, 250 140, 300 110 C 350 80, 400 140, 450 110" stroke="#9f0202" fill="transparent" strokeWidth="1.5" />
                        </svg>
                      </div>

                      <div className="flex flex-col h-full space-y-7 relative z-10">
                        <div className="flex justify-between items-start">
                          <div className="w-[54px] h-[54px] bg-white shadow-sm border border-gray-50 rounded-2xl flex items-center justify-center p-2.5 group-hover:scale-110 transition-transform duration-500">
                            <img src="/pv-logo.png" alt="PV Logo" className="w-full h-full object-contain" />
                          </div>
                        </div>

                        <div className="space-y-4 flex-1">
                          <span className="text-[11px] font-bold text-[#9f0202] uppercase tracking-[0.2em]">{resource.category}</span>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#9f0202] transition-colors leading-tight">{resource.title}</h3>
                          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                            {resource.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination UI */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-12">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                    className="rounded-xl h-10 px-4 border-gray-200 text-gray-600 hover:text-[#9f0202] hover:border-[#9f0202] disabled:opacity-50"
                  >
                    Previous
                  </Button>
                  <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={cn(
                          "w-10 h-10 rounded-xl text-sm font-bold transition-all",
                          currentPage === i + 1
                            ? "bg-[#9f0202] text-white shadow-lg shadow-[#9f0202]/20"
                            : "text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                        )}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                    className="rounded-xl h-10 px-4 border-gray-200 text-gray-600 hover:text-[#9f0202] hover:border-[#9f0202] disabled:opacity-50"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </main>
>>>>>>> 335a43b3608bfa3ea417469e77b65dd2246a57bc
        </div>
      </MaxWidthWrapper>

      {/* LEAD GATE MODAL */}
      <AnimatePresence>
        {selectedResource && (
<<<<<<< HEAD
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
=======
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
>>>>>>> 335a43b3608bfa3ea417469e77b65dd2246a57bc
              onClick={() => setSelectedResource(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
<<<<<<< HEAD
              className="relative w-full max-w-[740px] z-10"
            >
              {!isSuccess ? (
                <div className="modal-container">
                  {/* LEFT PANEL */}
                  <div className="modal-left">
                    <div className="relative z-10 space-y-8">
                      <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-xl">
                        <Image src="/pv-logo.png" alt="PV Logo" width={28} height={28} />
                      </div>
                      <div className="space-y-4">
                        <div className="category-label flex flex-nowrap gap-[0.2em] text-[#8b0202] !mb-0">
                          {selectedResource.category.split('').map((char, i) => (
                            <span key={i}>{char}</span>
                          ))}
                        </div>
                        <h2 className="text-2xl font-bold leading-tight tracking-tight">
                          {selectedResource.title}
                        </h2>
                        <p className="text-gray-400 text-[13px] leading-relaxed max-w-[240px]">
                          {selectedResource.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT PANEL (FORM) */}
                  <div className="modal-right">
                    <button
                      onClick={() => setSelectedResource(null)}
                      className="modal-close"
=======
              className="relative w-full max-w-3xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* Left Column: Card Preview (Dark Theme) */}
              {!isSuccess && (
                <div className="w-full md:w-[42%] bg-[#0f1115] p-10 relative overflow-hidden flex flex-col justify-between min-h-[420px]">
                  {/* Premium Wavy Background */}
                  <div className="absolute inset-0 opacity-20 pointer-events-none scale-150 origin-top-right">
                    <svg width="100%" height="100%" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                      {[...Array(15)].map((_, i) => (
                        <path 
                          key={i}
                          d={`M0 ${100 + i * 15} C 100 ${50 + i * 15}, 200 ${150 + i * 15}, 400 ${100 + i * 15}`} 
                          stroke="#9f0202" 
                          fill="transparent" 
                          strokeWidth="1" 
                        />
                      ))}
                    </svg>
                  </div>

                  <div className="relative z-10 space-y-6">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center p-2.5 shadow-lg shadow-black/20">
                      <img src="/pv-logo.png" alt="PV Logo" className="w-full h-full object-contain" />
                    </div>
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold text-[#9f0202] uppercase tracking-[0.3em]">{selectedResource.category}</span>
                      <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">{selectedResource.title}</h2>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-4">{selectedResource.description}</p>
                    </div>
                  </div>

                  <div className="relative z-10" />
                </div>
              )}

              {/* Right Column: Form / Success State */}
              <div className={cn(
                "flex-1 p-8 md:p-12 flex flex-col justify-center bg-white",
                isSuccess && "w-full"
              )}>
                {!isSuccess ? (
                  <div className="space-y-6">
                    <div className="space-y-1">
                       <h2 className="text-xl font-bold text-gray-900 tracking-tight uppercase">Download Resource</h2>
                       <p className="text-xs text-gray-400 leading-relaxed">Please provide your professional details to receive the asset immediately.</p>
                    </div>

                    <form onSubmit={handleSubmit(onLeadSubmit)} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label className="text-[9px] text-gray-400 font-bold uppercase tracking-widest ml-1">Full Name</Label>
                        <Input {...register("name")} className="bg-gray-50 border-gray-100 h-11 rounded-xl focus:border-[#9f0202] text-sm px-4" placeholder="Your Name" />
                        {errors.name && <p className="text-[9px] text-red-500 ml-1 font-medium">{errors.name.message}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-[9px] text-gray-400 font-bold uppercase tracking-widest ml-1">Business Email</Label>
                        <Input {...register("email")} className="bg-gray-50 border-gray-100 h-11 rounded-xl focus:border-[#9f0202] text-sm px-4" placeholder="name@company.com" />
                        {errors.email && <p className="text-[9px] text-red-500 ml-1 font-medium">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-[9px] text-gray-400 font-bold uppercase tracking-widest ml-1">Mobile Number</Label>
                        <Input {...register("mobile")} className="bg-gray-50 border-gray-100 h-11 rounded-xl focus:border-[#9f0202] text-sm px-4" placeholder="+91" />
                        {errors.mobile && <p className="text-[9px] text-red-500 ml-1 font-medium">{errors.mobile.message}</p>}
                      </div>

                      <div className="flex flex-col gap-3 pt-2">
                        <Button type="submit" disabled={isGenerating} className="w-full bg-[#9f0202] hover:bg-[#7a0101] text-white h-12 font-bold rounded-xl text-sm shadow-xl shadow-[#9f0202]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                          {isGenerating ? <Loader2 className="animate-spin h-4 w-4" /> : <Download className="h-4 w-4" />}
                          {isGenerating ? "Processing..." : "Get Started Now"}
                        </Button>
                        <button type="button" onClick={() => setSelectedResource(null)} className="text-gray-400 hover:text-gray-600 text-[10px] font-medium transition-colors">
                          Maybe later, take me back
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="py-8 text-center space-y-6 max-w-xs mx-auto">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto"
                    >
                      <CheckCircle2 size={32} />
                    </motion.div>
                    <div className="space-y-2">
                       <h2 className="text-xl font-bold text-gray-900">Success!</h2>
                       <p className="text-xs text-gray-500 leading-relaxed">Your download for <span className="font-bold text-gray-900">&quot;{selectedResource.title}&quot;</span> has started.</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedResource(null)}
                      className="border-gray-200 text-gray-600 h-11 px-6 rounded-xl text-xs font-bold hover:bg-gray-50 w-full"
>>>>>>> 335a43b3608bfa3ea417469e77b65dd2246a57bc
                    >
                      <X size={20} />
                    </button>

                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">DOWNLOAD RESOURCE</h3>
                        <p className="text-[15px] text-gray-500 leading-relaxed">
                          Please provide your professional details to receive the asset immediately.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit(onLeadSubmit)} className="space-y-6">
                        <div className="space-y-2">
                          <label className="modal-label">Full Name</label>
                          <Input
                            {...register("name")}
                            placeholder="Your Name"
                            className="modal-input"
                          />
                          {errors.name && <p className="text-[10px] text-red-500 ml-1">{errors.name.message}</p>}
                        </div>

                        <div className="space-y-2">
                          <label className="modal-label">Email</label>
                          <Input
                            {...register("email")}
                            placeholder="name@company.com"
                            className="modal-input"
                          />
                          {errors.email && <p className="text-[10px] text-red-500 ml-1">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-2">
                          <label className="modal-label">Mobile Number</label>
                          <PhoneInput 
                            defaultCountry="IN"
                            value={watch("mobile")}
                            onChange={(val) => setValue("mobile", val, { shouldValidate: true })}
                            className="bg-gray-50 rounded-lg border-transparent h-12 flex items-center overflow-hidden focus-within:ring-1 focus-within:ring-[#9f0202]"
                          />
                          {errors.mobile && <p className="text-[10px] text-red-500 ml-1">{errors.mobile.message}</p>}
                        </div>

                        <div className="pt-4">
                          <Button
                            type="submit"
                            disabled={isGenerating}
                            className="submit-btn"
                          >
                            {isGenerating ? (
                              <Loader2 className="animate-spin" size={20} />
                            ) : (
                              <>
                                <Download size={18} />
                                <span className="tracking-tight">Get Started Now</span>
                              </>
                            )}
                          </Button>

                          <button
                            type="button"
                            onClick={() => setSelectedResource(null)}
                            className="modal-footer-link"
                          >
                            Maybe later, take me back
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
<<<<<<< HEAD
                </div>
              ) : (
                <div className="bg-white rounded-[3.5rem] p-20 text-center space-y-10 max-w-lg mx-auto shadow-2xl">
                  <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto border-4 border-green-100 shadow-sm">
                    <CheckCircle2 size={48} />
                  </div>
                  <div className="space-y-3">
                    <h2 className="text-3xl font-black text-gray-900 tracking-tight">Success!</h2>
                    <p className="text-[15px] text-gray-500 leading-relaxed max-w-xs mx-auto">
                      Thank you for your interest. Your download has been initiated successfully.
                    </p>
                  </div>
                  <Button
                    onClick={() => setSelectedResource(null)}
                    className="bg-gray-900 text-white h-14 px-12 rounded-2xl font-bold hover:bg-black transition-all"
                  >
                    Back to Resources
                  </Button>
                </div>
              )}
=======
                )}
              </div>
              
              {/* Close Button */}
              <button 
                onClick={() => setSelectedResource(null)}
                className="absolute top-5 right-5 p-2 text-gray-400 hover:text-gray-900 transition-colors z-20"
              >
                <X size={20} />
              </button>
>>>>>>> 335a43b3608bfa3ea417469e77b65dd2246a57bc
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CheckCircle2({ size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}
