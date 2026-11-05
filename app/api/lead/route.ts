import { NextResponse, type NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const MAX_TASK = 4000;

// Simple per-IP limiter: enough to stop a spam burst on a single instance.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 10_000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function sendToTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (process.env.TELEGRAM_CHAT_ID ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!token || chatIds.length === 0) throw new Error("TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID are not set");

  const api = process.env.TELEGRAM_API_URL || "https://api.telegram.org";
  const results = await Promise.all(
    chatIds.map(async (chatId) => {
      const r = await fetch(`${api}/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML", link_preview_options: { is_disabled: true } }),
        signal: AbortSignal.timeout(10_000),
      });
      if (!r.ok) console.error(`[lead] Telegram ${chatId}: ${r.status} ${await r.text()}`);
      return r.ok;
    }),
  );
  if (!results.some(Boolean)) throw new Error("Telegram rejected the message");
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  // Honeypot: real users never fill the hidden field. Pretend success to bots.
  if (typeof body.website === "string" && body.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const task = typeof body.task === "string" ? body.task.trim().slice(0, MAX_TASK) : "";
  if (!task) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 422 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const time = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
  const text = [
    "<b>Новая заявка с annotica.ru</b>",
    "",
    `<b>Задача:</b> ${escapeHtml(task)}`,
    "",
    `<i>${time} МСК</i>`,
  ].join("\n");

  try {
    await sendToTelegram(text);
  } catch (err) {
    console.error("[lead] failed to deliver:", err, JSON.stringify({ task }));
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
