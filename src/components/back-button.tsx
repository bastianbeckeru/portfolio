'use client';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'absolute top-0 left-0 m-4 md:top-4 md:left-4 space-x-2 [&_svg]:size-4 [&_svg]:shrink-0'
      )}
    >
      <ChevronLeftIcon />
      <span className='hidden md:inline-flex'>Volver</span>
    </button>
  );
}
