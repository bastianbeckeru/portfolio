import Header from '@/components/header';
import Footer from '@/components/footer';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='relative grid min-h-dvh grid-rows-[auto_1fr_auto]'>
      <Header />
      {children}
      <Footer />
    </div>
  );
}
