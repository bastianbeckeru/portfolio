import { getAssignmentByUuid } from '@/app/actions/users';

// Componente para los mensajes de error/estado
function StatusCard({
    title,
    message,
    icon,
    iconBg,
    footer
}: {
    title: string;
    message: string;
    icon: string;
    iconBg: string;
    footer?: string;
}) {
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="bg-background p-8 rounded-2xl shadow-lg border max-w-md w-full text-center">
                <div className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-3xl">{icon}</span>
                </div>
                <h1 className={`text-2xl font-bold mb-2 ${title === 'Error' ? 'text-red-600' : ''}`}>
                    {title}
                </h1>
                <p className="text-gray-600">{message}</p>
                {footer && (
                    <p className="text-xs text-muted-foreground text-left mt-4">
                        {footer}
                    </p>
                )}
            </div>
        </div>
    );
}

// Función auxiliar para formatear fecha
function formatDate(date: Date): string {
    return date.toLocaleString('es-CL', {
        timeZone: 'America/Santiago',
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
}

export default async function RevealPage({
    searchParams,
}: {
    searchParams: Promise<{ key?: string }>;
}) {
    const { key } = await searchParams;

    // Validación temprana
    if (!key) {
        return (
            <StatusCard
                title="Error"
                message="No se proporcionó un ID de asignación válido."
                icon="❌"
                iconBg="bg-red-100"
            />
        );
    }

    try {
        const result = await getAssignmentByUuid(key);

        // Manejo de casos según status
        if (result.status === 'not_found') {
            return (
                <StatusCard
                    title="Error"
                    message="Asignación no encontrada."
                    icon="🔍"
                    iconBg="bg-red-100"
                />
            );
        }

        if (result.status === 'already_viewed') {
            return (
                <StatusCard
                    title="Ya visto"
                    message={`Esta asignación ya fue revelada el ${formatDate(result.viewedAt!)}.`}
                    icon="👀"
                    iconBg="bg-yellow-100"
                    footer="Por seguridad, el amigo secreto solo se muestra una vez."
                />
            );
        }

        // Caso exitoso
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
                        <p className="text-muted-foreground">
                            Tu amigo secreto para este {assignment.year} es...
                        </p>
                    </div>

                    <div className="py-8 bg-green-50 rounded-xl border border-green-100 animate-in fade-in zoom-in duration-700">
                        <p className="text-3xl font-bold text-green-700">
                            {assignment.receiverName}
                        </p>
                    </div>

                    <p className="mt-2 text-xs text-left text-red-400">
                        ⚠️ Esta pantalla solo se mostrará una vez. ¡No lo olvides!
                    </p>
                </div>
            </main>
        );
    } catch (error) {
        console.error('Error al obtener asignación:', error);
        return (
            <StatusCard
                title="Error"
                message="Error del sistema. Por favor, intenta nuevamente."
                icon="⚠️"
                iconBg="bg-red-100"
            />
        );
    }
}