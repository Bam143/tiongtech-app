// Areas suite — the position gate on the Areas screen, and the add path behind it.
//
//   npm test                        — runs against the committed app.js
//   node tests/test-areas.mjs X.js  — run against some other build (used for mutation checks)
//
// WHY THIS SUITE EXISTS
// Areas is the first screen gated on `position` rather than on a role or an allowed_views grant,
// and it is gated that way because role cannot carry the decision: ROLE_VIEWS.admin is "*", and
// most of the company holds role "admin" with their real job title in `position`. So the ONLY
// thing standing between an ordinary technician and this screen is one guard clause in canView.
// A regression there is invisible on screen — the nav item simply appears for someone it should
// not, and nothing errors — which is precisely the kind of failure a test has to catch instead.
//
// The other half is the add path. `areas` carries a real RLS policy (owner + is_admin_officer()),
// so the database can refuse a write in three different ways, and two of them do not raise:
// a silent 200 + [] (RLS hid the row from the returning clause) and a 23505 unique violation
// (allowed, but the data was rejected). A handler that only checks `error` reads the first as
// success and flashes "Added" over a row that does not exist.
import { loadApp, makeFakeSB, makeSuite } from "./harness.mjs";

const APP_JS = process.argv[2] || "app.js";
const { API, window, canView, isAdminOfficer, loadLiveData, __areas, setME } = loadApp(APP_JS);
const t = makeSuite("areas / position gate + add + rename");

// As the live database actually holds them: an Admin Officer carries role "admin" — the same role
// as almost everyone — and is distinguished ONLY by position. That is the whole point of the gate,
// so the fixtures have to be shaped that way or the tests prove nothing.
const owner = { role: "owner", name: "Boss", position: "Owner", allowed_views: null };
const officer = { role: "admin", name: "AO", position: "Admin Officer", allowed_views: null };
const technician = { role: "admin", name: "Aking", position: "Technician", allowed_views: null };
const granted = { role: "admin", name: "G", position: "Technician", allowed_views: { jobs: { a: 0, e: 1, d: 0 } } };
const cfo = { role: "cfo", name: "C", position: "CFO", allowed_views: null };

// Populate AREAS_ROWS through the real reader. loadLiveData is the only writer, so seeding it any
// other way would be testing a fixture rather than the mapping.
// It also overwrites ME from the bootstrap payload, so every caller sets ME *after* this.
const seed = async (rows) => {
  window.SB = makeFakeSB({ areas: rows });
  const ok = await loadLiveData();
  if (!ok) throw new Error("loadLiveData failed — the fixture never reached AREAS_ROWS");
};
// A fresh client for the write itself, so calls[] holds the save and not the bootstrap's ~20 reads.
const arm = (opts = {}) => { window.SB = makeFakeSB({ areas: [] }, opts); return window.SB; };

console.log(`\n${t.results.name}`);

/* ---- 1. the position gate ---------------------------------------------------------------- */

await t.test("an Admin Officer passes isAdminOfficer(), keyed on position alone", () => {
  setME(officer);
  t.eq(isAdminOfficer(), true, "officer");
  t.eq(canView("areas"), true, "and therefore sees the screen");
});

// The owner reaches Areas through the role half of the gate, NOT through isAdminOfficer(). Pinned
// explicitly because the two are easy to conflate: `ME.role === "owner" || isAdminOfficer()` would
// still pass every other test in this file if isAdminOfficer() wrongly returned true for the owner,
// and the wrongness would only surface somewhere else that asks "is this person an Admin Officer?"
await t.test("the owner sees Areas by ROLE — the owner is not an Admin Officer", () => {
  setME(owner);
  t.eq(canView("areas"), true, "sees the screen");
  t.eq(isAdminOfficer(), false, "but does not hold the position");
});

await t.test("a role:'admin' Technician does NOT see Areas — ROLE_VIEWS '*' must not leak it", () => {
  setME(technician);
  t.eq(isAdminOfficer(), false, "not an officer");
  t.eq(canView("areas"), false, "and the '*' fallback does not answer for areas");
});

// Areas is deliberately absent from ACCESS_MENUS, so there is no checkbox that could ever grant it.
// This pins that: a grant must not become a back door into a position-gated screen.
await t.test("an allowed_views grant cannot open Areas — it is not grantable", () => {
  setME(granted);
  t.eq(canView("areas"), false, "still closed");
});

await t.test("the cfo does not see Areas", () => {
  setME(cfo);
  t.eq(canView("areas"), false, "closed");
});

// The guard clause sits ahead of both the grant lookup and the ROLE_VIEWS fallback, so the risk is
// that it swallows ids it was never meant to answer for. These are the neighbours it would break.
await t.test("the guard clause is scoped to 'areas' — no other id changed", () => {
  setME(technician);
  t.eq(canView("jobs"), true, "a plain admin still gets the ROLE_VIEWS '*' answer elsewhere");
  setME(granted);
  t.eq(canView("jobs"), true, "a granted id still resolves off the grant");
  t.eq(canView("income"), false, "an ungranted id is still denied");
  setME(owner);
  t.eq(canView("nap"), true, "the owner still sees everything else");
  setME(cfo);
  t.eq(canView("income"), true, "a narrow role list still answers");
});

/* ---- 2. the mapping loadLiveData builds ---------------------------------------------------- */

await t.test("AREAS_ROWS keeps ids, trims names, drops blanks and sorts", async () => {
  await seed([
    { id: 3, name: "Malagasang" },
    { id: 1, name: "  Anabu  " },
    { id: 9, name: "   " },        // blank after trim — must not become an entry
    { id: 4, name: null },         // null name — same
    { id: 2, name: "Bucandala" },
  ]);
  const { rows } = __areas();
  t.eq(rows.length, 3, "the two unusable rows are dropped");
  t.eq(rows.map((r) => r.name).join(","), "Anabu,Bucandala,Malagasang", "sorted by name");
  t.eq(rows.map((r) => r.id).join(","), "1,2,3", "and each name still carries its own id");
});

// The regression that matters most here: AREA_LIST feeds the area dropdown on the client and
// PESOWiFi forms, which store clients.area as TEXT and have no use for an id. Adding AREAS_ROWS
// must not have reshaped it.
await t.test("AREA_LIST is untouched — still names only, trimmed, sorted", async () => {
  await seed([{ id: 3, name: "Malagasang" }, { id: 1, name: "  Anabu  " }, { id: 9, name: "  " }]);
  const { names } = __areas();
  t.eq(JSON.stringify(names), JSON.stringify(["Anabu", "Malagasang"]), "plain strings, no objects");
});

await t.test("the two shapes agree on which areas exist", async () => {
  await seed([{ id: 5, name: "Bayan Luma" }, { id: 6, name: "Alapan" }]);
  const { rows, names } = __areas();
  t.eq(JSON.stringify(rows.map((r) => r.name)), JSON.stringify(names), "same names, same order");
});

/* ---- 3. the add path ----------------------------------------------------------------------- */

await t.test("an Admin Officer can add, and the name is trimmed on the way in", async () => {
  await seed([]);
  setME(officer);
  const sb = arm();
  const res = await API("save_area", { name: "  Talacogon  " });
  t.eq(res.ok, true, "added");
  t.eq(sb.calls[0].row.name, "Talacogon", "trimmed");
  t.eq(sb.calls[0].cols, "id,name", "asks for the row back — the empty-200 check needs it");
});

await t.test("a non-officer is refused, and nothing is written", async () => {
  await seed([]);
  setME(technician);
  const sb = arm();
  const res = await API("save_area", { name: "Talacogon" });
  t.eq(res.ok, false, "refused");
  t.eq(sb.calls.length, 0, "the database was never asked");
});

await t.test("a blank name is refused before any write", async () => {
  await seed([]);
  setME(officer);
  const sb = arm();
  const res = await API("save_area", { name: "   " });
  t.eq(res.ok, false, "refused");
  t.ok(/Enter an area name/.test(res.error || ""), `expected a usable message, got: ${res.error}`);
  t.eq(sb.calls.length, 0, "no write attempted");
});

// The local pre-check, and it is deliberately STRICTER than the UNIQUE constraint: Postgres would
// accept "basag" alongside "Basag" because it compares exactly. To a human that is one area listed
// twice — it splits the client-form dropdown and halves every by-area report.
await t.test("a case-insensitive duplicate is rejected before the database is touched", async () => {
  await seed([{ id: 1, name: "Basag" }]);
  setME(officer);
  const sb = arm();
  const res = await API("save_area", { name: "basag" });
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "That area already exists.", "and says so in the screen's own words");
  t.eq(sb.calls.length, 0, "caught locally — no round trip");
});

await t.test("the duplicate check ignores surrounding whitespace too", async () => {
  await seed([{ id: 1, name: "Basag" }]);
  setME(officer);
  arm();
  const res = await API("save_area", { name: "  BASAG  " });
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "That area already exists.", "same message");
});

// A genuinely new name must still get through — otherwise the check above could be passing by
// refusing everything.
await t.test("a new name is NOT caught by the duplicate check", async () => {
  await seed([{ id: 1, name: "Basag" }]);
  setME(officer);
  const sb = arm();
  const res = await API("save_area", { name: "Bagong Silang" });
  t.eq(res.ok, true, "added");
  t.eq(sb.calls.length, 1, "and it did reach the database");
});

/* ---- 4. the three ways the database refuses ------------------------------------------------ */

// 23505. Reached when the local check missed it — an exact-case duplicate added by someone else
// since this tab last loaded. The user should meet the same sentence either way; a raw constraint
// string ("duplicate key value violates unique constraint areas_name_key") is not an answer.
await t.test("a DB-level unique violation (23505) reports 'already exists', not a raw error", async () => {
  await seed([]);                       // empty, so the local check cannot catch it first
  setME(officer);
  arm({ conflictWrites: "areas" });
  const res = await API("save_area", { name: "Basag" });
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "That area already exists.", "translated for the screen");
  t.ok(!/constraint|duplicate key/i.test(res.error), "the constraint name never reaches the user");
});

await t.test("a 23505 is not mistaken for a crash — it resolves, never throws", async () => {
  await seed([]);
  setME(officer);
  arm({ conflictWrites: "areas" });
  let threw = null;
  try { await API("save_area", { name: "Basag" }); } catch (e) { threw = e; }
  t.eq(threw, null, "no exception escaped the handler");
});

// The silent one. 200 + [] with no error object at all — a handler that only checks `error` calls
// this success. Nothing was written, so "Added" would be a lie about a row that does not exist.
await t.test("a SILENT refusal (RLS USING, 200 + []) reports failure, never a false 'Added'", async () => {
  await seed([]);
  setME(officer);
  arm({ blockWrites: "areas" });
  const res = await API("save_area", { name: "Basag" });
  t.eq(res.ok, false, "must not claim success");
  t.ok(/refused by the database/i.test(res.error || ""), `expected an honest refusal, got: ${res.error}`);
});

await t.test("a RAISED refusal (RLS WITH CHECK, 42501) reports failure too", async () => {
  await seed([]);
  setME(officer);
  arm({ errorWrites: "areas" });
  const res = await API("save_area", { name: "Basag" });
  t.eq(res.ok, false, "refused");
  t.ok(/Could not add the area/.test(res.error || ""), `expected the DB reason, got: ${res.error}`);
});

// Deliberately narrowed when rename was built: rename_area used to be listed here and now has its
// own section below. delete_area stays, and stays for the same reason — clients.area is TEXT, not
// an FK, so deleting an area orphans the label on every client carrying it rather than cascading.
// When delete is built, move it out of this list the same way, do not delete the test.
await t.test("delete is still unwired — no action pretends to work", async () => {
  setME(owner);
  arm();
  for (const action of ["update_area", "delete_area"]) {
    const res = await API(action, { id: 1, name: "X" });
    t.eq(res.ok, false, `${action} must not claim success`);
    t.ok(/not connected/i.test(res.error || ""), `${action} should say it is unwired, got: ${res.error}`);
  }
});

/* ---- 5. rename, and the cascade to clients -------------------------------------------------
   WHAT THESE CAN AND CANNOT PROVE. Atomicity is a property of Postgres, and there are no
   transactions in this file — makeFakeSB has none. So the rollback case below models the OUTCOME
   of a rollback (the function raises, and neither table moved) rather than proving one occurred.
   What IS proved here, and what actually protects the data from this side, is that the app makes
   exactly ONE database call: a second round trip is how a browser produces a half-applied rename,
   and no amount of care in the SQL prevents the app from reintroducing it. Genuine transactional
   proof needs the real database — tests/rls-live.mjs — against tests/sql/rename_area.sql.        */

// Stands in for the function body, applied to the fixture the fake reads from. Mirrors
// tests/sql/rename_area.sql: both tables move together, and the count returned is the clients row
// count. Raising BEFORE any mutation is what a rollback looks like from the client's side.
const renameFn = (db, fail) => (params) => {
  if (fail) return { error: fail };
  const { old_name: from, new_name: to } = params;
  (db.areas || []).forEach((a) => { if (a.name === from) a.name = to; });
  let n = 0;
  (db.clients || []).forEach((c) => { if (c.area === from) { c.area = to; n++; } });
  return n;
};

// A fixture both tables share, so an assertion can look at each after the call.
const renameFixture = () => ({
  areas: [{ id: 1, name: "Basag" }, { id: 2, name: "Anabu" }],
  clients: [
    { id: 10, area: "Basag" }, { id: 11, area: "Basag" }, { id: 12, area: "Basag" },
    { id: 13, area: "Anabu" }, { id: 14, area: null },
  ],
});

await t.test("a rename updates BOTH tables and returns the client count", async () => {
  await seed([{ id: 1, name: "Basag" }, { id: 2, name: "Anabu" }]);
  setME(officer);
  const db = renameFixture();
  window.SB = makeFakeSB(db, { rpcs: { rename_area: renameFn(db) } });
  const res = await API("rename_area", { old_name: "Basag", new_name: "Basag Proper" });
  t.eq(res.ok, true, "renamed");
  t.eq(res.clients, 3, "and reports the three clients it moved");
  t.eq(db.areas.find((a) => a.id === 1).name, "Basag Proper", "the areas row moved");
  t.eq(db.clients.filter((c) => c.area === "Basag Proper").length, 3, "and so did every client on it");
  t.eq(db.clients.filter((c) => c.area === "Basag").length, 0, "none left behind on the old name");
  t.eq(db.clients.find((c) => c.id === 13).area, "Anabu", "a client on another area is untouched");
});

// The app's half of atomicity, and the only half it controls. Two round trips is how a browser
// produces a half-applied rename — areas renamed, clients not — and the SQL cannot prevent that.
await t.test("the rename is ONE rpc call — never two updates that could half-succeed", async () => {
  await seed([{ id: 1, name: "Basag" }]);
  setME(officer);
  const db = renameFixture();
  const sb = makeFakeSB(db, { rpcs: { rename_area: renameFn(db) } });
  window.SB = sb;
  await API("rename_area", { old_name: "Basag", new_name: "Basag Proper" });
  t.eq(sb.calls.length, 1, "exactly one call to the database");
  t.eq(sb.calls[0].rpc, "rename_area", "and it is the rpc, not a table write");
  t.eq(sb.calls[0].params.old_name, "Basag", "old name sent");
  t.eq(sb.calls[0].params.new_name, "Basag Proper", "new name sent");
  t.ok(!sb.calls.some((c) => c.op === "update"), "no direct UPDATE was issued alongside it");
});

// The rollback case. Models the outcome, per the note above — the function raises, nothing moved.
await t.test("a failed rename leaves BOTH tables unchanged, and says so", async () => {
  await seed([{ id: 1, name: "Basag" }]);
  setME(officer);
  const db = renameFixture();
  window.SB = makeFakeSB(db, {
    rpcs: { rename_area: renameFn(db, { code: "P0001", message: "boom, mid-transaction" }) },
  });
  const res = await API("rename_area", { old_name: "Basag", new_name: "Basag Proper" });
  t.eq(res.ok, false, "must not claim success");
  t.eq(db.areas.find((a) => a.id === 1).name, "Basag", "the areas row did not move");
  t.eq(db.clients.filter((c) => c.area === "Basag").length, 3, "and neither did any client");
  t.eq(db.clients.filter((c) => c.area === "Basag Proper").length, 0, "nothing landed on the new name");
});

// 0 is a real answer — an area nobody is on. Reading it as falsy would report "refused" for a
// rename that DID happen, leaving the screen contradicting the database until the next reload.
await t.test("renaming an area with NO clients still succeeds — 0 is a count, not a failure", async () => {
  await seed([{ id: 3, name: "Talacogon" }]);
  setME(officer);
  const db = { areas: [{ id: 3, name: "Talacogon" }], clients: [] };
  window.SB = makeFakeSB(db, { rpcs: { rename_area: renameFn(db) } });
  const res = await API("rename_area", { old_name: "Talacogon", new_name: "Talakogon" });
  t.eq(res.ok, true, "renamed");
  t.eq(res.clients, 0, "zero clients moved, and that is fine");
  t.eq(db.areas[0].name, "Talakogon", "the area really did move");
});

await t.test("a non-officer cannot rename, and the database is never called", async () => {
  await seed([{ id: 1, name: "Basag" }]);
  setME(technician);
  const sb = arm();
  const res = await API("rename_area", { old_name: "Basag", new_name: "X" });
  t.eq(res.ok, false, "refused");
  t.eq(sb.calls.length, 0, "not even asked");
});

await t.test("a blank new name is refused before the round trip", async () => {
  await seed([{ id: 1, name: "Basag" }]);
  setME(officer);
  const sb = arm();
  const res = await API("rename_area", { old_name: "Basag", new_name: "   " });
  t.eq(res.ok, false, "refused");
  t.eq(sb.calls.length, 0, "no call");
});

await t.test("renaming onto another existing area is refused, case-insensitively", async () => {
  await seed([{ id: 1, name: "Basag" }, { id: 2, name: "Anabu" }]);
  setME(officer);
  const sb = arm();
  const res = await API("rename_area", { old_name: "Basag", new_name: "anabu" });
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "That area already exists.", "in the screen's own words");
  t.eq(sb.calls.length, 0, "caught locally");
});

// The case-only rename has to survive the check above, or fixing a typo'd capital is impossible.
await t.test("changing only the CASE of a name is a real rename, not a self-collision", async () => {
  await seed([{ id: 1, name: "basag" }]);
  setME(officer);
  const db = { areas: [{ id: 1, name: "basag" }], clients: [{ id: 10, area: "basag" }] };
  window.SB = makeFakeSB(db, { rpcs: { rename_area: renameFn(db) } });
  const res = await API("rename_area", { old_name: "basag", new_name: "Basag" });
  t.eq(res.ok, true, "allowed through");
  t.eq(db.areas[0].name, "Basag", "and applied");
  t.eq(db.clients[0].area, "Basag", "cascading as usual");
});

await t.test("renaming a name to itself is a no-op that touches nothing", async () => {
  await seed([{ id: 1, name: "Basag" }]);
  setME(officer);
  const sb = arm();
  const res = await API("rename_area", { old_name: "Basag", new_name: "  Basag  " });
  t.eq(res.ok, true, "not an error");
  t.eq(sb.calls.length, 0, "but no round trip either");
});

await t.test("a 23505 from the database is translated, not shown raw", async () => {
  await seed([{ id: 1, name: "Basag" }]);
  setME(officer);
  window.SB = makeFakeSB({}, {
    rpcs: { rename_area: { error: { code: "23505", message: 'duplicate key value violates unique constraint "areas_name_key"' } } },
  });
  const res = await API("rename_area", { old_name: "Basag", new_name: "Whatever" });
  t.eq(res.ok, false, "refused");
  t.eq(res.error, "That area already exists.", "translated");
  t.ok(!/constraint/i.test(res.error), "the constraint name never reaches the user");
});

await t.test("a 42501 from the function's own gate reports an honest refusal", async () => {
  await seed([{ id: 1, name: "Basag" }]);
  setME(officer);
  window.SB = makeFakeSB({}, {
    rpcs: { rename_area: { error: { code: "42501", message: "Only the owner or an Admin Officer can rename an area." } } },
  });
  const res = await API("rename_area", { old_name: "Basag", new_name: "Whatever" });
  t.eq(res.ok, false, "refused");
  t.ok(/refused the rename/i.test(res.error || ""), `expected an honest refusal, got: ${res.error}`);
});

// A null return with no error is not success. It is the RPC equivalent of the empty-200 the add
// path guards against, and it must not read as "renamed, 0 clients".
await t.test("a null return with no error is NOT read as a successful rename", async () => {
  await seed([{ id: 1, name: "Basag" }]);
  setME(officer);
  window.SB = makeFakeSB({}, { rpcs: { rename_area: { data: null } } });
  const res = await API("rename_area", { old_name: "Basag", new_name: "Whatever" });
  t.eq(res.ok, false, "must not claim success");
  t.ok(/refused by the database/i.test(res.error || ""), `expected an honest refusal, got: ${res.error}`);
});

// The function name is the whole contract with the database, and a typo in it is not detectable
// any other way from in here — the fake answers 42883 for anything it was not given.
await t.test("the handler calls the rpc by the name the SQL actually defines", async () => {
  await seed([{ id: 1, name: "Basag" }]);
  setME(officer);
  const db = renameFixture();
  const sb = makeFakeSB(db, { rpcs: { rename_area: renameFn(db) } });
  window.SB = sb;
  const res = await API("rename_area", { old_name: "Basag", new_name: "Basag Proper" });
  t.eq(res.ok, true, "the name resolved — a typo would have come back 42883");
  t.eq(sb.calls[0].rpc, "rename_area", "matches tests/sql/rename_area.sql");
});

console.log(`\n${t.results.name}: ${t.results.pass} passed, ${t.results.fail} failed`);
if (t.results.fail) { t.results.failures.forEach((f) => console.log("  ✗ " + f)); process.exit(1); }
