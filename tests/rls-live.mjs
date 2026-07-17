// LIVE RLS test — talks to the REAL Supabase project. Not part of `npm test`.
//
// The rest of the suite runs app.js against a fake, which proves the APP behaves. It cannot
// prove anything about RLS, because the fake has no policies — it says yes to everything. This
// file exists to prove the database itself refuses the writes it is supposed to refuse.
//
//   SB_OWNER_PW=... SB_STAFF_PW=... node tests/rls-live.mjs
//
// Two policies:
//
//   pr_items    — a non-owner may not edit a row of a locked week; the owner may.
//   pr_periods  — v2, three roles. The OWNER moves status in any direction. A PAYROLL officer may
//                 publish and lock, but may not unlock a locked week and may not send one back to
//                 draft. EVERYONE ELSE may edit a period's notes/label/pay_date and may not touch
//                 status at all.
//
// Three accounts, discovered from erp_users by ROLE rather than guessed by name: the owner, a
// role='payroll' officer, and an outsider holding neither role. SB_STAFF_PW signs in as BOTH the
// payroll officer and the outsider, because every non-owner is currently on one shared password.
// (That sharing is itself a live problem — it means the payroll officer's rights below belong to
// everyone who knows that password — but it is not what this file tests.)
//
// It signs in as real users and WRITES REAL ROWS of production data — one pr_items row, and the
// pr_periods row's notes and status — then puts every one of them back and verifies the restore.
// It prints the exact ids it touched. The writes will bump updated_at where a trigger exists;
// that is accepted and not reset.
//
// Passwords come from the environment and are never written down here. The project URL and the
// publishable key are read out of index.html — both are public by design (that key ships to every
// browser that loads the page; RLS is what protects the data, not the key's secrecy), and reading
// them from there means there is one copy rather than two that can drift apart.
//
// WHY EVERY NEGATIVE CASE CHECKS TWICE: PostgREST does not error when RLS hides rows from an
// UPDATE. It returns 200 with an empty array. So `if (error)` never fires and a naive test
// reports PASS whether the policy exists or not. Each negative asserts nothing came back AND
// re-reads the row as the owner to prove the value on disk genuinely did not move.
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const EMAIL_DOMAIN = "@tiongtech.local";
const OWNER_USERNAME = "superadmin";
const TEMP_NOTES_MARK = " [rls-live temp]";

/* ---------- config ---------- */

// Either key generation is accepted, because index.html can legitimately hold either one:
//   sb_publishable_xxxx   the current publishable key
//   eyJ....eyJ....sig     the legacy anon JWT, still valid on projects that have not migrated
//
// Matching only the JWT is what this did until the legacy keys were disabled, and it turned a
// key-format migration into a mystifying "could not read the config" from a test that had been
// green for months. The failure had nothing to do with RLS and everything to do with a regex.
function readPublicConfig() {
  const html = readFileSync("index.html", "utf8");
  const url = (html.match(/"(https:\/\/[a-z0-9-]+\.supabase\.co)"/) || [])[1];
  const key = (html.match(/"(sb_publishable_[A-Za-z0-9_-]+|eyJ[\w-]+\.[\w-]+\.[\w-]+)"/) || [])[1];
  if (!url || !key) {
    throw new Error(
      "SETUP: could not read the project URL / publishable key from index.html.\n" +
      '  Expected createClient("https://xxxx.supabase.co", "<key>") with the key a quoted\n' +
      "  sb_publishable_... or eyJ... string. If index.html still reads\n" +
      "  PASTE_SB_PUBLISHABLE_KEY_HERE, the site is not fixed yet either."
    );
  }
  return { url, key };
}

const OWNER_PW = process.env.SB_OWNER_PW;
const STAFF_PW = process.env.SB_STAFF_PW;
if (!OWNER_PW || !STAFF_PW) {
  console.error("Refusing to run: set both env vars (they are never stored in this file).\n");
  console.error("  SB_OWNER_PW   password for the superadmin (owner) account");
  console.error("  SB_STAFF_PW   the shared staff password — signs in as BOTH the payroll");
  console.error("                officer and the outsider, since every non-owner is on it\n");
  console.error("  SB_OWNER_PW=... SB_STAFF_PW=... node tests/rls-live.mjs");
  process.exit(2);
}

const { url, key } = readPublicConfig();
// persistSession:false keeps the sessions independent — one client must stay the owner while the
// others are staff — and stops supabase-js writing session files to disk.
const mkClient = () => createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

/* ---------- tiny reporting ---------- */

const results = [];
const pass = (label, detail) => { results.push(true); console.log(`  PASS  ${label}${detail ? `\n        ${detail}` : ""}`); };
const fail = (label, detail) => { results.push(false); console.log(`  FAIL  ${label}${detail ? `\n        ${detail}` : ""}`); };
// A setup problem is not a policy result. Throwing keeps it out of the PASS/FAIL tally so a
// missing account or an unlocked database can never be mistaken for a passing policy.
const bail = (msg) => { throw new Error("SETUP: " + msg); };

// null and "" are different values in the column and must not be smudged together by a restore
// check — a restore that put "" back where null was is a restore that did not restore.
const sameText = (a, b) => (a === null || a === undefined ? null : String(a)) === (b === null || b === undefined ? null : String(b));
const sameNum = (a, b) => Object.is(a, b) || Number(a) === Number(b);

async function signIn(client, username, password, who) {
  const { error } = await client.auth.signInWithPassword({ email: username + EMAIL_DOMAIN, password });
  if (error) bail(`could not sign in as ${who} (${username}${EMAIL_DOMAIN}): ${error.message}`);
  return client;
}

/* ---------- discovery ---------- */
// Roles come from the database, never from a username. "blen sounds like payroll" is not a fact,
// and a case built on it would test whatever that account happens to be today. An account also
// needs an auth_uid or there is no login behind it to sign in to.

async function findByRole(owner, role) {
  const { data, error } = await owner.from("erp_users").select("username,role,auth_uid")
    .eq("role", role).not("auth_uid", "is", null).order("username").limit(1);
  if (error) bail(`listing erp_users for role '${role}': ${error.message}`);
  return (data || [])[0] || null;
}

// A technician is the clearest outsider, but any role that is neither owner nor payroll proves
// the same boundary, so the fallback widens rather than bailing on a project with no technicians.
async function findOutsider(owner) {
  const tech = await findByRole(owner, "technician");
  if (tech) return tech;
  const { data, error } = await owner.from("erp_users").select("username,role,auth_uid")
    .neq("role", "owner").neq("role", "payroll").not("auth_uid", "is", null).order("username").limit(1);
  if (error) bail("listing erp_users for a non-owner non-payroll account: " + error.message);
  return (data || [])[0] || null;
}

/* ---------- status-change helpers ---------- */
// Every status case has the same shape: attempt the write, judge the attempt, then ask the OWNER
// what the column actually says. That last step is what decides. A refusal arrives as an error
// (WITH CHECK, 42501) or as 200 + [] (USING hiding the row), and neither shape is proof on its
// own — only the value on disk is.

async function readStatus(owner, period) {
  const { data, error } = await owner.from("pr_periods").select("status").eq("id", period.id).maybeSingle();
  if (error) bail("re-reading the period as owner: " + error.message);
  if (!data) bail("the period vanished mid-test");
  return data.status;
}

async function mustRefuse(owner, client, period, to, expect, who) {
  const { data, error } = await client.from("pr_periods").update({ status: to }).eq("id", period.id).select();
  const rows = (data || []).length;
  if (!error && rows > 0) {
    fail(`${who} was NOT blocked`, `the update changed ${rows} row(s) — '${expect}' -> '${to}' got through`);
  } else if (error) {
    pass("blocked with an error", `${error.code || "?"}: ${error.message}`);
  } else {
    pass("blocked silently (0 rows)", "no error — PostgREST returned 200 with an empty array, which is why the re-read decides it");
  }
  const now = await readStatus(owner, period);
  if (now === expect) pass("status unchanged on disk", `pr_periods.id ${period.id} is still '${now}'`);
  else fail("status CHANGED on disk", `expected '${expect}', found '${now}' — the write got through`);
  return now;
}

async function mustAllow(owner, client, period, to, who) {
  const { data, error } = await client.from("pr_periods").update({ status: to }).eq("id", period.id).select();
  if (error) {
    fail(`${who} was blocked`, `${error.code || "?"}: ${error.message} — the policy is stricter than it should be`);
  } else if ((data || []).length !== 1) {
    fail(`${who}'s change moved no rows`, "no error, but 0 rows came back — silently blocked");
  } else {
    pass(`${who}'s change succeeded`, `status is now '${data[0].status}'`);
  }
  return readStatus(owner, period);
}

// A sequence that has lost its place cannot produce a verdict: the next case would be testing a
// transition it did not mean to test, and its PASS would mean nothing. That is a setup problem.
const expectState = (actual, want, step) => {
  if (actual !== want) bail(`the sequence lost its place before case [${step}]: the period is '${actual}', expected '${want}'. No verdict can be drawn from here.`);
};

/* ---------- pr_items: the lock policy ---------- */

async function itemsLockCases(owner, outsider, outsiderUser, period) {
  const { data: items, error: itemErr } = await owner.from("pr_items").select("id,employee_id,add_incentive").eq("period_id", period.id).order("id").limit(1);
  if (itemErr) bail("reading pr_items: " + itemErr.message);
  if (!items || !items.length) bail(`locked period #${period.id} has no pr_items rows`);
  const item = items[0];
  const original = item.add_incentive;
  const temp = (Number(original) || 0) + 1;   // always differs, including when original is null

  console.log("\n─── pr_items — the lock policy");
  console.log(`  item     pr_items.id ${item.id} (employee_id ${item.employee_id})`);
  console.log(`  column   add_incentive — original ${JSON.stringify(original)}, test value ${temp}\n`);

  let ownerWrote = false;
  try {
    /* ---- NEGATIVE: the non-owner must be refused ---- */
    console.log(`  [1] outsider ${outsiderUser.username} (${outsiderUser.role}) edits a LOCKED period's item — must be blocked`);
    const { data: blockedData, error: blockedErr } = await outsider.from("pr_items")
      .update({ add_incentive: temp }).eq("id", item.id).select();

    const rowsChanged = (blockedData || []).length;
    const blocked = !!blockedErr || rowsChanged === 0;
    if (!blocked) {
      fail("RLS did NOT block the non-owner", `the update changed ${rowsChanged} row(s) — the lock policy is not doing its job`);
    } else if (blockedErr) {
      pass("blocked with an error", `${blockedErr.code || "?"}: ${blockedErr.message}`);
    } else {
      pass("blocked silently (0 rows)", "no error — PostgREST returned 200 with an empty array, which is why the re-read below matters");
    }

    // Second half of the negative case: prove the value on disk did not move. Reading as the
    // owner, because the outsider's session may simply not be able to see the row.
    const { data: after, error: afterErr } = await owner.from("pr_items").select("add_incentive").eq("id", item.id).maybeSingle();
    if (afterErr) bail("re-reading the row as owner: " + afterErr.message);
    if (!after) bail("the row vanished mid-test");
    if (sameNum(after.add_incentive, original)) {
      pass("value unchanged on disk", `add_incentive is still ${JSON.stringify(after.add_incentive)}`);
    } else {
      fail("value CHANGED on disk", `expected ${JSON.stringify(original)}, found ${JSON.stringify(after.add_incentive)} — the write got through`);
    }

    /* ---- POSITIVE: the owner must get through ---- */
    console.log(`\n  [2] owner (${OWNER_USERNAME}) edits the same LOCKED row — must succeed`);
    const { data: okData, error: okErr } = await owner.from("pr_items")
      .update({ add_incentive: temp }).eq("id", item.id).select();
    if (okErr) {
      fail("owner was blocked", `${okErr.code || "?"}: ${okErr.message} — the policy is too strict; the owner cannot correct a locked week`);
    } else if ((okData || []).length !== 1) {
      fail("owner's update changed no rows", "no error, but 0 rows came back — the owner is silently blocked");
    } else {
      ownerWrote = true;
      pass("owner's update succeeded", `add_incentive is now ${JSON.stringify(okData[0].add_incentive)}`);
    }
  } finally {
    /* ---- CLEANUP: always, even if an assertion above threw ---- */
    if (ownerWrote) {
      console.log("\n  cleanup  pr_items");
      const { error: restoreErr } = await owner.from("pr_items").update({ add_incentive: original }).eq("id", item.id);
      if (restoreErr) {
        fail("could not restore the original value", `pr_items.id ${item.id} may still hold ${temp} — RESTORE BY HAND: set add_incentive = ${JSON.stringify(original)}`);
      } else {
        const { data: back } = await owner.from("pr_items").select("add_incentive").eq("id", item.id).maybeSingle();
        if (back && sameNum(back.add_incentive, original)) {
          pass("original value restored", `pr_items.id ${item.id} add_incentive back to ${JSON.stringify(back.add_incentive)}`);
        } else {
          fail("restore did not verify", `pr_items.id ${item.id} now holds ${JSON.stringify(back && back.add_incentive)}, expected ${JSON.stringify(original)} — RESTORE BY HAND`);
        }
      }
    } else {
      console.log("\n  cleanup  pr_items — nothing to undo; the owner write never landed");
    }
  }
}

/* ---------- pr_periods: the status policy, v2 ---------- */
//
// The WITH CHECK admits a new row when any of these holds:
//   is_owner()                                          — any direction, no further conditions
//   the new status equals the old one                   — so notes/label/pay_date edits pass
//   is_payroll() AND new IN ('published','locked') AND the period is NOT currently 'locked'
//
// Read that third clause carefully: it is three conditions, and each needs a DIFFERENT starting
// state to test. That is what the sequence below is for.
//
// THE SEQUENCE, and why it is this one. The period starts 'locked' and must end 'locked'. The
// app's real lifecycle is draft -> published -> locked, and unlocking returns a week to
// 'published' rather than 'draft' (app.jsx:906), so this walks the period once around that cycle
// and puts it back:
//
//    #   actor      transition              expect   which clause it exercises
//    3   outsider   notes only, no status   ALLOW    "new status equals the old one"
//    4   outsider   locked -> published     REFUSE   neither owner nor payroll
//    5   payroll    locked -> published     REFUSE   payroll may not UNLOCK      <- the v2 change
//    6   owner      locked -> published     ALLOW    is_owner(), any direction
//    7   payroll    published -> locked     ALLOW    payroll may LOCK a non-locked week
//    8   owner      locked -> draft         ALLOW    is_owner(); sets up 9
//    9   payroll    draft -> published      ALLOW    payroll may PUBLISH a non-locked week
//   10   payroll    published -> draft      REFUSE   payroll's new status must be published|locked
//   11   owner      published -> locked     ALLOW    restores the week to exactly how it started
//
// Case 8 exists only so case 9 can start somewhere real. Testing "payroll may publish" from
// 'published' would prove nothing — new status == old status already satisfies the unchanged
// clause, so it would pass against a policy with no payroll rule in it at all.
//
// Case 10 is not in the brief. Cases 5, 7 and 9 between them cover "not currently locked" and
// is_payroll(), but nothing else tries a status OUTSIDE {published, locked} as payroll, so
// without it that third of the clause is untested and could be missing entirely.
//
// Cases 5 and 4 look alike and are not: 4 proves a technician is refused because of WHO it is,
// 5 proves the payroll officer is refused because of WHAT IT ASKED FOR. If the payroll clause
// were written without the "not currently locked" condition, 4 would still pass and only 5 would
// catch it.
async function periodStatusCases(ctx, period) {
  const { owner, payroll, payrollUser, outsider, outsiderUser } = ctx;
  const originalNotes = period.notes;
  const originalPublishedAt = period.published_at;
  // Appending always yields a different string than the original, and differs from null too.
  const tempNotes = ((originalNotes === null || originalNotes === undefined) ? "" : String(originalNotes)) + TEMP_NOTES_MARK;

  console.log("\n─── pr_periods — the status policy (v2: owner / payroll / everyone else)");
  console.log(`  period   pr_periods.id ${period.id} "${period.label}" (status '${period.status}')`);
  console.log(`  payroll  ${payrollUser.username} (role '${payrollUser.role}')`);
  console.log(`  outsider ${outsiderUser.username} (role '${outsiderUser.role}')`);
  console.log(`  notes    original ${JSON.stringify(originalNotes)}, test value ${JSON.stringify(tempNotes)}\n`);

  try {
    /* ---- [3] the outsider may still edit a NON-status field ---- */
    // The policy freezes status, not the period. If this fails it is too blunt, and an officer
    // can no longer fix a typo in a label on a locked week.
    console.log(`  [3] outsider ${outsiderUser.username} edits NOTES only, no status — must succeed`);
    const { data: nd, error: nErr } = await outsider.from("pr_periods")
      .update({ notes: tempNotes }).eq("id", period.id).select();
    if (nErr) {
      fail("outsider was blocked editing notes", `${nErr.code || "?"}: ${nErr.message} — the policy freezes the whole row, not just status`);
    } else if ((nd || []).length !== 1) {
      fail("outsider's notes edit moved no rows", "no error, but 0 rows came back — silently blocked from an edit that should be allowed");
    } else {
      pass("outsider's notes edit succeeded", `notes is now ${JSON.stringify(nd[0].notes)}`);
    }

    // Put it back as the same outsider, then confirm from the OWNER's session — a restore has to
    // be proven on disk, not taken from the writer's own echo of it.
    const { error: nbErr } = await outsider.from("pr_periods").update({ notes: originalNotes }).eq("id", period.id).select();
    const { data: nNow, error: nNowErr } = await owner.from("pr_periods").select("notes").eq("id", period.id).maybeSingle();
    if (nNowErr) bail("re-reading the period's notes as owner: " + nNowErr.message);
    if (!nbErr && nNow && sameText(nNow.notes, originalNotes)) {
      pass("original notes restored", `notes back to ${JSON.stringify(nNow.notes)}`);
    } else {
      fail("notes restore did not verify", `${nbErr ? nbErr.message + " — " : ""}notes now ${JSON.stringify(nNow && nNow.notes)}, expected ${JSON.stringify(originalNotes)} (the cleanup below will try again as owner)`);
    }

    let state = await readStatus(owner, period);
    expectState(state, "locked", 4);

    /* ---- [4] the outsider may not touch status at all ---- */
    console.log(`\n  [4] outsider ${outsiderUser.username} (${outsiderUser.role}) publishes a LOCKED period — must be blocked`);
    state = await mustRefuse(owner, outsider, period, "published", "locked", `outsider ${outsiderUser.username}`);
    expectState(state, "locked", 5);

    /* ---- [5] THE v2 CHANGE: payroll may not unlock ---- */
    console.log(`\n  [5] payroll ${payrollUser.username} UNLOCKS it (locked -> published) — must be blocked`);
    console.log("      the one power v2 withholds from payroll: it may publish and lock, never unlock");
    state = await mustRefuse(owner, payroll, period, "published", "locked", `payroll ${payrollUser.username}`);
    expectState(state, "locked", 6);

    /* ---- [6] the owner may unlock ---- */
    console.log(`\n  [6] owner ${OWNER_USERNAME} UNLOCKS it (locked -> published) — must succeed`);
    state = await mustAllow(owner, owner, period, "published", `owner ${OWNER_USERNAME}`);
    expectState(state, "published", 7);

    /* ---- [7] payroll may lock a week that is not locked ---- */
    console.log(`\n  [7] payroll ${payrollUser.username} LOCKS it (published -> locked) — must succeed`);
    state = await mustAllow(owner, payroll, period, "locked", `payroll ${payrollUser.username}`);
    expectState(state, "locked", 8);

    /* ---- [8] setup for [9], not a policy question of its own ---- */
    console.log(`\n  [8] owner ${OWNER_USERNAME} sends it back to DRAFT (locked -> draft) — must succeed`);
    console.log("      setup: case 9 needs a real third state to publish FROM");
    state = await mustAllow(owner, owner, period, "draft", `owner ${OWNER_USERNAME}`);
    expectState(state, "draft", 9);

    /* ---- [9] payroll may publish a week that is not locked ---- */
    console.log(`\n  [9] payroll ${payrollUser.username} PUBLISHES it (draft -> published) — must succeed`);
    state = await mustAllow(owner, payroll, period, "published", `payroll ${payrollUser.username}`);
    expectState(state, "published", 10);

    /* ---- [10] payroll's new status must be published or locked ---- */
    console.log(`\n  [10] payroll ${payrollUser.username} sends it to DRAFT (published -> draft) — must be blocked`);
    console.log("       the only case that tests the clause 'new status IN (published, locked)'");
    state = await mustRefuse(owner, payroll, period, "draft", "published", `payroll ${payrollUser.username}`);
    expectState(state, "published", 11);

    /* ---- [11] restore ---- */
    console.log(`\n  [11] owner ${OWNER_USERNAME} LOCKS it again (published -> locked) — puts the week back`);
    await mustAllow(owner, owner, period, "locked", `owner ${OWNER_USERNAME}`);
  } finally {
    /* ---- CLEANUP: the period must end exactly as it started ---- */
    // A net, not bookkeeping: read what is actually there and put back whatever moved, whichever
    // case died. The sequence walks this period through four states, so an assertion throwing at
    // case 9 would otherwise leave a production payroll week sitting in 'draft'.
    console.log("\n  cleanup  pr_periods");
    const { data: now, error: nowErr } = await owner.from("pr_periods").select("status,notes,published_at").eq("id", period.id).maybeSingle();
    if (nowErr || !now) {
      fail("could not read the period back for cleanup", `${nowErr ? nowErr.message : "row missing"} — CHECK BY HAND: pr_periods.id ${period.id} must be status 'locked', notes ${JSON.stringify(originalNotes)}`);
    } else if (now.status === "locked" && sameText(now.notes, originalNotes)) {
      pass("period left exactly as found", `pr_periods.id ${period.id} status 'locked', notes ${JSON.stringify(now.notes)}`);
    } else {
      console.log(`  note     period is '${now.status}' with notes ${JSON.stringify(now.notes)} — repairing as owner`);
      const { error: repairErr } = await owner.from("pr_periods")
        .update({ status: "locked", notes: originalNotes, published_at: originalPublishedAt }).eq("id", period.id);
      const { data: back } = await owner.from("pr_periods").select("status,notes").eq("id", period.id).maybeSingle();
      if (!repairErr && back && back.status === "locked" && sameText(back.notes, originalNotes)) {
        pass("period restored", `pr_periods.id ${period.id} back to status 'locked', notes ${JSON.stringify(back.notes)}`);
      } else {
        fail("period restore did not verify", `pr_periods.id ${period.id} is status '${back && back.status}', notes ${JSON.stringify(back && back.notes)} — RESTORE BY HAND: status = 'locked', notes = ${JSON.stringify(originalNotes)}`);
      }
    }
    // Not a verdict on the policy, so not in the tally — but it is production data that moved.
    const { data: pa } = await owner.from("pr_periods").select("status,published_at").eq("id", period.id).maybeSingle();
    if (pa && !sameText(pa.published_at, originalPublishedAt)) {
      console.log(`  note     published_at moved: was ${JSON.stringify(originalPublishedAt)}, now ${JSON.stringify(pa.published_at)} (a trigger stamps it) — set it back by hand if it matters`);
    }
    console.log(`\n  FINAL    pr_periods.id ${period.id} status '${pa && pa.status}' (started 'locked')`);
  }
}

/* ---------- the test ---------- */

async function main() {
  console.log("\nLIVE RLS — pr_items lock policy + pr_periods status policy (v2)");
  console.log("  project " + url + "\n");

  // 1. owner
  const owner = await signIn(mkClient(), OWNER_USERNAME, OWNER_PW, "owner");
  const { data: ownerRow, error: ownerRoleErr } = await owner.from("erp_users").select("username,role").eq("username", OWNER_USERNAME).maybeSingle();
  if (ownerRoleErr) bail("reading the owner's own erp_users row: " + ownerRoleErr.message);
  if (!ownerRow) bail(`signed in as ${OWNER_USERNAME} but it has no erp_users row`);
  // If superadmin is not actually role:'owner', the positive cases below would be testing the
  // wrong thing and a PASS would mean nothing.
  if (ownerRow.role !== "owner") bail(`${OWNER_USERNAME} has role '${ownerRow.role}', expected 'owner'`);
  console.log(`  owner    ${OWNER_USERNAME} (role '${ownerRow.role}')`);

  // 2. the payroll officer — the whole point of v2. Without one there is nothing to test the
  //    payroll clause with, and a green run would prove only that everybody else is refused,
  //    which is exactly what v1 already proved.
  const payrollUser = await findByRole(owner, "payroll");
  if (!payrollUser) {
    bail(
      "no erp_users row has role 'payroll' with a login (auth_uid).\n" +
      "  The v2 policy grants publish and lock to is_payroll(). With nobody holding that role,\n" +
      "  cases 5, 7, 9 and 10 cannot run, and the rest would pass against a policy that never\n" +
      "  granted payroll anything — a green run would mean nothing.\n" +
      "  Assign someone role='payroll' in erp_users, then re-run."
    );
  }
  console.log(`  payroll  ${payrollUser.username} (role '${payrollUser.role}')`);

  // 3. an outsider — neither owner nor payroll. This is what makes case 4 a boundary rather than
  //    a coincidence.
  const outsiderUser = await findOutsider(owner);
  if (!outsiderUser) bail("no non-owner, non-payroll account with a login exists — there is no outsider to prove the boundary against");
  if (outsiderUser.role === "owner" || outsiderUser.role === "payroll") bail(`discovery returned ${outsiderUser.username} (role '${outsiderUser.role}') as the outsider — refusing to test the wrong case`);
  if (outsiderUser.username === payrollUser.username) bail("the payroll officer and the outsider resolved to the same account — the boundary between them cannot be tested");
  console.log(`  outsider ${outsiderUser.username} (role '${outsiderUser.role}')`);

  // 4. the locked week
  const { data: locked, error: perErr } = await owner.from("pr_periods").select("id,label,status,notes,published_at").eq("status", "locked").order("id");
  if (perErr) bail("reading pr_periods: " + perErr.message);
  if (!locked || !locked.length) bail("no period has status 'locked' — the sequence starts from a locked week and there is none");
  if (locked.length > 1) console.log(`  note     ${locked.length} locked periods; using the lowest id`);
  const period = locked[0];
  console.log(`  period   #${period.id} "${period.label}" (status '${period.status}')`);

  const payroll = await signIn(mkClient(), payrollUser.username, STAFF_PW, "the payroll officer");
  const outsider = await signIn(mkClient(), outsiderUser.username, STAFF_PW, "the outsider");

  try {
    // pr_items runs first and pr_periods second, on purpose: the pr_items cases are only
    // meaningful while the period is locked, and the status sequence walks it away from that.
    await itemsLockCases(owner, outsider, outsiderUser, period);
    await periodStatusCases({ owner, payroll, payrollUser, outsider, outsiderUser }, period);
  } finally {
    await owner.auth.signOut().catch(() => {});
    await payroll.auth.signOut().catch(() => {});
    await outsider.auth.signOut().catch(() => {});
  }
}

main().then(() => {
  const failed = results.filter((r) => !r).length;
  console.log(`\n${results.length - failed} passed, ${failed} failed\n`);
  process.exit(failed ? 1 : 0);
}).catch((e) => {
  // Setup problems exit 2, never 1 — an unlocked database or a missing account must never look
  // like a policy verdict.
  console.error("\n" + (e && e.message ? e.message : String(e)));
  console.error(e && String(e.message).startsWith("SETUP:") ? "  (setup problem — no policy conclusion can be drawn)\n" : "");
  process.exit(2);
});
