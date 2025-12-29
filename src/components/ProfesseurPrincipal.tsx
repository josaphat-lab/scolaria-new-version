import React, { useState } from 'react';
import { ArrowLeft, Award, GraduationCap } from 'lucide-react';

interface ClasseCard {
  id: string;
  name: string;
  niveau: string;
}

interface Enseignant {
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
  { id: '6me', name: '6ème ME', niveau: '6ème' },
  { id: '6mf', name: '6ème MF', niveau: '6ème' },
  { id: '5ma', name: '5ème MA', niveau: '5ème' },
  { id: '5mb', name: '5ème MB', niveau: '5ème' },
  { id: '4ma', name: '4ème MA', niveau: '4ème' },
  { id: '4mb', name: '4ème MB', niveau: '4ème' },
  { id: '3ma', name: '3ème MA', niveau: '3ème' },
  { id: '3mb', name: '3ème MB', niveau: '3ème' },
  { id: '2ma', name: '2nde MA', niveau: '2nde' },
  { id: '1ma', name: '1ère MA', niveau: '1ère' },
  { id: 'tma', name: 'Tle MA', niveau: 'Tle' },
];

const ENSEIGNANTS_BY_CLASS: Record<string, Enseignant[]> = {
  '6ma': [
    { id: '1', nom: 'AGBIGONON', prenom: 'Romuald', matiere: 'Education Physique et Sportive (EPS)' },
    { id: '2', nom: 'ADJOVI', prenom: 'Zinsou Ange', matiere: 'Mathématiques (Maths)' },
    { id: '3', nom: 'AHOUNOU', prenom: 'Rosaline', matiere: 'Anglais (Anglais)' },
    { id: '4', nom: 'YETONHEGNON', prenom: 'Mahoutin Désiré', matiere: 'Français (Français)' },
    { id: '5', nom: 'ABOTO', prenom: 'Henri', matiere: 'Histoire Géographie (Hist Géo)' },
    { id: '6', nom: 'MENSAH', prenom: 'Codjovi Mathias', matiere: 'Sciences de la Vie et de la Terre (SVT)' },
    { id: '7', nom: 'SOUNOUVI', prenom: 'F. Félicien', matiere: 'Physique Chimie et Technologie (PCT)' },
  ],
  '6mb': [
    { id: '1', nom: 'KPOSSATON', prenom: 'David', matiere: 'Histoire Géographie' },
    { id: '2', nom: 'METOGNON', prenom: 'Jacques', matiere: 'Français' },
    { id: '3', nom: 'AKOTO', prenom: 'Emmanuel', matiere: 'Espagnol' },
  ],
};

const PP_ACTUEL: Record<string, string> = {
  '6ma': 'YETONHEGNON Mahoutin Désiré',
};

export const ProfesseurPrincipal: React.FC = () => {
  const [selectedNiveau, setSelectedNiveau] = useState<string>('6ème');
  const [selectedClasse, setSelectedClasse] = useState<ClasseCard | null>(null);
  const [selectedPP, setSelectedPP] = useState<string>('');

  const niveaux = ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Tle'];

  const filteredClasses = CLASSES_DATA.filter(
    (classe) => classe.niveau === selectedNiveau
  );

  const handleSelectClasse = (classe: ClasseCard) => {
    setSelectedClasse(classe);
    setSelectedPP('');
  };

  const handleDefinirPP = () => {
    if (selectedPP) {
      console.log(`PP défini pour ${selectedClasse?.name}: ${selectedPP}`);
      alert(`Professeur principal défini avec succès!`);
    }
  };

  const enseignants = selectedClasse ? ENSEIGNANTS_BY_CLASS[selectedClasse.id] || [] : [];
  const ppActuel = selectedClasse ? PP_ACTUEL[selectedClasse.id] : null;

  if (!selectedClasse) {
    return (
      <div className="space-y-6">
        <p className="text-gray-600">
          Veuillez <span className="text-teal-600 font-semibold">sélectionner une classe</span> pour définir son professeur principal.
        </p>

        {/* Tabs de niveau */}
        <div className="flex gap-2 flex-wrap">
          {niveaux.map((niveau) => (
            <button
              key={niveau}
              onClick={() => setSelectedNiveau(niveau)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedNiveau === niveau
                  ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-rose-500 hover:shadow-md'
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
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-rose-500 hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-pink-200 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-rose-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-rose-600 transition-colors">
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
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-200 shadow-lg"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour
      </button>

      {/* Titre */}
      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Définir le professeur principal de la <span className="text-rose-600">{selectedClasse.name}</span>
      </h2>

      {/* PP Actuel */}
      {ppActuel && (
        <div className="bg-gradient-to-r from-rose-50 to-pink-50 border-l-4 border-rose-500 p-4 rounded-r-lg">
          <p className="text-gray-800">
            Le professeur principal de cette salle est: <span className="font-bold text-rose-700">{ppActuel}</span>
          </p>
        </div>
      )}

      {/* Formulaire de sélection PP */}
      <div className="bg-white rounded-xl shadow-lg p-6 border-2 border-rose-100">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-lg flex items-center justify-center">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Définir le professeur principal</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sélectionnez un enseignant
            </label>
            <select
              value={selectedPP}
              onChange={(e) => setSelectedPP(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all duration-200 bg-white"
            >
              <option value="">-- Choisir un enseignant --</option>
              {enseignants.map((ens) => (
                <option key={ens.id} value={`${ens.nom} ${ens.prenom}`}>
                  {ens.nom} {ens.prenom} - {ens.matiere}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-end">
            <button
              onClick={handleDefinirPP}
              disabled={!selectedPP}
              className="px-8 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-lg font-semibold hover:from-rose-600 hover:to-pink-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              Définir le PP
            </button>
          </div>
        </div>
      </div>

      {/* Liste des enseignants */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">Liste des enseignants de la salle</h3>

        {enseignants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enseignants.map((enseignant) => (
              <div
                key={enseignant.id}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-rose-400 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-gray-900 group-hover:text-rose-600 transition-colors truncate">
                      {enseignant.nom} {enseignant.prenom}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      Matière: <span className="font-medium text-teal-600">{enseignant.matiere}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-12 text-center">
            <GraduationCap className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Aucun enseignant affecté à cette classe</p>
          </div>
        )}
      </div>
    </div>
  );
};
