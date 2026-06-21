export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'vibe_check_sent' | 'confirmed' | 'not_a_fit';

export const STAGES = [
  { value: 'new', label: 'New', tone: 'sand' },
  { value: 'contacted', label: 'Contacted', tone: 'ink' },
  { value: 'qualified', label: 'Qualified', tone: 'olive' },
  { value: 'vibe_check_sent', label: 'Vibe check sent', tone: 'rust' },
  { value: 'confirmed', label: 'Confirmed', tone: 'success' },
  { value: 'not_a_fit', label: 'Not a fit', tone: 'muted' },
] as const;

export function statusLabel(status: LeadStatus | string) {
  const stage = STAGES.find(s => s.value === status);
  return stage ? stage.label : status;
}
