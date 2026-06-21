'use client';

import { useState, useTransition } from 'react';
import { STAGES, type LeadStatus } from '@/lib/pipeline';
import { updateLeadStatus } from '@/lib/actions/leads';

export function StatusControl({ leadId, status }: { leadId: string; status: LeadStatus }) {
  const [pending, start] = useTransition();
  const [error, setError] = useState('');

  const set = (next: LeadStatus) => {
    if (next === status) return;
    const fd = new FormData();
    fd.set('id', leadId);
    fd.set('status', next);
    start(async () => {
      setError('');
      const result = await updateLeadStatus(fd);
      if (result?.error) setError(result.error);
    });
  };

  return (
    <div>
      <div className="relative">
        <select value={status} onChange={(event) => set(event.target.value as LeadStatus)} disabled={pending} aria-label="Pipeline stage" className="min-h-11 w-full rounded-xl border border-input bg-card px-3.5 pr-10 text-sm font-semibold text-ink outline-none transition focus:border-rust-dark focus:ring-2 focus:ring-rust/15 disabled:cursor-wait disabled:opacity-65">
          {STAGES.map((stage) => <option key={stage.value} value={stage.value}>{stage.label}</option>)}
        </select>
        {pending && <span className="absolute right-9 top-1/2 size-3.5 -translate-y-1/2 animate-spin rounded-full border-2 border-rust/30 border-t-rust-dark" aria-hidden="true" />}
      </div>
      {error && <p role="alert" className="mt-2 text-xs text-rust-dark">{error}</p>}
    </div>
  );
}
