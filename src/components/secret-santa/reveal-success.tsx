export function RevealSuccess({
    assignment,
}: {
    assignment: {
        giverName: string;
        year: number;
        receiverName: string;
    };
}) {
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

                <p className="mt-2 text-xs text-left text-red-500">
                    ⚠️ Esta pantalla solo se mostrará una vez. ¡No lo olvides!
                </p>
            </div>
        </main>
    );
}
