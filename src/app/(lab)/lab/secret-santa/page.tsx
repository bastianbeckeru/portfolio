import SecretSanta from '@/components/secret-santa';
import { Suspense } from 'react';

export default function SecretSantaPage() {
  return (
    <Suspense fallback={<div className="text-center p-8">Cargando...</div>}>
      <SecretSanta />
    </Suspense>
  )
}
