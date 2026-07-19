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

console.log(`\n${t.results.name}: ${t.results.pass} passed, ${t.results.fail} failed`);
if (t.results.fail) { t.results.failures.forEach((f) => console.log("  ✗ " + f)); process.exit(1); }
