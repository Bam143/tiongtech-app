// Access suite — the Settings "Access" column, and the rule that it must agree with login.
//
//   npm test                         — runs against the committed app.js
//   node tests/test-access.mjs X.js  — run against some other build (used for mutation checks)
//
// THE BUG THIS SUITE EXISTS FOR
// erp_users.allowed_views is a TEXT column, so PostgREST returns it as a JSON STRING. The
// bootstrap parsed it for the signed-in user (app.jsx:427) but handed the users list through raw
// (app.jsx:441). Downstream, every reader tested `typeof allowed_views === "object"` and, on a
// string, fell through to a default of FULL ACCESS. So Settings showed a restricted technician as
// "Full access" while login restricted them correctly — the display contradicted the enforcement,
// and it did so in the dangerous direction: it under-reported restriction.
//
// `role` and `position` are separate fields in this database. Most staff carry role "admin" while
// their job title lives in `position`, and allowed_views is what actually restricts them. So a
// label derived from `role` is wrong by construction; these tests pin it to resolved access.
import { loadApp, makeFakeSB, makeSuite } from "./harness.mjs";

const APP_JS = process.argv[2] || "app.js";
const { API, window, _normPerms, _userAccess, canView, setME, getME } = loadApp(APP_JS);
const t = makeSuite("access / allowed_views + Settings label");

// aking as the live database actually holds them: role "admin" (not a restricted-sounding role),
// position "Technician", and a grant that is a STRING because the column is TEXT.
const AKING_GRANT = { jobs: { a: 0, e: 1, d: 0 }, joboverview: { a: 0, e: 0, d: 0 } };
const aking = (over = {}) => ({
  id: 7, username: "aking", full_name: "A. King", role: "admin", position: "Technician",
  allowed_views: JSON.stringify(AKING_GRANT), ...over,
});

const boot = async (users, opts = {}) => {
  const sb = makeFakeSB({ erp_users: users }, { uid: opts.uid || "auth-aking" });
  window.SB = sb;
  return { sb, res: await API("bootstrap") };
};

console.log(`\n${t.results.name}`);

// ---- _normPerms: the parse every reader used to have to remember ----

await t.test("a TEXT column's JSON string parses to the grant object", () => {
  const o = _normPerms(JSON.stringify(AKING_GRANT));
  t.ok(o && typeof o === "object", "expected an object");
  t.eq(Object.keys(o).length, 2, "menu count");
  t.eq(o.jobs.e, 1, "capability survives the parse");
});

await t.test("an already-parsed object passes through unchanged", () => {
  t.eq(_normPerms(AKING_GRANT).jobs.e, 1, "object input");
});

// null is "no grant", which is a DIFFERENT thing from "grant of nothing". Both fall back to the
// role, but only because canView is written that way — the distinction is asserted, not assumed.
await t.test("null, undefined and an empty object are all 'no grant'", () => {
  t.eq(_normPerms(null), null, "null");
  t.eq(_normPerms(undefined), null, "undefined");
  t.eq(_normPerms({}), null, "empty object");
  t.eq(_normPerms("{}"), null, "empty object as a string");
});

// An array would satisfy `typeof x === "object"` and then answer `in` against its INDICES, so
// "jobs" in ["jobs"] is false and every menu silently resolves to denied. Refusing it here keeps
// that shape from being mistaken for a grant.
await t.test("an array is not a grant — it would answer `in` against indices", () => {
  t.eq(_normPerms(["jobs"]), null, "array");
});

await t.test("malformed JSON is 'no grant', never a throw", () => {
  t.eq(_normPerms("{not json"), null, "garbage string");
  t.eq(_normPerms(""), null, "empty string");
});

// ---- the label: resolved access, never the role ----

await t.test("aking — a STRING grant reads as Limited, not Full access", () => {
  const a = _userAccess(aking());
  t.eq(a.full, false, "must NOT be full access");
  t.eq(a.count, 2, "menus granted");
});

// The regression in one line: before the fix this returned full:true, because the string failed
// the object test and the label defaulted to full access.
await t.test("the string grant is never mistaken for 'no restrictions'", () => {
  t.eq(_userAccess({ role: "admin", allowed_views: JSON.stringify({ jobs: { a: 1, e: 1, d: 1 } }) }).full, false, "one menu is not full access");
});

await t.test("role 'admin' does not by itself mean Full access — the grant decides", () => {
  t.eq(_userAccess(aking()).full, false, "admin + grant");
  t.eq(_userAccess(aking({ role: "technician" })).full, false, "technician + same grant");
  t.eq(_userAccess(aking({ position: "Admin Officer" })).full, false, "position is not access");
});

await t.test("a grant covering every menu IS full access", () => {
  const all = {}; ["owner", "subs", "clients", "pesowifi", "churn", "renew", "rn_ff", "rn_f1", "rn_f2",
    "rn_promised", "rn_awaiting", "rn_winback", "rn_modem", "rn_transfer", "jobs", "joboverview",
    "techs", "jobtypes", "issues", "solutions", "sla", "coverage", "nap", "fin", "income",
    "expenses", "reports", "faithgoals", "payroll", "loans", "collections", "salary", "ai"]
    .forEach((id) => { all[id] = { a: 1, e: 1, d: 1 }; });
  t.eq(_userAccess({ role: "admin", allowed_views: all }).full, true, "every menu granted");
});

await t.test("the owner is full access with no grant at all", () => {
  t.eq(_userAccess({ role: "owner", allowed_views: null }).full, true, "owner");
});

// Documenting a REAL asymmetry rather than hiding it: ROLE_VIEWS.admin is "*", so an admin with
// no grant genuinely does see every menu at login. Labelling them "Limited" would be a fresh lie
// in the opposite direction. If that combination is not supposed to exist in the live data, the
// fix belongs in ROLE_VIEWS, not in the label — see the note in the handover.
await t.test("an admin with NO grant is full access, because ROLE_VIEWS.admin is '*'", () => {
  t.eq(_userAccess({ role: "admin", allowed_views: null }).full, true, "no grant falls back to the role");
});

await t.test("a role with a narrow view list is Limited, counted off the role", () => {
  const a = _userAccess({ role: "technician", allowed_views: null });
  t.eq(a.full, false, "technician is not full access");
  t.eq(a.count, 3, "ROLE_VIEWS.technician");
});

// ---- the label must agree with what the user meets at login ----

await t.test("the label and canView() agree: aking is denied what the label excludes", () => {
  const was = getME();
  try {
    setME({ role: "admin", allowed_views: AKING_GRANT, pr_employee_id: null });
    t.eq(_userAccess(aking()).full, false, "label says restricted");
    t.eq(canView("jobs"), true, "granted menu is visible");
    t.eq(canView("income"), false, "ungranted menu is denied");
    t.eq(canView("payroll"), false, "ungranted menu is denied");
  } finally { setME(was); }
});

// Enforcement is hardened too: _myPerms parses, so even if a raw string reaches ME (a future
// reader that forgets, exactly as app.jsx:441 once did), access stays restricted rather than
// throwing on `in` or silently opening up.
await t.test("enforcement survives a RAW STRING reaching ME — still restricted", () => {
  const was = getME();
  try {
    setME({ role: "admin", allowed_views: JSON.stringify(AKING_GRANT), pr_employee_id: null });
    t.eq(canView("jobs"), true, "granted menu still visible");
    t.eq(canView("income"), false, "ungranted menu still denied");
  } finally { setME(was); }
});

// ---- the read itself: the fix has to live in the bootstrap, not only in the helper ----

await t.test("bootstrap parses allowed_views on the users list, not just on `me`", async () => {
  const { res } = await boot([aking({ auth_uid: "auth-aking" })]);
  t.eq(res.ok, true, "bootstrap ok");
  const u = res.users.find((x) => x.username === "aking");
  t.ok(u, "aking is in the list");
  t.ok(u.allowed_views && typeof u.allowed_views === "object", "allowed_views must be an object, not the raw TEXT");
  t.eq(Object.keys(u.allowed_views).length, 2, "the grant survived the read");
});

await t.test("the row Settings renders is the one that reads as Limited", async () => {
  const { res } = await boot([aking({ auth_uid: "auth-aking" })]);
  t.eq(_userAccess(res.users.find((x) => x.username === "aking")).full, false, "aking must NOT show Full access");
});

await t.test("a user with no grant survives the read as null, not as a crash", async () => {
  const { res } = await boot([aking({ allowed_views: null }), { id: 8, username: "bee", role: "owner", allowed_views: "" }]);
  t.eq(res.ok, true, "bootstrap ok");
  t.eq(res.users.find((x) => x.username === "aking").allowed_views, null, "null grant");
  t.eq(res.users.find((x) => x.username === "bee").allowed_views, null, "empty string grant");
});

// ---- the WRITE: update_user must store a grant the read gives back unchanged ----
//
// The read half of this bug is covered above. This half is the more dangerous one. Settings is the
// only screen that edits permissions, and Save was wired to nothing: update_user had no branch in
// the Supabase dispatcher, so it RESOLVED { ok:false, "not connected" } instead of throwing, the
// modal's `catch (e) {}` never fired, the result was discarded, and "Saved" was flashed every time.
//
// What makes it safety-critical rather than merely broken is the shape of the failure ON THE WAY
// BACK. allowed_views is TEXT. A grant written as anything that does not parse — a raw object that
// PostgREST renders "[object Object]", an empty {}, a null — reads back through _normPerms as null,
// which means "no grant", which falls back to the ROLE. Every restricted user in this database
// carries role "admin", and ROLE_VIEWS.admin is "*". So a save that mangles the grant does not fail
// closed and lock someone out; it fails OPEN and silently hands a restricted technician every menu
// in the app. These tests pin the serialised value, not just the call.

// aking as described in the handover: Job Order → Board with Edit, and their own payslip. Nothing
// else — no Overview, no Payroll, no Financials.
const AKING_SAVED = {
  jobs: { a: 0, e: 1, d: 0 },
  salary: { a: 0, e: 0, d: 0 },
};
const j = (v) => JSON.stringify(v, Object.keys(v).sort());   // stable compare, key order aside
// Every menu id in ACCESS_MENUS, so "nothing else was granted" is checked against the whole app
// rather than against the handful a test author happened to think of.
const ALL_MENUS = ["owner", "subs", "clients", "pesowifi", "churn", "renew", "rn_ff", "rn_f1", "rn_f2",
  "rn_promised", "rn_awaiting", "rn_winback", "rn_modem", "rn_transfer", "jobs", "joboverview",
  "techs", "jobtypes", "issues", "solutions", "sla", "coverage", "nap", "fin", "income",
  "expenses", "reports", "faithgoals", "payroll", "loans", "collections", "salary", "ai"];

// The row the fake database is holding, plus the write the modal would send for it.
const saveUser = async (payload, opts = {}) => {
  const sb = makeFakeSB({ erp_users: [aking({ id: 7 })] }, { uid: "auth-owner", ...opts });
  window.SB = sb;
  const res = await API("update_user", { id: 7, username: "aking", full_name: "A. King", position: "Technician", password: "", ...payload });
  const write = sb.calls.find((c) => c.table === "erp_users" && c.op === "update");
  return { sb, res, write };
};

await t.test("update_user is actually wired — it no longer falls through to 'not connected'", async () => {
  const { res } = await saveUser({ allowed_views: AKING_SAVED });
  t.eq(res.ok, true, `expected a real write, got: ${res.error || ""}`);
});

// (a) THE case. Save aking with aking's own permissions and nothing may widen.
await t.test("(a) saving a restricted user writes back the SAME restricted grant", async () => {
  const { res, write } = await saveUser({ allowed_views: AKING_SAVED });
  t.eq(res.ok, true, "write ok");
  t.ok(write, "erp_users was updated");
  const stored = _normPerms(write.row.allowed_views);
  t.eq(j(stored), j(AKING_SAVED), "the stored grant must equal the grant that was sent");
});

await t.test("(a) no menu is granted that was not granted before", async () => {
  const { write } = await saveUser({ allowed_views: AKING_SAVED });
  const stored = _normPerms(write.row.allowed_views);
  t.eq(Object.keys(stored).length, 2, "exactly two menus, not the full menu list");
  ALL_MENUS.forEach((id) => {
    if (!(id in AKING_SAVED)) t.ok(!(id in stored), `${id} must NOT have been granted`);
  });
});

await t.test("(a) no capability is escalated on a menu that was granted", async () => {
  const { write } = await saveUser({ allowed_views: AKING_SAVED });
  const stored = _normPerms(write.row.allowed_views);
  t.eq(stored.jobs.a, 0, "jobs Add stays off");
  t.eq(stored.jobs.e, 1, "jobs Edit stays on");
  t.eq(stored.jobs.d, 0, "jobs Delete stays off");
  t.eq(stored.salary.e, 0, "salary stays view-only");
});

// The regression in one assertion: a saved restricted user must not read back as unrestricted.
await t.test("(a) the saved row still reads as Limited, never Full access", async () => {
  const { write } = await saveUser({ allowed_views: AKING_SAVED });
  const asRead = { role: "admin", allowed_views: write.row.allowed_views };   // exactly what the next read sees
  t.eq(_userAccess(asRead).full, false, "must NOT be full access after a save");
  t.eq(_userAccess(asRead).count, 2, "menus granted");
});

// (b) the round trip, asserted on the WIRE FORMAT rather than on a parsed value.
await t.test("(b) allowed_views is serialised as a JSON STRING, matching the TEXT column", async () => {
  const { write } = await saveUser({ allowed_views: AKING_SAVED });
  t.eq(typeof write.row.allowed_views, "string", "a raw object would render '[object Object]' into TEXT");
  t.ok(write.row.allowed_views.charAt(0) === "{", "must be JSON, not a coerced object");
});

await t.test("(b) the serialised value round-trips through _normPerms identically", async () => {
  const { write } = await saveUser({ allowed_views: AKING_SAVED });
  t.eq(j(_normPerms(write.row.allowed_views)), j(AKING_SAVED), "save → _normPerms must be lossless");
});

// The stored string is fed back through the READ path — the same bootstrap the Settings list uses —
// so this covers the whole loop, not just the helper.
await t.test("(b) a saved grant survives a real bootstrap read unchanged", async () => {
  const { write } = await saveUser({ allowed_views: AKING_SAVED });
  const { res } = await boot([aking({ id: 7, auth_uid: "auth-aking", allowed_views: write.row.allowed_views })]);
  const u = res.users.find((x) => x.username === "aking");
  t.eq(j(u.allowed_views), j(AKING_SAVED), "what was saved is what the next login reads");
});

await t.test("(b) enforcement after a save-then-read still denies the ungranted menus", async () => {
  const { write } = await saveUser({ allowed_views: AKING_SAVED });
  const was = getME();
  try {
    setME({ role: "admin", allowed_views: _normPerms(write.row.allowed_views), pr_employee_id: null });
    t.eq(canView("jobs"), true, "granted menu visible");
    t.eq(canView("salary"), true, "own payslip visible");
    t.eq(canView("payroll"), false, "payroll still denied");
    t.eq(canView("income"), false, "financials still denied");
    t.eq(canView("joboverview"), false, "job overview still denied");
  } finally { setME(was); }
});

// (c) a write that did not happen must never report that it did. RLS refuses in two shapes and
// they are not interchangeable — a silent refusal (200 + []) leaves `error` null, which is exactly
// how a no-op write passes for a successful one.
await t.test("(c) a SILENTLY refused write (RLS USING, 200 + []) reports failure", async () => {
  const { res } = await saveUser({ allowed_views: AKING_SAVED }, { blockWrites: "erp_users" });
  t.eq(res.ok, false, "a no-op write must NOT report success");
  t.ok(/refused/i.test(res.error || ""), `expected a refusal message, got: ${res.error}`);
});

await t.test("(c) a RAISED write (RLS WITH CHECK, 42501) reports failure", async () => {
  const { res } = await saveUser({ allowed_views: AKING_SAVED }, { errorWrites: "erp_users" });
  t.eq(res.ok, false, "an errored write must NOT report success");
  t.ok(/could not save/i.test(res.error || ""), `expected an error message, got: ${res.error}`);
});

await t.test("(c) a missing id is refused rather than written blind", async () => {
  const { res, write } = await saveUser({ id: 0, allowed_views: AKING_SAVED });
  t.eq(res.ok, false, "no id, no write");
  t.ok(!write, "nothing may be sent to erp_users");
});

// An empty grant is the fail-OPEN case: it stores as "{}", which _normPerms reads as null, which is
// "no grant", which falls back to ROLE_VIEWS.admin === "*". Saving "no menus" would therefore grant
// every menu. Refused at the handler, not merely in the modal.
await t.test("(c) an empty permission set is REFUSED — it would read back as full access", async () => {
  const { res, write } = await saveUser({ allowed_views: {} });
  t.eq(res.ok, false, "empty grant must be refused");
  t.ok(!write, "nothing may be written");
  // and the reason it matters, asserted directly:
  t.eq(_userAccess({ role: "admin", allowed_views: "{}" }).full, true, "proof: {} reads as full access for an admin");
});

await t.test("(c) a null / unparseable grant is refused for the same reason", async () => {
  t.eq((await saveUser({ allowed_views: null })).res.ok, false, "null grant");
  t.eq((await saveUser({ allowed_views: "{not json" })).res.ok, false, "garbage grant");
  t.eq((await saveUser({ allowed_views: ["jobs"] })).res.ok, false, "array grant");
});

await t.test("(c) a blank full name is refused", async () => {
  const { res, write } = await saveUser({ full_name: "   ", allowed_views: AKING_SAVED });
  t.eq(res.ok, false, "blank name refused");
  t.ok(!write, "nothing written");
});

// ---- what update_user must NOT do ----

// The reason the payroll fields left this modal. The users read never selects per_day or the
// pr_employees link, so the form loaded 0 for everyone; a handler that trusted it would write 0
// over a real daily rate, and an unticked box would deactivate a roster row it had never read.
await t.test("update_user NEVER touches pr_employees, even if payroll fields are sent", async () => {
  const { sb, res } = await saveUser({ allowed_views: AKING_SAVED, per_day: 0, schedule_id: 2, in_payroll: 0 });
  t.eq(res.ok, true, "the user save still succeeds");
  t.ok(!sb.calls.some((c) => c.table === "pr_employees"), "pr_employees must not be read or written");
  t.ok(!sb.calls.some((c) => c.table !== "erp_users"), "erp_users is the only table involved");
});

await t.test("payroll and role columns are whitelisted OUT of the written row", async () => {
  const { write } = await saveUser({ allowed_views: AKING_SAVED, per_day: 999, schedule_id: 2, role: "owner" });
  t.eq(write.row.per_day, undefined, "per_day must never reach erp_users");
  t.eq(write.row.schedule_id, undefined, "schedule_id must never reach erp_users");
  t.eq(write.row.role, undefined, "role has no control in this modal and must not be written");
  t.eq(write.row.username, undefined, "username is the login key and is not editable here");
  t.eq(j(Object.keys(write.row).sort()), j(["allowed_views", "full_name", "position"]), "exactly three columns");
});

// A password cannot be applied from a browser client (it needs the admin API), so the one thing
// this must not do is stay quiet about it and let "Saved" imply the credential changed.
await t.test("a typed password is not applied, and the result SAYS so", async () => {
  const { res, write } = await saveUser({ allowed_views: AKING_SAVED, password: "hunter2" });
  t.eq(res.ok, true, "the rest of the save lands");
  t.eq(write.row.password, undefined, "no password column is written");
  t.eq(res.password_ignored, true, "the caller must be told, so the flash can say it");
});

await t.test("a blank password field raises no caveat", async () => {
  const { res } = await saveUser({ allowed_views: AKING_SAVED, password: "   " });
  t.eq(res.ok, true, "ok");
  t.eq(res.password_ignored, false, "nothing to warn about");
});

// create_user is deliberately still unwired — a login needs an auth.users account, which needs the
// admin API. Half-writing an erp_users row would make a user nobody can sign in as. The contract
// that matters is that it says so rather than reporting success.
await t.test("create_user still reports honestly that it is not connected", async () => {
  window.SB = makeFakeSB({ erp_users: [] }, { uid: "auth-owner" });
  const res = await API("create_user", { username: "new", full_name: "New", allowed_views: AKING_SAVED });
  t.eq(res.ok, false, "must not claim success");
  t.ok(/not connected/i.test(res.error || ""), `expected 'not connected', got: ${res.error}`);
});

console.log(`\n${t.results.name}: ${t.results.pass} passed, ${t.results.fail} failed`);
if (t.results.fail) { t.results.failures.forEach((f) => console.log("  ✗ " + f)); process.exit(1); }
