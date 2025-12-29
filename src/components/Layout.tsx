import React from 'react';
import { Navigation } from './Navigation';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate: (path: string) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, onNavigate }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation onNavigate={onNavigate} />
      <main>{children}</main>
    </div>
  );
};
