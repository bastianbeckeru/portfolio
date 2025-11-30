import { getAssignmentByUuid } from '@/app/actions/users';

export default async function RevealPage({
    searchParams,
}: {
    searchParams: Promise<{ key?: string }>;
}) {
    const { key } = await searchParams;

    if (!key) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-background p-8 rounded-2xl shadow-lg border max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
                    <p className="text-gray-600">No se proporcionó un ID de asignación válido.</p>
                </div>
            </div>
        );
    }

    try {
        const result = await getAssignmentByUuid(key);

        if (result.status === 'not_found') {
            return (
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="bg-background p-8 rounded-2xl shadow-lg border max-w-md w-full text-center">
                        <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
                        <p className="text-gray-600">Asignación no encontrada.</p>
                    </div>
                </div>
            );
        }

        if (result.status === 'already_viewed') {
            return (
                <div className="min-h-screen flex items-center justify-center p-4">
                    <div className="bg-background p-8 rounded-2xl shadow-lg border max-w-md w-full text-center">
                        <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">👀</span>
                        </div>
                        <h1 className="text-2xl font-bold mb-2">Ya visto</h1>
                        <p className="">
                            Esta asignación ya fue revelada el {result.viewedAt?.toLocaleString('es-CL', {
                                timeZone: 'America/Santiago',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: false
                            })}.
                        </p>
                        <p className="text-xs text-muted-foreground text-left mt-4">
                            Por seguridad, el amigo secreto solo se muestra una vez.
                        </p>
                    </div>
                </div>
            );
        }

        const { assignment } = result;

        return (
            <main className="min-h-screen flex items-center justify-center p-4">
                <div className="p-8 rounded-2xl shadow-lg border bg-background max-w-md w-full text-center">
                    <div className="mb-6">
                        <div className="size-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">🎁</span>
                        </div>
                        <h1 className="text-2xl font-bold mb-2">
                            Hola, {assignment.giverName}!
                        </h1>
                        <p className="text-muted-foreground">Tu amigo secreto para este {assignment.year} es...</p>
                    </div>

                    <div className="py-8 bg-green-50 rounded-xl border border-green-100 animate-in fade-in zoom-in duration-700">
                        <p className="text-3xl font-bold text-green-700">{assignment.receiverName}</p>
                    </div>

                    <p className="mt-2 text-xs text-left text-red-400">
                        ⚠️ Esta pantalla solo se mostrará una vez. ¡No lo olvides!
                    </p>
                </div>
            </main>
        );
    } catch (error) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="bg-background p-8 rounded-2xl shadow-lg border max-w-md w-full text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">Error</h1>
                    <p className="text-gray-600">Error del sistema.</p>
                </div>
            </div>
        );
    }
}
