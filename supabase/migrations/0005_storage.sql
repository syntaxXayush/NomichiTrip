-- add image column to trips
alter table trips add column hero_image_url text;

-- public bucket for trip imagery
insert into storage.buckets (id, name, public)
values ('trip-images', 'trip-images', true)
on conflict (id) do nothing;

-- anyone can view trip images (public site)
create policy "trip_images_public_read"
  on storage.objects for select
  using (bucket_id = 'trip-images');

-- only authenticated associates can upload/replace/delete
create policy "trip_images_auth_write"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'trip-images');

create policy "trip_images_auth_update"
  on storage.objects for update to authenticated
  using (bucket_id = 'trip-images');

create policy "trip_images_auth_delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'trip-images');
