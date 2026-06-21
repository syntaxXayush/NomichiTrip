'use server';

import { createClient } from '@/lib/supabase/server';
import { tripSchema } from '@/lib/validation/schemas';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const nn = (v: FormDataEntryValue | null) => {
  const s = v == null ? '' : String(v).trim();
  return s === '' ? null : s;
};

export async function saveTrip(formData: FormData) {
  const parsed = tripSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect('/app/trips?error=1');

  const d = parsed.data;
  const id = nn(formData.get('id'));
  const supabase = createClient();

  const row = {
    name: d.name.trim(),
    destination: nn(formData.get('destination')),
    start_date: nn(formData.get('start_date')),
    end_date: nn(formData.get('end_date')),
    price: d.price ?? null,
    total_seats: d.total_seats ?? null,
    status: d.status,
    description: nn(formData.get('description')),
    hero_image_url: nn(formData.get('hero_image_url')),
    updated_at: new Date().toISOString(),
  };

  if (id) {
    await supabase.from('trips').update(row).eq('id', id);
  } else {
    await supabase.from('trips').insert(row);
  }

  revalidatePath('/app/trips');
  revalidatePath('/');
  redirect('/app/trips');
}
