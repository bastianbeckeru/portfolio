import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import '@/styles/globals.css';
import {
  Inter,
  Merriweather,
  Newsreader,
  Nunito_Sans,
  Poppins,
} from 'next/font/google';

const nunito = Nunito_Sans({
  variable: '--font-nunito',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const newsreader = Newsreader({
  subsets: ['latin'],
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-newsreader',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bastianbecker.cl'),

  title: {
    default: 'Bastián Becker',
    template: '%s | Bastián Becker',
  },

  description:
    'Ingeniero Civil Industrial. Diseño sistemas simples y rigurosos para transformar problemas complejos en impacto real.',

  keywords: [
    'Bastián Becker Urzúa',
    'Ingeniero Civil Industrial',
    'Planificación y control de gestión',
    'Desarrollo web',
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'SQL',
    'AWS',
    'Diseño de sistemas',
    'Innovación',
    'Eficiencia',
    'Política y bien común',
    'Universidad Diego Portales',
    'Santiago de Chile',
  ],

  authors: [{ name: 'Bastián Becker Urzúa', url: 'https://bastianbecker.cl' }],
  creator: 'Bastián Becker Urzúa',

  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: 'https://bastianbecker.cl',
    siteName: 'Bastián Becker',
    title: 'Bastián Becker',
    description:
      'Estudiante de Ingeniería y amante del diseño, explorando cómo crear experiencias digitales con propósito.',
    images: [
      {
        url: '/profile.webp', // 1200x630px
        width: 1200,
        height: 630,
        alt: 'Bastián Becker',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Bastián Becker',
    description:
      'Estudiante de Ingeniería y amante del diseño, explorando cómo crear experiencias digitales con propósito.',
    images: ['/profile.webp'],
    creator: '@bastianbeckeru', // si tienes Twitter
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: 'https://bastianbecker.cl',
  },
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang='es'>
      <body className={`${nunito.variable} ${newsreader.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
