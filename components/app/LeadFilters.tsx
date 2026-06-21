'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { STAGES } from '@/lib/pipeline';

type Opt = { id: string; name?: string; full_name?: string };

export function LeadFilters({ trips, profiles, current }: { trips: Opt[]; profiles: Opt[]; current: { q?: string; status?: string; trip?: string; owner?: string } }) {
  const router = useRouter();
  const params = useSearchParams();
  const [query, setQuery] = useState(current.q ?? '');

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    value ? next.set(key, value) : next.delete(key);
    router.replace(`/app/leads${next.size ? `?${next.toString()}` : ''}`);
  };

  useEffect(() => {
    if (query === (current.q ?? '')) return;
    const timer = window.setTimeout(() => setParam('q', query.trim()), 300);
    return () => window.clearTimeout(timer);
    // current.q is the server value; params refreshes after replace.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const selectClass = 'min-h-11 rounded-xl border border-input bg-card px-3 text-sm text-ink outline-none transition focus:border-rust-dark focus:ring-2 focus:ring-rust/15';
  const hasFilters = Boolean(current.q || current.status || current.trip || current.owner);

  return (
    <div className="rounded-2xl border border-sand/50 bg-card p-3 sm:p-4">
      <div className="grid gap-3 lg:grid-cols-[minmax(220px,1fr)_repeat(3,minmax(150px,auto))_auto]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name, phone or email" aria-label="Search leads" className="min-h-11 w-full rounded-xl border border-input bg-cream py-2 pl-10 pr-3 text-sm outline-none transition focus:border-rust-dark focus:ring-2 focus:ring-rust/15" />
        </div>
        <select aria-label="Filter by status" className={selectClass} value={current.status ?? ''} onChange={(event) => setParam('status', event.target.value)}>
          <option value="">All statuses</option>{STAGES.map((stage) => <option key={stage.value} value={stage.value}>{stage.label}</option>)}
        </select>
        <select aria-label="Filter by trip" className={selectClass} value={current.trip ?? ''} onChange={(event) => setParam('trip', event.target.value)}>
          <option value="">All trips</option>{trips.map((trip) => <option key={trip.id} value={trip.id}>{trip.name}</option>)}
        </select>
        <select aria-label="Filter by owner" className={selectClass} value={current.owner ?? ''} onChange={(event) => setParam('owner', event.target.value)}>
          <option value="">All owners</option><option value="unassigned">Unassigned</option>{profiles.map((profile) => <option key={profile.id} value={profile.id}>{profile.full_name}</option>)}
        </select>
        {hasFilters && <button onClick={() => { setQuery(''); router.replace('/app/leads'); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-sm font-semibold text-rust-dark hover:bg-rust/5"><X className="size-4" /> Clear</button>}
      </div>
    </div>
  );
}
