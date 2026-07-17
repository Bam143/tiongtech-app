// LIVE RLS test — talks to the REAL Supabase project. Not part of `npm test`.
//
// The rest of the suite runs app.js against a fake, which proves the APP behaves. It cannot
// prove anything about RLS, because the fake has no policies — it says yes to everything. This
// file exists to prove the database itself refuses a non-owner editing a locked week.
//
//   SB_OWNER_PW=... SB_STAFF_PW=... node tests/rls-live.mjs
//
// Two policies, five cases:
//
//   pr_items    — a non-owner may not edit a row of a locked week; the owner may.
//   pr_periods  — a non-owner MAY edit a period's non-status fields (label/pay_date/notes) but
//                 may NOT change status; the owner may change status freely.
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
  console.error("  SB_STAFF_PW   password for the non-owner staff account\n");
  console.error("  SB_OWNER_PW=... SB_STAFF_PW=... node tests/rls-live.mjs");
  process.exit(2);
}

const { url, key } = readPublicConfig();
// persistSession:false keeps the two sessions independent — one client must stay the owner
// while the other is staff — and stops supabase-js writing session files to disk.
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

/* ---------- pr_items: the lock policy ---------- */

async function itemsLockCases(owner, staff, staffUser, period) {
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
    console.log(`  [1] non-owner (${staffUser.username}) edits a LOCKED period's item — must be blocked`);
    const { data: blockedData, error: blockedErr } = await staff.from("pr_items")
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
    // owner, because the staff session may simply not be able to see the row.
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

/* ---------- pr_periods: the status policy ---------- */
//
// Any authenticated user may SELECT/INSERT/DELETE a period and may UPDATE one — but the WITH
// CHECK admits a non-owner's new row only when the new status equals the status already there.
// So an officer can still fix a label, a pay date or the notes on a locked week, and cannot
// publish it. The owner can move status wherever it likes.
//
// HOW A WITH CHECK REFUSES, AND WHY IT DIFFERS FROM pr_items ABOVE: a USING clause hides rows,
// so PostgREST returns 200 and an empty array. A WITH CHECK violation is an outright error
// (42501, "new row violates row-level security policy"). Case [4] therefore accepts EITHER shape
// as blocked — what it will not accept is the value moving, which the owner re-read decides.
async function periodStatusCases(owner, staff, staffUser, period) {
  const originalNotes = period.notes;
  const originalPublishedAt = period.published_at;
  // Appending always yields a different string than the original, and differs from null too.
  const tempNotes = ((originalNotes === null || originalNotes === undefined) ? "" : String(originalNotes)) + TEMP_NOTES_MARK;

  console.log("\n─── pr_periods — the status policy");
  console.log(`  period   pr_periods.id ${period.id} "${period.label}" (status '${period.status}')`);
  console.log(`  notes    original ${JSON.stringify(originalNotes)}, test value ${JSON.stringify(tempNotes)}\n`);

  try {
    /* ---- [3] POSITIVE: a non-owner may still edit a NON-status field ---- */
    // The point of the policy is to freeze status, not to freeze the period. If this fails, the
    // policy is too blunt and officers can no longer do their ordinary job on a locked week.
    console.log(`  [3] non-owner (${staffUser.username}) edits the period's NOTES — must succeed`);
    const { data: notesData, error: notesErr } = await staff.from("pr_periods")
      .update({ notes: tempNotes }).eq("id", period.id).select();
    if (notesErr) {
      fail("non-owner was blocked editing notes", `${notesErr.code || "?"}: ${notesErr.message} — the policy is too strict; it freezes the whole row, not just status`);
    } else if ((notesData || []).length !== 1) {
      fail("non-owner's notes edit changed no rows", "no error, but 0 rows came back — the non-owner is silently blocked from an edit that should be allowed");
    } else {
      pass("non-owner's notes edit succeeded", `notes is now ${JSON.stringify(notesData[0].notes)}`);
    }

    // Put the notes back as the same non-owner, then confirm from the owner's session — the
    // restore has to be proven on disk, not taken from the writer's own echo of it.
    const { error: notesBackErr } = await staff.from("pr_periods").update({ notes: originalNotes }).eq("id", period.id).select();
    const { data: notesNow, error: notesNowErr } = await owner.from("pr_periods").select("notes").eq("id", period.id).maybeSingle();
    if (notesNowErr) bail("re-reading the period's notes as owner: " + notesNowErr.message);
    if (!notesBackErr && notesNow && sameText(notesNow.notes, originalNotes)) {
      pass("original notes restored", `notes back to ${JSON.stringify(notesNow.notes)}`);
    } else {
      fail("notes restore did not verify", `${notesBackErr ? notesBackErr.message + " — " : ""}notes now ${JSON.stringify(notesNow && notesNow.notes)}, expected ${JSON.stringify(originalNotes)} (the cleanup below will try again as owner)`);
    }

    /* ---- [4] NEGATIVE: the non-owner must not move status — the core proof ---- */
    console.log(`\n  [4] non-owner (${staffUser.username}) publishes the LOCKED period — must be blocked`);
    const { data: stBlocked, error: stErr } = await staff.from("pr_periods")
      .update({ status: "published" }).eq("id", period.id).select();

    const stRows = (stBlocked || []).length;
    if (!stErr && stRows > 0) {
      fail("RLS did NOT block the non-owner", `the update changed ${stRows} row(s) — a non-owner just published a locked week`);
    } else if (stErr) {
      pass("blocked with an error", `${stErr.code || "?"}: ${stErr.message}`);
    } else {
      pass("blocked silently (0 rows)", "no error — PostgREST returned 200 with an empty array, which is why the re-read below matters");
    }

    // The half that actually decides it: what does the column say, read by someone who can see it.
    const { data: stAfter, error: stAfterErr } = await owner.from("pr_periods").select("status").eq("id", period.id).maybeSingle();
    if (stAfterErr) bail("re-reading the period as owner: " + stAfterErr.message);
    if (!stAfter) bail("the period vanished mid-test");
    if (stAfter.status === "locked") {
      pass("status unchanged on disk", `pr_periods.id ${period.id} status is still '${stAfter.status}'`);
    } else {
      fail("status CHANGED on disk", `expected 'locked', found '${stAfter.status}' — the write got through and the week is no longer frozen`);
    }

    /* ---- [5] POSITIVE: the owner may move status ---- */
    console.log(`\n  [5] owner (${OWNER_USERNAME}) publishes the same LOCKED period — must succeed`);
    const { data: pubData, error: pubErr } = await owner.from("pr_periods")
      .update({ status: "published" }).eq("id", period.id).select();
    if (pubErr) {
      fail("owner was blocked", `${pubErr.code || "?"}: ${pubErr.message} — the policy is too strict; the owner cannot unlock or publish a week`);
    } else if ((pubData || []).length !== 1) {
      fail("owner's status change changed no rows", "no error, but 0 rows came back — the owner is silently blocked");
    } else {
      pass("owner's status change succeeded", `status is now '${pubData[0].status}'`);
    }
  } finally {
    /* ---- CLEANUP: the period must end exactly as it started ---- */
    // A net, not a bookkeeping exercise: read what is actually there and put back whatever moved,
    // whichever case above died. published_at rides along because a trigger may have stamped it
    // on the way to 'published'.
    console.log("\n  cleanup  pr_periods");
    const { data: now, error: nowErr } = await owner.from("pr_periods").select("status,notes,published_at").eq("id", period.id).maybeSingle();
    if (nowErr || !now) {
      fail("could not read the period back for cleanup", `${nowErr ? nowErr.message : "row missing"} — CHECK BY HAND: pr_periods.id ${period.id} must be status 'locked', notes ${JSON.stringify(originalNotes)}`);
    } else if (now.status === "locked" && sameText(now.notes, originalNotes)) {
      pass("period left exactly as found", `pr_periods.id ${period.id} status 'locked', notes ${JSON.stringify(now.notes)}`);
    } else {
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
    const { data: pa } = await owner.from("pr_periods").select("published_at").eq("id", period.id).maybeSingle();
    if (pa && !sameText(pa.published_at, originalPublishedAt)) {
      console.log(`  note     published_at moved: was ${JSON.stringify(originalPublishedAt)}, now ${JSON.stringify(pa.published_at)} (a trigger stamps it) — set it back by hand if it matters`);
    }
  }
}

/* ---------- the test ---------- */

async function main() {
  console.log("\nLIVE RLS — pr_items lock policy + pr_periods status policy");
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

  // 2. discover a non-owner that can actually sign in — proven from the database rather than
  //    guessed from a name. auth_uid must exist or there is no account to sign in to.
  const { data: staffRows, error: staffErr } = await owner.from("erp_users")
    .select("username,role,auth_uid").neq("role", "owner").not("auth_uid", "is", null).order("username").limit(1);
  if (staffErr) bail("listing erp_users: " + staffErr.message);
  if (!staffRows || !staffRows.length) bail("no non-owner account with a login exists to test with");
  const staffUser = staffRows[0];
  if (staffUser.role === "owner") bail("discovery returned an owner — refusing to test the wrong case");
  console.log(`  staff    ${staffUser.username} (role '${staffUser.role}')`);

  // 3. the locked week
  const { data: locked, error: perErr } = await owner.from("pr_periods").select("id,label,status,notes,published_at").eq("status", "locked").order("id");
  if (perErr) bail("reading pr_periods: " + perErr.message);
  if (!locked || !locked.length) bail("no period has status 'locked' — nothing to test against");
  if (locked.length > 1) console.log(`  note     ${locked.length} locked periods; using the lowest id`);
  const period = locked[0];
  console.log(`  period   #${period.id} "${period.label}" (status '${period.status}')`);

  const staff = await signIn(mkClient(), staffUser.username, STAFF_PW, "staff");

  try {
    // pr_items runs first and pr_periods second, on purpose: the pr_items cases are only
    // meaningful while the period is locked, and [5] briefly publishes it.
    await itemsLockCases(owner, staff, staffUser, period);
    await periodStatusCases(owner, staff, staffUser, period);
  } finally {
    await owner.auth.signOut().catch(() => {});
    await staff.auth.signOut().catch(() => {});
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
