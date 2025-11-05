import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

export const metadata = {
  title: "Dashboard",
  description: "Sistema administrativo",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="pt-BR" className="h-full">
      <div className="h-full bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <div className="grid grid-cols-[260px_1fr] h-screen">
          <Sidebar />
          <div className="flex flex-col">
            <Header />
            <main className="flex-1 overflow-y-auto p-6">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
