import { BLOGS } from "@/lib/blog-data";
import BlogPostContent from "@/components/blog/blog-post-content";

export async function generateStaticParams() {
  return BLOGS.map((blog) => ({
    id: blog.id.toString(),
  }));
}

export default function BlogPostPage({ params }) {
  const blog = BLOGS.find(b => b.id === parseInt(params.id));

  if (!blog) {
    return <div className="min-h-screen flex items-center justify-center">Post not found.</div>;
  }

  return <BlogPostContent blog={blog} />;
}
