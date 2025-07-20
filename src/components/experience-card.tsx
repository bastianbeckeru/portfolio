import { Calendar, MapPin } from 'lucide-react';

type ExperienceCardProps = {
  role: string;
  organization: string;
  location: string;
  period: string;
  description: string;
};

export default function ExperienceCard({
  role,
  organization,
  location,
  period,
  description,
}: ExperienceCardProps) {
  return (
    <div className='flex flex-col gap-2 p-4 border rounded-md'>
      <h3 className='text-xl font-semibold text-foreground'>
        {role} — {organization}
      </h3>
      <div className='flex flex-col md:flex-row gap-2 md:gap-4 text-muted-foreground'>
        <div className='flex items-center gap-1'>
          <MapPin className='size-4' />
          <span className='text-sm'>{location}</span>
        </div>
        <div className='flex items-center gap-1'>
          <Calendar className='size-4' />
          <span className='text-sm'>{period}</span>
        </div>
      </div>
      <div className='text-sm text-muted-foreground hidden'>{description}</div>
    </div>
  );
}

/* • */
