"use client";

import { cn } from "@/lib/utils/cn";

interface PillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export function Pill({ label, active, onClick, className }: PillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3.5 py-1.5 rounded-full text-xs font-medium transition border",
        "duration-[var(--atlas-duration)] [transition-timing-function:var(--atlas-ease)]",
        active
          ? "bg-atlas-accent/20 text-atlas-text border-atlas-accent/40"
          : "bg-transparent text-atlas-muted border-atlas-border hover:border-atlas-border2",
        className
      )}
    >
      {label}
    </button>
  );
}

