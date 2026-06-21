'use client';

import { useState, useTransition } from 'react';
import { draftMessage, saveMessage } from '@/lib/actions/messages';

const INTENTS = [
  { value: 'intro', label: 'Intro' },
  { value: 'follow_up', label: 'Follow-up' },
  { value: 'vibe_check', label: 'Vibe check' },
  { value: 'nudge', label: 'Nudge' },
];

export function MessageComposer({ leadId, phone }: { leadId: string; phone: string | null }) {
  const [intent, setIntent] = useState('intro');
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [pending, start] = useTransition();

  const generate = (fd: FormData) => {
    start(async () => {
      setError('');
      const res = await draftMessage({}, fd);
      if (res.error) setError(res.error);
      if (res.content) setDraft(res.content);
    });
  };

  const copy = async () => {
    await navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const waLink = phone
    ? `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(draft)}`
    : null;

  return (
    <div className="rounded-2xl border border-rust/25 bg-rust/[0.04] p-5">
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-rust">
          Writing assistant
        </span>
      </div>

      <form action={generate} className="mt-3">
        <input type="hidden" name="lead_id" value={leadId} />
        <input type="hidden" name="intent" value={intent} />
        <div className="flex flex-wrap gap-2">
          {INTENTS.map((i) => (
            <button
              type="button"
              key={i.value}
              onClick={() => setIntent(i.value)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                intent === i.value
                  ? 'border-rust bg-rust text-cream'
                  : 'border-sand/60 text-ink/60 hover:border-rust/40'
              }`}
            >
              {i.label}
            </button>
          ))}
        </div>
        <button
          disabled={pending}
          className="mt-3 rounded-lg bg-rust px-4 py-2 text-sm font-medium text-cream transition hover:bg-rust/90 disabled:opacity-60"
        >
          {pending ? 'Writing…' : 'Generate message'}
        </button>
      </form>

      {error && <p className="mt-3 text-sm text-rust">{error}</p>}

      {draft && (
        <div className="mt-4">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={5}
            className="w-full rounded-lg border border-sand/60 bg-cream px-3 py-2 text-sm leading-relaxed outline-none transition focus:border-rust focus:ring-2 focus:ring-rust/20"
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <button onClick={copy} type="button"
              className="rounded-lg border border-sand/60 px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-rust/40">
              {copied ? 'Copied' : 'Copy'}
            </button>
            {waLink && (
              <a href={waLink} target="_blank" rel="noreferrer"
                className="rounded-lg bg-olive px-3 py-1.5 text-xs font-medium text-cream hover:bg-olive/90">
                Open in WhatsApp
              </a>
            )}
            <form action={saveMessage}>
              <input type="hidden" name="lead_id" value={leadId} />
              <input type="hidden" name="intent" value={intent} />
              <input type="hidden" name="content" value={draft} />
              <button className="rounded-lg border border-sand/60 px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-rust/40">
                Save draft
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
