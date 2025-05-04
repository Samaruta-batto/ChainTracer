import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-6">
        {children}
      </main>
      <Footer />
    </div>
  );
};