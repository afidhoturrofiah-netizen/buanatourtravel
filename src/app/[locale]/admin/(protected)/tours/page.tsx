import Link from "next/link";

import { deleteTourAction } from "@/app/actions/admin-actions";
import AdminActionButton from "@/components/admin/AdminActionButton";
import AdminStatusNotice from "@/components/admin/AdminStatusNotice";
import { getTours } from "@/lib/cms-storage";

export default async function AdminToursPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { locale } = await params;
  const { status } = await searchParams;
  const tours = await getTours();

  return (
    <div className="space-y-6">
      <AdminStatusNotice status={status} />
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[11px] uppercase tracking-[0.32em] text-amber-700/80">Paket Tour</div>
          <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">Kelola paket tour</h1>
        </div>
        <Link href={`/${locale}/admin/tours/new`} className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">
          Tambah paket
        </Link>
      </div>

      <div className="space-y-4">
        {tours.map((tour) => (
          <div key={tour.id} className="luxury-card p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">{tour.title.id}</div>
                <div className="mt-2 text-sm text-zinc-500">{tour.destination.id} · {tour.duration} · {tour.price}</div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href={`/${locale}/admin/tours/${tour.id}`} className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700 transition hover:border-amber-300 hover:bg-amber-50">
                  Edit
                </Link>
                <form action={deleteTourAction}>
                  <input type="hidden" name="locale" value={locale} />
                  <input type="hidden" name="id" value={tour.id} />
                  <AdminActionButton
                    idleLabel="Hapus"
                    pendingLabel="Menghapus..."
                    className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 transition hover:bg-rose-100"
                  />
                </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
