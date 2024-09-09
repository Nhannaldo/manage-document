export default function PopperWrapper({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-full rounded bg-white shadow-md border border-gray-300 min-h-[100px] py-2">
            {children}
        </div>
    );
}
