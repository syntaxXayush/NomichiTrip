'use server';

import { createClient } from '@/lib/supabase/server';
import { generateWhatsAppMessage, type Intent } from '@/lib/ai/whatsapp';
import { formatDateRange } from '@/lib/format';
import { revalidatePath } from 'next/cache';

export type GenState = { content?: string; error?: string };

export async function draftMessage(
  _prev: GenState,
  formData: FormData
): Promise<GenState> {
  const leadId = String(formData.get('lead_id'));
  const intent = String(formData.get('intent')) as Intent;

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Not authorised.' };

  const { data: lead } = await supabase
    .from('leads')
    .select('*, trips(name,destination,start_date,end_date)')
    .eq('id', leadId)
    .single();
  if (!lead) return { error: 'Lead not found.' };

  const { data: note } = await supabase
    .from('call_notes').select('body')
    .eq('lead_id', leadId).order('created_at', { ascending: false }).limit(1).single();

  const l = lead as any;
  try {
    const content = await generateWhatsAppMessage(intent, {
      name: l.name,
      tripName: l.trips?.name,
      destination: l.trips?.destination,
      dates: l.trips ? formatDateRange(l.trips.start_date, l.trips.end_date) : null,
      groupType: l.group_type,
      preferredMonth: l.preferred_month,
      expectations: l.expectations,
      lastNote: note?.body ?? null,
    });
    return { content };
  } catch {
    return { error: 'Could not generate a message. Check the Gemini key and try again.' };
  }
}

export async function saveMessage(formData: FormData) {
  const lead_id = String(formData.get('lead_id'));
  const content = String(formData.get('content'));
  const intent = String(formData.get('intent'));
  if (!content.trim()) return;

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  await supabase.from('messages').insert({
    lead_id, content, intent, author_id: user?.id ?? null, status: 'draft',
  });

  await supabase.from('lead_events').insert({
    lead_id, type: 'message_saved', detail: `WhatsApp draft (${intent})`,
    actor_id: user?.id ?? null,
  });
  revalidatePath(`/app/leads/${lead_id}`);
}
