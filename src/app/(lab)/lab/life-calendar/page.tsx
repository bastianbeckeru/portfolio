import { type Metadata } from 'next';
import LifeCalendar from '@/components/life-calendar';

export const metadata: Metadata = {
  title: 'Calendar of Your Life | Visualiza tu tiempo',
  description:
    'Una visualización inspirada en Kurzgesagt que muestra las semanas y meses de tu vida. El tiempo es limitado y preciado, ¿cómo quieres ocuparlo?',
  openGraph: {
    title: 'Calendar of Your Life',
    description:
      'Visualiza las semanas de tu vida y reflexiona sobre cómo quieres invertir tu tiempo',
    type: 'website',
  },
};

export default function LifeCalendarPage() {
  return <LifeCalendar />;
}
