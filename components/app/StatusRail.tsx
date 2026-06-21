'use client';

import { useTransition } from 'react';
import { STAGES, type LeadStatus } from '@/lib/pipeline';
import { updateLeadStatus } from '@/lib/actions/leads';

export function StatusRail({ leadId, status }: { leadId: string; status: LeadStatus }) {
  const [pending, start] = useTransition();

  const set = (next: LeadStatus) => {
    if (next === status) return;
    const fd = new FormData();
    fd.set('id', leadId);
    fd.set('status', next);
    start(async () => {
      await updateLeadStatus(fd);
    });
  };

  return (
    <div className={`flex flex-wrap items-center gap-2 ${pending ? 'opacity-60 pointer-events-none' : ''}`}>
      {STAGES.map((s) => {
        const active = s.value === status;
        return (
          <button
            key={s.value}
            onClick={() => set(s.value as LeadStatus)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active 
                ? 'bg-ink text-cream' 
                : 'bg-white/60 border border-sand/40 text-ink/60 hover:border-rust/40 hover:text-ink hover:bg-white/80'
            }`}
          >
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
