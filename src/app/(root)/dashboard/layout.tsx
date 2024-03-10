import { Sidebar } from "./_components/sidebar";
import { DashboardFooter } from "./_components/dashboard-footer";

export default function DashboardLayout({ children }: {
    children: React.ReactNode
}) {
    return (
        <>
        <main className="container mx-auto pt-12 px-8 h-full">
            <div className="flex gap-8">
                <Sidebar />
                <div className="w-full min-h-screen mr-0 sm:mr-56">
                    {children}
                </div>
            </div>
        </main >
        <DashboardFooter />
        </>
    )
}