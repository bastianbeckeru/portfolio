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
  {
    title: 'MiMalla',
    description: 'Gestiona tu avance curricular.',
    url: 'https://mimalla.vercel.app',
    image: '/placeholder.svg',
    tech: ['NextJS', 'TypeScript', 'TailwindCSS'],
    github: null,
    category: 'APP',
  },
  {
    title: 'Calendar of Your Life',
    description: 'Visualiza tu vida en semanas.',
    url: '/lab/life-calendar',
    image: '/placeholder.svg',
    tech: ['React', 'TypeScript'],
    github: 'https://github.com/bastianbeckeru/portfolio',
    category: 'LAB',
  },
  {
    title: 'Instagram Follower Analyzer',
    description: 'Analiza seguidores y seguidos.',
    image: '/placeholder.svg',
    tech: ['React', 'TypeScript'],
    github: 'https://github.com/bastianbeckeru/portfolio',
    url: '/lab/instagram',
    category: 'LAB',
  },
  {
    title: 'Secret Santa',
    description: 'Amigo secreto con restricciones.',
    image: '/placeholder.svg',
    tech: ['NextJS', 'SQLite'],
    github: 'https://github.com/bastianbeckeru/portfolio',
    url: '/lab/secret-santa',
    category: 'LAB',
  },
];

export const experiences = [
  {
    role: 'Vocero',
    organization: 'Confederación de Estudiantes de Chile',
    location: 'Región Metropolitana, Chile',
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

export const quotes = [
  {
    text: 'Simplicity is the ultimate sophistication.',
    author: 'Steve Jobs',
  },
  {
    text: 'Stay hungry. Stay foolish.',
    author: 'Steve Jobs',
  },
  {
    text: 'Focusing is about saying no.',
    author: 'Steve Jobs',
  },
];
