import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin, ShieldCheck, Star } from "lucide-react";

import PageHero from "@/components/shared/PageHero";
import InquiryForm from "@/components/shared/InquiryForm";
import { getTourBySlug } from "@/lib/cms-storage";

export const dynamic = "force-dynamic";

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const isId = locale === "id";
  const tour = await getTourBySlug(slug);

  if (!tour) notFound();

  const highlights = isId ? tour.highlights.id : tour.highlights.en;

  return (
    <div className="pb-10">
      <PageHero
        eyebrow={isId ? "Detail Paket" : "Package Detail"}
        title={isId ? tour.title.id : tour.title.en}
        description={isId ? tour.summary.id : tour.summary.en}
      />

      <section className="luxury-shell py-12 md:py-14 xl:py-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] xl:grid-cols-[1.15fr_0.85fr] xl:gap-7">
          <div className="space-y-6">
            <div className="luxury-card p-5 md:p-7 xl:p-8">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-zinc-100 md:rounded-[28px]">
                <Image
                  src={tour.image}
                  alt={isId ? tour.title.id : tour.title.en}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-2.5 md:gap-3">
                <div className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-700">
                  {isId ? tour.category.id : tour.category.en}
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1 text-sm text-zinc-600">
                  <MapPin className="h-4 w-4 text-amber-700" />
                  {isId ? tour.destination.id : tour.destination.en}
                </div>
              </div>

              <div className="mt-5 text-[1.75rem] font-semibold tracking-[-0.04em] text-zinc-950 md:mt-6 md:text-4xl">
                {isId ? "Ringkasan pengalaman" : "Experience overview"}
              </div>
              <p className="mt-3 text-sm leading-7 text-zinc-600 md:mt-4 md:text-base md:leading-8">
                {isId ? tour.summary.id : tour.summary.en}
              </p>

              <div className="mt-6 grid gap-3 md:mt-8 md:grid-cols-3 md:gap-4 xl:gap-5">
                <div className="rounded-[24px] bg-zinc-950 px-5 py-5 text-white">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-white/55">{isId ? "Durasi" : "Duration"}</div>
                  <div className="mt-2 text-2xl font-semibold">{tour.duration}</div>
                </div>
                <div className="rounded-[24px] bg-white px-5 py-5 shadow-sm ring-1 ring-zinc-200/80">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-zinc-400">{isId ? "Harga" : "Price"}</div>
                  <div className="mt-2 text-2xl font-semibold text-amber-700">{tour.price}</div>
                </div>
                <div className="rounded-[24px] bg-white px-5 py-5 shadow-sm ring-1 ring-zinc-200/80">
                  <div className="text-[11px] uppercase tracking-[0.3em] text-zinc-400">Rating</div>
                  <div className="mt-2 inline-flex items-center gap-2 text-2xl font-semibold text-zinc-950">
                    <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                    {tour.rating}
                  </div>
                </div>
              </div>
            </div>

            <div className="luxury-card p-5 md:p-7 xl:p-8">
              <div className="text-2xl font-semibold tracking-[-0.03em] text-zinc-950">
                {isId ? "Highlight paket" : "Package highlights"}
              </div>
              <div className="mt-5 space-y-3 md:mt-6 md:space-y-4">
                {highlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-zinc-200/80 bg-white px-4 py-4 text-sm text-zinc-600">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-amber-700" />
                    <div>{item}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="luxury-card overflow-hidden lg:sticky lg:top-24 lg:self-start">
            <div className="bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_30%),linear-gradient(180deg,#fffdf8_0%,#f8f2e8_100%)] p-5 md:p-7 xl:p-8">
              <div className="text-[11px] uppercase tracking-[0.35em] text-amber-700/80">
                {isId ? "Konsultasi Perjalanan" : "Travel Consultation"}
              </div>
              <div className="mt-4 text-[1.75rem] font-semibold tracking-[-0.04em] text-zinc-950 md:text-3xl">
                {isId ? "Buat inquiry cepat untuk paket ini" : "Create a quick inquiry for this package"}
              </div>
              <p className="mt-3 text-sm leading-6 text-zinc-600 md:mt-4 md:leading-7">
                {isId ? "Isi form ini dan tim kami akan segera menghubungi Anda via WhatsApp untuk follow up lebih cepat." : "Fill this form and our team will contact you via WhatsApp for faster follow up."}
              </p>

              <InquiryForm locale={locale} type="tour" tourSlug={tour.slug} destinationLabel={isId ? tour.destination.id : tour.destination.en} isId={isId} />

              <div className="mt-6 inline-flex items-start gap-3 rounded-2xl border border-amber-200/70 bg-amber-50 px-4 py-4 text-sm text-amber-900">
                <ShieldCheck className="mt-0.5 h-5 w-5" />
                <div>
                  {isId ? "Konsultasi gratis tanpa komitmen. Kami siap bantu Anda merencanakan perjalanan terbaik." : "Free consultation with no commitment. We're ready to help you plan the best trip."}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
