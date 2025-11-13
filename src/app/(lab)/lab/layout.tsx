import Footer from '@/components/footer';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon } from 'lucide-react';
import Link from 'next/link';

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative flex min-h-dvh min-w-full flex-col items-center bg-background py-4'>
      <Link
        href='/'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-0 left-0 m-4 md:top-4 md:left-4 space-x-2 [&_svg]:size-4 [&_svg]:shrink-0'
        )}
      >
        <ChevronLeftIcon />
        <span className='hidden md:inline-flex'>Volver</span>
      </Link>

      {children}
    </div>
  );
}
