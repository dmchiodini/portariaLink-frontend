import api from '@/lib/api';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { Input } from './ui/input';
import { Button } from './ui/button';

type LoginData = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const { register, handleSubmit, formState } = useForm<LoginData>();
  const router = useRouter();

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await api.post('/auth/login', data);
      const token = res.data.data.accessToken;

      Cookies.set('token', token, {
        expires: 1,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      });

      router.push('/dashboard');
    } catch (err: any) {
      alert(err?.response?.data?.message || 'Erro ao logar');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('email', { required: true })} type="email" placeholder="Email" className='bg-amber-700 text-pink-600' />
      <input {...register('email', { required: true })} type="email" placeholder="Email" className='bg-amber-700 text-pink-600' />

      <Button aria-label="Submit" disabled={formState.isSubmitting} className="bg-red-500">
        {formState.isSubmitting ? 'Entrando...' : 'Entrar'}
      </Button>
    </form>
  );
}
