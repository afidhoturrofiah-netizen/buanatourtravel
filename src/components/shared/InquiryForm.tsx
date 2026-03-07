import { submitInquiryAction } from "@/app/actions/admin-actions";
import InquirySubmitButton from "@/components/shared/InquirySubmitButton";

export default function InquiryForm({
  locale,
  type,
  tourSlug,
  destinationLabel,
  isId,
}: {
  locale: string;
  type: "contact" | "tour";
  tourSlug?: string;
  destinationLabel?: string;
  isId: boolean;
}) {
  return (
    <form action={submitInquiryAction} className="mt-8 space-y-4">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="type" value={type} />
      <input type="hidden" name="tour_slug" value={tourSlug || ""} />
      <input type="hidden" name="destination" value={destinationLabel || ""} />

      <div className="grid gap-4 md:grid-cols-2">
        <input name="full_name" required className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm text-zinc-700 outline-none transition focus:border-amber-400 md:col-span-2" placeholder={isId ? "Nama lengkap" : "Full name"} />
        <input name="phone" required className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm text-zinc-700 outline-none transition focus:border-amber-400" placeholder={isId ? "Nomor WhatsApp" : "WhatsApp number"} />
        <input name="email" type="email" required className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm text-zinc-700 outline-none transition focus:border-amber-400" placeholder="Email" />
        <input name="departure_date" className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm text-zinc-700 outline-none transition focus:border-amber-400 md:col-span-2" placeholder={isId ? "Tanggal keberangkatan yang diinginkan" : "Preferred departure date"} />
        <textarea name="message" rows={4} className="rounded-2xl border border-zinc-200 bg-white px-4 py-4 text-sm text-zinc-700 outline-none transition focus:border-amber-400 md:col-span-2" placeholder={isId ? "Ceritakan kebutuhan perjalananmu" : "Tell us about your travel needs"} />
      </div>

      <InquirySubmitButton isId={isId} />
    </form>
  );
}
