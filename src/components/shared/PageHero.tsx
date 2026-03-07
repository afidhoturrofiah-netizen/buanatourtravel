type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden px-4 pt-5 md:px-6 md:pt-7 xl:pt-8">
      <div className="luxury-shell">
        <div className="relative overflow-hidden rounded-[28px] bg-[radial-gradient(circle_at_top_right,rgba(245,158,11,0.22),transparent_20%),linear-gradient(135deg,#111827_0%,#172554_48%,#6b4f12_100%)] px-5 py-8 text-white shadow-[0_26px_110px_rgba(15,23,42,0.18)] md:rounded-[32px] md:px-8 md:py-10 lg:px-10 lg:py-12 xl:rounded-[36px] xl:px-12 xl:py-14">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.04),transparent_35%,rgba(255,255,255,0.02))]" />
          <div className="relative max-w-3xl xl:max-w-4xl">
            <div className="text-[10px] uppercase tracking-[0.3em] text-amber-300/85 md:text-[11px] md:tracking-[0.35em]">{eyebrow}</div>
            <h1 className="mt-3 text-[2rem] font-semibold tracking-[-0.045em] leading-[1.04] md:mt-4 md:text-[2.9rem] md:leading-[1.02] lg:text-[3.4rem] xl:text-6xl xl:leading-[1.03]">{title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-6 text-white/75 md:text-base md:leading-7 lg:max-w-3xl lg:text-lg lg:leading-8">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
