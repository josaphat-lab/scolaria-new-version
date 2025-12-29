import React, { useState } from 'react';
import { ArrowLeft, FileText, ListChecks } from 'lucide-react';
import { FeuilleNotesUnique } from './FeuilleNotesUnique';
import { FeuilleNotesComplete } from './FeuilleNotesComplete';

type TabType = 'unique' | 'complete';

export const FeuilleNotes: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('unique');

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Feuille de Notes</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('unique')}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-semibold transition-all duration-200 ${
              activeTab === 'unique'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <FileText className="w-5 h-5" />
            Feuille Unique
          </button>
          <button
            onClick={() => setActiveTab('complete')}
            className={`flex-1 flex items-center justify-center gap-3 px-6 py-4 font-semibold transition-all duration-200 ${
              activeTab === 'complete'
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <ListChecks className="w-5 h-5" />
            Feuille Complète
          </button>
        </div>

        <div className="p-6">
          {activeTab === 'unique' ? <FeuilleNotesUnique /> : <FeuilleNotesComplete />}
        </div>
      </div>
    </div>
  );
};
