import Footer from '@/components/footer';
import Navbar from '@/components/navbar';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='grid min-h-dvh grid-rows-[auto_1fr_auto]'>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
