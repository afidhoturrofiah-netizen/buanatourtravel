"use client";

import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

type AdminActionButtonProps = {
  idleLabel: string;
  pendingLabel: string;
  className: string;
  type?: "submit" | "button";
};

export default function AdminActionButton({
  idleLabel,
  pendingLabel,
  className,
  type = "submit",
}: AdminActionButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button type={type} disabled={pending} className={`${className} ${pending ? "cursor-not-allowed opacity-80" : ""}`}>
      {pending ? (
        <span className="inline-flex items-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {pendingLabel}
        </span>
      ) : (
        idleLabel
      )}
    </button>
  );
}
