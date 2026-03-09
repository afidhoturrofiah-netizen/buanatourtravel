import { Compass, Gem, Handshake, Sparkles } from "lucide-react";

import PageHero from "@/components/shared/PageHero";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isId = locale === "id";

  const values = [
    {
      icon: Sparkles,
      title: isId ? "Presentasi Premium" : "Premium Presentation",
      copy: isId
        ? "Setiap paket wisata kami disusun dengan detail untuk memastikan kenyamanan dan pengalaman terbaik."
        : "Every tour package is carefully crafted to ensure comfort and the best travel experience.",
    },
    {
      icon: Handshake,
      title: isId ? "Layanan Terpercaya" : "Trusted Service",
      copy: isId
        ? "Tim kami selalu siap membantu dari konsultasi awal hingga perjalanan Anda selesai dengan lancar."
        : "Our team is always ready to help from initial consultation until your trip is completed smoothly.",
    },
    {
      icon: Compass,
      title: isId ? "Kurasi Destinasi" : "Curated Destinations",
      copy: isId
        ? "Destinasi dan rute kami pilih berdasarkan kenyamanan, keindahan, dan efisiensi waktu perjalanan."
        : "We select destinations and routes based on comfort, beauty, and travel time efficiency.",
    },
    {
      icon: Gem,
      title: isId ? "Nilai Elegan" : "Elegant Value",
      copy: isId
        ? "Kami percaya perjalanan berkualitas harus tetap terjangkau tanpa mengorbankan kenyamanan."
        : "We believe quality travel should remain affordable without sacrificing comfort.",
    },
  ];

  return (
    <div className="pb-10">
      <PageHero
        eyebrow={isId ? "Tentang Kami" : "About Us"}
        title={isId ? "Buana Tour & Travel hadir untuk perjalanan yang lebih berkesan" : "Buana Tour & Travel is here for more memorable journeys"}
        description={isId ? "Kami menyediakan layanan tour dan travel terpercaya dengan paket wisata terkurasi ke berbagai destinasi favorit di Asia dan Eropa." : "We provide trusted tour and travel services with curated packages to popular destinations across Asia and Europe."}
      />

      <section className="luxury-shell py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="luxury-card p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.35em] text-amber-700/80">
              {isId ? "Profil Brand" : "Brand Profile"}
            </div>
            <div className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">
              {isId ? "Perjalanan berkualitas dengan pelayanan yang hangat dan profesional" : "Quality travel with warm and professional service"}
            </div>
            <p className="mt-5 text-sm leading-8 text-zinc-600 md:text-base">
              {isId
                ? "Buana Tour & Travel adalah agen perjalanan wisata yang berbasis di Semarang. Kami melayani paket tour domestik dan internasional untuk keluarga, pasangan, grup perusahaan, dan rombongan. Dengan pengalaman bertahun-tahun, kami berkomitmen menghadirkan perjalanan yang nyaman, terorganisir, dan berkesan."
                : "Buana Tour & Travel is a travel agency based in Semarang. We serve domestic and international tour packages for families, couples, corporate groups, and parties. With years of experience, we are committed to delivering comfortable, well-organized, and memorable journeys."}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div key={value.title} className="luxury-card p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-50 text-amber-700">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="mt-5 text-xl font-semibold tracking-[-0.03em] text-zinc-950">{value.title}</div>
                  <p className="mt-3 text-sm leading-7 text-zinc-600">{value.copy}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
