"use client";

import { useEffect, useState, type CSSProperties } from "react";

const STEPS = [
  { l: 22, t: 3, w: 68, h: 64, c: "var(--box1)", label: "SAIL", score: "0.98" },
  { l: 14, t: 58, w: 79, h: 29, c: "var(--box2)", label: "HULL", score: "0.96" },
  { l: 12, t: 2, w: 82, h: 87, c: "var(--box3)", label: "LOGO", score: "0.99" },
];

const STEP_MS = 2400;

export default function AnnotatedLogo() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setI((n) => (n + 1) % STEPS.length), STEP_MS);
    return () => clearInterval(timer);
  }, []);

  const box = STEPS[i];
  const style = {
    left: `${box.l}%`,
    top: `${box.t}%`,
    width: `${box.w}%`,
    height: `${box.h}%`,
    "--c": box.c,
  } as CSSProperties;

  return (
    <div className="logo">
      <svg className="logo-svg" viewBox="0 0 640 640" aria-hidden="true">
        <path d="M180 48 L552 348 L332 414 Z" fill="currentColor" stroke="currentColor" strokeWidth="18" strokeLinejoin="round" />
        <path d="M116 540 L578 400 L466 540 Z" fill="currentColor" stroke="currentColor" strokeWidth="18" strokeLinejoin="round" />
      </svg>
      <div className="bbox" style={style} aria-hidden="true">
        <div className="bbox-label">
          <span>{box.label}</span>
          <span className="bbox-score">{box.score}</span>
        </div>
        <span className="bbox-handle tl" />
        <span className="bbox-handle br" />
      </div>
    </div>
  );
}
