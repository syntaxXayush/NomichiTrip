import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const updates = [
    ['Slow Days in Spiti', '2027-06-12', '2027-06-21', 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1200&q=80'],
    ['The Backwater Quiet', '2027-07-04', '2027-07-10', 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80'],
    ['Ladakh, Without the Rush', '2027-08-15', '2027-08-26', 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?w=1200&q=80'],
    ['Coastal Karnataka Hush', '2027-09-05', '2027-09-11', 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1200&q=80'],
  ];

  for (const [name, start_date, end_date, hero_image_url] of updates) {
    const { error } = await supabase.from('trips').update({ start_date, end_date, hero_image_url }).eq('name', name);
    if (error) throw new Error(`${name}: ${error.message}`);
  }
  console.log('DB updated');
}
run();
