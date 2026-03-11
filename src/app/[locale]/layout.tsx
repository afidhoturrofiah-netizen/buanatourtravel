import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import Script from "next/script";

import { defaultLocale, isLocale, type Locale } from "@/i18n/routing";
import LazyChatBubble from "@/components/shared/LazyChatBubble";
import MobileStickyCta from "@/components/shared/MobileStickyCta";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const baseUrl = "https://buanatourtravel-2rya-cki66bp43-irvans-projects-e50e03e6.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEnglish = locale === "en";

  return {
    title: {
      default: isEnglish 
        ? "Buana Tour & Travel - Your Dream Vacation, Real With Us"
        : "Buana Tour & Travel - Liburan Impian, Nyata Bersama Kami",
      template: isEnglish
        ? "%s | Buana Tour & Travel"
        : "%s | Buana Tour & Travel",
    },
    description: isEnglish
      ? "Buana Tour & Travel offers premium tour packages to worldwide destinations. Honeymoon trips, family holidays, corporate travel with concierge-style service and curated itineraries."
      : "Buana Tour & Travel menawarkan paket wisata premium ke destinasi favorit dunia. Honeymoon trip, family holiday, corporate travel dengan layanan concierge-style dan itinerary terkurasi.",
    keywords: isEnglish
      ? [
          "travel agency Indonesia",
          "tour packages",
          "honeymoon trip",
          "family holiday",
          "corporate travel",
          "Japan tour",
          "Korea tour",
          "Europe tour",
          "premium travel agency",
          "international tours",
        ]
      : [
          "agen travel Indonesia",
          "paket wisata",
          "honeymoon trip",
          "family holiday",
          "corporate travel",
          "wisata jepang",
          "wisata korea",
          "wisata eropa",
          "agen travel premium",
          "tour internasional",
        ],
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'id': `${baseUrl}/id`,
        'en': `${baseUrl}/en`,
        'x-default': `${baseUrl}/id`,
      },
    },
    openGraph: {
      title: isEnglish
        ? "Buana Tour & Travel - Your Dream Vacation, Real With Us"
        : "Buana Tour & Travel - Liburan Impian, Nyata Bersama Kami",
      description: isEnglish
        ? "Premium tour packages to worldwide destinations with concierge-style service. Honeymoon, family, and corporate travel."
        : "Paket wisata premium ke destinasi favorit dunia dengan layanan concierge-style. Honeymoon, family, dan corporate travel.",
      url: `${baseUrl}/${locale}`,
      siteName: "Buana Tour & Travel",
      locale: locale === "id" ? "id_ID" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: isEnglish
        ? "Buana Tour & Travel - Your Dream Vacation, Real With Us"
        : "Buana Tour & Travel - Liburan Impian, Nyata Bersama Kami",
      description: isEnglish
        ? "Premium tour packages worldwide with concierge-style service"
        : "Paket wisata premium dengan layanan concierge-style",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const resolvedLocale: Locale = isLocale(locale) ? locale : defaultLocale;
  if (!isLocale(locale)) notFound();

  setRequestLocale(resolvedLocale);

  const messages = await import(`@/i18n/messages/${resolvedLocale}.json`).then((module) => module.default);

  const isEnglish = resolvedLocale === "en";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "name": "Buana Tour & Travel",
    "description": isEnglish
      ? "Premium travel agency offering curated tour packages to destinations worldwide"
      : "Agen travel premium yang menawarkan paket wisata terkurasi ke destinasi favorit dunia",
    "url": `${baseUrl}/${resolvedLocale}`,
    "telephone": "+62-858-7546-6660",
    "email": "buanasejahterasemarang@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Semarang",
      "addressCountry": "ID"
    },
    "priceRange": "$$-$$$",
    "areaServed": [
      {
        "@type": "Country",
        "name": "Indonesia"
      },
      {
        "@type": "Country",
        "name": "Global"
      }
    ],
    "serviceType": isEnglish
      ? ["Tour Packages", "Honeymoon Trips", "Family Holidays", "Corporate Travel", "International Tours"]
      : ["Paket Tour", "Honeymoon Trip", "Family Holiday", "Corporate Travel", "Tour Internasional"],
    "knowsLanguage": ["id", "en"],
    "sameAs": [
      "https://wa.me/6285875466660"
    ]
  };

  return (
    <NextIntlClientProvider locale={resolvedLocale} messages={messages}>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <div className="min-h-dvh flex flex-col">
        <Header locale={resolvedLocale} />
        <div className="flex-1">{children}</div>
        <Footer />
        <MobileStickyCta locale={resolvedLocale} />
        <LazyChatBubble locale={resolvedLocale} />
      </div>
    </NextIntlClientProvider>
  );
}
