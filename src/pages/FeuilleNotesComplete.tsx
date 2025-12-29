import React, { useState } from 'react';
import { ArrowLeft, GraduationCap, Phone } from 'lucide-react';

interface StudentGrade {
  id: string;
  nom: string;
  prenom: string;
  statut: string;
  sexe: 'M' | 'F';
  nepe1: number | string;
  nepe2: number | string;
  nepe3: number | string;
  nepe4: number | string;
  mepe: number | string;
  nps1: number | string;
  nps2: number | string;
  ms: number;
  msc: number;
  rang: string;
}

interface Matiere {
  nom: string;
  professeur: string;
  telephone: string;
}

const STUDENTS_DATA: StudentGrade[] = [
  { id: '1', nom: 'ABIDJO', prenom: 'Abdel Babatoundé', statut: 'N', sexe: 'M', nepe1: 12.5, nepe2: 18, nepe3: '***', nepe4: '***', mepe: 15.25, nps1: 13, nps2: '***', ms: 9.42, msc: 18.83, rang: '3e' },
  { id: '2', nom: 'ABOTO', prenom: 'Vignon Cadnel Auxence', statut: 'N', sexe: 'M', nepe1: 12.5, nepe2: 12, nepe3: '***', nepe4: '***', mepe: 12.25, nps1: 9, nps2: '***', ms: 7.08, msc: 14.17, rang: '28e' },
  { id: '3', nom: 'ADIKO TINI', prenom: 'H. Arielle', statut: 'N', sexe: 'F', nepe1: 15, nepe2: 18, nepe3: '***', nepe4: '***', mepe: 16.5, nps1: 9, nps2: '***', ms: 8.5, msc: 17, rang: '15e' },
  { id: '4', nom: 'ADYMITON', prenom: 'Agognon Achirinambo Alafia Amen', statut: 'N', sexe: 'M', nepe1: 18, nepe2: 16, nepe3: '***', nepe4: '***', mepe: 17, nps1: 11, nps2: '***', ms: 9.33, msc: 18.67, rang: '4e' },
  { id: '5', nom: 'AGBOTOEDO', prenom: 'Yémalin Eric', statut: 'N', sexe: 'M', nepe1: 17.5, nepe2: 14, nepe3: '***', nepe4: '***', mepe: 15.75, nps1: 10, nps2: '***', ms: 8.58, msc: 17.17, rang: '14e' },
  { id: '6', nom: 'AGUEH', prenom: 'Cyrius Ronald Mahougnon', statut: 'N', sexe: 'M', nepe1: 15, nepe2: 12, nepe3: '***', nepe4: '***', mepe: 13.5, nps1: 11, nps2: '***', ms: 8.17, msc: 16.33, rang: '18e' },
  { id: '7', nom: 'AKODJENOU', prenom: 'senami Abigaelle', statut: 'N', sexe: 'F', nepe1: 15, nepe2: 20, nepe3: '***', nepe4: '***', mepe: 17.5, nps1: 10, nps2: '***', ms: 9.17, msc: 18.33, rang: '6e' },
  { id: '8', nom: 'AKPACLA', prenom: 'Brandon Wanilo Pearl Témidayo', statut: 'N', sexe: 'M', nepe1: 5, nepe2: 16, nepe3: '***', nepe4: '***', mepe: 10.5, nps1: 8, nps2: '***', ms: 6.17, msc: 12.33, rang: '35e' },
];

const MATIERES: Matiere[] = [
  { nom: 'Anglais', professeur: 'SOUFIANO Al-Bariyou T.', telephone: '0197770322' },
  { nom: 'Français', professeur: 'ZOUNTANGNI Veunance Pilippe-Jacques', telephone: 'Téléphone non renseigné' },
  { nom: 'Mathématiques', professeur: 'DOSSOUMOU Jean-Claude', telephone: '0197823456' },
  { nom: 'Histoire-Géographie', professeur: 'AGBODJAN Marie-Claire', telephone: '0198765432' },
  { nom: 'SVT', professeur: 'KOUDJO Samuel', telephone: '0196543210' },
];

const CLASSES = ['6ème MA', '6ème MB', '5ème MA', '5ème MB', '4ème MA', '3ème MA'];

export const FeuilleNotesComplete: React.FC = () => {
  const [selectedClasse, setSelectedClasse] = useState('');
  const [selectedSemestre, setSelectedSemestre] = useState('1');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = () => {
    if (selectedClasse && selectedSemestre) {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            Gestion des notes du semestre {selectedSemestre}
          </h2>
          <div className="w-32"></div>
        </div>

        <div className="bg-gradient-to-r from-teal-100 to-emerald-100 rounded-xl p-4 border-2 border-teal-200">
          <p className="text-gray-800 text-center text-lg">
            Feuille complète - Classe{' '}
            <span className="font-bold text-teal-700">{selectedClasse}</span> - Semestre{' '}
            <span className="font-bold text-teal-700">{selectedSemestre}</span>
          </p>
        </div>

        {MATIERES.map((matiere, matiereIndex) => (
          <div key={matiereIndex} className="space-y-4">
            <div className="bg-gradient-to-r from-teal-500 to-emerald-600 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold mb-1">{matiere.nom}</h3>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-2">
                        <span className="font-semibold">Professeur:</span> {matiere.professeur}
                      </span>
                      <span className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {matiere.telephone}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-xl overflow-hidden border-2 border-teal-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-800">Nom</th>
                      <th className="px-4 py-3 text-left text-sm font-bold text-gray-800">Prénoms</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-800">Statut</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-800">Sexe</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-800">NEPE1</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-800">NEPE2</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-800">NEPE3</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-800">NEPE4</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-800">MEPE</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-800">NPS1</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-800">NPS2</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-800">MS</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-800">MSC</th>
                      <th className="px-4 py-3 text-center text-sm font-bold text-gray-800">Rang</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {STUDENTS_DATA.map((student, index) => (
                      <tr
                        key={student.id}
                        className={`transition-colors duration-150 ${
                          index % 2 === 0 ? 'bg-white hover:bg-teal-50' : 'bg-gray-50 hover:bg-teal-50'
                        }`}
                      >
                        <td className="px-4 py-3 text-sm text-gray-900 font-medium">{student.nom}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{student.prenom}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center">{student.statut}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center">{student.sexe}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center font-semibold">{student.nepe1}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center font-semibold">{student.nepe2}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center font-semibold">{student.nepe3}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center font-semibold">{student.nepe4}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center font-semibold">{student.mepe}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center font-semibold">{student.nps1}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center font-semibold">{student.nps2}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center font-bold text-teal-600">{student.ms}</td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-center font-bold text-teal-600">{student.msc}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-teal-100 text-teal-800 font-bold text-sm">
                            {student.rang}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Obtenir la feuille de note complète</h3>
        <p className="text-gray-600">
          Sélectionnez une classe et un semestre pour afficher toutes les feuilles de notes de toutes les matières
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Choisir la classe
          </label>
          <select
            value={selectedClasse}
            onChange={(e) => setSelectedClasse(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
          >
            <option value="">--select--</option>
            {CLASSES.map((classe) => (
              <option key={classe} value={classe}>
                {classe}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Choisir le semestre
          </label>
          <select
            value={selectedSemestre}
            onChange={(e) => setSelectedSemestre(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
          >
            <option value="1">Semestre 1</option>
            <option value="2">Semestre 2</option>
          </select>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          onClick={handleSubmit}
          disabled={!selectedClasse}
          className={`px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all duration-200 ${
            selectedClasse
              ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 hover:shadow-xl'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Afficher la feuille de note
        </button>
      </div>
    </div>
  );
};
