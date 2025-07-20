import Image from 'next/image';
import { Card, CardContent } from './ui/card';
import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';

type ProjectCardProps = {
  image: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
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
    <Card className='group hover:shadow-lg p-0 transition-shadow duration-300 border-0 shadow-sm'>
      <CardContent className='p-0'>
        <div className='aspect-video overflow-hidden rounded-t-lg bg-gray-100'>
          <Image
            src={image || '/placeholder.svg'}
            alt={title}
            width={400}
            height={300}
            className='object-cover w-full h-full group-hover:scale-105 transition-transform duration-300'
          />
        </div>
        <div className='p-6'>
          <h3 className='text-xl font-semibold text-gray-900 mb-2'>{title}</h3>
          <p className='text-gray-600 mb-4 text-sm leading-relaxed'>
            {description}
          </p>
          <div className='flex flex-wrap gap-2 mb-4'>
            {tech.map((t) => (
              <span
                key={t}
                className='px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded'
              >
                {t}
              </span>
            ))}
          </div>
          <div className='flex gap-3'>
            <Link
              href={github}
              className='flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm'
            >
              <Github className='size-4 mr-1' />
              Code
            </Link>
            <Link
              href={live}
              className='flex items-center text-gray-600 hover:text-gray-900 transition-colors text-sm'
            >
              <ExternalLink className='size-4 mr-1' />
              Live Demo
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
