import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen overflow-x-hidden bg-cream">
      <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-cream transition focus:translate-y-0">
        Skip to content
      </a>
      <header className="sticky top-0 z-50 border-b border-sand/45 bg-cream/92 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-2.5 text-ink" aria-label="Nomichi home">
            <span className="grid size-8 place-items-center rounded-full bg-rust text-sm font-bold text-cream">N</span>
            <span className="text-lg font-bold tracking-[0.08em]">NOMICHI</span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            <Link href="/#trips" className="text-sm font-medium text-ink/70 transition hover:text-rust-dark">Open trips</Link>
            <Link href="/#why-nomichi" className="text-sm font-medium text-ink/70 transition hover:text-rust-dark">Why Nomichi</Link>
            <Link href="/#how-it-works" className="text-sm font-medium text-ink/70 transition hover:text-rust-dark">How it works</Link>
            <Link href="/#faq" className="text-sm font-medium text-ink/70 transition hover:text-rust-dark">FAQ</Link>
          </nav>
          <Link href="/#trips" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-cream transition hover:bg-olive sm:px-5">
            <span className="hidden sm:inline">See open trips</span>
            <span className="sm:hidden">Trips</span>
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </header>
      <main id="main-content">{children}</main>
      <footer className="bg-ink text-cream">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
          <div>
            <Link href="/" className="text-lg font-bold tracking-[0.08em]">NOMICHI</Link>
            <p className="mt-5 max-w-sm text-pretty text-sm leading-7 text-cream/70">
              Slow, offbeat, small-group journeys planned and run by people who care about the details.
            </p>
            <p className="editorial-title mt-7 text-2xl text-sand">Travel that finds you.</p>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-sand">Explore</h2>
            <div className="mt-5 grid gap-3 text-sm text-cream/75">
              <Link href="/#trips" className="hover:text-yellow">Open trips</Link>
              <Link href="/#why-nomichi" className="hover:text-yellow">Why Nomichi</Link>
              <Link href="/#faq" className="hover:text-yellow">FAQ</Link>
              <Link href="/login" className="hover:text-yellow">Team sign in</Link>
            </div>
          </div>
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-sand">Stay close</h2>
            <div className="mt-5 grid gap-3 text-sm text-cream/75">
              <a href="mailto:hello@thenomichi.com" className="hover:text-yellow">hello@thenomichi.com</a>
              <a href="https://instagram.com/thenomichi" target="_blank" rel="noreferrer" className="hover:text-yellow">Instagram · @thenomichi</a>
            </div>
          </div>
        </div>
        <div className="border-t border-cream/10 px-5 py-5 text-center text-xs text-cream/50">
          Nomichi Explorers Private Limited · Wander · Connect · Belong
        </div>
      </footer>
    </div>
  );
}
