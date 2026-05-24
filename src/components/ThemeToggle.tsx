"use client";

import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="theme-toggle group relative flex h-9 w-[4.25rem] shrink-0 items-center rounded-full border border-[var(--border)] bg-[var(--card)] p-1 shadow-sm transition hover:border-[var(--accent)]/40"
    >
      <span
        className={`absolute inset-1 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/10 transition-opacity duration-300 ${
          isDark ? "opacity-100" : "opacity-0"
        }`}
      />
      <span
        className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-sm shadow-md shadow-orange-500/30 transition-transform duration-300 ease-out ${
          isDark ? "translate-x-0" : "translate-x-[1.85rem]"
        }`}
      >
        {isDark ? "☾" : "☀"}
      </span>
      <span className="pointer-events-none absolute left-2.5 text-[10px] text-[var(--muted)] opacity-60">
        ☀
      </span>
      <span className="pointer-events-none absolute right-2.5 text-[10px] text-[var(--muted)] opacity-60">
        ☾
      </span>
    </button>
  );
}
