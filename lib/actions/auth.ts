'use server';

import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = String(formData.get('email'));
  const password = String(formData.get('password'));
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect('/login?error=1');
  redirect('/app');
}

export async function logout() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
