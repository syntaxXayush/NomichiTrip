import Link from 'next/link';
import { TripForm } from '@/components/app/TripForm';

export default function NewTripPage() {
  return (
    <div className="mx-auto max-w-5xl">
      <Link href="/app/trips" className="inline-flex min-h-11 items-center text-sm font-semibold text-ink/70 hover:text-rust-dark">← All trips</Link>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.16em] text-rust-dark">New journey</p>
      <h1 className="editorial-title mt-2 text-4xl">Create a trip</h1>
      <p className="mb-8 mt-2 text-sm text-muted-foreground">Add the details travellers need before they enquire.</p>
      <TripForm />
    </div>
  );
}
