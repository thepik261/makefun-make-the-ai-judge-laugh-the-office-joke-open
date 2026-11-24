// Make the AI Judge Laugh: the Office Joke Open — make.fun entry.
//
// Writes one line of office comedy (1-200 characters) to
// <OUTPUT_DIR>/entry.txt (default /output/entry.txt): a calendar that
// declines a meeting, then schedules a meeting about the decline.
// Pure Node standard library; deterministic; no network, no input.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My calendar just declined a meeting for me, then booked a meeting to explain why it declined the meeting.";

const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`line must be 1-200 characters, got ${chars}`);
}
if (LINE.trim().length === 0) {
  throw new Error("line must not be only whitespace");
}
if (LINE.includes("\n")) {
  throw new Error("line must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = `${outDir}/entry.txt`;
writeFileSync(outPath, LINE, "utf8");
// The sandbox collects the outputs as another user than the one this
// program runs as, so leave the file readable by every user.
// Never chmod the output directory itself; only the file we created.
try {
  chmodSync(outPath, 0o644);
} catch {
  // Best effort: the file is already mode 0644 under a normal umask.
}

// Read back what was written: the gate rejects anything that is not
// UTF-8 text of 1-200 characters, so fail loudly here instead.
const written = readFileSync(outPath, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the line");
}
console.log(`wrote ${chars} characters to ${outPath}`);
