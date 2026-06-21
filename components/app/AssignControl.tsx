'use client';

import { useTransition } from 'react';
import { assignLead } from '@/lib/actions/leads';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type P = { id: string; full_name: string };

export function AssignControl({
  leadId,
  assignedTo,
  profiles,
}: { leadId: string; assignedTo: string | null; profiles: P[] }) {
  const [pending, start] = useTransition();

  const change = (value: string) => {
    const fd = new FormData();
    fd.set('id', leadId);
    fd.set('assigned_to', value === 'unassigned' ? '' : value);
    start(() => assignLead(fd));
  };

  return (
    <Select
      defaultValue={assignedTo ?? 'unassigned'}
      onValueChange={change}
      disabled={pending}
    >
      <SelectTrigger className="w-full bg-white/60 border-sand/40 focus:ring-rust/30 shadow-sm">
        <SelectValue placeholder="Select Assignee" />
      </SelectTrigger>
      <SelectContent className="bg-cream border-sand/30">
        <SelectItem value="unassigned" className="text-ink/50 italic focus:bg-sand/20">Unassigned</SelectItem>
        {profiles.map((p) => (
          <SelectItem key={p.id} value={p.id} className="focus:bg-sand/20">{p.full_name}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
