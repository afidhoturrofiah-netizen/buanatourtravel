"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MessageCircle, Send, Sparkles, X } from "lucide-react";

import type { Locale } from "@/i18n/routing";
import { findFaqReply, type FaqItem } from "@/lib/faq";

type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
  fallback?: boolean;
};

const WHATSAPP_NUMBER = "6285875466660";

function buildWhatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getReply(input: string, locale: Locale, faqItems: FaqItem[]) {
  const text = input.toLowerCase();
  const faqReply = findFaqReply(input, locale, faqItems);

  const replies = {
    greeting: locale === "id"
      ? "Halo! Aku bisa bantu jawab seputar paket tour, harga, destinasi, inquiry, dan kontak Buana Tour & Travel."
      : "Hi! I can help with tour packages, pricing, destinations, inquiries, and Buana Tour & Travel contact info.",
    price: locale === "id"
      ? "Untuk harga, kamu bisa cek detail paket di halaman tour. Kalau mau penawaran yang paling cocok, aku sarankan lanjut inquiry atau hubungi WhatsApp admin ya."
      : "For pricing, please check the package detail page. If you want the most suitable offer, I recommend sending an inquiry or contacting admin via WhatsApp.",
    destination: locale === "id"
      ? "Kami punya berbagai paket tour dan destinasi unggulan. Kamu bisa buka halaman Paket Tour lalu pilih destinasi yang paling cocok."
      : "We offer various tour packages and featured destinations. You can open the Tours page and choose the best destination for your trip.",
    inquiry: locale === "id"
      ? "Kalau kamu sudah tertarik, isi form inquiry di halaman kontak atau detail tour. Tim admin akan follow up lebih cepat dari dashboard."
      : "If you're interested, fill in the inquiry form on the contact or tour detail page. The admin team can follow up quickly from the dashboard.",
    contact: locale === "id"
      ? "Kontak kami saat ini: Semarang, Indonesia, email buanasejahterasemarang@gmail.com, telepon 085875466660."
      : "Our current contact details are: Semarang, Indonesia, email buanasejahterasemarang@gmail.com, phone 085875466660.",
  };

  if (/halo|hai|hi|hello|pagi|siang|sore/.test(text)) return { content: replies.greeting, fallback: false };
  if (/harga|price|biaya|cost|promo/.test(text)) return { content: replies.price, fallback: false };
  if (/tour|paket|destinasi|destination|trip|liburan/.test(text)) return { content: replies.destination, fallback: false };
  if (/inquiry|pesan|booking|book|reservasi|konsultasi/.test(text)) return { content: replies.inquiry, fallback: false };
  if (/kontak|contact|email|telepon|phone|whatsapp|wa/.test(text)) return { content: replies.contact, fallback: false };
  if (faqReply) return { content: faqReply, fallback: false };

  return {
    content: locale === "id"
      ? "Maaf, aku belum terlalu paham pertanyaan itu. Biar tidak salah jawab, langsung hubungi admin via WhatsApp ya."
      : "Sorry, I’m not fully confident answering that. To avoid giving the wrong answer, please contact admin directly on WhatsApp.",
    fallback: true,
  };
}

export default function ChatBubble({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [faqItems, setFaqItems] = useState<FaqItem[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        locale === "id"
          ? "Halo! Tanya apa saja soal tour, harga, atau cara inquiry."
          : "Hi! Ask anything about tours, pricing, or how to send an inquiry.",
    },
  ]);

  const whatsappHref = useMemo(
    () => buildWhatsappLink(locale === "id" ? "Halo admin, saya ingin dibantu soal paket tour." : "Hello admin, I need help with a tour package."),
    [locale]
  );

  useEffect(() => {
    if (!isOpen || faqItems.length > 0) return;

    let isMounted = true;

    fetch("/api/chat-faq")
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setFaqItems(Array.isArray(data?.faqItems) ? data.faqItems : []);
        }
      })
      .catch(() => {
        if (isMounted) {
          setFaqItems([]);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [isOpen, faqItems.length]);

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: trimmed,
    };

    const reply = getReply(trimmed, locale, faqItems);
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: reply.content,
      fallback: reply.fallback,
    };

    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput("");
  }

  return (
    <>
      {isOpen ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-[60] bg-zinc-950/40 md:hidden"
            aria-label="Close chat overlay"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-x-3 bottom-[4.5rem] z-[61] mx-auto max-w-sm overflow-hidden rounded-[24px] border border-white/70 bg-white shadow-[0_8px_32px_rgba(15,23,42,0.14)] sm:inset-x-auto sm:right-4 sm:bottom-20 md:right-6 md:bottom-6">
            <div className="bg-[linear-gradient(135deg,#111827_0%,#172554_48%,#6b4f12_100%)] px-4 py-3.5 text-white">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Sparkles className="h-4 w-4 text-amber-300" />
                  <span className="text-sm font-semibold tracking-[-0.02em]">
                    {locale === "id" ? "Butuh bantuan?" : "Need help?"}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/15"
                  aria-label="Close chat"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="max-h-[40vh] space-y-3 overflow-y-auto bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(248,244,237,0.96))] px-4 py-4 sm:max-h-[22rem]">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-6 shadow-sm ${
                      message.role === "user"
                        ? "bg-zinc-950 text-white"
                        : "bg-white text-zinc-700 ring-1 ring-zinc-200/80"
                    }`}
                  >
                    <div>{message.content}</div>
                    {message.fallback ? (
                      <Link
                        href={buildWhatsappLink(message.content)}
                        target="_blank"
                        className="mt-3 inline-flex items-center justify-center rounded-full bg-green-600 px-4 py-2 text-xs font-medium text-white transition hover:bg-green-700"
                      >
                        {locale === "id" ? "Hubungi via WhatsApp" : "Contact via WhatsApp"}
                      </Link>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-zinc-200/80 bg-white px-3 py-3 sm:px-4 sm:py-4">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder={locale === "id" ? "Tulis pertanyaanmu..." : "Type your question..."}
                  className="h-11 flex-1 rounded-2xl border border-zinc-200 bg-white px-4 text-sm text-zinc-900 outline-none transition focus:border-amber-300"
                />
                <button
                  type="button"
                  onClick={handleSend}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-950 text-white transition hover:bg-zinc-800"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>

              <Link
                href={whatsappHref}
                target="_blank"
                className="mt-2.5 inline-flex text-xs font-medium text-green-700 transition hover:text-green-800"
              >
                {locale === "id" ? "Atau langsung chat admin via WhatsApp" : "Or chat admin directly on WhatsApp"}
              </Link>
            </div>
          </div>
        </>
      ) : null}

      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="fixed bottom-[4.75rem] right-3 z-[60] inline-flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#111827_0%,#172554_48%,#d97706_100%)] text-white shadow-[0_18px_40px_rgba(15,23,42,0.22)] transition hover:-translate-y-0.5 hover:brightness-105 sm:right-4 sm:h-14 sm:w-14 md:bottom-6 md:right-6"
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
      </button>
    </>
  );
}
