import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/auth";
import DatabaseManagement from "@/components/admin/DatabaseManagement";

export default async function DatabasePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    const { locale } = await params;
    redirect(`/${locale}/admin/login`);
  }

  const { locale } = await params;

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-[-0.03em] text-zinc-950">
            Database Management
          </h1>
          <p className="mt-2 text-zinc-600">
            Export dan import database untuk backup atau migrasi hosting
          </p>
        </div>

        <DatabaseManagement locale={locale} />
      </div>
    </div>
  );
}
