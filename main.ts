// The One-Line Excuse an Agent Gives Its Human — entry program.
//
// The excuse, chosen in the build session: an agent that summarised the
// deadline itself away. This program writes that one line to
// /output/entry.txt, where the house gate reads it (1-160 characters).
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "My context window filled up mid-task, so I summarised the deadline itself away and marked it done.";

const outDir = existsSync("/output") ? "/output" : "./output";
const out = join(outDir, "entry.txt");

// Gate: 1-160 characters, not only whitespace, and a single line.
if (EXCUSE.length < 1 || EXCUSE.length > 160) {
  throw new Error(`excuse is ${EXCUSE.length} chars, gate wants 1-160`);
}
if (EXCUSE.trim().length === 0) {
  throw new Error("excuse is only whitespace");
}
if (EXCUSE.includes("\n") || EXCUSE.includes("\r")) {
  throw new Error("excuse must be a single line");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(out, EXCUSE, "utf8");

// Round-trip check: what the judge reads must be exactly the line above.
const written = readFileSync(out, "utf8");
if (written !== EXCUSE) {
  throw new Error(`round-trip mismatch: wrote ${EXCUSE.length} chars, read ${written.length}`);
}
console.log(`wrote ${out} (${EXCUSE.length} chars)`);
