'use client';

import { useState, useEffect } from 'react';
import {
  getDashboardData,
  secretSanta,
  getAllUsers,
} from '@/app/actions/users';
import {
  CircleCheckBig,
  CircleDashed,
  CircleMinus,
  Sparkles,
} from 'lucide-react';
import { Card } from '../ui/card';

type DashboardUser = {
  id: string;
  name: string;
  assignmentId: string | null;
  viewed: boolean;
};

export default function SecretSanta() {
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const data = await getDashboardData();
      setUsers(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const allUsers = await getAllUsers();
      await secretSanta(allUsers);
      await fetchData(); // Refresh data
      setError('✓ Asignaciones generadas con éxito');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  const copyLinks = () => {
    const links = users
      .filter((u) => u.assignmentId)
      .map(
        (u) =>
          `${u.name}: ${window.location.origin}/lab/secret-santa/reveal?key=${u.assignmentId}`
      )
      .join('\n');
    navigator.clipboard.writeText(links);
    alert('Enlaces copiados al portapapeles');
  };

  return (
    <>
      {/* Participants Section */}
      <main className='py-4'>
        <h2 className='text-lg font-bold mb-4 text-foreground flex items-center gap-2'>
          <Sparkles className='w-5 h-5 text-red-700' />
          Participantes
        </h2>
        <div className='grid grid-cols-2 sm:grid-cols-3 gap-2'>
          {users.map((user) => (
            <Card
              key={user.id}
              className='p-2 border-border/50 hover:border-red-700/50 hover:bg-red-700/5 transition-all duration-200'
            >
              <div className='flex items-center gap-2'>
                <div className='size-6 rounded-full bg-gradient-to-br from-red-700 to-green-700 flex items-center justify-center flex-shrink-0'>
                  <span className='text-xs font-bold text-white'>
                    {user.name.charAt(0)}
                  </span>
                </div>
                <span className='text-xs font-medium text-foreground truncate flex-1'>
                  {user.name}
                </span>
                <div className='[&_svg]:size-4'>
                  {user.viewed ? (
                    <CircleCheckBig className='text-green-500' />
                  ) : user.assignmentId ? (
                    <CircleDashed className='text-muted-foreground' />
                  ) : (
                    <CircleMinus className='text-red-500' />
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>

      {/*       <div className="fixed bottom-4 right-4">
        <button
          onClick={() => setIsAdminOpen(!isAdminOpen)}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 transition-colors text-xs"
        >
          ⚙
        </button>
      </div>

      {isAdminOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setIsAdminOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 space-y-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">Admin Zone</h2>
              <button onClick={() => setIsAdminOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full py-3 px-4 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 disabled:opacity-50 transition-all"
              >
                {isLoading ? 'Generando...' : 'Generar Asignaciones'}
              </button>

              <button
                onClick={copyLinks}
                className="w-full py-3 px-4 bg-white border border-slate-200 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all"
              >
                Copiar Enlaces
              </button>
            </div>

            {error && (
              <div className={`p-3 rounded-lg text-sm ${error.startsWith('✓') ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                {error}
              </div>
            )}
          </div>
        </div>
      )} */}
    </>
  );
}
