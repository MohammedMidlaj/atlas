import { cn } from "@/lib/utils/cn";

interface TagProps {
  label: string;
  color?: string;
  size?: "sm" | "xs";
}

export function Tag({ label, color, size = "sm" }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center font-medium uppercase tracking-wider rounded-full border",
        size === "xs" ? "text-[9px] px-2 py-0.5" : "text-[10px] px-2.5 py-0.5"
      )}
      style={
        color
          ? { background: `${color}22`, color, borderColor: `${color}44` }
          : {
              background: "var(--atlas-surface3)",
              color: "var(--atlas-muted)",
              borderColor: "var(--atlas-border)",
            }
      }
    >
      {label}
    </span>
  );
}

