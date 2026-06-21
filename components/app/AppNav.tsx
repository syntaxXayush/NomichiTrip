'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Map, Users } from 'lucide-react';

const items = [
  { href: '/app', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/app/leads', label: 'Leads', icon: Users },
  { href: '/app/trips', label: 'Trips', icon: Map },
];

export function AppNav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:overflow-visible" aria-label="Trip Desk navigation">
      {items.map(({ href, label, icon: Icon, exact }) => {
        const active = exact ? pathname === href : pathname.startsWith(href);
        return (
          <Link key={href} href={href} aria-current={active ? 'page' : undefined} className={`inline-flex min-h-11 shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${active ? 'bg-ink text-cream shadow-sm' : 'text-ink/65 hover:bg-rust/8 hover:text-rust-dark'}`}>
            <Icon className="size-4" aria-hidden="true" /> {label}
          </Link>
        );
      })}
    </nav>
  );
}
