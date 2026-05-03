"use client";

import { useState, useEffect, useMemo } from "react";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, 
  BookOpen, 
  Download, 
  Users, 
  Trash2, 
  Plus, 
  FileText, 
  Search, 
  Star, 
  CheckCircle2, 
  Upload,
  ChevronLeft,
  ChevronRight,
  Edit2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  getCustomBlogs, 
  saveBlog, 
  deleteBlog, 
  updateBlog,
  getCustomResources, 
  saveResource, 
  deleteResource,
  updateResource,
  getLeads, 
  toggleResourceFeatured 
} from "@/lib/admin-store";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "leads", label: "User Leads", icon: <Users size={18} /> },
  { id: "blogs", label: "Manage Blogs", icon: <BookOpen size={18} /> },
  { id: "resources", label: "Manage Resources", icon: <Download size={18} /> },
];

const LEADS_PER_PAGE = 15;

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("leads");
  const [leads, setLeads] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [resources, setResources] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Leads Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Forms
  const [blogForm, setBlogForm] = useState({ title: "", description: "", content: "", category: "Business", image: null });
  const [resourceForm, setResourceForm] = useState({ title: "", description: "", category: "Strategy", type: "PDF Guide", size: "1.0 MB", featured: false, fileName: "", fileData: null });

  const refreshData = () => {
    setLeads(getLeads());
    setBlogs(getCustomBlogs());
    setResources(getCustomResources());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'blog') {
        setBlogForm({ ...blogForm, image: reader.result });
      } else {
        setResourceForm({ 
          ...resourceForm, 
          fileName: file.name, 
          fileData: reader.result, 
          size: (file.size / (1024 * 1024)).toFixed(1) + " MB" 
        });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveBlog = () => {
    if (!blogForm.title) return;
    if (editingId) {
      updateBlog(editingId, blogForm);
    } else {
      saveBlog(blogForm);
    }
    setBlogForm({ title: "", description: "", content: "", category: "Business", image: null });
    setIsAdding(false);
    setEditingId(null);
    refreshData();
  };

  const handleSaveResource = () => {
    if (!resourceForm.title) return;
    if (editingId) {
      updateResource(editingId, resourceForm);
    } else {
      saveResource(resourceForm);
    }
    setResourceForm({ title: "", description: "", category: "Strategy", type: "PDF Guide", size: "1.0 MB", featured: false, fileName: "", fileData: null });
    setIsAdding(false);
    setEditingId(null);
    refreshData();
  };

  const startEditingBlog = (blog) => {
    setBlogForm(blog);
    setEditingId(blog.id);
    setIsAdding(true);
  };

  const startEditingResource = (resource) => {
    setResourceForm(resource);
    setEditingId(resource.id);
    setIsAdding(true);
  };

  const paginatedLeads = useMemo(() => {
    const start = (currentPage - 1) * LEADS_PER_PAGE;
    return leads.slice(start, start + LEADS_PER_PAGE);
  }, [leads, currentPage]);

  const totalPages = Math.ceil(leads.length / LEADS_PER_PAGE);

  return (
    <div className="min-h-screen bg-[#fafafa] pt-20">
      <div className="flex h-[calc(100vh-5rem)] overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0">
          <div className="p-8 pb-4">
            <div className="flex items-center gap-2 mb-8">
              <img src="/pv-logo.png" alt="PV Advisory" className="h-8 w-auto" />
              <span className="font-black uppercase tracking-widest text-[10px]">Admin Panel</span>
            </div>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setIsAdding(false); setEditingId(null); }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-bold transition-all",
                  activeTab === tab.id 
                    ? "bg-[#9f0202]/5 text-[#9f0202] shadow-sm" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                )}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
          
          <div className="p-4 mt-auto">
             <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-[10px] font-black uppercase text-gray-400 mb-1">Signed in as</p>
                <p className="text-xs font-bold text-gray-900 truncate">Administrator</p>
             </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#fafafa] p-12">
          <header className="flex justify-between items-center mb-10">
             <div>
               <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">{TABS.find(t => t.id === activeTab).label}</h1>
               <p className="text-gray-400 text-sm mt-1">Manage your platform content and user activity.</p>
             </div>
             {(activeTab === 'blogs' || activeTab === 'resources') && !isAdding && (
               <Button onClick={() => { setIsAdding(true); setEditingId(null); }} className="bg-[#9f0202] hover:bg-[#7a0101] text-white rounded-xl px-6 font-bold shadow-lg shadow-[#9f0202]/10">
                 <Plus size={18} className="mr-2" /> New {activeTab === 'blogs' ? 'Blog' : 'Resource'}
               </Button>
             )}
          </header>

          <AnimatePresence mode="wait">
            {activeTab === "leads" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                    <h3 className="font-bold text-gray-900">Recent Activity</h3>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1 rounded-full">
                      Total: {leads.length} leads
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-gray-50/50 border-b border-gray-100">
                          <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">User Details</th>
                          <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Lead Source / Activity</th>
                          <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedLeads.map((lead) => (
                          <tr key={lead.id} className="border-b border-gray-50 hover:bg-gray-50/30 transition-colors">
                            <td className="px-8 py-6">
                              <div className="flex items-center gap-4">
                                <div className="w-10 h-10 bg-[#9f0202]/5 rounded-xl flex items-center justify-center text-[#9f0202] shrink-0 font-bold">
                                  {lead.name[0]}
                                </div>
                                <div>
                                  <p className="text-sm font-black text-gray-900">{lead.name}</p>
                                  <div className="flex items-center gap-3 mt-1">
                                    <span className="text-[10px] text-gray-400 flex items-center gap-1"><FileText size={10} /> {lead.email}</span>
                                    <span className="text-[10px] text-gray-400 flex items-center gap-1">✆ {lead.phone}</span>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-8 py-6">
                              {lead.surveyType?.includes("Download:") ? (
                                <div className="flex flex-col gap-1">
                                  <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[8px] font-black uppercase rounded-full w-fit">Resource Download</span>
                                  <span className="text-sm font-bold text-gray-700">{lead.surveyType.replace("Download: ", "")}</span>
                                </div>
                              ) : (
                                <div className="flex flex-col gap-1">
                                  <span className="px-2 py-0.5 bg-green-50 text-green-600 text-[8px] font-black uppercase rounded-full w-fit">Survey Assessment</span>
                                  <span className="text-sm font-bold text-[#9f0202]">{lead.surveyType}</span>
                                </div>
                              )}
                            </td>
                            <td className="px-8 py-6 text-right">
                              <p className="text-[10px] text-gray-400 font-bold uppercase">{new Date(lead.timestamp).toLocaleDateString()}</p>
                              <p className="text-[10px] text-gray-300">{new Date(lead.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Leads Pagination */}
                  {totalPages > 1 && (
                    <div className="p-8 bg-gray-50/50 border-t border-gray-100 flex items-center justify-between">
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Page {currentPage} of {totalPages}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(p => p - 1)}
                          className="h-8 w-8 p-0 rounded-lg border-gray-200"
                        >
                          <ChevronLeft size={16} />
                        </Button>
                        {[...Array(totalPages)].map((_, i) => (
                          <Button
                            key={i}
                            variant={currentPage === i + 1 ? "default" : "outline"}
                            size="sm"
                            onClick={() => setCurrentPage(i + 1)}
                            className={cn(
                              "h-8 w-8 p-0 rounded-lg text-[10px] font-bold",
                              currentPage === i + 1 ? "bg-[#9f0202] hover:bg-[#7a0101]" : "border-gray-200 text-gray-500 hover:bg-gray-50"
                            )}
                          >
                            {i + 1}
                          </Button>
                        ))}
                        <Button 
                          variant="outline" 
                          size="sm" 
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(p => p + 1)}
                          className="h-8 w-8 p-0 rounded-lg border-gray-200"
                        >
                          <ChevronRight size={16} />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === "blogs" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {isAdding ? (
                  <div className="bg-white rounded-[2.5rem] border border-gray-100 p-12 shadow-sm space-y-8">
                    <div className="flex items-center justify-between">
                       <h3 className="text-xl font-bold text-gray-900">{editingId ? "Edit Blog" : "Create New Blog"}</h3>
                       <Button variant="ghost" onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-gray-400">Cancel</Button>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase text-gray-400">Post Title</Label>
                          <Input value={blogForm.title} onChange={e => setBlogForm({...blogForm, title: e.target.value})} className="h-14 bg-gray-50 border-transparent rounded-2xl" placeholder="A Strategic Vision for 2026..." />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase text-gray-400">Short Description</Label>
                          <Textarea value={blogForm.description} onChange={e => setBlogForm({...blogForm, description: e.target.value})} className="h-24 bg-gray-50 border-transparent rounded-2xl" placeholder="Summarize the core insight..." />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-[10px] font-black uppercase text-gray-400">Category</Label>
                          <select value={blogForm.category} onChange={e => setBlogForm({...blogForm, category: e.target.value})} className="w-full h-14 bg-gray-50 border-transparent rounded-2xl px-4 text-sm font-bold">
                            <option>Business</option><option>Finance</option><option>Strategy</option><option>Operations</option>
                          </select>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase text-gray-400">Post Content (Markdown or HTML supported)</Label>
                           <Textarea value={blogForm.content} onChange={e => setBlogForm({...blogForm, content: e.target.value})} className="h-[280px] bg-gray-50 border-transparent rounded-2xl" placeholder="Write your thought leadership post here..." />
                        </div>
                        <div className="space-y-2">
                           <Label className="text-[10px] font-black uppercase text-gray-400">Featured Image</Label>
                           <div className="h-20 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex items-center justify-center relative cursor-pointer hover:bg-gray-100 transition-colors">
                              <input type="file" onChange={e => handleFileUpload(e, 'blog')} className="absolute inset-0 opacity-0 cursor-pointer" />
                              <div className="flex items-center gap-3 text-gray-400">
                                <Upload size={18} />
                                <span className="text-xs font-bold">{blogForm.image ? "Image Selected" : "Upload Image"}</span>
                              </div>
                           </div>
                        </div>
                      </div>
                    </div>
                    <Button onClick={handleSaveBlog} className="w-full h-14 bg-[#9f0202] hover:bg-[#7a0101] text-white font-bold rounded-2xl text-lg shadow-xl shadow-[#9f0202]/10">
                      {editingId ? "Update Published Post" : "Publish to Thought Leadership"}
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogs.map(blog => (
                      <div key={blog.id} className="bg-white rounded-[2rem] border border-gray-100 p-6 space-y-4 group">
                        <div className="h-40 bg-gray-100 rounded-2xl overflow-hidden relative">
                          {blog.image && <img src={blog.image} className="w-full h-full object-cover" />}
                          <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[8px] font-black text-[#9f0202] uppercase tracking-widest">{blog.category}</div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-bold text-gray-900 line-clamp-1">{blog.title}</h4>
                          <p className="text-xs text-gray-400 line-clamp-2">{blog.description}</p>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-gray-50">
                          <Button 
                            variant="ghost" 
                            onClick={() => startEditingBlog(blog)}
                            className="flex-1 h-10 rounded-xl bg-gray-50 hover:bg-[#9f0202]/5 hover:text-[#9f0202] text-[10px] font-black uppercase tracking-widest transition-all"
                          >
                            <Edit2 size={12} className="mr-2" /> Edit
                          </Button>
                          <Button 
                            variant="ghost" 
                            onClick={() => { deleteBlog(blog.id); refreshData(); }}
                            className="h-10 w-10 rounded-xl bg-gray-50 hover:bg-red-50 hover:text-red-500 text-gray-400 transition-all"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "resources" && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                {isAdding ? (
                  <div className="bg-white rounded-[2.5rem] border border-gray-100 p-12 shadow-sm space-y-8 max-w-4xl">
                     <div className="flex items-center justify-between">
                       <h3 className="text-xl font-bold text-gray-900">{editingId ? "Edit Resource" : "Create New Resource"}</h3>
                       <Button variant="ghost" onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-gray-400">Cancel</Button>
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                       <div className="space-y-6">
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-gray-400">Resource Title</Label>
                            <Input value={resourceForm.title} onChange={e => setResourceForm({...resourceForm, title: e.target.value})} className="h-14 bg-gray-50 border-transparent rounded-2xl" placeholder="CFO Blueprint..." />
                         </div>
                         <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase text-gray-400">Description</Label>
                            <Textarea value={resourceForm.description} onChange={e => setResourceForm({...resourceForm, description: e.target.value})} className="h-24 bg-gray-50 border-transparent rounded-2xl" placeholder="What does this tool help with?" />
                         </div>
                         <div className="flex gap-4">
                           <div className="flex-1 space-y-2">
                             <Label className="text-[10px] font-black uppercase text-gray-400">Category</Label>
                             <select value={resourceForm.category} onChange={e => setResourceForm({...resourceForm, category: e.target.value})} className="w-full h-12 bg-gray-50 border-transparent rounded-xl px-4 text-xs font-bold">
                               <option>Strategy</option><option>Operations</option><option>Finance management</option><option>Compliance</option><option>Assessment</option>
                             </select>
                           </div>
                           <div className="flex-1 space-y-2">
                             <Label className="text-[10px] font-black uppercase text-gray-400">Asset Type</Label>
                             <select value={resourceForm.type} onChange={e => setResourceForm({...resourceForm, type: e.target.value})} className="w-full h-12 bg-gray-50 border-transparent rounded-xl px-4 text-xs font-bold">
                               <option>PDF Guide</option><option>Excel Tool</option><option>Template</option><option>Whitepaper</option>
                             </select>
                           </div>
                         </div>
                       </div>
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <Label className="text-[10px] font-black uppercase text-gray-400">Asset File</Label>
                             <div className="h-40 bg-gray-50 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center relative cursor-pointer hover:bg-gray-100 transition-colors">
                                <input type="file" onChange={e => handleFileUpload(e, 'resource')} className="absolute inset-0 opacity-0 cursor-pointer" />
                                <Upload size={24} className="text-gray-300 mb-2" />
                                <span className="text-xs font-bold text-gray-400">{resourceForm.fileName || "Select System File"}</span>
                                <span className="text-[10px] text-gray-300 mt-1">PDF, Excel, or Zip (Max 10MB)</span>
                             </div>
                          </div>
                          <div className="flex items-center gap-3 p-4 bg-[#9f0202]/5 rounded-2xl border border-[#9f0202]/10">
                             <Star size={18} className={cn(resourceForm.featured ? "text-[#9f0202] fill-[#9f0202]" : "text-gray-300")} />
                             <div className="flex-1">
                               <p className="text-[10px] font-black uppercase text-[#9f0202]">Featured Framework</p>
                               <p className="text-[9px] text-gray-500">Showcase this asset at the top of the repository.</p>
                             </div>
                             <input type="checkbox" checked={resourceForm.featured} onChange={e => setResourceForm({...resourceForm, featured: e.target.checked})} className="w-5 h-5 rounded accent-[#9f0202]" />
                          </div>
                       </div>
                    </div>
                    <Button onClick={handleSaveResource} className="w-full h-14 bg-[#9f0202] hover:bg-[#7a0101] text-white font-bold rounded-2xl text-lg shadow-xl shadow-[#9f0202]/10">
                      {editingId ? "Update Resource" : "Add to Library"}
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {resources.map(res => (
                      <div key={res.id} className="bg-white rounded-2xl border border-gray-100 p-5 flex items-center gap-6 group hover:shadow-lg transition-all">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#9f0202] group-hover:scale-110 transition-transform">
                          <FileText size={20} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-bold text-gray-900">{res.title}</h4>
                            {res.featured && <span className="px-2 py-0.5 bg-[#9f0202]/5 text-[#9f0202] text-[8px] font-black uppercase rounded-full tracking-widest border border-[#9f0202]/10">Featured</span>}
                          </div>
                          <p className="text-xs text-gray-400 mt-0.5">{res.category} • {res.type} • {res.size}</p>
                        </div>
                        <div className="flex items-center gap-2">
                           <Button 
                             variant="ghost" 
                             onClick={() => toggleResourceFeatured(res.id).then(refreshData)}
                             className={cn("h-10 w-10 rounded-xl transition-all", res.featured ? "bg-[#9f0202]/10 text-[#9f0202]" : "bg-gray-50 text-gray-300")}
                           >
                             <Star size={16} className={res.featured ? "fill-[#9f0202]" : ""} />
                           </Button>
                           <Button 
                             variant="ghost" 
                             onClick={() => startEditingResource(res)}
                             className="h-10 px-4 rounded-xl bg-gray-50 hover:bg-[#9f0202]/5 hover:text-[#9f0202] text-[10px] font-black uppercase tracking-widest transition-all"
                           >
                             <Edit2 size={12} className="mr-2" /> Edit
                           </Button>
                           <Button 
                             variant="ghost" 
                             onClick={() => { deleteResource(res.id); refreshData(); }}
                             className="h-10 w-10 rounded-xl bg-gray-50 hover:bg-red-50 hover:text-red-500 text-gray-400 transition-all"
                           >
                             <Trash2 size={16} />
                           </Button>
                        </div>
                      </div>
                    ))}
                    {resources.length === 0 && (
                       <div className="py-20 text-center bg-white rounded-3xl border border-gray-100 border-dashed">
                          <p className="text-gray-400 font-bold text-sm">No custom resources added yet.</p>
                       </div>
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
