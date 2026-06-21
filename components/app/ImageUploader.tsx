'use client';

import { useState, useTransition, useRef } from 'react';
import { uploadTripImage } from '@/lib/actions/upload';

export function ImageUploader({ initialUrl }: { initialUrl?: string | null }) {
  const [url, setUrl] = useState(initialUrl ?? '');
  const [error, setError] = useState('');
  const [pending, start] = useTransition();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = () => {
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError('Please select an image first.');
      return;
    }
    
    start(async () => {
      setError('');
      const fd = new FormData();
      fd.append('file', file);
      
      const res = await uploadTripImage({}, fd);
      if (res.error) setError(res.error);
      if (res.url) {
        setUrl(res.url);
        if (fileRef.current) fileRef.current.value = '';
      }
    });
  };

  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wide text-ink/60 mb-1">
        Hero image
      </label>
      <input type="hidden" name="hero_image_url" value={url} />

      {url && (
        <img
          src={url}
          alt="Trip hero preview"
          className="mb-3 h-40 w-full rounded-lg border border-sand/50 object-cover"
        />
      )}

      <div className="flex items-center gap-3">
        <input
          type="file"
          ref={fileRef}
          accept="image/*"
          className="text-sm text-ink/70 file:mr-3 file:rounded-lg file:border-0 file:bg-ink file:px-3 file:py-1.5 file:text-cream"
        />
        <button
          type="button"
          onClick={handleUpload}
          disabled={pending}
          className="rounded-lg border border-sand/60 px-3 py-1.5 text-xs font-medium text-ink/70 hover:border-rust/40 disabled:opacity-60"
        >
          {pending ? 'Uploading…' : 'Upload'}
        </button>
      </div>
      {error && <p className="mt-2 text-xs text-rust">{error}</p>}
    </div>
  );
}
