import Navbar from '@/components/header';
import Footer from '@/components/footer';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid min-h-dvh grid-rows-[auto_1fr_auto]'>
      <div className='pointer-events-none fixed inset-0 opacity-20 noise-filter' />
      {/* <Header /> */}
      {children}
      <Footer />
    </div>
  );
}
