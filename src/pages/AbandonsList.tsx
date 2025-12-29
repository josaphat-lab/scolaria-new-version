import { useState } from 'react';
import { Users, Search, Save, UserX, ArrowLeft } from 'lucide-react';

interface Student {
  id: string;
  educmasterId: string;
  lastName: string;
  firstName: string;
  gender: 'M' | 'F';
  birthDate: string;
  abandonDate: string;
  isRestored: boolean;
}

interface ClassData {
  id: string;
  name: string;
  students: Student[];
}

const mockClasses: ClassData[] = [
  {
    id: '6ema',
    name: '6eme MA',
    students: [
      {
        id: '1',
        educmasterId: '1151023281732',
        lastName: 'ABIB',
        firstName: 'Anrif Olaidé',
        gender: 'M',
        birthDate: '15/03/2010',
        abandonDate: '12/11/2024',
        isRestored: false
      },
      {
        id: '2',
        educmasterId: '111122174857',
        lastName: 'ABIKOU',
        firstName: 'Jesukpego Mickael',
        gender: 'M',
        birthDate: '22/08/2010',
        abandonDate: '05/10/2024',
        isRestored: false
      },
      {
        id: '3',
        educmasterId: '2151023409431',
        lastName: 'ADECHOKAN',
        firstName: 'Anfiyath Oluwabukola',
        gender: 'F',
        birthDate: '10/01/2011',
        abandonDate: '18/09/2024',
        isRestored: false
      },
    ]
  },
  {
    id: '6emb',
    name: '6eme MB',
    students: []
  },
  {
    id: '6emc',
    name: '6eme MC',
    students: []
  },
  {
    id: '6emd',
    name: '6eme MD',
    students: []
  },
  {
    id: '6eme',
    name: '6eme ME',
    students: []
  },
  {
    id: '6emf',
    name: '6eme MF',
    students: []
  },
  {
    id: '6emg',
    name: '6eme MG',
    students: []
  },
  {
    id: '6emh',
    name: '6eme MH',
    students: []
  },
  {
    id: '6emi',
    name: '6eme MI',
    students: []
  }
];

const yearLevels = [
  { id: '6eme', label: '6ème' },
  { id: '5eme', label: '5ème' },
  { id: '4eme', label: '4ème' },
  { id: '3eme', label: '3ème' },
  { id: '2nd', label: '2nd' },
  { id: '1ere', label: '1ère' },
  { id: 'tle', label: 'Tle' }
];

export const AbandonsList = () => {
  const [selectedYear, setSelectedYear] = useState('6eme');
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [hasChanges, setHasChanges] = useState(false);

  const handleSelectClass = (classData: ClassData) => {
    setSelectedClass(classData);
    setStudents(classData.students);
    setSearchQuery('');
    setHasChanges(false);
  };

  const handleToggleRestore = (studentId: string) => {
    setStudents(students.map(s =>
      s.id === studentId ? { ...s, isRestored: !s.isRestored } : s
    ));
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    setHasChanges(false);
  };

  const filteredStudents = students.filter(student =>
    student.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.educmasterId.includes(searchQuery)
  );

  const restoredCount = students.filter(s => s.isRestored).length;

  if (!selectedClass) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-10">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <UserX className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Liste des abandons</h1>
                <p className="text-red-100 text-sm">
                  Gestion et rétablissement des élèves ayant abandonné
                </p>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <p className="text-gray-600 mb-4">
                  Veuillez <span className="text-pink-500 font-medium">sélectionner une classe</span> pour afficher les abandons.
                </p>

                <div className="flex gap-3 mb-6 border-b border-gray-200">
                  {yearLevels.map((year) => (
                    <button
                      key={year.id}
                      onClick={() => setSelectedYear(year.id)}
                      className={`px-6 py-3 font-medium transition-all ${
                        selectedYear === year.id
                          ? 'text-white bg-red-500 rounded-t-lg'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-t-lg'
                      }`}
                    >
                      {year.label}
                    </button>
                  ))}
                </div>

                <p className="text-sm text-gray-500 mb-4">Les classes disponibles</p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockClasses.map((classData) => (
                    <button
                      key={classData.id}
                      onClick={() => handleSelectClass(classData)}
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:border-red-500 hover:shadow-lg transition-all text-left group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-gradient-to-br from-red-100 to-red-200 p-4 rounded-lg group-hover:from-red-200 group-hover:to-red-300 transition-all">
                          <Users className="w-8 h-8 text-red-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{classData.name}</h3>
                          <p className="text-sm text-gray-500">
                            {classData.students.length} abandon{classData.students.length > 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <UserX className="w-6 h-6 text-white" />
                  </div>
                  <h1 className="text-2xl font-bold text-white">
                    Liste des abandons de la <span className="text-red-100">{selectedClass.name}</span>
                  </h1>
                </div>
                <p className="text-red-100 text-sm">
                  {students.length} élève{students.length > 1 ? 's' : ''} en abandon
                  {restoredCount > 0 && ` • ${restoredCount} à rétablir`}
                </p>
              </div>
              <button
                onClick={() => {
                  setSelectedClass(null);
                  setStudents([]);
                  setHasChanges(false);
                }}
                className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour
              </button>
            </div>
          </div>

          <div className="p-8">
            {students.length === 0 ? (
              <div className="text-center py-20">
                <UserX className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Aucun abandon dans cette classe</p>
                <p className="text-gray-400 text-sm mt-2">Tous les élèves sont actifs</p>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-end">
                  <div className="relative w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Rechercher un élève..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-md mb-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 border-b-2 border-gray-300">
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            N° Educmaster
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Nom de l'élève
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Prénoms de l'élève
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Sexe
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Date de naissance
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Date d'abandon
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Rétablir
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredStudents.map((student, index) => (
                          <tr
                            key={student.id}
                            className={`hover:bg-gray-50 transition-colors ${
                              student.isRestored ? 'bg-green-50' : ''
                            }`}
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <td className="px-6 py-5 whitespace-nowrap">
                              <span className="text-sm font-mono text-gray-700 bg-gray-100 px-3 py-1 rounded-lg">
                                {student.educmasterId}
                              </span>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <span className="text-sm font-bold text-gray-900">{student.lastName}</span>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <span className="text-sm text-gray-700">{student.firstName}</span>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm ${
                                student.gender === 'M'
                                  ? 'bg-blue-100 text-blue-700'
                                  : 'bg-pink-100 text-pink-700'
                              }`}>
                                {student.gender}
                              </span>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <span className="text-sm text-gray-700">{student.birthDate}</span>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-red-100 text-red-700 border border-red-300">
                                {student.abandonDate}
                              </span>
                            </td>
                            <td className="px-6 py-5 whitespace-nowrap">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => handleToggleRestore(student.id)}
                                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
                                    student.isRestored
                                      ? 'bg-green-500'
                                      : 'bg-gray-300'
                                  }`}
                                >
                                  <span
                                    className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform ${
                                      student.isRestored ? 'translate-x-8' : 'translate-x-1'
                                    }`}
                                  />
                                </button>
                                <span className={`text-sm font-medium ${
                                  student.isRestored ? 'text-green-700' : 'text-gray-500'
                                }`}>
                                  {student.isRestored ? 'À rétablir' : 'Abandonné'}
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {hasChanges && (
                  <div className="flex items-center justify-center">
                    <button
                      onClick={handleSaveChanges}
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl text-base font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-3 transform hover:scale-105"
                    >
                      <Save className="w-5 h-5" />
                      Enregistrer les modifications
                      {restoredCount > 0 && (
                        <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                          {restoredCount}
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
