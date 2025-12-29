import React from 'react';
import { Construction } from 'lucide-react';

interface PlaceholderProps {
  title: string;
  description?: string;
}

export const Placeholder: React.FC<PlaceholderProps> = ({ title, description }) => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-primary-100 p-6 rounded-full">
              <Construction className="w-16 h-16 text-primary-500" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{title}</h1>
          {description && (
            <p className="text-gray-600 text-lg">{description}</p>
          )}
          <div className="mt-8">
            <p className="text-sm text-gray-500">Cette page sera bientôt disponible</p>
          </div>
        </div>
      </div>
    </div>
  );
};
