import { notFound } from "next/navigation";

import BlogForm from "@/components/admin/BlogForm";
import { getBlogs } from "@/lib/cms-storage";

export const dynamic = "force-dynamic";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const blogs = await getBlogs();
  const post = blogs.find((item) => item.id === id);

  if (!post) notFound();

  return (
    <div className="luxury-card p-6 md:p-8">
      <div className="text-[11px] uppercase tracking-[0.32em] text-amber-700/80">Blog</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">Edit artikel blog</h1>
      <div className="mt-8">
        <BlogForm locale={locale} initialData={post} />
      </div>
    </div>
  );
}
