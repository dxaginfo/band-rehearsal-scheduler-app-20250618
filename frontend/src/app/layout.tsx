import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { QueryProvider } from '@/components/query-provider';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter', 
});

export const metadata: Metadata = {
  title: 'Band Rehearsal Scheduler - Plan, Organize, and Track Band Rehearsals',
  description: 'Automatically schedule band rehearsals, send reminders, track attendance, and suggest optimal rehearsal times.',
  keywords: ['band rehearsal', 'music scheduling', 'rehearsal planner', 'band practice', 'music rehearsal'],
  authors: [{ name: 'Band Rehearsal Scheduler Team' }],
  creator: 'Band Rehearsal Scheduler',
  publisher: 'Band Rehearsal Scheduler',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://band-rehearsal-scheduler.com',
    title: 'Band Rehearsal Scheduler - Plan, Organize, and Track Band Rehearsals',
    description: 'Automatically schedule band rehearsals, send reminders, track attendance, and suggest optimal rehearsal times.',
    siteName: 'Band Rehearsal Scheduler',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Band Rehearsal Scheduler',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Band Rehearsal Scheduler - Plan, Organize, and Track Band Rehearsals',
    description: 'Automatically schedule band rehearsals, send reminders, track attendance, and suggest optimal rehearsal times.',
    images: ['/twitter-image.jpg'],
    creator: '@bandrehearsal',
  },
  manifest: '/manifest.json',
  themeColor: '#3B82F6',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}