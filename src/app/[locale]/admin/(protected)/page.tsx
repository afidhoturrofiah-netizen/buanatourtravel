import { Map, MessageSquare, Newspaper, Star } from "lucide-react";

import { getBlogs, getInquiries, getTours } from "@/lib/cms-storage";

export default async function AdminDashboardPage() {
  const [tours, blogs, inquiries] = await Promise.all([getTours(), getBlogs(), getInquiries()]);

  const stats = [
    { label: "Paket Tour", value: tours.length, icon: Map },
    { label: "Artikel Blog", value: blogs.length, icon: Newspaper },
    { label: "Inquiry Masuk", value: inquiries.length, icon: MessageSquare },
    { label: "Konten Unggulan", value: [...tours, ...blogs].filter((item) => item.featured).length, icon: Star },
  ];

  return (
    <div className="space-y-6">
      <div>
        <div className="text-[11px] uppercase tracking-[0.32em] text-amber-700/80">Dashboard</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">Admin CMS Sederhana</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">Kelola konten tour, blog, upload gambar, dan lihat inquiry terbaru dari satu panel.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div key={item.label} className="luxury-card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-sm text-zinc-500">{item.label}</div>
                  <div className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">{item.value}</div>
                </div>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="luxury-card p-6">
          <div className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">Tour terbaru</div>
          <div className="mt-5 space-y-3">
            {tours.slice(0, 5).map((tour) => (
              <div key={tour.id} className="rounded-2xl border border-zinc-200 bg-white px-4 py-4">
                <div className="font-medium text-zinc-950">{tour.title.id}</div>
                <div className="mt-1 text-sm text-zinc-500">{tour.destination.id}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="luxury-card p-6">
          <div className="text-xl font-semibold tracking-[-0.03em] text-zinc-950">Inquiry terbaru</div>
          <div className="mt-5 space-y-3">
            {inquiries.slice(0, 5).map((item) => (
              <div key={item.id} className="rounded-2xl border border-zinc-200 bg-white px-4 py-4">
                <div className="font-medium text-zinc-950">{item.fullName}</div>
                <div className="mt-1 text-sm text-zinc-500">{item.destination || item.tourSlug || "General inquiry"}</div>
              </div>
            ))}
            {inquiries.length === 0 ? <div className="rounded-2xl border border-dashed border-zinc-300 px-4 py-6 text-sm text-zinc-500">Belum ada inquiry masuk.</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
