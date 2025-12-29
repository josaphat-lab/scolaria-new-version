import React from 'react';
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  Calendar,
  Bell,
  UserCheck,
  BookMarked,
  Award,
  Activity
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color, trend }) => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
        {trend && (
          <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {trend}
          </p>
        )}
      </div>
      <div className={`p-3 rounded-lg ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

interface ActivityItemProps {
  title: string;
  time: string;
  type: 'info' | 'success' | 'warning';
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, time, type }) => {
  const colors = {
    info: 'bg-primary-100 text-primary-600',
    success: 'bg-green-100 text-green-600',
    warning: 'bg-orange-100 text-orange-600'
  };

  return (
    <div className="flex items-start gap-3 pb-4 last:pb-0">
      <div className={`w-2 h-2 rounded-full mt-2 ${colors[type].replace('100', '500')}`} />
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-900">{title}</p>
        <p className="text-xs text-gray-500 mt-1">{time}</p>
      </div>
    </div>
  );
};

export const Dashboard: React.FC = () => {
  const stats = [
    {
      title: 'Total Élèves',
      value: '1,248',
      icon: <Users className="w-6 h-6 text-white" />,
      color: 'bg-primary-500',
      trend: '+12% ce mois'
    },
    {
      title: 'Enseignants',
      value: '86',
      icon: <GraduationCap className="w-6 h-6 text-white" />,
      color: 'bg-green-500',
      trend: '+3 nouveaux'
    },
    {
      title: 'Classes',
      value: '24',
      icon: <BookOpen className="w-6 h-6 text-white" />,
      color: 'bg-secondary-500'
    },
    {
      title: 'Taux de Présence',
      value: '94%',
      icon: <UserCheck className="w-6 h-6 text-white" />,
      color: 'bg-orange-500',
      trend: '+2% cette semaine'
    }
  ];

  const recentActivities = [
    { title: 'Nouvelle inscription - Marie Dupont (3ème A)', time: 'Il y a 15 minutes', type: 'success' as const },
    { title: 'Modification emploi du temps - 2nde B', time: 'Il y a 1 heure', type: 'info' as const },
    { title: "Absence signalée - Prof. Martin (Mathématiques)", time: 'Il y a 2 heures', type: 'warning' as const },
    { title: 'Nouveau document partagé - Calendrier examens', time: 'Il y a 3 heures', type: 'info' as const },
    { title: 'Réinscription validée - Jean Lambert (Terminale S)', time: 'Il y a 5 heures', type: 'success' as const }
  ];

  const upcomingEvents = [
    { title: 'Conseil de classe 3ème', date: '28 Déc', time: '14:00' },
    { title: 'Réunion parents-professeurs', date: '02 Jan', time: '16:00' },
    { title: 'Examens trimestriels', date: '15 Jan', time: '08:00' },
    { title: 'Formation pédagogique', date: '20 Jan', time: '09:00' }
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
          <p className="text-gray-600 mt-2">Vue d'ensemble de votre établissement</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary-500" />
                Activités récentes
              </h2>
            </div>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <ActivityItem key={index} {...activity} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary-500" />
                Événements à venir
              </h2>
            </div>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 last:pb-0 border-b last:border-0">
                  <div className="bg-primary-50 px-3 py-2 rounded-lg text-center min-w-[60px]">
                    <p className="text-xs font-medium text-primary-600">{event.date}</p>
                    <p className="text-xs text-gray-600 mt-1">{event.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{event.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <BookMarked className="w-5 h-5 text-primary-500" />
              Distribution par niveau
            </h2>
            <div className="space-y-3">
              {[
                { level: 'Sixième', count: 180, color: 'bg-primary-500' },
                { level: 'Cinquième', count: 165, color: 'bg-green-500' },
                { level: 'Quatrième', count: 158, color: 'bg-yellow-500' },
                { level: 'Troisième', count: 152, color: 'bg-orange-500' },
                { level: 'Seconde', count: 195, color: 'bg-secondary-500' },
                { level: 'Première', count: 210, color: 'bg-pink-500' },
                { level: 'Terminale', count: 188, color: 'bg-red-500' }
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">{item.level}</span>
                    <span className="text-sm font-semibold text-gray-900">{item.count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${(item.count / 210) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary-500" />
              Performances globales
            </h2>
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-900">Taux de réussite</span>
                  <span className="text-2xl font-bold text-green-600">87%</span>
                </div>
                <p className="text-xs text-green-700">Examens du dernier trimestre</p>
              </div>

              <div className="p-4 bg-primary-50 rounded-lg border border-primary-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-primary-900">Moyenne générale</span>
                  <span className="text-2xl font-bold text-primary-600">13.2/20</span>
                </div>
                <p className="text-xs text-primary-700">Toutes classes confondues</p>
              </div>

              <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-orange-900">Taux d'assiduité</span>
                  <span className="text-2xl font-bold text-orange-600">94%</span>
                </div>
                <p className="text-xs text-orange-700">Cette semaine</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
