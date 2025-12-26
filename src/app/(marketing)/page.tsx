import Link from 'next/link';
import { projects } from '@/server/local-db';
import { allItems as articles } from '@/utils/content';
import { slugify } from '@/utils/strings';
import { ArrowUpRightIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function Home() {
  return (
    <main className='grid grid-cols-1 gap-20 max-w-2xl mx-auto px-8 md:px-4 py-12 md:py-24'>
      {/* Hero Section */}
      <section className='gap-6 flex flex-col h-auto md:flex-row items-start'>
        <div className='size-24 shrink-0'>
          <Avatar className='size-full border'>
            <AvatarImage src='profile.webp' alt='@bastianbeckeru' />
            <AvatarFallback>Bastián Becker</AvatarFallback>
          </Avatar>
        </div>

        <div className='flex-1 gap-2 flex flex-col'>
          <h1 className='text-2xl leading-tight font-bold'>
            Bastián Becker Urzúa
          </h1>
          <p className='flex-1 md:text-balance'>
            <span className='italic font-serif leading-0'>
              Ingeniero Civil Industrial.
            </span>{' '}
            Diseño sistemas simples y rigurosos para transformar problemas
            complejos en impacto real.
          </p>

          {/* <div className='flex gap-4 flex-row items-center justify-start mt-2 md:mt-0'>
            <a
              href='https://www.linkedin.com/in/bastianbeckeru/'
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                '[&_svg]:size-6 [&_svg]:text-rose-500 bg-rose-500/10'
              )}
            >
              <Linkedin />
            </a>
            <a
              href='https://github.com/bastianbeckeru'
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                '[&_svg]:size-6 [&_svg]:text-rose-500 bg-rose-500/10'
              )}
            >
              <Github />
            </a>

            <DownloadButton
              media={{
                name: 'Curriculum',
                url: '/files/cv-bastian_becker.pdf',
              }}
            />
          </div> */}
        </div>
      </section>

      <section id='writings'>
        <h2 className='mb-4  font-bold text-xs tracking-wider  text-muted-foreground uppercase'>
          Escritos
        </h2>
        <div className='flex flex-col gap-2'>
          {articles
            .sort(
              (a, b) =>
                new Date(b.metadata.publishedAt).getTime() -
                new Date(a.metadata.publishedAt).getTime()
            )
            .map((article) => {
              const slug = slugify(article.metadata.title);

              return (
                <Link
                  key={slug}
                  href={`/writing/${slug}`}
                  className='group w-fit  gap-2 flex flex-row items-start'
                >
                  <span className='text-ring select-none'>➢</span>

                  <div className='space-x-2 '>
                    <span
                      className='font-medium underline decoration-stone-300 decoration-1 underline-offset-2
           group-hover:decoration-foreground transition-colors text-left '
                    >
                      {article.metadata.title}
                    </span>

                    <time className='text-sm text-muted-foreground whitespace-nowrap'>
                      {article.metadata.readTime} min
                    </time>
                  </div>
                </Link>
              );
            })}
        </div>
      </section>

      <section id='projects'>
        <h2 className='mb-4  font-bold text-xs tracking-wider text-muted-foreground uppercase'>
          Proyectos
        </h2>
        <div className='grid md:grid-cols-2 gap-8'>
          {projects.map((project, index) => (
            <div key={slugify(project.title)}>
              <a
                href={project.url}
                target='_blank'
                rel='noopener noreferrer'
                className='font-medium underline group inline-flex items-center'
              >
                {project.title}
                <ArrowUpRightIcon className='ml-0.5 size-4 text-ring transition-opacity opacity-0 group-hover:opacity-100' />
              </a>

              <p className='text-muted-foreground text-balance text-left'>
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/*       <section id='experience'>
        <h2 className='mb-6 font-bold text-sm tracking-wider text-muted-foreground uppercase'>
          Experiencias
        </h2>
        <ol className='flex flex-col gap-2'>
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </ol>
      </section> */}

      <section id='now'>
        <h2 className='mb-4  font-bold text-xs tracking-wider text-muted-foreground uppercase'>
          Ahora
        </h2>
        <div className='space-y-6 text-left leading-'>
          <p>
            Construyo con propósito bajo un estándar de calidad riguroso.
            Entiendo el buen diseño{' '}
            <span className='italic font-serif leading-0'>
              —claridad, estructura y cuidado—
            </span>{' '}
            como una herramienta para elevar la experiencia colectiva y como un
            acto de responsabilidad hacia quienes nos anteceden y quienes
            vendrán.
          </p>
          <p>
            Persigo soluciones directas donde la estética y la función sean
            indistinguibles. Ya sea en una interfaz o en un marco político,
            busco la armonía entre el rendimiento y el sentido humano. Para mí,
            el liderazgo es un ejercicio de empatía: el motor real de cualquier
            cambio sostenible.
          </p>
          <p>
            Me mueve la curiosidad técnica y científica, convencido de que la{' '}
            <span className='italic font-serif leading-0'>
              democratización del conocimiento
            </span>{' '}
            es el pilar de una civilización más avanzada.
          </p>
        </div>
      </section>

      <section id='connect'>
        <h2 className='mb-4 font-bold text-xs tracking-wider text-muted-foreground uppercase'>
          Conectemos
        </h2>
        <p className='text-left [&_a]:underline'>
          Encuentrame en{' '}
          <a href='https://www.linkedin.com/in/bastianbeckeru/'>
            @bastianbeckeru
          </a>{' '}
          o <a href='mailto:mail@bastianbecker.cl'>mail@bastianbecker.cl</a>.
        </p>
      </section>
    </main>
  );
}
