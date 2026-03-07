"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

import type { Locale } from "@/i18n/routing";
import { getFaqText, type FaqItem } from "@/lib/faq";

export default function FaqSection({ locale, items }: { locale: Locale; items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string>("");
  const isId = locale === "id";

  return (
    <section className="luxury-shell pb-12 md:pb-20">
      <div className="luxury-card overflow-hidden p-5 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div>
            <div className="text-[11px] uppercase tracking-[0.35em] text-amber-700/80">FAQ</div>
            <h2 className="section-title mt-4">
              {isId ? "Pertanyaan umum sebelum kamu berangkat" : "Common questions before you travel"}
            </h2>
            <p className="section-copy mt-4 max-w-md">
              {isId
                ? "Rangkuman cepat untuk hal-hal yang paling sering ditanyakan: visa, pembayaran, jadwal keberangkatan, refund, dan alur inquiry."
                : "A quick overview of the questions people ask most often: visa support, payments, departure schedules, refunds, and inquiry flow."}
            </p>
          </div>

          <div className="space-y-3">
            {items.map((item) => {
              const text = getFaqText(locale, item);
              const isOpen = openId === item.id;

              return (
                <div key={item.id} className="rounded-[24px] border border-zinc-200 bg-white shadow-[0_10px_35px_rgba(15,23,42,0.04)]">
                  <button
                    type="button"
                    onClick={() => setOpenId((current) => (current === item.id ? "" : item.id))}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                  >
                    <span className="text-sm font-semibold text-zinc-950 md:text-base">{text.question}</span>
                    <span className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-50 text-amber-700 transition ${isOpen ? "rotate-180" : ""}`}>
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>
                  {isOpen ? <div className="px-5 pb-5 text-sm leading-7 text-zinc-600 md:px-6">{text.answer}</div> : null}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
