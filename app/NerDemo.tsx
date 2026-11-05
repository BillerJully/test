"use client";

import { useEffect, useState, type CSSProperties } from "react";

const ENTITIES = [
  { text: "Иван Иванов", tag: "PER", color: "#9db8e8", bg: "rgba(59,110,165,.22)", bd: "#3b6ea5" },
  { text: "Аннотики", tag: "ORG", color: "#6fc7a3", bg: "rgba(58,154,118,.2)", bd: "#3a9a76" },
  { text: "Казань", tag: "LOC", color: "#e0b26a", bg: "rgba(176,122,42,.22)", bd: "#b07a2a" },
  { text: "12 мая", tag: "DATE", color: "#c9a6ec", bg: "rgba(130,80,176,.24)", bd: "#8250b0" },
];

// 0 — model reading, 1..4 — entities appear one by one, 5..7 — all found, 8 — reset
const PHASES = 9;
const TICK_MS = 700;

function Entity({ index, step }: { index: number; step: number }) {
  const e = ENTITIES[index];
  const on = step >= index + 1 && step < 8;
  const style = on ? ({ background: e.bg, borderBottomColor: e.bd } as CSSProperties) : undefined;
  return (
    <span className={on ? "ent on" : "ent"} style={style}>
      {e.text}{" "}
      <span className="ent-tag" style={{ color: e.color }}>
        {e.tag}
      </span>
    </span>
  );
}

export default function NerDemo() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setStep((n) => (n + 1) % PHASES), TICK_MS);
    return () => clearInterval(timer);
  }, []);

  const status =
    step === 0 || step === 8
      ? "МОДЕЛЬ ЧИТАЕТ…"
      : step < 4
        ? `НАЙДЕНО ${step}/4`
        : "ГОТОВО · 4/4";

  return (
    <div className="card">
      <div className="demo">
        <span className="ner-text">
          <Entity index={0} step={step} /> из <Entity index={1} step={step} /> прилетит в{" "}
          <Entity index={2} step={step} /> <Entity index={3} step={step} />
        </span>
      </div>
      <div className="card-caption">
        <div className="title-row">
          <span className="card-title">Сущности</span>
          <span className="ner-status">{status}</span>
        </div>
        <span className="card-text">Выделение фрагментов текста: имена, компании, места, даты.</span>
      </div>
    </div>
  );
}
