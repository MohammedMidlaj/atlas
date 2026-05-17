"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/map", label: "Map" },
  { href: "/memories", label: "Memories" },
  { href: "/wishlist", label: "Wishlist" },
  { href: "/stats", label: "Stats" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition whitespace-nowrap",
        active
          ? "text-atlas-text bg-atlas-surface2 border border-atlas-border2"
          : "text-atlas-muted hover:text-atlas-text hover:bg-atlas-surface border border-transparent hover:border-atlas-border"
      )}
    >
      <span className="relative">
        {label}
        {active && (
          <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-atlas-accent/0 via-atlas-accent/70 to-atlas-accent/0" />
        )}
      </span>
    </Link>
  );
}

type Theme = "dark" | "light";

export function AppShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const storedTheme = window.localStorage.getItem("atlas-theme") as Theme | null;
    const initialTheme =
      storedTheme ??
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("atlas-theme", nextTheme);
  }

  return (
    <div className="min-h-screen atlas-noise">
      <header className="sticky top-0 z-50">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 pt-5">
          <div className="atlas-glass rounded-2xl overflow-hidden">
            <div className="px-4 sm:px-5 py-3 border-b border-atlas-border flex items-center justify-between gap-4">
              <Link href="/" className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-atlas-accent/25 via-atlas-accent2/15 to-atlas-accent/5 border border-atlas-border2 shadow-[0_0_40px_rgba(var(--atlas-glow)/0.18)]" />
                <div className="leading-tight">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-atlas-subtle">
                    Atlas
                  </p>
                  <p className="text-sm font-semibold text-atlas-text tracking-tight">
                    Travel Journal
                  </p>
                </div>
              </Link>

              <nav className="hidden md:flex items-center gap-2">
                {navItems.map((item) => (
                  <NavLink key={item.href} href={item.href} label={item.label} />
                ))}
              </nav>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  className="inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm text-atlas-muted hover:text-atlas-text hover:bg-atlas-surface border border-transparent hover:border-atlas-border transition"
                >
                  {theme === "dark" ? "Light mode" : "Dark mode"}
                </button>
                <Link
                  href="/profile/atlas"
                  className="hidden sm:flex items-center justify-between rounded-xl px-3 py-2 text-sm text-atlas-muted hover:text-atlas-text hover:bg-atlas-surface border border-transparent hover:border-atlas-border transition"
                >
                  <span>Public preview</span>
                </Link>
              </div>
            </div>

            {/* Mobile nav (horizontal scroll) */}
            <nav className="md:hidden px-3 py-3 flex gap-2 overflow-x-auto">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href} label={item.label} />
              ))}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="shrink-0 flex items-center justify-center rounded-xl px-3 py-2 text-sm text-atlas-muted hover:text-atlas-text hover:bg-atlas-surface border border-transparent hover:border-atlas-border transition whitespace-nowrap"
              >
                {theme === "dark" ? "Light" : "Dark"}
              </button>
              <Link
                href="/profile/atlas"
                className="shrink-0 flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-atlas-muted hover:text-atlas-text hover:bg-atlas-surface border border-transparent hover:border-atlas-border transition whitespace-nowrap"
              >
                Public preview
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 py-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

