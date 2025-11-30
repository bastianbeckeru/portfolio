export default function SecretSantaLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const year = new Date().getFullYear();

    return (
        <>
            <div className="fixed inset-0 pointer-events-none ">
                <div className="absolute top-0 left-0 opacity-10 w-96 h-96 bg-red-700 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 opacity-10 w-96 h-96 bg-green-700 rounded-full blur-3xl"></div>
            </div>

            <header className="border-b border-border relative z-10 mb-4">
                <div className="mx-auto max-w-2xl px-4 py-8 sm:p-6">
                    <div className="flex items-center justify-center gap-2 mb-3 text-4xl">
                        🎁
                        <h1 className="uppercase sm:text-5xl font-bold tracking-wide text-center bg-gradient-to-r from-red-700 to-green-700 bg-clip-text text-transparent">
                            Navidad
                        </h1>
                        🎁
                    </div>
                    <p className="text-center text-red-700 text-7xl font-extrabold tracking-wider">{year}</p>
                </div>
            </header>

            {children}
        </>
    );
}
