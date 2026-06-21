'use client';

import { useFormStatus } from 'react-dom';
import { saveTrip } from '@/lib/actions/trips';
import { ImageUploader } from '@/components/app/ImageUploader';
import type { Trip } from '@/lib/types';

const field =
  'min-h-11 w-full rounded-xl border border-input bg-cream px-3.5 py-2.5 text-sm outline-none transition focus:border-rust-dark focus:ring-2 focus:ring-rust/15';
const label = 'mb-1.5 block text-xs font-semibold text-ink/75';

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}
      className="min-h-11 rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-cream transition hover:bg-olive disabled:opacity-60">
      {pending ? 'Saving…' : 'Save trip'}
    </button>
  );
}

export function TripForm({ trip }: { trip?: Trip }) {
  return (
    <form action={saveTrip} className="max-w-3xl space-y-6">
      {trip && <input type="hidden" name="id" value={trip.id} />}

      <div>
        <label className={label} htmlFor="name">Trip name</label>
        <input id="name" name="name" required defaultValue={trip?.name ?? ''}
          className={field} placeholder="Slow Days in Spiti" />
      </div>

      <div>
        <label className={label} htmlFor="destination">Destination</label>
        <input id="destination" name="destination" required defaultValue={trip?.destination ?? ''}
          className={field} placeholder="Spiti Valley, Himachal" />
      </div>

      <div className="rounded-2xl border border-sand/50 bg-card p-5 sm:p-6"><ImageUploader initialUrl={trip?.hero_image_url} /></div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="start_date">Start date</label>
          <input id="start_date" name="start_date" type="date" required
            defaultValue={trip?.start_date ?? ''} className={field} />
        </div>
        <div>
          <label className={label} htmlFor="end_date">End date</label>
          <input id="end_date" name="end_date" type="date" required
            defaultValue={trip?.end_date ?? ''} className={field} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="price">Price (INR)</label>
          <input id="price" name="price" type="number" min="1" required
            defaultValue={trip?.price ?? ''} className={field} placeholder="48000" />
        </div>
        <div>
          <label className={label} htmlFor="total_seats">Total seats</label>
          <input id="total_seats" name="total_seats" type="number" min="1" required
            defaultValue={trip?.total_seats ?? ''} className={field} placeholder="12" />
        </div>
      </div>

      <div>
        <label className={label} htmlFor="status">Status</label>
        <select id="status" name="status" defaultValue={trip?.status ?? 'open'} className={field}>
          <option value="open">Open · visible to travellers</option>
          <option value="closed">Closed · hidden from travellers</option>
        </select>
      </div>

      <div>
        <label className={label} htmlFor="description">Description</label>
        <textarea id="description" name="description" rows={7} required
          defaultValue={trip?.description ?? ''} className={field}
          placeholder="Tell the story of this journey…" />
      </div>

      <div className="sticky bottom-4 flex justify-end rounded-2xl border border-sand/50 bg-cream/90 p-3 shadow-soft backdrop-blur">
        <SaveButton />
      </div>
    </form>
  );
}
