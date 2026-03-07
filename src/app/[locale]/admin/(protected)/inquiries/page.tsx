import { deleteInquiryAction } from "@/app/actions/admin-actions";
import AdminActionButton from "@/components/admin/AdminActionButton";
import AdminStatusNotice from "@/components/admin/AdminStatusNotice";
import { getInquiries } from "@/lib/cms-storage";

const inquiryDateFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Jakarta",
});

export default async function AdminInquiriesPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { locale } = await params;
  const { status } = await searchParams;
  const inquiries = await getInquiries();

  return (
    <div className="space-y-6">
      <AdminStatusNotice status={status} />
      <div>
        <div className="text-[11px] uppercase tracking-[0.32em] text-amber-700/80">Inquiry</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">Inquiry yang masuk</h1>
        <p className="mt-3 text-sm leading-7 text-zinc-600">Semua form dari contact page dan detail tour akan muncul di sini.</p>
      </div>

      <div className="space-y-4">
        {inquiries.map((item) => (
          <div key={item.id} className="luxury-card p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <div className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">{item.fullName}</div>
                <div className="mt-2 text-sm text-zinc-500">{item.email} · {item.phone}</div>
                <div className="mt-3 inline-flex rounded-full bg-amber-50 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-amber-700">
                  {item.type === "tour" ? "Tour inquiry" : "Contact inquiry"}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600">
                  {inquiryDateFormatter.format(new Date(item.createdAt))}
                </div>
                <form action={deleteInquiryAction}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={item.id} />
                  <AdminActionButton
                    idleLabel="Hapus"
                    pendingLabel="Menghapus..."
                    className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 transition hover:bg-rose-100"
                  />
                </form>
              </div>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <Info label="Destinasi / Paket" value={item.destination || item.tourSlug || "-"} />
              <Info label="Tanggal berangkat" value={item.departureDate || "-"} />
              <div className="md:col-span-2">
                <Info label="Pesan" value={item.message || "-"} />
              </div>
            </div>
          </div>
        ))}

        {inquiries.length === 0 ? (
          <div className="luxury-card p-6 text-sm text-zinc-500">Belum ada inquiry masuk.</div>
        ) : null}
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-4">
      <div className="text-[11px] uppercase tracking-[0.24em] text-zinc-400">{label}</div>
      <div className="mt-2 text-sm leading-7 text-zinc-700">{value}</div>
    </div>
  );
}
