"use client";

// Keys for localStorage
const STORAGE_KEYS = {
  BLOGS: 'pva_custom_blogs',
  RESOURCES: 'pva_custom_resources',
  LEADS: 'pva_user_leads'
};

// --- LEADS MANAGEMENT ---
export const saveLead = (leadData) => {
  if (typeof window === 'undefined') return;
  
  const existingLeads = JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADS) || '[]');
  const newLead = {
    id: Date.now(),
    timestamp: new Date().toISOString(),
    ...leadData
  };
  
  localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify([newLead, ...existingLeads]));
  return newLead;
};

export const getLeads = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADS) || '[]');
};

// --- BLOGS MANAGEMENT ---
export const saveBlog = (blogData) => {
  if (typeof window === 'undefined') return;
  
  const existingBlogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.BLOGS) || '[]');
  const newBlog = {
    id: `local-${Date.now()}`,
    ...blogData,
    date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  };
  
  localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify([newBlog, ...existingBlogs]));
  return newBlog;
};

export const getCustomBlogs = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.BLOGS) || '[]');
};

export const deleteBlog = (id) => {
  if (typeof window === 'undefined') return;
  const existingBlogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.BLOGS) || '[]');
  const filtered = existingBlogs.filter(b => b.id !== id);
  localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(filtered));
};

export const updateBlog = (id, blogData) => {
  if (typeof window === 'undefined') return;
  const existingBlogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.BLOGS) || '[]');
  const updated = existingBlogs.map(b => b.id === id ? { ...b, ...blogData } : b);
  localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(updated));
  return updated;
};


// --- RESOURCES MANAGEMENT ---
export const saveResource = (resourceData) => {
  if (typeof window === 'undefined') return;
  
  const existingResources = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESOURCES) || '[]');
  const newResource = {
    id: `local-${Date.now()}`,
    ...resourceData
  };
  
  localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify([newResource, ...existingResources]));
  return newResource;
};

export const getCustomResources = () => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.RESOURCES) || '[]');
};

export const deleteResource = (id) => {
  if (typeof window === 'undefined') return;
  const existingResources = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESOURCES) || '[]');
  const filtered = existingResources.filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(filtered));
};

export const updateResource = (id, resourceData) => {
  if (typeof window === 'undefined') return;
  const existingResources = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESOURCES) || '[]');
  const updated = existingResources.map(r => r.id === id ? { ...r, ...resourceData } : r);
  localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(updated));
  return updated;
};


export const toggleResourceFeatured = (id) => {
  if (typeof window === 'undefined') return;
  const existingResources = JSON.parse(localStorage.getItem(STORAGE_KEYS.RESOURCES) || '[]');
  
  // Count currently featured
  const featuredCount = existingResources.filter(r => r.featured).length;
  
  const updated = existingResources.map(r => {
    if (r.id === id) {
      // If we are trying to feature it and already have 2, don't allow it unless we are unfeaturing
      if (!r.featured && featuredCount >= 2) {
        alert("Maximum 2 featured resources allowed.");
        return r;
      }
      return { ...r, featured: !r.featured };
    }
    return r;
  });
  
  localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(updated));
  return updated;
};

