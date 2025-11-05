'use client';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export function saveToken(token: string) {
  Cookies.set('token', token, { expires: 7, secure: true });
}

export function getToken() {
  return Cookies.get('token');
}

export function clearToken() {
  Cookies.remove('token');
}

export function useAuthGuard() {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    const token = getToken();
    if (!token) router.push('/');
  }
}
