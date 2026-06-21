'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { login } from '@/lib/actions/auth';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-cream transition hover:bg-olive disabled:cursor-wait disabled:opacity-70">
      {pending && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
      {pending ? 'Signing in' : 'Sign in'}
    </button>
  );
}

export function LoginForm({ hasError }: { hasError: boolean }) {
  const [showPassword, setShowPassword] = useState(false);
  const field = 'min-h-12 w-full rounded-xl border border-input bg-cream px-3.5 py-2.5 text-sm outline-none transition focus:border-rust-dark focus:ring-2 focus:ring-rust/15';

  return (
    <form action={login} className="mt-8 space-y-5">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-ink/75">Email</label>
        <input id="email" name="email" type="email" required autoComplete="email" className={field} />
      </div>
      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs font-semibold text-ink/75">Password</label>
        <div className="relative">
          <input id="password" name="password" type={showPassword ? 'text' : 'password'} required autoComplete="current-password" className={`${field} pr-12`} aria-describedby={hasError ? 'login-error' : undefined} />
          <button type="button" onClick={() => setShowPassword((value) => !value)} className="absolute right-1 top-1 grid size-10 place-items-center rounded-lg text-muted-foreground hover:bg-ink/5 hover:text-ink" aria-label={showPassword ? 'Hide password' : 'Show password'}>
            {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
          </button>
        </div>
      </div>
      {hasError && <p id="login-error" role="alert" className="rounded-xl border border-rust/25 bg-rust/5 px-3.5 py-3 text-sm text-rust-dark">That email and password did not match. Check both and try again.</p>}
      <SubmitButton />
    </form>
  );
}
