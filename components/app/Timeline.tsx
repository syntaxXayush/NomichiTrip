import { timeAgo } from '@/lib/format';

type Note = { id: string; body: string; created_at: string; profiles: { full_name: string } | null };
type Event = { id: string; type: string; detail: string | null; created_at: string; profiles: { full_name: string } | null };

const ICON: Record<string, string> = {
  created: '✦', status_changed: '→', assigned: '◐', message_saved: '✎',
};

export function Timeline({ notes, events }: { notes: Note[]; events: Event[] }) {
  const items = [
    ...notes.map((n) => ({ kind: 'note' as const, at: n.created_at, data: n })),
    ...events.map((e) => ({ kind: 'event' as const, at: e.created_at, data: e })),
  ].sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());

  if (!items.length) {
    return (
      <p className="rounded-lg border border-dashed border-sand/60 p-6 text-center text-sm text-ink/45">
        Nothing here yet. Log a call or move the lead along.
      </p>
    );
  }

  return (
    <ol className="space-y-3">
      {items.map((item) =>
        item.kind === 'note' ? (
          <li key={`n-${item.data.id}`} className="rounded-xl border border-sand/50 bg-white/40 p-4">
            <div className="flex items-center justify-between text-xs text-ink/45">
              <span className="font-medium text-ink/60">
                {item.data.profiles?.full_name ?? 'Associate'} · call note
              </span>
              <span>{timeAgo(item.data.created_at)}</span>
            </div>
            <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-ink/80">
              {item.data.body}
            </p>
          </li>
        ) : (
          <li key={`e-${item.data.id}`}
            className="flex items-center gap-3 px-1 text-sm text-ink/55">
            <span className="text-rust">{ICON[item.data.type] ?? '·'}</span>
            <span className="flex-1">
              {item.data.detail}
              {item.data.profiles?.full_name && (
                <span className="text-ink/40"> · {item.data.profiles.full_name}</span>
              )}
            </span>
            <span className="text-xs text-ink/35">{timeAgo(item.data.created_at)}</span>
          </li>
        )
      )}
    </ol>
  );
}
