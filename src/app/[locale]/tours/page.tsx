import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Filter, MapPin, Star } from "lucide-react";

import EmptyStateCard from "@/components/shared/EmptyStateCard";
import PageHero from "@/components/shared/PageHero";
import { getTours } from "@/lib/cms-storage";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const dynamic = "force-dynamic";

function parsePriceToNumber(price: string) {
  const numeric = Number(price.replace(/[^\d]/g, ""));
  return Number.isNaN(numeric) ? 0 : numeric;
}

function parseDurationToDays(duration: string) {
  const match = duration.match(/(\d+)D/i);
  return match ? Number(match[1]) : 0;
}

function getPriceBucket(price: number) {
  if (price <= 18000000) return "budget";
  if (price <= 25000000) return "mid";
  return "premium";
}

export default async function ToursPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    destination?: string;
    q?: string;
    category?: string;
    duration?: string;
    price?: string;
    sort?: string;
  }>;
}) {
  const { locale } = await params;
  const { destination = "", q = "", category = "", duration = "", price = "", sort = "popular" } = await searchParams;
  const isId = locale === "id";
  const tours = await getTours();
  const normalizedDestination = destination.trim().toLowerCase();
  const normalizedQuery = q.trim().toLowerCase();
  const normalizedCategory = category.trim().toLowerCase();
  const normalizedDuration = duration.trim().toLowerCase();
  const normalizedPrice = price.trim().toLowerCase();

  const destinationOptions = Array.from(new Set(tours.map((tour) => (isId ? tour.destination.id : tour.destination.en))));
  const categoryOptions = Array.from(new Set(tours.map((tour) => (isId ? tour.category.id : tour.category.en))));
  const durationOptions = Array.from(new Set(tours.map((tour) => tour.duration)));

  const filteredTours = tours.filter((tour) => {
    const matchesDestination = normalizedDestination
      ? tour.destination.id.toLowerCase().includes(normalizedDestination) || tour.destination.en.toLowerCase().includes(normalizedDestination)
      : true;

    const matchesQuery = normalizedQuery
      ? [
          tour.title.id,
          tour.title.en,
          tour.destination.id,
          tour.destination.en,
          tour.category.id,
          tour.category.en,
          tour.summary.id,
          tour.summary.en,
        ].some((value) => value.toLowerCase().includes(normalizedQuery))
      : true;

    const matchesCategory = normalizedCategory
      ? tour.category.id.toLowerCase() === normalizedCategory || tour.category.en.toLowerCase() === normalizedCategory
      : true;

    const matchesDuration = normalizedDuration ? tour.duration.toLowerCase() === normalizedDuration : true;

    const matchesPrice = normalizedPrice ? getPriceBucket(parsePriceToNumber(tour.price)) === normalizedPrice : true;

    return matchesDestination && matchesQuery && matchesCategory && matchesDuration && matchesPrice;
  });

  const sortedTours = [...filteredTours].sort((left, right) => {
    if (sort === "latest") {
      return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    }

    if (sort === "cheapest") {
      return parsePriceToNumber(left.price) - parsePriceToNumber(right.price);
    }

    if (sort === "duration") {
      return parseDurationToDays(left.duration) - parseDurationToDays(right.duration);
    }

    if (left.featured !== right.featured) {
      return Number(right.featured) - Number(left.featured);
    }

    return parseFloat(right.rating) - parseFloat(left.rating);
  });

  const activeFilters = [
    destination ? `${isId ? "Destinasi" : "Destination"}: ${destination}` : null,
    q ? `${isId ? "Pencarian" : "Search"}: ${q}` : null,
    category ? `${isId ? "Kategori" : "Category"}: ${category}` : null,
    duration ? `${isId ? "Durasi" : "Duration"}: ${duration}` : null,
    price
      ? `${isId ? "Harga" : "Price"}: ${
          price === "budget"
            ? isId
              ? "Sampai 18 jt"
              : "Up to 18M"
            : price === "mid"
              ? isId
                ? "18 jt - 25 jt"
                : "18M - 25M"
              : isId
                ? "Di atas 25 jt"
                : "Above 25M"
        }`
      : null,
    sort
      ? `${isId ? "Urutkan" : "Sort"}: ${
          sort === "latest"
            ? isId
              ? "Terbaru"
              : "Latest"
            : sort === "cheapest"
              ? isId
                ? "Termurah"
                : "Cheapest"
              : isId
                ? "Populer"
                : "Popular"
        }`
      : null,
  ].filter(Boolean);

  return (
    <div className="pb-10">
      <PageHero
        eyebrow={isId ? "Paket Tour" : "Tour Packages"}
        title={isId ? "Temukan paket tour terbaik untuk perjalanan Anda" : "Find the best tour packages for your journey"}
        description={isId ? "Jelajahi koleksi paket wisata kami ke berbagai destinasi domestik dan internasional dengan itinerary terkurasi dan harga terbaik." : "Explore our curated tour packages to various domestic and international destinations with the best prices."}
      />

      <section className="luxury-shell py-12 md:py-14 xl:py-16">
        <div className="luxury-card p-5 md:p-6 xl:p-7">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6">
            <div>
              <div className="text-[11px] uppercase tracking-[0.35em] text-amber-700/80">
                {isId ? "Penyaring Paket" : "Package Filter"}
              </div>
              <div className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-zinc-950 lg:text-[1.75rem]">
                {isId ? "Temukan tour sesuai gaya perjalanan" : "Find tours that match your travel style"}
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-amber-200/70 bg-white/95 px-4 py-2 text-sm text-zinc-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_16px_rgba(245,158,11,0.06)] backdrop-blur-sm transition hover:bg-white hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_6px_20px_rgba(245,158,11,0.1)] lg:text-[13px]">
              <Filter className="h-4 w-4 text-amber-700" />
              {activeFilters.length
                ? activeFilters.join(" • ")
                : isId
                  ? "Family, honeymoon, group, corporate"
                  : "Family, honeymoon, group, corporate"}
            </div>
          </div>

          <form className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder={isId ? "Cari nama tour, kategori, atau ringkasan" : "Search by tour name, category, or summary"}
              className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-amber-400 xl:col-span-2"
            />

            <select name="destination" defaultValue={destination} className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-amber-400">
              <option value="">{isId ? "Semua destinasi" : "All destinations"}</option>
              {destinationOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select name="category" defaultValue={category} className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-amber-400">
              <option value="">{isId ? "Semua kategori" : "All categories"}</option>
              {categoryOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select name="duration" defaultValue={duration} className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-amber-400">
              <option value="">{isId ? "Semua durasi" : "All durations"}</option>
              {durationOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select name="price" defaultValue={price} className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-amber-400">
              <option value="">{isId ? "Semua harga" : "All prices"}</option>
              <option value="budget">{isId ? "Sampai 18 jt" : "Up to 18M"}</option>
              <option value="mid">{isId ? "18 jt - 25 jt" : "18M - 25M"}</option>
              <option value="premium">{isId ? "Di atas 25 jt" : "Above 25M"}</option>
            </select>

            <div className="grid gap-3 sm:grid-cols-2 xl:col-span-6 xl:grid-cols-[1fr_auto_auto]">
              <select name="sort" defaultValue={sort} className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 outline-none transition focus:border-amber-400 xl:max-w-xs">
                <option value="popular">{isId ? "Paling populer" : "Most popular"}</option>
                <option value="latest">{isId ? "Terbaru" : "Latest"}</option>
                <option value="cheapest">{isId ? "Termurah" : "Cheapest"}</option>
              </select>

              <button className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">
                {isId ? "Terapkan filter" : "Apply filters"}
              </button>

              <Link
                href={`/${locale}/tours`}
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition hover:border-amber-300 hover:bg-amber-50"
              >
                {isId ? "Reset" : "Reset"}
              </Link>
            </div>
          </form>
        </div>

        <ScrollReveal className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:gap-6">
          {tours.length === 0 ? (
            <EmptyStateCard
              className="md:col-span-2 xl:col-span-3"
              eyebrow={isId ? "Paket belum tersedia" : "No packages yet"}
              title={isId ? "Koleksi tour sedang kami siapkan" : "Our tour collection is being prepared"}
              description={isId ? "Belum ada paket tour yang tayang saat ini. Kamu tetap bisa hubungi admin untuk request itinerary atau rekomendasi destinasi yang paling cocok." : "There are no tour packages published yet. You can still contact the admin for a custom itinerary or destination recommendation."}
              actionHref={`/${locale}/contact`}
              actionLabel={isId ? "Hubungi admin" : "Contact admin"}
              secondaryHref={`/${locale}`}
              secondaryLabel={isId ? "Kembali ke beranda" : "Back to home"}
            />
          ) : null}
          {sortedTours.map((tour, index) => (
            <ScrollReveal key={tour.slug} direction="up" delay={index * 100} className="flex">
              <div className="luxury-card luxury-border group flex h-full flex-col overflow-hidden p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_90px_rgba(15,23,42,0.11)] hover:border-amber-200/60 xl:p-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-zinc-100 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)]">
                  <Image
                    src={tour.image}
                    alt={isId ? tour.title.id : tour.title.en}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-700">
                    {isId ? tour.category.id : tour.category.en}
                  </div>
                  <div className="text-sm text-zinc-500">0{index + 1}</div>
                </div>

                <div className="mt-5 text-2xl font-semibold tracking-[-0.04em] text-zinc-950 lg:text-[1.75rem]">
                  {isId ? tour.title.id : tour.title.en}
                </div>

                <div className="mt-3 flex items-center gap-2 text-sm text-zinc-500">
                  <MapPin className="h-4 w-4 text-amber-700" />
                  {isId ? tour.destination.id : tour.destination.en}
                </div>

                <p className="mt-4 flex-1 text-sm leading-7 text-zinc-600">
                  {(() => { const text = isId ? tour.summary.id : tour.summary.en; const words = text.split(/\s+/); return words.length > 25 ? words.slice(0, 25).join(" ") + "…" : text; })()}
                </p>

                <div className="mt-6 flex items-center justify-between rounded-2xl bg-zinc-950/95 px-4 py-3 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-sm transition hover:bg-zinc-950 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_6px_20px_rgba(0,0,0,0.4)]">
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.25em] text-white/55">
                      {isId ? "Mulai dari" : "Starting from"}
                    </div>
                    <div className="mt-1 font-semibold">{tour.price}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] uppercase tracking-[0.25em] text-white/55">
                      {isId ? "Durasi" : "Duration"}
                    </div>
                    <div className="mt-1 font-semibold">{tour.duration}</div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm">
                  <div className="inline-flex items-center gap-2 text-zinc-600">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {tour.rating}
                  </div>
                  <Link
                    href={`/${locale}/tours/${tour.slug}`}
                    className="inline-flex items-center gap-2 font-medium text-zinc-900 transition-all duration-300 group-hover:text-amber-700 group-hover:translate-x-1"
                  >
                    {isId ? "Lihat detail" : "View details"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
          {tours.length > 0 && sortedTours.length === 0 ? (
            <EmptyStateCard
              className="md:col-span-2 xl:col-span-3"
              eyebrow={isId ? "Hasil tidak ditemukan" : "No matching tours"}
              title={isId ? "Belum ada tour yang cocok" : "No tours matched your filters"}
              description={isId ? "Coba ubah kata kunci pencarian, kategori, durasi, atau rentang harga untuk melihat paket lain yang tersedia." : "Try adjusting the search keyword, category, duration, or price range to discover more available packages."}
              actionHref={`/${locale}/tours`}
              actionLabel={isId ? "Reset semua filter" : "Reset all filters"}
              secondaryHref={`/${locale}/contact`}
              secondaryLabel={isId ? "Minta rekomendasi" : "Ask for recommendations"}
            />
          ) : null}
        </ScrollReveal>
      </section>
    </div>
  );
}
