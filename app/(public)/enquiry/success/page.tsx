// app/(public)/enquiry/success/page.tsx
import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';

export default function EnquirySuccess() {
    return (
        <div className="mx-auto max-w-2xl px-5 py-20 text-center sm:px-8 sm:py-28">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-olive text-cream"><Check className="size-7" aria-hidden="true" /></div>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.16em] text-rust-dark">Enquiry received</p>
            <h1 className="editorial-title balanced mt-3 text-4xl sm:text-5xl">Your note is with our team.</h1>
            <p className="mx-auto mt-5 max-w-lg text-pretty text-base leading-8 text-muted-foreground">
                A Nomichi associate will read what you shared and reply personally, usually within one working day.
            </p>
            <div className="mx-auto mt-8 max-w-md rounded-2xl border border-sand/55 bg-card p-5 text-left text-sm leading-7 text-muted-foreground">
              <strong className="block text-ink">What happens next</strong>
              We will answer your practical questions, understand what you want from the trip and help you decide whether it feels right.
            </div>
            <Link
                href="/"
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition hover:bg-olive"
            >
                Back to journeys <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
        </div>
    );
}
