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
        ? "Setiap paket dan halaman dirancang agar tampil meyakinkan, rapi, dan bernilai tinggi."
        : "Every package and page is designed to feel convincing, polished, and high-value.",
    },
    {
      icon: Handshake,
      title: isId ? "Layanan Terpercaya" : "Trusted Service",
      copy: isId
        ? "Kami ingin calon traveler merasa aman sejak tahap konsultasi hingga perjalanan selesai."
        : "We want travelers to feel supported from the first consultation to the end of the trip.",
    },
    {
      icon: Compass,
      title: isId ? "Kurasi Destinasi" : "Curated Destinations",
      copy: isId
        ? "Rute dan pengalaman dipilih untuk menyeimbangkan kenyamanan, estetika, dan efisiensi perjalanan."
        : "Routes and experiences are selected to balance comfort, aesthetics, and travel efficiency.",
    },
    {
      icon: Gem,
      title: isId ? "Nilai Elegan" : "Elegant Value",
      copy: isId
        ? "Brand travel modern perlu terlihat premium tanpa kehilangan kesan hangat dan membantu."
        : "A modern travel brand should feel premium without losing warmth and helpfulness.",
    },
  ];

  return (
    <div className="pb-10">
      <PageHero
        eyebrow={isId ? "Tentang Kami" : "About Us"}
        title={isId ? "Buana Tour & Travel hadir untuk perjalanan yang lebih elegan" : "Buana Tour & Travel is built for more elegant journeys"}
        description={isId ? "Kami membangun pengalaman digital dan layanan travel yang modern, mewah, dan mudah dipercaya oleh calon pelanggan." : "We build a modern, premium, and trustworthy travel experience for today’s customers."}
      />

      <section className="luxury-shell py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="luxury-card p-6 md:p-8">
            <div className="text-[11px] uppercase tracking-[0.35em] text-amber-700/80">
              {isId ? "Profil Brand" : "Brand Profile"}
            </div>
            <div className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">
              {isId ? "Travel yang tampil rapi, terasa premium, dan tetap dekat dengan pelanggan" : "A travel brand that feels polished, premium, and still personal"}
            </div>
            <p className="mt-5 text-sm leading-8 text-zinc-600 md:text-base">
              {isId
                ? "Buana Tour & Travel dirancang untuk menghadirkan presentasi paket wisata yang lebih kuat, lebih meyakinkan, dan lebih siap membantu penjualan. Website ini menonjolkan visual premium, struktur informasi yang jelas, serta flow inquiry yang nantinya terhubung ke CMS/admin."
                : "Buana Tour & Travel is designed to present travel packages more clearly, convincingly, and in a way that supports stronger sales. The website emphasizes premium visuals, clear information structure, and an inquiry flow that will later connect to the admin CMS."}
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
