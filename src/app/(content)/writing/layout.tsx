import { type ReactNode } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | FEDEP',
    default: 'FEDEP Noticias',
  },
};

export default function NewsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
