import React, { useState } from 'react';
import { ArrowLeft, Plus, Edit2, Trash2, Building2, DoorOpen } from 'lucide-react';

type TabType = 'batiments' | 'salles';

interface Batiment {
  id: number;
  nom: string;
}

interface Salle {
  id: number;
  batimentId: number;
  batimentNom: string;
  nom: string;
}

export const SallesManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('batiments');
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'batiment' | 'salle'>('batiment');
  const [editingItem, setEditingItem] = useState<Batiment | Salle | null>(null);

  const [batiments, setBatiments] = useState<Batiment[]>([
    { id: 1, nom: 'Bâtiment A' },
    { id: 2, nom: 'Bâtiment B' },
    { id: 3, nom: 'Bâtiment C' },
  ]);

  const [salles, setSalles] = useState<Salle[]>([
    { id: 1, batimentId: 1, batimentNom: 'Bâtiment A', nom: 'Salle 101' },
    { id: 2, batimentId: 1, batimentNom: 'Bâtiment A', nom: 'Salle 102' },
    { id: 3, batimentId: 2, batimentNom: 'Bâtiment B', nom: 'Salle 201' },
  ]);

  const [batimentForm, setBatimentForm] = useState({ nom: '' });
  const [salleForm, setSalleForm] = useState({ batimentId: '', nom: '' });
  const [searchBatiment, setSearchBatiment] = useState('');

  const handleAddBatiment = () => {
    setModalType('batiment');
    setEditingItem(null);
    setBatimentForm({ nom: '' });
    setShowModal(true);
  };

  const handleEditBatiment = (batiment: Batiment) => {
    setModalType('batiment');
    setEditingItem(batiment);
    setBatimentForm({ nom: batiment.nom });
    setShowModal(true);
  };

  const handleDeleteBatiment = (id: number) => {
    const hasRooms = salles.some(s => s.batimentId === id);
    if (hasRooms) {
      alert('Impossible de supprimer ce bâtiment car il contient des salles.');
      return;
    }
    if (confirm('Êtes-vous sûr de vouloir supprimer ce bâtiment ?')) {
      setBatiments(batiments.filter(b => b.id !== id));
    }
  };

  const handleSubmitBatiment = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem && 'nom' in editingItem && !('batimentId' in editingItem)) {
      setBatiments(batiments.map(b =>
        b.id === editingItem.id ? { ...b, nom: batimentForm.nom } : b
      ));
      const updatedSalles = salles.map(s =>
        s.batimentId === editingItem.id
          ? { ...s, batimentNom: batimentForm.nom }
          : s
      );
      setSalles(updatedSalles);
    } else {
      const newBatiment: Batiment = {
        id: Math.max(...batiments.map(b => b.id), 0) + 1,
        nom: batimentForm.nom,
      };
      setBatiments([...batiments, newBatiment]);
    }
    setShowModal(false);
    setEditingItem(null);
    setBatimentForm({ nom: '' });
  };

  const handleAddSalle = () => {
    if (batiments.length === 0) {
      alert('Veuillez d\'abord créer un bâtiment.');
      return;
    }
    setModalType('salle');
    setEditingItem(null);
    setSalleForm({ batimentId: '', nom: '' });
    setSearchBatiment('');
    setShowModal(true);
  };

  const handleEditSalle = (salle: Salle) => {
    setModalType('salle');
    setEditingItem(salle);
    setSalleForm({ batimentId: salle.batimentId.toString(), nom: salle.nom });
    setSearchBatiment(salle.batimentNom);
    setShowModal(true);
  };

  const handleDeleteSalle = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette salle ?')) {
      setSalles(salles.filter(s => s.id !== id));
    }
  };

  const handleSubmitSalle = (e: React.FormEvent) => {
    e.preventDefault();
    const batiment = batiments.find(b => b.id === Number(salleForm.batimentId));
    if (!batiment) return;

    if (editingItem && 'batimentId' in editingItem) {
      setSalles(salles.map(s =>
        s.id === editingItem.id
          ? { ...s, batimentId: batiment.id, batimentNom: batiment.nom, nom: salleForm.nom }
          : s
      ));
    } else {
      const newSalle: Salle = {
        id: Math.max(...salles.map(s => s.id), 0) + 1,
        batimentId: batiment.id,
        batimentNom: batiment.nom,
        nom: salleForm.nom,
      };
      setSalles([...salles, newSalle]);
    }
    setShowModal(false);
    setEditingItem(null);
    setSalleForm({ batimentId: '', nom: '' });
    setSearchBatiment('');
  };

  const filteredBatiments = batiments.filter(b =>
    b.nom.toLowerCase().includes(searchBatiment.toLowerCase())
  );

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
          <h1 className="text-3xl font-bold text-gray-900">Gestion des salles</h1>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab('batiments')}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-md ${
            activeTab === 'batiments'
              ? 'bg-gradient-to-br from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/50 scale-105'
              : 'bg-white text-gray-700 hover:shadow-lg hover:scale-105'
          }`}
        >
          <Building2 className="w-6 h-6" />
          Bâtiments
        </button>
        <button
          onClick={() => setActiveTab('salles')}
          className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-md ${
            activeTab === 'salles'
              ? 'bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/50 scale-105'
              : 'bg-white text-gray-700 hover:shadow-lg hover:scale-105'
          }`}
        >
          <DoorOpen className="w-6 h-6" />
          Salles de classe
        </button>
      </div>

      {/* Add Button */}
      <div className="flex justify-end">
        <button
          onClick={activeTab === 'batiments' ? handleAddBatiment : handleAddSalle}
          className={`flex items-center gap-2 px-6 py-3 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            activeTab === 'batiments'
              ? 'bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700'
              : 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700'
          }`}
        >
          <Plus className="w-5 h-5" />
          Ajouter {activeTab === 'batiments' ? 'un bâtiment' : 'une salle'}
        </button>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
        {activeTab === 'batiments' ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b-2 border-blue-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-blue-600" />
                      Nom du bâtiment
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Nombre de salles
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {batiments.map((batiment, index) => (
                  <tr
                    key={batiment.id}
                    className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 transition-all duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {batiment.nom}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {salles.filter(s => s.batimentId === batiment.id).length} salle(s)
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditBatiment(batiment)}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBatiment(batiment.id)}
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
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-50 to-amber-50 border-b-2 border-orange-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-orange-600" />
                      Bâtiment
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <DoorOpen className="w-5 h-5 text-orange-600" />
                      Nom de la salle
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {salles.map((salle, index) => (
                  <tr
                    key={salle.id}
                    className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-amber-50 transition-all duration-200"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4 text-sm text-gray-700">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                        {salle.batimentNom}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {salle.nom}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditSalle(salle)}
                          className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSalle(salle.id)}
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
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 animate-slide-up">
            <div className={`p-6 border-b border-gray-200 ${
              modalType === 'batiment'
                ? 'bg-gradient-to-r from-blue-50 to-cyan-50'
                : 'bg-gradient-to-r from-orange-50 to-amber-50'
            }`}>
              <div className="flex items-center gap-3">
                {modalType === 'batiment' ? (
                  <Building2 className="w-8 h-8 text-blue-600" />
                ) : (
                  <DoorOpen className="w-8 h-8 text-orange-600" />
                )}
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingItem
                    ? `Modifier ${modalType === 'batiment' ? 'le bâtiment' : 'la salle'}`
                    : `Ajouter ${modalType === 'batiment' ? 'un bâtiment' : 'une salle'}`
                  }
                </h2>
              </div>
            </div>

            {modalType === 'batiment' ? (
              <form onSubmit={handleSubmitBatiment} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom du bâtiment <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={batimentForm.nom}
                    onChange={(e) => setBatimentForm({ nom: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="Ex: Bâtiment A"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingItem(null);
                      setBatimentForm({ nom: '' });
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-semibold shadow-lg hover:from-blue-600 hover:to-cyan-700 transition-all duration-200"
                  >
                    {editingItem ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmitSalle} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Bâtiment <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={salleForm.batimentId}
                      onChange={(e) => {
                        setSalleForm({ ...salleForm, batimentId: e.target.value });
                        const selected = batiments.find(b => b.id === Number(e.target.value));
                        setSearchBatiment(selected?.nom || '');
                      }}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all appearance-none"
                      required
                    >
                      <option value="">Sélectionnez un bâtiment</option>
                      {batiments.map((b) => (
                        <option key={b.id} value={b.id}>{b.nom}</option>
                      ))}
                    </select>
                    <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom de la salle <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={salleForm.nom}
                    onChange={(e) => setSalleForm({ ...salleForm, nom: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    placeholder="Ex: Salle 101"
                    required
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingItem(null);
                      setSalleForm({ batimentId: '', nom: '' });
                      setSearchBatiment('');
                    }}
                    className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-200"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white rounded-xl font-semibold shadow-lg hover:from-orange-600 hover:to-amber-700 transition-all duration-200"
                  >
                    {editingItem ? 'Modifier' : 'Ajouter'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
