// Test harness: loads the BUILT app.js (what actually ships) into a VM and hands back API().
//
// app.js is a browser script, not a module — everything is a top-level const in one script
// scope, so nothing can be imported. Instead the source is run in a VM with the browser
// globals stubbed, and a capture line is appended INSIDE that same scope to hand the functions
// back out. The bootstrap tail is stripped first: it calls loadLiveData() (real network) and
// renders <App/>, neither of which a unit test wants.
import vm from "node:vm";
import { readFileSync } from "node:fs";

// Anything the app reaches for that a test doesn't care about (React, ReactDOM, Recharts,
// Leaflet, icons) resolves to this. It is callable, constructible and indexable, so
// `const {createRoot} = ReactDOM` and `<Icon/>` both survive module-scope evaluation.
// `then` MUST stay undefined — a thenable stub would hang the first `await` that touched it.
const stub = new Proxy(function () {}, {
  get: (t, k) => {
    if (k === "then") return undefined;
    if (k === Symbol.toPrimitive) return () => "";
    return stub;
  },
  apply: () => stub,
  construct: () => stub,
});

const mkEl = () => ({
  id: "", textContent: "", style: {}, className: "",
  appendChild() {}, remove() {}, setAttribute() {}, addEventListener() {},
});

export function loadApp(appJsPath) {
  let src = readFileSync(appJsPath, "utf8");
  const bootAt = src.indexOf("Promise.resolve(typeof loadLiveData");
  if (bootAt === -1) throw new Error("harness: bootstrap tail not found — did app.js build?");
  src = src.slice(0, bootAt);
  // prCalc comes out too: it is what the SCREEN shows, so a test can compare the stored
  // gross/net against it instead of against a number copied out of the adapter.
  src += "\n;globalThis.__TT = { API, _supaSaveItems, _prSaveRow, _prSaveCalc, _stamp, prCalc };\n";

  const windowObj = { SB: null, __LIVE__: true, addEventListener() {}, location: { href: "" }, matchMedia: () => ({ matches: false, addEventListener() {} }) };
  const backing = {
    window: windowObj,
    document: {
      getElementById: () => null,
      createElement: mkEl,
      head: { appendChild() {} },
      body: { appendChild() {} },
      addEventListener() {},
    },
    console, Promise, JSON, Math, Date, Number, String, Object, Array, Boolean, Error,
    isNaN, parseInt, parseFloat, setTimeout, clearTimeout, setInterval, clearInterval,
    localStorage: { getItem: () => null, setItem() {}, removeItem() {} },
    navigator: { userAgent: "node", clipboard: { writeText: () => Promise.resolve() } },
    fetch: () => Promise.reject(new Error("network disabled in tests")),
  };
  // `has: () => true` means EVERY identifier resolves through `get`, globalThis included — so
  // it has to be a real self-reference, or the capture line would set __TT on the stub and
  // silently lose it.
  backing.globalThis = backing;
  const ctx = new Proxy(backing, {
    has: () => true,                                     // every identifier resolves; no ReferenceError
    get: (t, k) => (k in t ? t[k] : stub),
    set: (t, k, v) => { t[k] = v; return true; },
  });
  vm.createContext(ctx);
  vm.runInContext(src, ctx, { filename: "app.js" });
  const tt = backing.__TT;
  if (!tt || typeof tt.API !== "function") throw new Error("harness: API not captured");
  return { ...tt, window: windowObj };
}

// A stand-in for the PostgREST query builder, shaped the way the adapter actually uses it:
// sb.from(t).select(c).eq(k,v) / .update(row).eq("id",n) / .insert(row), each awaited to
// {data,error}. Every awaited call is recorded so a test can assert what was written.
// Tables are keyed by name — the save reads pr_items, pr_employees and pr_schedules, so a
// single-table fake would hand pr_items rows back to a pr_employees select and quietly pass.
export function makeFakeSB(tables = {}) {
  const db = Array.isArray(tables) ? { pr_items: tables } : tables;
  const calls = [];
  return {
    calls,
    from(table) {
      const q = { table, filters: {} };
      const b = {
        select(cols) { q.op = "select"; q.cols = cols; return b; },
        eq(col, val) { q.filters[col] = val; return b; },
        update(row) { q.op = "update"; q.row = row; return b; },
        insert(row) { q.op = "insert"; q.row = row; return b; },
        delete() { q.op = "delete"; return b; },
        upsert(row) { q.op = "upsert"; q.row = row; return b; },
        // PostgREST semantics: one row or null, and no error when there is no match.
        maybeSingle() { q.one = true; return b; },
        then(res, rej) {
          calls.push({ table: q.table, op: q.op, row: q.row, filters: { ...q.filters } });
          let data = null;
          if (q.op === "select") {
            const hits = (db[q.table] || []).filter((r) => Object.entries(q.filters).every(([k, v]) => r[k] === v));
            data = q.one ? (hits[0] || null) : hits;
          }
          return Promise.resolve({ data, error: null }).then(res, rej);
        },
      };
      return b;
    },
  };
}

// Minimal assertions — no framework, so the suite has no install step to rot.
export function makeSuite(name) {
  const results = { name, pass: 0, fail: 0, failures: [] };
  const t = {
    async test(label, fn) {
      try { await fn(); results.pass++; console.log(`  ✓ ${label}`); }
      catch (e) { results.fail++; results.failures.push(`${label}: ${e.message}`); console.log(`  ✗ ${label}\n      ${e.message}`); }
    },
    eq(actual, expected, msg) {
      if (!Object.is(actual, expected)) throw new Error(`${msg || "eq"} — expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
    },
    ok(v, msg) { if (!v) throw new Error(msg || "expected truthy"); },
    results,
  };
  return t;
}
