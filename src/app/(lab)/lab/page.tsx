import Link from 'next/link';

export default async function LabPage() {
  return (
    <div className='flex flex-col h-dvh bg-stone-950 p-2'>
      <Link
        href='/lab/instagram-tool'
        className='text-white text-2xl font-semibold'
      >
        Comparador de Seguidores
      </Link>
      <Link
        href='/lab/secret-santa'
        className='text-white text-2xl font-semibold'
      >
        Secret Santa
      </Link>
    </div>
  );
}
