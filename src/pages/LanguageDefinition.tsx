import { useState } from 'react';
import { ArrowLeft, Search, Save, CheckCircle2, Languages } from 'lucide-react';

type Grade = '1ère' | 'Tle';
type Language = 'Français' | 'Anglais' | 'Allemand' | 'Espagnol';

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
  lv1: Language | null;
  lv2: Language | null;
}

const mockClasses: Class[] = [
  { id: '1', name: '1ere A2A', grade: '1ère', studentCount: 42 },
  { id: '2', name: '1ere B1', grade: '1ère', studentCount: 38 },
  { id: '3', name: 'Tle A2A', grade: 'Tle', studentCount: 45 },
  { id: '4', name: 'Tle B1', grade: 'Tle', studentCount: 40 },
  { id: '5', name: 'Tle C1', grade: 'Tle', studentCount: 48 },
];

const mockStudents: Student[] = [
  { id: '1', educmasterId: '210090223128', lastName: 'ABDOULAYE', firstName: 'Raéhanath Olayidé', gender: 'F', birthPlace: 'PORTO - NOVO', lv1: 'Allemand', lv2: 'Anglais' },
  { id: '2', educmasterId: '101090173935', lastName: 'ADJINAKOU', firstName: 'Sonagnon Robert', gender: 'M', birthPlace: 'Cotonou', lv1: null, lv2: null },
  { id: '3', educmasterId: '104120219413', lastName: 'AGOSSOU', firstName: 'Yemalin Léonard', gender: 'M', birthPlace: 'Houédo-Aguekon', lv1: 'Espagnol', lv2: 'Anglais' },
  { id: '4', educmasterId: '110090214197', lastName: 'AGUEH', firstName: 'Boris Michel Nouèssedo', gender: 'M', birthPlace: 'PORTO-NOVO', lv1: 'Espagnol', lv2: 'Anglais' },
  { id: '5', educmasterId: '205090046095', lastName: 'ALAO', firstName: 'Adjokè Salamatou Cévrine', gender: 'F', birthPlace: 'Agblangandan', lv1: 'Espagnol', lv2: 'Anglais' },
  { id: '6', educmasterId: '206090158832', lastName: 'ASSOGBA', firstName: 'Mahoutin Adèle', gender: 'F', birthPlace: 'PORTO-NOVO', lv1: 'Espagnol', lv2: 'Anglais' },
  { id: '7', educmasterId: '206090143927', lastName: 'AVOCEFOHOUN', firstName: 'Dègnon Anicette Merveille', gender: 'F', birthPlace: 'ADJARRA', lv1: 'Espagnol', lv2: 'Anglais' },
];

const availableLanguages: Language[] = ['Français', 'Anglais', 'Allemand', 'Espagnol'];

export const LanguageDefinition = () => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>('1ère');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<Set<string>>(new Set());
  const [bulkLV1, setBulkLV1] = useState<Language>('Français');
  const [bulkLV2, setBulkLV2] = useState<Language>('Français');
  const [showSuccess, setShowSuccess] = useState(false);

  const grades: Grade[] = ['1ère', 'Tle'];

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

  const handleBulkLVUpdate = () => {
    console.log('Updating LV for students:', Array.from(selectedStudents), 'LV1:', bulkLV1, 'LV2:', bulkLV2);
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
              <div className="bg-primary-100 p-3 rounded-lg mr-4">
                <Languages className="w-8 h-8 text-primary-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                Définition des Langues Vivantes (LV)
              </h1>
            </div>

            <p className="text-center text-gray-600 mb-8">
              Veuillez <span className="text-primary-500 font-medium">sélectionner une classe</span> pour continuer.
            </p>

            <div className="flex justify-center gap-2 mb-8">
              {grades.map((grade) => (
                <button
                  key={grade}
                  onClick={() => setSelectedGrade(grade)}
                  className={`px-8 py-3 rounded-lg font-medium transition-all ${
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
                Les classes littéraires disponibles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredClasses.map((classItem) => (
                <button
                  key={classItem.id}
                  onClick={() => setSelectedClass(classItem)}
                  className="group bg-gradient-to-br from-white to-primary-50 border-2 border-gray-200 rounded-xl p-6 hover:border-primary-500 hover:shadow-lg transition-all text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-400 to-primary-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Languages className="w-8 h-8 text-white" />
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
              Langues vivantes mises à jour avec succès pour {selectedStudents.size} élève(s)
            </p>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Languages className="w-7 h-7" />
              Définition des LV des élèves de la {selectedClass.name}
            </h1>
            <p className="text-primary-100 mt-2">
              NB: Cochez devant tous les élèves pour lesquels vous voulez configurer les LV et allez vers le bas pour choisir leur LV1 et LV2.
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
                        LV1
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        LV2
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
                          {student.lv1 ? (
                            <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                              {student.lv1}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">Non défini</span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {student.lv2 ? (
                            <span className="px-3 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
                              {student.lv2}
                            </span>
                          ) : (
                            <span className="text-gray-400 text-xs">Non défini</span>
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
              <div className="mt-8 bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200 rounded-xl p-6 animate-slide-up">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Languages className="w-5 h-5 text-primary-500" />
                  Configuration des langues vivantes ({selectedStudents.size} élève(s) sélectionné(s))
                </h3>
                <div className="flex items-end gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sélectionnez LV1
                    </label>
                    <select
                      value={bulkLV1}
                      onChange={(e) => setBulkLV1(e.target.value as Language)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-medium"
                    >
                      {availableLanguages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Sélectionnez LV2
                    </label>
                    <select
                      value={bulkLV2}
                      onChange={(e) => setBulkLV2(e.target.value as Language)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-medium"
                    >
                      {availableLanguages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                  <button
                    onClick={handleBulkLVUpdate}
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
