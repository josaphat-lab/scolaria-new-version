import React, { useState } from 'react';
import { FileText, Download, FileSpreadsheet } from 'lucide-react';

type Tab = 'etablissement' | 'devoir';

export const Bilan: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('etablissement');
  const [anneeScolaire, setAnneeScolaire] = useState('2024-2025');
  const [semestre, setSemestre] = useState('Semestre 1');
  const [showResults, setShowResults] = useState(false);

  const [devoirAnneeScolaire, setDevoirAnneeScolaire] = useState('2024-2025');
  const [devoirSemestre, setDevoirSemestre] = useState('Semestre 1');
  const [devoir, setDevoir] = useState('Devoir 1');
  const [promotion, setPromotion] = useState('6ème');
  const [showDevoirResults, setShowDevoirResults] = useState(false);

  const anneesScolaires = ['2023-2024', '2024-2025', '2025-2026'];
  const semestres = ['Semestre 1', 'Semestre 2'];
  const devoirs = ['Devoir 1', 'Devoir 2', 'Devoir 3', 'Devoir 4'];
  const promotions = ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Tle'];

  const generateBilanData = () => {
    return [
      { cycle: '1er Cycle', classe: '6ème M1', inscrits: 64, abandons: 1, presents: 63, moy_inf_6_5: 0, moy_6_5_10: 8, moy_sup_10: 55, taux: '87.3%', forte: 17.83, meritant: 'ZANFONGNON Malikath Alakè Alissa', faible: 7.19, pp: 'ZOUNNON Florent S.' },
      { cycle: '1er Cycle', classe: '6ème M2', inscrits: 62, abandons: 0, presents: 62, moy_inf_6_5: 0, moy_6_5_10: 10, moy_sup_10: 52, taux: '83.87%', forte: 17.32, meritant: 'QUENUM Leonel Yohann Mawudo', faible: 7.2, pp: 'HOUNGUE M. Florentine' },
      { cycle: '1er Cycle', classe: '6ème M3', inscrits: 64, abandons: 1, presents: 63, moy_inf_6_5: 0, moy_6_5_10: 10, moy_sup_10: 53, taux: '84.13%', forte: 17.81, meritant: 'KODJO Glory King-Christ Godsson', faible: 8.78, pp: 'ZOHOUNHEKPE D. Robert' },
      { cycle: '1er Cycle', classe: '5ème M1', inscrits: 58, abandons: 1, presents: 57, moy_inf_6_5: 0, moy_6_5_10: 0, moy_sup_10: 57, taux: '100%', forte: 17.93, meritant: 'AGBODJOU Mahuvi Hélène', faible: 10.39, pp: 'AHOUANSOU A. Caroline' },
      { cycle: '1er Cycle', classe: '5ème M2', inscrits: 57, abandons: 0, presents: 57, moy_inf_6_5: 0, moy_6_5_10: 1, moy_sup_10: 56, taux: '98.25%', forte: 15.49, meritant: 'GBAGUIDI Angella Mahouwanou', faible: 9.83, pp: 'TOUDONOU Toundé José' },
      { cycle: '1er Cycle', classe: '4ème M1', inscrits: 63, abandons: 0, presents: 63, moy_inf_6_5: 0, moy_6_5_10: 1, moy_sup_10: 62, taux: '98.41%', forte: 18.81, meritant: 'GANHOU Caleb Théorhéma Doudédji', faible: 8.55, pp: 'HONFO M. Estelle' },
      { cycle: '1er Cycle', classe: '4ème M2', inscrits: 64, abandons: 1, presents: 63, moy_inf_6_5: 0, moy_6_5_10: 6, moy_sup_10: 58, taux: '92.06%', forte: 14.28, meritant: 'HOUESSOU Yémalin Romain', faible: 9.16, pp: 'HOUETCHENOU Miercolès' },
      { cycle: '1er Cycle', classe: '3ème M1', inscrits: 52, abandons: 0, presents: 52, moy_inf_6_5: 0, moy_6_5_10: 11, moy_sup_10: 41, taux: '78.85%', forte: 16.8, meritant: 'ZANFONGNON Samirath Morènikè', faible: 8.15, pp: 'DAOUDA Malick' },
      { cycle: '2nd Cycle', classe: '2nde A2A', inscrits: 58, abandons: 0, presents: 58, moy_inf_6_5: 0, moy_6_5_10: 31, moy_sup_10: 27, taux: '46.55%', forte: 12.27, meritant: 'HOUNMAVO Gbènonsédè Cyriaque', faible: 7.02, pp: 'OGOUCHINA O. I. Hélène' },
      { cycle: '2nd Cycle', classe: '2nde C1', inscrits: 22, abandons: 0, presents: 22, moy_inf_6_5: 0, moy_6_5_10: 2, moy_sup_10: 20, taux: '90.91%', forte: 16.6, meritant: 'DANTCHIGBE Moïse Dieu-Donné', faible: 8.68, pp: 'ADELEYE A. Adétola' },
      { cycle: '2nd Cycle', classe: '1ère A2Alpha', inscrits: 50, abandons: 2, presents: 48, moy_inf_6_5: 0, moy_6_5_10: 26, moy_sup_10: 22, taux: '45.83%', forte: 12.6, meritant: 'ALLAGBE Jesugnon Georges', faible: 8.4, pp: 'LOKONON D. Gérémie' },
      { cycle: '2nd Cycle', classe: '1ère C1', inscrits: 31, abandons: 0, presents: 31, moy_inf_6_5: 1, moy_6_5_10: 9, moy_sup_10: 21, taux: '67.74%', forte: 15.91, meritant: 'GANHOU Akpenin Josué Glorieux', faible: 6.49, pp: 'KOTTIN Edouard M.' },
      { cycle: '2nd Cycle', classe: 'Tle A2Alpha', inscrits: 50, abandons: 0, presents: 50, moy_inf_6_5: 0, moy_6_5_10: 26, moy_sup_10: 24, taux: '48%', forte: 13.78, meritant: 'FINAGNON Bill Wayne', faible: 6.87, pp: 'TOGNON M. Philippe' },
      { cycle: '2nd Cycle', classe: 'Tle C1', inscrits: 27, abandons: 0, presents: 27, moy_inf_6_5: 0, moy_6_5_10: 10, moy_sup_10: 17, taux: '62.96%', forte: 14.58, meritant: 'BODJRENOU Dayo Fiacre', faible: 7.26, pp: 'GOVOECHAN Emmanuel' }
    ];
  };

  const generateDevoirData = () => {
    const classes: { [key: string]: string[] } = {
      '6ème': ['6ème M1', '6ème M2', '6ème M3', '6ème M4', '6ème M5'],
      '5ème': ['5ème M1', '5ème M2', '5ème M3', '5ème MA'],
      '4ème': ['4ème M1', '4ème M2', '4ème M3', '4ème MA'],
      '3ème': ['3ème M1', '3ème M2', '3ème M3', '3ème MA'],
      '2nde': ['2nde A2A', '2nde A2B', '2nde C1', '2nde D1'],
      '1ère': ['1ère A2Alpha', '1ère B1', '1ère C1', '1ère D1'],
      'Tle': ['Tle A2A', 'Tle B1', 'Tle C1', 'Tle D1', 'Tle D2', 'Tle D3', 'Tle A2Beta']
    };

    return classes[promotion].map((classe, index) => ({
      classe,
      g: Math.floor(Math.random() * 15) + 10,
      f: Math.floor(Math.random() * 15) + 10,
      t: 0,
      note_inf_7_g: Math.floor(Math.random() * 3),
      note_inf_7_f: Math.floor(Math.random() * 3),
      note_inf_7_t: 0,
      note_7_10_g: Math.floor(Math.random() * 8) + 2,
      note_7_10_f: Math.floor(Math.random() * 8) + 2,
      note_7_10_t: 0,
      note_10_12_g: Math.floor(Math.random() * 6) + 2,
      note_10_12_f: Math.floor(Math.random() * 6) + 2,
      note_10_12_t: 0,
      note_12_15_g: Math.floor(Math.random() * 4),
      note_12_15_f: Math.floor(Math.random() * 4),
      note_12_15_t: 0,
      note_sup_15_g: Math.floor(Math.random() * 2),
      note_sup_15_f: Math.floor(Math.random() * 2),
      note_sup_15_t: 0,
      taux: `${Math.floor(Math.random() * 40) + 20}%`,
      forte: (Math.random() * 6 + 10).toFixed(2),
      meritant: index === 0 ? 'HOUEDANOU Midomitou Bénoîte' : `ÉLÈVE ${index + 1}`,
      faible: (Math.random() * 5 + 3).toFixed(2),
      moins_meritant: index === 0 ? 'ASSOGBA Kèyindé Jaëlle' : `ÉLÈVE ${index + 10}`
    })).map(row => ({
      ...row,
      t: row.g + row.f,
      note_inf_7_t: row.note_inf_7_g + row.note_inf_7_f,
      note_7_10_t: row.note_7_10_g + row.note_7_10_f,
      note_10_12_t: row.note_10_12_g + row.note_10_12_f,
      note_12_15_t: row.note_12_15_g + row.note_12_15_f,
      note_sup_15_t: row.note_sup_15_g + row.note_sup_15_f
    }));
  };

  const handleSuivant = () => {
    setShowResults(true);
  };

  const handleDevoirSuivant = () => {
    setShowDevoirResults(true);
  };

  const handleDownloadExcel = () => {
    const link = document.createElement('a');
    link.href = '/bilan_s1cegdowa_2024-2025.xlsx';
    link.download = `bilan_${anneeScolaire}_${semestre.replace(/\s+/g, '_')}.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadPdf = () => {
    const link = document.createElement('a');
    link.href = '/bilan_cegdowa_2024-2025_s1.pdf';
    link.download = `bilan_${anneeScolaire}_${semestre.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDevoirDownloadPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-lg shadow-md">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Bilan</h1>
          </div>
          <p className="text-gray-600 ml-14">Consultez les bilans d'établissement et par devoir</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <div className="flex">
              <button
                onClick={() => {
                  setActiveTab('etablissement');
                  setShowResults(false);
                  setShowDevoirResults(false);
                }}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'etablissement'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Bilan d'établissement
              </button>
              <button
                onClick={() => {
                  setActiveTab('devoir');
                  setShowResults(false);
                  setShowDevoirResults(false);
                }}
                className={`flex-1 px-6 py-4 text-sm font-semibold transition-colors ${
                  activeTab === 'devoir'
                    ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                Bilan par devoir
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'etablissement' ? (
              <div>
                {!showResults ? (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Bilan de fin de semestre et annuel</h2>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Sélectionner une année scolaire
                        </label>
                        <select
                          value={anneeScolaire}
                          onChange={(e) => setAnneeScolaire(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                          {anneesScolaires.map((annee) => (
                            <option key={annee} value={annee}>
                              {annee}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Choisir le semestre
                        </label>
                        <select
                          value={semestre}
                          onChange={(e) => setSemestre(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                          {semestres.map((sem) => (
                            <option key={sem} value={sem}>
                              {sem}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleSuivant}
                        className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl"
                      >
                        Afficher
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">CEG DOWA - Tableau Statistique des Résultats du 1er Semestre</h2>
                        <p className="text-gray-600">Année scolaire: {anneeScolaire}</p>
                      </div>
                      <button
                        onClick={() => setShowResults(false)}
                        className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        Retour
                      </button>
                    </div>

                    <div className="flex gap-4 mb-6">
                      <button
                        onClick={handleDownloadPdf}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl"
                      >
                        <FileText className="w-5 h-5" />
                        Exporter en PDF
                      </button>
                      <button
                        onClick={handleDownloadExcel}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl"
                      >
                        <FileSpreadsheet className="w-5 h-5" />
                        Exporter en Excel
                      </button>
                    </div>

                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Cycle</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Classe</th>
                            <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Inscrits</th>
                            <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Abandons</th>
                            <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Présents</th>
                            <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">MOY &lt;6.50</th>
                            <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">6.50≤MOY&lt;10</th>
                            <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">MOY≥10</th>
                            <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">%MOY≥10</th>
                            <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Forte MOY</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">Élève méritant</th>
                            <th className="px-4 py-3 text-center text-xs font-bold text-gray-700 uppercase">Faible MOY</th>
                            <th className="px-4 py-3 text-left text-xs font-bold text-gray-700 uppercase">PP</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {generateBilanData().map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm text-gray-900">{row.cycle}</td>
                              <td className="px-4 py-3 text-sm font-medium text-gray-900">{row.classe}</td>
                              <td className="px-4 py-3 text-sm text-center text-gray-900">{row.inscrits}</td>
                              <td className="px-4 py-3 text-sm text-center text-gray-900">{row.abandons}</td>
                              <td className="px-4 py-3 text-sm text-center text-gray-900">{row.presents}</td>
                              <td className="px-4 py-3 text-sm text-center text-gray-900">{row.moy_inf_6_5}</td>
                              <td className="px-4 py-3 text-sm text-center text-gray-900">{row.moy_6_5_10}</td>
                              <td className="px-4 py-3 text-sm text-center font-semibold text-green-600">{row.moy_sup_10}</td>
                              <td className="px-4 py-3 text-sm text-center font-semibold text-blue-600">{row.taux}</td>
                              <td className="px-4 py-3 text-sm text-center font-semibold text-indigo-600">{row.forte}</td>
                              <td className="px-4 py-3 text-sm text-gray-900">{row.meritant}</td>
                              <td className="px-4 py-3 text-sm text-center text-gray-900">{row.faible}</td>
                              <td className="px-4 py-3 text-sm text-gray-700">{row.pp}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {!showDevoirResults ? (
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">Bilan des devoirs</h2>
                    <p className="text-gray-600 mb-6">Veuillez sélectionner l'année scolaire et le semestre pour commencer.</p>

                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Sélectionner une année scolaire
                        </label>
                        <select
                          value={devoirAnneeScolaire}
                          onChange={(e) => setDevoirAnneeScolaire(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                          {anneesScolaires.map((annee) => (
                            <option key={annee} value={annee}>
                              {annee}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Choisir le semestre
                        </label>
                        <select
                          value={devoirSemestre}
                          onChange={(e) => setDevoirSemestre(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                          {semestres.map((sem) => (
                            <option key={sem} value={sem}>
                              {sem}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Choisir le devoir
                        </label>
                        <select
                          value={devoir}
                          onChange={(e) => setDevoir(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                          {devoirs.map((dev) => (
                            <option key={dev} value={dev}>
                              {dev}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Choisir la promotion
                        </label>
                        <select
                          value={promotion}
                          onChange={(e) => setPromotion(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        >
                          {promotions.map((promo) => (
                            <option key={promo} value={promo}>
                              {promo}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={handleDevoirSuivant}
                        className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl"
                      >
                        Suivant
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl font-bold text-gray-900">BILAN DU {devoir.toUpperCase()} DU {devoirSemestre.toUpperCase()} DES CLASSES DE {promotion.toUpperCase()}</h2>
                        <p className="text-gray-600">Année scolaire: {devoirAnneeScolaire}</p>
                      </div>
                      <button
                        onClick={() => setShowDevoirResults(false)}
                        className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Retour
                      </button>
                    </div>

                    <div className="flex gap-4 mb-6">
                      <button
                        onClick={handleDevoirDownloadPdf}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl"
                      >
                        <FileText className="w-5 h-5" />
                        Exporter en PDF
                      </button>
                    </div>

                    <div className="overflow-x-auto border border-gray-200 rounded-lg">
                      <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th rowSpan={2} className="px-3 py-3 text-center text-xs font-bold text-gray-700 uppercase border-r border-gray-300">
                              Classes
                            </th>
                            <th colSpan={3} className="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase border-r border-gray-300">
                              Présents
                            </th>
                            <th colSpan={3} className="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase border-r border-gray-300">
                              Note &lt;7
                            </th>
                            <th colSpan={3} className="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase border-r border-gray-300">
                              7&lt;=Note&lt;10
                            </th>
                            <th colSpan={3} className="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase border-r border-gray-300">
                              10&lt;=Note&lt;12
                            </th>
                            <th colSpan={3} className="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase border-r border-gray-300">
                              12&lt;=Note&lt;15
                            </th>
                            <th colSpan={3} className="px-3 py-2 text-center text-xs font-bold text-gray-700 uppercase border-r border-gray-300">
                              Note&gt;=15
                            </th>
                            <th rowSpan={2} className="px-3 py-3 text-center text-xs font-bold text-gray-700 uppercase border-r border-gray-300">
                              %Note&gt;=10
                            </th>
                            <th rowSpan={2} className="px-3 py-3 text-center text-xs font-bold text-gray-700 uppercase border-r border-gray-300">
                              Forte<br/>Note
                            </th>
                            <th rowSpan={2} className="px-3 py-3 text-center text-xs font-bold text-gray-700 uppercase border-r border-gray-300">
                              Élève plus<br/>méritant
                            </th>
                            <th rowSpan={2} className="px-3 py-3 text-center text-xs font-bold text-gray-700 uppercase border-r border-gray-300">
                              Faible<br/>Note
                            </th>
                            <th rowSpan={2} className="px-3 py-3 text-center text-xs font-bold text-gray-700 uppercase">
                              Élève moins<br/>méritant
                            </th>
                          </tr>
                          <tr>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">G</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">F</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">T</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">G</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">F</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">T</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">G</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">F</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">T</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">G</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">F</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">T</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">G</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">F</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">T</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">G</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">F</th>
                            <th className="px-2 py-2 text-center text-xs font-bold text-gray-700 border-r border-gray-300">T</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {generateDevoirData().map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-3 py-3 text-sm font-medium text-gray-900 border-r border-gray-200">{row.classe}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.g}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.f}</td>
                              <td className="px-2 py-3 text-sm text-center font-semibold text-gray-900 border-r border-gray-200">{row.t}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.note_inf_7_g}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.note_inf_7_f}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.note_inf_7_t}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.note_7_10_g}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.note_7_10_f}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.note_7_10_t}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.note_10_12_g}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.note_10_12_f}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.note_10_12_t}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.note_12_15_g}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.note_12_15_f}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.note_12_15_t}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.note_sup_15_g}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.note_sup_15_f}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.note_sup_15_t}</td>
                              <td className="px-2 py-3 text-sm text-center font-semibold text-blue-600 border-r border-gray-200">{row.taux}</td>
                              <td className="px-2 py-3 text-sm text-center font-semibold text-indigo-600 border-r border-gray-200">{row.forte}</td>
                              <td className="px-3 py-3 text-sm text-gray-900 border-r border-gray-200">{row.meritant}</td>
                              <td className="px-2 py-3 text-sm text-center text-gray-900 border-r border-gray-200">{row.faible}</td>
                              <td className="px-3 py-3 text-sm text-gray-700">{row.moins_meritant}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
