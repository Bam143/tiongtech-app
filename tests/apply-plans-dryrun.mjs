// DRY RUN of pr_apply_plans against the REAL database. Writes NOTHING.
//
//   SB_OWNER_PW=... node tests/apply-plans-dryrun.mjs            list draft weeks, probe the schema
//   SB_OWNER_PW=... node tests/apply-plans-dryrun.mjs 42         dry-run the apply for period 42
//
// The point is to exercise the SHIPPED handler, not a re-implementation of it. A checker that
// recomputed the deductions itself would agree with a buggy handler for the same reason the
// handler was buggy. So this loads the real _supaApplyPlans out of app.js, hands it the real
// Supabase client for every READ, and intercepts every WRITE — recording what would have been
// sent and handing back a plausible success so the handler carries on to the end.
//
// What that proves, without touching a row:
//   - pr_plan_applied exists and carries the columns the handler selects
//   - the reads all succeed under RLS as the signed-in officer
//   - the exact ded_loan / ded_uniform / ded_gov / ded_notes / net the handler would write
//   - the exact ledger rows and the onConflict target it would upsert on
//
// What it CANNOT prove, because nothing is written:
//   - that the UNIQUE (plan_id, period_id) index exists and the upsert resolves against it
//   - that RLS permits the writes
// Those two need a real press of the button on a DRAFT week. Everything else is checked here
// first so that press is the only unknown left.
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { loadApp } from "./harness.mjs";

const OWNER_PW = process.env.SB_OWNER_PW;
if (!OWNER_PW) {
  console.error("Refusing to run: set SB_OWNER_PW (the superadmin password). It is never stored here.\n");
  console.error("  SB_OWNER_PW=... node tests/apply-plans-dryrun.mjs [period_id]");
  process.exit(2);
}

// Same reader as rls-live.mjs — one copy of the config, read from the page that ships it.
const html = readFileSync("index.html", "utf8");
const url = (html.match(/"(https:\/\/[a-z0-9-]+\.supabase\.co)"/) || [])[1];
const key = (html.match(/"(sb_publishable_[A-Za-z0-9_-]+|eyJ[\w-]+\.[\w-]+\.[\w-]+)"/) || [])[1];
if (!url || !key) { console.error("SETUP: could not read the project URL / publishable key from index.html."); process.exit(2); }

const sb = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
const { error: authErr } = await sb.auth.signInWithPassword({ email: "superadmin@tiongtech.local", password: OWNER_PW });
if (authErr) { console.error("SETUP: could not sign in as superadmin — " + authErr.message); process.exit(2); }
console.log("signed in as superadmin\n");

/* ---------- schema probe: does pr_plan_applied look the way the handler assumes? ---------- */
const APPLIED_COLS = "id,plan_id,period_id,term_no,amount";
const { data: probe, error: probeErr } = await sb.from("pr_plan_applied").select(APPLIED_COLS).limit(1);
if (probeErr) {
  console.error("FAIL  pr_plan_applied does not match what the handler selects.");
  console.error("      selecting \"" + APPLIED_COLS + "\" gave: " + probeErr.message);
  console.error("      The handler cannot work until this is reconciled. Nothing else below will be meaningful.");
  process.exit(1);
}
console.log("PASS  pr_plan_applied readable with columns: " + APPLIED_COLS);
console.log("      rows visible: " + (probe ? probe.length : 0) + (probe && probe.length ? "  sample: " + JSON.stringify(probe[0]) : "  (table is empty)"));

/* ---------- no period given: list the safe targets and stop ---------- */
const periodId = Number(process.argv[2] || 0);
if (!periodId) {
  const { data: pers, error } = await sb.from("pr_periods").select("id,label,status,pay_date").order("id", { ascending: false }).limit(15);
  if (error) { console.error("could not list periods: " + error.message); process.exit(1); }
  console.log("\nrecent weeks — dry-run a DRAFT one (a draft has never been shown to employees):\n");
  for (const p of pers || []) {
    const safe = p.status === "draft" ? "  <- safe to dry-run" : (p.status === "locked" ? "  (locked — the handler refuses it)" : "");
    console.log(`  ${String(p.id).padStart(4)}  ${String(p.status).padEnd(10)} ${String(p.pay_date || "").padEnd(12)} ${p.label || ""}${safe}`);
  }
  console.log("\n  SB_OWNER_PW=... node tests/apply-plans-dryrun.mjs <id>");
  process.exit(0);
}

/* ---------- the dry run ---------- */
// Reads go to the real client. Writes are recorded and answered with a plausible success, so the
// handler runs to completion instead of stopping at its own honest-failure check.
const writes = [];
const fakeId = (q) => {
  const byId = q.filters.find(([k]) => k === "id");
  return byId ? byId[1] : -1;
};
const shim = {
  from(table) {
    const q = { table, op: null, row: null, opts: null, filters: [], cols: null, one: false, returning: false };
    const b = {
      select(cols) { q.cols = cols; if (q.op) q.returning = true; else q.op = "select"; return b; },
      eq(k, v) { q.filters.push([k, v]); return b; },
      update(row) { q.op = "update"; q.row = row; return b; },
      insert(row) { q.op = "insert"; q.row = row; return b; },
      upsert(row, opts) { q.op = "upsert"; q.row = row; q.opts = opts; return b; },
      delete() { q.op = "delete"; return b; },
      maybeSingle() { q.one = true; return b; },
      then(res, rej) {
        if (q.op === "select") {
          let r = sb.from(q.table).select(q.cols);
          for (const [k, v] of q.filters) r = r.eq(k, v);
          if (q.one) r = r.maybeSingle();
          return r.then(res, rej);
        }
        writes.push(q);
        return Promise.resolve({ data: [{ id: fakeId(q) }], error: null }).then(res, rej);
      },
    };
    return b;
  },
};

const app = loadApp("app.js");
app.setME({ username: "superadmin", role: "owner" });
app.window.SB = shim;

const res = await app.API("pr_apply_plans", { period_id: periodId });

console.log(`\ndry run for period ${periodId} — NOTHING WAS WRITTEN\n`);
console.log("handler returned: " + JSON.stringify(res) + "\n");

const led = writes.filter((w) => w.table === "pr_plan_applied");
const items = writes.filter((w) => w.table === "pr_items");

console.log(`ledger writes (${led.length}):`);
for (const w of led) {
  if (w.op === "delete") console.log(`  DELETE plan_id=${w.filters.find(([k]) => k === "plan_id")?.[1]} period_id=${w.filters.find(([k]) => k === "period_id")?.[1]}  (stale entry cleared)`);
  else console.log(`  UPSERT ${JSON.stringify(w.row)}  onConflict=${w.opts && w.opts.onConflict}`);
}
if (led.some((w) => w.op === "upsert" && !(w.opts && w.opts.onConflict === "plan_id,period_id"))) {
  console.log("  !! an upsert is missing onConflict — it would raise a duplicate key on the second press");
}

console.log(`\npay-line writes (${items.length}):`);
for (const w of items) {
  const r = w.row;
  const flag = r.status ? `  status->${r.status} approved_at->null` : "";
  console.log(`  id=${w.filters.find(([k]) => k === "id")?.[1]}  loan=${r.ded_loan} uniform=${r.ded_uniform} gov=${r.ded_gov}  net=${r.net}  notes="${r.ded_notes}"${flag}`);
}

console.log("\nreview the figures above. If they are right, press Apply plans on this week in the app —");
console.log("that press is what proves the upsert and RLS, which a dry run structurally cannot.");
