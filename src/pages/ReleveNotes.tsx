import React, { useState } from 'react';
import { FileText, Printer, ArrowLeft } from 'lucide-react';

type Step = 1 | 2;

export const ReleveNotes: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [anneeScolaire, setAnneeScolaire] = useState('2024-2025');
  const [semestre, setSemestre] = useState('Semestre 1');
  const [devoir, setDevoir] = useState('Devoir 1');
  const [activeTab, setActiveTab] = useState('6ème');
  const [selectedClasse, setSelectedClasse] = useState<string | null>(null);

  const anneesScolaires = ['2023-2024', '2024-2025', '2025-2026'];
  const semestres = ['Semestre 1', 'Semestre 2'];
  const devoirs = ['Devoir 1', 'Devoir 2', 'Devoir 3', 'Devoir 4'];

  const classes = {
    '6ème': ['6ème M1', '6ème M2', '6ème M3', '6ème M4', '6ème M5', '6ème M6'],
    '5ème': ['5ème M1', '5ème M2', '5ème M3', '5ème M4', '5ème MA'],
    '4ème': ['4ème M1', '4ème M2', '4ème M3', '4ème M4', '4ème MA'],
    '3ème': ['3ème M1', '3ème M2', '3ème M3', '3ème M4', '3ème MA'],
    '2nde': ['2nde A2A', '2nde A2B', '2nde B1', '2nde C1', '2nde D1', '2nde D2'],
    '1ère': ['1ère A2Alpha', '1ère A2Beta', '1ère B1', '1ère C1', '1ère D1', '1ère D2'],
    'Tle': ['Tle A2A', 'Tle A2Beta', 'Tle B1', 'Tle C1', 'Tle D1', 'Tle D2', 'Tle D3']
  };

  const generateStudentData = (className: string, index: number) => {
    const matieres = [
      { nom: 'Allemand', coef: 2, note: 11, moyCoef: 22, fableMoy: 7, forteMoy: 17, appreciation: 'Passable' },
      { nom: 'Com Ecrite', coef: 2, note: 10, moyCoef: 20, fableMoy: 3, forteMoy: 14, appreciation: 'Passable' },
      { nom: 'PCT', coef: 2, note: 10, moyCoef: 20, fableMoy: 5, forteMoy: 14, appreciation: 'Passable' },
      { nom: 'Lecture', coef: 2, note: 10, moyCoef: 20, fableMoy: 5, forteMoy: 19, appreciation: 'Passable' },
      { nom: 'Anglais', coef: 2, note: 7, moyCoef: 14, fableMoy: 3, forteMoy: 16, appreciation: 'Médiocre' },
      { nom: 'Maths', coef: 3, note: 12, moyCoef: 36, fableMoy: 2, forteMoy: 18, appreciation: 'Assez bien' },
      { nom: 'Hist Géo', coef: 2, note: 13.5, moyCoef: 27, fableMoy: 6.5, forteMoy: 15.5, appreciation: 'Assez bien' },
      { nom: 'SVT', coef: 2, note: 4.25, moyCoef: 8.5, fableMoy: 3.75, forteMoy: 17.25, appreciation: 'Médiocre' },
      { nom: 'EPS', coef: 1, note: 10, moyCoef: 10, fableMoy: 10, forteMoy: 17, appreciation: 'Passable' }
    ];

    const total = matieres.reduce((sum, m) => sum + m.moyCoef, 0);
    const totalCoef = matieres.reduce((sum, m) => sum + m.coef, 0);
    const moyenne = (total / totalCoef).toFixed(2);

    return {
      matricule: `20990${37135 + index}`,
      nom: index === 0 ? 'ZANFONGNON Rozaline Nanhougnon' : `ÉLÈVE ${index + 1}`,
      sexe: index % 2 === 0 ? 'F' : 'M',
      statut: 'N',
      classe: className,
      effectif: 48 + index,
      matieres,
      total,
      moyenne,
      mention: parseFloat(moyenne) >= 9.56 ? 'Ensemble insuffisant' : 'Passable'
    };
  };

  const handleSuivant = () => {
    setCurrentStep(2);
  };

  const handleRetour = () => {
    if (selectedClasse) {
      setSelectedClasse(null);
    } else if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const renderStep1 = () => (
    <div className="p-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Edition des relevés de notes</h2>
        <p className="text-gray-600">
          Veuillez <span className="text-red-500 font-semibold">sélectionner l'année scolaire</span> et{' '}
          <span className="text-red-500 font-semibold">le semestre</span> pour commencer.
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Sélectionner une année scolaire
          </label>
          <select
            value={anneeScolaire}
            onChange={(e) => setAnneeScolaire(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900"
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
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent bg-white text-gray-900"
          >
            {devoirs.map((dev) => (
              <option key={dev} value={dev}>
                {dev}
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
          Suivant
        </button>
      </div>
    </div>
  );

  const renderStep2 = () => {
    if (selectedClasse) {
      const student = generateStudentData(selectedClasse, 0);

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
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-teal-700 text-white rounded-lg font-semibold hover:from-teal-700 hover:to-teal-800 transition-all shadow-lg hover:shadow-xl"
            >
              <Printer className="w-5 h-5" />
              Imprimer
            </button>
          </div>

          <div className="bg-white border-2 border-gray-300 p-6 max-w-4xl mx-auto print:border-0 print:p-0" style={{ pageBreakAfter: 'always' }}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-gray-500">LOGO</span>
                </div>
                <div className="text-xs">
                  <p className="font-bold text-red-600">REPUBLIQUE DU BENIN</p>
                  <p className="font-semibold">MINISTERE DES ENSEIGNEMENTS</p>
                  <p className="font-semibold text-red-600">SECONDAIRE, TECHNIQUE ET DE LA</p>
                  <p className="font-semibold">FORMATION PROFESSIONNELLE</p>
                  <p className="mt-1">BP: 04 Porto-Novo</p>
                  <p>Tél: 00 00 00 00</p>
                </div>
              </div>
              <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-xs text-gray-500">LOGO</span>
              </div>
            </div>

            <div className="text-center mb-4">
              <h1 className="text-lg font-bold uppercase">
                RELEVÉ DE NOTES DU {devoir.toUpperCase()} DU {semestre.toUpperCase()}
              </h1>
              <p className="text-sm">Année Scolaire: {anneeScolaire}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p><span className="font-semibold">Matricule:</span> {student.matricule}</p>
                <p><span className="font-semibold">Nom & Prénom(s):</span> {student.nom}</p>
                <p><span className="font-semibold">Sexe:</span> {student.sexe}</p>
              </div>
              <div>
                <p><span className="font-semibold">Statut:</span> {student.statut}</p>
                <p><span className="font-semibold">Classe:</span> {student.classe}</p>
                <p><span className="font-semibold">Effectif:</span> {student.effectif}</p>
              </div>
            </div>

            <div className="mb-4">
              <table className="w-full border-collapse border border-gray-400 text-sm">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 px-2 py-2 text-left">MATIERES</th>
                    <th className="border border-gray-400 px-2 py-2 text-center">Coef</th>
                    <th className="border border-gray-400 px-2 py-2 text-center">Note /20</th>
                    <th className="border border-gray-400 px-2 py-2 text-center">Moy Coef</th>
                    <th className="border border-gray-400 px-2 py-2 text-center">Fable Moy</th>
                    <th className="border border-gray-400 px-2 py-2 text-center">Forte Moy</th>
                    <th className="border border-gray-400 px-2 py-2 text-left">Appréciations Professeur</th>
                  </tr>
                </thead>
                <tbody>
                  {student.matieres.map((matiere, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="border border-gray-400 px-2 py-2">{matiere.nom}</td>
                      <td className="border border-gray-400 px-2 py-2 text-center">{matiere.coef}</td>
                      <td className="border border-gray-400 px-2 py-2 text-center">{matiere.note}</td>
                      <td className="border border-gray-400 px-2 py-2 text-center">{matiere.moyCoef}</td>
                      <td className="border border-gray-400 px-2 py-2 text-center">{matiere.fableMoy}</td>
                      <td className="border border-gray-400 px-2 py-2 text-center">{matiere.forteMoy}</td>
                      <td className="border border-gray-400 px-2 py-2">{matiere.appreciation}</td>
                    </tr>
                  ))}
                  <tr className="font-semibold bg-gray-50">
                    <td className="border border-gray-400 px-2 py-2" colSpan={3}>Total</td>
                    <td className="border border-gray-400 px-2 py-2 text-center">{student.total}</td>
                    <td className="border border-gray-400 px-2 py-2 text-center" colSpan={3}></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
              <div>
                <p><span className="font-semibold">Moyenne Obtenue:</span> {student.moyenne}</p>
              </div>
              <div>
                <p><span className="font-semibold">Mention:</span> {student.mention}</p>
              </div>
            </div>

            <div className="text-center mb-4">
              <p className="text-sm italic mb-2">Signature et cachet</p>
              <p className="text-sm italic">du Chef d'établissement</p>
              <div className="mt-8">
                <p className="font-semibold text-sm">Jules A. VODOUNON</p>
              </div>
            </div>

            <div className="text-xs text-gray-600 border-t pt-2">
              <p>Fait à Malanhoui le 26-12-2025</p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-8">
        <button
          onClick={handleRetour}
          className="flex items-center gap-2 px-4 py-2 mb-6 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>

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
              onClick={() => setSelectedClasse(classe)}
              className="p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:shadow-lg transition-all text-center group"
            >
              <div className="text-gray-400 mb-3 group-hover:text-teal-500 transition-colors">
                <FileText className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">{classe}</h3>
              <p className="text-sm text-gray-500">Cliquez pour voir le relevé</p>
            </button>
          ))}
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
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Relevé de notes</h1>
          </div>
          <p className="text-gray-600 ml-14">Édition des relevés de notes par classe</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden print:shadow-none print:border-0">
          {currentStep === 1 ? renderStep1() : renderStep2()}
        </div>
      </div>
    </div>
  );
};
