import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, CalendarDays, Users } from 'lucide-react';
import { formatDateRange, formatPrice, tripDuration } from '@/lib/format';
import { getTripImage } from '@/lib/trip-image';
import type { Trip } from '@/lib/types';

export function TripCard({ trip, priority = false }: { trip: Trip; priority?: boolean }) {
  const duration = tripDuration(trip.start_date, trip.end_date);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-sand/55 bg-card shadow-[0_1px_0_rgba(28,27,26,0.03)] transition duration-300 hover:-translate-y-1 hover:border-rust/45 hover:shadow-lift">
      <Link href={`/trips/${trip.id}`} className="relative block aspect-[4/3] overflow-hidden bg-muted">
        <Image
          src={getTripImage(trip.name, trip.hero_image_url)}
          alt={`${trip.name} in ${trip.destination ?? 'India'}`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-700 ease-out group-hover:scale-[1.035]"
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/45 to-transparent" />
        {duration && (
          <span className="absolute bottom-4 left-4 rounded-full bg-cream/95 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm backdrop-blur">
            {duration}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-rust-dark">
          {trip.destination ?? 'Somewhere worth slowing down for'}
        </p>
        <Link href={`/trips/${trip.id}`} className="mt-3 inline-flex items-start justify-between gap-4">
          <h3 className="editorial-title balanced text-2xl leading-tight text-ink transition group-hover:text-rust-dark">
            {trip.name}
          </h3>
          <ArrowUpRight className="mt-1 size-5 shrink-0 text-rust-dark transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </Link>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {trip.description ?? 'A small-group journey planned with care.'}
        </p>

        <div className="mt-6 grid gap-2 border-t border-sand/40 pt-4 text-sm text-ink/75">
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4 text-rust-dark" aria-hidden="true" />
            {formatDateRange(trip.start_date, trip.end_date)}
          </span>
          {trip.total_seats != null && (
            <span className="flex items-center gap-2">
              <Users className="size-4 text-rust-dark" aria-hidden="true" />
              Small group, up to {trip.total_seats}
            </span>
          )}
        </div>

        <div className="mt-5 flex items-end justify-between gap-3">
          <div>
            <div className="text-lg font-semibold text-ink">{formatPrice(trip.price)}</div>
            <div className="text-xs text-muted-foreground">per person · incl. GST</div>
          </div>
          <span className="text-sm font-semibold text-rust-dark">View trip</span>
        </div>
      </div>
    </article>
  );
}
