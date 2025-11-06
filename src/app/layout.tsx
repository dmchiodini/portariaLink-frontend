import { ThemeProvider } from '@/components/themeProvider';
import './globals.css';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { AuthProvider } from '@/context/authContext';
import AuthGateWrapperClient from '@/guard/AuthGuardWrapperClient';
import LayoutClient from '@/components/LayoutClient';

const roboto = Roboto({
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
  variable: '--font-roboto',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portaria Link',
  description: 'Faça a gestão de encomendas do seu condominio',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${roboto.variable}`} suppressHydrationWarning>
      <body className="antialiased h-full">
        <AuthProvider>
          <ThemeProvider>
            <AuthGateWrapperClient>
              <LayoutClient>{children}</LayoutClient>
            </AuthGateWrapperClient>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html >
  );
}
