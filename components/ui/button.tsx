"use client";

import { cn } from "@/lib/utils/cn";

type Variant = "primary" | "secondary" | "ghost";

export function Button({
  children,
  className,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition",
        "duration-[var(--atlas-duration)] [transition-timing-function:var(--atlas-ease)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-atlas-accent/70 focus-visible:ring-offset-0",
        variant === "primary" &&
          "bg-gradient-to-b from-atlas-accent/90 to-atlas-accent/60 text-white shadow-[0_18px_60px_rgba(var(--atlas-glow)/0.18)] border border-atlas-accent/30 hover:translate-y-[-1px]",
        variant === "secondary" &&
          "bg-atlas-surface2 text-atlas-text border border-atlas-border2 hover:bg-atlas-surface3",
        variant === "ghost" &&
          "bg-transparent text-atlas-muted border border-transparent hover:text-atlas-text hover:bg-atlas-surface hover:border-atlas-border",
        className
      )}
    >
      {children}
    </button>
  );
}

