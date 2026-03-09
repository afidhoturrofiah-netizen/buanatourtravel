"use client";

import dynamic from "next/dynamic";

import type { Locale } from "@/i18n/routing";

const ChatBubble = dynamic(() => import("@/components/shared/ChatBubble"), {
  ssr: false,
});

export default function LazyChatBubble({ locale }: { locale: Locale }) {
  return <ChatBubble locale={locale} />;
}
