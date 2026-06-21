'use server';

import { createClient } from '@/lib/supabase/server';
import { leadStatusSchema, callNoteSchema } from '@/lib/validation/schemas';
import { revalidatePath } from 'next/cache';
import { statusLabel, type LeadStatus } from '@/lib/pipeline';

async function logEvent(
  supabase: ReturnType<typeof createClient>,
  leadId: string,
  type: string,
  detail: string,
  actorId: string | null
) {
  await supabase.from('lead_events').insert({
    lead_id: leadId, type, detail, actor_id: actorId,
  });
}

export async function updateLeadStatus(formData: FormData) {
  const parsed = leadStatusSchema.safeParse({
    id: formData.get('id'),
    status: formData.get('status'),
  });
  if (!parsed.success) return { error: 'That pipeline stage is not valid.' };

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Your session has expired. Sign in again.' };

  const { error } = await supabase
    .from('leads')
    .update({ status: parsed.data.status, updated_at: new Date().toISOString() })
    .eq('id', parsed.data.id);
  if (error) return { error: 'The stage could not be updated. Try again.' };

  await logEvent(
    supabase, parsed.data.id, 'status_changed',
    statusLabel(parsed.data.status as LeadStatus), user?.id ?? null
  );

  revalidatePath(`/app/leads/${parsed.data.id}`);
  revalidatePath('/app/leads');
  revalidatePath('/app');
  return { ok: true };
}

export async function assignLead(formData: FormData) {
  const id = String(formData.get('id'));
  const raw = String(formData.get('assigned_to'));
  const assigned_to = raw === '' ? null : raw;

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  await supabase
    .from('leads')
    .update({ assigned_to, updated_at: new Date().toISOString() })
    .eq('id', id);

  let label = 'Unassigned';
  if (assigned_to) {
    const { data: p } = await supabase
      .from('profiles').select('full_name').eq('id', assigned_to).single();
    label = `Assigned to ${p?.full_name ?? 'associate'}`;
  }
  await logEvent(supabase, id, 'assigned', label, user?.id ?? null);

  revalidatePath(`/app/leads/${id}`);
  revalidatePath('/app/leads');
}

export async function addCallNote(formData: FormData) {
  const parsed = callNoteSchema.safeParse({
    lead_id: formData.get('lead_id'),
    body: formData.get('body'),
  });
  if (!parsed.success) return;

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  await supabase.from('call_notes').insert({
    lead_id: parsed.data.lead_id,
    body: parsed.data.body,
    author_id: user?.id ?? null,
  });

  revalidatePath(`/app/leads/${parsed.data.lead_id}`);
}
