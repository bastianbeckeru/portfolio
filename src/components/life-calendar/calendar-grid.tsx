'use client';

import { memo, type CSSProperties } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import {
  phases,
  GRID_SIZE,
  GRID_GAP,
  WEEKS_PER_YEAR,
  MONTHS_PER_YEAR,
} from './constants';
import styles from './calendar.module.css';

interface CalendarGridProps {
  lifeExpectancy: number;
  mode: 'weeks' | 'months';
  lived: number;
}

export const CalendarGrid = memo(function CalendarGrid({
  lifeExpectancy,
  mode,
  lived,
}: CalendarGridProps) {
  const multiplier = mode === 'weeks' ? WEEKS_PER_YEAR : MONTHS_PER_YEAR;
  const totalCells = lifeExpectancy * multiplier;

  const getColors = (idx: number): CSSProperties => {
    if (idx <= lived) {
      return {
        backgroundColor: 'var(--foreground)',
        borderColor: 'var(--foreground)',
      };
    }

    const year = Math.trunc(idx / multiplier) + 1;
    const currentPhase = phases.find((p) => year >= p.start && year <= p.end)!;

    return { borderColor: currentPhase.color };
  };

  return (
    <div className='flex flex-row gap-2 py-2 px-6'>
      <YearLabels lifeExpectancy={lifeExpectancy} />

      <motion.div
        variants={{
          initial: { opacity: 0 },
          animate: { opacity: 1 },
        }}
        initial='initial'
        animate='animate'
        className={styles.calendar}
        style={{
          gridTemplateRows: `repeat(${lifeExpectancy}, ${GRID_SIZE}rem)`,
          gridTemplateColumns: `repeat(${multiplier}, ${GRID_SIZE}rem)`,
        }}
      >
        {Array.from({ length: totalCells }, (_, idx) => (
          <div
            key={idx}
            className={cn(
              'border-2 rounded-full bg-background',
              idx <= lived && 'bg-foreground'
            )}
            style={getColors(idx)}
          />
        ))}
      </motion.div>

      <PhaseLabels />
    </div>
  );
});

const YearLabels = memo(({ lifeExpectancy }: { lifeExpectancy: number }) => (
  <div className={cn('text-right', styles.calendarLeft)}>
    {Array.from({ length: lifeExpectancy }, (_, idx) => (
      <div key={idx} className='font-semibold text-xs uppercase tracking-wide'>
        <p>{idx + 1}</p>
      </div>
    ))}
  </div>
));

const PhaseLabels = memo(() => (
  <div className={cn('divide-y-2', styles.calendarRight)}>
    {phases.map((p) => (
      <div
        key={p.name}
        className='flex items-center'
        style={{
          height: `${(GRID_SIZE + GRID_GAP) * (p.end - p.start + 1)}rem`,
        }}
      >
        <p
          className='uppercase text-xs tracking-wide flex flex-col gap-0.5 text-center vertical'
          style={{ color: p.color }}
        >
          <span className='font-semibold'>{p.name}</span>
          <span className='font-medium'>
            ({p.start} — {p.end})
          </span>
        </p>
      </div>
    ))}
  </div>
));
