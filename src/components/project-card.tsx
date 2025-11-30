import Image from 'next/image';
import { Card, CardContent, CardFooter } from './ui/card';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from './ui/badge';

type ProjectCardProps = {
  image: string;
  title: string;
  description: string;
  tech: string[];
  github: string | null;
  live: string;
};

export default function ProjectCard({
  image,
  title,
  description,
  tech,
  github,
  live,
}: ProjectCardProps) {
  return (
    <Card className='group hover:scale-[101%] transition-all hover:shadow-lg p-0 duration-200 border-0 shadow-sm overflow-hidden'>
      <CardContent className='p-0'>
        <Link href={live} className='block relative'>
          <div className='aspect-video overflow-hidden bg-gray-50'>
            <Image
              src={image || '/placeholder.svg'}
              alt={title}
              width={400}
              height={200}
              className='object-cover size-full'
            />
          </div>
          <ExternalLink className='absolute size-4 bottom-4 right-4 text-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
        </Link>

        <div className='p-4 gap-1.5 flex flex-col'>
          <h3 className='text-lg font-semibold text-foreground'>{title}</h3>
          <p className='text-muted-foreground min-h-12 text-xs leading-relaxed'>
            {description}
          </p>
          <div className='inline-flex justify-between gap-2'>
            <div className='flex flex-wrap gap-2'>
              {tech.map((t) => (
                <Badge key={t} variant='secondary' className='h-6 rounded-sm'>
                  {t}
                </Badge>
              ))}
            </div>
            {github && (
              <a
                href={github}
                target='_blank'
                rel='noopener noreferrer'
                className='flex [&_svg]:size-4 p-2 rounded-md items-center [&_svg]:text-muted-foreground hover:bg-muted transition-colors'
              >
                <Github />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
