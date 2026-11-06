"use client";

import { useEffect } from "react";

// Sections below the fold fade in on scroll, and their charts draw in. Without
// JS or with reduced motion nothing gets hidden, so all content stays visible.
export default function Reveal() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.state = "shown";
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );

    document.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
      if (el.getBoundingClientRect().top < innerHeight * 0.9) return;
      for (const selector of ["[data-grow]", "[data-pop]"]) {
        el.querySelectorAll<HTMLElement>(selector).forEach((child, i) => child.style.setProperty("--i", String(i)));
      }
      el.dataset.state = "hidden";
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
