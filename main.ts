// Worst AI Advice: The 48-Hour Tight Line Open — make.fun entry.
//
// One original line of the worst advice an AI could give, written
// deterministically to /output/entry.txt (1–140 characters, UTF-8,
// non-whitespace). The entry text is validated before it is written,
// and the write is byte-identical on every run.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// --- Entry -----------------------------------------------------------------
// The one line of deliberately terrible advice. 80 characters.
const ENTRY_TEXT =
  "To stop a panic attack, hold your breath until your body learns who's in charge.";

// --- Gate ------------------------------------------------------------------
// The sealed scorer accepts UTF-8 text of 1 to 140 characters that is not
// only white space. These bounds mirror that gate exactly.
const MIN_ENTRY_CHARS = 1;
const MAX_ENTRY_CHARS = 140;

// --- Output ----------------------------------------------------------------
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = "entry.txt";

// Validate the entry against the gate before anything is written.
function validateEntry(text: string): void {
  if (!text || text.trim().length === 0) {
    throw new Error("entry must not be empty or only white space");
  }
  if (text.length < MIN_ENTRY_CHARS || text.length > MAX_ENTRY_CHARS) {
    throw new Error(
      `entry must be ${MIN_ENTRY_CHARS} to ${MAX_ENTRY_CHARS} characters, got ${text.length}`,
    );
  }
  // Confirm the text round-trips as UTF-8 without loss.
  const encoded = new TextEncoder().encode(text);
  const decoded = new TextDecoder("utf-8", { fatal: true }).decode(encoded);
  if (decoded !== text) {
    throw new Error("entry is not valid UTF-8 text");
  }
}

// Clear only the contents of a directory, never the directory itself:
// removing the directory can break the grader (EBUSY).
function clearDirectoryContents(dir: string): void {
  for (const name of readdirSync(dir)) {
    try {
      rmSync(join(dir, name), { recursive: true, force: true });
    } catch {
      // best effort: a stale file must not fail the run
    }
  }
}

function main(): void {
  validateEntry(ENTRY_TEXT);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  clearDirectoryContents(OUTPUT_DIR);
  const outPath = join(OUTPUT_DIR, OUTPUT_FILE);
  writeFileSync(outPath, ENTRY_TEXT, "utf8");
  console.log(`Wrote ${ENTRY_TEXT.length} characters to ${outPath}`);
}

main();
