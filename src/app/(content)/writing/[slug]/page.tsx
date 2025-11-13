import { AspectRatio } from '@/components/ui/aspect-ratio';
import { allItems } from '@/utils/content';
import { formatDate } from '@/utils/dateHelper';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const slug = (await params).slug;
  const { default: Article, frontmatter: metadata } = await import(
    `@/content/${slug}.mdx`
  );

  const publicationDate = formatDate(metadata.publishedAt);

  return (
    <article className='mx-auto md:max-w-3xl md:pt-8 font-serif'>
      <AspectRatio ratio={16 / 9} className='md:rounded-md overflow-hidden'>
        <Image
          src={metadata.image}
          alt={metadata.title}
          fill
          className='object-cover'
        />
      </AspectRatio>

      <div className='py-6 gap-2 flex flex-col px-8 justify-center items-center'>
        <p className='font-bold tracking-wide text-muted-foreground text-xs uppercase'>
          {metadata.category}
        </p>
        <h2 className='font-medium text-center text-xl md:text-4xl'>
          {metadata.title}
        </h2>
        <p className='text-muted-foreground text-xs'>
          <time dateTime={metadata.publishedAt}>{publicationDate}</time>
        </p>
        <div className='h-px bg-muted-foreground w-full' />
        <p className='text-xs'>
          <span className='italic mr-0.5'>por </span>
          {metadata.authors.map(
            (author: { handle: string; name: string }, index: number) => (
              <span key={author.handle}>
                {index > 0 &&
                  (index === metadata.authors.length - 1 ? ' y ' : ', ')}

                <a
                  href={`https://www.linkedin.com/in/${author.handle}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:!underline'
                >
                  {author.name}
                </a>
              </span>
            )
          )}
        </p>
      </div>

      <div className='py-2 px-6 prose dark:prose-invert'>
        <Article />
      </div>
    </article>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;

  const { frontmatter } = await import(`@/content/${slug}.mdx`);
  const { title, description, publishedAt, authors } = frontmatter;

  const article = allItems.find((item) => item.metadata.slug === slug)!;
  const { readTime } = article.metadata;

  /*  const ogImage = image.startsWith('http') 
    ? image 
    : `${process.env.NEXT_PUBLIC_SITE_URL}${image}`; */

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      type: 'article',
      locale: 'es_CL',
      //url: `${process.env.NEXT_PUBLIC_SITE_URL}/${slug}`,
      siteName: 'Bastián Becker',
      publishedTime: publishedAt,
      authors: authors.map((a: { name: string }) => a.name),
      /* images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ], */

      section: 'Writing',
      /* tags: tags ?? [], */
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      /* images: [ogImage], */
      site: '@bastianbecker',
      creator:
        authors.length > 0
          ? `@${authors[0].handle ?? authors[0].name}`
          : undefined,
    },
    other: {
      'article:published_time': publishedAt,
      'article:author': authors.map((a: { name: string }) => a.name).join(', '),
      'article:section': 'Writing',
      /* 'article:tag': tags?.join(', '), */

      // Etiquetas Twitter mejoradas
      'twitter:label1': 'Tiempo de lectura',
      'twitter:data1': `${readTime} min`,
      'twitter:label2': 'Autores',
      'twitter:data2': authors.map((a: { name: string }) => a.name).join(', '),
    },
    //metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
    alternates: {
      canonical: `/writing/${slug}`,
    },
  };
}

export function generateStaticParams() {
  const articles = allItems;
  return articles.map((article) => ({ slug: article.metadata.slug }));
}

export const dynamicParams = false;
