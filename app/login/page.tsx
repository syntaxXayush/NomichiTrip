import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { LoginForm } from '@/components/app/LoginForm';

export const metadata: Metadata = { title: 'Team sign in', robots: { index: false, follow: false } };

export default function LoginPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <main className="grid min-h-screen bg-cream lg:grid-cols-[1.04fr_.96fr]">
      <section className="relative hidden overflow-hidden bg-olive lg:block">
        <Image src="https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?q=84&w=1800&auto=format&fit=crop" alt="A road through the high mountains of Ladakh" fill priority sizes="52vw" className="object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-olive/30 to-olive/20" />
        <div className="absolute inset-x-0 bottom-0 p-12 text-cream xl:p-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-yellow">Nomichi Trip Desk</p>
          <h1 className="editorial-title balanced mt-4 max-w-xl text-5xl leading-tight">Every conversation, held with care.</h1>
          <p className="mt-5 max-w-lg text-sm leading-7 text-cream/75">A calm place for the team to follow up, understand the traveller and keep the next action clear.</p>
        </div>
      </section>
      <section className="flex items-center justify-center px-5 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink/65 hover:text-rust-dark"><ArrowLeft className="size-4" /> Back to Nomichi</Link>
          <div className="mt-12 inline-flex items-center gap-2.5"><span className="grid size-9 place-items-center rounded-full bg-rust text-sm font-bold text-cream">N</span><span className="text-lg font-bold tracking-[0.08em]">NOMICHI</span></div>
          <h2 className="editorial-title mt-8 text-4xl">Welcome back.</h2>
          <p className="mt-3 text-sm leading-7 text-muted-foreground">Sign in to manage enquiries, conversations and upcoming trips.</p>
          <LoginForm hasError={Boolean(searchParams.error)} />
          <p className="mt-7 flex items-center justify-center gap-2 text-xs text-muted-foreground"><ShieldCheck className="size-3.5" /> Secure team workspace</p>
        </div>
      </section>
    </main>
  );
}
