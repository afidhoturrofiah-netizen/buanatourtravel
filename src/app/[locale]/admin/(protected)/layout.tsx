import Link from "next/link";
import { redirect } from "next/navigation";
import { Images, LayoutDashboard, LogOut, Map, MessageSquare, Newspaper, Settings2 } from "lucide-react";

import { logoutAdminAction } from "@/app/actions/admin-actions";
import type { Locale } from "@/i18n/routing";
import { isAdminAuthenticated } from "@/lib/auth";

export default async function ProtectedAdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    redirect(`/${locale}/admin/login`);
  }

  const resolvedLocale = locale as Locale;

  return (
    <div className="luxury-shell py-8">
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="luxury-card h-fit p-5">
          <div className="text-[11px] uppercase tracking-[0.32em] text-amber-700/80">Admin CMS</div>
          <div className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-zinc-950">Buana Panel</div>

          <nav className="mt-6 space-y-2 text-sm text-zinc-700">
            <Link className="flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-amber-50" href={`/${resolvedLocale}/admin`}>
              <LayoutDashboard className="h-4 w-4 text-amber-700" />
              Dashboard
            </Link>
            <Link className="flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-amber-50" href={`/${resolvedLocale}/admin/tours`}>
              <Map className="h-4 w-4 text-amber-700" />
              Paket Tour
            </Link>
            <Link className="flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-amber-50" href={`/${resolvedLocale}/admin/blog`}>
              <Newspaper className="h-4 w-4 text-amber-700" />
              Blog
            </Link>
            <Link className="flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-amber-50" href={`/${resolvedLocale}/admin/inquiries`}>
              <MessageSquare className="h-4 w-4 text-amber-700" />
              Inquiry
            </Link>
            <Link className="flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-amber-50" href={`/${resolvedLocale}/admin/homepage`}>
              <Settings2 className="h-4 w-4 text-amber-700" />
              Homepage
            </Link>
            <Link className="flex items-center gap-3 rounded-2xl px-4 py-3 transition hover:bg-amber-50" href={`/${resolvedLocale}/admin/documentation`}>
              <Images className="h-4 w-4 text-amber-700" />
              Dokumentasi
            </Link>
          </nav>

          <form action={logoutAdminAction} className="mt-8">
            <button className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-950 px-4 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </aside>

        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
