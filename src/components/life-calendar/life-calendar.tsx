// components/life-calendar/life-calendar.tsx
'use client';

import { useMemo } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { calculateLifeStats } from '@/lib/lifeCalculator';
import { useUserStore } from '@/store/user-store';
import { CalendarGrid } from './calendar-grid';
import { BirthDateSelector } from './birth-date-selector';

const LIFE_EXPECTANCY = 100;

export default function LifeCalendar() {
  const isMobile = useIsMobile();
  const { birthDate } = useUserStore();

  const mode = isMobile ? 'months' : 'weeks';

  const lifeStats = useMemo(
    () =>
      calculateLifeStats({
        birthDate,
        lifeExpectancy: LIFE_EXPECTANCY,
        timeUnit: mode,
      }),
    [birthDate, mode]
  );

  return (
    <div className='flex mt-6 mb-16 w-dvw min-h-dvh flex-col items-center justify-center gap-2'>
      <header className='px-6 text-center mb-2'>
        <h1 className='font-bold text-balance text-4xl mb-2 tracking-wide uppercase'>
          Calendar of your life
        </h1>
        <p className='font-semibold text-balance text-xs uppercase tracking-wide text-muted-foreground'>
          Time is limited and precious. How do you want to spend it?
        </p>
      </header>

      <BirthDateSelector />
      <CalendarGrid
        lifeExpectancy={LIFE_EXPECTANCY}
        mode={mode}
        lived={lifeStats.lived}
      />
    </div>
  );
}
