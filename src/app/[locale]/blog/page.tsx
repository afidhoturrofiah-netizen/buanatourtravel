import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, BookOpenText } from "lucide-react";

import EmptyStateCard from "@/components/shared/EmptyStateCard";
import PageHero from "@/components/shared/PageHero";
import { getBlogs } from "@/lib/cms-storage";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const dynamic = "force-dynamic";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isId = locale === "id";
  const blogs = await getBlogs();

  return (
    <div className="pb-24 md:pb-10">
      <PageHero
        eyebrow={isId ? "Blog Perjalanan" : "Travel Journal"}
        title={isId ? "Tips destinasi, cerita perjalanan, dan inspirasi liburan" : "Destination tips, travel stories, and holiday inspiration"}
        description={isId ? "Baca artikel terbaru seputar destinasi, tips perjalanan, dan rekomendasi paket tour dari tim Buana Tour & Travel." : "Read the latest articles about destinations, travel tips, and tour package recommendations from the Buana Tour & Travel team."}
      />

      <section className="luxury-shell py-12 md:py-14 xl:py-16">
        <ScrollReveal className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:gap-6">
          {blogs.length === 0 ? (
            <EmptyStateCard
              className="md:col-span-2 xl:col-span-3"
              eyebrow={isId ? "Blog belum tersedia" : "Blog not available yet"}
              title={isId ? "Konten travel sedang disiapkan" : "Travel content is being prepared"}
              description={isId ? "Artikel baru sedang kami siapkan untuk mengisi halaman blog. Sementara itu, kamu bisa jelajahi paket tour premium atau hubungi tim kami untuk rekomendasi perjalanan." : "We are preparing fresh editorial content for this blog. In the meantime, explore our premium tours or contact our team for curated travel recommendations."}
              actionHref={`/${locale}/tours`}
              actionLabel={isId ? "Lihat paket tour" : "Browse tours"}
              secondaryHref={`/${locale}/contact`}
              secondaryLabel={isId ? "Hubungi kami" : "Contact us"}
            />
          ) : null}
          {blogs.map((post, index) => (
            <ScrollReveal key={post.slug} direction="up" delay={index * 100} className="flex">
              <article className="luxury-card luxury-border group flex h-full flex-col overflow-hidden p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_90px_rgba(15,23,42,0.11)] hover:border-amber-200/60 xl:p-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-zinc-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">
                  <Image
                    src={post.image}
                    alt={isId ? post.title.id : post.title.en}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-700">
                    {isId ? post.category.id : post.category.en}
                  </div>
                  <div className="text-sm text-zinc-500">0{index + 1}</div>
                </div>

                <div className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-zinc-950 lg:text-[1.75rem]">
                  {isId ? post.title.id : post.title.en}
                </div>

                <p className="mt-4 flex-1 text-sm leading-7 text-zinc-600">
                  {(() => { const text = isId ? post.excerpt.id : post.excerpt.en; const words = text.split(/\s+/); return words.length > 25 ? words.slice(0, 25).join(" ") + "…" : text; })()}
                </p>

                <div className="mt-6 flex items-center justify-between rounded-2xl bg-zinc-950/95 px-4 py-3 text-sm text-white/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-sm transition hover:bg-zinc-950 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_rgba(0,0,0,0.4)]">
                  <div className="inline-flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-amber-300" />
                    {post.date}
                  </div>
                  <div className="inline-flex items-center gap-2">
                    <BookOpenText className="h-4 w-4 text-amber-300" />
                    {post.readTime}
                  </div>
                </div>

                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-900 transition-all duration-300 group-hover:text-amber-700 group-hover:translate-x-1"
                >
                  {isId ? "Baca artikel" : "Read article"}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </ScrollReveal>
      </section>
    </div>
  );
}
