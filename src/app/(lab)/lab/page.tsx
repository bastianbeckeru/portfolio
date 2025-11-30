import Link from 'next/link';
import { RevealSuccess } from '@/components/secret-santa/reveal-success';

export default async function LabPage() {
  return (
    <div className='flex flex-col h-dvh p-2'>
      <Link
        href='/lab/instagram-tool'
        className='text-2xl font-semibold'
      >
        Comparador de Seguidores
      </Link>
      <Link
        href='/lab/secret-santa'
        className='text-2xl font-semibold'
      >
        Secret Santa
      </Link>
    </div>
  );
}
