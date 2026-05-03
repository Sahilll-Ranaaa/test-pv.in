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

const CATEGORIES = ["All", "Business life", "Finance management", "Company creation", "Invoicing", "Assessment", "Operations", "Reporting", "Compliance", "Strategy"];

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

  const featuredResources = useMemo(() => {
    const customFeatured = allResources.filter(r => r.id?.toString().startsWith('local-') && r.featured);
    const staticFeatured = STATIC_RESOURCES.filter(r => r.featured);
    return [...customFeatured, ...staticFeatured].slice(0, 2);
  }, [allResources]);

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

  const onLeadSubmit = async (data) => {
    setIsGenerating(true);
    
    // Simulate generation delay to match survey experience
    await new Promise(r => setTimeout(r, 1500));

    // 1. Save lead details
    saveLead({
      ...data,
      phone: data.mobile,
      surveyType: `Download: ${selectedResource.title}`,
      score: 0,
    });

    // 2. Trigger the actual download
    triggerFileDownload(selectedResource);

    // 3. Show success state
    setIsGenerating(false);
    setIsSuccess(true);
  };

  return (
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
          </div>
        </MaxWidthWrapper>
      </section>

      <MaxWidthWrapper className="py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* LEFT SIDEBAR */}
          <aside className="w-full lg:w-1/4 space-y-10">
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest px-1">Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Find a tool or guide..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 bg-white border-gray-200 rounded-xl focus:ring-[#9f0202] text-sm shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Categories</h3>
                <Filter size={14} className="text-gray-300" />
              </div>
              <div className="flex flex-col space-y-1">
                {CATEGORIES.map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={cn(
                      "text-left px-3 py-2.5 text-sm rounded-xl transition-all flex items-center justify-between group",
                      activeCategory === category 
                        ? "bg-[#9f0202] text-white font-bold shadow-md shadow-[#9f0202]/10" 
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    )}
                  >
                    {category}
                    {activeCategory === category && <ChevronRight size={14} />}
                    {activeCategory !== category && <div className="w-1.5 h-1.5 rounded-full bg-gray-200 group-hover:bg-[#9f0202] transition-colors" />}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 space-y-12">
            
            {/* Featured Section */}
            {featuredResources.length > 0 && activeCategory === "All" && !searchQuery && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <div className="w-1.5 h-6 bg-[#9f0202] rounded-full" />
                  Featured frameworks
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  {featuredResources.map((resource) => (
                    <motion.div 
                      key={resource.id || resource.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.01, y: -4 }}
                      className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col md:flex-row gap-8 relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-full bg-[#9f0202]/[0.01] -skew-x-12" />
                      <div className="w-16 h-16 shrink-0 bg-[#9f0202]/5 rounded-2xl flex items-center justify-center text-[#9f0202] group-hover:scale-110 transition-transform duration-500">
                        {resource.icon}
                      </div>
                      <div className="flex-1 space-y-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#9f0202]">{resource.category}</span>
                            <div className="w-1 h-1 bg-gray-200 rounded-full" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{resource.type}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#9f0202] transition-colors">{resource.title}</h3>
                          <p className="text-gray-500 leading-relaxed text-sm max-w-xl">
                            {resource.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-50">
                          <Button 
                            onClick={() => handleDownloadClick(resource)}
                            className="bg-[#9f0202] hover:bg-[#7a0101] text-white rounded-xl px-6 h-11 font-bold shadow-lg shadow-[#9f0202]/10 transition-all"
                          >
                            Download <Download className="ml-2 h-4 w-4" />
                          </Button>
                          <span className="text-[10px] font-bold text-gray-300 uppercase">{resource.size}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Regular Grid */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <div className="w-1.5 h-6 bg-gray-200 rounded-full" />
                Library grid
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                  {filteredResources.filter(r => !featuredResources.find(fr => (fr.id === r.id && r.id) || (fr.title === r.title && !r.id))).map((resource) => (
                    <motion.div 
                      layout
                      key={resource.id || resource.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ scale: 1.02, y: -5 }}
                      className="bg-white rounded-[1.5rem] border border-gray-100 p-7 hover:shadow-2xl transition-all duration-300 group"
                    >
                      <div className="flex flex-col h-full space-y-6">
                        <div className="flex justify-between items-start">
                          <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#9f0202] group-hover:scale-110 transition-transform duration-300">
                            {resource.icon}
                          </div>
                          <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{resource.size}</span>
                        </div>
                        
                        <div className="space-y-3 flex-1">
                          <span className="text-[9px] font-bold text-[#9f0202] uppercase tracking-widest">{resource.category}</span>
                          <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#9f0202] transition-colors leading-tight">{resource.title}</h3>
                          <p className="text-gray-500 text-xs leading-relaxed line-clamp-2">
                            {resource.description}
                          </p>
                        </div>

                        <div className="pt-5 border-t border-gray-50 flex items-center justify-between">
                           <span className="text-[9px] font-bold text-gray-400">{resource.type}</span>
                           <Button 
                             onClick={() => handleDownloadClick(resource)}
                             variant="ghost" className="p-0 h-auto text-[#9f0202] hover:bg-transparent font-bold text-xs group/btn"
                           >
                             Access Asset <ArrowRight className="ml-1 h-3 w-3 group-hover/btn:translate-x-1 transition-transform" />
                           </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </main>
        </div>
      </MaxWidthWrapper>

      {/* LEAD GATE MODAL (Standardized with Survey Form) */}
      <AnimatePresence>
        {selectedResource && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedResource(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 md:p-8">
                {!isSuccess ? (
                  <div className="space-y-6">
                    <div className="text-center space-y-2">
                       <h2 className="text-xl font-bold text-gray-900">You&apos;re almost there!</h2>
                       <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">Fill in your details to access <span className="font-bold text-gray-900">&quot;{selectedResource.title}&quot;</span></p>
                    </div>

                    <form onSubmit={handleSubmit(onLeadSubmit)} className="space-y-4">
                      <div className="space-y-1.5">
                        <Label className="text-[9px] text-gray-600 font-bold uppercase tracking-widest ml-1">Full Name*</Label>
                        <Input {...register("name")} className="bg-gray-50 border-transparent h-10 rounded-lg focus:border-[#9f0202] text-sm px-4" placeholder="Enter your name" />
                        {errors.name && <p className="text-[9px] text-red-500 ml-1">{errors.name.message}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-[9px] text-gray-600 font-bold uppercase tracking-widest ml-1">Business Email*</Label>
                        <Input {...register("email")} className="bg-gray-50 border-transparent h-10 rounded-lg focus:border-[#9f0202] text-sm px-4" placeholder="name@company.com" />
                        {errors.email && <p className="text-[9px] text-red-500 ml-1">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-[9px] text-gray-600 font-bold uppercase tracking-widest ml-1">Mobile Number*</Label>
                        <Input {...register("mobile")} className="bg-gray-50 border-transparent h-10 rounded-lg focus:border-[#9f0202] text-sm px-4" placeholder="+91" />
                        {errors.mobile && <p className="text-[9px] text-red-500 ml-1">{errors.mobile.message}</p>}
                      </div>

                      <div className="flex items-center gap-3 pt-3">
                        <Button type="button" onClick={() => setSelectedResource(null)} variant="ghost" className="text-gray-400 h-10 px-4 text-xs">Cancel</Button>
                        <Button type="submit" disabled={isGenerating} className="flex-1 bg-[#9f0202] hover:bg-[#7a0101] text-white h-10 font-bold rounded-lg text-sm shadow-lg shadow-[#9f0202]/10">
                          {isGenerating ? <Loader2 className="animate-spin mr-2 h-4 w-4" /> : <Download className="mr-2 h-4 w-4" />}
                          {isGenerating ? "Processing..." : "Get Detailed Resource"}
                        </Button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div className="py-8 text-center space-y-6">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600 mx-auto"
                    >
                      <CheckCircle2 size={32} />
                    </motion.div>
                    <div className="space-y-1">
                       <h2 className="text-xl font-bold text-gray-900">Success!</h2>
                       <p className="text-xs text-gray-500">Your resource is now downloading.</p>
                    </div>
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedResource(null)}
                      className="border-gray-200 text-gray-500 h-9 px-6 rounded-lg text-xs hover:bg-gray-50"
                    >
                      Back to Library
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
