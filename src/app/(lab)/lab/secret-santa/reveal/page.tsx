import { getAssignmentByUuid } from '@/app/actions/users';
import { StatusCard } from '@/components/secret-santa/status-card';
import { RevealSuccess } from '@/components/secret-santa/reveal-success';
import { formatDateWithTime } from '@/utils/dateHelper';
import { Suspense } from 'react';

async function RevealContent({ keyId }: { keyId?: string }) {
    // Validación temprana
    if (!keyId) {
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
        const result = await getAssignmentByUuid(keyId);

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
                    message={`Esta asignación ya fue revelada el ${formatDateWithTime(result.viewedAt!)}.`}
                    icon="👀"
                    iconBg="bg-yellow-100"
                />
            );
        }

        // Caso exitoso
        return <RevealSuccess assignment={result.assignment} />;

    } catch (error) {
        console.error('Error al obtener asignación:', error);
        return (
            <StatusCard
                title="Error"
                message="Error del sistema. Por favor, contacta al desarrollador."
                icon="⚠️"
                iconBg="bg-red-100"
            />
        );
    }
}

export default async function RevealPage({
    searchParams,
}: {
    searchParams: Promise<{ key?: string }>;
}) {
    const { key } = await searchParams;

    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="text-center">
                    <div className="animate-spin text-4xl mb-4">🎁</div>
                    <p className="text-muted-foreground">Cargando...</p>
                </div>
            </div>
        }>
            <RevealContent keyId={key} />
        </Suspense>
    );
}