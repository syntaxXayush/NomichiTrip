-- supabase/seed.sql
-- Run after migrations. Creates demo trips + leads.

with t as (
  insert into trips (name, destination, start_date, end_date, price, total_seats, status, description, hero_image_url)
  values
    ('Slow Days in Spiti', 'Spiti Valley, Himachal Pradesh',
     '2027-06-12', '2027-06-21', 58000, 12, 'open',
     'Ten unhurried days across the high desert. Old monasteries, cold rivers, long silences, and the kind of conversations that only happen at altitude.',
     'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80'),
    ('The Backwater Quiet', 'Alleppey & Kumarakom, Kerala',
     '2027-07-04', '2027-07-10', 42000, 10, 'open',
     'A week on slow water. Houseboats, toddy shops, morning birdsong, and food cooked the way grandmothers intended.',
     'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80'),
    ('Ladakh, Without the Rush', 'Leh & Nubra, Ladakh',
     '2027-08-15', '2027-08-26', 76000, 14, 'open',
     'Twelve days of thin air and wide skies. We acclimatise properly, drive less, and stay longer in fewer places.',
     'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1200&q=80'),
    ('Coastal Karnataka Hush', 'Gokarna & Honnavar',
     '2027-09-05', '2027-09-11', 38000, 12, 'closed',
     'Empty beaches and temple towns on the Konkan coast. Currently closed while we finalise stays.',
     'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80')
  returning id, name
)
insert into leads (name, phone, email, trip_id, group_type, preferred_month, expectations, status)
select * from (
  select 'Maya Rao', '+919812345678', 'maya@example.com',
    (select id from t where name = 'Slow Days in Spiti'),
    'Couple', 'June', 'A break from screens. Mountains, books, and good chai.', 'new'
  union all
  select 'Arjun Menon', '+919900112233', 'arjun@example.com',
    (select id from t where name = 'The Backwater Quiet'),
    'Solo', 'July', 'Somewhere I can write for a week. Quiet, green, slow.', 'contacted'
  union all
  select 'Priya & Friends', '+919765432100', 'priya@example.com',
    (select id from t where name = 'Ladakh, Without the Rush'),
    'Friends', 'August', 'Big skies, real adventure, but not a checklist tour.', 'vibe_check_sent'
  union all
  select 'The Iyer Family', '+919654321789', 'iyer@example.com',
    (select id from t where name = 'Slow Days in Spiti'),
    'Family', 'June', 'Something our teens will remember. Safe but not boring.', 'qualified'
) s;
