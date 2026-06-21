import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function check() {
  const { data, error } = await supabase.from('trips').select('*');
  if (error) {
    console.error('Error fetching trips:', error);
  } else {
    console.log('Total trips returned:', data.length);
    console.log('Trips:', data.map(t => ({ name: t.name, status: t.status, start_date: t.start_date, end_date: t.end_date })));
  }
}
check();
