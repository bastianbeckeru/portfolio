'use client';

import { useState, useEffect } from 'react';
import {
  getDashboardData,
  secretSanta,
  getAllUsers,
} from '@/app/actions/users';

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
      .filter(u => u.assignmentId)
      .map(u => `${u.name}: ${window.location.origin}/lab/secret-santa/reveal?key=${u.assignmentId}`)
      .join('\n');
    navigator.clipboard.writeText(links);
    alert('Enlaces copiados al portapapeles');
  };

  const year = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-slate-800 font-sans selection:bg-red-100">
      {/* Hero Section */}
      <div className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-slate-900 mb-4">
            Navidad <span className="font-serif text-red-600">{year}</span>
          </h1>
          <p className="text-lg text-slate-500 font-light">
            La magia de regalar, simplificada.
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-red-100 opacity-25 text-9xl select-none">❄</div>
        <div className="absolute bottom-10 right-10 text-green-100 opacity-25 text-9xl select-none">❄</div>
      </div>

      {/* Participants List */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="grid gap-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="group flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center gap-4">
                <div className={`w-2 h-2 rounded-full ${user.viewed ? 'bg-green-500' : user.assignmentId ? 'bg-amber-400' : 'bg-slate-200'}`} />
                <span className="text-lg font-medium text-slate-700 group-hover:text-slate-900 transition-colors">
                  {user.name}
                </span>
              </div>

              <div className="text-sm">
                {user.viewed ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Visto
                  </span>
                ) : user.assignmentId ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                    Pendiente
                  </span>
                ) : (
                  <span className="text-slate-400 italic text-xs">Sin asignar</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>


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
    </main>
  );
}
