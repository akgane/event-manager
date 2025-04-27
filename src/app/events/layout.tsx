export default function EventsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="bg-white h-screen p-4">
            {children}
        </div>
    );
}
