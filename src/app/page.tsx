'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { saveToken } from '@/lib/auth';
import api from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from "@hookform/error-message"
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.email('E-mail inválido').min(1, 'E-mail é obrigatório'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

type LoginData = z.infer<typeof loginSchema>;

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await api.post('/auth/login', data);
      saveToken(res.data.data.access_token);
      router.push('/dashboard');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Erro ao fazer login');
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-200">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-xl shadow-md w-80">
        <h1 className="text-2xl font-bold mb-4 text-center text-slate-800">PortariaLink</h1>
        <div className='mb-4'>
          <Input
            defaultValue=""
            type="email"
            placeholder="E-mail"
            {...register('email', { required: true })}
          />
          <span className='text-red-600 -mt-6 text-xs pl-2'>{errors?.email?.message}</span>
        </div>

        <div className='mb-4'>
          <Input
            defaultValue=""
            type="password"
            placeholder="Senha"
            {...register('password', { required: true })}
          />
          <span className='text-red-600 -mt-6 text-xs pl-2'>{errors?.password?.message}</span>
        </div>


        <Button
          type="submit"
          className="w-full "
          aria-label="Submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </main>
  );
}

