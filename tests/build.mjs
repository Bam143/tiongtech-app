// app.jsx -> app.js
// Settings are reverse-engineered from the committed app.js, not chosen: that file uses
// React.createElement (so the classic runtime, not automatic), keeps const/arrow syntax
// untouched (so preset-react alone, no preset-env), and carries Babel's _extends helper for
// JSX prop spread. Building the unmodified app.jsx with these settings reproduces the
// committed app.js byte for byte, which is what makes a diff of the output meaningful.
import Babel from "@babel/standalone";
import { readFileSync, writeFileSync } from "node:fs";

const [, , inPath, outPath] = process.argv;
if (!inPath || !outPath) {
  console.error("usage: node build.mjs <app.jsx> <app.js>");
  process.exit(1);
}
const src = readFileSync(inPath, "utf8");
const { code } = Babel.transform(src, {
  presets: [["react", { runtime: "classic" }]],
  compact: false,
  sourceMaps: false,
});
writeFileSync(outPath, code, "utf8");
console.log(`built ${outPath} (${code.length} bytes)`);
