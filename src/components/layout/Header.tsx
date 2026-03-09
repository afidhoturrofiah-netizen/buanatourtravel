"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, Menu, Sparkles, X } from "lucide-react";

import type { Locale } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export default function Header({ locale }: { locale: Locale }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const otherLocale: Locale = locale === "id" ? "en" : "id";
  const switchedPath = pathname.replace(`/${locale}`, `/${otherLocale}`);
  const navItems = useMemo(
    () => [
      { href: `/${locale}`, label: t("home") },
      { href: `/${locale}/tours`, label: t("tours") },
      { href: `/${locale}/blog`, label: t("blog") },
      { href: `/${locale}/about`, label: t("about") },
      { href: `/${locale}/contact`, label: t("contact") },
    ],
    [locale, t]
  );

  return (
    <header className="sticky top-0 z-50 px-2 pt-2 sm:px-3 sm:pt-3 md:px-5 md:pt-4 xl:px-6 xl:pt-5">
      <div className="luxury-shell">
        <div className="flex items-center justify-between gap-1.5 rounded-[18px] border border-white/80 bg-white/88 px-2.5 py-2 shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:gap-2 sm:rounded-[22px] sm:px-3 sm:py-2.5 md:gap-3 md:rounded-[26px] md:px-4 md:py-2.5 lg:gap-4 lg:px-5 lg:py-3 xl:rounded-[28px]">
          <Link href={`/${locale}`} className="flex min-w-0 items-center gap-1.5 sm:gap-2 md:gap-2.5 lg:gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zinc-950 via-zinc-800 to-amber-500 text-white shadow-lg shadow-amber-200/40 sm:h-9 sm:w-9 lg:h-10 lg:w-10">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <div className="hidden truncate text-[9px] uppercase tracking-[0.24em] text-amber-700/75 sm:block md:tracking-[0.28em] lg:text-[10px] lg:tracking-[0.32em]">
                Liburan impian
              </div>
              <div className="truncate text-[11px] font-semibold tracking-[-0.03em] text-zinc-950 sm:text-xs md:text-sm lg:text-base">
                Buana Tour & Travel
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50/90 p-1 text-[13px] text-zinc-700 lg:flex xl:p-1.5 xl:text-sm">
            {navItems.map((item) => (
              <Link key={item.href} className="rounded-full px-3 py-2 transition hover:bg-white hover:text-zinc-950 xl:px-4" href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 md:gap-2 lg:gap-3">
            <Link
              href={switchedPath}
              className="inline-flex h-10 items-center gap-1 rounded-full border border-zinc-200 bg-white px-2.5 text-xs text-zinc-800 transition hover:border-amber-300 hover:bg-amber-50 md:h-9 md:gap-1.5 md:px-3 md:text-xs lg:h-auto lg:gap-2 lg:px-3 lg:py-2 lg:text-sm"
              aria-label="Switch language"
            >
              <Globe className="h-4 w-4" />
              <span className="font-medium">{locale.toUpperCase()}</span>
            </Link>

            <Link
              href={`/${locale}/login`}
              className="hidden sm:inline-flex rounded-full bg-zinc-950 px-4 py-2.5 text-sm font-medium text-white shadow-lg shadow-zinc-950/15 transition hover:bg-zinc-800 lg:px-5"
            >
              {t("login")}
            </Link>

            <button
              type="button"
              onClick={() => setIsMenuOpen((value) => !value)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-amber-200/70 bg-white/80 text-zinc-800 sm:h-10 sm:w-10 lg:hidden"
              aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <>
            <button
              type="button"
              className="fixed inset-0 z-40 bg-zinc-950/30 backdrop-blur-[2px] lg:hidden"
              aria-label="Close mobile navigation overlay"
              onClick={() => setIsMenuOpen(false)}
            />
            <div className="absolute inset-x-0 top-full z-50 mt-3 lg:hidden">
              <div className="overflow-hidden rounded-[28px] border border-white/80 bg-white/95 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-xl">
                <div className="rounded-[24px] bg-[linear-gradient(135deg,rgba(17,24,39,0.98),rgba(23,37,84,0.96),rgba(180,83,9,0.9))] px-4 py-4 text-white">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-amber-300/80">Buana Tour & Travel</div>
                  <div className="mt-2 text-lg font-semibold tracking-[-0.03em]">
                    {locale === "id" ? "Navigasi cepat untuk mobile" : "Quick mobile navigation"}
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-800 transition hover:border-amber-300 hover:bg-amber-50"
                    >
                      <span>{item.label}</span>
                      <span className="text-zinc-400">/</span>
                    </Link>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Link
                    href={switchedPath}
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-800 transition hover:border-amber-300 hover:bg-amber-50"
                  >
                    {locale.toUpperCase()} / {otherLocale.toUpperCase()}
                  </Link>
                  <Link
                    href={`/${locale}/login`}
                    onClick={() => setIsMenuOpen(false)}
                    className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
                  >
                    {t("login")}
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </header>
  );
}
