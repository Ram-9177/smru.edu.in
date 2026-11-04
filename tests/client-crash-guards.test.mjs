import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

async function load(file, globals = {}, imports = {}) {
  const source = await readFile(new URL(`../${file}`, import.meta.url), 'utf8');
  const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.React, esModuleInterop: true } }).outputText;
  const mod = { exports: {} };
  vm.runInNewContext(code, { module: mod, exports: mod.exports, require: name => {
    if (!(name in imports)) throw new Error(`Unexpected import: ${name}`);
    return imports[name];
  }, console, ...globals });
  return mod.exports;
}

function hooks() {
  const effects = [], updates = [];
  return { effects, updates, react: {
    createElement: () => null,
    useEffect: fn => effects.push(fn),
    useRef: value => ({ current: value }),
    useState: value => [value, next => updates.push(next)],
  } };
}

function timers() {
  const pending = new Map();
  let id = 0;
  return { pending, setTimeout: fn => { pending.set(++id, fn); return id; }, clearTimeout: id => pending.delete(id), flush() {
    const callbacks = [...pending.values()]; pending.clear(); callbacks.forEach(fn => fn());
  } };
}

const loadErrorScreen = (h, window) => load('src/components/AppErrorScreen.tsx', { window, React: h.react }, { react: h.react });
const chunkError = () => Object.assign(new Error('Loading chunk 123 failed.'), { name: 'ChunkLoadError' });

test('a failed chunk reloads the page once, then stays on the recovery screen', async () => {
  const h = hooks(), stored = new Map();
  let reloads = 0;
  const window = { sessionStorage: { getItem: key => stored.get(key) ?? null, setItem: (key, value) => stored.set(key, value) }, location: { reload: () => reloads++ } };
  const { default: AppErrorScreen } = await loadErrorScreen(h, window);
  AppErrorScreen({ error: chunkError() });
  h.effects[0]();
  assert.equal(reloads, 1);
  h.effects[0]();
  assert.equal(reloads, 1, 'a chunk that is really gone must not reload in a loop');
  assert.deepEqual(h.updates, [false]);
});

test('blocked storage shows the recovery screen without an automatic reload', async () => {
  const h = hooks();
  let reloads = 0;
  const window = { get sessionStorage() { throw new Error('denied'); }, location: { reload: () => reloads++ } };
  const { default: AppErrorScreen } = await loadErrorScreen(h, window);
  AppErrorScreen({ error: chunkError() });
  assert.doesNotThrow(h.effects[0]);
  assert.equal(reloads, 0);
  assert.deepEqual(h.updates, [false]);
});

test('an ordinary render error goes straight to the recovery screen', async () => {
  const h = hooks();
  let reloads = 0;
  const window = { sessionStorage: { getItem: () => null, setItem() {} }, location: { reload: () => reloads++ } };
  const { default: AppErrorScreen } = await loadErrorScreen(h, window);
  AppErrorScreen({ error: new TypeError('x is not a function') });
  h.effects[0]();
  assert.equal(reloads, 0);
  assert.deepEqual(h.updates, [false]);
});

test('malformed slugs are returned instead of throwing', async () => {
  const source = await readFile(new URL('../src/lib/shared/program-utils.ts', import.meta.url), 'utf8');
  const ast = ts.createSourceFile('program-utils.ts', source, ts.ScriptTarget.Latest, true);
  let helper;
  const visit = node => {
    if (ts.isVariableDeclaration(node) && node.name.getText(ast) === 'decodeSlugParam') helper = node.initializer.getText(ast);
    ts.forEachChild(node, visit);
  };
  visit(ast);
  assert.ok(helper);
  const run = vm.runInNewContext(ts.transpileModule(`(${helper})`, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText);
  assert.equal(run('%E0%A4%A'), '%e0%a4%a');
  assert.equal(run('B%20Tech'), 'b tech');
});

test('failed image decode remains retryable and simultaneous requests share one download', async () => {
  let images = 0, fail = true;
  class Image { constructor() { images++; } decode() { return fail ? Promise.reject(new Error('network')) : Promise.resolve(); } }
  const { prefetchAndDecode, decodedImageRegistry } = await load('src/lib/campus-360/texture-cache.ts', { window: { Image } });
  assert.equal(await prefetchAndDecode('/image.webp'), false);
  assert.equal(decodedImageRegistry.has('/image.webp'), false);
  fail = false;
  const before = images;
  assert.deepEqual(await Promise.all([prefetchAndDecode('/image.webp'), prefetchAndDecode('/image.webp')]), [true, true]);
  assert.equal(images - before, 1);
});

test('closing enquiry cancels delayed widget initialization', async () => {
  const t = timers(), h = hooks();
  let boots = 0;
  const window = { ctplTag: () => boots++, addEventListener() {}, removeEventListener() {} };
  const document = { body: { style: {} }, querySelector: () => ({ removeEventListener() {} }), getElementById: () => ({ isConnected: true }) };
  const { default: ApplyModal } = await load('src/components/ApplyModal.tsx', { window, document, setTimeout: t.setTimeout, clearTimeout: t.clearTimeout }, { react: h.react, 'react-icons/fa': { FaTimes: () => null } });
  ApplyModal({ open: true, onClose() {} });
  const cleanup = h.effects[0]();
  cleanup(); t.flush();
  assert.equal(boots, 0);
});

test('shared scroll handler ignores malformed fragments and preserves valid encoded anchors', async () => {
  const t = timers(), h = hooks(), listeners = new Map(), ids = [];
  const window = { location: { hash: '#%E0%A4%A' }, addEventListener: (type, fn) => listeners.set(type, fn), removeEventListener() {}, scrollTo() {} };
  const document = { getElementById: id => { ids.push(id); return { scrollIntoView() {} }; } };
  const { default: ScrollToTop } = await load('src/components/ScrollToTop.tsx', { window, document, setTimeout: t.setTimeout, clearTimeout: t.clearTimeout }, { react: h.react, 'next/navigation': { usePathname: () => '/' } });
  ScrollToTop({});
  let cleanup;
  assert.doesNotThrow(() => { cleanup = h.effects[0](); });
  assert.equal(t.pending.size, 0);
  window.location.hash = '#campus%20life';
  listeners.get('hashchange')(); t.flush();
  assert.deepEqual(ids, ['campus life']);
  cleanup();
});

test('homepage hash retries ignore malformed fragments and retain valid anchor offset', async () => {
  const source = await readFile(new URL('../src/views/Home.tsx', import.meta.url), 'utf8');
  const ast = ts.createSourceFile('Home.tsx', source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let callback;
  const visit = node => {
    if (ts.isVariableDeclaration(node) && node.name.getText(ast) === 'scrollToHash') callback = node.initializer.getText(ast);
    ts.forEachChild(node, visit);
  };
  visit(ast);
  assert.ok(callback);
  const scrolls = [];
  const window = { location: { hash: '#%' }, scrollY: 100, scrollTo: options => scrolls.push(options) };
  const document = { getElementById: id => id === 'campus life' ? { getBoundingClientRect: () => ({ top: 300 }) } : null };
  const code = ts.transpileModule(`(${callback})`, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
  const run = vm.runInNewContext(code, { window, document });
  assert.doesNotThrow(run);
  window.location.hash = '#campus%20life'; run();
  assert.equal(scrolls.length, 1);
  assert.equal(scrolls[0].top, 304);
  assert.equal(scrolls[0].behavior, 'auto');
});
