import BlogForm from "@/components/admin/BlogForm";

export default async function NewBlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="luxury-card p-6 md:p-8">
      <div className="text-[11px] uppercase tracking-[0.32em] text-amber-700/80">Blog</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">Tambah artikel blog</h1>
      <div className="mt-8">
        <BlogForm locale={locale} />
      </div>
    </div>
  );
}
