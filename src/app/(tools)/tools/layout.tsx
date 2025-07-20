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
    <div className='relative flex min-h-dvh min-w-full flex-col items-center bg-background py-16'>
      <Link
        href='/'
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute top-0 left-0 m-4 md:top-4 md:left-4'
        )}
      >
        <ChevronLeftIcon className='mr-2' />
        Volver
      </Link>

      {children}
    </div>
  );
}
