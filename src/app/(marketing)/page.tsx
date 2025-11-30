import { Github, Linkedin } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import ExperienceCard from '@/components/experience-card';
import ProjectCard from '@/components/project-card';
import { experiences, projects } from '@/server/local-db';
import ArticleCard from '@/components/article-card';
import DownloadButton from '@/components/download-button';
import { allItems as articles } from '@/utils/content';

export default function Home() {
  return (
    <main className='min-h-screen max-w-3xl mx-auto px-6 lg:px-8 py-16'>
      {/* Hero Section */}
      <section className='gap-6 md:gap-8 flex flex-col h-auto md:h-40 md:flex-row items-center justify-center'>
        <div className='size-40 shrink-0'>
          <Avatar className='size-full'>
            <AvatarImage src='profile.png' alt='@bastianbeckeru' />
            <AvatarFallback>Bastián Becker</AvatarFallback>
          </Avatar>
        </div>

        <div className='flex-1 gap-2 flex flex-col h-full'>
          <h1 className='text-2xl lg:text-4xl leading-tight font-bold'>
            Bastián Becker Urzúa
          </h1>
          <p className='text-lg leading-relaxed flex-1 md:text-balance'>
            Estudiante de Ingeniería creando productos digitales que combinan
            buen diseño con código de calidad.
          </p>

          <div className='flex gap-4 flex-row items-center justify-center md:justify-start mt-2 md:mt-0'>
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
          </div>
        </div>
      </section>

      <div className='h-px w-full bg-foreground/5 my-16'></div>

      {/* Thoughts Section 💭✍️ */}
      <section id='thoughts' className='flex flex-col gap-4'>
        <h2 className='text-3xl font-medium'>Pensamientos</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
          {articles.map((article, index) => (
            <ArticleCard key={index} {...article.metadata} />
          ))}
        </div>
      </section>

      <div className='h-px w-full bg-foreground/5 my-16'></div>

      {/* Experience Section 💼 */}
      <section id='experience' className='flex flex-col gap-4'>
        <h2 className='text-3xl font-medium'>Experiencias</h2>
        <ol className='flex flex-col gap-2'>
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </ol>
      </section>

      <div className='h-px w-full bg-foreground/5 my-16'></div>

      {/* Projects Section 🧪 */}
      <section id='projects' className='flex flex-col gap-4'>
        <h2 className='text-3xl font-medium'>Proyectos y Herramientas</h2>
        <div className='grid md:grid-cols-2 gap-8'>
          {projects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </div>
      </section>
    </main>
  );
}

/* 
              <p className='text-gray-600 mb-6 leading-relaxed'>
                I believe that technology should serve a purpose beyond just
                functionality. It should enhance our lives, foster connections,
                and empower individuals to achieve their goals. In my work, I
                strive to create solutions that are not only effective but also
                meaningful.
              </p>
              <p className='text-gray-600 leading-relaxed'>
                Continuous learning is essential in this fast-paced industry. I
                make it a priority to stay updated with the latest trends and
                best practices, whether through online courses, workshops, or
                collaboration with peers.
              </p>
*/
