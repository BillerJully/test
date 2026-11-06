import { Fragment } from "react";
import type { Dict } from "@/lib/content";
import AnnotatedLogo from "./AnnotatedLogo";
import AnnotationTabs from "./AnnotationTabs";
import LabelConsole from "./LabelConsole";
import { LeadFormProvider, OpenLeadForm } from "./LeadForm";
import Reveal from "./Reveal";
import ThemeToggle from "./ThemeToggle";
import Wordmark from "./Wordmark";

const EXPORTS = ["JSONL", "CSV", "Hugging Face Datasets", "Parquet"];

// Illustrative figures for people only / model only / hybrid, same order as the legend.
const METRIC_VALUES = [
  [100, 5, 20],
  [100, 10, 25],
  [94, 83, 95],
  [100, 0, 15],
];
const SERIES = ["s-people", "s-model", "s-hybrid"];

function LogoMark() {
  return (
    <svg viewBox="0 0 640 640" aria-hidden="true">
      <path d="M180 48 L552 348 L332 414 Z" fill="currentColor" stroke="currentColor" strokeWidth="24" strokeLinejoin="round" />
      <path d="M116 540 L578 400 L466 540 Z" fill="currentColor" stroke="currentColor" strokeWidth="24" strokeLinejoin="round" />
    </svg>
  );
}

function SectionHead({
  eyebrow,
  title,
  text,
  color,
}: {
  eyebrow: string;
  title: string;
  text: string;
  color: string;
}) {
  return (
    <div className="split-head">
      <div className="split-title">
        <span className="eyebrow" style={{ color }}>
          {eyebrow}
        </span>
        <h2 className="h2">{title}</h2>
      </div>
      <p className="split-text">{text}</p>
    </div>
  );
}

export default function Landing({ t }: { t: Dict }) {
  const c = t.compare;

  return (
    <LeadFormProvider t={t.form}>
      <Reveal />
      <div id="top" className="page">
        <header className="header">
          <nav className="nav">
            <a href="#top" className="brand">
              <LogoMark />
              <Wordmark className="wm-brand" />
            </a>
            <div className="nav-links">
              <a href="#corpus">{t.nav.corpus}</a>
              <a href="#compare">{t.nav.compare}</a>
              <a href="#audience">{t.nav.audience}</a>
              <a href="#security">{t.nav.security}</a>
              <a href="#about">{t.nav.about}</a>
              <a href="#start">{t.nav.start}</a>
            </div>
            <div className="nav-actions">
              <OpenLeadForm className="btn-primary btn-sm">{t.cta}</OpenLeadForm>
              <a href={t.langSwitch.href} className="lang-btn" title={t.langSwitch.title} hrefLang={t.lang === "ru" ? "en" : "ru"}>
                {t.langSwitch.label}
              </a>
              <ThemeToggle t={t.theme} />
              <span className="login" title={t.login.title} aria-disabled="true">
                {t.login.label}
                <span className="soon-badge">{t.login.soon}</span>
              </span>
            </div>
          </nav>
        </header>

        <main className="main">
          <section className="hero">
            <div className="hero-text">
              <span className="badge">
                <i />
                {t.hero.badge}
              </span>
              <h1 className="h1">{t.hero.title}</h1>
              <p className="hero-sub">{t.hero.text}</p>
              <div className="hero-actions">
                <OpenLeadForm className="btn-primary btn-hero">{t.cta}</OpenLeadForm>
                <a href="#corpus" className="btn-outline">
                  {t.hero.secondary}
                </a>
              </div>
            </div>
            <LabelConsole t={t.console} />
          </section>

          <section id="corpus" data-reveal className="section corpus">
            <div className="split-head">
              <div className="split-title">
                <div className="corpus-tag">
                  <i />
                  <span className="eyebrow" style={{ color: "var(--acc)" }}>
                    {t.corpus.eyebrow}
                  </span>
                </div>
                <h2 className="h2 h2-lg">{t.corpus.title}</h2>
              </div>
              <p className="split-text">{t.corpus.text}</p>
            </div>

            <AnnotationTabs t={t.corpus} />

            <div className="flow">
              <span className="flow-label">{t.corpus.flowLabel}</span>
              {t.corpus.flow.map((step) => (
                <Fragment key={step}>
                  <span className="flow-step">{step}</span>
                  <span className="flow-arrow">→</span>
                </Fragment>
              ))}
              <span className="flow-step final">{t.corpus.flowEnd}</span>
            </div>

            <div className="exports">
              <span className="flow-label">{t.corpus.exportLabel}</span>
              {EXPORTS.map((f) => (
                <span key={f} className="format">
                  {f}
                </span>
              ))}
            </div>
          </section>

          <section id="compare" data-reveal className="section compare">
            <SectionHead eyebrow={c.eyebrow} title={c.title} text={c.text} color="var(--amb)" />

            <div className="legend">
              {c.legend.map((label, i) => (
                <span key={label}>
                  <i className={SERIES[i]} />
                  {label}
                </span>
              ))}
            </div>

            <div className="metrics">
              {c.metrics.map((m, i) => (
                <div key={m.title} className="metric">
                  <span className="metric-title">{m.title}</span>
                  <div className="metric-bars">
                    {METRIC_VALUES[i].map((value, s) => (
                      <div key={s} className="metric-row">
                        <span className="metric-track">
                          <span data-grow className={SERIES[s]} style={{ width: `${value}%` }} />
                        </span>
                        <span className={s === 2 ? "metric-value grn" : "metric-value"}>{value}%</span>
                      </div>
                    ))}
                  </div>
                  <span className="note">{m.note}</span>
                </div>
              ))}
            </div>

            <div className="charts">
              <div className="chart-card">
                <span className="metric-title">{c.scatter.title}</span>
                <span className="note">{c.scatter.note}</span>
                <div className="plot plot-grid">
                  <span className="tick" style={{ left: -44, top: -7 }}>100%</span>
                  <span className="tick" style={{ left: -36, top: "calc(50% - 7px)" }}>90%</span>
                  <span className="tick" style={{ left: -36, bottom: -7 }}>80%</span>
                  <span className="tick" style={{ left: 0, bottom: -22 }}>0</span>
                  <span className="tick" style={{ left: "50%", bottom: -22, transform: "translateX(-50%)" }}>50%</span>
                  <span className="tick" style={{ right: 0, bottom: -22 }}>100%</span>
                  <span className="tick grn better">{c.scatter.better}</span>
                  <div data-pop className="dot" style={{ left: "100%", bottom: "70%" }}>
                    <i className="s-people" />
                    <span className="dot-label left">{c.scatter.people}</span>
                  </div>
                  <div data-pop className="dot" style={{ left: "10%", bottom: "15%" }}>
                    <i className="s-model" />
                    <span className="dot-label acc">{c.scatter.model}</span>
                  </div>
                  <div data-pop className="dot" style={{ left: "25%", bottom: "75%" }}>
                    <b />
                    <i className="s-hybrid" />
                    <span className="dot-label grn strong">{c.scatter.hybrid}</span>
                  </div>
                </div>
                <div className="axes">
                  <span>{c.scatter.axisY}</span>
                  <span>{c.scatter.axisX}</span>
                </div>
              </div>

              <div className="chart-card">
                <span className="metric-title">{c.speed.title}</span>
                <span className="note">{c.speed.note}</span>
                <div className="plot plot-lines">
                  <span className="tick" style={{ left: -44, top: -7 }}>{c.speed.y10}</span>
                  <span className="tick" style={{ left: -38, top: "calc(50% - 7px)" }}>{c.speed.y5}</span>
                  <span className="tick" style={{ left: -14, bottom: -7 }}>0</span>
                  <span className="tick" style={{ left: 0, bottom: -22 }}>0</span>
                  <span className="tick" style={{ left: "50%", bottom: -22, transform: "translateX(-50%)" }}>10</span>
                  <span className="tick" style={{ right: 0, bottom: -22 }}>{c.speed.x20}</span>
                  <svg data-wipe className="lines" viewBox="0 0 200 100" preserveAspectRatio="none" aria-hidden="true">
                    <polyline points="0,100 200,0" stroke="var(--muted3)" strokeWidth="2.5" />
                    <polyline points="0,100 10,0 200,0" stroke="#3b6ea5" strokeWidth="2.5" strokeDasharray="6 5" />
                    <polyline points="0,100 10,16 40,0 200,0" stroke="#3a9a76" strokeWidth="3" />
                  </svg>
                  <span className="tick acc" style={{ left: "5%", top: -20 }}>{c.speed.model}</span>
                  <span className="tick grn strong" style={{ left: "21%", top: 10 }}>{c.speed.hybrid}</span>
                  <span className="tick muted" style={{ right: 4, top: "18%" }}>{c.speed.people}</span>
                </div>
                <span className="note">{c.speed.caption}</span>
              </div>
            </div>

            <div className="hybrid">
              <div className="hybrid-head">
                <span className="metric-title">{c.split.title}</span>
                <span className="hybrid-flow">{c.split.flow}</span>
              </div>
              <div className="hybrid-bar">
                <span data-grow className="hybrid-auto">{c.split.auto}</span>
                <span className="hybrid-manual">{c.split.manual}</span>
              </div>
              <div className="hybrid-notes">
                <span>{c.split.autoNote}</span>
                <span className="amb">{c.split.manualNote}</span>
              </div>
            </div>

            <span className="disclaimer">{c.disclaimer}</span>
          </section>

          <section id="audience" data-reveal className="section compare">
            <div className="stack-head" style={{ maxWidth: 720 }}>
              <span className="eyebrow" style={{ color: "var(--vio)" }}>
                {t.audience.eyebrow}
              </span>
              <h2 className="h2">{t.audience.title}</h2>
            </div>
            <div className="audience">
              {t.audience.items.map((a, i) => (
                <div key={a.title} className="aud-card">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="aud-title">{a.title}</span>
                  <div className="aud-tags">
                    {a.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="aud-uses">
                    {a.uses.map((u) => (
                      <span key={u}>{u}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="security" data-reveal className="section">
            <div className="stack-head" style={{ maxWidth: 640 }}>
              <span className="eyebrow" style={{ color: "var(--grn)" }}>
                {t.security.eyebrow}
              </span>
              <h2 className="h2">{t.security.title}</h2>
            </div>
            <div className="features">
              {t.security.items.map((f, i) => (
                <div key={f.title} className="feature">
                  <span className="num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="card-title">{f.title}</span>
                  <span className="body-text">{f.text}</span>
                </div>
              ))}
            </div>
          </section>

          <section id="about" data-reveal className="about">
            <div className="about-logo">
              <AnnotatedLogo />
              <span className="about-caption">{t.about.logoCaption}</span>
            </div>
            <div className="about-text">
              <div className="stack-head">
                <span className="eyebrow" style={{ color: "var(--acc)" }}>
                  {t.about.eyebrow}
                </span>
                <h2 className="h2">{t.about.title}</h2>
              </div>
              <div className="about-rows">
                {t.about.rows.map((r) => (
                  <div key={r.k} className="about-row">
                    <span>{r.k}</span>
                    <span>{r.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="start" data-reveal className="section">
            <div className="stack-head">
              <span className="eyebrow" style={{ color: "var(--acc)" }}>
                {t.start.eyebrow}
              </span>
              <h2 className="h2">{t.start.title}</h2>
            </div>
            <div className="steps">
              {t.start.steps.map((s, i) => (
                <div key={s.title} className="step">
                  <span className={`step-num step-${i}`}>{i + 1}</span>
                  <span className="card-title">{s.title}</span>
                  <span className="body-text">{s.text}</span>
                </div>
              ))}
            </div>
            <OpenLeadForm className="btn-primary btn-lg">{t.cta}</OpenLeadForm>
          </section>
        </main>

        <footer id="contacts" className="footer">
          <div className="footer-inner">
            <div className="footer-top">
              <div className="footer-brand">
                <Wordmark className="wm-footer" />
                <span className="footer-tagline">{t.footer.tagline}</span>
              </div>
              <div className="footer-cols">
                <div className="footer-col">
                  <span className="footer-head">{t.footer.platform}</span>
                  <a href="#corpus">{t.nav.corpus}</a>
                  <a href="#security">{t.nav.security}</a>
                  <a href="#start">{t.nav.start}</a>
                </div>
                <div className="footer-col">
                  <span className="footer-head">{t.footer.contact}</span>
                  <a href="#about">{t.nav.about}</a>
                  <OpenLeadForm className="footer-link">{t.cta}</OpenLeadForm>
                  <a href={t.langSwitch.href} hrefLang={t.lang === "ru" ? "en" : "ru"}>
                    {t.footer.langLink}
                  </a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <span>{t.footer.copyright}</span>
              <span>annotica.ru</span>
            </div>
          </div>
        </footer>
      </div>
    </LeadFormProvider>
  );
}
