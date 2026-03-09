import { Mail, MapPin, MessageCircleMore, Phone } from "lucide-react";

import PageHero from "@/components/shared/PageHero";
import InquiryForm from "@/components/shared/InquiryForm";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isId = locale === "id";

  const contacts = [
    {
      icon: Phone,
      title: isId ? "Telepon" : "Phone",
      value: "085875466660",
    },
    {
      icon: Mail,
      title: "Email",
      value: "buanasejahterasemarang@gmail.com",
    },
    {
      icon: MessageCircleMore,
      title: "WhatsApp",
      value: "085875466660",
    },
    {
      icon: MapPin,
      title: isId ? "Lokasi" : "Location",
      value: isId ? "Semarang, Indonesia" : "Semarang, Indonesia",
    },
  ];

  return (
    <div className="pb-10">
      <PageHero
        eyebrow={isId ? "Hubungi Kami" : "Contact Us"}
        title={isId ? "Hubungi kami untuk konsultasi perjalanan Anda" : "Contact us for your travel consultation"}
        description={isId ? "Kirim pertanyaan atau konsultasikan kebutuhan perjalanan Anda. Tim kami siap membantu menemukan paket tour terbaik untuk Anda." : "Send us your questions or discuss your travel needs. Our team is ready to help you find the best tour package."}
      />

      <section className="luxury-shell py-12 md:py-16">
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <div className="space-y-5">
            {contacts.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.title} className="luxury-card p-5">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-50 text-amber-700">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-zinc-950">{item.title}</div>
                      <div className="mt-2 text-sm text-zinc-600">{item.value}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="luxury-card overflow-hidden">
            <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,244,237,0.95))] p-6 md:p-8">
              <div className="text-[11px] uppercase tracking-[0.35em] text-amber-700/80">
                {isId ? "Form Inquiry" : "Inquiry Form"}
              </div>
              <div className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">
                {isId ? "Ceritakan kebutuhan perjalananmu" : "Tell us about your travel needs"}
              </div>
              <p className="mt-4 text-sm leading-7 text-zinc-600">
                {isId ? "Isi form di bawah ini dan tim kami akan segera menghubungi Anda untuk follow up." : "Fill in the form below and our team will contact you shortly for follow up."}
              </p>

              <InquiryForm locale={locale} type="contact" destinationLabel="General inquiry" isId={isId} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
