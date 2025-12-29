import { useState } from 'react';
import { ArrowLeft, Search, Save, CheckCircle2, AlertCircle } from 'lucide-react';

type Status = 'APTE' | 'INAPTE';

interface Class {
  id: string;
  name: string;
  grade: string;
  studentCount: number;
}

interface Student {
  id: string;
  educmasterId: string;
  lastName: string;
  firstName: string;
  gender: 'M' | 'F';
  status: Status;
}

const mockClasses: Class[] = [
  { id: '1', name: '6eme MA', grade: '6ème', studentCount: 45 },
  { id: '2', name: '6eme MB', grade: '6ème', studentCount: 42 },
  { id: '3', name: '5eme A', grade: '5ème', studentCount: 48 },
  { id: '4', name: '5eme B', grade: '5ème', studentCount: 44 },
  { id: '5', name: '4eme A', grade: '4ème', studentCount: 46 },
  { id: '6', name: '4eme B', grade: '4ème', studentCount: 43 },
  { id: '7', name: '3eme A', grade: '3ème', studentCount: 50 },
  { id: '8', name: '3eme B', grade: '3ème', studentCount: 47 },
  { id: '9', name: '2nde A', grade: '2nde', studentCount: 44 },
  { id: '10', name: '2nde B', grade: '2nde', studentCount: 41 },
  { id: '11', name: '1ere A2A', grade: '1ère', studentCount: 42 },
  { id: '12', name: '1ere B1', grade: '1ère', studentCount: 38 },
  { id: '13', name: 'Tle A2A', grade: 'Tle', studentCount: 45 },
  { id: '14', name: 'Tle B1', grade: 'Tle', studentCount: 40 },
];

const mockStudents: Student[] = [
  { id: '1', educmasterId: '1151023281732', lastName: 'ABIB', firstName: 'Anrif Olaidé', gender: 'M', status: 'APTE' },
  { id: '2', educmasterId: '111122174857', lastName: 'ABIKOU', firstName: 'Jesukpego Mickael Jacques', gender: 'M', status: 'APTE' },
  { id: '3', educmasterId: '2151023409431', lastName: 'ADECHOKAN', firstName: 'Anfiyath Oluwabukola Adouni', gender: 'F', status: 'APTE' },
  { id: '4', educmasterId: '2151023002346', lastName: 'ADELAKOUN', firstName: 'Aliciella Omoyèlé Love', gender: 'F', status: 'APTE' },
  { id: '5', educmasterId: '1151024047813', lastName: 'ADOUNVO', firstName: 'Ange Godfroy', gender: 'M', status: 'APTE' },
  { id: '6', educmasterId: '2151023802009', lastName: 'AFFOKPLATADE', firstName: 'Houéfa Mirabelle', gender: 'F', status: 'APTE' },
  { id: '7', educmasterId: '1151023571437', lastName: 'PADONOU', firstName: 'Ange-Précieux Melchior Mahouzonsou', gender: 'M', status: 'APTE' },
  { id: '8', educmasterId: '2141023572472', lastName: 'PADONOU', firstName: 'Merveille Dona Lisette', gender: 'F', status: 'INAPTE' },
  { id: '9', educmasterId: '1151023409458', lastName: 'PADONOU', firstName: 'Iréti Suru Abdul Razack', gender: 'M', status: 'APTE' },
  { id: '10', educmasterId: '2151024039710', lastName: 'RADJI', firstName: 'Haérath', gender: 'F', status: 'APTE' },
];

const grades = ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Tle'];

export const DefineUnfit = () => {
  const [selectedGrade, setSelectedGrade] = useState('6ème');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<Status>('APTE');
  const [showSuccess, setShowSuccess] = useState(false);

  const filteredClasses = mockClasses.filter(c => c.grade === selectedGrade);
  const filteredStudents = mockStudents.filter(s =>
    s.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.educmasterId.includes(searchQuery)
  );

  const toggleStudent = (studentId: string) => {
    const newSelected = new Set(selectedStudents);
    if (newSelected.has(studentId)) {
      newSelected.delete(studentId);
    } else {
      newSelected.add(studentId);
    }
    setSelectedStudents(newSelected);
  };

  const toggleAllStudents = () => {
    if (selectedStudents.size === filteredStudents.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(new Set(filteredStudents.map(s => s.id)));
    }
  };

  const handleBulkStatusUpdate = () => {
    console.log('Updating status for students:', Array.from(selectedStudents), 'Status:', bulkStatus);
    setShowSuccess(true);
    setSelectedStudents(new Set());
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!selectedClass) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-orange-100 p-3 rounded-lg mr-4">
                <AlertCircle className="w-8 h-8 text-orange-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Définition des Inaptes
              </h1>
            </div>

            <p className="text-center text-gray-600 mb-8">
              Veuillez <span className="text-primary-500 font-medium">sélectionner une classe</span> pour continuer.
            </p>

            <div className="mb-8">
              <div className="flex flex-wrap justify-center gap-2">
                {grades.map((grade) => (
                  <button
                    key={grade}
                    onClick={() => setSelectedGrade(grade)}
                    className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                      selectedGrade === grade
                        ? 'bg-primary-500 text-white shadow-md'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {grade}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((classItem) => (
                <button
                  key={classItem.id}
                  onClick={() => setSelectedClass(classItem)}
                  className="group bg-gradient-to-br from-white to-orange-50 border-2 border-gray-200 rounded-xl p-6 hover:border-orange-500 hover:shadow-lg transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <AlertCircle className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-500 transition-colors">
                        {classItem.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{classItem.studentCount}</span> élèves
                      </p>
                      <p className="text-sm text-orange-500 font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        Sélectionner la classe →
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {filteredClasses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">Aucune classe disponible pour ce niveau</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <button
            onClick={() => {
              setSelectedClass(null);
              setSelectedStudents(new Set());
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </div>

        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3 animate-fade-in">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-green-800 font-medium">
              Statut mis à jour avec succès pour {selectedStudents.size} élève(s)
            </p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <AlertCircle className="w-7 h-7" />
              Définition des inaptes de la {selectedClass.name}
            </h1>
            <p className="text-orange-100 mt-2">
              NB: Cochez devant tous les élèves pour lesquels vous voulez changer de statut (Apte / Inapte) et allez vers le bas pour choisir le statut convenable et enregistrer.
            </p>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-orange-500">{selectedStudents.size}</span> élève(s) sélectionné(s)
                </p>
              </div>
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un élève..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          checked={selectedStudents.size === filteredStudents.length && filteredStudents.length > 0}
                          onChange={toggleAllStudents}
                          className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        N° Educmaster
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nom de l'élève
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Prénoms de l'élève
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sexe de l'élève
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className={`hover:bg-gray-50 transition-colors ${
                          selectedStudents.has(student.id) ? 'bg-orange-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedStudents.has(student.id)}
                            onChange={() => toggleStudent(student.id)}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500 cursor-pointer"
                          />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {student.educmasterId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.lastName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.firstName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.gender}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {student.status === 'APTE' ? (
                            <span className="px-3 py-1 text-xs font-bold bg-green-100 text-green-800 rounded-full">
                              APTE
                            </span>
                          ) : (
                            <span className="px-3 py-1 text-xs font-bold bg-red-100 text-red-800 rounded-full">
                              INAPTE
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredStudents.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500">
                    {searchQuery ? 'Aucun élève trouvé pour cette recherche' : 'Aucun élève dans cette classe'}
                  </p>
                </div>
              )}
            </div>

            {selectedStudents.size > 0 && (
              <div className="mt-8 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-xl p-6 animate-slide-up">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  Définir le statut ({selectedStudents.size} élève(s) sélectionné(s))
                </h3>
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sélectionnez le statut
                    </label>
                    <select
                      value={bulkStatus}
                      onChange={(e) => setBulkStatus(e.target.value as Status)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-medium"
                    >
                      <option value="APTE">Apte</option>
                      <option value="INAPTE">Inapte</option>
                    </select>
                  </div>
                  <button
                    onClick={handleBulkStatusUpdate}
                    className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-lg hover:shadow-xl"
                  >
                    <Save className="w-5 h-5" />
                    Enregistrer
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
