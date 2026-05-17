"use client";

import { useState } from "react";
import { cn } from "@/lib/utils/cn";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function Card({ children, className, onClick, hoverable }: CardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => hoverable && setHovered(true)}
      onMouseLeave={() => hoverable && setHovered(false)}
      className={cn(
        "atlas-glass rounded-2xl overflow-hidden transition-all",
        "duration-[var(--atlas-duration)] [transition-timing-function:var(--atlas-ease)]",
        hoverable && "cursor-pointer",
        hovered &&
          "translate-y-[-3px] shadow-[0_24px_70px_rgba(0,0,0,0.55),0_0_44px_rgba(var(--atlas-glow)/0.12)]",
        className
      )}
    >
      {children}
    </div>
  );
}

