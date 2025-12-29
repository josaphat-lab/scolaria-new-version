import React, { useState } from 'react';
import { FileText, Download, FileSpreadsheet, ArrowLeft, Users } from 'lucide-react';
import * as XLSX from 'xlsx';

type Step = 1 | 2 | 3;
type Category = 'Passants' | 'Doublants' | 'Exclus';

interface Student {
  matricule: string;
  nom: string;
  prenom: string;
  moyAnnuelle: number;
  rang: number;
  statut: string;
}

export const PassantsDoublants: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [anneeScolaire, setAnneeScolaire] = useState('2024-2025');
  const [categorie, setCategorie] = useState<Category>('Passants');
  const [activeTab, setActiveTab] = useState('6ème');
  const [selectedClasse, setSelectedClasse] = useState<string | null>(null);

  const anneesScolaires = ['2023-2024', '2024-2025', '2025-2026'];
  const categories: Category[] = ['Passants', 'Doublants', 'Exclus'];

  const classes = {
    '6ème': ['6ème M1', '6ème M2', '6ème M3', '6ème M4', '6ème M5', '6ème M6'],
    '5ème': ['5ème M1', '5ème M2', '5ème M3', '5ème M4', '5ème MA'],
    '4ème': ['4ème M1', '4ème M2', '4ème M3', '4ème M4', '4ème MA'],
    '3ème': ['3ème M1', '3ème M2', '3ème M3', '3ème M4', '3ème MA'],
    '2nde': ['2nde A2A', '2nde A2B', '2nde B1', '2nde C1', '2nde D1', '2nde D2'],
    '1ère': ['1ère A2Alpha', '1ère A2Beta', '1ère B1', '1ère C1', '1ère D1', '1ère D2'],
    'Tle': ['Tle A2A', 'Tle A2Beta', 'Tle B1', 'Tle C1', 'Tle D1', 'Tle D2', 'Tle D3']
  };

  const generateStudentList = (className: string): Student[] => {
    const count = categorie === 'Exclus' ? Math.floor(Math.random() * 3) + 2 : Math.floor(Math.random() * 40) + 20;
    const students: Student[] = [];

    for (let i = 0; i < count; i++) {
      students.push({
        matricule: `21410${23000000 + Math.floor(Math.random() * 9999999)}`,
        nom: i === 0 ? 'AVAGBO' : `ÉTUDIANT${i + 1}`,
        prenom: i === 0 ? 'Mahoutondji Constantine Sandrine' : `Prénom ${i + 1}`,
        moyAnnuelle: categorie === 'Passants' ? parseFloat((15 + Math.random() * 3).toFixed(2)) :
                     categorie === 'Doublants' ? parseFloat((8 + Math.random() * 2).toFixed(2)) :
                     parseFloat((4 + Math.random() * 3).toFixed(2)),
        rang: i + 1,
        statut: 'N'
      });
    }

    return students.sort((a, b) => b.moyAnnuelle - a.moyAnnuelle).map((s, idx) => ({...s, rang: idx + 1}));
  };

  const handleSuivant = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const handleRetour = () => {
    if (selectedClasse) {
      setSelectedClasse(null);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleClassClick = (classe: string) => {
    setSelectedClasse(classe);
    setCurrentStep(3);
  };

  const handleExportPdf = () => {
    window.print();
  };

  const handleExportExcel = () => {
    if (!selectedClasse) return;

    const students = generateStudentList(selectedClasse);
    const worksheetData = [
      ['CEG DOWA'],
      ['OUEME - Porto-Novo'],
      [''],
      [`Liste des ${categorie} de la ${selectedClasse} au cours de l'année ${anneeScolaire}`],
      [`Effectif de la classe: ${students.length}`],
      [''],
      ['Matricule', 'Nom', 'Prénom', 'Moy Annuelle', 'Rang', 'Statut'],
      ...students.map(s => [s.matricule, s.nom, s.prenom, s.moyAnnuelle, s.rang, s.statut])
    ];

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, categorie);

    XLSX.writeFile(workbook, `${categorie}_${selectedClasse}_${anneeScolaire}.xlsx`);
  };

  const renderStep1 = () => (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Passants/Doublants/Exclus</h2>
        <p className="text-gray-600">
          Veuillez <span className="text-red-500 font-semibold">sélectionner l'année scolaire</span> et{' '}
          <span className="text-red-500 font-semibold">la catégorie</span> pour commencer.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Sélectionner une année scolaire
          </label>
          <div className="space-y-3">
            {anneesScolaires.map((annee) => (
              <div
                key={annee}
                onClick={() => setAnneeScolaire(annee)}
                className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${
                  anneeScolaire === annee
                    ? 'border-teal-600 bg-teal-50 shadow-md'
                    : 'border-gray-200 hover:border-teal-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    anneeScolaire === annee ? 'border-teal-600' : 'border-gray-300'
                  }`}>
                    {anneeScolaire === annee && (
                      <div className="w-3 h-3 rounded-full bg-teal-600"></div>
                    )}
                  </div>
                  <span className="text-lg font-medium text-gray-900">{annee}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Choisir la catégorie
          </label>
          <div className="space-y-3">
            {categories.map((cat) => (
              <div
                key={cat}
                onClick={() => setCategorie(cat)}
                className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${
                  categorie === cat
                    ? 'border-teal-600 bg-teal-50 shadow-md'
                    : 'border-gray-200 hover:border-teal-300 hover:shadow-sm'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    categorie === cat ? 'border-teal-600' : 'border-gray-300'
                  }`}>
                    {categorie === cat && (
                      <div className="w-3 h-3 rounded-full bg-teal-600"></div>
                    )}
                  </div>
                  <span className="text-lg font-medium text-gray-900">{cat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSuivant}
          className="px-8 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl"
        >
          Suivant
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="p-8">
      <button
        onClick={handleRetour}
        className="flex items-center gap-2 px-4 py-2 mb-6 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour
      </button>

      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {categorie} - Année scolaire {anneeScolaire}
        </h2>
        <p className="text-gray-600">Sélectionnez une promotion puis une classe</p>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <div className="flex gap-2 overflow-x-auto">
            {Object.keys(classes).map((promo) => (
              <button
                key={promo}
                onClick={() => setActiveTab(promo)}
                className={`px-6 py-3 text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeTab === promo
                    ? 'text-teal-600 border-b-2 border-teal-600 bg-teal-50'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {promo}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {classes[activeTab as keyof typeof classes].map((classe) => (
          <button
            key={classe}
            onClick={() => handleClassClick(classe)}
            className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:shadow-lg transition-all text-center group"
          >
            <div className="text-gray-400 mb-3 group-hover:text-teal-500 transition-colors">
              <Users className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{classe}</h3>
            <p className="text-sm text-gray-500">Voir la liste</p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => {
    if (!selectedClasse) return null;

    const students = generateStudentList(selectedClasse);

    return (
      <div className="p-8">
        <div className="flex items-center justify-between mb-6 print:hidden">
          <button
            onClick={handleRetour}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
          <div className="flex gap-3">
            <button
              onClick={handleExportPdf}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg font-semibold hover:from-red-700 hover:to-red-800 transition-all shadow-lg hover:shadow-xl"
            >
              <FileText className="w-5 h-5" />
              Exporter en PDF
            </button>
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl"
            >
              <FileSpreadsheet className="w-5 h-5" />
              Exporter en Excel
            </button>
          </div>
        </div>

        <div className="bg-white border-2 border-gray-300 p-8 print:border-0">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">CEG DOWA</h2>
              <p className="text-sm text-gray-600">OUEME - Porto-Novo</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Email: cegdowa@gmail.com</p>
              <p className="text-sm text-gray-600">01 BP 543 PORTO-NOVO - +229 66 34 37 50</p>
            </div>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-teal-600 mb-1">
              Liste des {categorie} de la {selectedClasse} au cours de l'année {anneeScolaire}
            </h3>
            <p className="text-sm text-gray-600">Effectif de la classe: {students.length}</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse border-2 border-gray-400">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border-2 border-gray-400 px-4 py-3 text-left text-sm font-bold text-gray-900">
                    Matricule
                  </th>
                  <th className="border-2 border-gray-400 px-4 py-3 text-left text-sm font-bold text-gray-900">
                    Nom
                  </th>
                  <th className="border-2 border-gray-400 px-4 py-3 text-left text-sm font-bold text-gray-900">
                    Prénom
                  </th>
                  <th className="border-2 border-gray-400 px-4 py-3 text-center text-sm font-bold text-gray-900">
                    Moy Annuelle
                  </th>
                  <th className="border-2 border-gray-400 px-4 py-3 text-center text-sm font-bold text-gray-900">
                    Rang
                  </th>
                  <th className="border-2 border-gray-400 px-4 py-3 text-center text-sm font-bold text-gray-900">
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {students.map((student, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="border-2 border-gray-400 px-4 py-3 text-sm text-gray-900">
                      {student.matricule}
                    </td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-sm font-medium text-gray-900">
                      {student.nom}
                    </td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-sm text-gray-900">
                      {student.prenom}
                    </td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-sm text-center font-semibold text-gray-900">
                      {student.moyAnnuelle}
                    </td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-sm text-center text-gray-900">
                      {student.rang}e
                    </td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-sm text-center text-gray-900">
                      {student.statut}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8 print:p-0">
        <div className="mb-8 print:hidden">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 p-3 rounded-lg shadow-md">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Passants/Doublants/Exclus</h1>
          </div>
          <p className="text-gray-600 ml-14">Gestion des listes de passants, doublants et exclus</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden print:shadow-none print:border-0">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>
      </div>
    </div>
  );
};
