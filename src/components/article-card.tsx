import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from './ui/card';
import { ExternalLink, Github } from 'lucide-react';
import { AspectRatio } from './ui/aspect-ratio';
import { slugify } from '@/utils/strings';
import { formatDate } from '@/utils/dateHelper';

type ArticleCardProps = {
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  readTime: number;
  category: string;
};

export default function ArticleCard({
  title,
  description,
  image,
  publishedAt,
  readTime,
  category,
}: ArticleCardProps) {
  return (
    <AspectRatio
      ratio={4 / 4}
      className='rounded-md overflow-hidden text-white'
    >
      <Image
        src={image || '/placeholder.svg'}
        alt={title}
        fill
        className='object-cover -z-10 transition-opacity'
      />

      <Link
        href={`/writing/${slugify(title)}`}
        className='py-6 gap-2 flex-col px-8 justify-end size-full items-center text-shadow flex font-serif'
      >
        <p className='font-bold text-xs text-inherit uppercase'>{category}</p>
        <h2 className='font-medium text-left text-xl md:text-2xl text-pretty'>
          {title}
        </h2>
        <p className=' text-xs'>
          <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
          <span className='mx-2'>•</span>
          <span>{readTime} min read</span>
        </p>
      </Link>
    </AspectRatio>
  );
}
