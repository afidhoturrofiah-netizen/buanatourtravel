import { ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";

import { loginAdminAction } from "@/app/actions/admin-actions";
import { isAdminAuthenticated } from "@/lib/auth";

export default async function AdminLoginPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { locale } = await params;
  const { error } = await searchParams;
  const authenticated = await isAdminAuthenticated();

  if (authenticated) {
    redirect(`/${locale}/admin`);
  }

  return (
    <div className="luxury-shell py-16 md:py-24">
      <div className="mx-auto max-w-lg luxury-card overflow-hidden">
        <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,244,237,0.95))] p-8 md:p-10">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-zinc-950 via-zinc-800 to-amber-500 text-white shadow-lg shadow-amber-200/40">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <div className="mt-6 text-[11px] uppercase tracking-[0.35em] text-amber-700/80">Admin Access</div>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">Masuk ke Buana CMS</h1>
          <p className="mt-3 text-sm leading-7 text-zinc-600">Kelola paket tour, blog, gambar, dan inquiry dari satu dashboard sederhana.</p>

          {error ? (
            <div className="mt-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              Email atau password admin tidak valid.
            </div>
          ) : null}

          <form action={loginAdminAction} className="mt-8 space-y-4">
            <input type="hidden" name="locale" value={locale} />
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-800" htmlFor="email">Email admin</label>
              <input id="email" name="email" type="email" className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-amber-400" placeholder="buanasejahterasemarang@gmail.com" required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-800" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-amber-400" placeholder="Masukkan password admin" required />
            </div>
            <button className="w-full rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">Masuk</button>
          </form>
        </div>
      </div>
    </div>
  );
}
