import Link from "next/link";

export default async function UserRegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isId = locale === "id";

  return (
    <div className="luxury-shell pb-24 pt-8 sm:py-16 md:pb-24 md:py-24">
      <div className="mx-auto max-w-lg luxury-card overflow-hidden">
        <div className="bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,244,237,0.95))] p-5 sm:p-8 md:p-10">
          <div className="text-[11px] uppercase tracking-[0.35em] text-amber-700/80">
            {isId ? "Create Account" : "Create Account"}
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-zinc-950">
            {isId ? "Buat akun baru" : "Create your new account"}
          </h1>
          <p className="mt-3 text-sm leading-7 text-zinc-600">
            {isId ? "Daftar akun untuk mempermudah proses booking dan menyimpan riwayat perjalanan Anda." : "Register an account to simplify booking and save your travel history."}
          </p>

          <form className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-800" htmlFor="name">{isId ? "Nama lengkap" : "Full name"}</label>
              <input id="name" name="name" type="text" className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-amber-400" placeholder={isId ? "Masukkan nama lengkap" : "Enter your full name"} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-800" htmlFor="email">Email</label>
              <input id="email" name="email" type="email" className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-amber-400" placeholder={isId ? "Masukkan email" : "Enter your email"} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-800" htmlFor="password">Password</label>
              <input id="password" name="password" type="password" className="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none ring-0 transition focus:border-amber-400" placeholder={isId ? "Buat password" : "Create a password"} />
            </div>
            <button type="button" className="w-full rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800">
              {isId ? "Daftar" : "Register"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-zinc-600">
            {isId ? "Sudah punya akun?" : "Already have an account?"}{" "}
            <Link href={`/${locale}/login`} className="font-medium text-amber-700 transition hover:text-amber-800">
              {isId ? "Login" : "Login"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
