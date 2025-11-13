import { Content as Metadata } from '@/types/content';
import fs from 'fs';
import path from 'path';

export const allItems = getArticles();

export function getArticle(slug: string) {
  return getMDXData(path.join(process.cwd(), 'src', 'content', String(slug)));
}
export function getArticles() {
  return getMDXData(path.join(process.cwd(), 'src', 'content'));
}

function getMDXData(dir: string) {
  const mdxFiles = getMDXFiles(dir);

  return mdxFiles.map((file) => {
    const { metadata, content } = readMDXFile(path.join(dir, file));
    const slug = path.basename(file, path.extname(file));

    const readTime = getReadTime({ content });
    const authors = getAuthors(metadata.authors);

    const fixedMetadata = {
      ...metadata,
      authors,
      slug,
      readTime,
    };

    return {
      metadata: fixedMetadata,
      content,
    };
  });
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');

  return parseFrontmatter(rawContent);
}

function parseFrontmatter(fileContent: string) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return { metadata: {} as Metadata, content: fileContent.trim() };
  }

  const frontMatterBlock = match![1];
  const frontMatterLines = frontMatterBlock.trim().split('\n');
  const content = fileContent.replace(frontmatterRegex, '').trim();

  const metadata: Partial<Metadata> = {};
  let currentKey: keyof Metadata | null = null;

  for (const line of frontMatterLines) {
    const trimmedLine = line.trim();

    if (trimmedLine.includes(':')) {
      const [keyPart, ...valueParts] = trimmedLine.split(':');
      const key = keyPart.trim() as keyof Metadata;
      const value = valueParts
        .join(':')
        .trim()
        .replace(/^['"](.*)['"]$/, '$1'); // Remove quotes

      if (key === 'authors') {
        metadata.authors = [];
        currentKey = 'authors';
      } else {
        metadata[key] = value as string;
        currentKey = null;
      }
    } else if (trimmedLine.startsWith('- ') && currentKey === 'authors') {
      const authorMatch = trimmedLine.match(/- '(.*)'/);

      if (authorMatch && metadata.authors) {
        metadata.authors.push(authorMatch[1]);
      }
    }
  }

  return { metadata: metadata as Metadata, content };
}

export function getAuthors(authors: string[]) {
  if (authors.length === 1) {
    return authors[0];
  }

  return authors.slice(0, -1).join(', ') + ' y ' + authors.slice(-1);
}

export function getReadTime({
  content,
  wordsPerMinute = 200,
}: {
  content: string;
  wordsPerMinute?: number;
}) {
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const minutes = wordCount / wordsPerMinute;
  const readTime = Math.ceil(minutes);

  return readTime;
}

type Content = {
  metadata: {
    authors: string;
    slug: string;
    readTime: number;
    title: string;
    description: string;
    image: string;
    publishedAt: string;
  };
  content: string;
};

type GetLatestContentProps = {
  content?: Content[];
  limit?: number;
};

export function getLatestContent({
  content,
  limit = 3,
}: GetLatestContentProps) {
  let items = content;

  if (!items) {
    items = getArticles();
  }

  const sortedItems = sortByPublishedDate(items);

  return sortedItems.slice(0, limit);
}

function sortByPublishedDate(items: Content[]) {
  return items.sort((a, b) => {
    return (
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime()
    );
  });
}

type GetMostViewedContentProps = {
  content?: Content[];
  slugs?: string[];
  limit?: number;
};

export function getMostViewedContent({
  content,
  slugs,
  limit = 3,
}: GetMostViewedContentProps) {
  let items = content;

  if (!items) {
    items = getArticles();
  }

  let sortedItems: Content[] = [];

  if (slugs && slugs.length > 0) {
    sortedItems = items.filter((item) => slugs.includes(item.metadata.slug));
  } else {
    // Redis Call
    // sortedItems = await getMostViewedItems(); // slugs
    // sortedItems = items.sort((a, b) => b.views - a.views);
    // Slice limit
    // find items with slugs
  }

  return sortedItems.slice(0, limit);
}

export function getArticlesBySlugs(slugs: string[]) {
  const articles: Content[] = [];

  for (const slug of slugs) {
    const newArticle = getArticle(slug);
    articles.push(...newArticle);
  }

  return articles;
}

export function getLatestNews({ slugs, limit = 3 }: GetMostViewedContentProps) {
  const items = slugs ? getArticlesBySlugs(slugs) : getArticles();

  let sortedItems: Content[] = [];

  if (slugs && slugs.length > 0) {
    sortedItems = items.filter((item) => slugs.includes(item.metadata.slug));
  } else {
    // Redis Call
    // sortedItems = await getMostViewedItems(); // slugs
    // sortedItems = items.sort((a, b) => b.views - a.views);
    // Slice limit
    // find items with slugs
  }

  return sortedItems.slice(0, limit);
}
