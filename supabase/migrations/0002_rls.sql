create policy "trips_public_read" on trips for select using (status = 'open');
