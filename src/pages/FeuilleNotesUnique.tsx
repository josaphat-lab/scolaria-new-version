import React, { useState } from 'react';
import { ArrowLeft, FileText, Download, FileSpreadsheet } from 'lucide-react';

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

const STUDENTS_DATA: StudentGrade[] = [
  { id: '1', nom: 'ABIDJO', prenom: 'Abdel Babatoundé', statut: 'N', sexe: 'M', nepe1: 15, nepe2: 4, nepe3: '***', nepe4: '***', mepe: 9.5, nps1: 12, nps2: '***', ms: 7.17, msc: 28.67, rang: '15e' },
  { id: '2', nom: 'ABOTO', prenom: 'Vignon Cadnel Auxence', statut: 'N', sexe: 'M', nepe1: 10, nepe2: 5, nepe3: '***', nepe4: '***', mepe: 7.5, nps1: 12, nps2: '***', ms: 6.5, msc: 26, rang: '23e' },
  { id: '3', nom: 'ADIKO TINI', prenom: 'H. Arielle', statut: 'N', sexe: 'F', nepe1: 14, nepe2: 10, nepe3: '***', nepe4: '***', mepe: 12, nps1: 12, nps2: '***', ms: 8, msc: 32, rang: '10e' },
  { id: '4', nom: 'ADYMITON', prenom: 'Agognon Achirinambo Alafia Amen', statut: 'N', sexe: 'M', nepe1: 11, nepe2: 8, nepe3: '***', nepe4: '***', mepe: 9.5, nps1: 11, nps2: '***', ms: 6.83, msc: 27.33, rang: '18e' },
  { id: '5', nom: 'AGBOTOEDO', prenom: 'Yémalin Eric', statut: 'N', sexe: 'M', nepe1: 11, nepe2: '***', nepe3: '***', nepe4: '***', mepe: 5.5, nps1: 11, nps2: '***', ms: 5.5, msc: 22, rang: '28e' },
  { id: '6', nom: 'AGUEH', prenom: 'Cyrius Ronald Mahougnon', statut: 'N', sexe: 'M', nepe1: 15, nepe2: 5, nepe3: '***', nepe4: '***', mepe: 10, nps1: 18, nps2: '***', ms: 9.33, msc: 37.33, rang: '5e' },
  { id: '7', nom: 'AKODJENOU', prenom: 'senami Abigaelle', statut: 'N', sexe: 'F', nepe1: 14, nepe2: 3, nepe3: '***', nepe4: '***', mepe: 8.5, nps1: 14, nps2: '***', ms: 7.5, msc: 30, rang: '13e' },
  { id: '8', nom: 'AKPACLA', prenom: 'Brandon Wanilo Pearl Témidayo', statut: 'N', sexe: 'M', nepe1: 11, nepe2: 10, nepe3: '***', nepe4: '***', mepe: 10.5, nps1: 15, nps2: '***', ms: 8.5, msc: 34, rang: '8e' },
];

const CLASSES = ['6ème MA', '6ème MB', '5ème MA', '5ème MB', '4ème MA', '3ème MA'];
const MATIERES = ['Mathématiques', 'Français', 'Anglais', 'Histoire-Géographie', 'SVT', 'Physique-Chimie', 'EPS'];

export const FeuilleNotesUnique: React.FC = () => {
  const [selectedClasse, setSelectedClasse] = useState('');
  const [selectedMatiere, setSelectedMatiere] = useState('');
  const [selectedSemestre, setSelectedSemestre] = useState('1');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = () => {
    if (selectedClasse && selectedMatiere && selectedSemestre) {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="space-y-6">
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
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg">
              <FileSpreadsheet className="w-4 h-4" />
              Exporter en excel
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg">
              <Download className="w-4 h-4" />
              Exporter en PDF
            </button>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-100 to-emerald-100 rounded-xl p-4 border-2 border-teal-200">
          <p className="text-gray-800 text-center">
            <span className="font-bold text-teal-700">{selectedMatiere}</span> - Classe{' '}
            <span className="font-bold text-teal-700">{selectedClasse}</span> - Semestre{' '}
            <span className="font-bold text-teal-700">{selectedSemestre}</span>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-teal-200">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
                  <th className="px-4 py-3 text-left text-sm font-bold">Nom</th>
                  <th className="px-4 py-3 text-left text-sm font-bold">Prénoms</th>
                  <th className="px-4 py-3 text-center text-sm font-bold">Statut</th>
                  <th className="px-4 py-3 text-center text-sm font-bold">Sexe</th>
                  <th className="px-4 py-3 text-center text-sm font-bold">NEPE1</th>
                  <th className="px-4 py-3 text-center text-sm font-bold">NEPE2</th>
                  <th className="px-4 py-3 text-center text-sm font-bold">NEPE3</th>
                  <th className="px-4 py-3 text-center text-sm font-bold">NEPE4</th>
                  <th className="px-4 py-3 text-center text-sm font-bold">MEPE</th>
                  <th className="px-4 py-3 text-center text-sm font-bold">NPS1</th>
                  <th className="px-4 py-3 text-center text-sm font-bold">NPS2</th>
                  <th className="px-4 py-3 text-center text-sm font-bold">MS</th>
                  <th className="px-4 py-3 text-center text-sm font-bold">MSC</th>
                  <th className="px-4 py-3 text-center text-sm font-bold">Rang</th>
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
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Obtenir la feuille de note</h3>
        <p className="text-gray-600">
          Sélectionnez une classe, une matière et un semestre pour afficher la feuille de notes correspondante
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            Choisir la matière
          </label>
          <select
            value={selectedMatiere}
            onChange={(e) => setSelectedMatiere(e.target.value)}
            disabled={!selectedClasse}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="">--select--</option>
            {MATIERES.map((matiere) => (
              <option key={matiere} value={matiere}>
                {matiere}
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
          disabled={!selectedClasse || !selectedMatiere}
          className={`px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all duration-200 ${
            selectedClasse && selectedMatiere
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
