import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const cwd = process.cwd();
const imageRoots = ["src", "public"];
const textRoots = ["app", "components", "data", "lib", "src", "public"];
const imageExt = /\.(png|jpe?g)$/i;
const textExt = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".html", ".css", ".json", ".md", ".txt", ".xml"]);
const skipDirs = new Set([".git", ".next", ".next-dev", "node_modules", "out"]);
const maxDimension = 1920;

function shouldSkipImage(file) {
  const rel = path.relative(cwd, file).replaceAll(path.sep, "/");
  return rel === "public/favicon.png" || /(^|\/)apple-touch-icon/i.test(rel);
}

async function walk(dir, files = []) {
  for (const entry of await fsp.readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory() && skipDirs.has(entry.name)) continue;
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(file, files);
    else files.push(file);
  }
  return files;
}

function defaultWebpPath(file) {
  return file.replace(/\.[^.]+$/, ".webp");
}

async function casedPath(file) {
  const dir = path.dirname(file);
  const base = path.basename(file).toLowerCase();
  try {
    const entry = (await fsp.readdir(dir)).find((name) => name.toLowerCase() === base);
    return entry ? path.join(dir, entry) : file;
  } catch {
    return file;
  }
}

function webpPathFor(file, collisionKeys) {
  const normal = defaultWebpPath(file);
  return collisionKeys.has(normal.toLowerCase()) ? `${file}.webp` : normal;
}

function safeDecode(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function encodeLikeOriginal(originalRef, fileName) {
  return /%[0-9a-f]{2}/i.test(originalRef) ? encodeURIComponent(fileName) : fileName;
}

function findSource(ref, fromFile, byAbs, byLowerAbs) {
  if (/^(?:https?:)?\/\//i.test(ref) || /^(?:data|mailto|tel):/i.test(ref)) return null;

  const cleanRef = safeDecode(ref.split(/[?#]/, 1)[0]);
  const fromDir = path.dirname(fromFile);
  const candidates = [];

  if (cleanRef.startsWith("/")) {
    candidates.push(path.join(cwd, "public", cleanRef.slice(1)));
  } else {
    candidates.push(path.resolve(fromDir, cleanRef));
    candidates.push(path.resolve(cwd, cleanRef));
    candidates.push(path.join(cwd, "public", cleanRef));
  }

  return candidates.find((candidate) => {
    const resolved = path.resolve(candidate);
    return byAbs.has(resolved) || byLowerAbs.has(resolved.toLowerCase());
  }) || null;
}

function replaceRef(ref, fromFile, byAbs) {
  const match = ref.match(/^([^?#]+)([?#].*)?$/);
  if (!match || !imageExt.test(match[1])) return ref;

  const byLowerAbs = replaceRef.byLowerAbs;
  const source = findSource(match[1], fromFile, byAbs, byLowerAbs);
  if (!source) return ref;

  const resolved = path.resolve(source);
  const target = byAbs.get(resolved) || byLowerAbs.get(resolved.toLowerCase());
  if (!target) return ref;

  const slash = Math.max(match[1].lastIndexOf("/"), match[1].lastIndexOf("\\"));
  const dir = slash >= 0 ? match[1].slice(0, slash + 1) : "";
  const nextName = encodeLikeOriginal(match[1], path.basename(target));

  return `${dir}${nextName}${match[2] || ""}`;
}

function rewriteText(content, file, byAbs) {
  let next = content.replace(/(["'`])([^"'`]*?\.(?:png|jpe?g)(?:[?#][^"'`]*)?)\1/gi, (full, quote, ref) => {
    return `${quote}${replaceRef(ref, file, byAbs)}${quote}`;
  });

  next = next.replace(/url\(([^)]*?\.(?:png|jpe?g)(?:[?#][^)]*)?)\)/gi, (full, rawRef) => {
    const trimmed = rawRef.trim();
    const quote = /^["']/.test(trimmed) ? trimmed[0] : "";
    const unquoted = quote ? trimmed.slice(1, -1) : trimmed;
    const replaced = replaceRef(unquoted, file, byAbs);
    return `url(${quote}${replaced}${quote})`;
  });

  return next;
}

async function convert(file, target) {
  const input = await fsp.stat(file);
  const meta = await sharp(file).metadata();
  const largestSide = Math.max(meta.width || 0, meta.height || 0);
  const pipeline = sharp(file).rotate();
  const tmpTarget = `${target}.tmp-${process.pid}-${Date.now()}`;

  if (largestSide > maxDimension) {
    pipeline.resize({ width: maxDimension, height: maxDimension, fit: "inside", withoutEnlargement: true });
  }

  const shouldPreferLossless = Boolean(meta.hasAlpha) || largestSide <= 650;
  const options = shouldPreferLossless ? { lossless: true, effort: 5 } : { quality: 80, effort: 5, smartSubsample: true };
  await pipeline.webp(options).toFile(tmpTarget);
  const output = await fsp.stat(tmpTarget);

  const existingTarget = await casedPath(target);
  if (!shouldPreferLossless && fs.existsSync(existingTarget)) {
    const existing = await fsp.stat(existingTarget);
    if (existing.size <= output.size) {
      await fsp.unlink(tmpTarget);
      return { input: input.size, output: existing.size, target: existingTarget };
    }
  }

  await fsp.rename(tmpTarget, target);

  return { input: input.size, output: output.size, target: await casedPath(target) };
}

const imageFiles = (await Promise.all(imageRoots.filter((root) => fs.existsSync(root)).map((root) => walk(path.join(cwd, root))))).flat();
const allFiles = (await Promise.all(textRoots.filter((root) => fs.existsSync(root)).map((root) => walk(path.join(cwd, root))))).flat();
const images = imageFiles.filter((file) => imageExt.test(file) && !shouldSkipImage(file));

const defaultTargets = new Map();
for (const file of images) {
  const key = defaultWebpPath(file).toLowerCase();
  defaultTargets.set(key, (defaultTargets.get(key) || 0) + 1);
}
const collisionKeys = new Set([...defaultTargets].filter(([, count]) => count > 1).map(([key]) => key));

const byAbs = new Map(images.map((file) => [path.resolve(file), path.resolve(webpPathFor(file, collisionKeys))]));

let before = 0;
let after = 0;
let converted = 0;
let skipped = 0;
const usableByAbs = new Map();
for (const [file, target] of byAbs) {
  try {
    await fsp.mkdir(path.dirname(target), { recursive: true });
    const result = await convert(file, target);
    before += result.input;
    after += result.output;
    converted += 1;
    usableByAbs.set(file, result.target);
  } catch (error) {
    skipped += 1;
    console.warn(`Skipped unsupported image: ${path.relative(cwd, file)}`);
  }
}
replaceRef.byLowerAbs = new Map([...usableByAbs].map(([source, target]) => [source.toLowerCase(), target]));

let rewrittenFiles = 0;
for (const file of allFiles) {
  if (!textExt.has(path.extname(file))) continue;
  const content = await fsp.readFile(file, "utf8");
  const next = rewriteText(content, file, usableByAbs);
  if (next !== content) {
    await fsp.writeFile(file, next);
    rewrittenFiles += 1;
  }
}

const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`;
console.log(`Converted ${converted} images to WebP`);
console.log(`Skipped ${skipped} unsupported images`);
console.log(`Image bytes: ${mb(before)} -> ${mb(after)}`);
console.log(`Rewrote ${rewrittenFiles} text files`);
