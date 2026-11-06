"use client";

import { useEffect, useState } from "react";
import type { Dict } from "@/lib/content";

const THEME_KEY = "annotica-theme";

export default function ThemeToggle({ t }: { t: Dict["theme"] }) {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || "dark");
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage can be blocked; the theme still applies for this page view.
    }
    setTheme(next);
  }

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggle}
      aria-label={t.aria}
      title={theme === "light" ? t.toDark : t.toLight}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 4 A8 8 0 0 1 12 20 Z" fill="currentColor" />
      </svg>
    </button>
  );
}
