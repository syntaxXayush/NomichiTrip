import Link from 'next/link';
import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { TripForm } from '@/components/app/TripForm';
import type { Trip } from '@/lib/types';

export const dynamic = 'force-dynamic';

export default async function EditTripPage({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: trip } = await supabase
    .from('trips').select('*').eq('id', params.id).single();
  if (!trip) notFound();

  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/app/trips" className="inline-flex min-h-11 items-center text-sm font-semibold text-ink/70 hover:text-rust-dark">← All trips</Link>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-rust-dark">Trip content</p>
      <h1 className="editorial-title mt-2 text-4xl">Edit trip</h1>
      <p className="mb-8 mt-2 text-sm text-muted-foreground">{(trip as Trip).name}</p>
      <TripForm trip={trip as Trip} />
    </div>
  );
}
