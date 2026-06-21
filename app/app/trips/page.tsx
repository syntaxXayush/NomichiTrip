import Link from 'next/link';
import { ArrowRight, Map, Plus } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatPrice, formatDateRange } from '@/lib/format';
import type { Trip } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function TripsCmsPage({ searchParams }: { searchParams: { error?: string } }) {
  const supabase = createClient();
  const { data: trips } = await supabase.from('trips').select('*').order('created_at', { ascending: false });

  return (
    <div className="mx-auto max-w-6xl">
      <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rust-dark">Trip content</p>
          <h1 className="editorial-title mt-2 text-4xl">Trips</h1>
          <p className="mt-2 text-sm text-muted-foreground">Create the journeys travellers see and control what is open.</p>
        </div>
        <Link href="/app/trips/new" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-cream transition hover:bg-olive"><Plus className="size-4" /> New trip</Link>
      </header>

      {searchParams.error && <p role="alert" className="mb-5 rounded-xl border border-rust/25 bg-rust/5 px-4 py-3 text-sm text-rust-dark">The trip could not be saved. Check every required field and make sure the end date follows the start date.</p>}

      <div className="overflow-hidden rounded-2xl border border-sand/50 bg-card">
        {!trips?.length ? (
          <div className="p-12 text-center"><Map className="mx-auto size-9 text-rust-dark" /><p className="mt-4 text-sm font-semibold">No trips yet</p><p className="mt-1 text-xs text-muted-foreground">Create the first journey to publish it on the public site.</p></div>
        ) : (
          <ul className="divide-y divide-sand/40">
            {(trips as Trip[]).map((trip) => (
              <li key={trip.id}>
                <Link href={`/app/trips/${trip.id}`} className="flex items-center gap-4 px-5 py-4 transition hover:bg-rust/[0.035] sm:px-6">
                  <div className="min-w-0 flex-1"><div className="font-semibold text-ink">{trip.name}</div><div className="mt-1 truncate text-xs text-muted-foreground">{trip.destination ?? 'No destination'} · {formatDateRange(trip.start_date, trip.end_date)}</div></div>
                  <span className="hidden text-sm font-medium text-ink/70 sm:block">{formatPrice(trip.price)}</span>
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide ${trip.status === 'open' ? 'border-olive/30 bg-olive/10 text-olive' : 'border-ink/15 bg-ink/5 text-ink/55'}`}>{trip.status === 'open' ? 'OPEN' : 'CLOSED'}</span>
                  <ArrowRight className="size-4 text-muted-foreground" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
