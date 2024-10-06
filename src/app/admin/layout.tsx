// app/admin/layout.tsx
export const metadata = {
    title: 'Admin Dashboard',
    description: 'Admin panel layout',
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body>
                <div className="admin-layout">
                    <aside>Admin Sidebar</aside>
                    <main>{children}</main>
                </div>
            </body>
        </html>
    );
}
