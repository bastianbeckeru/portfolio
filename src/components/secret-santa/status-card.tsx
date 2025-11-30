export function StatusCard({
    title,
    message,
    icon,
    iconBg,
}: {
    title: string;
    message: string;
    icon: string;
    iconBg: string;
}) {
    return (
        <div className="flex items-center justify-center p-4">
            <div className="bg-background p-8 pb-12 rounded-2xl shadow-lg border max-w-md w-full text-center">
                <div className={`w-16 h-16 ${iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <span className="text-3xl">{icon}</span>
                </div>
                <h1 className={`text-2xl font-bold mb-3 ${title === 'Error' ? 'text-red-600' : ''}`}>
                    {title}
                </h1>
                <p className="text-gray-600">{message}</p>
            </div>
        </div>
    );
}
