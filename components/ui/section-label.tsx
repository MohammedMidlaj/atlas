import { cn } from "@/lib/utils/cn";

export function SectionLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-[10px] font-medium uppercase tracking-[0.8px] text-atlas-muted",
        className
      )}
    >
      {children}
    </p>
  );
}

