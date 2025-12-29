import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2 } from 'lucide-react';

interface Matiere {
  id: number;
  nom: string;
  abreviation: string;
}

export const Matieres: React.FC = () => {
  const [matieres, setMatieres] = useState<Matiere[]>([
    { id: 1, nom: 'Communication écrite', abreviation: 'Com Ecrite' },
    { id: 2, nom: 'Lecture', abreviation: 'Lecture' },
    { id: 3, nom: 'Français', abreviation: 'Français' },
    { id: 4, nom: 'Anglais', abreviation: 'Anglais' },
    { id: 5, nom: 'Histoire Géographie', abreviation: 'Hist Géo' },
    { id: 6, nom: 'Philosophie', abreviation: 'Philo' },
    { id: 7, nom: 'Espagnol', abreviation: 'Espagnol' },
    { id: 8, nom: 'Allemand', abreviation: 'Allemand' },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingMatiere, setEditingMatiere] = useState<Matiere | null>(null);
  const [formData, setFormData] = useState({ nom: '', abreviation: '' });

  const handleEdit = (matiere: Matiere) => {
    setEditingMatiere(matiere);
    setFormData({ nom: matiere.nom, abreviation: matiere.abreviation });
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette matière ?')) {
      setMatieres(matieres.filter(m => m.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMatiere) {
      setMatieres(matieres.map(m =>
        m.id === editingMatiere.id
          ? { ...m, nom: formData.nom, abreviation: formData.abreviation }
          : m
      ));
    } else {
      const newMatiere: Matiere = {
        id: Math.max(...matieres.map(m => m.id)) + 1,
        nom: formData.nom,
        abreviation: formData.abreviation,
      };
      setMatieres([...matieres, newMatiere]);
    }
    setShowModal(false);
    setEditingMatiere(null);
    setFormData({ nom: '', abreviation: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-teal-600 hover:to-emerald-700"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Gestion des matières</h1>
        </div>
        <button
          onClick={() => {
            setEditingMatiere(null);
            setFormData({ nom: '', abreviation: '' });
            setShowModal(true);
          }}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-blue-600 hover:to-indigo-700"
        >
          <Plus className="w-5 h-5" />
          Ajouter une matière
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Abréviation
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {matieres.map((matiere, index) => (
                <tr
                  key={matiere.id}
                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-200"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {matiere.id}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {matiere.nom}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {matiere.abreviation}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(matiere)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-110"
                        title="Modifier"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(matiere.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-slide-up">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingMatiere ? 'Modifier la matière' : 'Ajouter une matière'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nom de la matière <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.nom}
                  onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Abréviation <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.abreviation}
                  onChange={(e) => setFormData({ ...formData, abreviation: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  required
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingMatiere(null);
                    setFormData({ nom: '', abreviation: '' });
                  }}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-200"
                >
                  {editingMatiere ? 'Modifier' : 'Ajouter'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
