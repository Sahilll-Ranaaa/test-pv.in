"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import BlogPostContent from "@/components/blog/blog-post-content";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Loader2 } from "lucide-react";

function BlogContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !supabase) {
      setLoading(false);
      return;
    }

    const fetchPost = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('PvAdvisoryBlogs')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        setBlog(data);
      } catch (err) {
        console.error("Fetch post failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#9f0202]" size={32} />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <MaxWidthWrapper className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Post not found.</h1>
          <p className="text-gray-500 mt-2">The article you are looking for may have been removed or moved.</p>
        </MaxWidthWrapper>
      </div>
    );
  }

  return <BlogPostContent blog={blog} />;
}

export default function BlogReaderClient() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-[#9f0202]" size={32} />
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
}
