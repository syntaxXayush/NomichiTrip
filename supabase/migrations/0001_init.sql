create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  created_at timestamptz not null default now()
);

create table trips (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  destination text,
  start_date date,
  end_date date,
  price numeric(10,2),
  total_seats int,
  status text not null default 'open' check (status in ('open','closed')),
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  trip_id uuid references trips(id) on delete set null,
  group_type text,
  preferred_month text,
  expectations text,
  status text not null default 'new'
    check (status in ('new','contacted','qualified','vibe_check_sent','confirmed','not_a_fit')),
  assigned_to uuid references profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table call_notes (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references leads(id) on delete cascade,
  author_id uuid references profiles(id),
  body text not null,
  created_at timestamptz not null default now()
);

create index on leads (status);
create index on leads (assigned_to);
create index on call_notes (lead_id, created_at desc);
