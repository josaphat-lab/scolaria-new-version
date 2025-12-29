import React, { useState } from 'react';
import { ArrowLeft, Search, UserX, AlertCircle, Save } from 'lucide-react';

interface Student {
  id: string;
  nom: string;
  prenom: string;
  sexe: 'M' | 'F';
  isAbandoned: boolean;
}

const STUDENTS_DATA: Student[] = [
  { id: '1', nom: 'ABIB', prenom: 'Anrif Olaidé', sexe: 'M', isAbandoned: false },
  { id: '2', nom: 'ABIKOU', prenom: 'Jesukpego Mickael Jacques', sexe: 'M', isAbandoned: false },
  { id: '3', nom: 'ADECHOKAN', prenom: 'Anfiyath Oluwabukola Adouni', sexe: 'F', isAbandoned: false },
  { id: '4', nom: 'ADELAKOUN', prenom: 'Aliciella Omoyélé Love', sexe: 'F', isAbandoned: false },
  { id: '5', nom: 'ADOUNVO', prenom: 'Ange Godfroy', sexe: 'M', isAbandoned: false },
  { id: '6', nom: 'AFFOKPLATADE', prenom: 'Houéfa Mirabelle', sexe: 'F', isAbandoned: false },
  { id: '7', nom: 'AGBANGBATIN', prenom: 'Fifamè Océanne Kate', sexe: 'F', isAbandoned: false },
  { id: '8', nom: 'AGOSSOU', prenom: 'Edmonde fifamè', sexe: 'F', isAbandoned: false },
];

interface AbandonSemestre2Props {
  classeName: string;
  onBack: () => void;
}

export const AbandonSemestre2: React.FC<AbandonSemestre2Props> = ({ classeName, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState<Student[]>(STUDENTS_DATA);
  const [hasChanges, setHasChanges] = useState(false);

  const filteredStudents = students.filter(
    (student) =>
      student.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.prenom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleAbandoned = (studentId: string) => {
    setStudents(
      students.map((student) =>
        student.id === studentId ? { ...student, isAbandoned: !student.isAbandoned } : student
      )
    );
    setHasChanges(true);
  };

  const handleSave = () => {
    const abandonedCount = students.filter((s) => s.isAbandoned).length;
    alert(`${abandonedCount} élève(s) marqué(s) comme ayant abandonné au 2nd semestre`);
    setHasChanges(false);
  };

  const abandonedCount = students.filter((s) => s.isAbandoned).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
        >
          <ArrowLeft className="w-5 h-5" />
          Retour
        </button>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Définition des abandons du second semestre de la{' '}
            <span className="text-amber-600">{classeName}</span>
          </h2>
        </div>

        <div className="bg-gradient-to-r from-amber-100 to-yellow-100 rounded-xl shadow-lg p-6 border-2 border-amber-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Note importante</h4>
              <p className="text-gray-700">
                <strong>NB:</strong> Cochez devant tous les élèves qui ont abandonné au second semestre.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-amber-200">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-yellow-200 rounded-lg flex items-center justify-center">
                <UserX className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Élèves ayant abandonné</p>
                <p className="text-2xl font-bold text-amber-600">{abandonedCount}</p>
              </div>
            </div>

            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-amber-200">
          <div className="bg-gradient-to-r from-amber-500 to-yellow-600 px-6 py-4">
            <div className="flex items-center gap-3 text-white">
              <UserX className="w-6 h-6" />
              <h3 className="text-xl font-bold">Liste des élèves</h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-amber-100 to-yellow-100">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Nom</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Prénoms</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-800">Sexe</th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-800">
                    Définir abandon
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-amber-100">
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`transition-colors duration-150 ${
                      student.isAbandoned
                        ? 'bg-amber-100 hover:bg-amber-150'
                        : index % 2 === 0
                        ? 'bg-white hover:bg-amber-50'
                        : 'bg-amber-50/50 hover:bg-amber-100'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">{student.nom}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{student.prenom}</td>
                    <td className="px-6 py-4 text-sm text-gray-900 text-center">{student.sexe}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleToggleAbandoned(student.id)}
                        className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 ${
                          student.isAbandoned ? 'bg-amber-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-200 ${
                            student.isAbandoned ? 'translate-x-9' : 'translate-x-1'
                          }`}
                        />
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

        <div className="flex justify-center">
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className={`flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all duration-200 ${
              hasChanges
                ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-white hover:from-amber-600 hover:to-yellow-700 hover:shadow-amber-500/50'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Save className="w-6 h-6" />
            Sauvegarder les modifications
          </button>
        </div>
      </div>
    </div>
  );
};
