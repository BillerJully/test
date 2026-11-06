"use client";

import { useEffect, useState } from "react";
import type { Dict } from "@/lib/content";

type T = Dict["corpus"];

const TAB_MS = 5000;
const NER_PHASES = 9;
const NER_TICK_MS = 700;

const ENTITY_STYLES: Record<string, { bg: string; bd: string; color: string }> = {
  PER: { bg: "rgba(59,110,165,.22)", bd: "#3b6ea5", color: "var(--acc)" },
  ORG: { bg: "rgba(58,154,118,.2)", bd: "#3a9a76", color: "var(--grn)" },
  LOC: { bg: "rgba(176,122,42,.22)", bd: "#b07a2a", color: "var(--amb)" },
  DATE: { bg: "rgba(130,80,176,.24)", bd: "#8250b0", color: "var(--vio)" },
};

function Classification({ t }: { t: T }) {
  return (
    <div className="panel">
      <span className="panel-quote">{t.classification.quote}</span>
      <div className="panel-chips">
        {t.classification.labels.map((label, i) => (
          <span key={label} className={i === 0 ? "pchip on" : "pchip"}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function Entities({ t }: { t: T }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setN((v) => (v + 1) % NER_PHASES), NER_TICK_MS);
    return () => clearInterval(timer);
  }, []);

  let index = 0;
  const status =
    n === 0 || n === 8 ? t.ner.reading : n < 4 ? `${t.ner.found} ${n}/4` : `${t.ner.done} · 4/4`;

  return (
    <div className="panel">
      <span className="ner-text">
        {t.ner.parts.map((part, key) => {
          if (typeof part === "string") return part;
          const k = index++;
          const on = n >= k + 1 && n < 8;
          const s = ENTITY_STYLES[part.tag];
          return (
            <span
              key={key}
              className="ent"
              style={on ? { background: s.bg, borderBottomColor: s.bd } : undefined}
            >
              {part.ent}{" "}
              <span className="ent-tag" style={{ color: s.color, opacity: on ? 1 : 0 }}>
                {part.tag}
              </span>
            </span>
          );
        })}
      </span>
      <span className="mono-note">{status}</span>
    </div>
  );
}

function Sentiment({ t }: { t: T }) {
  return (
    <div className="panel">
      <span className="panel-quote">{t.sentiment.quote}</span>
      <div className="scale">
        <span />
        <span />
        <span className="on" />
        <span />
        <span />
      </div>
      <div className="scale-labels">
        <span>{t.sentiment.negative}</span>
        <span className="amb">{t.sentiment.mixed}</span>
        <span>{t.sentiment.positive}</span>
      </div>
      <div className="aspects">
        <span className="aspect good">{t.sentiment.good}</span>
        <span className="aspect bad">{t.sentiment.bad}</span>
      </div>
    </div>
  );
}

function Relation({ t }: { t: T }) {
  return (
    <div className="relation">
      <span className="node per">{t.relation.from}</span>
      <div className="edge">
        <span className="edge-label">{t.relation.edge}</span>
        <span className="arrow" />
      </div>
      <span className="node org">{t.relation.to}</span>
    </div>
  );
}

function Answers({ t }: { t: T }) {
  return (
    <div className="compare-answers">
      <div className="answer">
        <span className="answer-label">{t.answers.a}</span>
        <i />
        <i />
        <i style={{ width: "60%" }} />
      </div>
      <div className="answer best">
        <span className="answer-label">{t.answers.b}</span>
        <i />
        <i />
        <i style={{ width: "80%" }} />
      </div>
    </div>
  );
}

function Pipeline({ t }: { t: T }) {
  return (
    <div className="pipeline">
      <div className="pipe-row">
        <span className="who">LLM</span>
        <span className="pill">{t.pipeline.label}</span>
      </div>
      <div className="pipe-row">
        <span className="who">BERT</span>
        <span className="pill">{t.pipeline.label}</span>
      </div>
      <div className="pipe-row">
        <span className="who">{t.pipeline.human}</span>
        <span className="pill skip">{t.pipeline.notNeeded}</span>
        <span className="pipe-ok">2/2 ✓</span>
      </div>
    </div>
  );
}

const PANELS = [Classification, Entities, Sentiment, Relation, Answers, Pipeline];

export default function AnnotationTabs({ t }: { t: T }) {
  const [tab, setTab] = useState(0);
  const [manual, setManual] = useState(false);

  // Auto-rotation stops for good once the visitor picks a tab.
  useEffect(() => {
    if (manual) return;
    const timer = setInterval(() => setTab((v) => (v + 1) % PANELS.length), TAB_MS);
    return () => clearInterval(timer);
  }, [manual]);

  const Panel = PANELS[tab];

  return (
    <div className="tabs">
      <div className="tab-list">
        {t.types.map((type, k) => {
          const on = k === tab;
          return (
            <button
              key={type.n}
              type="button"
              className={on ? "tab on" : "tab"}
              aria-pressed={on}
              onClick={() => {
                setTab(k);
                setManual(true);
              }}
            >
              <span className="tab-head">
                <span className="tab-num">{String(k + 1).padStart(2, "0")}</span>
                <span className="tab-name">{type.n}</span>
              </span>
              {on && <span className="tab-desc">{type.d}</span>}
              {on && !manual && <span key={tab} className="tab-bar" />}
            </button>
          );
        })}
      </div>
      <div className="tab-panel">
        <div className="tab-panel-inner">
          <Panel t={t} />
        </div>
      </div>
    </div>
  );
}
