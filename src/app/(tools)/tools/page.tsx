import InstagramTool from '@/components/instagram-tool';

export default async function Tools() {
  return (
    <div className='flex flex-col h-dvh bg-stone-950 p-2'>
      <h1 className='text-white text-2xl font-semibold'>
        Comparador de Seguidores
      </h1>
      <InstagramTool />
    </div>
  );
}
