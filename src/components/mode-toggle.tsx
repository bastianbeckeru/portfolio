'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();

  function handleTheme() {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  }

  return (
    <Button
      variant='ghost'
      size='icon'
      className={cn('active:blur-sm', className)}
      onClick={handleTheme}
    >
      {resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />}
      <span className='sr-only'>Cambiar tema</span>
    </Button>
  );
}
