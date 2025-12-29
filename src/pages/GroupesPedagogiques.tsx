import React, { useState } from 'react';
import { Search, Edit2, Plus } from 'lucide-react';

interface GroupePedagogique {
  id: number;
  classe: string;
  filiere: string;
  nom: string;
  cycle: '1er' | '2nd';
}

type MainTab = 'gestion' | 'liste';
type CycleTab = '1er' | '2nd';

export const GroupesPedagogiques: React.FC = () => {
  const [mainTab, setMainTab] = useState<MainTab>('gestion');
  const [cycleTab, setCycleTab] = useState<CycleTab>('1er');
  const [searchTerm, setSearchTerm] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGroupe, setSelectedGroupe] = useState<GroupePedagogique | null>(null);

  const [formData, setFormData] = useState({
    classe: '',
    filiere: '',
    nom: ''
  });

  const [editFormData, setEditFormData] = useState({
    classe: '',
    filiere: '',
    nom: ''
  });

  const [groupes, setGroupes] = useState<GroupePedagogique[]>([
    { id: 1, classe: '6eme', filiere: 'M', nom: 'A', cycle: '1er' },
    { id: 2, classe: '6eme', filiere: 'M', nom: 'B', cycle: '1er' },
    { id: 3, classe: '6eme', filiere: 'M', nom: 'C', cycle: '1er' },
    { id: 41, classe: '2nde', filiere: 'A2', nom: 'A', cycle: '2nd' },
    { id: 42, classe: '2nde', filiere: 'B', nom: '1', cycle: '2nd' },
    { id: 43, classe: '2nde', filiere: 'C', nom: '1', cycle: '2nd' },
  ]);

  const classesOptions: Record<CycleTab, string[]> = {
    '1er': ['6eme', '5eme', '4eme', '3eme'],
    '2nd': ['2nde', '1ere', 'Tle']
  };

  const filteredGroupes = groupes.filter(g => {
    const matchesSearch = g.classe.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         g.filiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         g.nom.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = mainTab === 'liste' || g.cycle === cycleTab;
    return matchesSearch && matchesTab;
  });

  const handleAdd = () => {
    if (formData.classe && formData.filiere && formData.nom) {
      const newGroupe: GroupePedagogique = {
        id: Date.now(),
        classe: formData.classe,
        filiere: formData.filiere,
        nom: formData.nom,
        cycle: cycleTab
      };
      setGroupes([...groupes, newGroupe]);
      setFormData({ classe: '', filiere: '', nom: '' });
    }
  };

  const handleEdit = (groupe: GroupePedagogique) => {
    setSelectedGroupe(groupe);
    setEditFormData({
      classe: groupe.classe,
      filiere: groupe.filiere,
      nom: groupe.nom
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    if (selectedGroupe && editFormData.classe && editFormData.filiere && editFormData.nom) {
      setGroupes(groupes.map(g =>
        g.id === selectedGroupe.id
          ? { ...g, ...editFormData }
          : g
      ));
      setShowEditModal(false);
      setSelectedGroupe(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Groupes pédagogiques</h1>
        <p className="text-gray-600 mt-1">Gérer les groupes pédagogiques par cycle</p>
      </div>

      {/* Main Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setMainTab('gestion')}
          className={`px-6 py-3 font-medium transition-colors border-b-2 ${
            mainTab === 'gestion'
              ? 'text-teal-600 border-teal-600'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          Gestion
        </button>
        <button
          onClick={() => setMainTab('liste')}
          className={`px-6 py-3 font-medium transition-colors border-b-2 ${
            mainTab === 'liste'
              ? 'text-teal-600 border-teal-600'
              : 'text-gray-500 border-transparent hover:text-gray-700'
          }`}
        >
          Liste
        </button>
      </div>

      {/* Cycle Tabs (only in Gestion) */}
      {mainTab === 'gestion' && (
        <div className="flex gap-2">
          <button
            onClick={() => setCycleTab('1er')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              cycleTab === '1er'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            1er cycle
          </button>
          <button
            onClick={() => setCycleTab('2nd')}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              cycleTab === '2nd'
                ? 'bg-teal-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            2nd cycle
          </button>
        </div>
      )}

      {/* Add Form (only in Gestion) */}
      {mainTab === 'gestion' && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Classe
              </label>
              <select
                value={formData.classe}
                onChange={(e) => setFormData({ ...formData, classe: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              >
                <option value="">Sélectionner...</option>
                {classesOptions[cycleTab].map(classe => (
                  <option key={classe} value={classe}>{classe}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filière
              </label>
              <input
                type="text"
                value={formData.filiere}
                onChange={(e) => setFormData({ ...formData, filiere: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="M, A, B, C..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom
              </label>
              <input
                type="text"
                value={formData.nom}
                onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                placeholder="A, B, 1..."
              />
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Ajouter
            </button>
          </div>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex justify-end">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Classe
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Filière
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredGroupes.map((groupe) => (
              <tr key={groupe.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-blue-600">
                  {groupe.id}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {groupe.classe}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {groupe.filiere}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {groupe.nom}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button
                    onClick={() => handleEdit(groupe)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                    title="Modifier"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && selectedGroupe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Modifier le groupe</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={editFormData.classe}
                    onChange={(e) => setEditFormData({ ...editFormData, classe: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Sélectionner...</option>
                    {classesOptions[selectedGroupe.cycle].map(classe => (
                      <option key={classe} value={classe}>{classe}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filière
                  </label>
                  <input
                    type="text"
                    value={editFormData.filiere}
                    onChange={(e) => setEditFormData({ ...editFormData, filiere: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={editFormData.nom}
                    onChange={(e) => setEditFormData({ ...editFormData, nom: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
