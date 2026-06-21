'use client';

import { useRef, useState, useTransition } from 'react';
import { addCallNote } from '@/lib/actions/leads';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function NoteComposer({ leadId }: { leadId: string }) {
  const [pending, start] = useTransition();
  const [value, setValue] = useState('');
  const ref = useRef<HTMLFormElement>(null);

  const submit = (fd: FormData) => {
    if (!String(fd.get('body')).trim()) return;
    start(async () => {
      await addCallNote(fd);
      setValue('');
      ref.current?.reset();
    });
  };

  return (
    <form ref={ref} action={submit} className="relative">
      <input type="hidden" name="lead_id" value={leadId} />
      <Textarea
        name="body"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={3}
        placeholder="What was said, and what should happen next?"
        aria-label="Call note"
        className="min-h-28 resize-y rounded-xl bg-cream border-input focus-visible:ring-rust/20 text-sm py-3"
      />
      <div className="mt-3 flex justify-end">
        <Button 
          type="submit" 
          disabled={pending || !value.trim()}
          className="min-h-11 rounded-xl bg-ink px-5 text-cream hover:bg-olive shadow-sm"
        >
          {pending ? 'Saving note' : 'Log note'}
        </Button>
      </div>
    </form>
  );
}
