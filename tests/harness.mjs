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
  // setME/getME exist because ME is a script-lexical `let` (app.jsx:239) — invisible from
  // outside the VM. These arrows close over that binding, so a test can sign in as somebody
  // else. Restore what getME returned; ME is global state and leaks across tests otherwise.
  src += "\n;globalThis.__TT = { API, _supaSaveItems, _supaUnlock, _supaPublish, _prSaveRow, _prSaveCalc, _stamp, prCalc,"
      +  " setME: (v) => { ME = v; }, getME: () => ME };\n";

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
// RLS refuses a write in TWO shapes, and they are not interchangeable — the live RLS test sees
// both against the real database in a single run, so the fake has to be able to do both too.
//
// opts.blockWrites simulates a USING policy: the row is invisible to the write, so PostgREST
// answers 200 with an EMPTY ARRAY and NO error. This is the whole reason the adapter asks for the
// affected rows back — `error` stays null on a write that never happened.
//
// opts.errorWrites simulates a WITH CHECK violation: the row is visible, Postgres evaluates the
// NEW row, rejects it, and RAISES. PostgREST surfaces 42501 with error set and data null. This is
// how pr_periods actually refuses (proved by tests/rls-live.mjs case 5), which means for that
// table `if (error)` is the branch that fires in production and `!hit.length` never runs. A fake
// that could only do silent refusals would leave the live branch untested.
//
// Both take the same shapes:
//   true            every write
//   "pr_items"      writes to that table
//   (table, n) => … by table and 1-based write number (n=2 is the second write)
export function makeFakeSB(tables = {}, opts = {}) {
  const db = Array.isArray(tables) ? { pr_items: tables } : tables;
  const calls = [];
  const WRITES = ["update", "insert", "upsert", "delete"];
  let writeNo = 0, nextId = 9000;
  const matches = (rule, table, n) => {
    if (!rule) return false;
    if (rule === true) return true;
    if (typeof rule === "string") return rule === table;
    if (typeof rule === "function") return !!rule(table, n);
    return false;
  };
  const blocked = (table, n) => matches(opts.blockWrites, table, n);
  const errored = (table, n) => matches(opts.errorWrites, table, n);
  return {
    calls,
    from(table) {
      const q = { table, filters: {} };
      const hits = () => (db[q.table] || []).filter((r) => Object.entries(q.filters).every(([k, v]) => r[k] === v));
      // An upsert resolves against its CONFLICT KEY, not against .eq() filters — it carries none.
      // Falling through to hits() would match every row in the table (an empty filter set matches
      // everything) and, against an empty fixture, return [] — which is byte-for-byte what
      // blockWrites produces. That made the commonest path, the FIRST write of a row, look
      // identical to a silent refusal, so a handler's honest-failure check would fire on it.
      // With no onConflict the key list is empty and nothing can match, so this behaves as a
      // plain insert — mirroring PostgREST falling back to the primary key, and leaving "was
      // onConflict actually sent?" a question for an explicit assertion on calls[].opts.
      const upsertHits = () => {
        const keys = String((q.opts && q.opts.onConflict) || "").split(",").map((s) => s.trim()).filter(Boolean);
        const found = keys.length ? (db[q.table] || []).filter((r) => keys.every((k) => r[k] === q.row[k])) : [];
        return found.length ? found.map((r) => ({ ...r, ...q.row })) : [{ id: nextId++, ...q.row }];
      };
      const b = {
        // select() after a write is PostgREST's return=representation, NOT a read — it must not
        // overwrite the op. Without a select(), a write resolves data:null, same as the real one.
        select(cols) { q.cols = cols; if (q.op) q.returning = true; else q.op = "select"; return b; },
        eq(col, val) { q.filters[col] = val; return b; },
        update(row) { q.op = "update"; q.row = row; return b; },
        insert(row) { q.op = "insert"; q.row = row; return b; },
        delete() { q.op = "delete"; return b; },
        // opts is kept, not dropped: `onConflict` is the whole contract of an upsert, and a
        // handler that forgets it raises a duplicate-key error in production while every
        // fake-backed test still passes. Recording it is what lets a test assert it was sent.
        upsert(row, opts) { q.op = "upsert"; q.row = row; q.opts = opts; return b; },
        // PostgREST semantics: one row or null, and no error when there is no match.
        maybeSingle() { q.one = true; return b; },
        then(res, rej) {
          calls.push({ table: q.table, op: q.op, row: q.row, filters: { ...q.filters }, cols: q.cols, opts: q.opts });
          let data = null;
          if (q.op === "select") {
            const h = hits();
            data = q.one ? (h[0] || null) : h;
          } else if (WRITES.includes(q.op)) {
            const n = ++writeNo;
            // A raise beats a return: 42501 arrives with data null whether or not the caller asked
            // for the rows back, so this cannot live inside the q.returning branch.
            if (errored(q.table, n)) {
              return Promise.resolve({
                data: null,
                error: { code: "42501", message: `new row violates row-level security policy for table "${q.table}"` },
              }).then(res, rej);
            }
            if (q.returning) {
              data = blocked(q.table, n) ? []                                   // <- the silent refusal
                : q.op === "insert" ? [{ id: nextId++, ...q.row }]
                : q.op === "upsert" ? upsertHits()
                : hits().map((r) => ({ ...r, ...q.row }));
            }
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
