"use client";

import { useEffect, useState } from "react";
import type { Dict } from "@/lib/content";

const TICKS = 16;
const TICK_MS = 650;

export default function LabelConsole({ t }: { t: Dict["console"] }) {
  const [c, setC] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setC((n) => (n + 1) % TICKS), TICK_MS);
    return () => clearInterval(timer);
  }, []);

  let done = 0;
  let review = 0;

  const rows = t.rows.map((r, i) => {
    const state = c < 2 * i + 1 ? "queued" : c === 2 * i + 1 ? "pending" : "done";
    if (state === "done") {
      done++;
      if (r.review) review++;
    }
    const chip = state !== "done" ? "chip-hidden" : r.review ? "chip-review" : "chip-done";
    const status =
      state === "queued" ? t.queued : state === "pending" ? t.pending : r.review ? t.toHuman : r.conf;
    const statusClass =
      state === "queued" ? "st-queued" : state === "pending" ? "st-pending" : r.review ? "st-review" : "st-done";

    return (
      <div key={i} className={state === "pending" ? "row active" : "row"}>
        <span className="row-num">{String(i + 1).padStart(2, "0")}</span>
        <span className="row-text">{r.text}</span>
        <div className="row-tail">
          <span className={`row-chip ${chip}`}>{r.label}</span>
          <span className={`row-status ${statusClass}`}>{status}</span>
        </div>
      </div>
    );
  });

  return (
    <div className="console">
      <div className="console-head">
        <span>{t.file}</span>
        <span>LLM + BERT</span>
      </div>
      <div className="console-rows">{rows}</div>
      <div className="console-foot">
        <div className="progress">
          <div style={{ width: `${done * 20}%` }} />
        </div>
        <div className="progress-labels">
          <span>
            {t.done} {done}/5
          </span>
          <span className="amb">{review ? `${t.inReview} ${review}` : ""}</span>
        </div>
      </div>
    </div>
  );
}
