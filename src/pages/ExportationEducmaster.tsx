import React, { useState } from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

export const ExportationEducmaster: React.FC = () => {
  const [anneeScolaire, setAnneeScolaire] = useState('2024-2025');
  const [classe, setClasse] = useState('6ème M2');
  const [semestre, setSemestre] = useState('Semestre 1');

  const anneesScolaires = ['2023-2024', '2024-2025', '2025-2026'];
  const classes = ['6ème MA', '6ème M2', '5ème MA', '4ème MA', '3ème MA', 'Tle A', 'Tle C'];
  const semestres = ['Semestre 1', 'Semestre 2'];

  // Données fictives pour les élèves
  const generateStudentsData = () => {
    const students = [
      { matricule: '2141023218314', nom: 'ADANKON', prenom: 'Mahouna Chimène' },
      { matricule: '1141023141727', nom: 'ADEDIRAN', prenom: 'Abdel Roqib Bodunrin Kolawolé' },
      { matricule: '212120346800', nom: 'ADJALLA', prenom: 'Kpèdetin Fanny Elsi' },
      { matricule: '2131023073341', nom: 'ADJIHOUNDE', prenom: 'Yinassou Loraine Janelle' },
      { matricule: '1141023039961', nom: 'ADJOVI', prenom: 'Bidossèssi Boris' },
      { matricule: '1141023105506', nom: 'ADJOVI', prenom: 'Mahugnon Ezéckiel' },
      { matricule: '1141023024347', nom: 'AFFOYA', prenom: 'Eric Tadagbé Exaucé' },
      { matricule: '2121023406286', nom: 'AGBETOU', prenom: 'Edwige Fifamin' },
      { matricule: '1141023570688', nom: 'AGOSSA', prenom: 'Sègla-De-Dieu Apollos' },
      { matricule: '2141023402633', nom: 'AGOSSOU', prenom: 'Séna Fierté' },
      { matricule: '2141024001119', nom: 'AGUENOU', prenom: 'Emilienne Dona' },
      { matricule: '1141023105510', nom: 'AHOLOUKPE', prenom: 'Emmanuel Sèdiro' },
      { matricule: '2141023021831', nom: 'AHOUANSOU', prenom: 'Mahuwèdjro Grâce Gradice' },
      { matricule: '2141023038746', nom: 'AHOUANSOU', prenom: 'Tya-Joice Choubouala' },
      { matricule: '2141023402635', nom: 'AMINOU', prenom: 'Yèsidath Olamidé Adékédjou' },
      { matricule: '1141023039966', nom: 'AMOUYE', prenom: 'Chinan-Ola Marie Mardochée' },
      { matricule: '1131022180187', nom: 'ASSOGBA', prenom: 'Josué Godwin' },
      { matricule: '2141023021812', nom: 'ATCHADE', prenom: 'Sandali Emma' }
    ];

    return students.map(student => ({
      ...student,
      moyInterro: (Math.random() * 15 + 3).toFixed(2),
      devoir1: Math.floor(Math.random() * 12 + 4),
      devoir2: Math.floor(Math.random() * 12 + 4)
    }));
  };

  // Matières selon la classe
  const getMatieres = (classeSelected: string) => {
    if (classeSelected.includes('6ème') || classeSelected.includes('5ème')) {
      return ['MATHS GENE', 'FRANCAIS', 'ANGLAIS', 'SVT', 'PCT', 'HIST-GEO', 'EPS'];
    } else if (classeSelected.includes('4ème') || classeSelected.includes('3ème')) {
      return ['MATHS GENE', 'FRANCAIS', 'ANGLAIS', 'SVT', 'PHYS-CHIM', 'HIST-GEO', 'EPS'];
    } else if (classeSelected.includes('Tle A')) {
      return ['PHILO', 'FRANCAIS', 'ANGLAIS', 'HIST-GEO', 'MATHS', 'SVT'];
    } else if (classeSelected.includes('Tle C')) {
      return ['MATHS', 'PHYS-CHIM', 'SVT', 'FRANCAIS', 'ANGLAIS', 'PHILO'];
    }
    return ['MATHS GENE', 'FRANCAIS', 'ANGLAIS'];
  };

  const handleExport = () => {
    const workbook = XLSX.utils.book_new();
    const matieres = getMatieres(classe);
    const studentsData = generateStudentsData();

    // Créer une feuille pour chaque matière
    matieres.forEach(matiere => {
      // Préparer les données pour cette matière
      const worksheetData = [
        ['Matricule', 'Nom', 'Prénom', 'Moy Interro', 'Devoir 1', 'Devoir 2'],
        ...studentsData.map(student => [
          student.matricule,
          student.nom,
          student.prenom,
          student.moyInterro,
          student.devoir1,
          student.devoir2
        ])
      ];

      // Créer la feuille
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

      // Définir la largeur des colonnes
      worksheet['!cols'] = [
        { wch: 15 }, // Matricule
        { wch: 20 }, // Nom
        { wch: 30 }, // Prénom
        { wch: 12 }, // Moy Interro
        { wch: 10 }, // Devoir 1
        { wch: 10 }  // Devoir 2
      ];

      // Ajouter la feuille au classeur
      XLSX.utils.book_append_sheet(workbook, worksheet, matiere);
    });

    // Générer le nom du fichier
    const fileName = `exportation_educmaster_CEG_${classe.replace(/\s+/g, '_')}_${anneeScolaire}_${semestre.replace(/\s+/g, '_')}.xlsx`;

    // Télécharger le fichier
    XLSX.writeFile(workbook, fileName);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-lg shadow-md">
              <FileSpreadsheet className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Exportation Educmaster</h1>
          </div>
          <p className="text-gray-600 ml-14">Exporter les données vers un fichier Excel</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
          <div className="grid grid-cols-2 gap-8">
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
                Choisir la classe
              </label>
              <select
                value={classe}
                onChange={(e) => setClasse(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {classes.map((cls) => (
                  <option key={cls} value={cls}>
                    {cls}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2">
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

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">Aperçu de l'exportation</h3>
              <p className="text-sm text-blue-700">
                Le fichier Excel contiendra {getMatieres(classe).length} feuilles, une pour chaque matière de la classe {classe}.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {getMatieres(classe).map((matiere) => (
                  <span
                    key={matiere}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full"
                  >
                    {matiere}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleExport}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              <Download className="w-5 h-5" />
              Télécharger le fichier Excel
            </button>
          </div>
        </div>

        <div className="mt-6 bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h3 className="font-bold text-gray-900 mb-3">Informations</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Chaque feuille du fichier Excel représente une matière enseignée dans la classe sélectionnée</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Les colonnes incluent : Matricule, Nom, Prénom, Moyenne Interrogation, Devoir 1, Devoir 2</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Le nom du fichier est généré automatiquement selon la classe, l'année et le semestre sélectionnés</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 font-bold">•</span>
              <span>Ce fichier peut être importé directement dans Educmaster</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
