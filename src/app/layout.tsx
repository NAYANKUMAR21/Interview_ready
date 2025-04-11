import type { Metadata } from 'next';
import { Mona_Sans } from 'next/font/google';
import './globals.css';
import { Toaster } from 'sonner';

const monoSans = Mona_Sans({
  variable: '--font-mona-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Interview Prep',
  description: 'Ai Powered Mock interview',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${monoSans.className} antialiased pattern`}
        suppressHydrationWarning
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
