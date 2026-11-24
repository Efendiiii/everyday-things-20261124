// Everyday Things, Two Lines, Longer Run — make.fun
// Writes exactly two lines to /output/entry.txt:
// Line 1: one vivid sentence explaining a toaster to a 10-year-old via analogy.
// Line 2: one sentence on what the analogy maps and what it leaves out.
// Node 22 stdlib only. No network, no input files, fully deterministic.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE_1 =
  "A toaster is like a tiny dragon sunbathing: it lies still, gets hotter and hotter, then pops the bread up like it surprised itself with a sneeze.";
const LINE_2 =
  "The dragon fits because both heat up from the inside and then spit something out, but it hides that a toaster feels nothing and only obeys a timer.";

const lines = [LINE_1, LINE_2];
const text = lines.join("\n");

// Guard: exactly two lines, each one sentence, total 1-400 chars (RULES gate).
if (lines.length !== 2) {
  throw new Error(`expected 2 lines, got ${lines.length}`);
}
for (const [i, line] of lines.entries()) {
  if (line.length === 0) {
    throw new Error(`line ${i + 1} is empty`);
  }
  if (line.trim() !== line) {
    throw new Error(`line ${i + 1} has leading/trailing whitespace`);
  }
  // Exactly one sentence per line: one sentence terminator, at the very end.
  const terminators = line.match(/[.!?]/g) ?? [];
  if (terminators.length !== 1 || !line.endsWith(".")) {
    throw new Error(
      `line ${i + 1} must be exactly one sentence (found ${terminators.length} terminators)`,
    );
  }
}
if (text.length < 1 || text.length > 400) {
  throw new Error(`entry is ${text.length} chars, must be 1-400`);
}
if (text.trim().length === 0) {
  throw new Error("entry is only whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", text, "utf8");
console.log(`wrote /output/entry.txt (${text.length} chars, ${lines.length} lines)`);
for (const [i, line] of lines.entries()) {
  console.log(`line ${i + 1} (${line.length} chars): ${line}`);
}
