import { NextResponse, type NextRequest } from "next/server";
import { saveLead } from "@/lib/leads";

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

  try {
    const lead = await saveLead(task);
    console.log(`[lead] saved #${lead.id}`);
  } catch (err) {
    console.error("[lead] failed to save:", err, JSON.stringify({ task }));
    return NextResponse.json({ ok: false, error: "save_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
