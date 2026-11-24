// One Word From Your Ex — make.fun program/v1 entrypoint (Node 22, stdlib only).
//
// The entry is exactly one word, the word my ex would use to describe me:
// "avoidant". It writes that word — and nothing else, no trailing newline —
// to $MAKEFUN_OUTPUT_DIR/entry.txt (default /output/entry.txt), and prints
// the same word plus a trailing newline to stdout. Deterministic, exit 0.
//
// Run it locally the way the grader does:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

const { mkdirSync, writeFileSync } = require("node:fs");
const { join } = require("node:path");

// The one word my ex would use to describe me.
const word = "avoidant";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), word);
process.stdout.write(word + "\n");
