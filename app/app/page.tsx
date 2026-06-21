import Link from 'next/link';
import { ArrowRight, CircleAlert, Clock3, UserRoundCheck, Users } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { STAGES } from '@/lib/pipeline';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { timeAgo } from '@/lib/format';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const supabase = createClient();
  const { data: leads } = await supabase.from('leads').select('id,name,status,assigned_to,created_at,updated_at,trips(name)').order('created_at', { ascending: false });
  const all = (leads ?? []) as any[];
  const active = all.filter((lead) => !['confirmed', 'not_a_fit'].includes(lead.status));
  const staleThreshold = Date.now() - 24 * 60 * 60 * 1000;
  const needsAttention = active
    .filter((lead) => lead.status === 'new' || !lead.assigned_to || new Date(lead.updated_at).getTime() < staleThreshold)
    .slice(0, 6);

  const stats = [
    { label: 'New enquiries', value: all.filter((lead) => lead.status === 'new').length, note: 'Waiting for first contact', icon: CircleAlert, tone: 'bg-rust/10 text-rust-dark' },
    { label: 'In conversation', value: active.filter((lead) => lead.status !== 'new').length, note: 'Currently moving', icon: Users, tone: 'bg-sand/35 text-ink' },
    { label: 'Unassigned', value: active.filter((lead) => !lead.assigned_to).length, note: 'Needs an owner', icon: Clock3, tone: 'bg-yellow/70 text-ink' },
    { label: 'Confirmed', value: all.filter((lead) => lead.status === 'confirmed').length, note: 'Seats secured', icon: UserRoundCheck, tone: 'bg-olive/12 text-olive' },
  ];

  return (
    <div className="mx-auto max-w-7xl">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rust-dark">Team overview</p>
          <h1 className="editorial-title mt-2 text-4xl text-ink">What needs attention today</h1>
          <p className="mt-2 text-sm text-muted-foreground">Start with the people who are waiting, then work the pipeline.</p>
        </div>
        <Link href="/app/leads" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-cream transition hover:bg-olive">Open all leads <ArrowRight className="size-4" /></Link>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, note, icon: Icon, tone }) => (
          <article key={label} className="rounded-2xl border border-sand/50 bg-card p-5 shadow-[0_1px_0_rgba(28,27,26,.03)]">
            <div className={`grid size-10 place-items-center rounded-xl ${tone}`}><Icon className="size-4" aria-hidden="true" /></div>
            <div className="editorial-title mt-6 text-4xl">{value}</div>
            <div className="mt-1 text-sm font-semibold text-ink">{label}</div>
            <div className="mt-1 text-xs text-muted-foreground">{note}</div>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.35fr_.65fr]">
        <section className="overflow-hidden rounded-2xl border border-sand/50 bg-card">
          <div className="flex items-center justify-between border-b border-sand/40 px-5 py-4 sm:px-6">
            <div><h2 className="font-semibold text-ink">Needs attention</h2><p className="mt-1 text-xs text-muted-foreground">New, unassigned or quiet for more than a day</p></div>
            <span className="rounded-full bg-rust/10 px-3 py-1 text-xs font-semibold text-rust-dark">{needsAttention.length}</span>
          </div>
          {!needsAttention.length ? (
            <div className="p-10 text-center"><UserRoundCheck className="mx-auto size-8 text-olive" /><p className="mt-4 text-sm font-semibold">Nothing is waiting right now.</p><p className="mt-1 text-xs text-muted-foreground">A rare and beautiful thing.</p></div>
          ) : (
            <ul className="divide-y divide-sand/35">
              {needsAttention.map((lead) => (
                <li key={lead.id}>
                  <Link href={`/app/leads/${lead.id}`} className="flex items-center gap-4 px-5 py-4 transition hover:bg-rust/[0.04] sm:px-6">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#F1E8D9] text-sm font-semibold text-ink">{lead.name.slice(0, 1).toUpperCase()}</span>
                    <div className="min-w-0 flex-1"><div className="truncate text-sm font-semibold">{lead.name}</div><div className="mt-0.5 truncate text-xs text-muted-foreground">{lead.trips?.name ?? 'No trip selected'} · arrived {timeAgo(lead.created_at)}</div></div>
                    <StatusBadge status={lead.status} />
                    <ArrowRight className="hidden size-4 text-muted-foreground sm:block" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-2xl border border-sand/50 bg-card p-5 sm:p-6">
          <h2 className="font-semibold text-ink">Pipeline</h2>
          <p className="mt-1 text-xs text-muted-foreground">{all.length} leads across every stage</p>
          <div className="mt-6 space-y-4">
            {STAGES.map((stage) => {
              const count = all.filter((lead) => lead.status === stage.value).length;
              const width = all.length ? Math.max((count / all.length) * 100, count ? 8 : 0) : 0;
              return (
                <Link key={stage.value} href={`/app/leads?status=${stage.value}`} className="block rounded-lg focus-visible:outline-none">
                  <div className="flex justify-between text-xs"><span className="font-medium text-ink/70">{stage.label}</span><span className="font-semibold text-ink">{count}</span></div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-olive transition-all" style={{ width: `${width}%` }} /></div>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
