import InstagramTool from '@/components/instagram-tool';

export default async function InstagramTools() {
  return (
    <div className='flex flex-col size-full py-4 px-12'>
      <h1 className='text-2xl font-semibold'>Comparador de Seguidores</h1>
      <span className='italic text-muted-foreground text-sm'>
        (Cuando tenga tiempo arreglo la UI y mejoro la UX)
      </span>
      <InstagramTool />
    </div>
  );
}
