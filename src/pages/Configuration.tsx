import { useState } from 'react';
import { Settings, Building2, Users, Wand2 } from 'lucide-react';

type TabType = 'assistant' | 'etablissement' | 'utilisateurs';

export const Configuration = () => {
  const [activeTab, setActiveTab] = useState<TabType>('assistant');

  const tabs = [
    { id: 'assistant' as TabType, label: "Lancer l'assistant de configuration", icon: Wand2 },
    { id: 'etablissement' as TabType, label: 'Mon établissement', icon: Building2 },
    { id: 'utilisateurs' as TabType, label: 'Gestion des utilisateurs', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary-100 rounded-lg">
              <Settings className="w-6 h-6 text-primary-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Configuration</h1>
          </div>
          <p className="text-gray-600">Gérez les paramètres de votre établissement</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex gap-1 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors relative ${
                      activeTab === tab.id
                        ? 'text-primary-500'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'assistant' && (
              <div className="max-w-2xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Assistant de configuration
                </h2>
                <p className="text-gray-600 mb-6">
                  L'assistant vous guide pas à pas pour configurer votre établissement scolaire.
                </p>
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <Wand2 className="w-8 h-8 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-900 mb-2">
                        Configuration guidée
                      </h3>
                      <p className="text-sm text-primary-800 mb-4">
                        Configurez rapidement votre établissement avec notre assistant intelligent.
                        Il vous aidera à paramétrer les informations essentielles, les années scolaires,
                        les filières et bien plus encore.
                      </p>
                      <button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium text-sm">
                        Lancer l'assistant
                      </button>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Ce que l'assistant configurera :</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2" />
                      <span>Informations de base de l'établissement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2" />
                      <span>Années scolaires et périodes d'évaluation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2" />
                      <span>Filières et classes disponibles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mt-2" />
                      <span>Matières et coefficients</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'etablissement' && (
              <div className="max-w-3xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Informations de l'établissement
                </h2>
                <p className="text-gray-600 mb-6">
                  Gérez les informations de votre établissement scolaire.
                </p>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de l'établissement
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Lycée..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Type d'établissement
                      </label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>Lycée</option>
                        <option>Collège</option>
                        <option>École primaire</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Adresse
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Adresse complète"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="+221..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="contact@etablissement.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Directeur
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Nom du directeur"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Code établissement
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Code unique"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button className="px-6 py-2.5 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
                      Enregistrer les modifications
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'utilisateurs' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                      Gestion des utilisateurs
                    </h2>
                    <p className="text-gray-600">
                      Gérez les accès et permissions des utilisateurs du système.
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Ajouter un utilisateur
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Nom
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rôle
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Statut
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">Admin Principal</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">admin@school.com</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-secondary-100 text-secondary-800 rounded-full">
                            Administrateur
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                            Actif
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <button className="text-primary-500 hover:text-primary-700 font-medium">
                            Modifier
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
