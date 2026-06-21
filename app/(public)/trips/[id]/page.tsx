import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Users,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { formatDateRange, formatPrice, tripDuration } from '@/lib/format';
import { getTripImage } from '@/lib/trip-image';
import { EnquiryForm } from '@/components/public/EnquiryForm';
import type { Trip } from '@/lib/types';

async function getTrip(id: string) {
  const supabase = createClient();
  const { data } = await supabase.from('trips').select('*').eq('id', id).eq('status', 'open').single();
  return data as Trip | null;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const trip = await getTrip(params.id);
  if (!trip) return { title: 'Trip not found' };
  return {
    title: trip.name,
    description: trip.description ?? `A small-group journey to ${trip.destination ?? 'somewhere worth slowing down for'}.`,
  };
}

export default async function TripDetail({ params }: { params: { id: string } }) {
  const trip = await getTrip(params.id);
  if (!trip) notFound();
  const duration = tripDuration(trip.start_date, trip.end_date);

  return (
    <div className="pb-24 lg:pb-0">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-7 sm:px-8 sm:pt-10">
        <Link href="/#trips" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink/70 transition hover:text-rust-dark">
          <ArrowLeft className="size-4" aria-hidden="true" /> Back to open trips
        </Link>
      </div>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(340px,.72fr)] lg:gap-12">
        <article>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-muted sm:aspect-[16/9]">
            <Image
              src={getTripImage(trip.name, trip.hero_image_url)}
              alt={`${trip.name} in ${trip.destination ?? 'India'}`}
              fill
              priority
              sizes="(min-width: 1024px) 65vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-ink/55 to-transparent" />
            <p className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full bg-cream/95 px-4 py-2 text-xs font-semibold text-ink backdrop-blur sm:bottom-7 sm:left-7">
              <MapPin className="size-3.5 text-rust-dark" aria-hidden="true" /> {trip.destination ?? 'India'}
            </p>
          </div>

          <div className="py-9 sm:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.17em] text-rust-dark">A Nomichi small-group journey</p>
            <h1 className="editorial-title balanced mt-4 max-w-4xl text-4xl leading-[1.02] tracking-[-0.025em] text-ink sm:text-6xl">{trip.name}</h1>
            <div className="mt-7 grid gap-3 text-sm text-ink/75 sm:grid-cols-2 xl:grid-cols-4">
              <span className="flex items-center gap-2"><CalendarDays className="size-4 text-rust-dark" /> {formatDateRange(trip.start_date, trip.end_date)}</span>
              {duration && <span className="flex items-center gap-2"><Clock3 className="size-4 text-rust-dark" /> {duration}</span>}
              {trip.total_seats != null && <span className="flex items-center gap-2"><Users className="size-4 text-rust-dark" /> Up to {trip.total_seats} travellers</span>}
              <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-rust-dark" /> GST included</span>
            </div>
          </div>

          <div className="border-y border-sand/55 py-10 sm:py-12">
            <div className="grid gap-8 md:grid-cols-[.72fr_1.28fr]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rust-dark">The journey</p>
                <h2 className="editorial-title mt-3 text-3xl">Room to be where you are.</h2>
              </div>
              <p className="whitespace-pre-line text-pretty text-base leading-8 text-ink/78">
                {trip.description ?? 'A thoughtfully paced journey with room for good food, local detail and the conversations that happen when nobody is rushing to the next stop.'}
              </p>
            </div>
          </div>

          <div className="py-10 sm:py-12">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rust-dark">What to expect</p>
            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              {[
                ['A gentler pace', 'Fewer hotel changes, fewer rushed mornings and more time in each place.'],
                ['A considered group', 'A small group and a short conversation before you confirm your seat.'],
                ['A person to call', 'One Nomichi associate stays close from your first question through departure.'],
              ].map(([title, body]) => (
                <article key={title} className="rounded-2xl border border-sand/55 bg-card p-6">
                  <Check className="size-5 text-rust-dark" aria-hidden="true" />
                  <h3 className="mt-5 font-semibold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{body}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#F1E8D9] p-7 sm:p-9">
            <div className="flex items-start gap-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-full bg-olive text-cream"><MessageCircle className="size-5" /></div>
              <div>
                <h2 className="editorial-title text-2xl">Not sure whether it fits?</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">That is exactly what the enquiry is for. Tell us what you are hoping for and we will answer honestly, without pushing you towards a booking.</p>
                <a href="#enquire" className="mt-5 inline-flex min-h-11 items-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream">Start the conversation</a>
              </div>
            </div>
          </div>
        </article>

        <aside id="enquire" className="scroll-mt-24 lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-[24px] border border-sand/60 bg-card shadow-soft">
            <div className="border-b border-sand/45 bg-[#F1E8D9] p-6 sm:p-7">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-rust-dark">Ask about this trip</p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <div>
                  <div className="text-2xl font-semibold text-ink">{formatPrice(trip.price)}</div>
                  <div className="mt-1 text-xs text-muted-foreground">per person · incl. GST</div>
                </div>
                <MessageCircle className="size-6 text-rust-dark" aria-hidden="true" />
              </div>
              <p className="mt-5 text-sm leading-6 text-muted-foreground">Tell us a little about you. A person from our team will reply, usually within one working day.</p>
            </div>
            <div className="p-6 sm:p-7"><EnquiryForm tripId={trip.id} /></div>
          </div>
        </aside>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-sand/60 bg-cream/95 p-3 shadow-[0_-12px_40px_rgba(28,27,26,.12)] backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-4">
          <div><div className="font-semibold text-ink">{formatPrice(trip.price)}</div><div className="text-[11px] text-muted-foreground">incl. GST</div></div>
          <a href="#enquire" className="inline-flex min-h-11 items-center rounded-full bg-rust-dark px-5 py-2.5 text-sm font-semibold text-cream">Ask about this trip</a>
        </div>
      </div>
    </div>
  );
}
