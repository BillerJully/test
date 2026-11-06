"use client";

import { useEffect, useState } from "react";

const EN = "ANNOTICA";
const RU = "АННОТИКА";
const SWITCH_MS = 3200;

// Flips letter by letter between the Latin and Cyrillic spelling.
export default function Wordmark({ className }: { className: string }) {
  const [ru, setRu] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setRu((v) => !v), SWITCH_MS);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className={`wm ${className}`} role="img" aria-label={EN}>
      {[...EN].map((letter, k) => (
        <span key={k} className="wm-cell" aria-hidden="true">
          <span
            className="wm-roll"
            style={{
              transform: `translateY(${ru ? "-50%" : "0%"})`,
              transitionDelay: `${(ru ? k : 7 - k) * 0.05}s`,
            }}
          >
            <span>{letter}</span>
            <span>{RU[k]}</span>
          </span>
        </span>
      ))}
    </span>
  );
}
