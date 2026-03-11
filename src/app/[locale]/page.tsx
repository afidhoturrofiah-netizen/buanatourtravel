import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Search, ShieldCheck, Sparkles, Stars, Trophy } from "lucide-react";

import FaqSection from "@/components/shared/FaqSection";
import { defaultLocale, type Locale } from "@/i18n/routing";
import { getHomepageSettings, getTours } from "@/lib/cms-storage";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const revalidate = 60;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const resolvedLocale = (locale || defaultLocale) as Locale;

  const t = await getTranslations("home");
  const [tours, homepageSettings] = await Promise.all([getTours(), getHomepageSettings()]);
  const featuredTourRecords = tours.filter((tour) => tour.featured);
  const fallbackTourRecords = featuredTourRecords.length > 0 ? featuredTourRecords : tours;
  const signatureTour = fallbackTourRecords[0];
  const whySection = homepageSettings.whySection;
  const whyPoints = locale === "id" ? whySection.points.id : whySection.points.en;
  const destinations = homepageSettings.topDestinations;
  const faqItems = homepageSettings.faqItems;
  const heroImage = homepageSettings.heroImage || "";
  const adminDocumentationPhotos = homepageSettings.documentationItems
    .filter((item) => Boolean(item.image))
    .map((item) => ({
      id: item.id,
      src: item.image,
      title: locale === "id" ? item.title.id : item.title.en,
      destination: locale === "id" ? item.label.id : item.label.en,
    }));
  const tourDocumentationPhotos = fallbackTourRecords
    .flatMap((tour) => {
      const localizedTitle = locale === "id" ? tour.title.id : tour.title.en;
      const localizedDestination = locale === "id" ? tour.destination.id : tour.destination.en;
      const sources = tour.gallery && tour.gallery.length > 0 ? tour.gallery : [tour.image];

      return sources.map((src, index) => ({
        id: `${tour.id}-${index}`,
        src,
        title: localizedTitle,
        destination: localizedDestination,
      }));
    })
    .filter((item) => Boolean(item.src));
  const documentationPhotos = adminDocumentationPhotos.length > 0 ? adminDocumentationPhotos : tourDocumentationPhotos;
  const marqueePhotos = documentationPhotos.length > 0 ? documentationPhotos : [
    {
      id: "fallback-1",
      src: "/uploads/default-tour.jpg",
      title: locale === "id" ? "Momen perjalanan premium" : "Premium travel moments",
      destination: locale === "id" ? "Dokumentasi keberangkatan" : "Departure documentation",
    },
  ];
  const limitedPhotos = marqueePhotos.slice(0, 8);
  const marqueeRows = [limitedPhotos, [...limitedPhotos].reverse()];
  const featuredTours = fallbackTourRecords.slice(0, 3).map((tour) => ({
    title: locale === "id" ? tour.title.id : tour.title.en,
    region: locale === "id" ? tour.destination.id : tour.destination.en,
    price: tour.price,
    days: tour.duration,
    slug: tour.slug,
    summary: locale === "id" ? tour.summary.id : tour.summary.en,
  }));

  const highlights = [
    { icon: Sparkles, title: locale === "id" ? "Paket Terkurasi" : "Curated Packages", copy: locale === "id" ? "Itinerary pilihan dengan akomodasi terbaik dan pengalaman yang berkesan di setiap destinasi." : "Hand-picked itineraries with top accommodations and memorable experiences at every destination." },
    { icon: ShieldCheck, title: locale === "id" ? "Layanan Terpercaya" : "Trusted Service", copy: locale === "id" ? "Tim kami siap membantu sebelum, selama, dan setelah perjalanan Anda dengan respons cepat." : "Our team is ready to assist before, during, and after your trip with fast response." },
    { icon: Trophy, title: locale === "id" ? "Pengalaman Premium" : "Premium Experience", copy: locale === "id" ? "Dirancang untuk pasangan, keluarga, dan grup perusahaan yang menginginkan perjalanan berkualitas." : "Designed for couples, families, and corporate groups who want quality travel experiences." },
  ];
  const testimonials = [
    {
      name: "Rina & Dimas",
      label: locale === "id" ? "Honeymoon ke Jepang" : "Japan honeymoon trip",
      quote:
        locale === "id"
          ? "Tim Buana bantu kami dari pemilihan itinerary sampai detail perjalanan. Semuanya terasa rapi, tenang, dan premium dari awal sampai pulang."
          : "Buana’s team helped us from itinerary selection to the smallest travel details. Everything felt polished, calm, and premium from start to finish.",
    },
    {
      name: "Keluarga Hartono",
      label: locale === "id" ? "Family trip Australia" : "Australia family trip",
      quote:
        locale === "id"
          ? "Yang paling kami suka, pace perjalanannya nyaman dan komunikasinya responsif. Anak-anak enjoy, orang tua juga merasa aman."
          : "What we loved most was the comfortable pacing and responsive communication. The kids enjoyed it, and the parents felt taken care of too.",
    },
    {
      name: "PT Sinar Cipta",
      label: locale === "id" ? "Corporate incentive tour" : "Corporate incentive tour",
      quote:
        locale === "id"
          ? "Presentasi paketnya profesional dan eksekusinya juga meyakinkan. Sangat membantu untuk kebutuhan group perusahaan yang butuh koordinasi cepat."
          : "The package presentation was professional and the execution was equally convincing. It worked very well for a corporate group that needed fast coordination.",
    },
  ];
  return (
    <div className="pb-24 md:pb-6">
      <section className="relative overflow-hidden px-3 pt-3 md:px-6 md:pt-6">
        <div className="luxury-shell">
          <div className={`relative overflow-hidden rounded-[22px] px-4 py-5 text-white shadow-[0_30px_120px_rgba(15,23,42,0.18)] sm:rounded-[28px] md:rounded-[36px] md:px-8 md:py-8 xl:min-h-[calc(100vh-8.75rem)] xl:max-h-[700px] xl:px-8 xl:py-6 ${heroImage ? "" : "bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.22),transparent_18%),linear-gradient(135deg,#081224_0%,#0f2a58_52%,#6f5514_100%)]"}`}>
            {heroImage ? (
              <>
                <Image
                  src={heroImage}
                  alt="Hero background"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/55 to-zinc-950/30" />
              </>
            ) : (
              <>
                <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.03),transparent_32%,rgba(255,255,255,0.015))]" />
                <div className="absolute -left-16 top-16 h-56 w-56 rounded-full bg-amber-300/8" />
                <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-sky-400/8" />
              </>
            )}

            <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_320px] lg:items-center xl:grid-cols-[minmax(0,1.18fr)_330px] xl:gap-5">
              <div className="max-w-3xl pt-1 md:pt-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white/80 md:px-4 md:py-2 md:text-[11px] md:tracking-[0.28em]">
                  <Stars className="h-4 w-4 text-amber-300" />
                  Liburan impian, nyata bersama kami
                </div>

                <h1 className="mt-4 max-w-2xl text-[1.6rem] font-semibold leading-[1.08] tracking-[-0.05em] sm:text-[2rem] sm:leading-[1.02] md:mt-4 md:text-[3.75rem] md:leading-[0.98] xl:max-w-lg xl:text-[3.35rem]">
                  {t("heroTitle")}
                </h1>

                <p className="mt-3 max-w-xl text-[13px] leading-[1.6] text-white/78 sm:text-sm sm:leading-6 md:mt-3 md:max-w-lg md:text-base md:leading-7 xl:max-w-md">
                  {t("heroSubtitle")}
                </p>

                <div className="mt-5 max-w-xl rounded-[24px] border border-white/10 bg-white/8 p-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.1)] md:mt-6 md:rounded-[28px] md:p-3 xl:mt-5">
                  <form action={`/${resolvedLocale}/tours`} className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_auto] md:items-center">
                    <div className="flex items-center gap-3 rounded-2xl bg-white px-3.5 py-3.5 text-zinc-900 shadow-sm md:px-4 md:py-3">
                      <Search className="h-5 w-5 text-amber-600" />
                      <input
                        className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400 transition placeholder:text-zinc-500/80 md:text-base"
                        placeholder={t("searchPlaceholder")}
                        name="q"
                      />
                    </div>
                    <button
                      type="submit"
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-300 px-5 py-3.5 text-sm font-semibold text-zinc-950 shadow-lg shadow-amber-500/25 transition-all duration-300 hover:brightness-105 hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5 active:translate-y-0 md:min-h-11 md:px-5 md:py-3 md:text-sm"
                    >
                      {t("searchButton")}
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </form>
                </div>

                <div className="mt-4 grid max-w-xl grid-cols-3 gap-2 md:mt-5 md:gap-3 xl:mt-4">
                  {[
                    { value: "120+", label: locale === "id" ? "Paket Tour" : "Tour Packages" },
                    { value: "25", label: locale === "id" ? "Destinasi" : "Destinations" },
                    { value: "4.9/5", label: locale === "id" ? "Rating Pelanggan" : "Client Rating" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-[16px] border border-white/10 bg-white/8 px-2.5 py-2.5 sm:rounded-[20px] sm:px-4 sm:py-3.5 md:rounded-[22px] md:px-3.5 md:py-3.5">
                      <div className="text-base font-semibold text-white sm:text-lg md:text-xl">{item.value}</div>
                      <div className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-white/60 sm:mt-1 sm:text-[10px] sm:tracking-[0.16em] md:text-[11px] md:tracking-[0.22em]">
                        {item.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative hidden lg:block xl:self-center">
                <div className="overflow-hidden rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(243,239,232,0.95))] p-4 text-zinc-950 shadow-[0_12px_40px_rgba(8,18,36,0.12)] transition hover:shadow-[0_16px_50px_rgba(8,18,36,0.16)] hover:-translate-y-1 md:rounded-[28px] md:p-5 xl:p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.32em] text-amber-700/80">{locale === "id" ? "Paket Unggulan" : "Signature Pick"}</div>
                      <div className="mt-2 text-xl font-semibold tracking-[-0.04em] text-zinc-950 md:text-2xl md:leading-[1.1] xl:text-[1.55rem]">{signatureTour ? (locale === "id" ? signatureTour.title.id : signatureTour.title.en) : "Swiss Alps Panorama"}</div>
                    </div>
                    <div className="shrink-0 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[10px] text-zinc-500 shadow-sm">
                      {locale === "id" ? "Kursi Terbatas" : "Limited Seats"}
                    </div>
                  </div>

                  <div className="mt-3 rounded-[18px] border border-zinc-200 bg-white px-3.5 py-3 shadow-sm md:mt-4 md:rounded-[20px] xl:mt-3">
                    <div className="flex items-center gap-2 text-[13px] text-zinc-500">
                      <MapPin className="h-3.5 w-3.5 text-amber-600" />
                      <span className="line-clamp-1">{signatureTour ? (locale === "id" ? signatureTour.destination.id : signatureTour.destination.en) : "Lucerne · Interlaken · Zermatt"}</span>
                    </div>
                    <div className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-zinc-950 md:text-[1.75rem] xl:text-[1.6rem]">{signatureTour?.price || "IDR 42.800.000"}</div>
                    <div className="mt-1.5 line-clamp-3 text-[13px] leading-[1.45] text-zinc-600">{(() => { const text = signatureTour ? (locale === "id" ? signatureTour.summary.id : signatureTour.summary.en) : "9D7N dengan scenic train, premium stay, dan highlight terbaik untuk traveler premium."; const words = text.split(/\s+/); return words.length > 20 ? words.slice(0, 20).join(" ") + "…" : text; })()}</div>
                  </div>

                  <div className="mt-2.5 grid grid-cols-2 gap-2 xl:mt-2">
                    <div className="rounded-xl bg-zinc-950 px-3.5 py-3 text-white shadow-sm">
                      <div className="text-[9px] uppercase tracking-[0.28em] text-white/50">{locale === "id" ? "Durasi" : "Duration"}</div>
                      <div className="mt-1 text-base font-semibold">{signatureTour?.duration || "9D7N"}</div>
                    </div>
                    <div className="rounded-xl bg-amber-50 px-3.5 py-3 text-zinc-900 ring-1 ring-amber-100/80">
                      <div className="text-[9px] uppercase tracking-[0.28em] text-amber-700/70">{locale === "id" ? "Layanan" : "Service"}</div>
                      <div className="mt-1 text-base font-semibold">{signatureTour ? (locale === "id" ? signatureTour.category.id : signatureTour.category.en) : "Elite Care"}</div>
                    </div>
                  </div>

                  <div className="mt-2 rounded-xl border border-amber-200/70 bg-amber-50/95 px-3.5 py-2.5 text-[12px] leading-[1.4] text-amber-900 xl:text-[11px]">
                    {locale === "id" ? "Konsultasi gratis untuk perjalanan keluarga, honeymoon, dan grup." : "Free consultation for family trips, honeymoons, and group departures."}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="luxury-shell py-12 md:py-20">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <ScrollReveal direction="up">
            <div>
              <div className="text-[11px] uppercase tracking-[0.35em] text-amber-700/80">
                {locale === "id" ? "Promo Unggulan" : "Featured Promos"}
              </div>
              <h2 className="section-title mt-4">{locale === "id" ? "Paket tour pilihan dengan harga terbaik" : "Top tour packages at the best prices"}</h2>
              <p className="section-copy mt-4 max-w-md">
                {locale === "id" ? "Temukan penawaran spesial untuk berbagai destinasi favorit dengan itinerary yang sudah terkurasi dan siap berangkat." : "Discover special offers for popular destinations with curated itineraries, ready to depart."}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-5">
            {featuredTours.map((tour, index) => (
              <ScrollReveal key={tour.title} direction="up" delay={200 + index * 100}>
                <div
                  className="luxury-card luxury-border group relative flex h-full flex-col overflow-hidden p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:border-amber-200/60"
                >
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-200" />
                  <div className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em] text-amber-700">
                    Promo {index + 1}
                  </div>
                  <div className="mt-5 line-clamp-2 text-lg font-semibold tracking-[-0.03em] text-zinc-950">{tour.title}</div>
                  <div className="mt-3 line-clamp-1 text-sm text-zinc-500">{tour.region}</div>
                  <div className="mt-auto flex items-center justify-between pt-6 text-sm">
                    <span className="rounded-full bg-zinc-950 px-3 py-1.5 text-white">{tour.days}</span>
                    <span className="font-semibold text-amber-700">{tour.price}</span>
                  </div>
                  <Link
                    className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-900 transition-all duration-300 group-hover:text-amber-700 group-hover:translate-x-1"
                    href={`/${resolvedLocale}/tours/${tour.slug}`}
                  >
                    {locale === "id" ? "Lihat paket" : "View package"}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="luxury-shell pb-12 md:pb-16">
        <div className="grid gap-4 md:grid-cols-3 md:gap-5">
          {highlights.map((item, index) => {
            const Icon = item.icon;

            return (
              <ScrollReveal key={item.title} direction="up" delay={index * 80} className="flex">
                <div className="luxury-card flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)] hover:border-amber-200/60">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-50 text-amber-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 text-xl font-semibold tracking-[-0.03em] text-zinc-950">{item.title}</div>
                  <p className="mt-3 flex-1 text-sm leading-7 text-zinc-600">{item.copy}</p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      <section className="luxury-shell pb-12 md:pb-18">
        <div className="grid gap-6 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
          <ScrollReveal direction="up">
            <div>
              <div className="text-[11px] uppercase tracking-[0.35em] text-amber-700/80">
                {locale === "id" ? "Testimoni Pelanggan" : "Customer Testimonials"}
              </div>
              <h2 className="section-title mt-4">
                {locale === "id" ? "Review pelanggan yang bikin calon traveler lebih yakin" : "Customer reviews that build travel confidence"}
              </h2>
              <p className="section-copy mt-4 max-w-md">
                {locale === "id"
                  ? "Kepercayaan tumbuh lebih cepat saat calon pelanggan melihat pengalaman nyata dari honeymoon trip, family holiday, sampai perjalanan corporate."
                  : "Trust grows faster when future travelers can see real experiences across honeymoon trips, family holidays, and corporate departures."}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { value: "4.9/5", label: locale === "id" ? "Kepuasan" : "Satisfaction" },
                  { value: "120+", label: locale === "id" ? "Keberangkatan" : "Departures" },
                  { value: "98%", label: locale === "id" ? "Ingin Kembali" : "Would Return" },
                ].map((item) => (
                  <div key={item.label} className="rounded-[22px] border border-zinc-200 bg-white px-4 py-4 shadow-[0_10px_30px_rgba(15,23,42,0.05)]">
                    <div className="text-lg font-semibold tracking-[-0.03em] text-zinc-950">{item.value}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-zinc-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {testimonials.map((item, index) => (
              <ScrollReveal key={item.name} direction="up" delay={index * 80} className="flex">
                <div className="luxury-card luxury-border flex h-full flex-col p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(15,23,42,0.06)] hover:border-amber-200/60">
                  <div className="inline-flex rounded-full bg-amber-50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-amber-700">
                    {item.label}
                  </div>
                  <div className="mt-5 flex items-center gap-1 text-amber-400">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Stars key={`${item.name}-${starIndex}`} className="h-4 w-4" />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-7 text-zinc-600">
                    “{item.quote}”
                  </p>
                  <div className="mt-6 border-t border-zinc-200/80 pt-4">
                    <div className="text-base font-semibold tracking-[-0.02em] text-zinc-950">{item.name}</div>
                    <div className="mt-1 text-sm text-zinc-500">{item.label}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="overflow-hidden pb-12 md:pb-18">
        <div className="luxury-shell">
          <div className="rounded-[30px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,244,237,0.96))] px-0 py-6 shadow-[0_8px_30px_rgba(15,23,42,0.06)] md:rounded-[36px] md:py-8">
            <div className="px-5 md:px-8 lg:px-10">
              <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr] lg:items-end">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.35em] text-amber-700/80">
                    {locale === "id" ? "Dokumentasi Perjalanan" : "Travel Documentation"}
                  </div>
                  <h2 className="section-title mt-4">
                    {locale === "id" ? "Momen perjalanan pelanggan kami di berbagai destinasi" : "Our customers' travel moments at various destinations"}
                  </h2>
                </div>
                <p className="section-copy max-w-2xl">
                  {locale === "id"
                    ? "Lihat dokumentasi foto dari berbagai keberangkatan yang sudah kami layani — mulai dari honeymoon, family trip, hingga perjalanan grup perusahaan."
                    : "Browse photo documentation from various departures we've served — from honeymoons, family trips, to corporate group journeys."}
                </p>
              </div>
            </div>

            <div className="relative mt-8 space-y-4 md:mt-10 md:space-y-5">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f7f4ee] via-[#f7f4ee]/80 to-transparent md:w-24" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f7f4ee] via-[#f7f4ee]/80 to-transparent md:w-24" />

              {marqueeRows.map((row, rowIndex) => (
                <div key={`row-${rowIndex}`} className="overflow-hidden">
                  <div className={`flex w-max gap-4 px-5 md:gap-5 md:px-8 lg:px-10 ${rowIndex === 0 ? "animate-marquee" : "animate-marquee-slow"}`}>
                    {[...row, ...row].map((photo, index) => (
                      <div
                        key={`${photo.id}-${rowIndex}-${index}`}
                        className="group relative h-[220px] w-[290px] shrink-0 overflow-hidden rounded-[26px] border border-white/80 bg-white shadow-[0_16px_50px_rgba(15,23,42,0.08)] md:h-[250px] md:w-[340px]"
                      >
                        <Image
                          src={photo.src}
                          alt={photo.title}
                          fill
                          loading="lazy"
                          sizes="(max-width: 768px) 290px, 340px"
                          className="object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.02),rgba(15,23,42,0.12)_45%,rgba(15,23,42,0.75))]" />
                        <div className="absolute inset-x-0 bottom-0 p-4 text-white md:p-5">
                          <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/85">
                            {locale === "id" ? "Dokumentasi" : "Documentation"}
                          </div>
                          <div className="mt-3 text-base font-semibold tracking-[-0.03em] md:text-lg">{photo.title}</div>
                          <div className="mt-1 text-sm text-white/75">{photo.destination}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="luxury-shell pb-12 md:pb-20">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr] lg:items-start">
          <ScrollReveal direction="left">
            <div className="luxury-card p-5 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-4">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.35em] text-amber-700/80">{locale === "id" ? "Destinasi Populer" : "Top Destinations"}</div>
                  <h2 className="section-title mt-4">{t("popularTitle")}</h2>
                </div>
                <Link className="hidden text-sm font-medium text-amber-700 md:inline-flex" href={`/${resolvedLocale}/tours`}>
                  {locale === "id" ? "Lihat semua" : "Explore all"}
                </Link>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 md:mt-8 md:gap-4">
                {destinations.map((destination, index) => (
                  <ScrollReveal key={`${destination.query}-${index}`} direction="up" delay={index * 60}>
                    <Link
                      href={destination.customLink || `/${resolvedLocale}/tours?destination=${encodeURIComponent(destination.query)}`}
                      className="group block rounded-[26px] border border-zinc-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,244,237,0.9))] p-5 shadow-sm transition-all duration-300 hover:border-amber-200/80 hover:shadow-[0_12px_40px_rgba(15,23,42,0.08)] hover:-translate-y-0.5"
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-lg font-semibold tracking-[-0.03em] text-zinc-950">{locale === "id" ? destination.name.id : destination.name.en}</div>
                        <div className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">0{index + 1}</div>
                      </div>
                      <div className="mt-3 text-sm text-zinc-600">{locale === "id" ? destination.label.id : destination.label.en}</div>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-900 transition-all duration-300 group-hover:text-amber-700 group-hover:translate-x-1">
                        {locale === "id" ? "Jelajahi" : "Discover now"}
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="luxury-card overflow-hidden bg-zinc-950 text-white">
              <div className="bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.25),transparent_30%),linear-gradient(180deg,#111827_0%,#18181b_100%)] px-5 py-7 md:px-8 md:py-10">
                <div className="text-[11px] uppercase tracking-[0.35em] text-amber-300/80">{locale === "id" ? whySection.eyebrow.id : whySection.eyebrow.en}</div>
                <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] md:text-3xl">{locale === "id" ? whySection.title.id : whySection.title.en}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70 md:mt-4 md:leading-7">{locale === "id" ? whySection.description.id : whySection.description.en}</p>

                <div className="mt-8 space-y-4">
                  {whyPoints.map((point, index) => (
                    <ScrollReveal key={point} direction="up" delay={index * 50}>
                      <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm text-white/80 transition hover:bg-white/8">
                        <div className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-300" />
                        <div>{point}</div>
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ScrollReveal direction="up">
        <section className="luxury-shell pb-8 md:pb-10">
          <div className="rounded-[26px] border border-amber-200/60 bg-[linear-gradient(135deg,rgba(255,248,230,0.95),rgba(255,255,255,0.98))] px-5 py-7 shadow-[0_8px_30px_rgba(180,134,11,0.06)] transition hover:shadow-[0_12px_40px_rgba(180,134,11,0.1)] hover:-translate-y-0.5 md:rounded-[32px] md:px-10 md:py-10">
            <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.35em] text-amber-700/80">{locale === "id" ? "Blog Perjalanan" : "Travel Journal"}</div>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.03em] text-zinc-950 md:text-3xl">
                  {locale === "id" ? "Tips destinasi, cerita perjalanan, dan inspirasi liburan" : "Destination tips, travel stories, and holiday inspiration"}
                </h3>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
                  {locale === "id" ? "Baca artikel terbaru seputar destinasi, tips perjalanan, dan rekomendasi paket tour dari tim Buana Tour & Travel." : "Read the latest articles about destinations, travel tips, and tour package recommendations from the Buana Tour & Travel team."}
                </p>
              </div>
              <Link
                href={`/${resolvedLocale}/blog`}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-zinc-950/25 transition-all duration-300 hover:bg-zinc-800 hover:shadow-xl hover:shadow-zinc-950/30 hover:-translate-y-0.5 active:translate-y-0 md:px-6"
              >
                {locale === "id" ? "Baca blog" : "Visit blog"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </ScrollReveal>

      <FaqSection locale={resolvedLocale} items={faqItems} />
    </div>
  );
}
