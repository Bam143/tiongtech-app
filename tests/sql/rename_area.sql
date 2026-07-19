-- public.rename_area(old_name text, new_name text) -> integer (clients updated)
--
-- Renames an area and rewrites every client carrying the old name, in ONE transaction.
--
-- WHY A FUNCTION AT ALL. clients.area is TEXT, not a foreign key, so nothing in the schema keeps
-- the two tables agreeing. Renaming the areas row on its own leaves every client on the old string
-- pointing at a value that is no longer an area — invisible until someone opens the client form and
-- finds the dropdown blank. Two statements from the browser can produce exactly that: the first
-- commits, the connection drops, and there is no way to tell it happened. A plpgsql function body
-- runs inside a single transaction, so both UPDATEs commit together or neither does, and any RAISE
-- below rolls back everything already done in the call.
--
-- ---------------------------------------------------------------------------------------------
-- READ BEFORE RUNNING — three things worth deciding on rather than inheriting:
--
-- 1. SECURITY DEFINER BYPASSES RLS. That is why it can rewrite clients.area at all, and it is why
--    the authorisation check at the top is load-bearing rather than decorative: without it, ANY
--    authenticated user could call this and edit client rows. Consequence to be aware of — an
--    Admin Officer renaming an area updates client rows they may have no direct write policy for.
--    That is the point of the cascade, but it IS a privilege elevation scoped to this one column.
--
-- 2. THE CASCADE IS EXACT-MATCH, not case-insensitive. Renaming "Basag" does not touch a client
--    stored as "basag". Widening it to lower(area) = lower(v_old) would sweep rows this function
--    was not asked about, so it stays strict. Check for existing drift BEFORE running this:
--
--       select c.area, count(*)
--       from public.clients c
--       where c.area is not null and c.area <> ''
--         and not exists (select 1 from public.areas a where a.name = c.area)
--       group by c.area order by 2 desc;
--
--    Anything that comes back is a client already pointing at a non-area, and a rename will not
--    fix it. Clean those separately.
--
-- 3. IT ASSUMES is_owner() AND is_admin_officer() EXIST. Confirm before running:
--
--       select proname from pg_proc
--       where pronamespace = 'public'::regnamespace and proname in ('is_owner','is_admin_officer');
--
--    Both should come back. If is_owner() does not exist, replace the call with whatever the
--    `areas` write policy already uses for the owner, so this function and that policy cannot
--    drift apart.
-- ---------------------------------------------------------------------------------------------

create or replace function public.rename_area(old_name text, new_name text)
returns integer
language plpgsql
security definer
-- Pinned so a caller cannot put their own schema in front of ours and have this function call
-- their is_admin_officer(). Mandatory for SECURITY DEFINER, not optional hardening.
set search_path = public, pg_temp
as $$
declare
  v_old     text := btrim(old_name);
  v_new     text := btrim(new_name);
  v_clash   integer;
  v_clients integer;
begin
  -- Authorisation FIRST, before anything reads or writes. Mirrors the write policy on
  -- public.areas; RLS is not enforced inside a SECURITY DEFINER body, so this IS the gate.
  if not (public.is_owner() or public.is_admin_officer()) then
    raise exception 'Only the owner or an Admin Officer can rename an area.'
      using errcode = '42501';                       -- insufficient_privilege
  end if;

  if v_old is null or v_old = '' then
    raise exception 'The area to rename was not given.'
      using errcode = '22023';                       -- invalid_parameter_value
  end if;

  if v_new is null or v_new = '' then
    raise exception 'The new area name cannot be blank.'
      using errcode = '22023';
  end if;

  -- The area must actually exist. Without this the function would report 0 clients updated for a
  -- name that was never there, which reads to the caller exactly like a successful rename of an
  -- unused area.
  perform 1 from public.areas where name = v_old;
  if not found then
    raise exception 'That area no longer exists.'
      using errcode = 'P0002';                       -- no_data_found
  end if;

  -- Case-insensitive, and excluding the row being renamed so that fixing the CASE of a name
  -- ("basag" -> "Basag") does not collide with itself. Deliberately stricter than the UNIQUE
  -- constraint, which compares exactly: two casings of one area is not a duplicate to Postgres,
  -- but it splits the client-form dropdown and halves every by-area report.
  select count(*) into v_clash
  from public.areas
  where lower(name) = lower(v_new)
    and name <> v_old;

  if v_clash > 0 then
    raise exception 'That area already exists.'
      using errcode = '23505';                       -- unique_violation
  end if;

  update public.areas   set name = v_new where name = v_old;
  update public.clients set area = v_new where area = v_old;
  get diagnostics v_clients = row_count;             -- must follow the clients UPDATE immediately

  return v_clients;
end;
$$;

-- EXECUTE is granted, not assumed. A SECURITY DEFINER function is public by default, which would
-- expose the RLS bypass above to anon as well as to signed-in users.
revoke all on function public.rename_area(text, text) from public, anon;
grant execute on function public.rename_area(text, text) to authenticated;


-- ---------------------------------------------------------------------------------------------
-- VERIFY AFTER RUNNING. Both should behave as commented; run them as a NON-officer too.
--
--   -- refused for anyone who is neither owner nor Admin Officer (expect 42501)
--   select public.rename_area('Basag', 'Basag Test');
--
--   -- a rename that collides (expect 23505, 'That area already exists.')
--   select public.rename_area('Basag', 'Anabu');
--
--   -- the real thing, then check both tables agree
--   select public.rename_area('Basag', 'Basag Proper');
--   select name from public.areas where name in ('Basag', 'Basag Proper');
--   select area, count(*) from public.clients where area in ('Basag', 'Basag Proper') group by area;
--
-- To undo a test rename: select public.rename_area('Basag Proper', 'Basag');
-- ---------------------------------------------------------------------------------------------
