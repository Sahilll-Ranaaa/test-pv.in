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
  ChevronRight,
  ChevronLeft,
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

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      mobile: "",
    }
  });

  useEffect(() => {
    const custom = getCustomResources().map(r => ({
      ...r,
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

  // PAGINATION LOGIC
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);

  const paginatedResources = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredResources.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredResources, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const onLeadSubmit = async (data) => {
    setIsGenerating(true);
    try {
      // 1. Local storage fallback
      await saveLead({
        ...data,
        resourceId: selectedResource.id,
        resourceTitle: selectedResource.title,
        timestamp: new Date().toISOString()
      });

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
          </div>
        </MaxWidthWrapper>
      </section>

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
                      "category-item",
                      activeCategory === category && "active"
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
        </div>
      </MaxWidthWrapper>

      {/* LEAD GATE MODAL */}
      <AnimatePresence>
        {selectedResource && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedResource(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
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
