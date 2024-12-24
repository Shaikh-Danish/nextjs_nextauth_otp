import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import { AuthProvider } from '@/context/auth-provider';

import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AutoWhat',
  description: 'AutoWhat Fleet Management System',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex h-full w-full flex-col">
            <div className="flex-1">{children}</div>
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
