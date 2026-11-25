// Writes one small file per icon the site uses into src/components/icons/, taken from the react-icons package.
//
//   npm run icons:generate
//
// react-icons keeps each icon family in one module, so a page that shows three icons downloads every icon used
// anywhere on the site. To use a new icon, import it from "@/components/icons" and run this script: it scans the
// source for those imports, writes the missing files and index.ts, and removes icons nothing imports any more.
// tests/icons.test.mjs checks that the files draw exactly what react-icons draws.

import { existsSync, mkdirSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const folder = path.join(root, "src/components/icons");
const require = createRequire(import.meta.url);
const FAMILIES = { Fa: "fa", Fi: "fi", Gi: "gi" };
const HANDWRITTEN = new Set(["icon.ts"]);

export function iconsInUse(source = path.join(root, "src"), app = path.join(root, "app")) {
  const names = new Set();
  const walk = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        if (file !== folder) walk(file);
      } else if (/\.tsx?$/.test(entry.name)) {
        for (const [, list] of readFileSync(file, "utf8").matchAll(/import\s*\{([^}]*)\}\s*from\s*["']@\/components\/icons["']/g)) {
          list.split(",").map((name) => name.trim()).filter(Boolean).forEach((name) => names.add(name));
        }
      }
    }
  };
  walk(source);
  walk(app);
  return [...names].sort();
}

// react-icons writes every icon as `export function FaX (props) { return GenIcon({…})(props); }`.
function shapeOf(name) {
  const family = FAMILIES[name.slice(0, 2)];
  if (!family) throw new Error(`${name}: only the Fa, Fi and Gi families are set up in scripts/generate-icons.mjs`);
  const source = readFileSync(path.join(path.dirname(require.resolve(`react-icons/${family}`)), "index.mjs"), "utf8");
  const data = source.match(new RegExp(`export function ${name} ?\\(props\\) \\{\\s*return GenIcon\\((\\{.*?\\})\\)\\(props\\);`, "s"))?.[1];
  if (!data) throw new Error(`${name} is not in react-icons/${family}`);
  const tree = JSON.parse(data);
  const compact = (node) => (node.child.length ? [node.tag, node.attr, node.child.map(compact)] : [node.tag, node.attr]);
  return { attributes: tree.attr, children: tree.child.map(compact) };
}

function moduleFor(name) {
  const { attributes, children } = shapeOf(name);
  return `import { drawIcon, type IconProps, type IconShape } from "./icon";

const shape: IconShape = ${JSON.stringify([attributes, children])};

export default function ${name}(props: IconProps) {
  return drawIcon(shape, props);
}
`;
}

export function generatedFiles() {
  const names = iconsInUse();
  const files = new Map(names.map((name) => [`${name}.ts`, moduleFor(name)]));
  files.set("index.ts", `${names.map((name) => `export { default as ${name} } from "./${name}";`).join("\n")}\n`);
  return files;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  if (!existsSync(folder)) mkdirSync(folder, { recursive: true });
  const files = generatedFiles();
  for (const name of readdirSync(folder)) {
    if (!files.has(name) && !HANDWRITTEN.has(name)) rmSync(path.join(folder, name));
  }
  for (const [name, text] of files) writeFileSync(path.join(folder, name), text);
  console.log(JSON.stringify({ icons: files.size - 1, folder: path.relative(root, folder) }));
}
