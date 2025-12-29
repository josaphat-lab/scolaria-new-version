import React, { useState } from 'react';
import { ArrowLeft, Search } from 'lucide-react';

type ChangeType = 'gp' | 'filiere';

interface Student {
  id: number;
  matricule: string;
  nom: string;
  prenoms: string;
  sexe: 'M' | 'F';
  lieuNaissance: string;
  statut: string;
  checked: boolean;
}

interface ClasseGroup {
  id: string;
  nom: string;
}

export const ChangementClasse: React.FC = () => {
  const [changeType, setChangeType] = useState<ChangeType>('gp');
  const [selectedClasse, setSelectedClasse] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [destinationClasse, setDestinationClasse] = useState('');

  const classesGP = ['6eme', '5eme', '4eme', '3eme', '2nde', '1ere', 'Tle'];
  const classesFiliere = ['2nde', '1ere', 'Tle'];

  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      matricule: 'EDU001',
      nom: 'DIALLO',
      prenoms: 'Amadou',
      sexe: 'M',
      lieuNaissance: 'Conakry',
      statut: 'Passant',
      checked: false
    },
    {
      id: 2,
      matricule: 'EDU002',
      nom: 'BARRY',
      prenoms: 'Fatoumata',
      sexe: 'F',
      lieuNaissance: 'Labé',
      statut: 'Passant',
      checked: false
    },
  ]);

  const [groupesPedagogiques] = useState<ClasseGroup[]>([
    { id: '1', nom: '2ndeB1' },
    { id: '2', nom: '2ndeC1' },
    { id: '3', nom: '2ndeD1' },
    { id: '4', nom: '2ndeD2' },
    { id: '5', nom: '2ndeD3' },
    { id: '6', nom: '2ndeD4' },
  ]);

  const currentClasses = changeType === 'gp' ? classesGP : classesFiliere;

  const handleSelectAll = (checked: boolean) => {
    setStudents(students.map(s => ({ ...s, checked })));
  };

  const handleStudentCheck = (id: number) => {
    setStudents(students.map(s =>
      s.id === id ? { ...s, checked: !s.checked } : s
    ));
  };

  const handleSave = () => {
    const selectedStudents = students.filter(s => s.checked);
    console.log('Enregistrer les changements pour:', selectedStudents);
  };

  const filteredStudents = students.filter(s =>
    s.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.prenoms.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.matricule.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!selectedClasse) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Changement de classe</h1>
          <p className="text-gray-600 mt-2">
            Gérer les changements de groupe pédagogique et de filière
          </p>
        </div>

        {/* Main Tabs - GP / Filière */}
        <div className="flex gap-4">
          <button
            onClick={() => setChangeType('gp')}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md ${
              changeType === 'gp'
                ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/50 scale-105'
                : 'bg-white text-gray-700 hover:shadow-lg hover:scale-105'
            }`}
          >
            Groupe Pédagogique (GP)
          </button>
          <button
            onClick={() => setChangeType('filiere')}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md ${
              changeType === 'filiere'
                ? 'bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-lg shadow-orange-500/50 scale-105'
                : 'bg-white text-gray-700 hover:shadow-lg hover:scale-105'
            }`}
          >
            Filière
          </button>
        </div>

        {/* Class Selection Tabs */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Sélectionnez une classe
          </h2>
          <div className="flex flex-wrap gap-4">
            {currentClasses.map((classe) => (
              <button
                key={classe}
                onClick={() => setSelectedClasse(classe)}
                className={`px-8 py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl ${
                  changeType === 'gp'
                    ? 'bg-gradient-to-br from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600'
                    : 'bg-gradient-to-br from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600'
                }`}
              >
                {classe}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSelectedClasse(null)}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
            changeType === 'gp'
              ? 'bg-gradient-to-br from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
              : 'bg-gradient-to-br from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Changer de {changeType === 'gp' ? 'groupe pédagogique' : 'filière'} pour des élèves de la{' '}
            <span className={changeType === 'gp' ? 'text-cyan-600' : 'text-orange-600'}>
              {selectedClasse}
            </span>
          </h1>
        </div>
      </div>

      {/* Warning Messages */}
      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 space-y-2 border-l-4 border-cyan-500 shadow-md">
        <p className="text-sm text-gray-700">
          <strong>NB:</strong> Cochez devant tous les élèves pour lesquels vous voulez changer de {changeType === 'gp' ? 'groupe pédagogique' : 'filière'}
        </p>
        <p className="text-sm">
          <strong>ATTENTION:</strong>{' '}
          <span className="text-red-600 font-semibold">
            Seuls les élèves qui n'ont encore aucune note dans la salle sont affichés
          </span>
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar - GP List (only for GP changes) */}
        {changeType === 'gp' && (
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-lg">
              <h3 className="font-bold text-gray-900 mb-4 text-lg">
                Groupes disponibles
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {groupesPedagogiques.map((gp) => (
                  <button
                    key={gp.id}
                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gradient-to-r hover:from-cyan-50 hover:to-blue-50 transition-all duration-200 text-sm text-gray-700 hover:text-cyan-700 hover:font-semibold border border-transparent hover:border-cyan-200"
                  >
                    {gp.nom}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className={changeType === 'gp' ? 'lg:col-span-3' : 'lg:col-span-4'}>
          <div className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden">
            {/* Search Bar */}
            <div className="p-6 border-b border-gray-200 bg-gray-50">
              <div className="relative">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                  changeType === 'gp' ? 'text-cyan-500' : 'text-orange-500'
                }`} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher un élève..."
                  className={`w-full pl-12 pr-4 py-3 border-2 rounded-xl shadow-sm focus:ring-2 focus:outline-none transition-all ${
                    changeType === 'gp'
                      ? 'border-gray-300 focus:ring-cyan-500 focus:border-cyan-500'
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  }`}
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className={`rounded border-gray-300 focus:ring-2 ${
                          changeType === 'gp'
                            ? 'text-cyan-600 focus:ring-cyan-500'
                            : 'text-orange-600 focus:ring-orange-500'
                        }`}
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      N° Educmaster
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nom de l'élève
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Prénoms de l'élève
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sexe de l'élève
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lieu de naissance
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={student.checked}
                          onChange={() => handleStudentCheck(student.id)}
                          className={`rounded border-gray-300 focus:ring-2 ${
                            changeType === 'gp'
                              ? 'text-cyan-600 focus:ring-cyan-500'
                              : 'text-orange-600 focus:ring-orange-500'
                          }`}
                        />
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {student.matricule}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {student.nom}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {student.prenoms}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {student.sexe}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {student.lieuNaissance}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {student.statut}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-200 space-y-4 bg-gray-50">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Sélectionnez la classe de destination
                </label>
                <select
                  value={destinationClasse}
                  onChange={(e) => setDestinationClasse(e.target.value)}
                  className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm focus:ring-2 focus:outline-none transition-all ${
                    changeType === 'gp'
                      ? 'border-gray-300 focus:ring-cyan-500 focus:border-cyan-500'
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                  }`}
                >
                  <option value="">Choisir...</option>
                  {groupesPedagogiques.map((gp) => (
                    <option key={gp.id} value={gp.nom}>
                      {gp.nom}
                    </option>
                  ))}
                </select>
              </div>

              <button
                onClick={handleSave}
                className={`w-full text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl ${
                  changeType === 'gp'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                    : 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700'
                }`}
              >
                Enregistrer les changements
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
