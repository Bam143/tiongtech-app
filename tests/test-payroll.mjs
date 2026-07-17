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

const FALLTHROUGH = ["pr_lock", "pr_delete_period", "pr_apply_plans", "pr_set_dayoff",
  "pr_save_employee", "pr_delete_employee", "pr_save_plan", "pr_delete_plan", "pr_item_approve",
  "pr_item_contest", "pr_item_reply", "pr_request_print", "pr_mark_printed", "pr_save_period"];

await t.test(`the other ${FALLTHROUGH.length} payroll writes still fall through to "not connected"`, async () => {
  t.eq(FALLTHROUGH.length, 14, "14 actions still deferred — pr_publish is wired now");
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
