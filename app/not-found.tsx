import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-cream px-5 text-center">
      <div className="max-w-md">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-rust-dark">404</p>
        <h1 className="editorial-title mt-4 text-4xl">This path wandered off.</h1>
        <p className="mt-4 text-sm leading-7 text-muted-foreground">The page you are looking for is not here anymore.</p>
        <Link href="/" className="mt-7 inline-flex min-h-11 items-center rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-cream">Back to Nomichi</Link>
      </div>
    </main>
  );
}
