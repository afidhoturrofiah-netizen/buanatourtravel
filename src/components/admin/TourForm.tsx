import Image from "next/image";
import type { TourRecord } from "@/lib/cms-types";
import { saveTourAction } from "@/app/actions/admin-actions";
import AdminActionButton from "@/components/admin/AdminActionButton";

export default function TourForm({
  locale,
  initialData,
}: {
  locale: string;
  initialData?: TourRecord;
}) {
  return (
    <form action={saveTourAction} className="space-y-6">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="id" value={initialData?.id || ""} />
      <input type="hidden" name="created_at" value={initialData?.createdAt || ""} />
      <input type="hidden" name="existing_image" value={initialData?.image || ""} />

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Judul ID" name="title_id" defaultValue={initialData?.title.id} />
        <Field label="Judul EN" name="title_en" defaultValue={initialData?.title.en} />
        <Field label="Slug" name="slug" defaultValue={initialData?.slug} />
        <Field label="Durasi" name="duration" defaultValue={initialData?.duration} />
        <Field label="Harga" name="price" defaultValue={initialData?.price} />
        <Field label="Rating" name="rating" defaultValue={initialData?.rating} />
        <Field label="Destinasi ID" name="destination_id" defaultValue={initialData?.destination.id} />
        <Field label="Destinasi EN" name="destination_en" defaultValue={initialData?.destination.en} />
        <Field label="Kategori ID" name="category_id" defaultValue={initialData?.category.id} />
        <Field label="Kategori EN" name="category_en" defaultValue={initialData?.category.en} />
      </div>

      <Textarea label="Summary ID" name="summary_id" defaultValue={initialData?.summary.id} rows={4} />
      <Textarea label="Summary EN" name="summary_en" defaultValue={initialData?.summary.en} rows={4} />
      <Textarea label="Highlights ID (satu baris satu item)" name="highlights_id" defaultValue={initialData?.highlights.id.join("\n")} rows={5} />
      <Textarea label="Highlights EN (satu baris satu item)" name="highlights_en" defaultValue={initialData?.highlights.en.join("\n")} rows={5} />

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-800" htmlFor="image">Upload gambar</label>
        <input id="image" name="image" type="file" accept="image/*" className="block w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm" />
        <div className="mt-2 text-xs text-zinc-500">Gambar akan tampil auto-crop agar rasio kartu tetap rapi.</div>
        {initialData?.image ? (
          <div className="mt-4 max-w-sm overflow-hidden rounded-[24px] border border-zinc-200 bg-zinc-50 p-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] bg-zinc-100">
              <Image src={initialData.image} alt={initialData.title.id} fill className="object-cover" />
            </div>
            <div className="mt-2 text-xs text-zinc-500">Gambar saat ini: {initialData.image}</div>
          </div>
        ) : null}
      </div>

      <label className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">
        <input type="checkbox" name="featured" defaultChecked={initialData?.featured} />
        Jadikan konten unggulan
      </label>

      <AdminActionButton
        idleLabel="Simpan paket tour"
        pendingLabel="Menyimpan paket tour..."
        className="rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
      />
    </form>
  );
}

function Field({ label, name, defaultValue }: { label: string; name: string; defaultValue?: string }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-800" htmlFor={name}>{label}</label>
      <input id={name} name={name} defaultValue={defaultValue || ""} className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400" />
    </div>
  );
}

function Textarea({ label, name, defaultValue, rows }: { label: string; name: string; defaultValue?: string; rows: number }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-zinc-800" htmlFor={name}>{label}</label>
      <textarea id={name} name={name} defaultValue={defaultValue || ""} rows={rows} className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-amber-400" />
    </div>
  );
}
