import Image from "next/image";
import { notFound } from "next/navigation";
import { BookOpenText, CalendarDays, Tag } from "lucide-react";

import PageHero from "@/components/shared/PageHero";
import { getBlogBySlug } from "@/lib/cms-storage";

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const isId = locale === "id";
  const post = await getBlogBySlug(slug);

  if (!post) notFound();

  const content = isId ? post.content.id : post.content.en;

  return (
    <div className="pb-10">
      <PageHero
        eyebrow={isId ? "Editorial Travel" : "Travel Editorial"}
        title={isId ? post.title.id : post.title.en}
        description={isId ? post.excerpt.id : post.excerpt.en}
      />

      <section className="luxury-shell py-10 md:py-14 xl:py-16">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-7">
          <article className="luxury-card p-5 md:p-7 xl:p-8">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-zinc-100 md:rounded-[28px]">
              <Image
                src={post.image}
                alt={isId ? post.title.id : post.title.en}
                fill
                className="object-cover"
              />
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2.5 text-xs text-zinc-500 md:gap-3 md:text-sm">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5">
                <CalendarDays className="h-4 w-4 text-amber-700" />
                {post.date}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5">
                <BookOpenText className="h-4 w-4 text-amber-700" />
                {post.readTime}
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5">
                <Tag className="h-4 w-4 text-amber-700" />
                {isId ? post.category.id : post.category.en}
              </div>
            </div>

            <div className="mt-6 space-y-5 text-sm leading-7 text-zinc-700 md:mt-8 md:space-y-6 md:text-base md:leading-8">
              {content.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </article>

          <aside className="luxury-card p-5 md:p-6 lg:sticky lg:top-24 lg:self-start xl:p-7">
            <div className="text-[11px] uppercase tracking-[0.35em] text-amber-700/80">
              {isId ? "Blog Perjalanan" : "Travel Blog"}
            </div>
            <div className="mt-4 text-xl font-semibold tracking-[-0.03em] text-zinc-950 md:text-2xl">
              {isId ? "Artikel perjalanan untuk inspirasi liburan Anda" : "Travel articles for your holiday inspiration"}
            </div>
            <p className="mt-3 text-sm leading-6 text-zinc-600 md:mt-4 md:leading-7">
              {isId ? "Baca artikel terbaru seputar tips perjalanan, rekomendasi destinasi, dan pengalaman wisata dari tim Buana Tour & Travel." : "Read the latest articles about travel tips, destination recommendations, and travel experiences from the Buana Tour & Travel team."}
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
