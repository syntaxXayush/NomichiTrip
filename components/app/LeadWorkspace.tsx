'use client';

import { useState } from 'react';
import { NoteComposer } from './NoteComposer';
import { Timeline } from './Timeline';
import { MessageComposer } from './MessageComposer';

export function LeadWorkspace({ leadId, phone, notes, events }: { leadId: string; phone: string | null; notes: any[]; events: any[] }) {
  const [tab, setTab] = useState<'activity' | 'whatsapp'>('activity');

  return (
    <section className="rounded-2xl border border-sand/40 bg-white/40 overflow-hidden">
      <div className="flex border-b border-sand/40 bg-sand/10 px-2 pt-2">
        <button
          onClick={() => setTab('activity')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${tab === 'activity' ? 'border-rust text-ink' : 'border-transparent text-ink/50 hover:text-ink'}`}
        >
          Activity
        </button>
        <button
          onClick={() => setTab('whatsapp')}
          className={`px-4 py-2.5 text-sm font-medium transition-colors border-b-2 ${tab === 'whatsapp' ? 'border-rust text-ink' : 'border-transparent text-ink/50 hover:text-ink'}`}
        >
          WhatsApp AI
        </button>
      </div>

      <div className="p-5">
        {tab === 'activity' ? (
          <div className="space-y-6">
            <NoteComposer leadId={leadId} />
            <Timeline notes={notes} events={events} />
          </div>
        ) : (
          <div className="py-2">
            <MessageComposer leadId={leadId} phone={phone} />
          </div>
        )}
      </div>
    </section>
  );
}
