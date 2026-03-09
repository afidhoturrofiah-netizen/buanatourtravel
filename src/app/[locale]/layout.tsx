import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";

import { defaultLocale, isLocale, type Locale } from "@/i18n/routing";
import MobileStickyCta from "@/components/shared/MobileStickyCta";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const ChatBubble = dynamic(() => import("@/components/shared/ChatBubble"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Buana Tour & Travel",
  description: "Paket wisata premium, promo perjalanan, dan inspirasi destinasi.",
};

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

  return (
    <NextIntlClientProvider locale={resolvedLocale} messages={messages}>
      <div className="min-h-dvh flex flex-col">
        <Header locale={resolvedLocale} />
        <div className="flex-1">{children}</div>
        <Footer />
        <MobileStickyCta locale={resolvedLocale} />
        <ChatBubble locale={resolvedLocale} />
      </div>
    </NextIntlClientProvider>
  );
}
