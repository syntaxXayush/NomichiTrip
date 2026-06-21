'use client';

import { useFormState as useActionState } from 'react-dom';
import { LoaderCircle, LockKeyhole } from 'lucide-react';
import { createEnquiry, type EnquiryState } from '@/lib/actions/enquiry';

const field = 'min-h-11 w-full rounded-xl border border-input bg-cream px-3.5 py-2.5 text-sm text-ink outline-none transition placeholder:text-ink/40 focus:border-rust-dark focus:ring-2 focus:ring-rust/15';
const label = 'mb-1.5 block text-xs font-semibold text-ink/75';

function Err({ id, msg }: { id: string; msg?: string }) {
  return msg ? <p id={id} role="alert" className="mt-1.5 text-xs leading-5 text-rust-dark">{msg}</p> : null;
}

export function EnquiryForm({ tripId }: { tripId: string }) {
  const [state, action, pending] = useActionState<EnquiryState, FormData>(createEnquiry, {});
  const errors = state.fieldErrors ?? {};

  const a11y = (name: string) => ({
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  return (
    <form action={action} className="space-y-4" noValidate>
      <input type="hidden" name="trip_id" value={tripId} />

      <div>
        <label className={label} htmlFor="name">Your name</label>
        <input id="name" name="name" required autoComplete="name" className={field} placeholder="Maya Rao" {...a11y('name')} />
        <Err id="name-error" msg={errors.name} />
      </div>

      <div>
        <label className={label} htmlFor="phone">WhatsApp or phone</label>
        <input id="phone" name="phone" type="tel" inputMode="tel" required autoComplete="tel" className={field} placeholder="+91 98765 43210" {...a11y('phone')} />
        <Err id="phone-error" msg={errors.phone} />
      </div>

      <div>
        <label className={label} htmlFor="email">Email <span className="font-normal text-muted-foreground">(optional)</span></label>
        <input id="email" name="email" type="email" autoComplete="email" className={field} placeholder="you@example.com" {...a11y('email')} />
        <Err id="email-error" msg={errors.email} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        <div>
          <label className={label} htmlFor="group_type">Who is travelling?</label>
          <select id="group_type" name="group_type" required className={field} defaultValue="" {...a11y('group_type')}>
            <option value="" disabled>Select one</option>
            <option>Solo</option><option>Couple</option><option>Friends</option><option>Family</option>
          </select>
          <Err id="group_type-error" msg={errors.group_type} />
        </div>
        <div>
          <label className={label} htmlFor="preferred_month">Preferred month</label>
          <input id="preferred_month" name="preferred_month" required list="month-options" className={field} placeholder="October 2027" {...a11y('preferred_month')} />
          <datalist id="month-options"><option value="June 2027" /><option value="July 2027" /><option value="August 2027" /><option value="September 2027" /><option value="October 2027" /></datalist>
          <Err id="preferred_month-error" msg={errors.preferred_month} />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="expectations">What are you hoping this trip feels like?</label>
        <textarea id="expectations" name="expectations" required rows={4} className={`${field} resize-y leading-6`} placeholder="A slow week, good food and enough time to read." {...a11y('expectations')} />
        <Err id="expectations-error" msg={errors.expectations} />
      </div>

      {state.error && <p role="alert" className="rounded-xl border border-rust/25 bg-rust/5 px-3.5 py-3 text-sm leading-6 text-rust-dark">{state.error}</p>}

      <button type="submit" disabled={pending} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-rust-dark px-5 py-3 text-sm font-semibold text-cream transition hover:-translate-y-0.5 hover:bg-ink disabled:translate-y-0 disabled:cursor-wait disabled:opacity-70">
        {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
        {pending ? 'Sending your note' : 'Send enquiry'}
      </button>
      <p className="flex items-center justify-center gap-1.5 text-center text-xs leading-5 text-muted-foreground">
        <LockKeyhole className="size-3.5" aria-hidden="true" /> Your details stay with the Nomichi team.
      </p>
    </form>
  );
}
