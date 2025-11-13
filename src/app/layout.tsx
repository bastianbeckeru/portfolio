import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import '@/styles/globals.css';
import { Merriweather, Poppins } from 'next/font/google';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  weight: ['400', '500', '600', '700', '800'], // base, medium, semi-bold, bold, extra-bold
  display: 'swap',
});

const merriweather = Merriweather({
  variable: '--font-merriweather',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bastianbecker.cl'),

  title: {
    default: 'Bastián Becker',
    template: '%s | Bastián Becker',
  },

  description:
    'Estudiante de Ingeniería y amante del diseño, explorando cómo crear experiencias digitales con propósito.',

  keywords: [
    'Bastián Becker',
    'Bastián Becker Urzúa',
    'Desarrollador Web',
    'Diseñador UX/UI',
    'React',
    'Next.js',
    'TypeScript',
    'Desarrollo Frontend',
    'Portfolio Ingeniería',
    'Visualización de datos',
    'Ingeniero Civil Industrial',
    'Ingeniero Chile',
    'Ingeniero UDP',
    'Ingeniero Universidad Diego Portales',
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
        url: '/profile.png', // 1200x630px
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
    images: ['/profile.png'],
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
      <body
        className={`${poppins.variable} ${merriweather.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
