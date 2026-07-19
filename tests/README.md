# Tests

## Run them

```sh
npm install     # once
npm test        # 336 tests, ~2 seconds
npm run mutate  # 120 mutations — proves the suites can actually fail (~2 min)
```

To rebuild `app.js` after editing `app.jsx`:

```sh
npm run build
```

There is also `npm run test:rls`, which is **not** part of `npm test` — it talks to the real
Supabase project and needs credentials. See "The live RLS test" below.

## What this covers

Three suites:

- **`test-payroll.mjs`** — `pr_save_items` and the payroll writes around it (detailed below).
- **`test-access.mjs`** — the Settings "Access" column and the rule that it must agree with what
  `canView()` enforces at login. It exists because `erp_users.allowed_views` is a TEXT column, so
  an unparsed grant read as "no restrictions" and showed a restricted user as *Full access*.
- **`test-areas.mjs`** — the Areas screen: the `position` gate, and the add and rename paths behind
  it. Areas
  is the first screen gated on **position** rather than role or an `allowed_views` grant, because
  role cannot carry the decision — `ROLE_VIEWS.admin` is `"*"` and most of the company holds role
  `admin` with their real job title in `position`. One guard clause in `canView` is the whole
  barrier, and a regression there is silent: the nav item just appears for someone it shouldn't.
  The suite also covers the three ways the database can refuse a write, two of which don't raise
  (a silent 200 + `[]`, and a 23505 unique violation).

  **On the rename tests and atomicity.** Renaming an area also rewrites `clients.area` on every
  client carrying it, and the two must move together — `clients.area` is TEXT, not a foreign key,
  so nothing in the schema keeps them agreeing. That is done by a Postgres function,
  `tests/sql/rename_area.sql`, which owns both `UPDATE`s in one body and therefore one
  transaction. **These tests cannot prove that transaction exists**: `makeFakeSB` has no
  transactions, so the rollback case models the *outcome* of one (the function raises, neither
  table moved) rather than demonstrating one. What they *do* prove is the half the app controls —
  that it makes exactly **one** call. A second round trip is how a browser produces a half-applied
  rename, and no amount of care in the SQL can stop the app reintroducing it. Real transactional
  proof belongs in `rls-live.mjs`, against the real database.

### The payroll suite in detail

**`pr_save_items`** — the Payroll screen's Save button, wired to Supabase in
`API()` inside `app.jsx`. It checks that a Save:

- **updates** an existing row and **inserts** a draft one, keyed by `(period_id, employee_id)`
- coerces money and ids to real numbers (a text input hands over `"500"`, the column needs `500`)
- keeps nulls **null** — `leave_type_id` and the `snap_*` columns must never become `0`
- **never writes `status` or `approved_at`** — saving is not approving
- leaves alone the 26 columns other flows own (deductions, printing, approval, remarks)
- stores `gross`/`net` matching exactly what the screen shows
- stamps `updated_at` as a real UTC instant
- **doesn't delete anything** (see "keep_ids" below)
- leaves the other 15 payroll writes falling through to "not connected to Supabase yet"

## How it works

The tests run against the **built `app.js`** — the file the browser actually loads — not against
`app.jsx`. So a green run means the shipped bundle behaves, not just the source. **Rebuild before
testing** if you've changed `app.jsx`; `npm run build && npm test`.

`app.js` is a browser script, not a module: everything is a top-level `const` in one scope, so
nothing can be imported. `harness.mjs` runs it inside a Node VM with the browser globals stubbed
(React, ReactDOM, Leaflet, icons — anything the tests don't care about resolves to a
do-nothing stub), strips the bootstrap tail that would render the app and hit the network, and
hands back `API()`.

There is **no real Supabase** and no network. `makeFakeSB()` stands in for the PostgREST query
builder — `sb.from(t).select(c).eq(k,v)`, `.update(row).eq("id",n)`, `.insert(row)` — and records
every call, so a test can assert exactly what would have been written. It's keyed by table name,
because the save reads three tables and a single-table fake would hand `pr_items` rows back to a
`pr_employees` query and pass anyway.

## Two things to know

**Babel is pinned to 7 on purpose.** The committed `app.js` was built with Babel 7. Babel 8
compiles the same source differently (it drops the `_extends` helper and stops escaping
non-ASCII), which would rewrite ~800KB of `app.js` and bury any real change in the noise. Babel 7
reproduces the committed file almost exactly, so a diff of `app.js` stays reviewable. Don't
bump the major.

**`keep_ids` doesn't delete yet.** The Save payload carries a `keep_ids` list, which almost
certainly means "delete this period's rows for anyone not in it" — the grid's remove button makes
no API call of its own, so a Save is the only thing that could persist a removal. But whether the
server guards that against approved / locked / printed lines can't be determined from this repo,
and a blind delete would erase an approved payslip. So removal doesn't stick — the row reappears
on reload. A test pins this, so if you implement the delete, that test *should* fail. Change it
deliberately.

## The live RLS test — `npm run test:rls`

Everything above runs against a fake, which proves the **app** behaves. It can prove nothing
about RLS: the fake has no policies and says yes to everything. `rls-live.mjs` connects to the
real project and asks the database directly what it refuses. It covers two policies:

- **`pr_items`** — a non-owner may not edit a row of a locked week; the owner may.
- **`pr_periods`** — three tiers. The **owner** moves `status` in any direction. A **payroll**
  officer may publish and lock, but may not unlock a locked week and may not send one back to
  draft. **Everyone else** may edit a period's `notes`/`label`/`pay_date` and may not touch
  `status` at all.

```sh
SB_OWNER_PW=... SB_STAFF_PW=... npm run test:rls
```

Passwords come from the environment and are never in the file; the project URL and publishable key
are read out of `index.html` (both public — that key ships to every browser, and RLS is what
protects the data). It **writes real production rows** — one `pr_items` row, and the period's
`notes` and `status` — puts every one back, verifies the restore, and prints the ids it touched.

**Three accounts, discovered by role, never by name.** The owner, a `role='payroll'` officer and
an outsider holding neither role, all read out of `erp_users`. "blen sounds like payroll" is not a
fact, and a case built on it tests whatever that account happens to be today. With no payroll
account it bails **exit 2** rather than running: the remaining cases would pass against a policy
that granted payroll nothing, which is indistinguishable from a green run.

**Every negative case asserts twice, and that is the point.** PostgREST does not error when RLS
hides rows from an UPDATE — it returns 200 with an empty array. So `if (error)` never fires and a
naive test reports PASS whether the policy exists or not. Running it is what turned up the
silent-write bug in the adapter.

**A refusal has two shapes, and they are not interchangeable.** A `USING` clause *hides* the row:
200 + `[]`, no error. A `WITH CHECK` violation is an outright **42501**. `pr_items` refuses the
first way and `pr_periods` the second — both visible in a single run. Asserting "zero rows" against
a `WITH CHECK` policy reports FAIL against a policy that works perfectly. Assert that the value on
disk did not move; that is the only check true for both.

**The status cases are a sequence, not a set.** Each clause of the `pr_periods` policy needs a
different starting state, so the test walks the period once around `draft → published → locked` and
puts it back. Two consequences worth knowing before editing it: an owner step exists purely to set
up the payroll-publish case (publishing from `published` would satisfy the *unchanged* clause and
pass against a policy with no payroll rule at all), and cleanup is a **net** rather than
bookkeeping — it re-reads the period and repairs whatever moved, so an assertion throwing mid-way
cannot leave a production payroll week sitting in `draft`.

**What it cannot see.** It proves the *database* separates the tiers. It says nothing about whether
the accounts are separable at *login* — if every non-owner shares one password, the payroll
officer's rights belong to everyone who knows it, and this test still passes.

## Adding tests

No framework — `makeSuite()` in `harness.mjs` gives `test`, `eq`, and `ok`, which is enough. That
keeps the suite dependency-free apart from Babel.

**Check it can fail.** A test that passes no matter what the code does reads exactly like
coverage and is worse than no test, because it buys confidence it hasn't earned. `npm run mutate`
does this for you: it breaks one guard at a time and asserts the suite goes red for each. A
mutation reported **SURVIVED** is a hole — that behaviour is unprotected. Add a mutation whenever
you add a guard worth keeping.

**A write can fail three ways, and the fake simulates each separately.** They are different
events, not three names for one, and a handler usually has to treat them differently:

| option | what it simulates | shape |
| --- | --- | --- |
| `blockWrites` | RLS `USING` hid the row from the returning clause | 200 + `[]`, **no error object** |
| `errorWrites` | RLS `WITH CHECK` rejected the row | raises **42501** |
| `conflictWrites` | a UNIQUE constraint rejected the data | raises **23505** |

`blockWrites` is the dangerous one: there is no error to check, so a handler that only tests
`error` reports success for a write that never landed. `conflictWrites` is not a permission
failure at all — the write was allowed and the *data* was refused — so a handler should usually
translate it into something a user can act on ("that already exists") rather than surfacing the
constraint name. When both `conflictWrites` and `errorWrites` match, the conflict wins, because
that is what Postgres reports.

**Postgres functions are stubbed per name.** `sb.rpc(fn, params)` resolves against
`opts.rpcs = { fn_name: handler }`, where the handler is a value (becomes `data`), an envelope
(`{ data }` / `{ error }`), or a function of the params returning either. A handler that mutates
the fixture tables models a function that writes; one that raises *without* mutating them models a
rollback. An **unstubbed** name comes back `42883 does not exist` rather than an empty success —
deliberately, because a fake that answered `{ data: null, error: null }` would let a handler
calling the **wrong function name** pass, and the name is the entire contract with the database.

## SQL that lives outside the app

`tests/sql/` holds the Postgres functions the app calls with `sb.rpc()`. They are **not** applied
by any script here — they're run by hand in the Supabase SQL editor, and the copy in this repo is
the reviewable record of what was run. `rename_area.sql` carries its own read-before-running notes
(it is `SECURITY DEFINER`, so it bypasses RLS and its internal authorisation check is the only
gate) and a set of verify-after-running queries.

If you change one of these, the matching handler in `app.jsx` and the tests naming it have to move
with it: `test-areas.mjs` pins the function *name* precisely because a typo there is undetectable
from the app side.

Two more things about the **fake Supabase** (`makeFakeSB`) are worth knowing before you write a
test against an upsert:

**It resolves on the conflict key.** An upsert is matched against the columns named in
`{ onConflict: "a,b" }` — not against `.eq()` filters, which an upsert does not carry. A match
returns the merged rows; no match synthesises a new row with a fresh id, the way a real insert
would. Without that, an upsert against an empty fixture returned `[]`, which is indistinguishable
from a `blockWrites` refusal — so the first write of a row, the commonest path there is, looked
exactly like a silent rejection and would trip a handler's honest-failure check. The options
object is recorded on `sb.calls[i].opts`, so a test can assert `onConflict` was actually sent:
a handler that omits it behaves identically against the fake and then raises a duplicate-key
error against the real database.

Two things about the **mutation** harness are worth knowing before you touch it:

**It asserts each patch applied.** The first version used `sed`. Babel pretty-prints object
literals across lines, so the single-line patterns matched nothing, the suite ran against
untouched code, and it reported "29 passed" — indistinguishable from tests that don't bite. A
mutation check that can't tell "didn't apply" from "didn't kill" gives false confidence *about*
false confidence. A pattern that fails to match is a hard exit 2, never a pass.

**Patterns are written against the built `app.js`**, in Babel's output shape (multi-line object
literals), not the shape the code takes in `app.jsx`. When one stops applying it usually just
means the code moved: `npm run build`, look at the compiled form, update the pattern. Where the
same code exists in two functions, scope the mutation with `in: "_supaSaveItems"` rather than
anchoring on a neighbouring comment, which is free to change.
