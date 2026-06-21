-- Secure the core tables while keeping the public enquiry flow available.
alter table profiles enable row level security;
alter table trips enable row level security;
alter table leads enable row level security;
alter table call_notes enable row level security;

drop policy if exists "profiles_auth_read" on profiles;
create policy "profiles_auth_read" on profiles
  for select to authenticated using (true);

drop policy if exists "trips_auth_all" on trips;
create policy "trips_auth_all" on trips
  for all to authenticated using (true) with check (true);

drop policy if exists "leads_public_insert" on leads;
create policy "leads_public_insert" on leads
  for insert to anon with check (status = 'new' and assigned_to is null);

drop policy if exists "leads_auth_all" on leads;
create policy "leads_auth_all" on leads
  for all to authenticated using (true) with check (true);

drop policy if exists "call_notes_auth_all" on call_notes;
create policy "call_notes_auth_all" on call_notes
  for all to authenticated using (true) with check (true);

-- Refresh the original demo departures if they are still using the 2025 seed dates.
update trips set start_date = '2027-06-12', end_date = '2027-06-21'
where name = 'Slow Days in Spiti' and start_date < current_date;
update trips set start_date = '2027-07-04', end_date = '2027-07-10'
where name = 'The Backwater Quiet' and start_date < current_date;
update trips set start_date = '2027-08-15', end_date = '2027-08-26'
where name = 'Ladakh, Without the Rush' and start_date < current_date;
update trips set start_date = '2027-09-05', end_date = '2027-09-11'
where name = 'Coastal Karnataka Hush' and start_date < current_date;
