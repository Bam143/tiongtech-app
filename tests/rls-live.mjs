// LIVE RLS test — talks to the REAL Supabase project. Not part of `npm test`.
//
// The rest of the suite runs app.js against a fake, which proves the APP behaves. It cannot
// prove anything about RLS, because the fake has no policies — it says yes to everything. This
// file exists to prove the database itself refuses a non-owner editing a locked week.
//
//   SB_OWNER_PW=... SB_STAFF_PW=... node tests/rls-live.mjs
//
// It signs in as real users and WRITES ONE ROW of production data (add_incentive on one item
// of the already-locked week), then puts it back and verifies the restore. It prints the exact
// pr_items.id it touched. The owner write will bump that row's updated_at if a trigger exists;
// that is accepted and not reset.
//
// Passwords come from the environment and are never written down here. The project URL and the
// anon key are read out of index.html — both are public by design (the key's JWT payload says
// role:"anon", and RLS is what protects the data), and reading them means there is one copy.
//
// WHY THE NEGATIVE CASE CHECKS TWICE: PostgREST does not error when RLS hides rows from an
// UPDATE. It returns 200 with an empty array. So `if (error)` never fires and a naive test
// reports PASS whether the policy exists or not. This asserts zero rows came back AND re-reads
// the row as the owner to prove the value on disk genuinely did not move.
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";

const EMAIL_DOMAIN = "@tiongtech.local";
const OWNER_USERNAME = "superadmin";

/* ---------- config ---------- */

function readPublicConfig() {
  const html = readFileSync("index.html", "utf8");
  const url = (html.match(/"(https:\/\/[a-z0-9-]+\.supabase\.co)"/) || [])[1];
  const key = (html.match(/"(eyJ[\w-]+\.[\w-]+\.[\w-]+)"/) || [])[1];
  if (!url || !key) throw new Error("SETUP: could not read the project URL / anon key from index.html");
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

async function signIn(client, username, password, who) {
  const { error } = await client.auth.signInWithPassword({ email: username + EMAIL_DOMAIN, password });
  if (error) bail(`could not sign in as ${who} (${username}${EMAIL_DOMAIN}): ${error.message}`);
  return client;
}

/* ---------- the test ---------- */

async function main() {
  console.log("\nLIVE RLS — pr_items lock policy");
  console.log("  project " + url + "\n");

  // 1. owner
  const owner = await signIn(mkClient(), OWNER_USERNAME, OWNER_PW, "owner");
  const { data: ownerRow, error: ownerRoleErr } = await owner.from("erp_users").select("username,role").eq("username", OWNER_USERNAME).maybeSingle();
  if (ownerRoleErr) bail("reading the owner's own erp_users row: " + ownerRoleErr.message);
  if (!ownerRow) bail(`signed in as ${OWNER_USERNAME} but it has no erp_users row`);
  // If superadmin is not actually role:'owner', the positive case below would be testing the
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
  const { data: locked, error: perErr } = await owner.from("pr_periods").select("id,label,status").eq("status", "locked").order("id");
  if (perErr) bail("reading pr_periods: " + perErr.message);
  if (!locked || !locked.length) bail("no period has status 'locked' — nothing to test against");
  if (locked.length > 1) console.log(`  note     ${locked.length} locked periods; using the lowest id`);
  const period = locked[0];
  console.log(`  period   #${period.id} "${period.label}" (status '${period.status}')`);

  // 4. a row in it
  const { data: items, error: itemErr } = await owner.from("pr_items").select("id,employee_id,add_incentive").eq("period_id", period.id).order("id").limit(1);
  if (itemErr) bail("reading pr_items: " + itemErr.message);
  if (!items || !items.length) bail(`locked period #${period.id} has no pr_items rows`);
  const item = items[0];
  const original = item.add_incentive;
  const temp = (Number(original) || 0) + 1;   // always differs, including when original is null
  console.log(`  item     pr_items.id ${item.id} (employee_id ${item.employee_id})`);
  console.log(`  column   add_incentive — original ${JSON.stringify(original)}, test value ${temp}\n`);

  const staff = await signIn(mkClient(), staffUser.username, STAFF_PW, "staff");

  let ownerWrote = false;
  try {
    /* ---- NEGATIVE: the non-owner must be refused ---- */
    console.log(`  [1] non-owner (${staffUser.username}) edits a LOCKED period — must be blocked`);
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
    if (Object.is(after.add_incentive, original) || Number(after.add_incentive) === Number(original)) {
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
      console.log("\n  cleanup");
      const { error: restoreErr } = await owner.from("pr_items").update({ add_incentive: original }).eq("id", item.id);
      if (restoreErr) {
        fail("could not restore the original value", `pr_items.id ${item.id} may still hold ${temp} — RESTORE BY HAND: set add_incentive = ${JSON.stringify(original)}`);
      } else {
        const { data: back } = await owner.from("pr_items").select("add_incentive").eq("id", item.id).maybeSingle();
        if (back && (Object.is(back.add_incentive, original) || Number(back.add_incentive) === Number(original))) {
          pass("original value restored", `pr_items.id ${item.id} add_incentive back to ${JSON.stringify(back.add_incentive)}`);
        } else {
          fail("restore did not verify", `pr_items.id ${item.id} now holds ${JSON.stringify(back && back.add_incentive)}, expected ${JSON.stringify(original)} — RESTORE BY HAND`);
        }
      }
    } else {
      console.log("\n  cleanup   nothing to undo — the owner write never landed");
    }
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
