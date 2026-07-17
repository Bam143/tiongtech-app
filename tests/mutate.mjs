// Mutation check — proves the payroll suite can actually FAIL.
//
//   npm run mutate
//
// A green suite means nothing on its own. A test that passes no matter what the code does reads
// exactly like coverage and is worse than no test, because it buys confidence it hasn't earned.
// This breaks the code on purpose, one guard at a time, and asserts the suite goes red for each.
// A mutation that SURVIVES is a hole: the behaviour below is unprotected.
//
// WHY IT ASSERTS THE PATCH APPLIED — read this before adding a mutation.
// The first version of this used `sed`. Babel pretty-prints object literals across lines, so
// the single-line patterns matched NOTHING, the suite ran against untouched code, and it
// reported "29 passed" — which looks identical to "the tests don't bite". A mutation harness
// that can't tell "didn't apply" from "didn't kill" gives false confidence about false
// confidence. So every pattern must match EXACTLY once, and a miss is a hard exit 2, never a
// pass. Patterns are matched against the BUILT app.js, so they are written in Babel's output
// shape (multi-line object literals), not the shape they take in app.jsx.
//
// When a pattern stops applying it usually means the code moved, not that anything is wrong:
// run `npm run build`, look at the compiled form, and update the pattern.
import { readFileSync, writeFileSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { tmpdir } from "node:os";
import { join } from "node:path";

// `from` must appear exactly once — in the whole file, or within `in` if the same code exists
// in more than one function (the not-found guard is deliberately worded the same in both, so
// scoping is how they stay distinct without anchoring on a neighbouring comment that is free to
// change). `why` is what breaks in the real world if this mutation ever survives.
const MUTATIONS = [
  // ---- the write actually landing (silent-write fix) ----
  {
    name: "drop-save-zerorows",
    why: "a database-blocked save reports 'Saved ✓' over a write that never happened",
    from: `    if (!hit || !hit.length) {
      return _prSaveStopped(eid, empById, written, "the database refused the write. The week may be locked, or your account may not have permission to edit it.");
    }
`,
    to: "",
  },
  {
    name: "drop-unlock-zerorows",
    why: "a blocked unlock reports 'Week unlocked' while the week stays locked",
    from: `  if (!hit || !hit.length) return {
    ok: false,
    error: "Unlock was blocked — the week is still locked. Your account may not have permission to unlock it."
  };
`,
    to: "",
  },
  {
    name: "drop-select-on-writes",
    why: "without asking for the affected rows back, a silent refusal is undetectable",
    from: `} = id != null ? await sb.from("pr_items").update(row).eq("id", id).select("id") : await sb.from("pr_items").insert({
      ...row,
      period_id: periodId,
      employee_id: eid
    }).select("id");`,
    to: `} = id != null ? await sb.from("pr_items").update(row).eq("id", id) : await sb.from("pr_items").insert({
      ...row,
      period_id: periodId,
      employee_id: eid
    });`,
  },
  {
    name: "always-nothing-saved",
    why: "a part-saved week is reported as 'Nothing was saved', so the officer re-enters rows that are already in the database",
    from: `const before = written === 0 ? " Nothing was saved."`,
    to: `const before = true ? " Nothing was saved."`,
  },
  // ---- lock freeze ----
  {
    name: "drop-locked-guard",
    why: "a locked week is editable again — the original bug",
    from: `if (per.status === "locked") return {
    ok: false,
    error: "This payroll period is locked and cannot be edited. Ask the superadmin to unlock it first."
  };`,
    to: "",
  },
  {
    name: "drop-notfound-guard/save",
    in: "_supaSaveItems",
    why: "a period whose lock state is unknown gets written as if it were unlocked",
    from: `if (!per) return {
    ok: false,
    error: "This payroll period no longer exists. Reload the page and try again."
  };`,
    to: "",
  },
  {
    name: "drop-notfound-guard/unlock",
    in: "_supaUnlock",
    why: "unlock reports success against a period that no longer exists",
    from: `if (!per) return {
    ok: false,
    error: "This payroll period no longer exists. Reload the page and try again."
  };`,
    to: "",
  },
  // ---- unlock ----
  {
    name: "drop-owner-gate",
    why: "anyone, not just the superadmin, can unlock a week",
    from: `if (!ME || ME.role !== "owner") return {
    ok: false,
    error: "Only the superadmin can unlock a payroll period."
  };`,
    to: "",
  },
  {
    name: "drop-islocked-gate",
    why: "unlocking a DRAFT week publishes it — notifying employees about a week nobody has finished",
    from: `if (per.status !== "locked") return {
    ok: false,
    error: "This payroll period is not locked."
  };`,
    to: "",
  },
  {
    name: "unlock-to-draft",
    why: "unlock resurrects Publish & notify, and re-publishing wipes every approval the lock protected",
    from: `await sb.from("pr_periods").update({
    status: "published"
  }).eq("id", periodId)`,
    to: `await sb.from("pr_periods").update({
    status: "draft"
  }).eq("id", periodId)`,
  },
  // ---- money ----
  {
    name: "leave-type-null-to-zero",
    why: "a null leave_type_id is written as 0, pointing the row at leave type #0",
    from: `out.leave_type_id = it.leave_type_id == null ? null : Number(it.leave_type_id);`,
    to: `out.leave_type_id = prNum(it.leave_type_id);`,
  },
  {
    name: "drop-installment-deductions",
    why: "net is computed without the deductions pr_apply_plans owns — every employee is overpaid by their loan balance",
    from: `    ded_loan: db.ded_loan,`,
    to: `    ded_loan: 0,`,
  },
  {
    name: "always-sunday-duty",
    why: "a schedule-B employee banks a Sunday the screen shows as ₱0",
    from: `const sundayRest = db.snap_sunday_rest != null ? db.snap_sunday_rest : sched.sunday_is_restday != null ? sched.sunday_is_restday : 1;`,
    to: `const sundayRest = 1;`,
  },
  {
    name: "local-time-stamp",
    why: "updated_at is written as local time with no zone; Postgres reads it as UTC and lands the row 8 hours off",
    from: `const stamp = new Date().toISOString();`,
    to: `const stamp = _stamp();`,
  },
];

const APP = process.argv[2] || "app.js";
const src = readFileSync(APP, "utf8");
const tally = (out) => { const m = /(\d+) passed, (\d+) failed/.exec(out || ""); return m ? { passed: +m[1], failed: +m[2] } : null; };

// The slice of the built file a mutation is allowed to touch. Babel puts top-level functions at
// column 0, so the next "\n}\n" closes them.
const regionOf = (fn) => {
  const start = src.indexOf(`async function ${fn}(`);
  if (start === -1) return null;
  const end = src.indexOf("\n}\n", start);
  return end === -1 ? null : { start, end: end + 3 };
};
// Returns { hits, mutated } — mutated is the whole file with the patch applied in scope.
const applyMutation = (m) => {
  const r = m.in ? regionOf(m.in) : { start: 0, end: src.length };
  if (!r) return { hits: 0, mutated: null, note: `could not find function ${m.in}` };
  const scope = src.slice(r.start, r.end);
  const hits = scope.split(m.from).length - 1;
  if (hits !== 1) return { hits, mutated: null };
  return { hits, mutated: src.slice(0, r.start) + scope.replace(m.from, m.to) + src.slice(r.end) };
};

console.log(`\nmutation check — ${MUTATIONS.length} mutations against ${APP}`);
console.log("  each one must make the suite go RED\n");

let survived = 0, didNotApply = 0;
for (const m of MUTATIONS) {
  const { hits, mutated, note } = applyMutation(m);
  if (!mutated) {
    didNotApply++;
    console.log(`  DID NOT APPLY  ${m.name}`);
    console.log(`                 ${note || `pattern matched ${hits} times in ${m.in || "app.js"}, expected 1`} — the code moved; rebuild and update the pattern`);
    continue;
  }
  const tmp = join(tmpdir(), `tt-mutant-${m.name.replace(/[^\w.-]/g, "_")}.js`);
  writeFileSync(tmp, mutated, "utf8");
  let out = "", green = false;
  try {
    out = execFileSync("node", ["tests/test-payroll.mjs", tmp], { encoding: "utf8", stdio: "pipe" });
    green = true;                       // exit 0 = the suite still passed = the mutation lived
  } catch (e) {
    out = String((e.stdout || "") + (e.stderr || ""));
  }
  try { unlinkSync(tmp); } catch (e) {}
  const t = tally(out);
  if (green || !t || t.failed === 0) {
    survived++;
    console.log(`  SURVIVED       ${m.name}`);
    console.log(`                 nothing failed. Unprotected: ${m.why}`);
  } else {
    console.log(`  killed (${String(t.failed).padStart(2)})    ${m.name}`);
  }
}

const bad = survived + didNotApply;
console.log(`\n${MUTATIONS.length - bad}/${MUTATIONS.length} mutations killed`
  + (survived ? `, ${survived} SURVIVED` : "")
  + (didNotApply ? `, ${didNotApply} did not apply` : "") + "\n");
if (didNotApply) console.log("A pattern that does not apply proves nothing — fix it before trusting this run.\n");
process.exit(bad ? (didNotApply ? 2 : 1) : 0);
