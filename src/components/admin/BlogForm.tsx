import type { BlogRecord } from "@/lib/cms-types";
import { saveBlogAction } from "@/app/actions/admin-actions";
import AdminActionButton from "@/components/admin/AdminActionButton";
import ImageCropUpload from "@/components/admin/ImageCropUpload";

export default function BlogForm({
  locale,
  initialData,
}: {
  locale: string;
  initialData?: BlogRecord;
}) {
  return (
    <form action={saveBlogAction} className="space-y-6">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="id" value={initialData?.id || ""} />
      <input type="hidden" name="created_at" value={initialData?.createdAt || ""} />
      <input type="hidden" name="existing_image" value={initialData?.image || ""} />

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Judul ID" name="title_id" defaultValue={initialData?.title.id} />
        <Field label="Judul EN" name="title_en" defaultValue={initialData?.title.en} />
        <Field label="Slug" name="slug" defaultValue={initialData?.slug} />
        <Field label="Tanggal" name="date" defaultValue={initialData?.date} />
        <Field label="Read time" name="read_time" defaultValue={initialData?.readTime} />
        <Field label="Kategori ID" name="category_id" defaultValue={initialData?.category.id} />
        <Field label="Kategori EN" name="category_en" defaultValue={initialData?.category.en} />
      </div>

      <Textarea label="Excerpt ID" name="excerpt_id" defaultValue={initialData?.excerpt.id} rows={4} />
      <Textarea label="Excerpt EN" name="excerpt_en" defaultValue={initialData?.excerpt.en} rows={4} />
      <Textarea label="Konten ID (satu paragraf per baris)" name="content_id" defaultValue={initialData?.content.id.join("\n")} rows={6} />
      <Textarea label="Konten EN (satu paragraf per baris)" name="content_en" defaultValue={initialData?.content.en.join("\n")} rows={6} />

      <ImageCropUpload name="image" existingImage={initialData?.image} aspect={4 / 3} label="Upload gambar artikel" />

      <label className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-700">
        <input type="checkbox" name="featured" defaultChecked={initialData?.featured} />
        Jadikan artikel unggulan
      </label>

      <AdminActionButton
        idleLabel="Simpan artikel"
        pendingLabel="Menyimpan artikel..."
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
