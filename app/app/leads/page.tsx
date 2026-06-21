import Link from 'next/link';
import { Download, Inbox, Phone } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { type LeadStatus } from '@/lib/pipeline';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { timeAgo } from '@/lib/format';
import { LeadFilters } from '@/components/app/LeadFilters';

export const dynamic = 'force-dynamic';
type SP = { q?: string; status?: string; trip?: string; owner?: string };

export default async function LeadsPage({ searchParams }: { searchParams: SP }) {
  const supabase = createClient();
  const [{ data: trips }, { data: profiles }] = await Promise.all([
    supabase.from('trips').select('id,name').order('name'),
    supabase.from('profiles').select('id,full_name').order('full_name'),
  ]);

  let query = supabase
    .from('leads')
    .select('id,name,phone,email,status,created_at,updated_at,trip_id,trips(name),profiles(full_name)')
    .order('updated_at', { ascending: false });

  if (searchParams.q) {
    const safeQuery = searchParams.q.replace(/[,%()]/g, '').trim();
    if (safeQuery) query = query.or(`name.ilike.%${safeQuery}%,phone.ilike.%${safeQuery}%,email.ilike.%${safeQuery}%`);
  }
  if (searchParams.status) query = query.eq('status', searchParams.status as LeadStatus);
  if (searchParams.trip) query = query.eq('trip_id', searchParams.trip);
  if (searchParams.owner) query = searchParams.owner === 'unassigned' ? query.is('assigned_to', null) : query.eq('assigned_to', searchParams.owner);

  const { data: leads } = await query;

  return (
    <div className="mx-auto max-w-7xl">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rust-dark">Conversation pipeline</p>
          <h1 className="editorial-title mt-2 text-4xl">Leads</h1>
          <p className="mt-2 text-sm text-muted-foreground">See who is waiting, who owns the conversation and what moved most recently.</p>
        </div>
        <a href="/app/leads/export" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-input bg-card px-4 py-2.5 text-sm font-semibold text-ink/75 transition hover:border-rust/45 hover:text-rust-dark"><Download className="size-4" /> Export CSV</a>
      </header>

      <div className="mt-8"><LeadFilters trips={trips ?? []} profiles={profiles ?? []} current={searchParams} /></div>

      <div className="mt-5 overflow-hidden rounded-2xl border border-sand/50 bg-card">
        {!leads?.length ? (
          <div className="p-12 text-center"><Inbox className="mx-auto size-9 text-rust-dark" /><h2 className="editorial-title mt-5 text-2xl">No leads found</h2><p className="mt-2 text-sm text-muted-foreground">Try clearing a filter or changing the search.</p></div>
        ) : (
          <>
            <div className="hidden grid-cols-[minmax(190px,1.2fr)_minmax(170px,1fr)_140px_150px_90px] gap-4 border-b border-sand/40 bg-[#F5EDDF] px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground lg:grid">
              <span>Traveller</span><span>Trip</span><span>Stage</span><span>Owner</span><span className="text-right">Last touch</span>
            </div>
            <ul className="divide-y divide-sand/35">
              {leads.map((lead: any) => (
                <li key={lead.id}>
                  <Link href={`/app/leads/${lead.id}`} className="block px-5 py-4 transition hover:bg-rust/[0.035] lg:grid lg:grid-cols-[minmax(190px,1.2fr)_minmax(170px,1fr)_140px_150px_90px] lg:items-center lg:gap-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#F1E8D9] text-sm font-semibold text-ink">{lead.name.slice(0, 1).toUpperCase()}</span>
                      <div className="min-w-0"><div className="truncate text-sm font-semibold text-ink">{lead.name}</div><div className="mt-0.5 flex items-center gap-1.5 truncate text-xs text-muted-foreground"><Phone className="size-3" /> {lead.phone ?? lead.email ?? 'No contact details'}</div></div>
                    </div>
                    <div className="mt-3 truncate text-sm text-ink/70 lg:mt-0">{lead.trips?.name ?? 'No trip selected'}</div>
                    <div className="mt-3 lg:mt-0"><StatusBadge status={lead.status} /></div>
                    <div className="mt-3 text-xs text-muted-foreground lg:mt-0">{lead.profiles?.full_name ?? 'Unassigned'}</div>
                    <div className="mt-3 text-xs text-muted-foreground lg:mt-0 lg:text-right">{timeAgo(lead.updated_at ?? lead.created_at)}</div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
