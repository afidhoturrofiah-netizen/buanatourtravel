import Link from "next/link";
import { MessageCircle, Search, SendHorizonal } from "lucide-react";

import type { Locale } from "@/i18n/routing";

const whatsappHref = "https://wa.me/6285875466660?text=Halo%20admin%20Buana%20Tour%20%26%20Travel%2C%20saya%20ingin%20dibantu%20lebih%20lanjut.";

export default function MobileStickyCta({ locale }: { locale: Locale }) {
  const isId = locale === "id";

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-white/70 bg-white/92 px-2 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] pt-2 shadow-[0_-16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:px-3 sm:pb-[calc(env(safe-area-inset-bottom)+0.75rem)] sm:pt-3 md:hidden">
      <div className="mx-auto grid max-w-3xl grid-cols-3 gap-1.5 sm:gap-2">
        <Link
          href={whatsappHref}
          target="_blank"
          className="inline-flex min-h-14 flex-col items-center justify-center rounded-2xl bg-green-600 px-2 py-2 text-center text-[11px] font-semibold text-white shadow-[0_12px_24px_rgba(22,163,74,0.22)] transition hover:bg-green-700"
        >
          <MessageCircle className="h-4 w-4" />
          <span className="mt-1">WhatsApp</span>
        </Link>

        <Link
          href={`/${locale}/contact`}
          className="inline-flex min-h-14 flex-col items-center justify-center rounded-2xl border border-amber-200 bg-amber-50 px-2 py-2 text-center text-[11px] font-semibold text-amber-800 transition hover:bg-amber-100"
        >
          <SendHorizonal className="h-4 w-4" />
          <span className="mt-1">{isId ? "Inquiry" : "Inquiry"}</span>
        </Link>

        <Link
          href={`/${locale}/tours`}
          className="inline-flex min-h-14 flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white px-2 py-2 text-center text-[11px] font-semibold text-zinc-800 transition hover:border-amber-300 hover:bg-amber-50"
        >
          <Search className="h-4 w-4" />
          <span className="mt-1">{isId ? "Lihat paket" : "View tours"}</span>
        </Link>
      </div>
    </div>
  );
}
