export type Content = {
  title: string;
  description: string;
  image: string;
  publishedAt: string;
  authors: string[];
  category: string;
  //  categories?: string[];
};

export type ContentMetadata = Content & {
  slug: string;
  readTime: number;
};
