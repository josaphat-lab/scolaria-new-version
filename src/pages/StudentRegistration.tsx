import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, UserPlus, Upload, List, Download, Search, MoreVertical, Edit, Trash2, Info } from 'lucide-react';
import { CompleteInfoModal, EditModal, DeleteConfirmModal } from '../components/StudentModals';

type Grade = '6ème' | '5ème' | '4ème' | '3ème' | '2nd' | '1ère' | 'Tle';
type TabType = 'form' | 'import' | 'list';

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
  birthDate: string;
  birthPlace: string;
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
  { id: '1', educmasterId: '105090028793', lastName: 'ABIDJO', firstName: 'Abdel Babatoundé', gender: 'M', birthDate: '2008-05-15', birthPlace: 'Porto-Novo' },
  { id: '2', educmasterId: '214102310798', lastName: 'ADANTCHEDE', firstName: 'Diane Mahunan', gender: 'F', birthDate: '2008-03-22', birthPlace: 'GUEVIE' },
  { id: '3', educmasterId: '214102376799', lastName: 'ADELAKOUN', firstName: 'Olorountogni Marjolaine Bénie', gender: 'F', birthDate: '2008-07-10', birthPlace: 'Porto-Novo' },
];

export const StudentRegistration = () => {
  const [selectedGrade, setSelectedGrade] = useState<Grade>('6ème');
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('form');
  const [searchQuery, setSearchQuery] = useState('');
  const [openActionMenu, setOpenActionMenu] = useState<string | null>(null);
  const [completeInfoModal, setCompleteInfoModal] = useState<Student | null>(null);
  const [editModal, setEditModal] = useState<Student | null>(null);
  const [deleteModal, setDeleteModal] = useState<Student | null>(null);

  const grades: Grade[] = ['6ème', '5ème', '4ème', '3ème', '2nd', '1ère', 'Tle'];

  const filteredClasses = mockClasses.filter(c => c.grade === selectedGrade);
  const filteredStudents = mockStudents.filter(s =>
    s.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.educmasterId.includes(searchQuery)
  );

  const handleCompleteInfo = (data: any) => {
    console.log('Complete info:', data);
    setCompleteInfoModal(null);
    setOpenActionMenu(null);
  };

  const handleEdit = (data: any) => {
    console.log('Edit student:', data);
    setEditModal(null);
    setOpenActionMenu(null);
  };

  const handleDelete = () => {
    console.log('Delete student');
    setOpenActionMenu(null);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.action-menu-container')) {
        setOpenActionMenu(null);
      }
    };

    if (openActionMenu) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [openActionMenu]);

  if (!selectedClass) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
            <h1 className="text-3xl font-bold text-gray-900 text-center mb-2">
              Inscription des élèves
            </h1>
            <p className="text-center text-gray-600 mb-8">
              Veuillez <span className="text-primary-500 font-medium">sélectionner une classe</span> pour commencer.
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
            onClick={() => setSelectedClass(null)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Retour
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-500 to-primary-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">
              Administration des données de la classe {selectedClass.name}
            </h1>
            <p className="text-primary-100 mt-1">
              Effectif actuel: <span className="font-bold text-white">{filteredStudents.length}</span> élèves
            </p>
          </div>

          <div className="border-b border-gray-200">
            <div className="flex gap-1 px-8">
              <button
                onClick={() => setActiveTab('form')}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors relative ${
                  activeTab === 'form'
                    ? 'text-primary-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                Inscription unique
                {activeTab === 'form' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('import')}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors relative ${
                  activeTab === 'import'
                    ? 'text-primary-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Upload className="w-4 h-4" />
                Import Excel
                {activeTab === 'import' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500" />
                )}
              </button>
              <button
                onClick={() => setActiveTab('list')}
                className={`flex items-center gap-2 px-6 py-4 font-medium text-sm transition-colors relative ${
                  activeTab === 'list'
                    ? 'text-primary-500'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <List className="w-4 h-4" />
                Liste des élèves
                {activeTab === 'list' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500" />
                )}
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'form' && (
              <div className="max-w-4xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Ajouter un élève
                </h2>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        N° Educmaster de l'élève
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Ex: 105090028793"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nom de l'élève
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Nom de famille"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Prénoms de l'élève
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Prénoms"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sexe
                      </label>
                      <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option value="">Sélectionner</option>
                        <option value="M">Masculin</option>
                        <option value="F">Féminin</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date de naissance
                      </label>
                      <input
                        type="date"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Lieu de naissance
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Ville de naissance"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
                    >
                      <UserPlus className="w-5 h-5" />
                      Ajouter l'élève à la liste de la classe
                    </button>
                  </div>
                </form>
              </div>
            )}

            {activeTab === 'import' && (
              <div className="max-w-3xl">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Importer des élèves par fichier Excel
                </h2>
                <p className="text-gray-600 mb-6">
                  Téléchargez le fichier exemple, remplissez-le avec les données des élèves, puis importez-le.
                </p>

                <div className="bg-primary-50 border-2 border-dashed border-primary-300 rounded-xl p-8 mb-6">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-primary-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Glissez-déposez votre fichier Excel ici
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      ou cliquez pour sélectionner un fichier
                    </p>
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      className="hidden"
                      id="excel-upload"
                    />
                    <label
                      htmlFor="excel-upload"
                      className="inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium cursor-pointer"
                    >
                      Choisir un fichier
                    </label>
                    <p className="text-xs text-gray-500 mt-3">
                      Formats acceptés: .xlsx, .xls (Max 5MB)
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-gray-50 rounded-lg border border-gray-200">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Besoin du fichier modèle ?
                    </h4>
                    <p className="text-sm text-gray-600">
                      Téléchargez notre fichier Excel exemple avec les colonnes requises
                    </p>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2.5 bg-secondary-500 text-white rounded-lg hover:bg-secondary-600 transition-colors font-medium whitespace-nowrap">
                    <Download className="w-4 h-4" />
                    Télécharger le modèle
                  </button>
                </div>

                <div className="mt-6">
                  <button className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium">
                    <Upload className="w-5 h-5" />
                    Importer les élèves
                  </button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    Informations importantes
                  </h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Le fichier doit contenir les colonnes: N° Educmaster, Nom, Prénoms, Sexe, Date de naissance, Lieu de naissance</li>
                    <li>• Le format de date doit être: JJ/MM/AAAA</li>
                    <li>• Les doublons seront automatiquement détectés et ignorés</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'list' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-1">
                      Liste des élèves
                    </h2>
                    <p className="text-sm text-gray-600">
                      Effectif de la classe: <span className="font-semibold text-primary-500">{filteredStudents.length}</span>
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
                            Sexe
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Lieu de naissance
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredStudents.map((student) => (
                          <tr key={student.id} className="hover:bg-gray-50">
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
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                student.gender === 'M'
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-pink-100 text-pink-800'
                              }`}>
                                {student.gender === 'M' ? 'Masculin' : 'Féminin'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {student.birthPlace}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              <div className="relative action-menu-container">
                                <button
                                  onClick={() => setOpenActionMenu(openActionMenu === student.id ? null : student.id)}
                                  className="p-1 hover:bg-gray-100 rounded transition-colors"
                                >
                                  <MoreVertical className="w-5 h-5 text-gray-600" />
                                </button>
                                {openActionMenu === student.id && (
                                  <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                                    <button
                                      onClick={() => {
                                        setCompleteInfoModal(student);
                                        setOpenActionMenu(null);
                                      }}
                                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                      <Info className="w-4 h-4" />
                                      Compléter les informations
                                    </button>
                                    <button
                                      onClick={() => {
                                        setEditModal(student);
                                        setOpenActionMenu(null);
                                      }}
                                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                    >
                                      <Edit className="w-4 h-4" />
                                      Modifier
                                    </button>
                                    <button
                                      onClick={() => {
                                        setDeleteModal(student);
                                        setOpenActionMenu(null);
                                      }}
                                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                      Retirer de la classe
                                    </button>
                                  </div>
                                )}
                              </div>
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
              </div>
            )}
          </div>
        </div>

        {completeInfoModal && (
          <CompleteInfoModal
            isOpen={true}
            onClose={() => setCompleteInfoModal(null)}
            student={completeInfoModal}
            onSave={handleCompleteInfo}
          />
        )}

        {editModal && (
          <EditModal
            isOpen={true}
            onClose={() => setEditModal(null)}
            student={editModal}
            onSave={handleEdit}
          />
        )}

        {deleteModal && (
          <DeleteConfirmModal
            isOpen={true}
            onClose={() => setDeleteModal(null)}
            student={deleteModal}
            onConfirm={handleDelete}
          />
        )}
      </div>
    </div>
  );
};
