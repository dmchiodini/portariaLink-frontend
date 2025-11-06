'use client';

import { usePathname } from 'next/navigation';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

interface Props {
  children: React.ReactNode;
}

export default function LayoutClient({ children }: Props) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/login';

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="bg-background text-foreground h-screen overflow-hidden">
      <div className="grid grid-cols-[260px_1fr] h-full">
        <Sidebar />
        <div className="flex flex-col h-full">
          <Header />
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
