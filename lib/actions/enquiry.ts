'use server';

import { createClient } from '@/lib/supabase/server';
import { enquirySchema } from '@/lib/validation/schemas';
import { redirect } from 'next/navigation';

export type EnquiryState = { error?: string; fieldErrors?: Record<string, string> };

const nn = (v: string | null | undefined) => {
  const s = v == null ? '' : String(v).trim();
  return s === '' ? null : s;
};

export async function createEnquiry(_prev: EnquiryState, formData: FormData) {
  const parsed = enquirySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const flattened = parsed.error.flatten().fieldErrors;
    const fieldErrors = Object.fromEntries(
      Object.entries(flattened)
        .filter(([, messages]) => messages?.[0])
        .map(([key, messages]) => [key, messages![0]])
    );
    return { error: 'A few details need your attention.', fieldErrors };
  }

  const d = parsed.data;
  const supabase = createClient();
  const leadId = crypto.randomUUID();

  const { error } = await supabase
    .from('leads')
    .insert({
      id: leadId,
      name: d.name.trim(),
      phone: nn(d.phone),
      email: nn(d.email),
      trip_id: nn(d.trip_id),
      group_type: nn(d.group_type),
      preferred_month: nn(d.preferred_month),
      expectations: nn(d.expectations),
      status: 'new',
    });

  if (error) return { error: 'Something went wrong. Please try again.' };

  await supabase.from('lead_events').insert({
    lead_id: leadId, type: 'created', detail: 'Enquiry submitted',
  });

  redirect('/enquiry/success');
}
