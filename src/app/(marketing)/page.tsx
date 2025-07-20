import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Download,
  Instagram,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Footer from '@/components/footer';
import { cn } from '@/lib/utils';
import ExperienceCard from '@/components/experience-card';
import ProjectCard from '@/components/project-card';

export default function Home() {
  const projects = [
    {
      title: 'MiMalla',
      description:
        'A modern e-commerce solution built with Next.js and Stripe integration.',
      image: '/placeholder.svg?height=300&width=400',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      github: '#',
      live: 'mimalla.vercel.app',
    },
    {
      title: 'Task Management App',
      description:
        'Collaborative task management tool with real-time updates and team features.',
      image: '/placeholder.svg?height=300&width=400',
      tech: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
      github: '#',
      live: '#',
    },
    {
      title: 'Weather Dashboard',
      description:
        'Beautiful weather application with location-based forecasts and analytics.',
      image: '/placeholder.svg?height=300&width=400',
      tech: ['Vue.js', 'Chart.js', 'OpenWeather API', 'CSS3'],
      github: '#',
      live: '#',
    },
  ];

  const experiences = [
    {
      role: 'Vocero',
      organization: 'Confederación de Estudiantes de Chile',
      location: 'Santiago, Chile',
      period: 'Abr 2025 – Presente',
      description:
        'Muevo la voz de los estudiantes que busca mejorar la vida estudiantil a través de la organización, la tecnología y el acceso a la información.',
    },
    {
      role: 'Presidente',
      organization: 'Federación de Estudiantes UDP',
      location: 'Universidad Diego Portales',
      period: 'Abr 2025 – Presente',
      description:
        'Lidero una federación que busca mejorar la vida estudiantil a través de la organización, la tecnología y el acceso a la información.',
    },
    {
      role: 'Vicepresidente',
      organization: 'Centro de Estudiantes de Ingeniería Civil Industrial',
      location: 'Universidad Diego Portales',
      period: 'Dic 2023 – Nov 2024',
      description:
        'Coordiné iniciativas estudiantiles, gestioné proyectos con impacto en bienestar y representatividad del estudiantado.',
    },
  ];

  return (
    <main className='min-h-screen max-w-3xl mx-auto px-6 lg:px-8 py-16 '>
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
            Estudiante de Ingeniería y amante del diseño, con ganas de aportar
            al bien común desde la tecnología y la organización.
          </p>

          <div className='flex gap-4 flex-row items-center justify-center md:justify-start mt-2 md:mt-0'>
            <a
              href='https://www.instagram.com/bastianbeckeru/'
              target='_blank'
              rel='noopener noreferrer'
              className={cn(
                buttonVariants({ variant: 'ghost', size: 'icon' }),
                '[&_svg]:size-6 [&_svg]:text-rose-500 bg-rose-500/10'
              )}
            >
              <Instagram />
            </a>
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

            <Button className='bg-rose-500'>
              Curriculum
              <Download />
            </Button>
          </div>
        </div>
      </section>

      <div className='h-px w-full bg-foreground/10 my-16 hidden'></div>

      {/* Thoughts Section */}
      <section id='thoughts' className='hidden'>
        <h2 className='text-3xl font-medium'>Pensamientos</h2>
      </section>

      <div className='h-px w-full bg-foreground/10 my-16'></div>

      {/* Experience Section */}
      <section id='experience' className='flex flex-col gap-4'>
        <h2 className='text-3xl font-medium'>Experiencias</h2>
        <ol className='flex flex-col gap-2'>
          {experiences.map((exp, index) => (
            <ExperienceCard key={index} {...exp} />
          ))}
        </ol>
      </section>

      <div className='h-px w-full bg-foreground/10 my-16'></div>

      {/* Projects Section */}
      <section id='projects' className='flex flex-col gap-4'>
        <h2 className='text-3xl font-medium'>Proyectos</h2>
        <div className='grid md:grid-cols-2 md:grid-rows-2 gap-8'>
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
