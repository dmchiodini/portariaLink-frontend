'use client';

import { ReactNode } from 'react';
import { AuthGuard } from './AuthGuard';

interface Props {
  children: ReactNode;
}

export default function AuthGateWrapperClient({ children }: Props) {
  return (
    <AuthGuard
      publicRoutes={['/login', '/register', '/forgot-password']}
      fallback={<div className="min-h-screen flex items-center justify-center">Carregando...</div>}
    >
      {children}
    </AuthGuard>
  );
}
