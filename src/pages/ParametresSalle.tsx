import React, { useState } from 'react';
import { ArrowLeft, UserCheck, Search, Award } from 'lucide-react';

interface Student {
  id: string;
  nom: string;
  prenom: string;
  sexe: 'M' | 'F';
  age: number;
  conduite?: number;
}

interface ClassInfo {
  responsable1: string;
  responsable2: string;
  conduiteSemestre1: string;
  conduiteSemestre2: string;
}

const STUDENTS_DATA: Student[] = [
  { id: '1', nom: 'ABIB', prenom: 'Anrif Olaidé', sexe: 'M', age: 15, conduite: 16 },
  { id: '2', nom: 'ABIKOU', prenom: 'Jesukpego Mickael Jacques', sexe: 'M', age: 14 },
  { id: '3', nom: 'ADECHOKAN', prenom: 'Anfiyath Oluwabukola Adouni', sexe: 'F', age: 15 },
  { id: '4', nom: 'ADELAKOUN', prenom: 'Aliciella Omoyélé Love', sexe: 'F', age: 14 },
  { id: '5', nom: 'ADOUNVO', prenom: 'Ange Godfroy', sexe: 'M', age: 16 },
  { id: '6', nom: 'AFFOKPLATADE', prenom: 'Houéfa Mirabelle', sexe: 'F', age: 15 },
];

interface ParametresSalleProps {
  classeName: string;
  onBack: () => void;
}

export const ParametresSalle: React.FC<ParametresSalleProps> = ({ classeName, onBack }) => {
  const [activeTab, setActiveTab] = useState<'liste' | 'informations'>('liste');
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<Student[]>(STUDENTS_DATA);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showConduiteModal, setShowConduiteModal] = useState(false);
  const [conduiteValue, setConduiteValue] = useState('');

  const [classInfo, setClassInfo] = useState<ClassInfo>({
    responsable1: '',
    responsable2: '',
    conduiteSemestre1: '16.5',
    conduiteSemestre2: '17',
  });

  const [savedInfo, setSavedInfo] = useState<ClassInfo | null>({
    responsable1: 'ABIB - Anrif Olaidé',
    responsable2: 'ABIKOU - Jesukpego Mickael Jacques',
    conduiteSemestre1: '16.5',
    conduiteSemestre2: '17',
  });

  const filteredStudents = students.filter(
    (student) =>
      student.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.prenom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpenConduiteModal = (student: Student) => {
    setSelectedStudent(student);
    setConduiteValue(student.conduite?.toString() || '');
    setShowConduiteModal(true);
  };

  const handleSaveConduite = () => {
    if (selectedStudent) {
      setStudents(
        students.map((s) =>
          s.id === selectedStudent.id ? { ...s, conduite: parseFloat(conduiteValue) } : s
        )
      );
      setShowConduiteModal(false);
      setSelectedStudent(null);
      setConduiteValue('');
    }
  };

  const handleSaveClassInfo = () => {
    setSavedInfo(classInfo);
    alert('Informations enregistrées avec succès');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour
      </button>

      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Administration des données de la <span className="text-teal-600">{classeName}</span>
      </h2>

      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('liste')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            activeTab === 'liste'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-teal-500'
          }`}
        >
          Liste de la salle
        </button>
        <button
          onClick={() => setActiveTab('informations')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
            activeTab === 'informations'
              ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg'
              : 'bg-white text-gray-700 border border-gray-300 hover:border-teal-500'
          }`}
        >
          Informations générales
        </button>
      </div>

      {activeTab === 'liste' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher un élève..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Nom de l'élève
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Prénoms de l'élève
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Sexe de l'élève
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">
                      Age de l'élève
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-teal-50 transition-colors duration-150">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{student.nom}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{student.prenom}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{student.sexe}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{student.age}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleOpenConduiteModal(student)}
                          className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-lg hover:from-amber-600 hover:to-orange-700 transition-all duration-200 shadow-md"
                        >
                          <Award className="w-4 h-4" />
                          Attribuer conduite
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredStudents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">Aucun élève trouvé</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'informations' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Définir les informations de la classe
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Premier responsable
                </label>
                <select
                  value={classInfo.responsable1}
                  onChange={(e) => setClassInfo({ ...classInfo, responsable1: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Sélectionner un élève</option>
                  {students.map((student) => (
                    <option key={student.id} value={`${student.nom} - ${student.prenom}`}>
                      {student.nom} - {student.prenom}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deuxième responsable
                </label>
                <select
                  value={classInfo.responsable2}
                  onChange={(e) => setClassInfo({ ...classInfo, responsable2: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Sélectionner un élève</option>
                  {students.map((student) => (
                    <option key={student.id} value={`${student.nom} - ${student.prenom}`}>
                      {student.nom} - {student.prenom}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Conduite du premier semestre de la salle
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={classInfo.conduiteSemestre1}
                  onChange={(e) =>
                    setClassInfo({ ...classInfo, conduiteSemestre1: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Conduite du deuxième semestre de la salle
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={classInfo.conduiteSemestre2}
                  onChange={(e) =>
                    setClassInfo({ ...classInfo, conduiteSemestre2: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <button
              onClick={handleSaveClassInfo}
              className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
            >
              Valider les données
            </button>
          </div>

          {savedInfo && (
            <div className="bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl shadow-lg p-8 border-2 border-teal-200">
              <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <UserCheck className="w-6 h-6 text-teal-600" />
                Informations actuelles de la classe
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-md border border-teal-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Premier responsable</p>
                      <p className="text-lg font-bold text-gray-900">
                        {savedInfo.responsable1 || 'Non défini'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md border border-teal-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <UserCheck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Deuxième responsable</p>
                      <p className="text-lg font-bold text-gray-900">
                        {savedInfo.responsable2 || 'Non défini'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md border border-teal-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Conduite semestre 1</p>
                      <p className="text-lg font-bold text-gray-900">
                        {savedInfo.conduiteSemestre1}/20
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-6 shadow-md border border-teal-100">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Conduite semestre 2</p>
                      <p className="text-lg font-bold text-gray-900">
                        {savedInfo.conduiteSemestre2}/20
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {showConduiteModal && selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Attribuer la conduite
            </h3>

            <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg p-4 mb-6 border border-teal-200">
              <p className="text-sm text-gray-600 mb-1">Élève sélectionné</p>
              <p className="text-lg font-bold text-gray-900">
                {selectedStudent.nom} {selectedStudent.prenom}
              </p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Note de conduite
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="20"
                value={conduiteValue}
                onChange={(e) => setConduiteValue(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
                placeholder="Ex: 16.5"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowConduiteModal(false);
                  setSelectedStudent(null);
                  setConduiteValue('');
                }}
                className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-200"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveConduite}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
