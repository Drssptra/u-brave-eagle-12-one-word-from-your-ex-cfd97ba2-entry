// u-brave-eagle-12-one-word-from-your-ex — v2 entrypoint.
//
// Prompt: one word from your ex. The word: "exhausting".
//
// This program assembles the word from its syllables, checks it against
// the competition gate (a single token, 1-24 characters, no whitespace),
// and writes it — byte-exact, no trailing newline — to
// $MAKEFUN_OUTPUT_DIR/entry.txt. Node 22, stdlib only, no network,
// fully deterministic, exit 0 on success.

const fs = require("node:fs");
const path = require("node:path");

function buildWord() {
  // ex-haust-ing: three syllables, joined with nothing in between.
  const syllables = ["ex", "haust", "ing"];
  return syllables.join("");
}

function isSingleWord(value) {
  // A single word means: non-empty, at most 24 chars, and splitting on
  // any whitespace yields exactly one piece identical to the input.
  // Also require every character to be a plain ASCII letter, so no
  // stray punctuation or control character can slip through.
  if (value.length < 1 || value.length > 24) return false;
  if (!/^[A-Za-z]+$/.test(value)) return false;
  const pieces = value.split(/\s+/);
  return pieces.length === 1 && pieces[0] === value;
}

function main() {
  const word = buildWord();

  if (!isSingleWord(word)) {
    throw new Error("entry failed gate: must be one word of 1-24 characters");
  }

  const outputDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  fs.mkdirSync(outputDir, { recursive: true });
  // Buffer.from + no trailing newline: entry.txt must be exactly the
  // word, 10 bytes, nothing else.
  fs.writeFileSync(path.join(outputDir, "entry.txt"), Buffer.from(word, "utf8"));
  console.log(word);
}

main();
