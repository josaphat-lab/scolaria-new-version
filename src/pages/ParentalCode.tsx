import { useState } from 'react';
import { Users, Key, Calendar, CheckCircle, X, Copy, Check } from 'lucide-react';

interface Student {
  id: string;
  matricule: string;
  lastName: string;
  firstName: string;
  parentalCode: string | null;
  lastConnection: string | null;
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
      { id: '1', matricule: '1151023281732', lastName: 'ABIB', firstName: 'Anrif Olaidé', parentalCode: null, lastConnection: null },
      { id: '2', matricule: '111122174857', lastName: 'ABIKOU', firstName: 'Jesukpego Mickael', parentalCode: 'PARENT2024X7K', lastConnection: '2024-12-20 14:30' },
      { id: '3', matricule: '2151023409431', lastName: 'ADECHOKAN', firstName: 'Anfiyath Oluwabukola', parentalCode: null, lastConnection: null },
      { id: '4', matricule: '2151023002346', lastName: 'ADELAKOUN', firstName: 'Aliciella Omoyèlé', parentalCode: 'PARENT2024M9P', lastConnection: '2024-12-25 09:15' },
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

export const ParentalCode = () => {
  const [selectedYear, setSelectedYear] = useState('6eme');
  const [selectedClass, setSelectedClass] = useState<ClassData | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [codeCopied, setCodeCopied] = useState(false);

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'PARENT2024';
    for (let i = 0; i < 3; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleGenerateCode = (student: Student) => {
    const code = generateCode();
    setGeneratedCode(code);
    setSelectedStudent(student);
    setShowModal(true);
    setCodeCopied(false);
  };

  const handleConfirmCode = () => {
    if (selectedStudent) {
      setStudents(students.map(s =>
        s.id === selectedStudent.id
          ? { ...s, parentalCode: generatedCode }
          : s
      ));
    }
    setShowModal(false);
    setSelectedStudent(null);
  };

  const handleSelectClass = (classData: ClassData) => {
    setSelectedClass(classData);
    setStudents(classData.students);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generatedCode);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const totalConnections = students.filter(s => s.lastConnection).length;

  if (!selectedClass) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-10">
              <div className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                    <Key className="w-8 h-8 text-white" />
                  </div>
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Code parental</h1>
                <p className="text-primary-100 text-sm">
                  Connexion Total : {totalConnections}
                </p>
              </div>
            </div>

            <div className="p-8">
              <div className="mb-8">
                <p className="text-gray-600 mb-4">
                  Veuillez <span className="text-pink-500 font-medium">sélectionner une classe</span> pour commencer.
                </p>

                <div className="flex gap-3 mb-6 border-b border-gray-200">
                  {yearLevels.map((year) => (
                    <button
                      key={year.id}
                      onClick={() => setSelectedYear(year.id)}
                      className={`px-6 py-3 font-medium transition-all ${
                        selectedYear === year.id
                          ? 'text-white bg-emerald-500 rounded-t-lg'
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
                      className="bg-white border border-gray-200 rounded-xl p-6 hover:border-primary-500 hover:shadow-lg transition-all text-left group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-gradient-to-br from-amber-100 to-amber-200 p-4 rounded-lg group-hover:from-primary-100 group-hover:to-primary-200 transition-all">
                          <Users className="w-8 h-8 text-amber-600 group-hover:text-primary-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{classData.name}</h3>
                          <p className="text-sm text-gray-500">Sélectionnez la classe</p>
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
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                      <Key className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white">Code parental - {selectedClass.name}</h1>
                  </div>
                  <p className="text-primary-100 text-sm">
                    Génération et gestion des codes d'accès parents
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedClass(null);
                    setStudents([]);
                  }}
                  className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all flex items-center gap-2"
                >
                  Changer de classe
                </button>
              </div>
            </div>

            <div className="p-8">
              {students.length === 0 ? (
                <div className="text-center py-20">
                  <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Aucun élève dans cette classe</p>
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Matricule
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Nom
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Prénom
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Code Parental
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Dernière Connexion
                          </th>
                          <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {students.map((student, index) => (
                          <tr
                            key={student.id}
                            className="hover:bg-gray-50 transition-colors"
                            style={{ animationDelay: `${index * 50}ms` }}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-medium text-gray-900">{student.matricule}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm font-semibold text-gray-900">{student.lastName}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="text-sm text-gray-700">{student.firstName}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {student.parentalCode ? (
                                <div className="flex items-center gap-2">
                                  <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                                    {student.parentalCode}
                                  </span>
                                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400 italic">Non généré</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {student.lastConnection ? (
                                <div className="flex items-center gap-2 text-sm text-gray-700">
                                  <Calendar className="w-4 h-4 text-gray-400" />
                                  {student.lastConnection}
                                </div>
                              ) : (
                                <span className="text-sm text-gray-400 italic">Jamais connecté</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {!student.parentalCode && (
                                <button
                                  onClick={() => handleGenerateCode(student)}
                                  className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-sm hover:shadow-md flex items-center gap-2"
                                >
                                  <Key className="w-4 h-4" />
                                  Générer
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Code généré avec succès !</h3>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <p className="text-emerald-50 text-sm">
                Le code parental a été créé pour l'élève
              </p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Élève concerné :</p>
                <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <p className="font-semibold text-gray-900">{selectedStudent?.firstName} {selectedStudent?.lastName}</p>
                  <p className="text-sm text-gray-500">Matricule: {selectedStudent?.matricule}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Code d'accès parent :</p>
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-6 border-2 border-emerald-300 relative">
                  <div className="text-center">
                    <p className="text-3xl font-mono font-bold text-emerald-900 tracking-wider mb-3">
                      {generatedCode}
                    </p>
                    <button
                      onClick={handleCopyCode}
                      className="inline-flex items-center gap-2 text-sm text-emerald-700 hover:text-emerald-800 font-medium"
                    >
                      {codeCopied ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copié !
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copier le code
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Important :</span> Veuillez communiquer ce code au parent de l'élève.
                  Il pourra l'utiliser pour suivre l'évolution scolaire de son enfant.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all"
                >
                  Annuler
                </button>
                <button
                  onClick={handleConfirmCode}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
                >
                  Confirmer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
