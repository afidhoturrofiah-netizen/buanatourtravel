"use client";

import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

export default function InquirySubmitButton({ isId }: { isId: boolean }) {
  const { pending } = useFormStatus();

  return (
    <div className="space-y-3">
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-2xl bg-zinc-950 px-5 py-4 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-700"
      >
        {pending ? (isId ? "Menyiapkan WhatsApp..." : "Preparing WhatsApp...") : isId ? "Kirim inquiry & lanjut ke WhatsApp" : "Send inquiry & continue to WhatsApp"}
      </button>
      <div className="min-h-6 text-xs text-zinc-500">
        {pending ? (
          <span className="inline-flex items-center gap-2 text-amber-700">
            <LoaderCircle className="h-4 w-4 animate-spin" />
            {isId ? "Inquiry sedang disimpan lalu kamu akan diarahkan ke WhatsApp admin." : "Your inquiry is being saved and you will be redirected to admin WhatsApp."}
          </span>
        ) : isId ? (
          "Setelah submit, inquiry tetap masuk ke dashboard admin lalu WhatsApp akan terbuka otomatis."
        ) : (
          "After submission, the inquiry is still saved to the admin dashboard and WhatsApp opens automatically."
        )}
      </div>
    </div>
  );
}
