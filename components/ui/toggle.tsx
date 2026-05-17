"use client";

interface ToggleProps {
  checked: boolean;
  onChange: (v: boolean) => void;
  accentColor?: string;
}

export function Toggle({
  checked,
  onChange,
  accentColor = "var(--atlas-accent)",
}: ToggleProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative w-10 h-6 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-atlas-accent"
      style={{
        background: checked ? accentColor : "var(--atlas-surface3)",
        border: `1px solid ${checked ? accentColor : "var(--atlas-border2)"}`,
      }}
    >
      <span
        className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300"
        style={{ left: checked ? "calc(100% - 1.35rem)" : "2px" }}
      />
    </button>
  );
}

