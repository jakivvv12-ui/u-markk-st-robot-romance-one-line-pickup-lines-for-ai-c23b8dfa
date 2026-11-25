// Entry for make.fun bounty: Robot Romance — One-Line Pickup Lines for AI.
// Writes a single pickup line (one line, 1-200 characters) to /output/entry.txt.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Are you overfitting? Because you've memorized every part of me and I don't want you to generalize.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

// Validate: 1-200 characters (counted as code points), non-blank, single line.
const length = [...LINE].length;
if (length < 1 || length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be blank");
}
if (LINE !== LINE.trim()) {
  throw new Error("entry must not have leading or trailing whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE, "utf8");

// Round-trip verification: what we wrote is exactly what is on disk.
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== LINE) {
  throw new Error("round-trip verification failed: entry.txt mismatch");
}
