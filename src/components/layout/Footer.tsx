import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="mt-12 border-t border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.85))] pb-20 md:mt-20 md:pb-0">
      <div className="luxury-shell py-10 md:py-14">
        <div className="luxury-card overflow-hidden">
          <div className="grid gap-8 px-4 py-8 sm:px-6 sm:py-10 md:grid-cols-[1.3fr_0.7fr_0.7fr] md:gap-10 md:px-10">
            <div>
              <div className="text-[11px] uppercase tracking-[0.35em] text-amber-700/80">
                Liburan impian, nyata bersama kami
              </div>
              <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-zinc-950">
                Buana Tour & Travel
              </h3>
              <p className="mt-4 max-w-md text-sm leading-7 text-zinc-600">{t("tagline")}</p>
            </div>

            <div>
              <div className="text-sm font-semibold text-zinc-950">Layanan</div>
              <div className="mt-4 space-y-3 text-sm text-zinc-600">
                <div>Paket Tour</div>
                <div>Blog & Inspirasi</div>
                <div>Kontak & Inquiry</div>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold text-zinc-950">Kontak</div>
              <div className="mt-4 space-y-3 text-sm text-zinc-600">
                <div>Semarang, Indonesia</div>
                <div className="break-all">buanasejahterasemarang@gmail.com</div>
                <div>085875466660</div>
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-200/70 px-4 py-4 text-center text-xs text-zinc-500 sm:px-6 sm:text-left md:px-10">
            {t("copyright")}
          </div>
        </div>
      </div>
    </footer>
  );
}
