'use client';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-5 text-center">
      <div className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rust-dark">Something broke</p>
        <h1 className="editorial-title mt-4 text-4xl">Let us try that again.</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">The page did not load cleanly. Retry once, then check the terminal logs if it keeps happening.</p>
        <button onClick={reset} className="mt-7 inline-flex min-h-11 items-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream">Retry</button>
      </div>
    </main>
  );
}
