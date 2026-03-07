  import type { Locale } from "@/i18n/routing";
  import type { HomepageFaqItem } from "@/lib/cms-types";

export type FaqItem = HomepageFaqItem;

export function getFaqText(locale: Locale, item: FaqItem) {
  return {
    question: locale === "id" ? item.question.id : item.question.en,
    answer: locale === "id" ? item.answer.id : item.answer.en,
  };
}

export function findFaqReply(input: string, locale: Locale, faqItems: FaqItem[]) {
  const normalized = input.toLowerCase();
  const matched = faqItems.find((item) => item.keywords.some((keyword) => normalized.includes(keyword)));

  if (!matched) return null;

  return getFaqText(locale, matched).answer;
}
