# Tests

## Run them

```sh
npm install     # once
npm test        # 23 tests, ~1 second
```

To rebuild `app.js` after editing `app.jsx`:

```sh
npm run build
```

## What this covers

One suite today: **`pr_save_items`** — the Payroll screen's Save button, wired to Supabase in
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

## Adding tests

No framework — `makeSuite()` in `harness.mjs` gives `test`, `eq`, and `ok`, which is enough. That
keeps the suite dependency-free apart from Babel.

Worth doing when you add one: **check it can fail.** Break the code on purpose and confirm the
test goes red. Every test here was written that way — e.g. forcing `leave_type_id` through the
numeric coercer turns exactly one test red, and dropping the installment deductions from the net
calculation turns two red. A test that passes no matter what is worse than no test, because it
reads like coverage.
