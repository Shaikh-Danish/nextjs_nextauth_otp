import React from 'react';

import Sidebar from '@/components/sidebar/Sidebar';
import Header from '@/components/header/Header';

import { ReduxProvider } from '@/redux/Provider';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <div className="flex w-full">
        <Sidebar />
        <div className="w-full">
          <Header />
          <main>{children}</main>
        </div>
      </div>
    </ReduxProvider>
  );
}
