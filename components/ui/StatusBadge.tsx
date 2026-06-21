import { LeadStatus, STAGES } from '@/lib/pipeline';

const TONE: Record<string, string> = {
  sand: 'bg-sand/40 text-ink',
  ink: 'bg-ink text-cream',
  olive: 'bg-olive/15 text-olive',
  rust: 'bg-rust text-cream',
  success: 'bg-olive text-cream',
  muted: 'bg-ink/10 text-ink/50',
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const stage = STAGES.find((s) => s.value === status);
  if (!stage) return null;

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium tracking-wide ${TONE[stage.tone]}`}>
      {stage.label}
    </span>
  );
}
