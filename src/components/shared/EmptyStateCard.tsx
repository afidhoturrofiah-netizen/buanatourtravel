import Link from "next/link";
import { CircleAlert } from "lucide-react";

type EmptyStateCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  className?: string;
};

export default function EmptyStateCard({
  eyebrow,
  title,
  description,
  actionHref,
  actionLabel,
  secondaryHref,
  secondaryLabel,
  className = "",
}: EmptyStateCardProps) {
  return (
    <div className={`luxury-card overflow-hidden p-6 md:p-8 ${className}`.trim()}>
      <div className="rounded-[24px] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(248,244,237,0.96))] p-6 text-center md:p-8">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-50 text-amber-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <CircleAlert className="h-6 w-6" />
        </div>
        <div className="mt-5 text-[11px] uppercase tracking-[0.35em] text-amber-700/80">{eyebrow}</div>
        <div className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-zinc-950 md:text-[2rem]">{title}</div>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-zinc-600 md:text-base">{description}</p>

        {actionHref && actionLabel ? (
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href={actionHref}
              className="inline-flex items-center justify-center rounded-2xl bg-zinc-950 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              {actionLabel}
            </Link>
            {secondaryHref && secondaryLabel ? (
              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-2xl border border-zinc-200 bg-white px-5 py-3 text-sm font-medium text-zinc-700 transition hover:border-amber-300 hover:bg-amber-50"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
