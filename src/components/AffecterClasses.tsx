import React, { useState } from 'react';
import { ArrowLeft, Search, X } from 'lucide-react';

interface ClasseCard {
  id: string;
  name: string;
  niveau: string;
}

interface Affectation {
  id: string;
  enseignant: string;
  matiere: string;
  salle: string;
  annee: string;
}

const CLASSES_DATA: ClasseCard[] = [
  { id: '6ma', name: '6ème MA', niveau: '6ème' },
  { id: '6mb', name: '6ème MB', niveau: '6ème' },
  { id: '6mc', name: '6ème MC', niveau: '6ème' },
  { id: '6md', name: '6ème MD', niveau: '6ème' },
  { id: '6me', name: '6ème ME', niveau: '6ème' },
  { id: '6mf', name: '6ème MF', niveau: '6ème' },
  { id: '6mg', name: '6ème MG', niveau: '6ème' },
  { id: '6mh', name: '6ème MH', niveau: '6ème' },
  { id: '6mi', name: '6ème MI', niveau: '6ème' },
  { id: '6mj', name: '6ème MJ', niveau: '6ème' },
  { id: '6mk', name: '6ème MK', niveau: '6ème' },
  { id: '6ml', name: '6ème ML', niveau: '6ème' },
  { id: '5ma', name: '5ème MA', niveau: '5ème' },
  { id: '5mb', name: '5ème MB', niveau: '5ème' },
  { id: '5mc', name: '5ème MC', niveau: '5ème' },
  { id: '4ma', name: '4ème MA', niveau: '4ème' },
  { id: '4mb', name: '4ème MB', niveau: '4ème' },
  { id: '3ma', name: '3ème MA', niveau: '3ème' },
  { id: '3mb', name: '3ème MB', niveau: '3ème' },
  { id: '2ma', name: '2nde MA', niveau: '2nde' },
  { id: '1ma', name: '1ère MA', niveau: '1ère' },
  { id: 'tma', name: 'Tle MA', niveau: 'Tle' },
];

const MATIERES = [
  'Français',
  'Mathématiques',
  'Anglais',
  'Histoire Géographie',
  'Sciences de la Vie et de la Terre',
  'Physique Chimie et Technologie',
  'Education Physique et Sportive',
  'Espagnol',
  'Allemand',
];

const ENSEIGNANTS = [
  'ABOTO Henri',
  'MENSAH Codjovi Mathias',
  'KOSSIVI Jean',
  'BACHABI Kossi',
  'SARE Mohammed',
  'DOVONON Pascal',
  'PADONOU Laurent',
  'ADANVOESSI Marie',
  'DJIDOHOKPIN Albert',
  'KPOSSATON David',
];

const INITIAL_AFFECTATIONS: Affectation[] = [
  { id: '1', enseignant: 'ABOTO Henri', matiere: 'Hist Géo', salle: '6ème MA', annee: '2025-2026' },
  { id: '2', enseignant: 'MENSAH Codjovi Mathias', matiere: 'SVT', salle: '6ème MA', annee: '2025-2026' },
];

export const AffecterClasses: React.FC = () => {
  const [selectedNiveau, setSelectedNiveau] = useState<string>('6ème');
  const [selectedClasse, setSelectedClasse] = useState<ClasseCard | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMatiere, setSelectedMatiere] = useState('');
  const [selectedEnseignant, setSelectedEnseignant] = useState('');
  const [affectations, setAffectations] = useState<Affectation[]>(INITIAL_AFFECTATIONS);

  const niveaux = ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Tle'];

  const filteredClasses = CLASSES_DATA.filter(
    (classe) => classe.niveau === selectedNiveau
  );

  const handleSelectClasse = (classe: ClasseCard) => {
    setSelectedClasse(classe);
    setAffectations(INITIAL_AFFECTATIONS);
  };

  const handleAffecter = () => {
    if (selectedMatiere && selectedEnseignant && selectedClasse) {
      const newAffectation: Affectation = {
        id: Date.now().toString(),
        enseignant: selectedEnseignant,
        matiere: selectedMatiere,
        salle: selectedClasse.name,
        annee: '2025-2026',
      };
      setAffectations([...affectations, newAffectation]);
      setSelectedMatiere('');
      setSelectedEnseignant('');
    }
  };

  const handleRetirer = (id: string) => {
    setAffectations(affectations.filter((aff) => aff.id !== id));
  };

  const filteredAffectations = affectations.filter(
    (aff) =>
      aff.enseignant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      aff.matiere.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!selectedClasse) {
    return (
      <div className="space-y-6">
        <p className="text-gray-600">
          Veuillez <span className="text-teal-600 font-semibold">sélectionner une classe</span> pour commencer.
        </p>

        {/* Tabs de niveau */}
        <div className="flex gap-2 flex-wrap">
          {niveaux.map((niveau) => (
            <button
              key={niveau}
              onClick={() => setSelectedNiveau(niveau)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedNiveau === niveau
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-teal-500 hover:shadow-md'
              }`}
            >
              {niveau}
            </button>
          ))}
        </div>

        {/* Liste des classes */}
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
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg"></div>
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
    <div className="space-y-6">
      {/* Bouton Retour */}
      <button
        onClick={() => setSelectedClasse(null)}
        className="flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour
      </button>

      {/* Titre */}
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Affectation des enseignants en <span className="text-teal-600">{selectedClasse.name}</span>
      </h2>

      {/* Message d'avertissement */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
        <p className="text-red-800 font-semibold text-sm">
          NB: Lors du retrait d'un enseignant, si ce dernier a déjà enregistré des évaluations pour le compte de la classe, son retrait sera automatiquement suivi d'un remplacement. Dans le cas contraire, il peut être directement retiré.
        </p>
      </div>

      {/* Formulaire d'affectation */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Matière */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Matière</label>
            <select
              value={selectedMatiere}
              onChange={(e) => setSelectedMatiere(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white"
            >
              <option value="">--Sélectionnez une matière--</option>
              {MATIERES.map((matiere) => (
                <option key={matiere} value={matiere}>
                  {matiere}
                </option>
              ))}
            </select>
          </div>

          {/* Enseignant */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Enseignant</label>
            <select
              value={selectedEnseignant}
              onChange={(e) => setSelectedEnseignant(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200 bg-white"
            >
              <option value="">--Sélectionnez un enseignant--</option>
              {ENSEIGNANTS.map((enseignant) => (
                <option key={enseignant} value={enseignant}>
                  {enseignant}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Bouton Affecter */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleAffecter}
            disabled={!selectedMatiere || !selectedEnseignant}
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Affecter
          </button>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="flex justify-end">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Tableau des affectations */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Enseignant</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Matière</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Salle</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Année scolaire</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAffectations.map((affectation) => (
                <tr key={affectation.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{affectation.enseignant}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{affectation.matiere}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{affectation.salle}</td>
                  <td className="px-6 py-4 text-sm text-blue-600 font-medium">{affectation.annee}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleRetirer(affectation.id)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors duration-200 text-sm"
                    >
                      <X className="w-4 h-4" />
                      Retirer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAffectations.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucune affectation trouvée</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
