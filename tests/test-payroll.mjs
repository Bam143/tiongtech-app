// Payroll suite — pr_save_items against the Supabase-shaped fake.
//
// Every payload below is the real one: saveGrid (app.jsx:4575) is pr_save_items' only caller,
// so its exact 13-column item shape is what these tests send. Where a test asserts a column is
// ABSENT, that is the point of the test — pr_items has 41 columns and Save owns 12 of them,
// plus gross/net.
//
//   npm test                          — run against the committed app.js
//   node tests/test-payroll.mjs X.js  — run against some other build (used for mutation checks)
import { loadApp, makeFakeSB, makeSuite } from "./harness.mjs";

const APP_JS = process.argv[2] || "app.js";   // relative to the repo root, where npm runs
const { API, window, prCalc, setME, getME } = loadApp(APP_JS);
const t = makeSuite("payroll / pr_save_items + pr_unlock");

// One grid row exactly as saveGrid builds it (app.jsx:4577-4580).
const gridItem = (over = {}) => ({
  employee_id: 5, per_day: 500, att_present: 6, att_absent: 0, att_leave: 0, att_halfday: 0,
  leave_type_id: null, ot_hours: 3, sun_days: 1, add_incentive: 250,
  ded_manual: 100, ded_manual_note: "tardy", remarks: "ok", ...over,
});
// keep_ids rides along on every real Save (app.jsx:4581); included so the tests exercise the
// payload the screen actually sends, not a trimmed one.
const savePayload = (periodId, items) => ({ period_id: periodId, items, keep_ids: items.map((i) => i.employee_id) });

// `rows` is pr_items unless a test needs other tables too, in which case it passes a table map.
// Every save now checks the period's lock state before anything else, so the fake gets an
// unlocked week by default — the lock tests below override pr_periods to say otherwise.
const run = async (rows, payload, opts) => {
  const tables = Array.isArray(rows) ? { pr_items: rows } : { ...rows };
  if (!tables.pr_periods) tables.pr_periods = [{ id: 3, status: "draft" }];
  const sb = makeFakeSB(tables, opts);
  window.SB = sb;
  const res = await API("pr_save_items", payload);
  return { sb, res };
};
const writes = (sb) => sb.calls.filter((c) => c.op === "update" || c.op === "insert");

console.log(`\n${t.results.name}`);

await t.test("existing row UPDATEs pr_items by the id found for (period_id, employee_id)", async () => {
  const { sb, res } = await run(
    [{ id: 77, employee_id: 5, period_id: 3 }],
    savePayload(3, [gridItem()]),
  );
  t.eq(res.ok, true, "save ok");
  // Not calls[0] — the lock check reads pr_periods first.
  const read = sb.calls.find((c) => c.op === "select" && c.table === "pr_items");
  t.ok(read, "reads pr_items to resolve ids");
  t.eq(read.filters.period_id, 3, "scoped to the period being saved");
  const w = writes(sb);
  t.eq(w.length, 1, "one write");
  t.eq(w[0].op, "update", "existing row updates");
  t.eq(w[0].table, "pr_items", "table");
  t.eq(w[0].filters.id, 77, "targets the id the read resolved, not the employee_id");
});

await t.test("UPDATE carries the coerced numeric fields", async () => {
  // Strings are what a text input yields; the DB columns must still get real numbers.
  const { sb } = await run(
    [{ id: 77, employee_id: 5, period_id: 3 }],
    savePayload(3, [gridItem({ per_day: "500.5", att_present: "6", ot_hours: "3", add_incentive: "250", ded_manual: "100", sun_days: "1" })]),
  );
  const row = writes(sb)[0].row;
  t.eq(row.per_day, 500.5, "per_day is a number");
  t.eq(row.att_present, 6, "att_present is a number");
  t.eq(row.ot_hours, 3, "ot_hours is a number");
  t.eq(row.add_incentive, 250, "add_incentive is a number");
  t.eq(row.ded_manual, 100, "ded_manual is a number");
  t.eq(row.sun_days, 1, "sun_days is a number");
  t.eq(row.ded_manual_note, "tardy", "note is a string");
  t.eq(row.remarks, "ok", "remarks is a string");
});

await t.test("garbage in a money field coerces to 0, never NaN", async () => {
  const { sb } = await run(
    [{ id: 77, employee_id: 5, period_id: 3 }],
    savePayload(3, [gridItem({ per_day: "abc", ded_manual: undefined })]),
  );
  const row = writes(sb)[0].row;
  t.eq(row.per_day, 0, "NaN becomes 0, matching prNum (app.jsx:3878)");
  t.ok(!("ded_manual" in row), "a field the payload omitted is not written at all");
});

await t.test("draft row (no pr_items record) INSERTs with the right period_id + employee_id", async () => {
  const { sb, res } = await run([], savePayload(3, [gridItem({ employee_id: 9 })]));
  t.eq(res.ok, true, "save ok");
  const w = writes(sb);
  t.eq(w.length, 1, "one write");
  t.eq(w[0].op, "insert", "draft row inserts");
  t.eq(w[0].table, "pr_items", "table");
  t.eq(w[0].row.period_id, 3, "period_id from the payload envelope");
  t.eq(w[0].row.employee_id, 9, "employee_id from the item");
});

await t.test("a Save sends the whole grid: existing and draft rows in one call", async () => {
  // saveGrid maps the entire grid every time, so a mixed batch is the normal case.
  const { sb } = await run(
    [{ id: 77, employee_id: 5, period_id: 3 }],
    savePayload(3, [gridItem({ employee_id: 5 }), gridItem({ employee_id: 9 }), gridItem({ employee_id: 12 })]),
  );
  const w = writes(sb);
  t.eq(w.length, 3, "three rows written");
  t.eq(w[0].op, "update", "the one with a row updates");
  t.eq(w[0].filters.id, 77, "by its id");
  t.eq(w[1].op, "insert", "the drafts insert");
  t.eq(w[2].op, "insert", "the drafts insert");
  t.eq(w[1].row.employee_id, 9, "insert keeps its employee");
  t.eq(w[2].row.employee_id, 12, "insert keeps its employee");
});

await t.test("ids coerce: a string employee_id still matches the existing row", async () => {
  const { sb } = await run(
    [{ id: 77, employee_id: 5, period_id: 3 }],
    { period_id: "3", items: [gridItem({ employee_id: "5" })], keep_ids: ["5"] },
  );
  const w = writes(sb);
  t.eq(w[0].op, "update", "string ids still resolve to an update, not a duplicate insert");
  t.eq(w[0].filters.id, 77, "matched the right row");
});

await t.test("leave_type_id stays null — never 0", async () => {
  // saveGrid hardcodes leave_type_id: null (app.jsx:4579). Number(null) is 0, which would
  // point the row at leave type #0.
  const { sb } = await run([{ id: 77, employee_id: 5, period_id: 3 }], savePayload(3, [gridItem()]));
  const row = writes(sb)[0].row;
  t.eq(row.leave_type_id, null, "null survives as null");
  t.ok(row.leave_type_id !== 0, "and is not 0");
});

await t.test("null snapshot fields stay null through a save (never 0)", async () => {
  // Save does not send snap_*, so the columns must not appear in the write at all — an
  // existing NULL stays NULL, and the read path (app.jsx:3888/3891) keeps falling back to
  // the live schedule instead of reading a zeroed working-day count.
  const { sb } = await run(
    [{ id: 77, employee_id: 5, period_id: 3, snap_working_days: null, snap_sunday_rest: null, snap_schedule_id: null }],
    savePayload(3, [gridItem({ snap_working_days: null, snap_sunday_rest: null, snap_schedule_id: null })]),
  );
  for (const c of ["snap_working_days", "snap_sunday_rest", "snap_schedule_id"]) {
    t.ok(!(c in writes(sb)[0].row), `${c} is not written, so its NULL cannot become 0`);
  }
});

await t.test("Save does not write status or approved_at", async () => {
  // Save must not approve. Neither column is in the payload, so neither may be in the write.
  const { sb } = await run([{ id: 77, employee_id: 5, period_id: 3 }], savePayload(3, [gridItem()]));
  const row = writes(sb)[0].row;
  for (const c of ["status", "approved_at"]) t.ok(!(c in row), `${c} untouched by Save`);
});

await t.test("Save writes status/approved_at only if the payload carries them (it never does)", async () => {
  // Belt and braces: even handed those columns, the whitelist drops them.
  const { sb } = await run(
    [{ id: 77, employee_id: 5, period_id: 3 }],
    savePayload(3, [gridItem({ status: "approved", approved_at: "2026-07-17 10:00" })]),
  );
  const row = writes(sb)[0].row;
  t.ok(!("status" in row), "status dropped even when present in the item");
  t.ok(!("approved_at" in row), "approved_at dropped even when present in the item");
});

await t.test("Save does not clobber the columns other flows own", async () => {
  // pr_apply_plans owns the deduction columns, approval owns the remarks, printing owns the
  // flags. None are in the Save payload, so none may be written. (gross/net are the one
  // deliberate exception and are covered separately below.)
  const { sb } = await run([{ id: 77, employee_id: 5, period_id: 3 }], savePayload(3, [gridItem()]));
  const row = writes(sb)[0].row;
  const owned = ["ded_loan", "ded_uniform", "ded_gov", "ded_coop", "ded_tshirt", "ded_ca", "ded_fines",
    "ded_excess", "ded_notes", "employee_remark", "officer_reply", "printed", "print_requested",
    "days_present", "leave_paid", "add_ot", "add_sunday", "add_other"];
  for (const c of owned) t.ok(!(c in row), `${c} untouched by Save`);
});

await t.test("the write is exactly the 12 payload columns + gross + net + updated_at", async () => {
  const { sb } = await run([{ id: 77, employee_id: 5, period_id: 3 }], savePayload(3, [gridItem()]));
  const got = Object.keys(writes(sb)[0].row).sort();
  const want = ["add_incentive", "att_absent", "att_halfday", "att_leave", "att_present", "ded_manual",
    "ded_manual_note", "gross", "leave_type_id", "net", "ot_hours", "per_day", "remarks", "sun_days",
    "updated_at"].sort();
  t.eq(got.join(","), want.join(","), "column set");
});

// ---- gross / net ----

await t.test("stored gross/net equal prCalc's output for known inputs", async () => {
  // Hardcoded so a change to prCalc's formula shows up here as well as in the cross-check
  // below: 6 days x 500 = 3000 regular, 3h OT at 500/8 x 1.15 = 216, 1 Sunday = 500,
  // 250 incentive -> 3966 gross; 100 manual deduction -> 3866 net.
  const { sb } = await run([{ id: 77, employee_id: 5, period_id: 3 }], savePayload(3, [gridItem()]));
  const row = writes(sb)[0].row;
  t.eq(row.gross, 3966, "gross");
  t.eq(row.net, 3866, "net");
});

await t.test("stored gross/net match what the screen renders for the same row", async () => {
  // The real cross-check: the adapter rebuilds prCalc's inputs from payload + DB, the screen
  // builds them from the grid row (app.jsx:4526-4542). Both must land on the same money.
  const dbRow = { id: 77, employee_id: 5, period_id: 3, ded_loan: 200, ded_uniform: 50, ded_gov: 30, snap_sunday_rest: 1 };
  const { sb } = await run([dbRow], savePayload(3, [gridItem()]));
  const row = writes(sb)[0].row;
  const asScreenSeesIt = prCalc({
    ...gridItem(), ded_loan: 200, ded_uniform: 50, ded_gov: 30, snap_sunday_rest: 1, leave_paid: 0,
  });
  t.eq(row.gross, asScreenSeesIt.gross, "gross matches the screen");
  t.eq(row.net, asScreenSeesIt.net, "net matches the screen");
});

await t.test("net includes the deductions pr_apply_plans owns, not just ded_manual", async () => {
  // The trap: those columns are not in the Save payload. Computing net from the payload alone
  // would overpay by loan + uniform + gov.
  const { sb } = await run(
    [{ id: 77, employee_id: 5, period_id: 3, ded_loan: 200, ded_uniform: 50, ded_gov: 30 }],
    savePayload(3, [gridItem()]),
  );
  const row = writes(sb)[0].row;
  t.eq(row.gross, 3966, "gross unchanged by deductions");
  t.eq(row.net, 3966 - (200 + 50 + 30 + 100), "net = gross - loan - uniform - gov - manual");
  t.ok(row.net !== 3866, "and is NOT the payload-only net that ignores the installments");
});

await t.test("a schedule-B employee (no Sunday rest day) banks no Sunday pay", async () => {
  // The other trap: snap_sunday_rest is not in the payload either. A draft row has no
  // snapshot, so Sunday duty comes off the employee's schedule (app.jsx:4520/4530).
  const { sb } = await run(
    { pr_items: [], pr_employees: [{ id: 9, schedule_id: 2 }], pr_schedules: [{ id: 2, sunday_is_restday: 0 }] },
    savePayload(3, [gridItem({ employee_id: 9 })]),
  );
  const row = writes(sb)[0].row;
  t.eq(row.gross, 3466, "gross excludes the 500 Sunday the payload's sun_days=1 would imply");
  t.eq(row.net, 3366, "net follows");
});

await t.test("the row's own snapshot beats the employee's schedule for Sunday duty", async () => {
  // Same precedence as prSundayRest (app.jsx:3888): a snapshotted week is authoritative.
  const { sb } = await run(
    { pr_items: [{ id: 77, employee_id: 5, period_id: 3, snap_sunday_rest: 0 }],
      pr_employees: [{ id: 5, schedule_id: 1 }], pr_schedules: [{ id: 1, sunday_is_restday: 1 }] },
    savePayload(3, [gridItem()]),
  );
  t.eq(writes(sb)[0].row.gross, 3466, "the row's snap_sunday_rest=0 wins over the schedule's 1");
});

await t.test("gross/net are written on INSERT too, not just UPDATE", async () => {
  const { sb } = await run([], savePayload(3, [gridItem({ employee_id: 9 })]));
  const row = writes(sb)[0].row;
  t.eq(writes(sb)[0].op, "insert", "it is an insert");
  t.eq(row.gross, 3966, "gross stored on insert");
  t.eq(row.net, 3866, "net stored on insert");
});

// ---- updated_at ----

await t.test("updated_at is a UTC instant, not a local-time string", async () => {
  // The column is timestamptz. _stamp() (app.jsx:647) yields "2026-07-17 14:30" — no zone —
  // which Postgres reads as UTC and lands 8 hours off in PH.
  const before = Date.now();
  const { sb } = await run([{ id: 77, employee_id: 5, period_id: 3 }], savePayload(3, [gridItem()]));
  const stamp = writes(sb)[0].row.updated_at;
  t.ok(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(stamp), `ISO-8601 UTC, got ${stamp}`);
  const ms = Date.parse(stamp);
  t.ok(ms >= before - 1000 && ms <= Date.now() + 1000, "and it is now, within a second");
});

await t.test("every row in one Save shares a single timestamp", async () => {
  const { sb } = await run([], savePayload(3, [gridItem({ employee_id: 9 }), gridItem({ employee_id: 12 })]));
  const w = writes(sb);
  t.eq(w[0].row.updated_at, w[1].row.updated_at, "one Save, one instant");
});

await t.test("keep_ids does not delete anything (deferred to a later part)", async () => {
  // Employee 8 has a row but is NOT in keep_ids — the officer removed them from the grid.
  // Until api.php's delete guards are known, that removal must not touch the database.
  const { sb } = await run(
    [{ id: 77, employee_id: 5, period_id: 3 }, { id: 88, employee_id: 8, period_id: 3 }],
    savePayload(3, [gridItem({ employee_id: 5 })]),
  );
  t.ok(!sb.calls.some((c) => c.op === "delete"), "no delete is issued");
  t.eq(writes(sb).length, 1, "only the saved row is written; employee 8's row is left alone");
});

await t.test("a missing period_id is refused before any write", async () => {
  const { sb, res } = await run([], { items: [gridItem()], keep_ids: [5] });
  t.eq(res.ok, false, "refused");
  t.eq(sb.calls.length, 0, "nothing touched the database");
});

// ---- lock freeze ----
// A locked week is frozen for everyone. The grid disables its inputs, but this is the layer
// that actually enforces it, because a caller can always skip the buttons.

await t.test("saving a LOCKED period is refused and writes NOTHING", async () => {
  const { sb, res } = await run(
    { pr_items: [{ id: 77, employee_id: 5, period_id: 3 }], pr_periods: [{ id: 3, status: "locked" }] },
    savePayload(3, [gridItem()]),
  );
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "This payroll period is locked and cannot be edited. Ask the superadmin to unlock it first.", "message");
  t.eq(writes(sb).length, 0, "ZERO inserts or updates");
  t.ok(!sb.calls.some((c) => c.table === "pr_items" && c.op !== "select"), "pr_items was never written");
});

await t.test("the lock check runs BEFORE anything reads or writes pr_items", async () => {
  // Order matters: a locked week must cost one lookup and stop, not read the roster first.
  const { sb } = await run(
    { pr_items: [{ id: 77, employee_id: 5, period_id: 3 }], pr_periods: [{ id: 3, status: "locked" }] },
    savePayload(3, [gridItem()]),
  );
  t.eq(sb.calls.length, 1, "exactly one call");
  t.eq(sb.calls[0].table, "pr_periods", "and it is the lock lookup");
  t.eq(sb.calls[0].filters.id, 3, "for the period being saved");
});

await t.test("a locked period refuses every row, not just the first", async () => {
  const { sb, res } = await run(
    { pr_items: [], pr_periods: [{ id: 3, status: "locked" }] },
    savePayload(3, [gridItem({ employee_id: 5 }), gridItem({ employee_id: 9 }), gridItem({ employee_id: 12 })]),
  );
  t.eq(res.ok, false, "refused");
  t.eq(writes(sb).length, 0, "no row slipped through");
});

await t.test("an unknown period is refused too — unknown must not read as unlocked", async () => {
  const { sb, res } = await run(
    { pr_items: [], pr_periods: [] },   // the week was deleted mid-edit, or the id is wrong
    savePayload(3, [gridItem()]),
  );
  t.eq(res.ok, false, "refused");
  t.ok(/no longer exists/.test(res.error), `explains itself, got: ${res.error}`);
  t.eq(writes(sb).length, 0, "nothing written");
});

await t.test("a draft period still saves exactly as before (regression)", async () => {
  const { sb, res } = await run(
    { pr_items: [{ id: 77, employee_id: 5, period_id: 3 }], pr_periods: [{ id: 3, status: "draft" }] },
    savePayload(3, [gridItem()]),
  );
  t.eq(res.ok, true, "saved");
  t.eq(writes(sb).length, 1, "one write");
  t.eq(writes(sb)[0].op, "update", "still an update");
  t.eq(writes(sb)[0].filters.id, 77, "still by the resolved id");
  t.eq(writes(sb)[0].row.gross, 3966, "still stores gross");
});

await t.test("a published (not locked) period still saves — only 'locked' freezes", async () => {
  // Publishing does not freeze a week; only locking does. Guarding on "not draft" would
  // silently break every post-publish correction.
  const { sb, res } = await run(
    { pr_items: [{ id: 77, employee_id: 5, period_id: 3 }], pr_periods: [{ id: 3, status: "published" }] },
    savePayload(3, [gridItem()]),
  );
  t.eq(res.ok, true, "saved");
  t.eq(writes(sb).length, 1, "one write");
});

// ---- pr_unlock (superadmin only) ----
// NB: this gate is an affordance, not a security boundary. It runs in the browser and RLS
// currently lets any signed-in user write pr_periods, so these tests prove the app behaves —
// not that anyone is actually prevented. Real enforcement is an RLS policy on pr_periods.

const unlock = async (periods, payload, role, opts) => {
  const was = getME();
  if (role !== undefined) setME({ ...was, role });
  try {
    const sb = makeFakeSB({ pr_periods: periods }, opts);
    window.SB = sb;
    const res = await API("pr_unlock", payload);
    return { sb, res };
  } finally { setME(was); }   // ME is global; a leak here would silently re-role later tests
};

await t.test("the owner unlocks a locked period back to 'published'", async () => {
  const { sb, res } = await unlock([{ id: 3, status: "locked" }], { id: 3 }, "owner");
  t.eq(res.ok, true, "unlocked");
  const w = sb.calls.filter((c) => c.op === "update");
  t.eq(w.length, 1, "one update");
  t.eq(w[0].table, "pr_periods", "on pr_periods");
  t.eq(w[0].filters.id, 3, "the right period");
  t.eq(w[0].row.status, "published", "back to published — the state 'locked' came from");
});

await t.test("unlock does NOT return the week to 'draft'", async () => {
  // 'draft' would bring back Publish & notify, and re-publishing would reset every approved
  // line to pending — silently wiping the approvals the lock was protecting.
  const { sb } = await unlock([{ id: 3, status: "locked" }], { id: 3 }, "owner");
  t.ok(sb.calls.filter((c) => c.op === "update")[0].row.status !== "draft", "never draft");
});

await t.test("unlock touches status and nothing else", async () => {
  // published_at records when the week was published; unlocking is not a re-publish.
  const { sb } = await unlock([{ id: 3, status: "locked" }], { id: 3 }, "owner");
  const row = sb.calls.filter((c) => c.op === "update")[0].row;
  t.eq(Object.keys(row).join(","), "status", "only status is written");
});

await t.test("a NON-owner is refused and writes nothing", async () => {
  for (const role of ["payroll", "admin", "technician", "cfo"]) {
    const { sb, res } = await unlock([{ id: 3, status: "locked" }], { id: 3 }, role);
    t.eq(res.ok, false, `${role} refused`);
    t.eq(res.error, "Only the superadmin can unlock a payroll period.", `${role} message`);
    t.eq(sb.calls.length, 0, `${role} touched nothing — refused before the lookup`);
  }
});

await t.test("unlocking a DRAFT period is refused — it must not publish it", async () => {
  // The dangerous case: writing 'published' blindly would notify employees about a week
  // nobody has finished.
  const { sb, res } = await unlock([{ id: 3, status: "draft" }], { id: 3 }, "owner");
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "This payroll period is not locked.", "message");
  t.eq(sb.calls.filter((c) => c.op === "update").length, 0, "the draft was NOT published");
});

await t.test("unlocking an already-published period is refused", async () => {
  const { sb, res } = await unlock([{ id: 3, status: "published" }], { id: 3 }, "owner");
  t.eq(res.ok, false, "refused");
  t.eq(sb.calls.filter((c) => c.op === "update").length, 0, "nothing written");
});

await t.test("unlocking an unknown period is refused", async () => {
  const { sb, res } = await unlock([], { id: 3 }, "owner");
  t.eq(res.ok, false, "refused");
  t.ok(/no longer exists/.test(res.error), `explains itself, got: ${res.error}`);
  t.eq(sb.calls.filter((c) => c.op === "update").length, 0, "nothing written");
});

await t.test("unlock with no id is refused before any lookup", async () => {
  const { sb, res } = await unlock([{ id: 3, status: "locked" }], {}, "owner");
  t.eq(res.ok, false, "refused");
  t.eq(sb.calls.length, 0, "nothing touched");
});

await t.test("an unlocked week can be saved again — the freeze lifts", async () => {
  // The round trip that matters: unlock returns 'published', and 'published' saves.
  const { res: unlockRes } = await unlock([{ id: 3, status: "locked" }], { id: 3 }, "owner");
  t.eq(unlockRes.ok, true, "unlocked");
  const { sb, res } = await run(
    { pr_items: [{ id: 77, employee_id: 5, period_id: 3 }], pr_periods: [{ id: 3, status: "published" }] },
    savePayload(3, [gridItem()]),
  );
  t.eq(res.ok, true, "and now the save goes through");
  t.eq(writes(sb).length, 1, "one row written");
});

// ---- a blocked write must never report success ----
// An RLS USING policy hides the row instead of raising: PostgREST answers 200 with an empty
// array and no error. The live RLS test confirmed that is exactly what the real database does.
// So `if (error)` alone would flash "Saved ✓" over a write that never landed.

await t.test("a silently blocked UPDATE fails the save — no false 'Saved'", async () => {
  const { res } = await run(
    { pr_items: [{ id: 77, employee_id: 5, period_id: 3 }], pr_employees: [{ id: 5, full_name: "Ana Cruz" }] },
    savePayload(3, [gridItem()]),
    { blockWrites: "pr_items" },
  );
  t.eq(res.ok, false, "the save reports failure");
  t.ok(/Ana Cruz/.test(res.error), `names the row that stopped it, got: ${res.error}`);
  t.ok(/refused|permission|locked/i.test(res.error), "explains why it might have been refused");
});

await t.test("a silently blocked INSERT fails the save too", async () => {
  const { res } = await run(
    { pr_items: [], pr_employees: [{ id: 9, full_name: "Ben Reyes" }] },
    savePayload(3, [gridItem({ employee_id: 9 })]),
    { blockWrites: "pr_items" },
  );
  t.eq(res.ok, false, "the save reports failure");
  t.ok(/Ben Reyes/.test(res.error), `names the row, got: ${res.error}`);
});

await t.test("the writes ask for the affected rows back", async () => {
  // The mechanism, pinned: without a select() on the write there is nothing to count, and the
  // block is undetectable no matter what the caller checks.
  const { sb } = await run([{ id: 77, employee_id: 5, period_id: 3 }], savePayload(3, [gridItem()]));
  t.eq(writes(sb)[0].cols, "id", "the update selects the affected rows back");
  const { sb: sb2 } = await run([], savePayload(3, [gridItem({ employee_id: 9 })]));
  t.eq(writes(sb2)[0].cols, "id", "so does the insert");
});

await t.test("a block on the FIRST row says nothing was saved", async () => {
  const { res } = await run(
    { pr_items: [], pr_employees: [{ id: 5, full_name: "Ana Cruz" }, { id: 9, full_name: "Ben Reyes" }] },
    savePayload(3, [gridItem({ employee_id: 5 }), gridItem({ employee_id: 9 })]),
    { blockWrites: (table, n) => n === 1 },
  );
  t.eq(res.ok, false, "refused");
  t.ok(/Ana Cruz/.test(res.error), "names the first row");
  t.ok(/Nothing was saved/.test(res.error), `and says so, got: ${res.error}`);
});

await t.test("a block MID-loop admits the week is part-saved", async () => {
  // There is no transaction around the loop, so the rows before the block really are in the
  // database. Telling the officer "nothing was saved" would send them re-entering work that is
  // already there — on payroll that is how a week gets paid twice.
  const { sb, res } = await run(
    { pr_items: [], pr_employees: [{ id: 5, full_name: "Ana Cruz" }, { id: 9, full_name: "Ben Reyes" }, { id: 12, full_name: "Cy Dizon" }] },
    savePayload(3, [gridItem({ employee_id: 5 }), gridItem({ employee_id: 9 }), gridItem({ employee_id: 12 })]),
    { blockWrites: (table, n) => n === 2 },
  );
  t.eq(res.ok, false, "refused");
  t.ok(/Ben Reyes/.test(res.error), `names the row that stopped it, got: ${res.error}`);
  t.ok(/part-saved/.test(res.error), "admits the week is part-saved");
  t.ok(!/Nothing was saved/.test(res.error), "does NOT claim nothing was saved");
  t.eq(writes(sb).length, 2, "and it stopped there — the third row was never attempted");
});

await t.test("a row with no full_name still names itself", async () => {
  const { res } = await run(
    { pr_items: [], pr_employees: [] },
    savePayload(3, [gridItem({ employee_id: 9 })]),
    { blockWrites: "pr_items" },
  );
  t.ok(/employee #9/.test(res.error), `falls back to the id, got: ${res.error}`);
});

await t.test("a normal save is unaffected — still ok:true, all rows written", async () => {
  // The regression that matters: the new check must not turn working saves into failures.
  const { sb, res } = await run(
    { pr_items: [{ id: 77, employee_id: 5, period_id: 3 }] },
    savePayload(3, [gridItem({ employee_id: 5 }), gridItem({ employee_id: 9 })]),
  );
  t.eq(res.ok, true, "still succeeds");
  t.eq(res.error, undefined, "no error");
  t.eq(writes(sb).length, 2, "both rows written");
  t.eq(writes(sb)[0].op, "update", "update still an update");
  t.eq(writes(sb)[1].op, "insert", "insert still an insert");
  t.eq(writes(sb)[0].row.gross, 3966, "gross still computed and stored");
});

await t.test("a silently blocked UNLOCK reports failure, not 'Week unlocked'", async () => {
  // Not hypothetical: the owner-only policy about to land on pr_periods is exactly the shape
  // that would hide this row from a non-owner's update.
  const { res } = await unlock([{ id: 3, status: "locked" }], { id: 3 }, "owner", { blockWrites: "pr_periods" });
  t.eq(res.ok, false, "reports failure");
  t.ok(/still locked/.test(res.error), `says the week is still locked, got: ${res.error}`);
});

await t.test("a normal unlock is unaffected — still ok:true", async () => {
  const { res } = await unlock([{ id: 3, status: "locked" }], { id: 3 }, "owner");
  t.eq(res.ok, true, "still succeeds");
});

// ---- the other payroll writes must still fall through ----
/* ---------- pr_publish ---------- */
// Publish is two writes with no transaction around them, so most of what matters here is what
// happens when the second one is refused after the first has landed.

const PUB_ITEMS = [
  { id: 71, period_id: 3, employee_id: 5, status: "approved" },   // a prior approval, to be reset
  { id: 72, period_id: 3, employee_id: 6, status: null },
  { id: 73, period_id: 4, employee_id: 5, status: null },         // another week — must not move
];
const publish = async (periods, items, payload, role, opts) => {
  const was = getME();
  if (role !== undefined) setME({ ...was, role });
  try {
    const sb = makeFakeSB({ pr_periods: periods, pr_items: items }, opts);
    window.SB = sb;
    const res = await API("pr_publish", payload);
    return { sb, res };
  } finally { setME(was); }   // ME is global; a leak here would silently re-role later tests
};
const draft = [{ id: 3, status: "draft" }];
const pubWrites = (sb) => sb.calls.filter((c) => c.op === "update");

await t.test("publish sets every line to 'pending' AND flips the period to 'published'", async () => {
  const { sb, res } = await publish(draft, PUB_ITEMS, { id: 3 }, "owner");
  t.eq(res.ok, true, `published, got: ${res.error}`);
  const w = pubWrites(sb);
  t.eq(w.length, 2, "exactly two writes");
  t.eq(w[0].table, "pr_items", "first write is the lines");
  t.eq(w[0].row.status, "pending", "lines go to pending — Awaiting Review");
  t.eq(w[0].filters.period_id, 3, "scoped to this week only");
  t.eq(w[1].table, "pr_periods", "second write is the period");
  t.eq(w[1].row.status, "published", "period is published");
  t.eq(w[1].filters.id, 3, "the right period");
});

await t.test("the items write comes FIRST — the period must never publish before its lines move", async () => {
  // The ordering is the only safety available: there is no transaction, so if the lines are
  // refused the period must not already say 'published'.
  const { sb } = await publish(draft, PUB_ITEMS, { id: 3 }, "owner");
  const w = pubWrites(sb);
  t.ok(w.findIndex((c) => c.table === "pr_items") < w.findIndex((c) => c.table === "pr_periods"), "items before period");
});

await t.test("publish writes status and nothing else on either table", async () => {
  const { sb } = await publish(draft, PUB_ITEMS, { id: 3 }, "owner");
  const w = pubWrites(sb);
  t.eq(Object.keys(w[0].row).join(","), "status", "pr_items: only status");
  // published_at is a real column (app.jsx:680) and nothing in the UI reads it. Stamping it was
  // not asked for; if that changes, change this test deliberately.
  t.eq(Object.keys(w[1].row).join(","), "status", "pr_periods: only status");
});

await t.test("a prior approval is reset — republishing means everyone reviews again", async () => {
  const { sb } = await publish(draft, PUB_ITEMS, { id: 3 }, "owner");
  const w = pubWrites(sb).find((c) => c.table === "pr_items");
  t.eq(w.row.status, "pending", "the approved line is sent back to pending");
  t.ok(!("employee_remark" in w.row) && !("approved_at" in w.row), "and nothing else on the line is touched");
});

await t.test("the payroll officer may publish; the owner may publish", async () => {
  for (const role of ["owner", "payroll"]) {
    const { res } = await publish(draft, PUB_ITEMS, { id: 3 }, role);
    t.eq(res.ok, true, `${role} published, got: ${res.error}`);
  }
});

await t.test("everyone else is refused and writes NOTHING — not even the lines", async () => {
  // The point of refusing before the first write: the two writes are not atomic, so an account
  // that will be refused on the period must never move the lines first. Otherwise every employee
  // is notified about a week that never published.
  for (const role of ["admin", "technician", "cfo", "admin_officer"]) {
    const { sb, res } = await publish(draft, PUB_ITEMS, { id: 3 }, role);
    t.eq(res.ok, false, `${role} refused`);
    t.eq(res.error, "Only the superadmin or the payroll officer can publish a week.", `${role} message`);
    t.eq(sb.calls.length, 0, `${role} touched nothing at all`);
  }
});

await t.test("publishing an already-published week is refused — it would wipe the approvals", async () => {
  const { sb, res } = await publish([{ id: 3, status: "published" }], PUB_ITEMS, { id: 3 }, "owner");
  t.eq(res.ok, false, "refused");
  t.ok(/already published/.test(res.error), `explains itself, got: ${res.error}`);
  t.eq(pubWrites(sb).length, 0, "no approval was reset");
});

await t.test("publishing a LOCKED week is refused", async () => {
  const { sb, res } = await publish([{ id: 3, status: "locked" }], PUB_ITEMS, { id: 3 }, "owner");
  t.eq(res.ok, false, "refused");
  t.eq(pubWrites(sb).length, 0, "nothing written");
});

await t.test("publishing an unknown week is refused", async () => {
  const { sb, res } = await publish([], PUB_ITEMS, { id: 3 }, "owner");
  t.eq(res.ok, false, "refused");
  t.ok(/no longer exists/.test(res.error), `explains itself, got: ${res.error}`);
  t.eq(pubWrites(sb).length, 0, "nothing written");
});

await t.test("publish with no id is refused before any lookup", async () => {
  const { sb, res } = await publish(draft, PUB_ITEMS, {}, "owner");
  t.eq(res.ok, false, "refused");
  t.eq(sb.calls.length, 0, "nothing touched");
});

await t.test("a week with no pay lines is refused rather than published empty", async () => {
  // Zero rows from the items UPDATE is ambiguous — refused, or nothing to update? Counting first
  // is what makes the refusal check below mean something.
  const { sb, res } = await publish(draft, [{ id: 73, period_id: 4, employee_id: 5 }], { id: 3 }, "owner");
  t.eq(res.ok, false, "refused");
  t.ok(/no pay lines/.test(res.error), `explains itself, got: ${res.error}`);
  t.eq(pubWrites(sb).length, 0, "the empty week was NOT published");
});

await t.test("lines refused SILENTLY (USING policy, 200 + []) — the week does not publish", async () => {
  const { sb, res } = await publish(draft, PUB_ITEMS, { id: 3 }, "owner", { blockWrites: "pr_items" });
  t.eq(res.ok, false, "refused");
  t.ok(/NOT published/.test(res.error), `says the week did not publish, got: ${res.error}`);
  t.eq(pubWrites(sb).filter((c) => c.table === "pr_periods").length, 0, "the period never flipped");
  // "nothing changed", NOT the partial message. Asserting only /NOT published/ here let the
  // mutation that deletes this guard survive: with it gone, `moved < expected` catches the same
  // case and also says "NOT published" — but it says "0 of 2 lines were set before the database
  // refused the REST", which claims a partial write that never happened. Total refusal is the
  // ordinary way RLS says no, and it has to read as total.
  t.ok(/nothing changed/.test(res.error), `a total refusal reads as total, not partial, got: ${res.error}`);
});

await t.test("lines refused with 42501 — the week does not publish", async () => {
  const { sb, res } = await publish(draft, PUB_ITEMS, { id: 3 }, "owner", { errorWrites: "pr_items" });
  t.eq(res.ok, false, "refused");
  t.ok(/NOT published/.test(res.error), `says the week did not publish, got: ${res.error}`);
  t.eq(pubWrites(sb).filter((c) => c.table === "pr_periods").length, 0, "the period never flipped");
  // Same trap as above: a raise and a silent refusal both end in "NOT published", so without
  // surfacing what Postgres actually said, deleting the `if (itemsErr)` branch changes nothing a
  // test can see. The database's own words are the only thing that separates the two.
  t.ok(/new row violates/.test(res.error), `surfaces what the database actually said, got: ${res.error}`);
});

await t.test("period flip refused with 42501 — reported as permission, and says the lines already moved", async () => {
  // The live branch for pr_periods: Piece B v2 refuses via WITH CHECK, which RAISES rather than
  // hiding the row, so `error` fires and !hit.length never does (tests/rls-live.mjs case 5).
  const { sb, res } = await publish(draft, PUB_ITEMS, { id: 3 }, "payroll", { errorWrites: "pr_periods" });
  t.eq(res.ok, false, "refused");
  t.ok(/don't have permission/.test(res.error), `names the cause, got: ${res.error}`);
  // The honest half: the lines DID move, and the officer is told so rather than left to assume
  // the publish simply didn't happen.
  t.ok(/already set to Awaiting Review/.test(res.error), `admits the lines moved, got: ${res.error}`);
  t.eq(pubWrites(sb).filter((c) => c.table === "pr_items").length, 1, "the lines were written before the refusal");
});

await t.test("period flip refused SILENTLY (0 rows) — still a failure, never a false success", async () => {
  const { res } = await publish(draft, PUB_ITEMS, { id: 3 }, "payroll", { blockWrites: "pr_periods" });
  t.eq(res.ok, false, "refused — not reported as published");
  t.ok(/already set to Awaiting Review/.test(res.error), `admits the lines moved, got: ${res.error}`);
});

/* ---------- pr_item_approve / pr_item_contest ---------- */
// The employee's two buttons, and the officer's new single-row Approve. Both actions run the same
// gate (_prReviewGate), so most of these bite on either handler; where a test names one, it is
// because only that one writes the column in question.

const REV_ITEMS = [
  { id: 71, period_id: 9, employee_id: 5, status: "pending" },    // mine
  { id: 72, period_id: 9, employee_id: 6, status: "pending" },    // somebody else's
  { id: 73, period_id: 9, employee_id: 5, status: "approved" },   // mine, already decided
  { id: 74, period_id: 9, employee_id: 5, status: "contested" },  // mine, already decided
];
const PUBLISHED = [{ id: 9, status: "published" }];
// role + pr_employee_id together are the caller: employee 5 is "me" unless a test says otherwise.
const review = async (action, payload, { role = "technician", empId = 5, periods = PUBLISHED, items = REV_ITEMS, opts } = {}) => {
  const was = getME();
  setME({ ...was, role, pr_employee_id: empId });
  try {
    const sb = makeFakeSB({ pr_items: items, pr_periods: periods }, opts);
    window.SB = sb;
    const res = await API(action, payload);
    return { sb, res };
  } finally { setME(was); }   // ME is global; a leak here would silently re-role later tests
};
const revWrites = (sb) => sb.calls.filter((c) => c.op === "update");

await t.test("an employee approves their OWN pending line on a published week", async () => {
  const { sb, res } = await review("pr_item_approve", { id: 71 });
  t.eq(res.ok, true, `approved, got: ${res.error}`);
  const w = revWrites(sb);
  t.eq(w.length, 1, "one write");
  t.eq(w[0].table, "pr_items", "on pr_items");
  t.eq(w[0].filters.id, 71, "the right line");
  t.eq(w[0].row.status, "approved", "status");
});

await t.test("approve stamps approved_at as a real UTC instant", async () => {
  // The card renders "Approved on <date>" by slicing this (app.jsx:5214); a local-time string
  // would be read as UTC by Postgres and land the row 8 hours off in PH.
  const { sb } = await review("pr_item_approve", { id: 71 });
  const row = revWrites(sb)[0].row;
  t.ok(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/.test(row.approved_at), `ISO UTC, got: ${JSON.stringify(row.approved_at)}`);
  t.eq(Object.keys(row).sort().join(","), "approved_at,status", "approve owns exactly these two columns");
});

await t.test("an employee contests their OWN pending line, and the message is stored", async () => {
  const { sb, res } = await review("pr_item_contest", { id: 71, remark: "OT for Sunday 06/28 is missing." });
  t.eq(res.ok, true, `contested, got: ${res.error}`);
  const row = revWrites(sb)[0].row;
  t.eq(row.status, "contested", "status — not 'pending'; the officer's grid keys off 'contested'");
  // The UI sends `remark`; the column is employee_remark (app.jsx:4844 reads it back).
  t.eq(row.employee_remark, "OT for Sunday 06/28 is missing.", "the message lands in employee_remark");
  t.eq(Object.keys(row).sort().join(","), "employee_remark,status", "contest owns exactly these two — approved_at is left alone");
});

await t.test("contest with an empty message is refused before any lookup", async () => {
  const { sb, res } = await review("pr_item_contest", { id: 71, remark: "   " });
  t.eq(res.ok, false, "refused");
  t.eq(sb.calls.length, 0, "nothing touched");
});

await t.test("an employee may NOT approve somebody else's line", async () => {
  const { sb, res } = await review("pr_item_approve", { id: 72 });   // employee 6's row; I am 5
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "You can only review your own payslip.", "message");
  t.eq(revWrites(sb).length, 0, "nothing written");
});

await t.test("an employee may NOT contest somebody else's line either", async () => {
  const { sb, res } = await review("pr_item_contest", { id: 72, remark: "not mine" });
  t.eq(res.ok, false, "refused");
  t.eq(revWrites(sb).length, 0, "nothing written");
});

await t.test("an employee with no payroll link may not review anything", async () => {
  const { sb, res } = await review("pr_item_approve", { id: 71 }, { empId: null });
  t.eq(res.ok, false, "refused — a null employee id must never match a row");
  t.eq(revWrites(sb).length, 0, "nothing written");
});

await t.test("the owner and the payroll officer may approve ANY line", async () => {
  for (const role of ["owner", "payroll"]) {
    // empId null on purpose: the officer path must not depend on having a payroll row at all.
    const { sb, res } = await review("pr_item_approve", { id: 72 }, { role, empId: null });
    t.eq(res.ok, true, `${role} approved somebody else's line, got: ${res.error}`);
    t.eq(revWrites(sb)[0].filters.id, 72, `${role} hit the right line`);
  }
});

await t.test("nobody reviews a line on a DRAFT week", async () => {
  for (const role of ["technician", "owner", "payroll"]) {
    const { sb, res } = await review("pr_item_approve", { id: 71 }, { role, periods: [{ id: 9, status: "draft" }] });
    t.eq(res.ok, false, `${role} refused`);
    t.eq(res.error, "This week isn't open for review right now.", `${role} message`);
    t.eq(revWrites(sb).length, 0, `${role} wrote nothing`);
  }
});

await t.test("nobody reviews a line on a LOCKED week", async () => {
  // The gap this closes: SalaryPage used to render Approve off the item status alone, so a locked
  // week's un-approved line offered a button that worked.
  const { sb, res } = await review("pr_item_approve", { id: 71 }, { periods: [{ id: 9, status: "locked" }] });
  t.eq(res.ok, false, "refused");
  t.eq(revWrites(sb).length, 0, "nothing written");
});

await t.test("an employee cannot UN-approve — an approved line is decided", async () => {
  const { sb, res } = await review("pr_item_approve", { id: 73 });
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "This line has already been reviewed.", "message");
  t.eq(revWrites(sb).length, 0, "nothing written");
});

await t.test("a contested line cannot be re-contested or approved around", async () => {
  for (const [action, payload] of [["pr_item_approve", { id: 74 }], ["pr_item_contest", { id: 74, remark: "again" }]]) {
    const { sb, res } = await review(action, payload);
    t.eq(res.ok, false, `${action} refused on a contested line`);
    t.eq(revWrites(sb).length, 0, `${action} wrote nothing`);
  }
});

await t.test("not even the officer can un-approve through this path", async () => {
  // Single-row approve only, deliberately. Reversing an approval is the Reply / resolve flow.
  const { sb, res } = await review("pr_item_approve", { id: 73 }, { role: "payroll", empId: null });
  t.eq(res.ok, false, "refused");
  t.eq(revWrites(sb).length, 0, "nothing written");
});

await t.test("reviewing a line that no longer exists is refused", async () => {
  const { sb, res } = await review("pr_item_approve", { id: 999 });
  t.eq(res.ok, false, "refused");
  t.ok(/no longer exists/.test(res.error), `explains itself, got: ${res.error}`);
  t.eq(revWrites(sb).length, 0, "nothing written");
});

await t.test("review with no id is refused before any lookup", async () => {
  const { sb, res } = await review("pr_item_approve", {});
  t.eq(res.ok, false, "refused");
  t.eq(sb.calls.length, 0, "nothing touched");
});

await t.test("a silently refused approve (USING policy, 200 + []) is not a false success", async () => {
  const { res } = await review("pr_item_approve", { id: 71 }, { opts: { blockWrites: "pr_items" } });
  t.eq(res.ok, false, "refused — never 'Payslip approved' over a write that never happened");
  t.ok(/Nothing changed/.test(res.error), `says so plainly, got: ${res.error}`);
});

await t.test("an approve refused with 42501 surfaces what the database said", async () => {
  const { res } = await review("pr_item_approve", { id: 71 }, { opts: { errorWrites: "pr_items" } });
  t.eq(res.ok, false, "refused");
  t.ok(/new row violates/.test(res.error), `the database's own words reach the employee, got: ${res.error}`);
});

await t.test("a silently refused contest is not a false 'Sent to the payroll office'", async () => {
  const { res } = await review("pr_item_contest", { id: 71, remark: "wrong OT" }, { opts: { blockWrites: "pr_items" } });
  t.eq(res.ok, false, "refused");
  t.ok(/Nothing changed/.test(res.error), `says so plainly, got: ${res.error}`);
});

await t.test("a contest refused with 42501 surfaces what the database said", async () => {
  const { res } = await review("pr_item_contest", { id: 71, remark: "wrong OT" }, { opts: { errorWrites: "pr_items" } });
  t.eq(res.ok, false, "refused");
  t.ok(/new row violates/.test(res.error), `got: ${res.error}`);
});

/* ---------- pr_item_reply ---------- */
// The officer's answer to a contested line. It stores the reply AND resets the line to 'pending'
// so the employee reviews again. Item 74 is the contested line in REV_ITEMS. empId is null on the
// officer cases on purpose: the reply path must not depend on the officer having a payroll row.

await t.test("the officer replies to a contested line — reply stored and the line resets to pending", async () => {
  const { sb, res } = await review("pr_item_reply", { id: 74, reply: "Fixed the OT for 06/28 — please review again." }, { role: "payroll", empId: null });
  t.eq(res.ok, true, `replied, got: ${res.error}`);
  const w = revWrites(sb);
  t.eq(w.length, 1, "one write");
  t.eq(w[0].table, "pr_items", "on pr_items");
  t.eq(w[0].filters.id, 74, "the right line");
  t.eq(w[0].row.officer_reply, "Fixed the OT for 06/28 — please review again.", "reply lands in officer_reply");
  t.eq(w[0].row.status, "pending", "and the line resets to 'pending' for re-approval — not left 'contested'");
  t.eq(Object.keys(w[0].row).sort().join(","), "officer_reply,status", "reply owns exactly these two columns — approved_at/deductions untouched");
});

await t.test("the owner may reply too, and the reply is trimmed", async () => {
  const { sb, res } = await review("pr_item_reply", { id: 74, reply: "   Adjusted.  " }, { role: "owner", empId: null });
  t.eq(res.ok, true, `owner replied, got: ${res.error}`);
  t.eq(revWrites(sb)[0].row.officer_reply, "Adjusted.", "surrounding whitespace stripped before storing");
});

await t.test("a blank reply is refused before any lookup", async () => {
  const { sb, res } = await review("pr_item_reply", { id: 74, reply: "   " }, { role: "payroll", empId: null });
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "Please write a reply before sending.", "message");
  t.eq(sb.calls.length, 0, "nothing touched — not even a read");
});

await t.test("you can only reply to a CONTESTED line, not a pending or approved one", async () => {
  for (const id of [71 /* pending */, 73 /* approved */]) {
    const { sb, res } = await review("pr_item_reply", { id, reply: "trying" }, { role: "payroll", empId: null });
    t.eq(res.ok, false, `refused on line ${id}`);
    t.eq(res.error, "You can only reply to a contested line.", `message for ${id}`);
    t.eq(revWrites(sb).length, 0, `nothing written for ${id}`);
  }
});

await t.test("an ordinary employee may NOT reply, even on their own contested line", async () => {
  // Line 74 is employee 5's own contested line, and I am employee 5 — so only the officer gate
  // stands between them and a self-serve reply. RLS does not stop them writing their own row's
  // officer_reply, which is exactly why this app check is the one that matters.
  const { sb, res } = await review("pr_item_reply", { id: 74, reply: "let me just fix this myself" }, { role: "technician", empId: 5 });
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "Only the payroll office can reply.", "message");
  t.eq(revWrites(sb).length, 0, "nothing written");
});

await t.test("no reply on a LOCKED week — a locked line must not be reopened this way", async () => {
  const { sb, res } = await review("pr_item_reply", { id: 74, reply: "reopening" }, { role: "payroll", empId: null, periods: [{ id: 9, status: "locked" }] });
  t.eq(res.ok, false, "refused");
  t.ok(/locked/.test(res.error), `explains itself, got: ${res.error}`);
  t.eq(revWrites(sb).length, 0, "nothing written");
});

await t.test("replying to a line that no longer exists is refused", async () => {
  const { sb, res } = await review("pr_item_reply", { id: 999, reply: "hello?" }, { role: "payroll", empId: null });
  t.eq(res.ok, false, "refused");
  t.ok(/no longer exists/.test(res.error), `explains itself, got: ${res.error}`);
  t.eq(revWrites(sb).length, 0, "nothing written");
});

await t.test("a silently refused reply (USING policy, 200 + []) is not a false success", async () => {
  const { res } = await review("pr_item_reply", { id: 74, reply: "fixed" }, { role: "payroll", empId: null, opts: { blockWrites: "pr_items" } });
  t.eq(res.ok, false, "refused — never 'Reply sent' over a write that never happened");
  t.ok(/Nothing changed/.test(res.error), `says so plainly, got: ${res.error}`);
});

await t.test("a reply refused with 42501 surfaces what the database said", async () => {
  const { res } = await review("pr_item_reply", { id: 74, reply: "fixed" }, { role: "payroll", empId: null, opts: { errorWrites: "pr_items" } });
  t.eq(res.ok, false, "refused");
  t.ok(/new row violates/.test(res.error), `the database's own words reach the officer, got: ${res.error}`);
});

/* ---------- pr_request_print / pr_mark_printed (the print pair) ---------- */
// Two single-flag writes kept in lockstep with RLS Piece A. Item status does NOT gate either one:
// line 71 is pending, 73 approved, 74 contested, and all may be printed. The review helper carries
// role + pr_employee_id (employee 5 is "me"), the item set and the period status, which is all
// these need. LOCKED is passed as [{ id: 9, status: "locked" }] where a test wants the frozen case.
const LOCKED9 = [{ id: 9, status: "locked" }];

await t.test("request print: the row's OWN employee, on a non-locked week", async () => {
  const { sb, res } = await review("pr_request_print", { id: 71 }, { role: "technician", empId: 5 }); // line 71 is employee 5's, pending
  t.eq(res.ok, true, `requested, got: ${res.error}`);
  const w = revWrites(sb);
  t.eq(w.length, 1, "one write");
  t.eq(w[0].table, "pr_items", "on pr_items");
  t.eq(w[0].filters.id, 71, "the right line");
  t.eq(w[0].row.print_requested, 1, "print_requested set to 1 (smallint, not boolean true — PostgREST would reject true)");
  t.eq(Object.keys(w[0].row).sort().join(","), "print_requested", "request owns exactly this one column");
});

await t.test("request print: an officer may request on anybody's line", async () => {
  // empId null: the officer path must not need a payroll row. Line 72 is employee 6's.
  for (const role of ["owner", "payroll"]) {
    const { sb, res } = await review("pr_request_print", { id: 72 }, { role, empId: null });
    t.eq(res.ok, true, `${role} requested, got: ${res.error}`);
    t.eq(revWrites(sb)[0].row.print_requested, 1, `${role} set the flag to 1`);
  }
});

await t.test("request print: a DIFFERENT employee (not own, not officer) is refused", async () => {
  const { sb, res } = await review("pr_request_print", { id: 72 }, { role: "technician", empId: 5 }); // line 72 is employee 6's; I am 5
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "You can only request a hard copy of your own payslip.", "message");
  t.eq(revWrites(sb).length, 0, "nothing written");
});

await t.test("request print: refused on a LOCKED week (pre-lock only)", async () => {
  const { sb, res } = await review("pr_request_print", { id: 71 }, { role: "technician", empId: 5, periods: LOCKED9 });
  t.eq(res.ok, false, "refused");
  t.ok(/locked/.test(res.error), `explains itself, got: ${res.error}`);
  t.eq(revWrites(sb).length, 0, "nothing written");
});

await t.test("mark printed: owner or payroll on a non-locked week", async () => {
  for (const role of ["owner", "payroll"]) {
    const { sb, res } = await review("pr_mark_printed", { id: 71 }, { role, empId: null });
    t.eq(res.ok, true, `${role} marked printed, got: ${res.error}`);
    const w = revWrites(sb);
    t.eq(w.length, 1, `${role}: one write`);
    t.eq(w[0].row.printed, 1, `${role}: printed set to 1 (smallint)`);
    t.eq(Object.keys(w[0].row).sort().join(","), "printed", `${role}: mark owns exactly this one column`);
  }
});

await t.test("mark printed: the OWNER may mark a LOCKED week printed (owner override)", async () => {
  const { sb, res } = await review("pr_mark_printed", { id: 71 }, { role: "owner", empId: null, periods: LOCKED9 });
  t.eq(res.ok, true, `owner marked a locked line, got: ${res.error}`);
  t.eq(revWrites(sb)[0].row.printed, 1, "printed set to 1 (smallint)");
});

await t.test("mark printed: PAYROLL is refused on a LOCKED week (owner-only there, matching RLS)", async () => {
  const { sb, res } = await review("pr_mark_printed", { id: 71 }, { role: "payroll", empId: null, periods: LOCKED9 });
  t.eq(res.ok, false, "refused");
  t.ok(/only the superadmin/.test(res.error), `names the real cause, got: ${res.error}`);
  t.eq(revWrites(sb).length, 0, "nothing written — refused before the write, not left to 42501");
});

await t.test("mark printed: a plain employee is refused", async () => {
  const { sb, res } = await review("pr_mark_printed", { id: 71 }, { role: "technician", empId: 5 });
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "Only the payroll office can mark a payslip printed.", "message");
  t.eq(revWrites(sb).length, 0, "nothing written");
});

await t.test("print pair: a line's status does not matter — an approved and a contested line both print", async () => {
  for (const id of [73 /* approved */, 74 /* contested */]) {
    const { res } = await review("pr_mark_printed", { id }, { role: "owner", empId: null });
    t.eq(res.ok, true, `line ${id} printed regardless of status, got: ${res.error}`);
  }
});

await t.test("request print: a silent refusal (200 + []) is an honest failure", async () => {
  const { res } = await review("pr_request_print", { id: 71 }, { role: "technician", empId: 5, opts: { blockWrites: "pr_items" } });
  t.eq(res.ok, false, "refused — never 'request sent' over a write that never happened");
  t.ok(/Nothing changed/.test(res.error), `says so plainly, got: ${res.error}`);
});

await t.test("mark printed: a silent refusal (200 + []) is an honest failure", async () => {
  const { res } = await review("pr_mark_printed", { id: 71 }, { role: "owner", empId: null, opts: { blockWrites: "pr_items" } });
  t.eq(res.ok, false, "refused — never 'marked printed' over a write that never happened");
  t.ok(/Nothing changed/.test(res.error), `says so plainly, got: ${res.error}`);
});

await t.test("mark printed: a payroll 42501 on the write is explained as superadmin-only", async () => {
  // The belt-and-suspenders path: even if a payroll user reached the write on a locked row, the
  // 42501 comes back named for what it is, not as raw policy text.
  const { res } = await review("pr_mark_printed", { id: 71 }, { role: "payroll", empId: null, opts: { errorWrites: "pr_items" } });
  t.eq(res.ok, false, "refused");
  t.ok(/only the superadmin/.test(res.error), `names the real cause, got: ${res.error}`);
});

/* ---------- pr_set_dayoff ---------- */
// Day-off is a pure label on pr_employees (everyone works six days; the seventh is OT). It writes
// pr_employees.day_off and nothing else — no pr_items, no recompute. pr_employees carries a
// permissive UPDATE policy at the DB level (a live probe showed an ordinary technician can write
// day_off), so the owner/payroll check below is the ONLY thing restricting it — which is exactly why
// it has a test that bites. The control only ever sends "sun" or "sat".
const dayoff = async (payload, { role = "technician", opts } = {}) => {
  const was = getME();
  setME({ ...was, role });
  try {
    const sb = makeFakeSB({ pr_employees: [{ id: 28, day_off: null }] }, opts);
    window.SB = sb;
    const res = await API("pr_set_dayoff", payload);
    return { sb, res };
  } finally { setME(was); }
};
const empWrites = (sb) => sb.calls.filter((c) => c.op === "update");

await t.test("day-off: the owner sets a rest day — only day_off is written, on pr_employees", async () => {
  const { sb, res } = await dayoff({ employee_id: 28, day_off: "sat" }, { role: "owner" });
  t.eq(res.ok, true, `set, got: ${res.error}`);
  const w = empWrites(sb);
  t.eq(w.length, 1, "one write");
  t.eq(w[0].table, "pr_employees", "on pr_employees — not pr_items");
  t.eq(w[0].filters.id, 28, "the right employee");
  t.eq(w[0].row.day_off, "sat", "day_off written");
  t.eq(Object.keys(w[0].row).sort().join(","), "day_off", "owns exactly this one column — no recompute, no pay columns");
});

await t.test("day-off: the payroll officer may set a rest day too", async () => {
  const { sb, res } = await dayoff({ employee_id: 28, day_off: "sun" }, { role: "payroll" });
  t.eq(res.ok, true, `set, got: ${res.error}`);
  t.eq(empWrites(sb)[0].row.day_off, "sun", "day_off written");
});

await t.test("day-off: a plain employee is refused, and nothing is written", async () => {
  const { sb, res } = await dayoff({ employee_id: 28, day_off: "sat" }, { role: "technician" });
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "Only the payroll office can change a rest day.", "message");
  t.eq(sb.calls.length, 0, "nothing touched — refused before any DB call");
});

await t.test("day-off: a value the control can't produce is refused", async () => {
  for (const bad of ["funday", "", "monday"]) {
    const { sb, res } = await dayoff({ employee_id: 28, day_off: bad }, { role: "owner" });
    t.eq(res.ok, false, `refused for ${JSON.stringify(bad)}`);
    t.eq(empWrites(sb).length, 0, `nothing written for ${JSON.stringify(bad)}`);
  }
});

await t.test("day-off: a missing employee_id is refused before any lookup", async () => {
  const { sb, res } = await dayoff({ day_off: "sat" }, { role: "owner" });
  t.eq(res.ok, false, "refused");
  t.eq(sb.calls.length, 0, "nothing touched");
});

await t.test("day-off: a silent refusal (200 + []) is an honest failure", async () => {
  const { res } = await dayoff({ employee_id: 28, day_off: "sat" }, { role: "owner", opts: { blockWrites: "pr_employees" } });
  t.eq(res.ok, false, "refused — never a false success over a write that never happened");
  t.ok(/Nothing changed/.test(res.error), `says so plainly, got: ${res.error}`);
});

await t.test("day-off: a 42501 refusal surfaces what the database said", async () => {
  const { res } = await dayoff({ employee_id: 28, day_off: "sat" }, { role: "owner", opts: { errorWrites: "pr_employees" } });
  t.eq(res.ok, false, "refused");
  t.ok(/new row violates/.test(res.error), `got: ${res.error}`);
});

/* ---------- pr_save_employee / pr_delete_employee (the roster) ---------- */
// Add/edit and delete, owner+payroll only (an app guard — pr_employees is wide-open at the DB level).
// Delete HARD-removes the roster row but must NOT touch pr_items: the pay lines are kept on purpose,
// and the grid renders their now-nameless rows as "?" without breaking (app.jsx:5218/5229).
const EMP_ROW = { id: 28, full_name: "Old Name", position: "Technician", per_day: 400, schedule_id: 1, user_id: 7, active: 1 };
const roster = async (action, payload, { role = "technician", rows = [{ ...EMP_ROW }], opts } = {}) => {
  const was = getME();
  setME({ ...was, role });
  try {
    const sb = makeFakeSB({ pr_employees: rows }, opts);
    window.SB = sb;
    const res = await API(action, payload);
    return { sb, res };
  } finally { setME(was); }
};
const EMP_COLS = ["active", "full_name", "per_day", "position", "schedule_id", "user_id"].join(",");

await t.test("save employee: the owner EDITS a row — exactly the roster columns, on pr_employees", async () => {
  const { sb, res } = await roster("pr_save_employee", { id: 28, full_name: "New Name", position: "Lineman", per_day: 500, schedule_id: 2, user_id: 7, active: 1 }, { role: "owner" });
  t.eq(res.ok, true, `saved, got: ${res.error}`);
  t.eq(res.id, 28, "echoes the edited id back");
  const w = sb.calls.filter((c) => c.op === "update");
  t.eq(w.length, 1, "one update");
  t.eq(w[0].table, "pr_employees", "on pr_employees");
  t.eq(w[0].filters.id, 28, "the right row");
  t.eq(Object.keys(w[0].row).sort().join(","), EMP_COLS, "owns exactly the roster columns — no day_off, no pay columns, no id");
  t.eq(w[0].row.full_name, "New Name", "name written");
  t.eq(w[0].row.active, 1, "active normalised to 1");
});

await t.test("save employee: the payroll officer may edit too", async () => {
  const { res } = await roster("pr_save_employee", { id: 28, full_name: "X", per_day: 400, schedule_id: 1, user_id: 7, active: 1 }, { role: "payroll" });
  t.eq(res.ok, true, `saved, got: ${res.error}`);
});

await t.test("save employee: a no-id payload INSERTS and returns the new id", async () => {
  const { sb, res } = await roster("pr_save_employee", { full_name: "Fresh Hire", position: "Technician", per_day: 450, schedule_id: 1, user_id: "", active: 1 }, { role: "owner" });
  t.eq(res.ok, true, `created, got: ${res.error}`);
  t.ok(res.id != null, "a new id came back");
  const ins = sb.calls.filter((c) => c.op === "insert");
  t.eq(ins.length, 1, "one insert");
  t.eq(ins[0].table, "pr_employees", "on pr_employees");
  t.ok(!("id" in ins[0].row), "the insert does not carry a client id");
});

await t.test("save employee: an empty picker (user_id '') is stored as null, not a bad FK", async () => {
  const { sb } = await roster("pr_save_employee", { id: 28, full_name: "X", per_day: 400, schedule_id: 1, user_id: "", active: 1 }, { role: "owner" });
  t.eq(sb.calls.filter((c) => c.op === "update")[0].row.user_id, null, "'' becomes null so the FK is cleared, not set to ''");
});

await t.test("save employee: a blank name is refused before any write", async () => {
  const { sb, res } = await roster("pr_save_employee", { id: 28, full_name: "   ", per_day: 400, schedule_id: 1, active: 1 }, { role: "owner" });
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "An employee needs a name.", "message");
  t.eq(sb.calls.length, 0, "nothing touched");
});

await t.test("save employee: a plain employee is refused", async () => {
  const { sb, res } = await roster("pr_save_employee", { id: 28, full_name: "Sneaky", per_day: 9999, schedule_id: 1, active: 1 }, { role: "technician" });
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "Only the payroll office can change the roster.", "message");
  t.eq(sb.calls.length, 0, "nothing touched — refused before any DB call");
});

await t.test("save employee: a silent refusal (200 + []) is an honest failure", async () => {
  const { res } = await roster("pr_save_employee", { id: 28, full_name: "X", per_day: 400, schedule_id: 1, active: 1 }, { role: "owner", opts: { blockWrites: "pr_employees" } });
  t.eq(res.ok, false, "refused — never a false 'saved'");
  t.ok(/Nothing changed/.test(res.error), `says so plainly, got: ${res.error}`);
});

await t.test("delete employee: the owner SOFT-deletes — sets active=0, keeps the row and the pay lines", async () => {
  const { sb, res } = await roster("pr_delete_employee", { id: 28 }, { role: "owner" });
  t.eq(res.ok, true, `deactivated, got: ${res.error}`);
  t.eq(sb.calls.filter((c) => c.op === "delete").length, 0, "NOT a hard delete — the row is kept");
  const w = sb.calls.filter((c) => c.op === "update");
  t.eq(w.length, 1, "exactly one update");
  t.eq(w[0].table, "pr_employees", "on pr_employees");
  t.eq(w[0].filters.id, 28, "the right row");
  t.eq(w[0].row.active, 0, "active set to 0 (smallint, not boolean false)");
  t.eq(Object.keys(w[0].row).sort().join(","), "active", "owns exactly the active column — nothing else on the row moves");
  t.eq(sb.calls.filter((c) => c.table === "pr_items").length, 0, "pr_items is NEVER touched — the named pay history is kept");
});

await t.test("delete employee: the payroll officer may deactivate too", async () => {
  const { res } = await roster("pr_delete_employee", { id: 28 }, { role: "payroll" });
  t.eq(res.ok, true, `deactivated, got: ${res.error}`);
});

await t.test("delete employee: a plain employee is refused, and nothing is written", async () => {
  const { sb, res } = await roster("pr_delete_employee", { id: 28 }, { role: "technician" });
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "Only the payroll office can change the roster.", "message");
  t.eq(sb.calls.filter((c) => c.op === "update").length, 0, "nothing written");
});

await t.test("delete employee: a missing id is refused before any lookup", async () => {
  const { sb, res } = await roster("pr_delete_employee", {}, { role: "owner" });
  t.eq(res.ok, false, "refused");
  t.eq(sb.calls.length, 0, "nothing touched");
});

await t.test("delete employee: a silent refusal (200 + []) is an honest failure", async () => {
  const { res } = await roster("pr_delete_employee", { id: 28 }, { role: "owner", opts: { blockWrites: "pr_employees" } });
  t.eq(res.ok, false, "refused — never a false 'deactivated' over a write that landed nothing");
  t.ok(/refused by the database/.test(res.error), `says so plainly, got: ${res.error}`);
});

/* ---------- pr_lock ---------- */
// One write, and the interesting part is the precondition: a week only locks once every line is
// approved. Locking is final — _supaSaveItems refuses to edit a locked period and the review gate
// is published-only — so a line left pending at lock time is frozen with nobody having agreed to
// it, and no button left to agree with.

const lockPeriod = [{ id: 3, status: "published" }];
const lockItems = (statuses) => statuses.map((s, i) => ({ id: 80 + i, period_id: 3, employee_id: 5 + i, status: s }));
const doLock = async (periods, items, payload, role = "payroll", opts) => {
  const was = getME();
  setME({ ...was, role });
  try {
    const sb = makeFakeSB({ pr_periods: periods, pr_items: items }, opts);
    window.SB = sb;
    const res = await API("pr_lock", payload);
    return { sb, res };
  } finally { setME(was); }   // ME is global; a leak here would silently re-role later tests
};
const lockWrites = (sb) => sb.calls.filter((c) => c.op === "update");

await t.test("a published week with every line approved locks", async () => {
  const { sb, res } = await doLock(lockPeriod, lockItems(["approved", "approved", "approved"]), { id: 3 });
  t.eq(res.ok, true, `locked, got: ${res.error}`);
  const w = lockWrites(sb);
  t.eq(w.length, 1, "one write — the lines do not move, only the period");
  t.eq(w[0].table, "pr_periods", "on pr_periods");
  t.eq(w[0].filters.id, 3, "the right week");
  t.eq(Object.keys(w[0].row).join(","), "status", "only status");
  t.eq(w[0].row.status, "locked", "locked");
});

await t.test("the owner may lock too — not just payroll", async () => {
  const { res } = await doLock(lockPeriod, lockItems(["approved"]), { id: 3 }, "owner");
  t.eq(res.ok, true, `owner locked, got: ${res.error}`);
});

await t.test("a PENDING line blocks the lock, and the message counts it", async () => {
  const { sb, res } = await doLock(lockPeriod, lockItems(["approved", "pending", "pending", "pending"]), { id: 3 });
  t.eq(res.ok, false, "refused");
  t.ok(/3 lines are still awaiting review/.test(res.error), `names the pending count, got: ${res.error}`);
  t.eq(lockWrites(sb).length, 0, "the week did NOT lock");
});

await t.test("a CONTESTED line blocks the lock, and is counted separately from pending", async () => {
  // Separately on purpose: pending waits on an employee, contested waits on the officer's own
  // reply. Folding them into "not approved" would send the officer hunting for which.
  const { sb, res } = await doLock(lockPeriod, lockItems(["approved", "contested"]), { id: 3 });
  t.eq(res.ok, false, "refused");
  t.ok(/1 is contested/.test(res.error), `names the contested count, got: ${res.error}`);
  t.eq(lockWrites(sb).length, 0, "the week did NOT lock");
});

await t.test("pending AND contested together are both named", async () => {
  const { res } = await doLock(lockPeriod, lockItems(["pending", "contested", "approved"]), { id: 3 });
  t.eq(res.ok, false, "refused");
  t.ok(/1 line is still awaiting review and 1 is contested/.test(res.error), `names both, got: ${res.error}`);
});

await t.test("a line with NO review status blocks the lock and says so", async () => {
  // A published week whose lines never moved. Folding this into "not approved" would hide that
  // something upstream went wrong.
  const { sb, res } = await doLock(lockPeriod, lockItems(["approved", null]), { id: 3 });
  t.eq(res.ok, false, "refused");
  t.ok(/no review status at all/.test(res.error), `names it, got: ${res.error}`);
  t.eq(lockWrites(sb).length, 0, "nothing written");
});

await t.test("locking a DRAFT week is refused — it was never published", async () => {
  const { sb, res } = await doLock([{ id: 3, status: "draft" }], lockItems(["approved"]), { id: 3 });
  t.eq(res.ok, false, "refused");
  t.ok(/Only a published week can be locked/.test(res.error), `explains itself, got: ${res.error}`);
  t.eq(lockWrites(sb).length, 0, "nothing written");
});

await t.test("locking an already-locked week is refused", async () => {
  const { sb, res } = await doLock([{ id: 3, status: "locked" }], lockItems(["approved"]), { id: 3 });
  t.eq(res.ok, false, "refused");
  t.ok(/already locked/.test(res.error), `explains itself, got: ${res.error}`);
  t.eq(lockWrites(sb).length, 0, "nothing written");
});

await t.test("a week with no pay lines is refused rather than locked empty", async () => {
  const { sb, res } = await doLock(lockPeriod, [], { id: 3 });
  t.eq(res.ok, false, "refused");
  t.ok(/no pay lines/.test(res.error), `explains itself, got: ${res.error}`);
  t.eq(lockWrites(sb).length, 0, "nothing written");
});

await t.test("locking an unknown week is refused", async () => {
  const { sb, res } = await doLock([], lockItems(["approved"]), { id: 3 });
  t.eq(res.ok, false, "refused");
  t.ok(/no longer exists/.test(res.error), `explains itself, got: ${res.error}`);
  t.eq(lockWrites(sb).length, 0, "nothing written");
});

await t.test("lock with no id is refused before any lookup", async () => {
  const { sb, res } = await doLock(lockPeriod, lockItems(["approved"]), {});
  t.eq(res.ok, false, "refused");
  t.eq(sb.calls.length, 0, "nothing touched");
});

await t.test("a silently refused lock (USING policy, 200 + []) is not a false 'Week locked'", async () => {
  const { res } = await doLock(lockPeriod, lockItems(["approved"]), { id: 3 }, "payroll", { blockWrites: "pr_periods" });
  t.eq(res.ok, false, "refused");
  t.ok(/still published/.test(res.error), `says where the week actually is, got: ${res.error}`);
});

await t.test("a lock refused with 42501 is reported as permission", async () => {
  // The live branch for pr_periods: Piece B v2 refuses via WITH CHECK, which RAISES rather than
  // hiding the row (tests/rls-live.mjs case 5), so `error` fires and !hit.length never does.
  const { res } = await doLock(lockPeriod, lockItems(["approved"]), { id: 3 }, "payroll", { errorWrites: "pr_periods" });
  t.eq(res.ok, false, "refused");
  t.ok(/don't have permission to lock/.test(res.error), `names the cause, got: ${res.error}`);
});

/* ---------- pr_save_period (create + edit) ---------- */
// One action, two jobs: no id inserts a draft, an id updates the three text columns. The thing to
// pin is that status never comes from the client on either path.

const savePeriod = async (payload, { periods = [{ id: 3, status: "published" }], role = "payroll", opts } = {}) => {
  const was = getME();
  setME({ ...was, role });
  try {
    const sb = makeFakeSB({ pr_periods: periods }, opts);
    window.SB = sb;
    const res = await API("pr_save_period", payload);
    return { sb, res };
  } finally { setME(was); }
};
const pWrites = (sb) => sb.calls.filter((c) => c.op === "insert" || c.op === "update");

await t.test("create: a no-id payload inserts a draft with label/pay_date/notes and returns the new id", async () => {
  const { sb, res } = await savePeriod({ label: "Jul 18–25, 2026", pay_date: "2026-07-25", notes: "second half" });
  t.eq(res.ok, true, `created, got: ${res.error}`);
  t.ok(res.id != null, "returns the new id the modal needs to select the week");
  const w = pWrites(sb);
  t.eq(w.length, 1, "one write");
  t.eq(w[0].op, "insert", "insert, not update");
  t.eq(w[0].table, "pr_periods", "on pr_periods");
  t.eq(w[0].row.label, "Jul 18–25, 2026", "label");
  t.eq(w[0].row.pay_date, "2026-07-25", "pay_date");
  t.eq(w[0].row.notes, "second half", "notes");
  t.eq(w[0].row.status, "draft", "status forced to draft");
});

await t.test("create IGNORES a client-supplied status — always draft", async () => {
  // The dangerous input: a crafted payload asking to be born 'published' would skip the
  // every-line-approved gate. status is forced, never read from the client.
  const { sb, res } = await savePeriod({ label: "W", pay_date: "2026-07-25", notes: "", status: "published" });
  t.eq(res.ok, true, "created");
  t.eq(pWrites(sb)[0].row.status, "draft", "still draft, not the 'published' the payload asked for");
});

await t.test("edit: an id payload UPDATEs label/pay_date/notes and never status", async () => {
  const { sb, res } = await savePeriod({ id: 3, label: "renamed", pay_date: "2026-08-01", notes: "fixed" }, { periods: [{ id: 3, status: "published" }] });
  t.eq(res.ok, true, `edited, got: ${res.error}`);
  const w = pWrites(sb);
  t.eq(w.length, 1, "one write");
  t.eq(w[0].op, "update", "update, not insert");
  t.eq(w[0].filters.id, 3, "the right period");
  t.ok(!("status" in w[0].row), "status is NOT written — the lifecycle owns it");
  t.eq(Object.keys(w[0].row).sort().join(","), "label,notes,pay_date", "only the three text columns");
});

await t.test("a blocked create (0 rows) is an honest failure, not a false success", async () => {
  const { res } = await savePeriod({ label: "W", pay_date: "", notes: "" }, { opts: { blockWrites: "pr_periods" } });
  t.eq(res.ok, false, "refused — no fake id handed back over a write that never happened");
});

await t.test("a blocked edit (0 rows) is an honest failure", async () => {
  const { res } = await savePeriod({ id: 3, label: "x", pay_date: "", notes: "" }, { opts: { blockWrites: "pr_periods" } });
  t.eq(res.ok, false, "refused");
});

/* ---------- pr_delete_period (destructive; items first) ---------- */
// No FK cascade, so the handler deletes pr_items before the period. Order is the whole safety
// story: a refused items delete must abort before the period is touched, or the lines orphan.

const delItems = [
  { id: 61, period_id: 4, employee_id: 5 },
  { id: 62, period_id: 4, employee_id: 6 },
  { id: 63, period_id: 7, employee_id: 5 },   // a different week — must never be touched
];
const delPeriodT = async (periods, items, payload, { role = "payroll", opts } = {}) => {
  const was = getME();
  setME({ ...was, role });
  try {
    const sb = makeFakeSB({ pr_periods: periods, pr_items: items }, opts);
    window.SB = sb;
    const res = await API("pr_delete_period", payload);
    return { sb, res };
  } finally { setME(was); }
};
const deletes = (sb) => sb.calls.filter((c) => c.op === "delete");

await t.test("delete removes the pay lines FIRST, then the period", async () => {
  const { sb, res } = await delPeriodT([{ id: 4, status: "draft" }], delItems, { id: 4 });
  t.eq(res.ok, true, `deleted, got: ${res.error}`);
  const d = deletes(sb);
  t.eq(d.length, 2, "two deletes");
  t.eq(d[0].table, "pr_items", "pr_items first");
  t.eq(d[0].filters.period_id, 4, "scoped to this week's lines");
  t.eq(d[1].table, "pr_periods", "pr_periods second");
  t.eq(d[1].filters.id, 4, "the right period");
});

await t.test("an empty draft (zero items) deletes cleanly — only the period", async () => {
  const { sb, res } = await delPeriodT([{ id: 4, status: "draft" }], [{ id: 63, period_id: 7, employee_id: 5 }], { id: 4 });
  t.eq(res.ok, true, `deleted, got: ${res.error}`);
  const d = deletes(sb);
  t.eq(d.length, 1, "just the period — nothing to delete on pr_items");
  t.eq(d[0].table, "pr_periods", "the period");
});

await t.test("delete refuses a LOCKED week and removes NOTHING — not even the lines", async () => {
  // The order that matters most: the locked check must precede the items delete, or a locked
  // week loses its approved payslips on the way to being refused.
  const { sb, res } = await delPeriodT([{ id: 4, status: "locked" }], delItems, { id: 4 });
  t.eq(res.ok, false, "refused");
  t.ok(/locked week can't be deleted/.test(res.error), `explains itself, got: ${res.error}`);
  t.eq(deletes(sb).length, 0, "no delete of any kind");
});

await t.test("delete refuses a missing week", async () => {
  const { sb, res } = await delPeriodT([], delItems, { id: 4 });
  t.eq(res.ok, false, "refused");
  t.ok(/no longer exists/.test(res.error), `explains itself, got: ${res.error}`);
  t.eq(deletes(sb).length, 0, "nothing deleted");
});

await t.test("delete with no id is refused before any lookup", async () => {
  const { sb, res } = await delPeriodT([{ id: 4, status: "draft" }], delItems, {});
  t.eq(res.ok, false, "refused");
  t.eq(sb.calls.length, 0, "nothing touched");
});

await t.test("items-delete blocked (0 rows) → the period is NOT deleted, lines are not orphaned", async () => {
  const { sb, res } = await delPeriodT([{ id: 4, status: "draft" }], delItems, { id: 4 }, { opts: { blockWrites: "pr_items" } });
  t.eq(res.ok, false, "refused");
  // "nothing changed" — the TOTAL-refusal wording, not the partial "N of M removed before the
  // rest". Every line was hidden, so nothing moved, and the message has to read that way or a
  // total refusal masquerades as a half-done delete.
  t.ok(/nothing changed/.test(res.error), `reads as total, not partial, got: ${res.error}`);
  t.eq(deletes(sb).filter((c) => c.table === "pr_periods").length, 0, "the period delete never ran");
});

await t.test("items-delete blocked with 42501 → the period is NOT deleted", async () => {
  const { sb, res } = await delPeriodT([{ id: 4, status: "draft" }], delItems, { id: 4 }, { opts: { errorWrites: "pr_items" } });
  t.eq(res.ok, false, "refused");
  t.eq(deletes(sb).filter((c) => c.table === "pr_periods").length, 0, "the period delete never ran");
});

await t.test("period-delete blocked AFTER lines removed → honest 'lines removed, week remains'", async () => {
  // The stranded case: the lines are gone but the period delete is refused. Reporting success
  // would hide a half-deleted week; reporting a plain failure would imply nothing happened.
  const { sb, res } = await delPeriodT([{ id: 4, status: "draft" }], delItems, { id: 4 }, { opts: { blockWrites: "pr_periods" } });
  t.eq(res.ok, false, "refused");
  t.ok(/pay lines were already removed/.test(res.error), `admits the lines are gone, got: ${res.error}`);
  t.eq(deletes(sb).filter((c) => c.table === "pr_items").length, 1, "the lines really were removed first");
});

/* ---------- pr_save_plan / pr_delete_plan (loans & installment deductions) ---------- */
// Add/edit and delete, owner+payroll only. Like the roster this is an APP guard and nothing more:
// pr_plans carries the permissive `staff_all` policy (verified 2026-07-18), so the database accepts
// a plan write from any signed-in staff account. These tests are the only thing standing behind it.
// Delete is SOFT (active=0) — a plan whose deductions already ran must keep explaining the money
// that came off past payslips, so the row survives and only future weeks stop.
const PLAN_ROW = { id: 12, employee_id: 5, kind: "ca", category: "loan", label: "Cash advance", total_amount: 2000, terms_total: 10, interest_rate: 0, interest_only: 0, start_date: "2026-07-01", active: 1 };
const PLAN_IN = { employee_id: 5, kind: "ca", category: "loan", label: "Cash advance", total_amount: 2000, terms_total: 10, interest_rate: 0, interest_only: 0, start_date: "2026-07-01", active: 1 };
const loans = async (action, payload, { role = "technician", rows = [{ ...PLAN_ROW }], opts } = {}) => {
  const was = getME();
  setME({ ...was, role });
  try {
    const sb = makeFakeSB({ pr_plans: rows }, opts);
    window.SB = sb;
    const res = await API(action, payload);
    return { sb, res };
  } finally { setME(was); }
};
const PLAN_COLS = ["active", "category", "employee_id", "interest_only", "interest_rate", "kind", "label", "start_date", "terms_total", "total_amount"].join(",");

await t.test("save plan: a no-id payload INSERTS and forces active=1", async () => {
  const { sb, res } = await loans("pr_save_plan", { ...PLAN_IN, active: 0 }, { role: "owner" });
  t.eq(res.ok, true, `created, got: ${res.error}`);
  t.ok(res.id != null, "a new id came back");
  const ins = sb.calls.filter((c) => c.op === "insert");
  t.eq(ins.length, 1, "one insert");
  t.eq(ins[0].table, "pr_plans", "on pr_plans");
  t.eq(ins[0].row.active, 1, "active FORCED to 1 — a new plan that deducts nothing is never what was meant");
  t.ok(!("id" in ins[0].row), "the insert does not carry a client id");
  t.ok(!("terms_done" in ins[0].row) && !("paid" in ins[0].row), "progress columns are never written by a save");
  t.ok(!("per_week" in ins[0].row), "the derived weekly share is not written — it would drift from the totals");
});

await t.test("save plan: an id payload UPDATEs exactly the whitelisted columns", async () => {
  const { sb, res } = await loans("pr_save_plan", { ...PLAN_IN, id: 12, total_amount: 3000, terms_total: 12 }, { role: "owner" });
  t.eq(res.ok, true, `saved, got: ${res.error}`);
  t.eq(res.id, 12, "echoes the edited id back");
  const w = sb.calls.filter((c) => c.op === "update");
  t.eq(w.length, 1, "one update");
  t.eq(w[0].table, "pr_plans", "on pr_plans");
  t.eq(w[0].filters.id, 12, "the right row");
  t.eq(Object.keys(w[0].row).sort().join(","), PLAN_COLS, "owns exactly the plan columns — no terms_done, no paid, no per_week, no id");
  t.eq(w[0].row.total_amount, 3000, "new total written");
  t.eq(w[0].row.terms_total, 12, "new term count written");
});

await t.test("save plan: the payroll officer may save too", async () => {
  const { res } = await loans("pr_save_plan", { ...PLAN_IN, id: 12 }, { role: "payroll" });
  t.eq(res.ok, true, `saved, got: ${res.error}`);
});

await t.test("save plan: smallint flags are written as 0/1, never booleans", async () => {
  const { sb } = await loans("pr_save_plan", { ...PLAN_IN, id: 12, interest_only: true, active: true }, { role: "owner" });
  const row = sb.calls.filter((c) => c.op === "update")[0].row;
  t.eq(row.interest_only, 1, "interest_only is smallint 1, not true");
  t.eq(row.active, 1, "active is smallint 1, not true");
  const off = await loans("pr_save_plan", { ...PLAN_IN, id: 12, interest_only: false, active: false }, { role: "owner" });
  const offRow = off.sb.calls.filter((c) => c.op === "update")[0].row;
  t.eq(offRow.interest_only, 0, "interest_only is smallint 0, not false");
  t.eq(offRow.active, 0, "active is smallint 0, not false — PostgREST rejects a boolean for a smallint");
});

await t.test("save plan: an edit can REACTIVATE a soft-deleted plan (active back to 1)", async () => {
  const { sb, res } = await loans("pr_save_plan", { ...PLAN_IN, id: 12, active: 1 }, { role: "owner", rows: [{ ...PLAN_ROW, active: 0 }] });
  t.eq(res.ok, true, `saved, got: ${res.error}`);
  t.eq(sb.calls.filter((c) => c.op === "update")[0].row.active, 1, "active flips back to 1 — the soft delete is reversible");
});

await t.test("save plan: a non-officer is refused before any write", async () => {
  const { sb, res } = await loans("pr_save_plan", { ...PLAN_IN, id: 12, total_amount: 1 }, { role: "technician" });
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "Only the payroll office can change a loan plan.", "message");
  t.eq(sb.calls.length, 0, "nothing touched — refused before any DB call");
});

await t.test("save plan: a missing employee is refused before any write", async () => {
  const { sb, res } = await loans("pr_save_plan", { ...PLAN_IN, employee_id: 0 }, { role: "owner" });
  t.eq(res.ok, false, "refused");
  t.ok(/Pick an employee/.test(res.error), `message, got: ${res.error}`);
  t.eq(sb.calls.length, 0, "nothing touched");
});

await t.test("save plan: a zero or negative total is refused — it would misprice every week", async () => {
  for (const bad of [0, -50]) {
    const { sb, res } = await loans("pr_save_plan", { ...PLAN_IN, total_amount: bad }, { role: "owner" });
    t.eq(res.ok, false, `total ${bad} refused`);
    t.ok(/total amount greater than zero/.test(res.error), `message, got: ${res.error}`);
    t.eq(sb.calls.length, 0, `total ${bad} touched nothing`);
  }
});

await t.test("save plan: fewer than one term is refused — the weekly share divides by it", async () => {
  for (const bad of [0, -3]) {
    const { sb, res } = await loans("pr_save_plan", { ...PLAN_IN, terms_total: bad }, { role: "owner" });
    t.eq(res.ok, false, `terms ${bad} refused`);
    t.ok(/at least one weekly term/.test(res.error), `message, got: ${res.error}`);
    t.eq(sb.calls.length, 0, `terms ${bad} touched nothing`);
  }
});

await t.test("save plan: a silently blocked write (200 + []) is an honest failure", async () => {
  const { res } = await loans("pr_save_plan", { ...PLAN_IN, id: 12 }, { role: "owner", opts: { blockWrites: "pr_plans" } });
  t.eq(res.ok, false, "refused — never a false 'saved'");
  t.ok(/Nothing changed/.test(res.error), `says so plainly, got: ${res.error}`);
});

await t.test("save plan: a blocked create (0 rows) is an honest failure too", async () => {
  const { res } = await loans("pr_save_plan", PLAN_IN, { role: "owner", opts: { blockWrites: "pr_plans" } });
  t.eq(res.ok, false, "refused");
  t.ok(/Nothing was added/.test(res.error), `says so plainly, got: ${res.error}`);
});

await t.test("delete plan: the owner SOFT-deletes — active=0, no DELETE, pr_items untouched", async () => {
  const { sb, res } = await loans("pr_delete_plan", { id: 12 }, { role: "owner" });
  t.eq(res.ok, true, `deactivated, got: ${res.error}`);
  t.eq(sb.calls.filter((c) => c.op === "delete").length, 0, "NOT a hard delete — the debt record is kept");
  const w = sb.calls.filter((c) => c.op === "update");
  t.eq(w.length, 1, "exactly one update");
  t.eq(w[0].table, "pr_plans", "on pr_plans");
  t.eq(w[0].filters.id, 12, "the right row");
  t.eq(w[0].row.active, 0, "active set to 0 (smallint, not boolean false)");
  t.eq(Object.keys(w[0].row).sort().join(","), "active", "owns exactly the active column — nothing else moves");
  t.eq(sb.calls.filter((c) => c.table === "pr_items").length, 0, "pr_items is NEVER touched — past deductions keep their explanation");
});

await t.test("delete plan: the payroll officer may stop a loan too", async () => {
  const { res } = await loans("pr_delete_plan", { id: 12 }, { role: "payroll" });
  t.eq(res.ok, true, `deactivated, got: ${res.error}`);
});

await t.test("delete plan: a non-officer is refused, and nothing is written", async () => {
  const { sb, res } = await loans("pr_delete_plan", { id: 12 }, { role: "technician" });
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "Only the payroll office can change a loan plan.", "message");
  t.eq(sb.calls.filter((c) => c.op === "update").length, 0, "nothing written");
});

await t.test("delete plan: a missing id is refused before any lookup", async () => {
  const { sb, res } = await loans("pr_delete_plan", {}, { role: "owner" });
  t.eq(res.ok, false, "refused");
  t.eq(sb.calls.length, 0, "nothing touched");
});

await t.test("delete plan: a silently blocked delete (200 + []) is an honest failure", async () => {
  const { res } = await loans("pr_delete_plan", { id: 12 }, { role: "owner", opts: { blockWrites: "pr_plans" } });
  t.eq(res.ok, false, "refused — never a false 'deleted'");
  t.ok(/Nothing changed/.test(res.error), `says so plainly, got: ${res.error}`);
});

const FALLTHROUGH = ["pr_apply_plans"];

await t.test(`the other ${FALLTHROUGH.length} payroll write still falls through to "not connected"`, async () => {
  t.eq(FALLTHROUGH.length, 1, "1 action still deferred — the plan save/delete pair is wired now");
  for (const action of FALLTHROUGH) {
    const sb = makeFakeSB([]);
    window.SB = sb;
    const res = await API(action, { id: 1, period_id: 3, employee_id: 5 });
    t.eq(res.ok, false, `${action} is refused`);
    t.ok(/is not connected to Supabase yet/.test(res.error), `${action} gives the not-connected error, got: ${res.error}`);
    t.eq(sb.calls.length, 0, `${action} touched no table`);
  }
});

console.log(`\n${t.results.name}: ${t.results.pass} passed, ${t.results.fail} failed`);
if (t.results.fail) { t.results.failures.forEach((f) => console.log("  FAIL " + f)); process.exit(1); }
