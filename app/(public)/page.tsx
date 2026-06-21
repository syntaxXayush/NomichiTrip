import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  Compass,
  HeartHandshake,
  MapPinned,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { HERO_IMAGES } from '@/lib/trip-image';
import type { Trip } from '@/lib/types';
import { TripCard } from '@/components/public/TripCard';

export const revalidate = 60;

const differences = [
  {
    icon: Users,
    title: 'Small by design',
    body: 'Enough people for good conversation. Few enough that nobody disappears into the group.',
  },
  {
    icon: MapPinned,
    title: 'Fewer places, more time',
    body: 'We stay longer, drive less and leave room for the details that never make it onto a checklist.',
  },
  {
    icon: HeartHandshake,
    title: 'Run by our own team',
    body: 'Every journey is screened, curated and looked after from the first message to the ride home.',
  },
];

const steps = [
  ['01', 'Find a trip', 'Choose the place and pace that feel right. The useful details are there before you enquire.'],
  ['02', 'Have a real conversation', 'Tell us what you want the trip to feel like. A person from our team will write back.'],
  ['03', 'Confirm when it fits', 'We answer the practical questions, check the group fit and help you make a clear decision.'],
];

export default async function HomePage() {
  const supabase = createClient();
  const today = new Date().toISOString().slice(0, 10);
  const { data: trips } = await supabase
    .from('trips')
    .select('*')
    .eq('status', 'open')
    .gte('end_date', today)
    .order('start_date', { ascending: true });
  const openTrips = (trips ?? []) as Trip[];

  return (
    <>
      <section className="relative overflow-hidden bg-olive text-cream">
        <div className="surface-grid absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="relative mx-auto grid min-h-[720px] max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.02fr_.98fr] lg:py-20">
          <div className="animate-fade-up">
            <p className="inline-flex items-center gap-2 rounded-full border border-cream/20 bg-cream/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-sand">
              <Sparkles className="size-3.5" aria-hidden="true" /> Slow, small-group journeys
            </p>
            <h1 className="editorial-title balanced mt-7 max-w-3xl text-5xl leading-[0.96] tracking-[-0.035em] sm:text-7xl lg:text-[5.8rem]">
              Travel that <span className="relative inline-block text-yellow">finds you.<span className="absolute -bottom-1 left-0 h-1 w-full rotate-[-1deg] bg-rust" aria-hidden="true" /></span>
            </h1>
            <p className="text-pretty mt-7 max-w-xl text-lg leading-8 text-cream/78 sm:text-xl">
              Offbeat places. Unhurried days. Journeys shaped around people, not a list of things to finish.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="#trips" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-yellow px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:shadow-lg">
                See open trips <ArrowDown className="size-4" aria-hidden="true" />
              </Link>
              <Link href="#why-nomichi" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-cream/35 px-6 py-3 text-sm font-semibold text-cream transition hover:bg-cream/10">
                How we travel <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-7 gap-y-3 border-t border-cream/15 pt-6 text-sm text-cream/70">
              <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-yellow" /> Personally planned</span>
              <span className="inline-flex items-center gap-2"><Users className="size-4 text-yellow" /> Small groups</span>
              <span className="inline-flex items-center gap-2"><MessageCircle className="size-4 text-yellow" /> One human point of contact</span>
            </div>
          </div>

          <div className="relative mx-auto h-[500px] w-full max-w-[590px] lg:h-[570px]">
            <div className="absolute left-0 top-0 h-[76%] w-[82%] overflow-hidden rounded-[28px] border border-cream/20 bg-sand shadow-2xl">
              <Image src={HERO_IMAGES.primary} alt="A wide mountain valley on a Nomichi journey" fill priority sizes="(min-width: 1024px) 42vw, 86vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-full bg-cream/95 px-4 py-2 text-xs font-semibold text-ink backdrop-blur">High valleys, slower days</span>
            </div>
            <div className="absolute bottom-0 right-0 h-[49%] w-[51%] rotate-[2deg] overflow-hidden rounded-[24px] border-[6px] border-olive bg-sand shadow-2xl transition duration-500 hover:rotate-0">
              <Image src={HERO_IMAGES.secondary} alt="A quiet backwater journey in Kerala" fill priority sizes="(min-width: 1024px) 25vw, 48vw" className="object-cover" />
            </div>
            <div className="absolute right-4 top-12 max-w-[180px] rotate-[-3deg] rounded-2xl bg-rust p-5 text-cream shadow-xl sm:right-1">
              <Compass className="size-5" aria-hidden="true" />
              <p className="mt-4 text-sm font-medium leading-6">Less rushing. More noticing.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="trips" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rust-dark">Open journeys</p>
              <h2 className="editorial-title balanced mt-3 max-w-2xl text-4xl leading-tight text-ink sm:text-5xl">Places worth staying a little longer for</h2>
            </div>
            <p className="max-w-md text-pretty text-sm leading-7 text-muted-foreground">Every trip is run in a small group and priced with GST included. Choose one to see the full context and start a conversation.</p>
          </div>

          {!openTrips.length ? (
            <div className="mt-12 rounded-2xl border border-dashed border-sand bg-card p-10 text-center sm:p-16">
              <Compass className="mx-auto size-9 text-rust-dark" aria-hidden="true" />
              <h3 className="editorial-title mt-5 text-2xl">The next set of journeys is taking shape</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">There are no future departures open right now. Write to us and we will tell you what is coming next.</p>
              <a href="mailto:hello@thenomichi.com" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream">Ask what is coming</a>
            </div>
          ) : (
            <div className="mt-12 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {openTrips.map((trip, index) => <TripCard key={trip.id} trip={trip} priority={index < 3} />)}
            </div>
          )}
        </div>
      </section>

      <section id="why-nomichi" className="scroll-mt-24 bg-[#F1E8D9] py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rust-dark">Why Nomichi</p>
              <h2 className="editorial-title balanced mt-4 text-4xl leading-tight sm:text-5xl">A trip can be full without being rushed.</h2>
              <p className="mt-6 max-w-md text-pretty text-base leading-8 text-muted-foreground">We build for people who care about where they are, who they are travelling with and how the days actually feel.</p>
            </div>
            <div className="grid gap-4">
              {differences.map(({ icon: Icon, title, body }, index) => (
                <article key={title} className="grid gap-5 rounded-2xl border border-sand/55 bg-cream p-6 sm:grid-cols-[auto_1fr] sm:p-7">
                  <div className={`grid size-12 place-items-center rounded-full ${index === 1 ? 'bg-yellow text-ink' : 'bg-olive text-cream'}`}>
                    <Icon className="size-5" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">{body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="scroll-mt-24 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rust-dark">From hello to a confirmed seat</p>
          <h2 className="editorial-title mt-4 max-w-2xl text-4xl leading-tight sm:text-5xl">A considered trip starts with a simple conversation.</h2>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-sand/55 bg-sand/55 md:grid-cols-3">
            {steps.map(([number, title, body]) => (
              <article key={number} className="bg-card p-7 sm:p-9">
                <span className="text-xs font-bold tracking-[0.18em] text-rust-dark">{number}</span>
                <h3 className="editorial-title mt-8 text-2xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-olive py-20 text-cream sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sand">Good to know</p>
            <h2 className="editorial-title balanced mt-4 text-4xl leading-tight sm:text-5xl">The practical questions matter too.</h2>
            <p className="mt-6 max-w-md text-sm leading-7 text-cream/70">If your question is more specific, send an enquiry. The same person who replies will stay with you through the conversation.</p>
          </div>
          <div className="divide-y divide-cream/15 border-y border-cream/15">
            {[
              ['Are these trips suitable for solo travellers?', 'Yes. Solo travellers are a natural part of small-group travel. We will explain the room-sharing and single-room options before you confirm.'],
              ['What does the price include?', 'Every public price includes GST. Trip-specific inclusions, exclusions and payment details are shared clearly before you book.'],
              ['What is the vibe check?', 'It is a short, honest conversation about the pace, the group and what you want from the trip. It helps both sides decide whether the journey feels right.'],
              ['How quickly will someone reply?', 'Usually within one working day. You will hear from a person, not an automated sales sequence.'],
            ].map(([question, answer]) => (
              <details key={question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 text-base font-semibold marker:hidden">
                  {question}<span className="grid size-8 shrink-0 place-items-center rounded-full border border-cream/25 text-xl font-normal transition group-open:rotate-45">+</span>
                </summary>
                <p className="max-w-2xl pb-2 pt-4 text-sm leading-7 text-cream/70">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-yellow py-14 text-ink sm:py-18">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-7 px-5 sm:px-8 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em]">Ready when it feels right</p>
            <h2 className="editorial-title balanced mt-2 text-3xl sm:text-4xl">Find the journey you want to talk about.</h2>
          </div>
          <Link href="#trips" className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-rust-dark">
            See open trips <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
