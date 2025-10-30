'use client';
import { useAuthGuard, clearToken } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  useAuthGuard();
  const router = useRouter();

  function handleLogout() {
    clearToken();
    router.push('/');
  }

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Sair
      </button>
    </main>
  );
}
