import { User } from '@/@types/auth';
import api from '@/lib/api';
import { useEffect, useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const res = await api.get<{ data: User }>('/users/me');
        setUser(res.data.data);
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return { user, setUser, loading };
}
