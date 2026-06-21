import type { Metadata } from "next";
import { Fraunces, Poppins } from 'next/font/google';
import "./globals.css";

const serif = Fraunces({ subsets: ['latin'], variable: '--font-serif', display: 'swap' });
const sans = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://thenomichi.com'),
  title: { default: 'Nomichi Trip Desk', template: '%s | Nomichi' },
  description: 'Slow, offbeat, small-group journeys for people who want to stay longer and travel with care.',
  applicationName: 'Nomichi Trip Desk',
  keywords: ['Nomichi', 'small group travel', 'offbeat travel', 'slow travel', 'India trips'],
  openGraph: {
    title: 'Nomichi | Travel that finds you',
    description: 'Slow, offbeat, small-group journeys planned and run by our own team.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Nomichi',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN">
      <body
        className={`${serif.variable} ${sans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
