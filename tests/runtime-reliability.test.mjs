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

function hooks(iframe) {
  const effects = [], updates = [];
  return { effects, updates, react: {
    createElement: () => null,
    useEffect: fn => effects.push(fn),
    useCallback: fn => fn,
    useRef: value => ({ current: iframe && value === null ? iframe : value }),
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

test('iframe ignores unrelated messages and accepts a valid height only from its frame', async () => {
  const frameWindow = {};
  const iframe = { src: 'https://partner.example/', contentWindow: frameWindow };
  const h = hooks(iframe), listeners = new Map();
  const window = { location: { href: 'https://smru.edu.in/' }, addEventListener: (type, fn) => listeners.set(type, fn) };
  const { useIframeAutoHeight } = await load('src/hooks/useIframeAutoHeight.ts', { window, URL }, { react: h.react });
  useIframeAutoHeight();
  h.effects[2]();
  const handle = listeners.get('message');
  handle({ source: frameWindow, origin: 'https://partner.example', data: { type: 'analytics' } });
  assert.equal(h.updates.length, 0, 'unrelated frame messages must not shrink to 320px');
  for (const height of [null, '', ' ', false, {}, 0, -10, Infinity]) handle({ source: frameWindow, origin: 'https://partner.example', data: { height } });
  assert.equal(h.updates.length, 0);
  handle({ source: {}, origin: 'https://partner.example', data: { height: 900 } });
  handle({ source: frameWindow, origin: 'https://evil.example', data: { height: 900 } });
  assert.equal(h.updates.length, 0);
  handle({ source: frameWindow, origin: 'https://partner.example', data: { height: 1450 } });
  assert.deepEqual(h.updates, [1450, true, false]);
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

test('inline CTPL initializes each new container after route remount', async () => {
  const t = timers(), h = hooks();
  let container = { isConnected: true }, boots = 0;
  const window = { ctplTag: () => boots++ };
  const document = { querySelector: () => ({}), getElementById: () => container };
  const { default: Widget } = await load('src/components/CtplFormWidget.tsx', { window, document, setTimeout: t.setTimeout, clearTimeout: t.clearTimeout }, { react: h.react });
  Widget({});
  const cleanup = h.effects[0](); t.flush(); cleanup();
  container = { isConnected: true };
  h.effects[0](); t.flush();
  assert.equal(boots, 2);
});

test('predictive navigation does not load tour media without intent and cancels fallback timer', async () => {
  const t = timers(), warmed = [];
  const window = { setTimeout: t.setTimeout, clearTimeout: t.clearTimeout };
  const document = { addEventListener() {}, removeEventListener() {}, getElementById() { return null; } };
  const { initPredictiveNavigation } = await load('src/lib/speed/predictive-preloader.ts', { window, document, Element: class {} }, {
    '../campus-360/texture-cache': { prefetchAndDecode: src => warmed.push(src), warmUpTourTextures: () => warmed.push('tour'), warmUpHostelTiles: () => warmed.push('hostel') },
    '../../data/campus-tour': { CAMPUS_TOUR_LOCATIONS: [] },
  });
  const cleanup = initPredictiveNavigation(); t.flush();
  assert.equal(warmed.includes('tour') || warmed.includes('hostel'), false);
  const cleanup2 = initPredictiveNavigation(); cleanup2();
  assert.equal(t.pending.size, 0);
  cleanup();
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

test('landing intro activates only on home landing, transitions phases, and clears timers', async () => {
  const t = timers(), h = hooks();
  const storage = new Map();
  const sessionStorage = {
    getItem: k => storage.get(k) || null,
    setItem: (k, v) => storage.set(k, String(v)),
  };
  let currentPath = '/schools';
  const window = {
    location: { search: '' },
    sessionStorage,
    addEventListener: () => {},
    removeEventListener: () => {},
    Image: class { set src(v) {} },
  };
  const { default: LandingIntro } = await load(
    'src/components/LandingIntro.tsx',
    { window, document: { readyState: 'complete' }, sessionStorage, setTimeout: t.setTimeout, clearTimeout: t.clearTimeout },
    { react: h.react, 'next/navigation': { usePathname: () => currentPath }, 'next/image': () => null }
  );

  // Non-landing route: should not set shouldShow to true
  LandingIntro();
  h.effects[0]();
  assert.equal(h.updates.length, 1, 'non-home routes must only set mounted, not shouldShow');
  assert.equal(sessionStorage.getItem('smru_landing_intro_seen'), null, 'sessionStorage must not be touched on non-home route');

  // Home route: should trigger and set session storage
  currentPath = '/';
  const h2 = hooks();
  const { default: LandingIntroHome } = await load(
    'src/components/LandingIntro.tsx',
    { window, document: { readyState: 'complete' }, sessionStorage, setTimeout: t.setTimeout, clearTimeout: t.clearTimeout },
    { react: h2.react, 'next/navigation': { usePathname: () => currentPath }, 'next/image': () => null }
  );
  LandingIntroHome();
  h2.effects[0]();
  assert.equal(sessionStorage.getItem('smru_landing_intro_seen'), 'true');
  assert.equal(h2.updates.length, 2, 'landing on / must trigger shouldShow');

  // Restricted storage route: throws SecurityError, must not crash
  const restrictedStorageWindow = {
    location: { search: '' },
    get sessionStorage() { throw new Error('Access is denied for this document'); },
    addEventListener: () => {},
    removeEventListener: () => {},
  };
  const h3 = hooks();
  const { default: LandingIntroRestricted } = await load(
    'src/components/LandingIntro.tsx',
    { window: restrictedStorageWindow, document: { readyState: 'complete' }, setTimeout: t.setTimeout, clearTimeout: t.clearTimeout },
    { react: h3.react, 'next/navigation': { usePathname: () => '/' }, 'next/image': () => null }
  );
  LandingIntroRestricted();
  assert.doesNotThrow(() => h3.effects[0](), 'restricted storage must not crash landing intro');
});

test('decodeSlugParam gracefully handles malformed percent encoding without URIError', async () => {
  const { decodeSlugParam, findBySlugOrName } = await load('src/lib/shared/program-utils.ts');
  assert.equal(decodeSlugParam('valid-slug'), 'valid-slug');
  assert.equal(decodeSlugParam('valid%20slug'), 'valid slug');
  assert.equal(decodeSlugParam('%E0%A4%A'), '%e0%a4%a', 'malformed utf-8 percent encoding must fallback gracefully');
  assert.equal(decodeSlugParam('%'), '%', 'dangling percent must not throw');
  const list = [{ slug: 'normal-slug', name: 'Normal' }];
  assert.equal(findBySlugOrName(list, '%E0%A4%A'), null);
});

