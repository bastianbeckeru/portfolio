import BackButton from '@/components/back-button';

export default function LabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='relative flex min-h-dvh min-w-full flex-col items-center bg-background py-4'>
      <BackButton />

      {children}
    </div>
  );
}
