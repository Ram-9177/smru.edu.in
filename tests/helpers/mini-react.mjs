// A small stand-in for React: state changes re-render, effects run when their dependencies change.
export function createReact() {
  const cells = [];
  let cursor = 0, dirty = false, pending = [];
  const changed = (a, b) => !a || !b || a.length !== b.length || a.some((value, i) => !Object.is(value, b[i]));
  const memo = (make, deps) => {
    const i = cursor++;
    if (!cells[i] || changed(cells[i].deps, deps)) cells[i] = { value: make(), deps };
    return cells[i].value;
  };
  return {
    createElement: () => null,
    useRef: (value) => memo(() => ({ current: value }), []),
    useMemo: memo,
    useCallback: (fn, deps) => memo(() => fn, deps),
    useState(initial) {
      const i = cursor++;
      cells[i] ??= { value: initial };
      return [cells[i].value, (next) => {
        if (!Object.is(cells[i].value, next)) { cells[i].value = next; dirty = true; }
      }];
    },
    useEffect(fn, deps) {
      const i = cursor++;
      const before = cells[i];
      if (!before || changed(before.deps, deps)) {
        cells[i] = { deps };
        pending.push(() => { before?.cleanup?.(); cells[i].cleanup = fn(); });
      }
    },
    render(draw) {
      do {
        dirty = false; cursor = 0; pending = [];
        draw();
        pending.forEach((run) => run());
      } while (dirty);
    },
  };
}
