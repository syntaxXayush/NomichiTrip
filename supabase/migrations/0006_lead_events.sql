-- supabase/migrations/0006_lead_events.sql
create table lead_events (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  actor_id uuid references profiles(id),
  type text not null check (type in ('status_changed','assigned','message_saved','created')),
  detail text,
  created_at timestamptz not null default now()
);

create index on lead_events (lead_id, created_at desc);

alter table lead_events enable row level security;
create policy "events_auth_all" on lead_events for all to authenticated
  using (true) with check (true);

-- public enquiry creates an event too (anon insert, lead creation only)
create policy "events_public_insert" on lead_events for insert to anon with check (true);
