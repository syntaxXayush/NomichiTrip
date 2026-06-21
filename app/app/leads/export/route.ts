import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';
import { statusLabel, type LeadStatus } from '@/lib/pipeline';

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return new NextResponse('Unauthorised', { status: 401 });

  const { data: leads } = await supabase
    .from('leads')
    .select('name,phone,email,group_type,preferred_month,status,created_at,trips(name),profiles(full_name)')
    .order('created_at', { ascending: false });

  const esc = (v: unknown) => {
    const s = v == null ? '' : String(v);
    return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const header = ['Name','Phone','Email','Group','Preferred month','Status','Trip','Owner','Created'];
  const rows = (leads ?? []).map((l: any) => [
    l.name, l.phone, l.email, l.group_type, l.preferred_month,
    statusLabel(l.status as LeadStatus),
    l.trips?.name ?? '', l.profiles?.full_name ?? 'Unassigned',
    new Date(l.created_at).toISOString().slice(0, 10),
  ].map(esc).join(','));

  const csv = [header.join(','), ...rows].join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="nomichi-leads-${new Date().toISOString().slice(0,10)}.csv"`,
    },
  });
}
