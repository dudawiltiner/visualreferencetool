import type React from 'react';

import { Sidebar } from '@molecules/Navigation/Sidebar/Sidebar';
import { DataProviderWrapper } from '@providers/DataProvider/DataProviderWrapper';
import { ReactQueryProvider } from '@providers/ReactQueryProvider/ReactQueryProvider';
import '@styles/globals.css';
import { Toaster } from '@ui/toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Visual Reference Tool',
  description: 'Organize your visual references for branding projects',
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReactQueryProvider>
          <DataProviderWrapper>
            <div className="flex h-screen">
              <Sidebar />
              <main className="flex-1 overflow-y-auto p-6 h-screen">
                {children}
              </main>
            </div>
            <Toaster />
          </DataProviderWrapper>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
