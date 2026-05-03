"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";

export default function BlogPostContent({ blog }) {
  return (
    <div className="min-h-screen bg-white pt-24 pb-16">
      <MaxWidthWrapper>
        {/* Back Link */}
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link href="/thought-leadership" className="inline-flex items-center text-sm font-bold text-gray-400 hover:text-[#9f0202] transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Thought Leadership
          </Link>
        </motion.div>

        {/* Header Section */}
        <article className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mb-12"
          >
            <div className="flex items-center gap-4 text-[10px] font-bold text-[#9f0202] uppercase tracking-widest">
              <span>{blog.category}</span>
              <span className="w-1 h-1 bg-gray-300 rounded-full" />
              <span className="text-gray-400">{blog.readTime}</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              {blog.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                   <User className="text-gray-400" size={20} />
                 </div>
                 <div>
                   <p className="text-sm font-bold text-gray-900 leading-none">{blog.author}</p>
                   <p className="text-[10px] text-gray-500 font-medium">PV Advisory Lead</p>
                 </div>
               </div>
               <div className="flex items-center gap-3 text-gray-400">
                 <Calendar size={16} />
                 <span className="text-xs font-medium">{blog.date}</span>
               </div>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-16 shadow-2xl"
          >
            <Image 
              src={blog.image} 
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Post Content */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="prose prose-lg prose-red max-w-none mb-20"
          >
            <div className="text-gray-600 leading-relaxed text-lg" 
                 dangerouslySetInnerHTML={{ __html: blog.content }} 
            />
          </motion.div>


        </article>
      </MaxWidthWrapper>
    </div>
  );
}
