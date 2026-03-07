import { saveHomepageSettingsAction } from "@/app/actions/admin-actions";
import AdminActionButton from "@/components/admin/AdminActionButton";
import type { HomepageSettings } from "@/lib/cms-types";

export default function HomepageSettingsForm({
  locale,
  initialData,
}: {
  locale: string;
  initialData: HomepageSettings;
}) {
  return (
    <form action={saveHomepageSettingsAction} className="space-y-6">
      <input type="hidden" name="locale" value={locale} />

      <div className="rounded-3xl border border-zinc-200 bg-white p-5">
        <div className="text-lg font-semibold tracking-[-0.03em] text-zinc-950">Why Travelers Return</div>
        <p className="mt-2 text-sm text-zinc-600">Atur eyebrow, judul, deskripsi, dan bullet points untuk section gelap di homepage.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <Field label="Eyebrow ID" name="why_eyebrow_id" defaultValue={initialData.whySection.eyebrow.id} />
          <Field label="Eyebrow EN" name="why_eyebrow_en" defaultValue={initialData.whySection.eyebrow.en} />
          <Field label="Judul ID" name="why_title_id" defaultValue={initialData.whySection.title.id} />
          <Field label="Judul EN" name="why_title_en" defaultValue={initialData.whySection.title.en} />
        </div>

        <div className="mt-4 space-y-4">
          <Textarea label="Deskripsi ID" name="why_description_id" defaultValue={initialData.whySection.description.id} rows={4} />
          <Textarea label="Deskripsi EN" name="why_description_en" defaultValue={initialData.whySection.description.en} rows={4} />
          <Textarea label="Bullet ID (satu baris satu item)" name="why_points_id" defaultValue={initialData.whySection.points.id.join("\n")} rows={5} />
          <Textarea label="Bullet EN (satu baris satu item)" name="why_points_en" defaultValue={initialData.whySection.points.en.join("\n")} rows={5} />
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-5">
        <div className="text-lg font-semibold tracking-[-0.03em] text-zinc-950">Top Destinations</div>
        <p className="mt-2 text-sm text-zinc-600">Atur nama kartu, sublabel, dan query filter untuk tombol Discover now.</p>

        <div className="mt-6 space-y-6">
          {initialData.topDestinations.map((item, index) => (
            <div key={`${item.query}-${index}`} className="rounded-2xl border border-zinc-200 p-4">
              <div className="text-sm font-semibold text-zinc-900">Destination #{index + 1}</div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="Nama ID" name={`destination_${index + 1}_name_id`} defaultValue={item.name.id} />
                <Field label="Nama EN" name={`destination_${index + 1}_name_en`} defaultValue={item.name.en} />
                <Field label="Label ID" name={`destination_${index + 1}_label_id`} defaultValue={item.label.id} />
                <Field label="Label EN" name={`destination_${index + 1}_label_en`} defaultValue={item.label.en} />
                <div className="md:col-span-2">
                  <Field label="Query filter tujuan" name={`destination_${index + 1}_query`} defaultValue={item.query} />
                </div>
                <div className="md:col-span-2">
                  <Field label="Custom link Discover now" name={`destination_${index + 1}_custom_link`} defaultValue={item.customLink} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-zinc-200 bg-white p-5">
        <div className="text-lg font-semibold tracking-[-0.03em] text-zinc-950">FAQ</div>
        <p className="mt-2 text-sm text-zinc-600">Atur pertanyaan umum yang tampil di homepage dan dipakai juga oleh bubble chat.</p>

        <div className="mt-6 space-y-6">
          {initialData.faqItems.map((item, index) => (
            <div key={item.id} className="rounded-2xl border border-zinc-200 p-4">
              <div className="text-sm font-semibold text-zinc-900">FAQ #{index + 1}</div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="ID FAQ" name={`faq_${index + 1}_id`} defaultValue={item.id} />
                <Field label="Keywords (pisahkan dengan koma)" name={`faq_${index + 1}_keywords`} defaultValue={item.keywords.join(", ")} />
                <Field label="Pertanyaan ID" name={`faq_${index + 1}_question_id`} defaultValue={item.question.id} />
                <Field label="Pertanyaan EN" name={`faq_${index + 1}_question_en`} defaultValue={item.question.en} />
                <div className="md:col-span-2">
                  <Textarea label="Jawaban ID" name={`faq_${index + 1}_answer_id`} defaultValue={item.answer.id} rows={4} />
                </div>
                <div className="md:col-span-2">
                  <Textarea label="Jawaban EN" name={`faq_${index + 1}_answer_en`} defaultValue={item.answer.en} rows={4} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdminActionButton
        idleLabel="Simpan homepage settings"
        pendingLabel="Menyimpan homepage settings..."
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
