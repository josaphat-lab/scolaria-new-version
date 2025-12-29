import React, { useState } from 'react';
import { ArrowLeft, BookOpen, Download, FileSpreadsheet, User, GraduationCap, Calendar, Hash, Users } from 'lucide-react';

interface MatiereNote {
  matiere: string;
  coefficient: number;
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

const NOTES_DATA: MatiereNote[] = [
  { matiere: 'Philo', coefficient: 2.0, nepe1: 8, nepe2: 13, nepe3: '***', nepe4: '***', mepe: 10.5, nps1: 7, nps2: 6, ms: 7.83, msc: 15.67, rang: '38 è' },
  { matiere: 'PCT', coefficient: 4.0, nepe1: 11, nepe2: 10, nepe3: '***', nepe4: '***', mepe: 10.5, nps1: 6, nps2: 7, ms: 7.83, msc: 31.33, rang: '13 è' },
  { matiere: 'Hist Géo', coefficient: 2.0, nepe1: 8, nepe2: 3, nepe3: '***', nepe4: '***', mepe: 5.5, nps1: 10, nps2: 11, ms: 8.83, msc: 17.67, rang: '43 è' },
  { matiere: 'EPS', coefficient: 1.0, nepe1: 13, nepe2: 13, nepe3: '***', nepe4: '***', mepe: 13, nps1: 16, nps2: 16, ms: 15, msc: 15, rang: '11 è' },
  { matiere: 'Anglais', coefficient: 2.0, nepe1: 11, nepe2: 12, nepe3: '***', nepe4: '***', mepe: 11.5, nps1: 8, nps2: 9, ms: 9.5, msc: 19, rang: '41 è' },
  { matiere: 'Français', coefficient: 2.0, nepe1: 4, nepe2: 14, nepe3: '***', nepe4: '***', mepe: 9, nps1: 6, nps2: 7, ms: 7.33, msc: 14.67, rang: '37 è' },
  { matiere: 'Maths', coefficient: 4.0, nepe1: 7, nepe2: 2, nepe3: 4.5, nepe4: '***', mepe: 4.5, nps1: 7, nps2: 7, ms: 6.17, msc: 24.67, rang: '24 è' },
  { matiere: 'SVT', coefficient: 5.0, nepe1: 10, nepe2: 10, nepe3: '***', nepe4: '***', mepe: 10, nps1: 6, nps2: 6, ms: 7.33, msc: 36.67, rang: '40 è' },
  { matiere: 'Conduite', coefficient: 1.0, nepe1: '***', nepe2: '***', nepe3: '***', nepe4: '***', mepe: '***', nps1: 11, nps2: '***', ms: 11, msc: 11, rang: '44 è' },
];

const ANNEES = ['2024-2025', '2025-2026', '2026-2027'];
const CLASSES = ['Tle D1', 'Tle D2', 'Tle C', '6ème MA', '5ème MA'];
const ELEVES = [
  'ADOUNSIBA Biowa Will Roméo',
  'HOUNYE Mahoussi Sidonie',
  'AGBODJAN Marie-Claire',
  'KOUDJO Samuel'
];

export const CahierNote: React.FC = () => {
  const [selectedAnnee, setSelectedAnnee] = useState('');
  const [selectedClasse, setSelectedClasse] = useState('');
  const [selectedEleve, setSelectedEleve] = useState('');
  const [selectedSemestre, setSelectedSemestre] = useState('1');
  const [showResults, setShowResults] = useState(false);

  const handleSubmit = () => {
    if (selectedAnnee && selectedClasse && selectedEleve) {
      setShowResults(true);
    }
  };

  const handleBack = () => {
    setShowResults(false);
  };

  const totalCoefficient = NOTES_DATA.reduce((sum, note) => sum + note.coefficient, 0);
  const totalMSC = NOTES_DATA.reduce((sum, note) => sum + note.msc, 0);
  const moyenneGenerale = (totalMSC / totalCoefficient).toFixed(2);

  if (showResults) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
          <h2 className="text-2xl font-bold text-gray-900">Cahier de notes</h2>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg">
              <Download className="w-4 h-4" />
              Exporter en PDF
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg">
              <FileSpreadsheet className="w-4 h-4" />
              Exporter en Excel
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border-2 border-teal-200 overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-emerald-600 px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="text-white">
                <h3 className="text-2xl font-bold mb-2">CEG DOWA</h3>
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex items-center gap-1">
                    <GraduationCap className="w-4 h-4" />
                    Classe: <strong>{selectedClasse}</strong>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedAnnee}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    Effectif: <strong>44</strong>
                  </span>
                </div>
              </div>
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-xl">
                <User className="w-16 h-16 text-gray-400" />
              </div>
            </div>
          </div>

          <div className="px-8 py-6 bg-gradient-to-br from-gray-50 to-white">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Nom</p>
                <p className="font-bold text-gray-900">ADOUNSIBA</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Prénom(s)</p>
                <p className="font-bold text-gray-900">Biowa Will Roméo</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Sexe</p>
                <p className="font-bold text-gray-900">M</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Statut</p>
                <p className="font-bold text-teal-600">Redoublant (e) : OUI</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200 md:col-span-2">
                <p className="text-xs text-gray-600 mb-1">Matricule</p>
                <p className="font-bold text-gray-900 flex items-center gap-2">
                  <Hash className="w-4 h-4 text-gray-500" />
                  105090055524
                </p>
              </div>
            </div>

            <div className="text-center mb-6">
              <h4 className="text-xl font-bold text-gray-900 bg-gradient-to-r from-teal-100 to-emerald-100 py-3 rounded-lg border-2 border-teal-200">
                RÉCAPITULATIF DES NOTES DU {selectedSemestre === '1' ? 'PREMIER' : 'SECOND'} SEMESTRE
              </h4>
            </div>

            <div className="overflow-x-auto rounded-xl shadow-lg border-2 border-teal-200">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-teal-600 to-emerald-700 text-white">
                    <th className="px-4 py-3 text-left text-sm font-bold">MATIÈRES</th>
                    <th className="px-3 py-3 text-center text-sm font-bold">Cf</th>
                    <th colSpan={4} className="px-3 py-3 text-center text-sm font-bold border-l border-white/20">
                      Evaluations Ponctuelles d'Étape
                    </th>
                    <th className="px-3 py-3 text-center text-sm font-bold border-l border-white/20">MEPE</th>
                    <th colSpan={2} className="px-3 py-3 text-center text-sm font-bold border-l border-white/20">
                      Prod. Scolaires
                    </th>
                    <th className="px-3 py-3 text-center text-sm font-bold border-l border-white/20">MS</th>
                    <th className="px-3 py-3 text-center text-sm font-bold border-l border-white/20">MSC</th>
                    <th className="px-3 py-3 text-center text-sm font-bold border-l border-white/20">Rang</th>
                  </tr>
                  <tr className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
                    <th className="px-4 py-2"></th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2 text-center text-xs">NEPE1</th>
                    <th className="px-3 py-2 text-center text-xs">NEPE2</th>
                    <th className="px-3 py-2 text-center text-xs">NEPE3</th>
                    <th className="px-3 py-2 text-center text-xs border-r border-white/20">NEPE4</th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2 text-center text-xs">NPS1</th>
                    <th className="px-3 py-2 text-center text-xs border-r border-white/20">NPS2</th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                    <th className="px-3 py-2"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {NOTES_DATA.map((note, index) => (
                    <tr
                      key={index}
                      className={`transition-colors duration-150 ${
                        index % 2 === 0 ? 'bg-white hover:bg-teal-50' : 'bg-gray-50 hover:bg-teal-50'
                      }`}
                    >
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900">{note.matiere}</td>
                      <td className="px-3 py-3 text-sm text-center text-gray-700">{note.coefficient}</td>
                      <td className="px-3 py-3 text-sm text-center font-medium text-gray-900">{note.nepe1}</td>
                      <td className="px-3 py-3 text-sm text-center font-medium text-gray-900">{note.nepe2}</td>
                      <td className="px-3 py-3 text-sm text-center font-medium text-gray-900">{note.nepe3}</td>
                      <td className="px-3 py-3 text-sm text-center font-medium text-gray-900 border-r border-gray-200">{note.nepe4}</td>
                      <td className="px-3 py-3 text-sm text-center font-bold text-teal-600">{note.mepe}</td>
                      <td className="px-3 py-3 text-sm text-center font-medium text-gray-900">{note.nps1}</td>
                      <td className="px-3 py-3 text-sm text-center font-medium text-gray-900 border-r border-gray-200">{note.nps2}</td>
                      <td className="px-3 py-3 text-sm text-center font-bold text-teal-700">{note.ms}</td>
                      <td className="px-3 py-3 text-sm text-center font-bold text-emerald-600">{note.msc}</td>
                      <td className="px-3 py-3 text-center">
                        <span className="inline-flex items-center px-2 py-1 rounded-full bg-teal-100 text-teal-800 font-bold text-xs">
                          {note.rang}
                        </span>
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-gradient-to-r from-teal-100 to-emerald-100 font-bold">
                    <td className="px-4 py-4 text-sm text-gray-900">Total</td>
                    <td className="px-3 py-4 text-sm text-center text-gray-900">{totalCoefficient}</td>
                    <td colSpan={4} className="px-3 py-4 text-sm text-center text-emerald-700 font-bold text-lg">
                      {totalMSC.toFixed(2)}
                    </td>
                    <td className="px-3 py-4"></td>
                    <td colSpan={2} className="px-3 py-4"></td>
                    <td className="px-3 py-4 text-sm text-center text-teal-700 font-bold text-lg">{moyenneGenerale}</td>
                    <td className="px-3 py-4"></td>
                    <td className="px-3 py-4 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r from-teal-600 to-emerald-700 text-white font-bold text-sm">
                        39 è
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 text-center text-xs text-gray-500">
              Edition Logiciel Scola-ria Manager PROSPERIUM
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Cahier de notes</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Consulter le cahier de notes d'un élève
          </h3>
          <p className="text-gray-600">
            Sélectionnez l'année scolaire, la classe, l'élève et le semestre
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sélectionner une année scolaire
            </label>
            <select
              value={selectedAnnee}
              onChange={(e) => setSelectedAnnee(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white"
            >
              <option value="">--select--</option>
              {ANNEES.map((annee) => (
                <option key={annee} value={annee}>
                  {annee}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Choisir la classe
            </label>
            <select
              value={selectedClasse}
              onChange={(e) => setSelectedClasse(e.target.value)}
              disabled={!selectedAnnee}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
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
              Élève
            </label>
            <select
              value={selectedEleve}
              onChange={(e) => setSelectedEleve(e.target.value)}
              disabled={!selectedClasse}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
            >
              <option value="">--select--</option>
              {ELEVES.map((eleve) => (
                <option key={eleve} value={eleve}>
                  {eleve}
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

        <div className="flex justify-center pt-8">
          <button
            onClick={handleSubmit}
            disabled={!selectedAnnee || !selectedClasse || !selectedEleve}
            className={`px-8 py-3 rounded-lg font-bold text-white shadow-lg transition-all duration-200 ${
              selectedAnnee && selectedClasse && selectedEleve
                ? 'bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 hover:shadow-xl'
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Editer
          </button>
        </div>
      </div>
    </div>
  );
};
