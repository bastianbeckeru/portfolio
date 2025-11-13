// components/life-calendar/birth-date-selector.tsx
'use client';

import { useState, memo } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useUserStore } from '@/store/user-store';

export const BirthDateSelector = memo(function BirthDateSelector() {
  const [open, setOpen] = useState(false);
  const { birthDate, setBirthDate } = useUserStore();

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setBirthDate(date);
    setOpen(false);
  };

  const formattedDate = birthDate
    ? birthDate.toLocaleDateString('es-CL')
    : 'Selecciona tu fecha de nacimiento';

  return (
    <div className='flex flex-col gap-3'>
      <Label htmlFor='birth-date' className='px-1 sr-only'>
        Fecha de nacimiento
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id='birth-date'
            variant='outline'
            className='w-32 justify-between font-normal'
            aria-label='Seleccionar fecha de nacimiento'
          >
            <span className='truncate'>{formattedDate}</span>
            <ChevronDownIcon className='opacity-50' />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className='w-auto min-w-64 h-auto min-h-[22rem] overflow-hidden p-0'
          align='start'
        >
          <Calendar
            mode='single'
            selected={birthDate}
            onSelect={handleDateSelect}
            captionLayout='dropdown'
            className='size-full'
            defaultMonth={birthDate || new Date(2001, 8, 9)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
});
