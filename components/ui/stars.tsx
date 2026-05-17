interface StarsProps {
  rating: number;
  max?: number;
}

export function Stars({ rating, max = 5 }: StarsProps) {
  return (
    <span className="flex gap-0.5 items-center">
      {Array.from({ length: max }).map((_, i) => (
        <span
          key={i}
          className="text-xs"
          style={{ color: i < rating ? "var(--atlas-gold)" : "var(--atlas-border2)" }}
        >
          ★
        </span>
      ))}
    </span>
  );
}

