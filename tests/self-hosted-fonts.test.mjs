import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

// The build must not depend on Google answering: every font it uses is a file in this repository.
const root = fileURLToPath(new URL("..", import.meta.url));
const fontFolder = path.join(root, "src/assets/fonts");
const layoutFile = path.join(root, "app/layout.tsx");
const styleFile = path.join(root, "src/styles/globals.css");
const layout = readFileSync(layoutFile, "utf8");
const styles = readFileSync(styleFile, "utf8");

function sourceFiles(folder) {
  return readdirSync(path.join(root, folder), { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(folder, entry.name);
    if (entry.isDirectory()) return sourceFiles(file);
    return /\.(tsx?|css)$/.test(entry.name) ? [file] : [];
  });
}

// Every declared face, from both places: next/font/local calls in the layout, @font-face rules in the stylesheet.
function declaredFaces() {
  const faces = [];
  for (const [, options] of layout.matchAll(/localFont\(\{([\s\S]*?)\n\}\);/g)) {
    const family = options.match(/prop: "font-family", value: "([^"]+)"/)?.[1];
    const ranges = options.match(/prop: "unicode-range",\s*value:\s*"([^"]+)"/)?.[1];
    for (const [, file] of options.matchAll(/(?:src|path): "([^"]+)"/g)) {
      faces.push({ family, ranges, file: path.resolve(path.dirname(layoutFile), file) });
    }
  }
  for (const [, rule] of styles.matchAll(/@font-face\s*\{([^}]*)\}/g)) {
    faces.push({
      family: rule.match(/font-family:\s*"?([^";]+)"?;/)?.[1],
      ranges: rule.match(/unicode-range:\s*([^;]+);/)?.[1],
      file: path.resolve(path.dirname(styleFile), rule.match(/url\("?([^")]+)"?\)/)?.[1] ?? "no url in this rule"),
    });
  }
  return faces;
}

function covers(ranges, character) {
  const wanted = character.codePointAt(0);
  return (ranges ?? "").split(",").some((part) => {
    const [from, to = from] = part.trim().replace(/^U\+/i, "").split("-");
    return wanted >= parseInt(from.replace(/\?/g, "0"), 16) && wanted <= parseInt(to.replace(/\?/g, "F"), 16);
  });
}

test("the build asks no other server for a font", () => {
  const offenders = [...sourceFiles("app"), ...sourceFiles("src")].filter((file) =>
    /next\/font\/google|fonts\.(googleapis|gstatic)\.com/.test(readFileSync(path.join(root, file), "utf8")),
  );
  assert.deepEqual(offenders, []);
});

test("each font family is declared, and every file it names is a real WOFF2 font", () => {
  const faces = declaredFaces();
  assert.deepEqual([...new Set(faces.map((face) => face.family))].sort(), ["Cinzel", "Inter", "Outfit"]);
  for (const { file } of faces) {
    assert.ok(existsSync(file), `${path.relative(root, file)} is missing`);
    assert.equal(readFileSync(file).subarray(0, 4).toString("latin1"), "wOF2", path.relative(root, file));
  }
});

test("each family still covers English text, the rupee sign and accented names", () => {
  for (const family of ["Cinzel", "Inter", "Outfit"]) {
    const faces = declaredFaces().filter((face) => face.family === family);
    for (const character of ["A", "9", "—", "₹", "é", "ś"]) {
      assert.ok(faces.some((face) => covers(face.ranges, character)), `${family} does not cover ${character}`);
    }
  }
});

test("the font folder holds only fonts the site uses, with their licence", () => {
  const used = new Set(declaredFaces().map((face) => path.basename(face.file)));
  assert.deepEqual(readdirSync(fontFolder).filter((name) => !name.startsWith(".")).sort(), [...used, "OFL.txt"].sort());
  const licence = readFileSync(path.join(fontFolder, "OFL.txt"), "utf8");
  assert.match(licence, /SIL OPEN FONT LICENSE Version 1\.1/);
  for (const family of ["Cinzel", "Inter", "Outfit"]) {
    assert.match(licence, new RegExp(`Copyright \\d{4} The ${family} Project Authors`));
  }
});
