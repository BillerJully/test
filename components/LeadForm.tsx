"use client";

import { createContext, useContext, useEffect, useState, type FormEvent, type ReactNode } from "react";
import type { Dict } from "@/lib/content";

const MAX_TASK = 4000;

const LeadFormContext = createContext<() => void>(() => {});

export function LeadFormProvider({ t, children }: { t: Dict["form"]; children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <LeadFormContext.Provider value={() => setOpen(true)}>
      {children}
      {open && <LeadFormModal t={t} onClose={() => setOpen(false)} />}
    </LeadFormContext.Provider>
  );
}

export function OpenLeadForm({ className, children }: { className: string; children: ReactNode }) {
  const openForm = useContext(LeadFormContext);
  return (
    <button type="button" className={className} onClick={openForm}>
      {children}
    </button>
  );
}

function LeadFormModal({ t, onClose }: { t: Dict["form"]; onClose: () => void }) {
  const [task, setTask] = useState("");
  const [website, setWebsite] = useState("");
  const [tried, setTried] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const empty = !task.trim();

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (sending) return;
    if (empty) {
      setTried(true);
      return;
    }
    setSending(true);
    setSendError("");
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ task, website }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setSent(true);
    } catch {
      setSendError(t.failed);
    } finally {
      setSending(false);
    }
  }

  const error = tried && empty ? t.empty : sendError;

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close" aria-label={t.close} onClick={onClose}>
          ×
        </button>

        {sent ? (
          <div className="sent">
            <span className="sent-icon">✓</span>
            <h2 id="lead-title" className="modal-title">
              {t.sentTitle}
            </h2>
            <span className="sent-text">{t.sentText}</span>
            <button type="button" className="btn-secondary" onClick={onClose}>
              {t.close}
            </button>
          </div>
        ) : (
          <form className="lead-form" onSubmit={submit} noValidate>
            <div className="modal-head">
              <h2 id="lead-title" className="modal-title">
                {t.title}
              </h2>
              <p className="modal-text">{t.text}</p>
            </div>

            <div className="fields">
              <label className="field">
                <span>{t.task}</span>
                <textarea
                  name="task"
                  rows={5}
                  placeholder={t.placeholder}
                  maxLength={MAX_TASK}
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  aria-invalid={tried && empty}
                  autoFocus
                />
              </label>
              <label className="hp" aria-hidden="true">
                {t.website}
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </label>
            </div>

            {error && (
              <span className="form-error" role="alert">
                {error}
              </span>
            )}

            <button type="submit" className="btn-primary submit" disabled={sending}>
              {sending ? t.sending : t.send}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
