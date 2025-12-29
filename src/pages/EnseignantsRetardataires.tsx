import React, { useState } from 'react';
import { ArrowLeft, GraduationCap, FileDown } from 'lucide-react';

interface ClasseCard {
  id: string;
  name: string;
  niveau: string;
}

interface EnseignantRetardataire {
  id: string;
  nom: string;
  prenom: string;
  matiere: string;
}

const CLASSES_DATA: ClasseCard[] = [
  { id: '6ma', name: '6ème MA', niveau: '6ème' },
  { id: '6mb', name: '6ème MB', niveau: '6ème' },
  { id: '6mc', name: '6ème MC', niveau: '6ème' },
  { id: '6md', name: '6ème MD', niveau: '6ème' },
  { id: '5ma', name: '5ème MA', niveau: '5ème' },
  { id: '5mb', name: '5ème MB', niveau: '5ème' },
  { id: '4ma', name: '4ème MA', niveau: '4ème' },
  { id: '4mb', name: '4ème MB', niveau: '4ème' },
  { id: '3ma', name: '3ème MA', niveau: '3ème' },
  { id: '3mb', name: '3ème MB', niveau: '3ème' },
];

const RETARDATAIRES_DATA: Record<string, EnseignantRetardataire[]> = {
  '6ma_s1': [
    { id: '1', nom: 'ADJOVI', prenom: 'Zinsou Ange', matiere: 'Maths' },
    { id: '2', nom: 'SOUNOUVI', prenom: 'F. Félicien', matiere: 'PCT' },
    { id: '3', nom: 'ABOTO', prenom: 'Henri', matiere: 'Hist Géo' },
    { id: '4', nom: 'MENSAH', prenom: 'Codjovi Mathias', matiere: 'SVT' },
    { id: '5', nom: 'AHOUNOU', prenom: 'Rosaline', matiere: 'Anglais' },
    { id: '6', nom: 'YETONHEGNON', prenom: 'Mahoutin Désiré', matiere: 'Français' },
  ],
  '6ma_s2': [
    { id: '1', nom: 'ADJOVI', prenom: 'Zinsou Ange', matiere: 'Maths' },
    { id: '2', nom: 'MENSAH', prenom: 'Codjovi Mathias', matiere: 'SVT' },
  ],
};

export const EnseignantsRetardataires: React.FC = () => {
  const [selectedNiveau, setSelectedNiveau] = useState<string>('6ème');
  const [selectedClasse, setSelectedClasse] = useState<ClasseCard | null>(null);
  const [activeSemester, setActiveSemester] = useState<'s1' | 's2'>('s1');

  const niveaux = ['6ème', '5ème', '4ème', '3ème'];

  const filteredClasses = CLASSES_DATA.filter(
    (classe) => classe.niveau === selectedNiveau
  );

  const handleSelectClasse = (classe: ClasseCard) => {
    setSelectedClasse(classe);
    setActiveSemester('s1');
  };

  const handleExport = () => {
    alert('Export en cours...');
  };

  const retardataires = selectedClasse
    ? RETARDATAIRES_DATA[`${selectedClasse.id}_${activeSemester}`] || []
    : [];

  if (!selectedClasse) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Enseignants retardataires</h1>
        </div>

        <p className="text-gray-600">
          Veuillez <span className="text-teal-600 font-semibold">sélectionner une classe</span> pour consulter la liste des enseignants retardataires.
        </p>

        <div className="flex gap-2 flex-wrap">
          {niveaux.map((niveau) => (
            <button
              key={niveau}
              onClick={() => setSelectedNiveau(niveau)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedNiveau === niveau
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-teal-500 hover:shadow-md'
              }`}
            >
              {niveau}
            </button>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Les classes disponibles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClasses.map((classe) => (
              <div
                key={classe.id}
                onClick={() => handleSelectClasse(classe)}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-teal-500 hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-200 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                      {classe.name}
                    </h4>
                    <p className="text-sm text-gray-500">Sélectionnez la classe</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
      <button
        onClick={() => setSelectedClasse(null)}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour
      </button>

      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Liste des enseignants retardataires de la <span className="text-teal-600">{selectedClasse.name}</span>
      </h2>

      <div className="flex gap-2">
        <button
          onClick={() => setActiveSemester('s1')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            activeSemester === 's1'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-teal-500'
          }`}
        >
          1er Semestre
        </button>
        <button
          onClick={() => setActiveSemester('s2')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            activeSemester === 's2'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-teal-500'
          }`}
        >
          2nd Semestre
        </button>
      </div>

      <button
        onClick={handleExport}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
      >
        <FileDown className="w-5 h-5" />
        Exporter
      </button>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Nom</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Prénom</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Matiere</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {retardataires.map((enseignant) => (
                <tr key={enseignant.id} className="hover:bg-teal-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{enseignant.nom}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{enseignant.prenom}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{enseignant.matiere}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {retardataires.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun enseignant retardataire</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
