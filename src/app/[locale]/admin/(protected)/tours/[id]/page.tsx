import { notFound } from "next/navigation";

import TourForm from "@/components/admin/TourForm";
import { getTours } from "@/lib/cms-storage";

export const dynamic = "force-dynamic";

export default async function EditTourPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const tours = await getTours();
  const tour = tours.find((item) => item.id === id);

  if (!tour) notFound();

  return (
    <div className="luxury-card p-6 md:p-8">
      <div className="text-[11px] uppercase tracking-[0.32em] text-amber-700/80">Paket Tour</div>
      <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">Edit paket tour</h1>
      <div className="mt-8">
        <TourForm locale={locale} initialData={tour} />
      </div>
    </div>
  );
}
