// Prints saved leads: docker compose exec web node leads.mjs [N]
// N — show only the last N leads.
import { readFileSync } from "node:fs";
import path from "node:path";

const file = path.join(process.env.LEADS_DIR || path.join(process.cwd(), "data"), "leads.jsonl");

let lines;
try {
  lines = readFileSync(file, "utf8").split("\n").filter(Boolean);
} catch (err) {
  if (err.code !== "ENOENT") throw err;
  lines = [];
}

const limit = Number(process.argv[2]) || 0;
const leads = lines.map((l) => JSON.parse(l)).slice(-limit || undefined);

if (leads.length === 0) {
  console.log("Заявок пока нет.");
  process.exit(0);
}

for (const lead of leads) {
  const date = new Date(lead.created_at).toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
  console.log(`id ${lead.id}  ·  ${date} МСК`);
  console.log(`text ${lead.text}`);
  console.log("");
}
console.log(`Всего: ${lines.length}`);
