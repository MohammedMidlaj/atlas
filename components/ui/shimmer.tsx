import { cn } from "@/lib/utils/cn";

interface ShimmerProps {
  className?: string;
  rounded?: string;
}

export function Shimmer({ className, rounded = "rounded-lg" }: ShimmerProps) {
  return <div className={cn("shimmer", rounded, className)} />;
}

