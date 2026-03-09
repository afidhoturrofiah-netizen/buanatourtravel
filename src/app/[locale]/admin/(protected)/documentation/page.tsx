import DocumentationSettingsForm from "@/components/admin/DocumentationSettingsForm";
import AdminStatusNotice from "@/components/admin/AdminStatusNotice";
import { getHomepageSettings } from "@/lib/cms-storage";

export const dynamic = "force-dynamic";

export default async function AdminDocumentationPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ status?: string }>;
}) {
  const { locale } = await params;
  const { status } = await searchParams;
  const homepage = await getHomepageSettings();

  return (
    <div className="space-y-6">
      <AdminStatusNotice status={status} />
      <div>
        <div className="text-[11px] uppercase tracking-[0.32em] text-amber-700/80">Dokumentasi</div>
        <h1 className="mt-2 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">Documentation Settings</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">Kelola item dokumentasi foto untuk marquee gallery homepage dari halaman khusus agar panel admin lebih ringkas.</p>
      </div>

      <div className="luxury-card p-6">
        <DocumentationSettingsForm locale={locale} items={homepage.documentationItems} />
      </div>
    </div>
  );
}
