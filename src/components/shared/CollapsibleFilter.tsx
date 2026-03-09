"use client";

import { useState } from "react";
import { ChevronDown, Filter } from "lucide-react";

export default function CollapsibleFilter({
  label,
  activeLabel,
  children,
}: {
  label: string;
  activeLabel: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="luxury-card overflow-hidden p-4 sm:p-5 md:p-6 xl:p-7">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 md:pointer-events-none"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <Filter className="h-4 w-4" />
          </div>
          <div className="text-left">
            <div className="text-sm font-semibold text-zinc-950 sm:text-base">{label}</div>
            <div className="mt-0.5 line-clamp-1 text-xs text-zinc-500">{activeLabel}</div>
          </div>
        </div>
        <ChevronDown className={`h-5 w-5 text-zinc-400 transition md:hidden ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div className={`${isOpen ? "mt-4" : "mt-0 hidden"} md:mt-5 md:block`}>
        {children}
      </div>
    </div>
  );
}
