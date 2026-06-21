-- Allow public (anon) users to read trips so they appear on the public homepage.
drop policy if exists "trips_public_read" on trips;
create policy "trips_public_read" on trips
  for select to anon using (true);
