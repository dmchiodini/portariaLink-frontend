'use client';

import React, { ReactNode, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthContext } from '@/context/authContext';
import { getSession } from '@/lib/auth';

interface AuthGuardProps {
  children: ReactNode;
  publicRoutes?: string[];
  fallback?: ReactNode;
}

export function AuthGuard({
  children,
  publicRoutes = ['/login', '/register'],
  fallback = null,
}: AuthGuardProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { loading } = useAuthContext();

  const isPublic = useMemo(() => publicRoutes.includes(pathname), [pathname, publicRoutes]);

  const session = getSession();
  const { token } = session;

  useEffect(() => {
    if (loading) return;

    if (token && isPublic) {
      router.replace('/');
      return;
    }

    if (!token && !isPublic) {
      router.replace('/login');
      return;
    }
  }, [loading, isPublic, router, token]);

  if (loading) return fallback || <div>Carregando...</div>;

  if (token && !isPublic) return <>{children}</>;

  if (token && isPublic) return null;

  if (!token && isPublic) return <>{children}</>;

  return null;
}
