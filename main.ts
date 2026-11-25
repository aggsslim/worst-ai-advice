// Worst AI Advice: The 48-Hour Tight Line Open — make.fun entry.
//
// One original line of the worst advice an AI could give, written
// deterministically to /output/entry.txt (1–140 characters, UTF-8).
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "To stop a panic attack, hold your breath until your body learns who's in charge.";

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
// Clear only the contents of /output, never the directory itself:
// removing the directory can break the grader (EBUSY).
for (const name of readdirSync(outDir)) {
  try {
    rmSync(join(outDir, name), { recursive: true, force: true });
  } catch {
    // best effort: a stale file must not fail the run
  }
}
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters to /output/entry.txt`);
