'use client';

import { useFormContext } from 'react-hook-form';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { LockKeyhole, Mail } from 'lucide-react';
import Link from 'next/link';
import { LoginData } from '@/app/login/page';

interface LoginFormProps {
  isSubmitting: boolean;
  onSubmit: (data: LoginData) => void | Promise<void>;
}

export function LoginForm({ isSubmitting, onSubmit }: LoginFormProps) {
  const { handleSubmit } = useFormContext<LoginData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4 w-full">
        <Input type="email" placeholder="E-mail" name="email" icon={Mail} />
      </div>

      <div className="mb-2 w-full">
        <Input type="password" placeholder="Senha" name="password" icon={LockKeyhole} />
      </div>

      <div className="mb-6 pl-1">
        <Link href="#" className="text-xs text-foreground">
          Esqueceu a senha?
        </Link>
      </div>

      <div className='w-full'>
        <Button type="submit" aria-label="Submit" disabled={isSubmitting} className='w-full'>
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </div>
    </form>
  );
}
