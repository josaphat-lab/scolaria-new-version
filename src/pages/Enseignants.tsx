import React, { useState } from 'react';
import { ArrowLeft, Users, Calendar, Key, Award, Sparkles } from 'lucide-react';
import { GererEnseignants } from '../components/GererEnseignants';
import { AffecterClasses } from '../components/AffecterClasses';
import { AccesConnexion } from '../components/AccesConnexion';
import { ProfesseurPrincipal } from '../components/ProfesseurPrincipal';

type TabType = 'gerer' | 'affecter' | 'acces' | 'principal' | 'animateur';

export const Enseignants: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('gerer');

  const tabs = [
    {
      id: 'gerer' as TabType,
      label: 'Gérer les enseignants',
      icon: <Users className="w-5 h-5" />,
      gradient: 'from-blue-500 to-indigo-600',
      hoverGradient: 'hover:from-blue-600 hover:to-indigo-700',
      bgGradient: 'from-blue-50 to-indigo-50',
      shadow: 'shadow-blue-500/50',
    },
    {
      id: 'affecter' as TabType,
      label: 'Affecter les classes',
      icon: <Calendar className="w-5 h-5" />,
      gradient: 'from-green-500 to-emerald-600',
      hoverGradient: 'hover:from-green-600 hover:to-emerald-700',
      bgGradient: 'from-green-50 to-emerald-50',
      shadow: 'shadow-green-500/50',
    },
    {
      id: 'acces' as TabType,
      label: 'Accès de connexion',
      icon: <Key className="w-5 h-5" />,
      gradient: 'from-amber-500 to-orange-600',
      hoverGradient: 'hover:from-amber-600 hover:to-orange-700',
      bgGradient: 'from-amber-50 to-orange-50',
      shadow: 'shadow-amber-500/50',
    },
    {
      id: 'principal' as TabType,
      label: 'Professeur Principal',
      icon: <Award className="w-5 h-5" />,
      gradient: 'from-rose-500 to-pink-600',
      hoverGradient: 'hover:from-rose-600 hover:to-pink-700',
      bgGradient: 'from-rose-50 to-pink-50',
      shadow: 'shadow-rose-500/50',
    },
    {
      id: 'animateur' as TabType,
      label: "Animateur d'établissement",
      icon: <Sparkles className="w-5 h-5" />,
      gradient: 'from-purple-500 to-violet-600',
      hoverGradient: 'hover:from-purple-600 hover:to-violet-700',
      bgGradient: 'from-purple-50 to-violet-50',
      shadow: 'shadow-purple-500/50',
    },
  ];

  const activeTabData = tabs.find(tab => tab.id === activeTab);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'gerer':
        return <GererEnseignants />;
      case 'affecter':
        return <AffecterClasses />;
      case 'acces':
        return <AccesConnexion />;
      case 'principal':
        return <ProfesseurPrincipal />;
      case 'animateur':
        return (
          <div className="text-center py-16">
            <Sparkles className="w-16 h-16 mx-auto text-purple-500 mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Animateur d'établissement</h3>
            <p className="text-gray-600">Contenu à développer</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-teal-600 hover:to-emerald-700"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Gestion des enseignants</h1>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-md ${
              activeTab === tab.id
                ? `bg-gradient-to-br ${tab.gradient} text-white shadow-lg ${tab.shadow} scale-105`
                : `bg-white text-gray-700 hover:shadow-lg hover:scale-105`
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div
        className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in`}
      >
        <div className={`h-2 bg-gradient-to-r ${activeTabData?.gradient}`}></div>
        <div className="p-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};
