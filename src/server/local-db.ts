type FamilyGroup = {
  id: string;
  name: string;
};

export type Person = {
  id: string;
  name: string;
  birthDate: string;
  phone: {
    countryCode: number;
    number: number;
  };
  email?: string;
  familyGroupId?: string;
  childrenIds?: string[];
};

export const participants: Person[] = [
  {
    id: 'y4e3YaUxFJutAclfRW_zi',
    name: 'Bastián',
    birthDate: '2001-09-09',
    phone: {
      countryCode: 56,
      number: 962876438,
    },
    email: 'bastian.becker.u@gmail.com',
  },
  {
    id: 'SrZjSZqrRX0hyZYRjBUW7',
    name: 'Camila',
    birthDate: '2002-01-26',
    phone: {
      countryCode: 56,
      number: 957941819,
    },
  },
  {
    id: '_lGOYKjFl9pe_TiybPjl6',
    name: 'Daniel',
    birthDate: '1980-01-01',
    phone: {
      countryCode: 56,
      number: 991971200,
    },
    childrenIds: ['VceTka4cmbc_2ayX_RGdl', 'shhnZJYLCGNpf9rVDHWem'],
  },
  {
    id: '0ocq0ZF1fvUTxms4uk6fN',
    name: 'Isabel',
    birthDate: '1980-01-01',
    phone: {
      countryCode: 56,
      number: 968446287,
    },
    childrenIds: ['VceTka4cmbc_2ayX_RGdl', 'shhnZJYLCGNpf9rVDHWem'],
  },
  {
    id: 'VceTka4cmbc_2ayX_RGdl',
    name: 'Amelia',
    birthDate: '2012-01-01',
    phone: {
      countryCode: 56,
      number: 930983776,
    },
  },
  {
    id: 'shhnZJYLCGNpf9rVDHWem',
    name: 'Cristobal',
    birthDate: '2014-01-01',
    phone: {
      countryCode: 56,
      number: 931025782,
    },
  },
  {
    id: 'vQDVuKYL9tMRXnbbUuEFH',
    name: 'Guillermina',
    birthDate: '1950-01-01',
    phone: {
      countryCode: 56,
      number: 968376995,
    },
    childrenIds: ['_lGOYKjFl9pe_TiybPjl6', '7xLCclXWyKDjWSkHflX5U'],
  },
  {
    id: 'scnHubjstp3CYjo7ktXXy',
    name: 'Nelson',
    birthDate: '1950-01-01',
    phone: {
      countryCode: 56,
      number: 993304160,
    },
  },
  {
    id: 'uzAcO-VSqxmas0BqYM2oK',
    name: 'Guillermo',
    birthDate: '1974-12-29',
    phone: {
      countryCode: 56,
      number: 971613234,
    },
    childrenIds: ['npJtuix_gRg6rjObRigOc'],
  },
  {
    id: '7xLCclXWyKDjWSkHflX5U',
    name: 'Marisel',
    birthDate: '1980-01-01',
    phone: {
      countryCode: 56,
      number: 971616231,
    },
    childrenIds: ['npJtuix_gRg6rjObRigOc'],
  },
  {
    id: 'npJtuix_gRg6rjObRigOc',
    name: 'Guillermo Jr.',
    birthDate: '1995-10-10',
    phone: {
      countryCode: 56,
      number: 994419458,
    },
  },
];

export const projects = [
  /*   {
    title: 'FEDEP',
    description:
      'Sitio web oficial de la Federación de Estudiantes de la Universidad Diego Portales.',
    image: '/placeholder.svg',
    tech: ['NextJS', 'TypeScript', 'TailwindCSS'],
    github: '#',
    live: 'fedep.cl',
    category: 'SITE',
  }, */
  {
    title: 'MiMalla',
    description:
      'Plataforma de gestión de mallas curriculares para estudiantes universitarios.',
    image: '/placeholder.svg',
    tech: ['NextJS', 'TypeScript', 'TailwindCSS'],
    github: '#',
    live: 'mimalla.vercel.app',
    category: 'APP',
  },
  {
    title: 'Calendar of Your Life',
    description:
      'Una visualización inspirada en Kurzgesagt que muestra las semanas y meses de tu vida.',
    image: '/placeholder.svg',
    tech: ['React', 'TypeScript'],
    github: '#',
    live: '/lab/life-calendar',
    category: 'LAB',
  },
  {
    title: 'Instagram Followers Tool',
    description:
      'Herramienta para gestionar y analizar seguidores de Instagram.',
    image: '/placeholder.svg',
    tech: ['React', 'TypeScript'],
    github: '#',
    live: '/lab/instagram',
    category: 'LAB',
  },
  {
    title: 'Secret Santa',
    description:
      'App sencilla para organizar sorteos secretos.',
    image: '/placeholder.svg',
    tech: ['React', 'TypeScript'],
    github: '#',
    live: '/lab/secret-santa',
    category: 'LAB',
  },
];

export const experiences = [
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

export const articles = [
  {
    title: '¿Quién fue y es Diego Portales?',
    description:
      'Diego Portales fue un destacado político y empresario chileno, considerado uno de los padres de la patria en Chile. Su legado perdura en la historia del país.',
    image: '/images/diego-portales.webp',
    publishedAt: '2025-07-21',
    readTime: 5,
    category: 'Historia',
  },
  {
    title: 'Participación y Representación Estudiantil',
    description:
      'Explora la importancia de la participación estudiantil en la vida académica y social, y cómo influye en la toma de decisiones dentro de las instituciones educativas.',
    image: '/placeholder.svg',
    publishedAt: '2025-07-21',
    readTime: 2,
    category: 'Política',
  },
  /*   {
    title: 'El Síndrome de la Vicepresidencia',
    description:
      'Un análisis sobre los desafíos y oportunidades que enfrentan los vicepresidentes en las organizaciones estudiantiles.',
    image: '/placeholder.svg?height=300&width=400',
    publishedAt: '2025-07-21',
    readTime: 2,
    category: 'Política',
  }, */
];
