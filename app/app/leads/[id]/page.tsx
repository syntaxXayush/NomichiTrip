import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CalendarDays, Mail, MessageCircle, Phone, UserRound } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { StatusControl } from '@/components/app/StatusControl';
import { AssignControl } from '@/components/app/AssignControl';
import { MessageComposer } from '@/components/app/MessageComposer';
import { NoteComposer } from '@/components/app/NoteComposer';
import { Timeline } from '@/components/app/Timeline';
import { formatDateRange } from '@/lib/format';
import type { LeadStatus } from '@/lib/pipeline';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default async function LeadDetail({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const { data: lead } = await supabase.from('leads').select('*, trips(id,name,destination,start_date,end_date)').eq('id', params.id).single();
  if (!lead) notFound();

  const [{ data: notes }, { data: profiles }, { data: events }] = await Promise.all([
    supabase.from('call_notes').select('id,body,created_at,profiles(full_name)').eq('lead_id', params.id).order('created_at', { ascending: false }),
    supabase.from('profiles').select('id,full_name').order('full_name'),
    supabase.from('lead_events').select('id,type,detail,created_at,profiles(full_name)').eq('lead_id', params.id).order('created_at', { ascending: false }),
  ]);

  const item = lead as any;
  const initials = item.name?.split(' ').map((name: string) => name[0]).join('').substring(0, 2).toUpperCase() || 'L';

  return (
    <div className="mx-auto max-w-[1500px]">
      <Link href="/app/leads" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink/65 transition hover:text-rust-dark"><ArrowLeft className="size-4" /> Back to leads</Link>

      <header className="mt-4 flex flex-col justify-between gap-5 border-b border-sand/45 pb-7 sm:flex-row sm:items-end">
        <div className="flex min-w-0 items-center gap-4">
          <Avatar className="size-14 border border-sand/55 bg-card shadow-sm"><AvatarFallback className="bg-[#F1E8D9] text-base font-semibold text-ink">{initials}</AvatarFallback></Avatar>
          <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.15em] text-rust-dark">Traveller conversation</p><h1 className="mt-1 truncate text-3xl font-semibold tracking-tight text-ink">{item.name}</h1></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {item.phone && <a href={`tel:${item.phone}`} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-input bg-card px-4 py-2.5 text-sm font-semibold text-ink/75 hover:border-rust/45 hover:text-rust-dark"><Phone className="size-4" /> Call</a>}
          {item.email && <a href={`mailto:${item.email}`} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-input bg-card px-4 py-2.5 text-sm font-semibold text-ink/75 hover:border-rust/45 hover:text-rust-dark"><Mail className="size-4" /> Email</a>}
        </div>
      </header>

      <div className="mt-7 grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)_270px]">
        <aside className="space-y-5">
          <section className="rounded-2xl border border-sand/50 bg-card p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-ink"><UserRound className="size-4 text-rust-dark" /> About this traveller</h2>
            <dl className="mt-5 space-y-4 text-sm">
              <div><dt className="text-xs text-muted-foreground">Phone</dt><dd className="mt-1 break-words font-medium text-ink">{item.phone ?? 'Not provided'}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Email</dt><dd className="mt-1 break-words font-medium text-ink">{item.email ?? 'Not provided'}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Travelling as</dt><dd className="mt-1 font-medium text-ink">{item.group_type ?? 'Not shared'}</dd></div>
              <div><dt className="text-xs text-muted-foreground">Preferred month</dt><dd className="mt-1 font-medium text-ink">{item.preferred_month ?? 'Not shared'}</dd></div>
            </dl>
          </section>

          <section className="rounded-2xl border border-sand/50 bg-[#F1E8D9] p-5">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-ink"><CalendarDays className="size-4 text-rust-dark" /> Trip they asked about</h2>
            <p className="mt-4 font-semibold text-ink">{item.trips?.name ?? 'No trip selected'}</p>
            {item.trips?.destination && <p className="mt-1 text-xs leading-5 text-muted-foreground">{item.trips.destination}</p>}
            {item.trips && <p className="mt-3 text-xs font-medium text-ink/70">{formatDateRange(item.trips.start_date, item.trips.end_date)}</p>}
            {item.expectations && <blockquote className="mt-5 border-l-2 border-rust pl-4 text-sm italic leading-7 text-ink/75">“{item.expectations}”</blockquote>}
          </section>
        </aside>

        <section className="overflow-hidden rounded-2xl border border-sand/50 bg-card shadow-[0_1px_0_rgba(28,27,26,.03)]">
          <div className="border-b border-sand/40 bg-[#F5EDDF] px-5 py-5 sm:px-7">
            <h2 className="editorial-title text-2xl">Conversation history</h2>
            <p className="mt-1 text-sm text-muted-foreground">Log what was said and keep the next person fully in context.</p>
          </div>
          <div className="border-b border-sand/35 p-5 sm:p-7"><NoteComposer leadId={item.id} /></div>
          <div className="p-5 sm:p-7"><Timeline notes={(notes as any) ?? []} events={(events as any) ?? []} /></div>
        </section>

        <aside className="space-y-5 xl:sticky xl:top-7 xl:self-start">
          <section className="rounded-2xl border border-sand/50 bg-card p-5">
            <label className="mb-2 block text-xs font-semibold text-muted-foreground">Pipeline stage</label>
            <StatusControl leadId={item.id} status={item.status as LeadStatus} />
            <label className="mb-2 mt-5 block text-xs font-semibold text-muted-foreground">Conversation owner</label>
            <AssignControl leadId={item.id} assignedTo={item.assigned_to} profiles={profiles ?? []} />
          </section>

          <Sheet>
            <SheetTrigger asChild>
              <Button className="min-h-12 w-full justify-between rounded-xl bg-olive px-4 text-cream shadow-sm hover:bg-ink">
                <span className="inline-flex items-center gap-2"><MessageCircle className="size-4" /> Draft WhatsApp reply</span><ArrowRight className="size-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full overflow-y-auto border-l-sand/40 bg-cream sm:max-w-md">
              <SheetHeader className="mb-6 text-left"><SheetTitle className="editorial-title text-2xl text-ink">Draft a WhatsApp reply</SheetTitle><SheetDescription className="text-muted-foreground">Use the trip details and conversation context, then edit before sending to {item.name}.</SheetDescription></SheetHeader>
              <MessageComposer leadId={item.id} phone={item.phone} />
            </SheetContent>
          </Sheet>

          <div className="rounded-2xl border border-dashed border-sand bg-transparent p-4 text-xs leading-6 text-muted-foreground">
            A stage change, assignment or saved draft is added to the activity history automatically.
          </div>
        </aside>
      </div>
    </div>
  );
}
