import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import '@/styles/globals.css';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700', '800'], // base, medium, semi-bold, bold, extra-bold
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bastián Becker',
  description: 'A minimalist blog.',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang='es'>
      <body className={`${poppins.variable} antialiased`}>{children}</body>
    </html>
  );
}
