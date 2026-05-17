import { cn } from "@/lib/utils/cn";

interface StatCardProps {
  value: string | number;
  label: string;
  color?: string;
  icon?: string;
  className?: string;
}

export function StatCard({ value, label, color, icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-atlas-surface2 border border-atlas-border rounded-xl p-4 text-center",
        className
      )}
    >
      {icon && <div className="text-2xl mb-2">{icon}</div>}
      <div className="text-2xl font-semibold leading-none mb-1.5" style={{ color: color || "var(--atlas-text)" }}>
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-wider text-atlas-muted">
        {label}
      </div>
    </div>
  );
}

