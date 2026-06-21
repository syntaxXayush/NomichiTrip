create table messages (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  author_id uuid references profiles(id),
  intent text,
  content text not null,
  status text not null default 'draft' check (status in ('draft','sent')),
  created_at timestamptz not null default now()
);

create index on messages (lead_id, created_at desc);

alter table messages enable row level security;
create policy "messages_auth_all" on messages for all to authenticated
  using (true) with check (true);
