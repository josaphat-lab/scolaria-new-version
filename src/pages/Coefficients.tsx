import React, { useState } from 'react';
import { ArrowLeft, Search, Edit2, Trash2 } from 'lucide-react';

type CycleType = 'premier' | 'second';

interface CoefficientPremier {
  id: number;
  matiere: string;
  salle: string;
  coefficient: number;
}

interface CoefficientSecond {
  id: number;
  matiere: string;
  salle: string;
  filiere: string;
  langueVivante?: string;
  coefficient: number;
}

export const Coefficients: React.FC = () => {
  const [cycleType, setCycleType] = useState<CycleType>('premier');
  const [searchTerm, setSearchTerm] = useState('');

  const [coefficientsPremier, setCoefficientsPremier] = useState<CoefficientPremier[]>([
    { id: 1, matiere: 'Communication écrite', salle: '6eme', coefficient: 1 },
    { id: 2, matiere: 'Français', salle: '6eme', coefficient: 2 },
  ]);

  const [coefficientsSecond, setCoefficientsSecond] = useState<CoefficientSecond[]>([
    { id: 1, matiere: 'Français', salle: '2nde', filiere: 'B', coefficient: 2 },
    { id: 2, matiere: 'Anglais', salle: '2nde', filiere: 'B', coefficient: 2 },
  ]);

  const [formPremier, setFormPremier] = useState({
    matiere: '',
    salle: '',
    coefficient: '',
  });

  const [formSecond, setFormSecond] = useState({
    matiere: '',
    salle: '',
    filiere: '',
    langueVivante: '',
    coefficient: '',
  });

  const matieres = [
    'Communication écrite | Com Ecrite',
    'Lecture',
    'Français | Français',
    'Anglais',
    'Histoire Géographie',
    'Philosophie',
  ];

  const sallesPremier = ['6eme', '5eme', '4eme', '3eme'];
  const sallesSecond = ['2nde', '1ere', 'Tle'];
  const filieres = ['A', 'B', 'C', 'D'];

  const handleSubmitPremier = (e: React.FormEvent) => {
    e.preventDefault();
    const newCoeff: CoefficientPremier = {
      id: Math.max(...coefficientsPremier.map(c => c.id), 0) + 1,
      matiere: formPremier.matiere,
      salle: formPremier.salle,
      coefficient: Number(formPremier.coefficient),
    };
    setCoefficientsPremier([...coefficientsPremier, newCoeff]);
    setFormPremier({ matiere: '', salle: '', coefficient: '' });
  };

  const handleSubmitSecond = (e: React.FormEvent) => {
    e.preventDefault();
    const newCoeff: CoefficientSecond = {
      id: Math.max(...coefficientsSecond.map(c => c.id), 0) + 1,
      matiere: formSecond.matiere,
      salle: formSecond.salle,
      filiere: formSecond.filiere,
      langueVivante: formSecond.langueVivante || undefined,
      coefficient: Number(formSecond.coefficient),
    };
    setCoefficientsSecond([...coefficientsSecond, newCoeff]);
    setFormSecond({ matiere: '', salle: '', filiere: '', langueVivante: '', coefficient: '' });
  };

  const handleDeletePremier = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce coefficient ?')) {
      setCoefficientsPremier(coefficientsPremier.filter(c => c.id !== id));
    }
  };

  const handleDeleteSecond = (id: number) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce coefficient ?')) {
      setCoefficientsSecond(coefficientsSecond.filter(c => c.id !== id));
    }
  };

  const filteredPremier = coefficientsPremier.filter(c =>
    c.matiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.salle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredSecond = coefficientsSecond.filter(c =>
    c.matiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.salle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.filiere.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-3xl font-bold text-gray-900">Gestion des coefficients</h1>
      </div>

      {/* Cycle Tabs */}
      <div className="flex gap-4">
        <button
          onClick={() => setCycleType('premier')}
          className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-md ${
            cycleType === 'premier'
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/50 scale-105'
              : 'bg-white text-gray-700 hover:shadow-lg hover:scale-105'
          }`}
        >
          1er Cycle
        </button>
        <button
          onClick={() => setCycleType('second')}
          className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-md ${
            cycleType === 'second'
              ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/50 scale-105'
              : 'bg-white text-gray-700 hover:shadow-lg hover:scale-105'
          }`}
        >
          2nd Cycle
        </button>
      </div>

      {/* Forms */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {cycleType === 'premier' ? (
          <form onSubmit={handleSubmitPremier} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Matière <span className="text-red-500">*</span>
                </label>
                <select
                  value={formPremier.matiere}
                  onChange={(e) => setFormPremier({ ...formPremier, matiere: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  required
                >
                  <option value="">Sélectionnez...</option>
                  {matieres.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Salle <span className="text-red-500">*</span>
                </label>
                <select
                  value={formPremier.salle}
                  onChange={(e) => setFormPremier({ ...formPremier, salle: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  required
                >
                  <option value="">Sélectionnez...</option>
                  {sallesPremier.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Coefficient <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formPremier.coefficient}
                  onChange={(e) => setFormPremier({ ...formPremier, coefficient: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  required
                  min="1"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-emerald-600 hover:to-teal-700"
            >
              Définir
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmitSecond} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Matière <span className="text-red-500">*</span>
                </label>
                <select
                  value={formSecond.matiere}
                  onChange={(e) => setFormSecond({ ...formSecond, matiere: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                  required
                >
                  <option value="">Sélectionnez...</option>
                  {matieres.map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Salle <span className="text-red-500">*</span>
                </label>
                <select
                  value={formSecond.salle}
                  onChange={(e) => setFormSecond({ ...formSecond, salle: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                  required
                >
                  <option value="">Sélectionnez...</option>
                  {sallesSecond.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filière <span className="text-red-500">*</span>
                </label>
                <select
                  value={formSecond.filiere}
                  onChange={(e) => setFormSecond({ ...formSecond, filiere: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                  required
                >
                  <option value="">Sélectionnez...</option>
                  {filieres.map((f) => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Langue vivante (Uniquement pour 1ère et Tle littéraire)
                </label>
                <select
                  value={formSecond.langueVivante}
                  onChange={(e) => setFormSecond({ ...formSecond, langueVivante: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                >
                  <option value="">Sélectionnez la LV</option>
                  <option value="Anglais">Anglais</option>
                  <option value="Espagnol">Espagnol</option>
                  <option value="Allemand">Allemand</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Coefficient <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formSecond.coefficient}
                  onChange={(e) => setFormSecond({ ...formSecond, coefficient: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 transition-all"
                  required
                  min="1"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-violet-600 hover:to-purple-700"
            >
              Définir
            </button>
          </form>
        )}
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
        <div className="relative">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
            cycleType === 'premier' ? 'text-emerald-500' : 'text-violet-500'
          }`} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Rechercher..."
            className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl shadow-sm focus:ring-2 focus:outline-none transition-all ${
              cycleType === 'premier'
                ? 'border-gray-300 focus:ring-emerald-500 focus:border-emerald-500'
                : 'border-gray-300 focus:ring-violet-500 focus:border-violet-500'
            }`}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`border-b-2 ${
              cycleType === 'premier'
                ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'
                : 'bg-gradient-to-r from-violet-50 to-purple-50 border-violet-200'
            }`}>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Matière
                </th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Salle
                </th>
                {cycleType === 'second' && (
                  <>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Filière
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                      Langue Vivante
                    </th>
                  </>
                )}
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Coef
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {cycleType === 'premier' ? (
                filteredPremier.map((coef) => (
                  <tr
                    key={coef.id}
                    className="hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">{coef.matiere}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{coef.salle}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{coef.coefficient}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeletePremier(coef.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                filteredSecond.map((coef) => (
                  <tr
                    key={coef.id}
                    className="hover:bg-gradient-to-r hover:from-violet-50 hover:to-purple-50 transition-all duration-200"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">{coef.matiere}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{coef.salle}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{coef.filiere}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{coef.langueVivante || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{coef.coefficient}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="p-2 text-violet-600 hover:bg-violet-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Modifier"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteSecond(coef.id)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200 hover:scale-110"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
