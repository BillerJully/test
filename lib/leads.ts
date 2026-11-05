import { appendFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";

export type Lead = { id: number; created_at: string; text: string };

// One JSON object per line; the directory is a Docker volume in production.
const DATA_DIR = process.env.LEADS_DIR || path.join(process.cwd(), "data");
const LEADS_FILE = path.join(DATA_DIR, "leads.jsonl");

let lastId: number | null = null;
let queue: Promise<unknown> = Promise.resolve();

async function readLastId() {
  try {
    const lines = (await readFile(LEADS_FILE, "utf8")).trim().split("\n");
    return lines.reduce((max, line) => {
      try {
        return Math.max(max, Number(JSON.parse(line).id) || 0);
      } catch {
        return max;
      }
    }, 0);
  } catch (err) {
    if ((err as NodeJS.ErrnoException).code === "ENOENT") return 0;
    throw err;
  }
}

async function append(text: string): Promise<Lead> {
  await mkdir(DATA_DIR, { recursive: true });
  if (lastId === null) lastId = await readLastId();
  const lead: Lead = { id: lastId + 1, created_at: new Date().toISOString(), text };
  await appendFile(LEADS_FILE, JSON.stringify(lead) + "\n", "utf8");
  lastId = lead.id;
  return lead;
}

// Writes are serialized so concurrent requests never get the same id.
export function saveLead(text: string): Promise<Lead> {
  const next = queue.then(() => append(text));
  queue = next.catch(() => {});
  return next;
}
