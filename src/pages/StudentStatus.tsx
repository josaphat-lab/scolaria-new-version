import { useState } from 'react';
import { ArrowLeft, Search, Save, CheckCircle2 } from 'lucide-react';

type Grade = '6ème' | '5ème' | '4ème' | '3ème' | '2nd' | '1ère' | 'Tle';
type Status = 'N' | 'R';

interface Class {
  id: string;
  name: string;
  grade: Grade;
  studentCount: number;
}

interface Student {
  id: string;
  educmasterId: string;
  lastName: string;
  firstName: string;
  gender: 'M' | 'F';
  birthPlace: string;
  status: Status;
}

const mockClasses: Class[] = [
  { id: '1', name: '6ème MA', grade: '6ème', studentCount: 42 },
  { id: '2', name: '6ème MB', grade: '6ème', studentCount: 38 },
  { id: '3', name: '6ème MC', grade: '6ème', studentCount: 40 },
  { id: '4', name: 'Tle A2A', grade: 'Tle', studentCount: 44 },
  { id: '5', name: 'Tle B1', grade: 'Tle', studentCount: 35 },
  { id: '6', name: 'Tle C1', grade: 'Tle', studentCount: 48 },
];

const mockStudents: Student[] = [
  { id: '1', educmasterId: '1151023198697', lastName: 'ADANDE', firstName: 'Dona Isaac', gender: 'M', birthPlace: 'Porto-Novo', status: 'N' },
  { id: '2', educmasterId: '1081023046183', lastName: 'ADEBOLA', firstName: 'Amidou Hiyanda', gender: 'M', birthPlace: 'Agblangandan', status: 'N' },
  { id: '3', educmasterId: '1151024038082', lastName: 'ADJIBOLA', firstName: 'Imrane Akinyèmi Ichola', gender: 'M', birthPlace: 'HOUINME DJAGUIDI', status: 'N' },
  { id: '4', educmasterId: '2151023409435', lastName: 'AHOUANDJINOU', firstName: 'Sènami Marie-Jacqueline Emmanuella', gender: 'F', birthPlace: 'Porto-Novo', status: 'N' },
  { id: '5', educmasterId: '1131023814410', lastName: 'AKOTONOU', firstName: 'Hubert', gender: 'M', birthPlace: 'Malanhoui', status: 'N' },
  { id: '6', educmasterId: '2141023801916', lastName: 'AKPAKI', firstName: 'Oluwachègoun Grâce Almérida', gender: 'F', birthPlace: 'Porto-Novo', status: 'N' },
  { id: '7', educmasterId: '2151023036713', lastName: 'ALLAGBE', firstName: 'Marie Stella', gender: 'F', birthPlace: 'Hounsouko', status: 'N' },
];

export const StudentStatus = () => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>('6ème');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<Status>('N');
  const [showSuccess, setShowSuccess] = useState(false);

  const grades: Grade[] = ['6ème', '5ème', '4ème', '3ème', '2nd', '1ère', 'Tle'];

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
    console.log('Updating status for students:', Array.from(selectedStudents), 'to', bulkStatus);
    setShowSuccess(true);
    setSelectedStudents(new Set());
    setTimeout(() => setShowSuccess(false), 3000);
  };

  if (!selectedClass) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
              Définition de statuts des élèves
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Veuillez <span className="text-primary-500 font-medium">sélectionner une classe</span> pour définir le statut des élèves.
            </p>

            <div className="flex justify-center gap-2 mb-8 flex-wrap">
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

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Les classes disponibles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((classItem) => (
                <button
                  key={classItem.id}
                  onClick={() => setSelectedClass(classItem)}
                  className="group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary-500 hover:shadow-lg transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-primary-100 rounded-lg flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                      <span className="text-2xl font-bold text-primary-600 group-hover:text-white transition-colors">
                        {classItem.name.substring(0, 2)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-500 transition-colors">
                        {classItem.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">{classItem.studentCount}</span> élèves
                      </p>
                      <p className="text-sm text-primary-500 font-medium mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
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
              Statuts mis à jour avec succès pour {selectedStudents.size} élève(s)
            </p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">
              Définition de statuts des élèves de la {selectedClass.name}
            </h1>
            <p className="text-primary-100 mt-2">
              NB: Cochez devant tous les élèves pour lesquels vous voulez changer de statut et allez vers le bas pour choisir le statut convenable.
            </p>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold text-primary-500">{selectedStudents.size}</span> élève(s) sélectionné(s)
                </p>
              </div>
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher un élève..."
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
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
                          className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
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
                        Lieu de naissance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut actuel
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredStudents.map((student) => (
                      <tr
                        key={student.id}
                        className={`hover:bg-gray-50 transition-colors ${
                          selectedStudents.has(student.id) ? 'bg-primary-50' : ''
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="checkbox"
                            checked={selectedStudents.has(student.id)}
                            onChange={() => toggleStudent(student.id)}
                            className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500 cursor-pointer"
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {student.birthPlace}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                            student.status === 'N'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-orange-100 text-orange-800'
                          }`}>
                            {student.status === 'N' ? 'Passant (N)' : 'Redoublant (R)'}
                          </span>
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
              <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200 rounded-xl p-6 animate-slide-up">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Action en masse ({selectedStudents.size} élève(s) sélectionné(s))
                </h3>
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sélectionnez le statut
                    </label>
                    <select
                      value={bulkStatus}
                      onChange={(e) => setBulkStatus(e.target.value as Status)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-medium"
                    >
                      <option value="N">Passant (N)</option>
                      <option value="R">Redoublant (R)</option>
                    </select>
                  </div>
                  <button
                    onClick={handleBulkStatusUpdate}
                    className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium shadow-lg hover:shadow-xl"
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
