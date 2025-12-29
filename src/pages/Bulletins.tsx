import React, { useState } from 'react';
import { Download, Printer, User, FileText } from 'lucide-react';

const ANNEES = ['2024-2025', '2023-2024', '2022-2023'];
const CLASSES = ['6ème MA', '6ème MB', '5ème MA', '5ème MB', 'Tle D1', 'Tle C'];
const SEMESTRES = ['Semestre 1', 'Semestre 2'];

const STUDENTS = [
  { id: '1', matricule: '2600904930', nom: 'ADJOVI', prenom: 'Méliane Esther' },
  { id: '2', matricule: '1111023038129', nom: 'ACAKPO', prenom: 'Babatoumé Prince Dieudonné Yannick' },
  { id: '3', matricule: '1151023281732', nom: 'ABIB', prenom: 'Anrif Olaidé' },
];

const NIVEAUX = ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Tle'];

const CLASSES_BY_NIVEAU: Record<string, string[]> = {
  '6ème': ['6ème MA', '6ème MB', '6ème MC'],
  '5ème': ['5ème MA', '5ème MB', '5ème MC'],
  '4ème': ['4ème MA', '4ème MB'],
  '3ème': ['3ème MA', '3ème MB'],
  '2nde': ['2nde A', '2nde C'],
  '1ère': ['1ère A', '1ère C', '1ère D'],
  'Tle': ['Tle A', 'Tle C', 'Tle D1', 'Tle D2'],
};

interface BulletinData {
  matricule: string;
  nom: string;
  prenom: string;
  sexe: string;
  statut: string;
  classe: string;
  effectif: number;
  matiere: string;
  coef: number;
  mepe: number;
  nps1: number;
  nps2: number;
  ms: number;
  msc: number;
  rang: string;
  faibleMoy: number;
  forteMoy: number;
  appreciation: string;
}

const BULLETIN_DATA: BulletinData[] = [
  { matricule: '1111023038129', nom: 'ACAKPO', prenom: 'Babatoumé Prince Dieudonné Yannick', sexe: 'M', statut: 'N', classe: '6ème MI', effectif: 63, matiere: 'Com Ecrite', coef: 1, mepe: 14, nps1: 8, nps2: 14, ms: 12, msc: 12, rang: '34 è', faibleMoy: 5.44, forteMoy: 17.44, appreciation: 'Assez bien' },
  { matricule: '1111023038129', nom: 'ACAKPO', prenom: 'Babatoumé Prince Dieudonné Yannick', sexe: 'M', statut: 'N', classe: '6ème MI', effectif: 63, matiere: 'Maths', coef: 1, mepe: 13.33, nps1: 16, nps2: 17, ms: 15.44, msc: 15.44, rang: '11 è', faibleMoy: 4.67, forteMoy: 18.78, appreciation: 'Bien' },
  { matricule: '1111023038129', nom: 'ACAKPO', prenom: 'Babatoumé Prince Dieudonné Yannick', sexe: 'M', statut: 'N', classe: '6ème MI', effectif: 63, matiere: 'EPS', coef: 1, mepe: 13, nps1: 11, nps2: 12, ms: 12, msc: 12, rang: '27 è', faibleMoy: 7.83, forteMoy: 15, appreciation: 'Assez bien' },
  { matricule: '1111023038129', nom: 'ACAKPO', prenom: 'Babatoumé Prince Dieudonné Yannick', sexe: 'M', statut: 'N', classe: '6ème MI', effectif: 63, matiere: 'Lecture', coef: 1, mepe: 14, nps1: 13, nps2: 11, ms: 12.67, msc: 12.67, rang: '22 è', faibleMoy: 4, forteMoy: 17.33, appreciation: 'Assez bien' },
  { matricule: '1111023038129', nom: 'ACAKPO', prenom: 'Babatoumé Prince Dieudonné Yannick', sexe: 'M', statut: 'N', classe: '6ème MI', effectif: 63, matiere: 'PCT', coef: 1, mepe: 14.75, nps1: 14, nps2: 16, ms: 14.92, msc: 14.92, rang: '11 è', faibleMoy: 4.67, forteMoy: 18.42, appreciation: 'Bien' },
  { matricule: '1111023038129', nom: 'ACAKPO', prenom: 'Babatoumé Prince Dieudonné Yannick', sexe: 'M', statut: 'N', classe: '6ème MI', effectif: 63, matiere: 'Hist Géo', coef: 1, mepe: 17.67, nps1: 17, nps2: 13, ms: 15.89, msc: 15.89, rang: '13 è', faibleMoy: 8.11, forteMoy: 19.11, appreciation: 'Bien' },
  { matricule: '1111023038129', nom: 'ACAKPO', prenom: 'Babatoumé Prince Dieudonné Yannick', sexe: 'M', statut: 'N', classe: '6ème MI', effectif: 63, matiere: 'Anglais', coef: 1, mepe: 7.67, nps1: 9.25, nps2: 14.25, ms: 10.39, msc: 10.39, rang: '32 è', faibleMoy: 3.81, forteMoy: 18.33, appreciation: 'Passable' },
  { matricule: '1111023038129', nom: 'ACAKPO', prenom: 'Babatoumé Prince Dieudonné Yannick', sexe: 'M', statut: 'N', classe: '6ème MI', effectif: 63, matiere: 'SVT', coef: 1, mepe: 20, nps1: 16, nps2: 18, ms: 18, msc: 18, rang: '14 è', faibleMoy: 2.33, forteMoy: 19.83, appreciation: 'Très Bien' },
];

export const Bulletins: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'unique' | 'complet'>('unique');

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Edition des bulletins</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex">
            <button
              onClick={() => setActiveTab('unique')}
              className={`flex-1 px-6 py-4 font-semibold transition-all duration-200 border-b-2 ${
                activeTab === 'unique'
                  ? 'border-teal-500 text-teal-600 bg-white'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                Bulletin unique
              </div>
            </button>
            <button
              onClick={() => setActiveTab('complet')}
              className={`flex-1 px-6 py-4 font-semibold transition-all duration-200 border-b-2 ${
                activeTab === 'complet'
                  ? 'border-teal-500 text-teal-600 bg-white'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <User className="w-5 h-5" />
                Bulletin complet
              </div>
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === 'unique' ? <BulletinUnique /> : <BulletinComplet />}
        </div>
      </div>
    </div>
  );
};

const BulletinUnique: React.FC = () => {
  const [annee, setAnnee] = useState('');
  const [classe, setClasse] = useState('');
  const [eleve, setEleve] = useState('');
  const [semestre, setSemestre] = useState('Semestre 1');
  const [duplicata, setDuplicata] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = () => {
    if (annee && classe && eleve && semestre) {
      setShowPreview(true);
    }
  };

  if (showPreview) {
    return <BulletinPreview onBack={() => setShowPreview(false)} duplicata={duplicata} />;
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Sélectionner une année scolaire
          </label>
          <select
            value={annee}
            onChange={(e) => setAnnee(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">--Sélectionnez une année--</option>
            {ANNEES.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Choisir la classe</label>
          <select
            value={classe}
            onChange={(e) => setClasse(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">--select--</option>
            {CLASSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Élève</label>
          <select
            value={eleve}
            onChange={(e) => setEleve(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            <option value="">--select--</option>
            {STUDENTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.nom} {s.prenom}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Choisir le semestre</label>
          <select
            value={semestre}
            onChange={(e) => setSemestre(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          >
            {SEMESTRES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="duplicata"
          checked={duplicata}
          onChange={(e) => setDuplicata(e.target.checked)}
          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
        />
        <label htmlFor="duplicata" className="text-sm font-medium text-gray-700">
          Duplicata
        </label>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
        >
          Afficher
        </button>
      </div>
    </div>
  );
};

const BulletinPreview: React.FC<{ onBack: () => void; duplicata: boolean }> = ({ onBack, duplicata }) => {
  const data = BULLETIN_DATA[0];
  const moyenneSemestrielle = 11.75;
  const rangSemestriel = '11 è';

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-800 transition-all duration-200 shadow-lg"
        >
          Retour
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg">
          <Download className="w-5 h-5" />
          Télécharger
        </button>
      </div>

      <div className="bg-white border-2 border-gray-300 rounded-lg p-8 shadow-xl" style={{ aspectRatio: '210/297' }}>
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
              Logo
            </div>
            <div className="text-xs">
              <p className="font-bold">RÉPUBLIQUE DU BÉNIN</p>
              <p>MINISTÈRE DE L'ENSEIGNEMENT SECONDAIRE,</p>
              <p>TECHNIQUE ET DE LA FORMATION PROFESSIONNELLE</p>
              <p className="font-bold mt-1">COLLEGE D'ENSEIGNEMENT GÉNÉRAL DOWA</p>
            </div>
          </div>
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-gray-400" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-lg font-bold">BULLETIN DE NOTES DU PREMIER SEMESTRE</h2>
          <p className="text-sm">Année Scolaire : 2024-2025</p>
        </div>

        <div className="grid grid-cols-2 gap-x-8 mb-4 text-sm">
          <div>
            <p>
              <span className="font-semibold">Matricule :</span> {data.matricule}
            </p>
            <p>
              <span className="font-semibold">Nom & Prénom(s) :</span> {data.nom} {data.prenom}
            </p>
            <p>
              <span className="font-semibold">Sexe :</span> {data.sexe}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Statut :</span> {data.statut}
            </p>
            <p>
              <span className="font-semibold">Classe :</span> {data.classe}
            </p>
            <p>
              <span className="font-semibold">Effectif :</span> {data.effectif}
            </p>
          </div>
        </div>

        <div className="border border-gray-300 mb-4">
          <table className="w-full text-xs">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-2 py-1">MATIÈRES</th>
                <th className="border border-gray-300 px-2 py-1">Cf</th>
                <th className="border border-gray-300 px-2 py-1">MEPE</th>
                <th className="border border-gray-300 px-2 py-1">NPS1</th>
                <th className="border border-gray-300 px-2 py-1">NPS2</th>
                <th className="border border-gray-300 px-2 py-1">MS</th>
                <th className="border border-gray-300 px-2 py-1">MSC</th>
                <th className="border border-gray-300 px-2 py-1">Rang</th>
                <th className="border border-gray-300 px-2 py-1">Faible Moy.</th>
                <th className="border border-gray-300 px-2 py-1">Forte Moy.</th>
                <th className="border border-gray-300 px-2 py-1">Appréciations Professeurs</th>
              </tr>
            </thead>
            <tbody>
              {BULLETIN_DATA.map((row, idx) => (
                <tr key={idx}>
                  <td className="border border-gray-300 px-2 py-1">{row.matiere}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{row.coef}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{row.mepe}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{row.nps1}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{row.nps2}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{row.ms}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{row.msc}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{row.rang}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{row.faibleMoy}</td>
                  <td className="border border-gray-300 px-2 py-1 text-center">{row.forteMoy}</td>
                  <td className="border border-gray-300 px-2 py-1">{row.appreciation}</td>
                </tr>
              ))}
              <tr className="font-semibold bg-gray-50">
                <td className="border border-gray-300 px-2 py-1">Total</td>
                <td className="border border-gray-300 px-2 py-1 text-center">23</td>
                <td className="border border-gray-300 px-2 py-1" colSpan={3}></td>
                <td className="border border-gray-300 px-2 py-1 text-center" colSpan={2}>
                  270.28
                </td>
                <td className="border border-gray-300 px-2 py-1" colSpan={4}></td>
              </tr>
              <tr className="font-semibold">
                <td className="border border-gray-300 px-2 py-1" colSpan={2}>
                  Moyenne Semestrielle : {moyenneSemestrielle}
                </td>
                <td className="border border-gray-300 px-2 py-1" colSpan={9}>
                  Rang : {rangSemestriel}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-3 gap-4 text-xs mb-4">
          <div>
            <p className="font-semibold">Bilan littéraire:</p>
            <p>Bilan scientifique:</p>
            <p>Autre:</p>
          </div>
          <div>
            <p className="font-semibold">Forte Moyenne:</p>
            <p>Faible Moyenne:</p>
            <p>Moyenne de Classe:</p>
          </div>
          <div>
            <p className="font-semibold">14.58</p>
            <p>7.26</p>
            <p>11.65</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs border-t pt-4">
          <div>
            <p className="font-semibold mb-1">Mentions du Conseil des Profs.</p>
            <div className="space-y-1">
              <p>Félicitations ............................ □</p>
              <p>Encouragements ........................ □</p>
              <p>Tableau d'Honneur .................... □</p>
              <p>Avertissement Travail ................ □</p>
              <p>Avertissement Discipline ........... □</p>
              <p>Blâme Travail ............................ □</p>
              <p>Blâme Discipline ....................... □</p>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-1">Appréciation du Chef d'établissement</p>
            <p className="italic mb-4">Peut mieux faire.</p>
            <p className="font-semibold mb-1">Appréciation du Professeur Principal</p>
            <p className="mb-2">Conduite : Bonne</p>
          </div>
        </div>

        <div className="text-right mt-4 text-xs">
          <p className="font-semibold">Nouveau Hillaire HOUSSOU</p>
        </div>

        {duplicata && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 text-6xl font-bold opacity-20 rotate-[-30deg]">
            DUPLICATA
          </div>
        )}

        <div className="text-center text-xs text-gray-500 mt-4 border-t pt-2">
          <p>
            Copie originale Fait à Comè le 21-05-2025
          </p>
        </div>
      </div>
    </div>
  );
};

const BulletinComplet: React.FC = () => {
  const [step, setStep] = useState(1);
  const [annee, setAnnee] = useState('');
  const [semestre, setSemestre] = useState('Semestre 1');
  const [activeNiveau, setActiveNiveau] = useState('6ème');
  const [selectedClass, setSelectedClass] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const handleStep1Next = () => {
    if (annee && semestre) {
      setStep(2);
    }
  };

  const handleClassSelect = (classe: string) => {
    setSelectedClass(classe);
    setShowPreview(true);
  };

  if (showPreview) {
    return <BulletinCompletPreview onBack={() => setShowPreview(false)} classe={selectedClass} />;
  }

  if (step === 1) {
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
          <p className="text-sm text-gray-700">
            Veuillez <span className="font-semibold text-pink-700">sélectionner l'année scolaire</span> et{' '}
            <span className="font-semibold text-pink-700">le semestre</span> pour commencer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sélectionner une année scolaire
            </label>
            <select
              value={annee}
              onChange={(e) => setAnnee(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">--Sélectionnez une année--</option>
              {ANNEES.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Choisir le semestre</label>
            <select
              value={semestre}
              onChange={(e) => setSemestre(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              {SEMESTRES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleStep1Next}
            disabled={!annee}
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Suivant
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <button
        onClick={() => setStep(1)}
        className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-800 transition-all duration-200 shadow-lg"
      >
        ← Retour
      </button>

      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6">
        <p className="text-sm text-gray-700">
          Veuillez <span className="font-semibold text-pink-700">sélectionner une classe</span> pour générer les bulletins.
        </p>
      </div>

      <div className="border-b border-gray-200 bg-gray-50 rounded-t-xl">
        <div className="flex overflow-x-auto">
          {NIVEAUX.map((niveau) => (
            <button
              key={niveau}
              onClick={() => setActiveNiveau(niveau)}
              className={`px-6 py-4 font-semibold whitespace-nowrap transition-all duration-200 border-b-2 ${
                activeNiveau === niveau
                  ? 'border-teal-500 text-teal-600 bg-white'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {niveau}
            </button>
          ))}
        </div>
      </div>

      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CLASSES_BY_NIVEAU[activeNiveau].map((classe) => (
            <button
              key={classe}
              onClick={() => handleClassSelect(classe)}
              className="group relative bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 rounded-xl p-6 hover:from-teal-100 hover:to-emerald-100 hover:border-teal-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{classe}</h3>
                <p className="text-sm text-gray-600">Cliquez pour sélectionner</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const BulletinCompletPreview: React.FC<{ onBack: () => void; classe: string }> = ({ onBack, classe }) => {
  const data = BULLETIN_DATA[0];
  const moyenneSemestrielle = 11.75;
  const rangSemestriel = '11 è';

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-700 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-purple-800 transition-all duration-200 shadow-lg"
        >
          Retour
        </button>
        <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg">
          <Printer className="w-5 h-5" />
          Imprimer
        </button>
      </div>

      <div className="text-center text-lg font-semibold text-gray-700 mb-4">
        Aperçu des bulletins - {classe}
      </div>

      <div className="space-y-8">
        {[1, 2, 3].map((studentIdx) => (
          <div
            key={studentIdx}
            className="bg-white border-2 border-gray-300 rounded-lg p-8 shadow-xl break-after-page"
            style={{ aspectRatio: '210/297', pageBreakAfter: 'always' }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center text-xs text-gray-500">
                  Logo
                </div>
                <div className="text-xs">
                  <p className="font-bold">RÉPUBLIQUE DU BÉNIN</p>
                  <p>MINISTÈRE DE L'ENSEIGNEMENT SECONDAIRE,</p>
                  <p>TECHNIQUE ET DE LA FORMATION PROFESSIONNELLE</p>
                  <p className="font-bold mt-1">COLLEGE D'ENSEIGNEMENT GÉNÉRAL DOWA</p>
                </div>
              </div>
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-12 h-12 text-gray-400" />
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-lg font-bold">BULLETIN DE NOTES DU PREMIER SEMESTRE</h2>
              <p className="text-sm">Année Scolaire : 2024-2025</p>
            </div>

            <div className="grid grid-cols-2 gap-x-8 mb-4 text-sm">
              <div>
                <p>
                  <span className="font-semibold">Matricule :</span> {data.matricule}
                </p>
                <p>
                  <span className="font-semibold">Nom & Prénom(s) :</span> {data.nom} {data.prenom}
                </p>
                <p>
                  <span className="font-semibold">Sexe :</span> {data.sexe}
                </p>
              </div>
              <div>
                <p>
                  <span className="font-semibold">Statut :</span> {data.statut}
                </p>
                <p>
                  <span className="font-semibold">Classe :</span> {classe}
                </p>
                <p>
                  <span className="font-semibold">Effectif :</span> {data.effectif}
                </p>
              </div>
            </div>

            <div className="border border-gray-300 mb-4">
              <table className="w-full text-xs">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border border-gray-300 px-2 py-1">MATIÈRES</th>
                    <th className="border border-gray-300 px-2 py-1">Cf</th>
                    <th className="border border-gray-300 px-2 py-1">MEPE</th>
                    <th className="border border-gray-300 px-2 py-1">NPS1</th>
                    <th className="border border-gray-300 px-2 py-1">NPS2</th>
                    <th className="border border-gray-300 px-2 py-1">MS</th>
                    <th className="border border-gray-300 px-2 py-1">MSC</th>
                    <th className="border border-gray-300 px-2 py-1">Rang</th>
                    <th className="border border-gray-300 px-2 py-1">Faible Moy.</th>
                    <th className="border border-gray-300 px-2 py-1">Forte Moy.</th>
                    <th className="border border-gray-300 px-2 py-1">Appréciations</th>
                  </tr>
                </thead>
                <tbody>
                  {BULLETIN_DATA.map((row, idx) => (
                    <tr key={idx}>
                      <td className="border border-gray-300 px-2 py-1">{row.matiere}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{row.coef}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{row.mepe}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{row.nps1}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{row.nps2}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{row.ms}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{row.msc}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{row.rang}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{row.faibleMoy}</td>
                      <td className="border border-gray-300 px-2 py-1 text-center">{row.forteMoy}</td>
                      <td className="border border-gray-300 px-2 py-1">{row.appreciation}</td>
                    </tr>
                  ))}
                  <tr className="font-semibold bg-gray-50">
                    <td className="border border-gray-300 px-2 py-1">Total</td>
                    <td className="border border-gray-300 px-2 py-1 text-center">23</td>
                    <td className="border border-gray-300 px-2 py-1" colSpan={3}></td>
                    <td className="border border-gray-300 px-2 py-1 text-center" colSpan={2}>
                      270.28
                    </td>
                    <td className="border border-gray-300 px-2 py-1" colSpan={4}></td>
                  </tr>
                  <tr className="font-semibold">
                    <td className="border border-gray-300 px-2 py-1" colSpan={2}>
                      Moyenne Semestrielle : {moyenneSemestrielle}
                    </td>
                    <td className="border border-gray-300 px-2 py-1" colSpan={9}>
                      Rang : {rangSemestriel}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-3 gap-4 text-xs mb-4">
              <div>
                <p className="font-semibold">Bilan littéraire:</p>
                <p>Bilan scientifique:</p>
                <p>Autre:</p>
              </div>
              <div>
                <p className="font-semibold">Forte Moyenne:</p>
                <p>Faible Moyenne:</p>
                <p>Moyenne de Classe:</p>
              </div>
              <div>
                <p className="font-semibold">14.58</p>
                <p>7.26</p>
                <p>11.65</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs border-t pt-4">
              <div>
                <p className="font-semibold mb-1">Mentions du Conseil des Profs.</p>
                <div className="space-y-1">
                  <p>Félicitations ............................ □</p>
                  <p>Encouragements ........................ □</p>
                  <p>Tableau d'Honneur .................... □</p>
                </div>
              </div>
              <div>
                <p className="font-semibold mb-1">Appréciation du Chef d'établissement</p>
                <p className="italic mb-4">Peut mieux faire.</p>
                <p className="font-semibold mb-1">Appréciation du Professeur Principal</p>
                <p className="mb-2">Conduite : Bonne</p>
              </div>
            </div>

            <div className="text-center text-xs text-gray-500 mt-4 border-t pt-2">
              <p>Bulletin {studentIdx} sur 3 - Fait à Comè le 21-05-2025</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
