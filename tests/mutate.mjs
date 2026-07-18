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
    // Scoped because _supaPublish writes the identical statement to the identical table. Without
    // `in`, this matches twice and the harness refuses it — correctly. Anchoring on a neighbouring
    // comment instead would rot the moment either function is edited.
    in: "_supaUnlock",
    why: "unlock resurrects Publish & notify, and re-publishing wipes every approval the lock protected",
    from: `await sb.from("pr_periods").update({
    status: "published"
  }).eq("id", periodId)`,
    to: `await sb.from("pr_periods").update({
    status: "draft"
  }).eq("id", periodId)`,
  },
  // ---- publish (pr_publish) ----
  // Two writes, no transaction. Every mutation here is about the gap between them.
  {
    name: "publish-period-before-items",
    // THE ordering guard. Items-first is the only safety available without a transaction, so a
    // silent reordering has to be caught by something. This flips the period BEFORE the lines
    // move, which is exactly the bug the order exists to prevent.
    in: "_supaPublish",
    why: "the period publishes before its lines move, so a refused items write leaves employees a payslip they cannot approve while the officer sees a published week",
    from: `  const {
    data: hitItems,
    error: itemsErr
  } = await sb.from("pr_items").update({
    status: "pending"
  }).eq("period_id", periodId).select("id");`,
    to: `  await sb.from("pr_periods").update({
    status: "published"
  }).eq("id", periodId).select("id");
  const {
    data: hitItems,
    error: itemsErr
  } = await sb.from("pr_items").update({
    status: "pending"
  }).eq("period_id", periodId).select("id");`,
  },
  {
    name: "drop-publish-role-gate",
    why: "an ineligible account sets every line to 'pending' and only THEN gets refused on the period — notifying every employee about a week that never published",
    from: `  if (!ME || ME.role !== "owner" && ME.role !== "payroll") {
    return {
      ok: false,
      error: "Only the superadmin or the payroll officer can publish a week."
    };
  }
`,
    to: "",
  },
  {
    name: "drop-publish-draft-guard",
    why: "publishing an already-published week resets every approved line to 'pending', silently wiping approvals employees already gave",
    from: `  if (per.status !== "draft") {`,
    to: `  if (false) {`,
  },
  {
    name: "drop-publish-empty-guard",
    why: "a week with no pay lines publishes, and zero-rows can no longer tell a refusal from an empty week",
    from: `  if (!expected) return {
    ok: false,
    error: "This week has no pay lines to publish. Add employees to the week and save it first."
  };
`,
    to: "",
  },
  {
    name: "drop-publish-items-error",
    // Deleting this looks harmless: itemsErr leaves data null, so `moved` is 0 and the zero-rows
    // guard below still refuses. What is lost is WHY — the officer stops being told what Postgres
    // said and gets a generic "may not have permission" for what could be any error at all.
    in: "_supaPublish",
    why: "a raised error on the lines is swallowed and reported as a permission problem, whatever it actually was",
    from: `  if (itemsErr) return {
    ok: false,
    error: "Publish stopped — the database refused to update this week's pay lines: " + itemsErr.message + " The week was NOT published."
  };
`,
    to: "",
  },
  {
    name: "drop-publish-items-zerorows",
    // Shadowed by `moved < expected` (expected is >= 1 by the empty-week guard), so dropping this
    // still refuses — with a message claiming 0 of N lines landed "before the database refused the
    // rest". It survived until the test asserted the total-refusal wording, which is the point:
    // the guard is about telling the truth, not about stopping the write.
    why: "a total refusal is reported as a partial one, telling the officer some lines landed when none did",
    from: `  if (!moved) return {
    ok: false,
    error: "Publish stopped — the database refused to update this week's pay lines. Your account may not have permission. The week was NOT published and nothing changed."
  };
`,
    to: "",
  },
  {
    name: "drop-publish-period-error",
    // The live branch for pr_periods: a WITH CHECK violation RAISES 42501 rather than hiding the
    // row, so this `if (error)` is what fires in production and !hit.length never does.
    in: "_supaPublish",
    why: "a 42501 on the period flip is swallowed and the officer is told the week published when it did not",
    from: `  if (error) {
    return {
      ok: false,
      error: (error.code === "42501" ? "You don't have permission to publish this week." : "Publishing the week failed: " + error.message) + stranded
    };
  }
`,
    to: "",
  },
  // ---- lock (pr_lock) ----
  {
    name: "drop-lock-published-guard",
    in: "_supaLock",
    why: "a draft week locks — frozen final before any employee has seen it, and unlockable only back to 'published', which would publish it by accident",
    from: `  if (per.status !== "published") {`,
    to: `  if (false) {`,
  },
  {
    name: "drop-lock-all-approved-guard",
    // The reason this handler exists. Without it Lock is just a status flip.
    in: "_supaLock",
    why: "a week locks with lines still pending or contested — frozen with nobody having agreed to them, and the employee's Approve button already gone",
    from: `  if (pending || contested || other) {`,
    to: `  if (false) {`,
  },
  {
    name: "drop-lock-empty-guard",
    in: "_supaLock",
    why: "a week with no pay lines locks, because zero not-approved lines reads the same as zero lines",
    from: `  if (!rows.length) return {
    ok: false,
    error: "This week has no pay lines to lock."
  };
`,
    to: "",
  },
  {
    name: "drop-lock-zerorows",
    in: "_supaLock",
    why: "a silently refused lock reports 'Week locked' while the week stays published",
    from: `  if (!hit || !hit.length) return {
    ok: false,
    error: "Locking the week was refused — your account may not have permission. The week is still published."
  };
`,
    to: "",
  },
  {
    name: "lock-ignores-contested",
    // The subtle version of dropping the guard: pending still blocks, so most of the suite stays
    // green and only an open dispute slips through.
    in: "_supaLock",
    why: "a contested line no longer blocks the lock, freezing an open dispute with no way to answer it short of an owner unlock",
    from: `  const contested = rows.filter(r => r.status === "contested").length;`,
    to: `  const contested = 0;`,
  },
  // ---- create / delete period (pr_save_period / pr_delete_period) ----
  {
    name: "create-status-from-client",
    // The forced 'draft' is the guard, and it has to WIN over anything the payload carries — a
    // create asking to be born 'published' would skip the every-line-approved gate _supaLock
    // enforces. Reading p.status is exactly the mistake the literal exists to prevent. (Note the
    // whitelist in _prPeriodFields is a second line of defence — this proves the forced literal is
    // load-bearing on its own, not resting on the whitelist.)
    in: "_supaSavePeriod",
    why: "a crafted create payload publishes a week on insert, skipping the review-and-lock lifecycle entirely",
    from: `    status: "draft"
  }).select("id");`,
    to: `    status: p.status || "draft"
  }).select("id");`,
  },
  {
    name: "drop-delete-locked-guard",
    in: "_supaDeletePeriod",
    why: "a locked week can be deleted, erasing approved payslips — and its lines are removed on the way to finding out RLS would have refused the period",
    from: `  if (per.status === "locked") return {
    ok: false,
    error: "A locked week can't be deleted. Unlock it first (owner only)."
  };
`,
    to: "",
  },
  {
    name: "delete-skips-items",
    // The items delete and every honest-failure check around it live in one `if (expected)` block.
    // Neutralise its guard and the period is deleted with its lines never removed — the orphan the
    // whole items-first order exists to prevent. The strongest form of "no ordering": there is no
    // items delete left to be ordered against. `expected` stays declared for the stranded line.
    in: "_supaDeletePeriod",
    why: "the period is deleted without removing its lines first, orphaning every pay row on a week that no longer exists",
    from: `  if (expected) {`,
    to: `  if (false) {`,
  },
  {
    name: "drop-delete-items-zerorows",
    // Shadowed by `removed < expected` (removed is 0 and expected is >= 1 in this block), so
    // dropping it still refuses — with a message claiming "0 of N removed before the rest",
    // implying a partial that never happened. It survived until the test asserted the total-refusal
    // wording. The guard is about telling the truth, same as drop-publish-items-zerorows.
    in: "_supaDeletePeriod",
    why: "a total refusal on the items delete is reported as a partial one, telling the officer some lines went when none did",
    from: `    if (!removed) return {
      ok: false,
      error: "Delete stopped — the database refused to remove this week's pay lines. Your account may not have permission. The week was NOT deleted and nothing changed."
    };
`,
    to: "",
  },
  // ---- the review pair (pr_item_approve / pr_item_contest) ----
  // The four guards live in _prReviewGate, which BOTH actions run, so each mutation here is a
  // single edit that both handlers' tests get a shot at.
  {
    name: "drop-review-published-guard",
    in: "_prReviewGate",
    why: "a locked week's un-approved line can still be approved — the freeze the lock exists for does not reach the review buttons",
    from: `  if (per.status !== "published") return {
    error: "This week isn't open for review right now."
  };
`,
    to: "",
  },
  {
    name: "drop-review-pending-guard",
    in: "_prReviewGate",
    why: "an employee un-approves a decided line by approving it again, or re-contests one the officer already answered",
    from: `  if (it.status !== "pending") return {
    error: "This line has already been reviewed."
  };
`,
    to: "",
  },
  {
    name: "drop-review-ownrow-check",
    // The app-level half of own-row. RLS does not enforce this yet (Piece C), so with this gone
    // there is nothing at all between a technician and everyone else's payslip.
    in: "_prReviewGate",
    why: "any employee approves or contests anybody else's payslip — and RLS does not stop it either",
    from: `  if (!officer) {
    const myId = await _prMyEmployeeId(sb);
    if (myId == null || Number(it.employee_id) !== myId) return {
      error: "You can only review your own payslip."
    };
  }
`,
    to: "",
  },
  {
    name: "drop-approve-zerorows",
    in: "_supaItemApprove",
    why: "a silently refused approve reports 'Payslip approved' over a write that never happened",
    from: `  if (!hit || !hit.length) return {
    ok: false,
    error: "Approving this payslip was refused by the database. Nothing changed."
  };
`,
    to: "",
  },
  {
    name: "drop-contest-zerorows",
    in: "_supaItemContest",
    why: "a silently refused contest reports 'Sent to the payroll office' and the discrepancy is never recorded",
    from: `  if (!hit || !hit.length) return {
    ok: false,
    error: "The database refused to record this discrepancy. Nothing changed."
  };
`,
    to: "",
  },
  {
    name: "approve-local-time-stamp",
    // Same trap as updated_at on the save: the column is timestamptz and _stamp() is a local-time
    // display string, so Postgres reads it as UTC and the payslip says it was approved 8 hours
    // before it was.
    in: "_supaItemApprove",
    why: "approved_at is written as local time with no zone; the card then shows the wrong approval date",
    from: `    approved_at: new Date().toISOString()`,
    to: `    approved_at: _stamp()`,
  },
  {
    name: "contest-writes-pending",
    in: "_supaItemContest",
    why: "a contested line reads as merely pending, so it never reaches the officer's 'Needs your attention' list and the discrepancy is silently dropped",
    from: `    status: "contested",`,
    to: `    status: "pending",`,
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
  // ---- pr_item_reply ---- (all scoped: the zero-rows and return shapes repeat in approve/contest)
  {
    name: "drop-reply-contested-guard",
    why: "reply reopens a settled line — a pending or approved payslip can be reset to pending by 'replying' to it",
    in: "_supaItemReply",
    from: `if (it.status !== "contested") return {
    ok: false,
    error: "You can only reply to a contested line."
  };`,
    to: "",
  },
  {
    name: "drop-reply-reset-pending",
    why: "a reply stores the officer's text but leaves the line 'contested' — the employee is never asked to re-approve, so the discrepancy never closes",
    in: "_supaItemReply",
    from: `.update({
    officer_reply: reply,
    status: "pending"
  })`,
    to: `.update({
    officer_reply: reply
  })`,
  },
  {
    name: "drop-reply-officer-gate",
    why: "an ordinary employee can write officer_reply on their own line and reset it to pending — RLS does not stop them, so this app check is the only guard",
    in: "_supaItemReply",
    from: `if (!officer) return {
    ok: false,
    error: "Only the payroll office can reply."
  };`,
    to: "",
  },
  {
    name: "drop-reply-zerorows",
    why: "a reply silently refused by RLS (200 + []) reports 'Reply sent' — the line stays contested but the officer is told it reopened",
    in: "_supaItemReply",
    from: `if (!hit || !hit.length) return {
    ok: false,
    error: "Sending this reply was refused by the database. Nothing changed."
  };`,
    to: "",
  },
  // ---- pr_request_print / pr_mark_printed (the print pair) ----
  {
    name: "drop-request-own-or-officer",
    why: "any employee can flag a hard-copy request on ANYBODY's payslip — the own-line/officer check is gone",
    in: "_supaRequestPrint",
    from: `if (myId == null || Number(it.employee_id) !== myId) return {
      ok: false,
      error: "You can only request a hard copy of your own payslip."
    };`,
    to: "",
  },
  {
    name: "drop-request-locked-guard",
    why: "a hard-copy request is accepted on a locked week — the app offers a write RLS will 42501, and the button lies to the employee",
    in: "_supaRequestPrint",
    from: `if (per.status === "locked") return {
    ok: false,
    error: "This week is locked; hard-copy requests are made before it's locked."
  };`,
    to: "",
  },
  {
    name: "drop-markprinted-owner-only-on-locked",
    why: "payroll is let through to mark a LOCKED week printed — RLS then 42501s the write, but the app thought it was allowed",
    in: "_supaMarkPrinted",
    from: `if (!isOwner && !(isPayroll && per.status !== "locked")) {`,
    to: `if (!isOwner && !(isPayroll && true)) {`,
  },
  {
    name: "drop-markprinted-zerorows",
    why: "a mark-printed silently refused by RLS (200 + []) reports success — the payslip is recorded printed when the write never landed",
    in: "_supaMarkPrinted",
    from: `if (!hit || !hit.length) return {
    ok: false,
    error: "Marking this printed was refused by the database. Nothing changed."
  };`,
    to: "",
  },
  // ---- pr_set_dayoff ---- (pr_employees is wide-open at the DB level, so the app check is the only guard)
  {
    name: "drop-dayoff-permission",
    why: "any employee can change anybody's rest day — pr_employees has a permissive UPDATE policy, so with this gone nothing restricts the write",
    in: "_supaSetDayoff",
    from: `if (!officer) return {
    ok: false,
    error: "Only the payroll office can change a rest day."
  };`,
    to: "",
  },
  {
    name: "drop-dayoff-zerorows",
    why: "a rest-day change silently refused (200 + []) reports success — the grid shows the new day off but the database never took it",
    in: "_supaSetDayoff",
    from: `if (!hit || !hit.length) return {
    ok: false,
    error: "Changing the rest day was refused by the database. Nothing changed."
  };`,
    to: "",
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
