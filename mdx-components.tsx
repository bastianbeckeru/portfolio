import { cn } from '@/lib/utils';
import { slugify } from '@/utils/strings';
import type { MDXComponents } from 'mdx/types';
import { type HTMLAttributes } from 'react';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ...customComponents,
  };
}

const customComponents = {
  h1: ({
    children,
    className,
    ...props
  }: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 id={slugify(String(children))} className={className} {...props}>
      {children}
    </h1>
  ),
  h2: ({
    children,
    className,
    ...props
  }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 id={slugify(String(children))} className={className} {...props}>
      {children}
    </h2>
  ),
  h3: ({
    children,
    className,
    ...props
  }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 id={slugify(String(children))} className={className} {...props}>
      {children}
    </h3>
  ),
  h4: ({
    children,
    className,
    ...props
  }: HTMLAttributes<HTMLHeadingElement>) => (
    <h4 id={slugify(String(children))} className={className} {...props}>
      {children}
    </h4>
  ),
  h5: ({
    children,
    className,
    ...props
  }: HTMLAttributes<HTMLHeadingElement>) => (
    <h5 id={slugify(String(children))} className={className} {...props}>
      {children}
    </h5>
  ),
  h6: ({
    children,
    className,
    ...props
  }: HTMLAttributes<HTMLHeadingElement>) => (
    <h6 id={slugify(String(children))} className={className} {...props}>
      {children}
    </h6>
  ),
  table: ({
    children,
    className,
    ...props
  }: HTMLAttributes<HTMLTableElement>) => (
    <div className='overflow-x-auto'>
      <table className={cn('w-auto', className)} {...props}>
        {children}
      </table>
    </div>
  ),
};
