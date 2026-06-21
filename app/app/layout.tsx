import Link from 'next/link';
import { logout } from '@/lib/actions/auth';
import { createClient } from '@/lib/supabase/server';
import { LogOut } from 'lucide-react';
import { AppNav } from '@/components/app/AppNav';

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-cream md:grid md:grid-cols-[248px_minmax(0,1fr)]">
      <aside className="border-b border-sand/50 bg-[#F5EDDF] md:sticky md:top-0 md:flex md:h-screen md:flex-col md:border-b-0 md:border-r">
        <div className="flex h-[68px] items-center justify-between px-5 md:h-auto md:px-6 md:pb-8 md:pt-7">
          <Link href="/app" className="inline-flex items-center gap-2.5" aria-label="Nomichi Trip Desk overview">
            <span className="grid size-8 place-items-center rounded-full bg-rust text-sm font-bold text-cream">N</span>
            <span><span className="block text-sm font-bold tracking-[0.08em]">NOMICHI</span><span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">Trip Desk</span></span>
          </Link>
          <form action={logout} className="md:hidden">
            <button aria-label="Sign out" className="grid size-11 place-items-center rounded-xl text-ink/60 hover:bg-ink/5 hover:text-rust-dark"><LogOut className="size-4" /></button>
          </form>
        </div>
        <AppNav />
        <form action={logout} className="mt-auto hidden border-t border-sand/45 p-4 md:block">
          <p className="truncate px-3 text-xs text-muted-foreground">{user?.email}</p>
          <button className="mt-2 inline-flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-left text-sm font-medium text-ink/65 transition hover:bg-ink/5 hover:text-rust-dark">
            <LogOut className="size-4" aria-hidden="true" /> Sign out
          </button>
        </form>
      </aside>
      <main className="min-w-0 p-5 sm:p-7 md:p-10 xl:p-12">{children}</main>
    </div>
  );
}
