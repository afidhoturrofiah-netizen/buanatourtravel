import TourForm from "@/components/admin/TourForm";

export default async function NewTourPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <div className="luxury-card p-6 md:p-8">
      <div className="text-[11px] uppercase tracking-[0.32em] text-amber-700/80">Paket Tour</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">Tambah paket tour</h1>
      <div className="mt-8">
        <TourForm locale={locale} />
      </div>
    </div>
  );
}
