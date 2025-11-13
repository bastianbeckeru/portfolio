'use client';

// Calendar of Your Life
/* Inspired by Kurzgesagt
 *
 * 1 Year = 52 Weeks
 * 1 Year = 12 Months
 */

import { CSSProperties, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import { calculateLifeStats } from '@/lib/lifeCalculator';
import { Calendar } from '@/components/ui/calendar';
import styles from '@/styles/calendar.module.css';
import { motion } from 'motion/react';
import { Label } from '@/components/ui/label';
import { ChevronDownIcon } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

export const phases = [
  { name: 'Childhood', start: 1, end: 12, color: 'var(--color-orange-400)' },
  { name: 'Adolescence', start: 13, end: 19, color: 'var(--color-rose-400)' },
  {
    name: 'Early Adulthood',
    start: 20,
    end: 34,
    color: 'var(--color-pink-400)',
  },
  {
    name: 'Middle Adulthood',
    start: 35,
    end: 49,
    color: 'var(--color-fuchsia-400)',
  },
  {
    name: 'Mature Adulthood',
    start: 50,
    end: 79,
    color: 'var(--color-sky-400)',
  },
  {
    name: 'Late Adulthood',
    start: 80,
    end: 100,
    color: 'var(--color-green-400)',
  },
];

export const GRID_SIZE = 1; // rem
export const GRID_GAP = 0.0625; // rem
export const WEEKS_PER_YEAR = 52;
export const MONTHS_PER_YEAR = 12;

export default function LifeCalendarPage() {
  const isMobile = useIsMobile();

  const [open, setOpen] = useState<boolean>(false);
  const [birthDate, setBirthDate] = useState<Date | undefined>(
    new Date(2001, 8, 9)
  );
  const lifeExpectancy = 100;
  const mode: 'weeks' | 'months' = isMobile ? 'months' : 'weeks';
  const multiplier = isMobile ? MONTHS_PER_YEAR : WEEKS_PER_YEAR;

  const { lived } = calculateLifeStats({
    birthDate: birthDate ?? new Date(2001, 8, 9),
    lifeExpectancy: lifeExpectancy,
    timeUnit: mode,
  });

  const getColors = (idx: number): CSSProperties => {
    if (idx <= lived) {
      return {
        backgroundColor: 'var(--foreground)',
        borderColor: 'var(--foreground)',
      };
    }

    const year = Math.trunc(idx / multiplier) + 1;
    const currentPhase = phases.find((p) => year >= p.start && year <= p.end)!;

    return {
      borderColor: currentPhase.color,
    };
  };

  return (
    <div className='flex mb-16 w-dvw min-h-dvh flex-col items-center justify-center'>
      <div className='p-6 text-center'>
        <h2 className='font-bold text-balance text-4xl mb-2 tracking-wide uppercase'>
          Calendar of your life
        </h2>
        <p className='font-semibold text-balance text-xs uppercase tracking-wide'>
          Time is limited and precious. How do you want to spend it?
        </p>
      </div>
      <div>
        <div className='flex flex-col gap-3'>
          <Label htmlFor='date' className='px-1 sr-only'>
            Date of birth
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant='outline'
                id='date'
                className='w-48 justify-between font-normal'
              >
                {birthDate
                  ? birthDate.toLocaleDateString('es-CL')
                  : 'Selecciona una fecha'}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className='w-64 overflow-hidden p-0' align='start'>
              <Calendar
                mode='single'
                selected={birthDate}
                captionLayout='dropdown'
                className='size-full'
                onSelect={(date) => {
                  setBirthDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className='hidden'>
        <span className='uppercase'>Weeks of your life</span>
      </div>
      <div className='flex flex-row gap-2 p-6'>
        <div className='hidden'>
          <span className='uppercase'>Years of your life</span>
        </div>
        <div className={cn('text-right', styles.calendarLeft)}>
          {Array.from({
            length: lifeExpectancy,
          }).map((_, idx) => (
            <div
              key={idx}
              className='font-semibold text-xs uppercase tracking-wide'
            >
              <p>{idx + 1}</p>
            </div>
          ))}
        </div>

        <motion.div
          variants={{
            initial: {
              opacity: 0,
            },
            animate: {
              opacity: 1,
            },
          }}
          initial='initial'
          animate='animate'
          className={cn('', styles.calendar)}
          style={{
            gridTemplateColumns: `repeat(${multiplier}, 1rem)`,
          }}
        >
          {Array.from({
            length: lifeExpectancy * multiplier,
          }).map((_, idx) => (
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

        <div className={cn('', styles.calendarRight)}>
          {phases.map((p, idx) => (
            <div
              key={idx}
              className='border-y flex items-center'
              style={{
                height: `${
                  (GRID_SIZE + GRID_GAP) * (p.end - p.start) + GRID_SIZE
                }rem`,
              }}
            >
              <p
                className={cn(
                  'uppercase text-xs tracking-wide flex flex-col gap-0.5 text-center vertical'
                )}
                style={{
                  color: p.color,
                }}
              >
                <span className='font-semibold'>{p.name}</span>
                <span className='font-medium'>
                  ({p.start} — {p.end})
                </span>
              </p>
            </div>
          ))}
        </div>
        <div className='hidden'>
          <span className='uppercase'>Stages of your life</span>
        </div>
      </div>
    </div>
  );
}

const weekVariables = {};
