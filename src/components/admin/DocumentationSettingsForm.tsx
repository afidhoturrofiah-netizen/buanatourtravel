"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { saveHomepageDocumentationAction } from "@/app/actions/admin-actions";
import AdminActionButton from "@/components/admin/AdminActionButton";
import type { HomepageDocumentationItem } from "@/lib/cms-types";

function createEmptyDocumentationItem(sequence: number): HomepageDocumentationItem {
  return {
    id: `documentation-new-${sequence}`,
    image: "",
    title: { id: "", en: "" },
    label: { id: "", en: "" },
  };
}

export default function DocumentationSettingsForm({
  locale,
  items,
}: {
  locale: string;
  items: HomepageDocumentationItem[];
}) {
  const [documentationItems, setDocumentationItems] = useState<HomepageDocumentationItem[]>(() => (items.length > 0 ? items : [createEmptyDocumentationItem(1)]));

  function handleAddItem() {
    setDocumentationItems((current) => [
      ...current,
      createEmptyDocumentationItem(current.length + 1),
    ]);
  }

  function handleRemoveItem(indexToRemove: number) {
    setDocumentationItems((current) => current.filter((_, index) => index !== indexToRemove));
  }

  return (
    <form action={saveHomepageDocumentationAction} className="space-y-6">
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="documentation_total" value={documentationItems.length} />

      <div className="rounded-3xl border border-zinc-200 bg-white p-5">
        <div className="text-lg font-semibold tracking-[-0.03em] text-zinc-950">Travel Documentation Gallery</div>
        <p className="mt-2 text-sm text-zinc-600">Atur item dokumentasi yang tampil di marquee homepage tanpa harus scroll panjang di halaman Homepage Settings.</p>

        <div className="mt-6 space-y-6">
          {documentationItems.map((item, index) => (
            <div key={item.id} className="rounded-2xl border border-zinc-200 p-4">
              <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-semibold text-zinc-900">Documentation #{index + 1}</div>
                {documentationItems.length > 1 ? (
                  <button
                    type="button"
                    onClick={() => handleRemoveItem(index)}
                    className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Hapus
                  </button>
                ) : null}
              </div>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                <Field label="ID Item" name={`documentation_${index + 1}_id`} defaultValue={item.id} />
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-800" htmlFor={`documentation_${index + 1}_image_file`}>Upload gambar</label>
                  <input
                    id={`documentation_${index + 1}_image_file`}
                    name={`documentation_${index + 1}_image_file`}
                    type="file"
                    accept="image/*"
                    className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-xl file:border-0 file:bg-amber-50 file:px-3 file:py-2 file:text-sm file:font-medium file:text-amber-800 focus:border-amber-400"
                  />
                  <input type="hidden" name={`documentation_${index + 1}_existing_image`} value={item.image} />
                  <div className="mt-2 text-xs text-zinc-500">{item.image ? `Gambar saat ini: ${item.image}` : "Belum ada gambar dipilih."}</div>
                </div>
                <Field label="Judul ID" name={`documentation_${index + 1}_title_id`} defaultValue={item.title.id} />
                <Field label="Judul EN" name={`documentation_${index + 1}_title_en`} defaultValue={item.title.en} />
                <Field label="Label ID" name={`documentation_${index + 1}_label_id`} defaultValue={item.label.id} />
                <Field label="Label EN" name={`documentation_${index + 1}_label_en`} defaultValue={item.label.en} />
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleAddItem}
          className="mt-6 inline-flex rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800 transition hover:bg-amber-100"
        >
          Tambah dokumentasi
        </button>
      </div>

      <AdminActionButton
        idleLabel="Simpan dokumentasi"
        pendingLabel="Menyimpan dokumentasi..."
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
