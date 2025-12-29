import React, { useState } from 'react';
import { Users, Download, ArrowLeft } from 'lucide-react';

type MainTabType = 'liste-gp' | 'liste-gp-sexe' | 'liste-gp-sexe-statut' | 'classement';
type LevelType = '6eme' | '5eme' | '4eme' | '3eme' | '2nde' | '1ere' | 'Tle';
type GenderType = 'feminin' | 'masculin';
type StatusType = 'nouveau' | 'doublant';
type SemesterType = '1er' | '2nd' | 'annuel';

interface ClassDetail {
  id: string;
  name: string;
  studentCount: number;
}

export const EditionsEleves: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MainTabType>('liste-gp');
  const [selectedPromotion, setSelectedPromotion] = useState<string>('');
  const [selectedLevel, setSelectedLevel] = useState<LevelType | ''>('');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<GenderType>('feminin');
  const [selectedStatus, setSelectedStatus] = useState<StatusType>('nouveau');
  const [selectedSemester, setSelectedSemester] = useState<SemesterType>('1er');
  const [showData, setShowData] = useState(false);

  const mainTabs = [
    {
      id: 'liste-gp' as MainTabType,
      label: 'Liste par GP',
      color: 'bg-blue-600 hover:bg-blue-700',
      activeColor: 'bg-blue-700'
    },
    {
      id: 'liste-gp-sexe' as MainTabType,
      label: 'Liste par GP et sexe',
      color: 'bg-teal-600 hover:bg-teal-700',
      activeColor: 'bg-teal-700'
    },
    {
      id: 'liste-gp-sexe-statut' as MainTabType,
      label: 'Liste par GP, sexe et statut',
      color: 'bg-indigo-600 hover:bg-indigo-700',
      activeColor: 'bg-indigo-700'
    },
    {
      id: 'classement' as MainTabType,
      label: 'Classement',
      color: 'bg-orange-600 hover:bg-orange-700',
      activeColor: 'bg-orange-700'
    }
  ];

  const promotions = ['2024-2025', '2023-2024', '2022-2023'];

  const levels: { id: LevelType; label: string }[] = [
    { id: '6eme', label: '6ème' },
    { id: '5eme', label: '5ème' },
    { id: '4eme', label: '4ème' },
    { id: '3eme', label: '3ème' },
    { id: '2nde', label: '2nde' },
    { id: '1ere', label: '1ère' },
    { id: 'Tle', label: 'Tle' }
  ];

  const classesByLevel: Record<LevelType, ClassDetail[]> = {
    '6eme': [
      { id: '6eme-MA', name: '6ème MA', studentCount: 42 },
      { id: '6eme-MB', name: '6ème MB', studentCount: 38 },
      { id: '6eme-MC', name: '6ème MC', studentCount: 40 }
    ],
    '5eme': [
      { id: '5eme-MA', name: '5ème MA', studentCount: 35 },
      { id: '5eme-MB', name: '5ème MB', studentCount: 37 }
    ],
    '4eme': [
      { id: '4eme-MA', name: '4ème MA', studentCount: 40 },
      { id: '4eme-MB', name: '4ème MB', studentCount: 39 }
    ],
    '3eme': [
      { id: '3eme-MA', name: '3ème MA', studentCount: 33 },
      { id: '3eme-MB', name: '3ème MB', studentCount: 36 }
    ],
    '2nde': [
      { id: '2nde-A', name: '2nde A', studentCount: 45 },
      { id: '2nde-C', name: '2nde C', studentCount: 43 },
      { id: '2nde-D', name: '2nde D', studentCount: 41 }
    ],
    '1ere': [
      { id: '1ere-A', name: '1ère A', studentCount: 38 },
      { id: '1ere-C', name: '1ère C', studentCount: 40 },
      { id: '1ere-D', name: '1ère D', studentCount: 37 }
    ],
    'Tle': [
      { id: 'Tle-A', name: 'Tle A', studentCount: 35 },
      { id: 'Tle-C', name: 'Tle C', studentCount: 34 },
      { id: 'Tle-D1', name: 'Tle D1', studentCount: 36 },
      { id: 'Tle-D2', name: 'Tle D2', studentCount: 33 }
    ]
  };

  const mockTeachers = [
    { nom: 'ZOGLOBOSSOU', prenom: 'F. M. Modeste épse ZANNOU', matiere: 'Hist Géo' },
    { nom: 'TIGRI', prenom: 'Lamatou Nawal', matiere: 'EPS' },
    { nom: 'AGONHE', prenom: 'A. Lucas', matiere: 'Français' },
    { nom: 'ZOUNNON', prenom: 'Florent S.', matiere: 'SVT' },
    { nom: 'DJIGBENOU', prenom: 'Alain', matiere: 'PCT' }
  ];

  const mockStudents = [
    { matricule: '2111023073614', nom: 'ADENON', prenom: 'Mariette Modoukpè', dateNaissance: '06/07/2011' },
    { matricule: '2131023261967', nom: 'ADIGBE', prenom: 'Ahouéfa Adhonacia', dateNaissance: '25/05/2013' },
    { matricule: '2141023402631', nom: 'ADRAMA', prenom: 'Bisola Shella', dateNaissance: '13/08/2014' },
    { matricule: '2141023139577', nom: 'AGOSSOU-VE', prenom: 'Djromahouton Meris Mikaelle Jerielle', dateNaissance: '12/03/2014' },
    { matricule: '2141023023800', nom: 'AHINADJE', prenom: 'Kpèssou Armandine', dateNaissance: '07/07/2014' }
  ];

  const mockRanking = [
    { nom: 'ACAKPO', prenom: 'Babatoundé Prince Dieudonné Yannick', moyenne: '14.26', rang: '17è' },
    { nom: 'ADENON', prenom: 'Mariette Modoukpè', moyenne: '10.79', rang: '49è' },
    { nom: 'ADIGBE', prenom: 'Ahouéfa Adhonacia', moyenne: '15.88', rang: '9è' },
    { nom: 'ADJAGO', prenom: 'Sèdjro Eliel', moyenne: '12.4', rang: '32è' },
    { nom: 'ADRAMA', prenom: 'Bisola Shella', moyenne: '13.27', rang: '26è' }
  ];

  const handleLevelClick = (levelId: LevelType) => {
    setSelectedLevel(levelId);
    setSelectedClass('');
  };

  const handleClassClick = (classId: string) => {
    setSelectedClass(classId);
    setShowData(true);
  };

  const handleBack = () => {
    setShowData(false);
    setSelectedClass('');
    setSelectedLevel('');
  };

  const resetSelection = () => {
    setShowData(false);
    setSelectedClass('');
    setSelectedLevel('');
    setSelectedPromotion('');
  };

  const getSelectedClassName = () => {
    if (!selectedLevel) return '';
    const classes = classesByLevel[selectedLevel];
    const found = classes.find(c => c.id === selectedClass);
    return found ? found.name : '';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-3 rounded-lg shadow-md">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Éditions - Élèves</h1>
          </div>
          <p className="text-gray-600 ml-14">Gestion des éditions pour les élèves</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 p-4 bg-gray-50 border-b border-gray-200">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  resetSelection();
                }}
                className={`px-4 py-3 rounded-lg font-semibold text-sm transition-all ${
                  activeTab === tab.id
                    ? `${tab.activeColor} text-white shadow-md transform scale-105`
                    : `${tab.color} text-white opacity-80 hover:opacity-100`
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            {activeTab === 'liste-gp' && (
              <div>
                {!showData ? (
                  <>
                    {!selectedPromotion && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sélectionner la promotion</h2>
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          {promotions.map((promo) => (
                            <button
                              key={promo}
                              onClick={() => setSelectedPromotion(promo)}
                              className="px-6 py-4 rounded-lg font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-all"
                            >
                              {promo}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {selectedPromotion && !selectedLevel && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sélectionner le niveau</h2>
                        <div className="grid grid-cols-7 gap-3 mb-8">
                          {levels.map((level) => (
                            <button
                              key={level.id}
                              onClick={() => handleLevelClick(level.id)}
                              className="px-4 py-4 rounded-lg font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-all"
                            >
                              {level.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {selectedPromotion && selectedLevel && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Les classes disponibles</h2>
                        <div className="grid grid-cols-3 gap-4">
                          {classesByLevel[selectedLevel].map((classe) => (
                            <button
                              key={classe.id}
                              onClick={() => handleClassClick(classe.id)}
                              className="p-6 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:shadow-lg transition-all bg-white"
                            >
                              <div className="flex items-center gap-4">
                                <div className="bg-teal-100 text-teal-700 px-4 py-3 rounded-lg font-bold text-lg">
                                  {levels.find(l => l.id === selectedLevel)?.label}
                                </div>
                                <div className="flex-1 text-left">
                                  <div className="text-xl font-bold text-gray-900">{classe.name}</div>
                                  <div className="text-gray-600">{classe.studentCount} élèves</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <button
                        onClick={handleBack}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Retour
                      </button>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Liste des enseignants de la {getSelectedClassName()} au cours de l'année {selectedPromotion}
                      </h2>
                      <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                        <Download className="w-4 h-4" />
                        Télécharger
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Nom</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Prénom</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Matière</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockTeachers.map((teacher, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 border-b">{teacher.nom}</td>
                              <td className="px-6 py-4 border-b">{teacher.prenom}</td>
                              <td className="px-6 py-4 border-b">{teacher.matiere}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'liste-gp-sexe' && (
              <div>
                {!showData ? (
                  <>
                    {!selectedLevel && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sélectionner le niveau</h2>
                        <div className="grid grid-cols-7 gap-3 mb-8">
                          {levels.map((level) => (
                            <button
                              key={level.id}
                              onClick={() => handleLevelClick(level.id)}
                              className="px-4 py-4 rounded-lg font-semibold bg-teal-600 text-white hover:bg-teal-700 transition-all"
                            >
                              {level.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {selectedLevel && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Les classes disponibles</h2>
                        <div className="grid grid-cols-3 gap-4">
                          {classesByLevel[selectedLevel].map((classe) => (
                            <button
                              key={classe.id}
                              onClick={() => handleClassClick(classe.id)}
                              className="p-6 border-2 border-gray-200 rounded-xl hover:border-teal-500 hover:shadow-lg transition-all bg-white"
                            >
                              <div className="flex items-center gap-4">
                                <div className="bg-teal-100 text-teal-700 px-4 py-3 rounded-lg font-bold text-lg">
                                  {levels.find(l => l.id === selectedLevel)?.label}
                                </div>
                                <div className="flex-1 text-left">
                                  <div className="text-xl font-bold text-gray-900">{classe.name}</div>
                                  <div className="text-gray-600">{classe.studentCount} élèves</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <button
                        onClick={handleBack}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Retour
                      </button>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Liste des élèves de la {getSelectedClassName()} par sexe
                      </h2>
                      <div className="w-24"></div>
                    </div>

                    <div className="flex gap-3 mb-6">
                      <button
                        onClick={() => setSelectedGender('feminin')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          selectedGender === 'feminin'
                            ? 'bg-teal-700 text-white shadow-lg'
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                        }`}
                      >
                        Féminin
                      </button>
                      <button
                        onClick={() => setSelectedGender('masculin')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          selectedGender === 'masculin'
                            ? 'bg-teal-700 text-white shadow-lg'
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                        }`}
                      >
                        Masculin
                      </button>
                    </div>

                    <div className="mb-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                        <Download className="w-4 h-4" />
                        Télécharger
                      </button>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      Liste des élèves de sexe {selectedGender} de la {getSelectedClassName()}
                    </h3>

                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Matricule</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Nom</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Prénom</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Date de naissance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockStudents.map((student, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 border-b">{student.matricule}</td>
                              <td className="px-6 py-4 border-b">{student.nom}</td>
                              <td className="px-6 py-4 border-b">{student.prenom}</td>
                              <td className="px-6 py-4 border-b">{student.dateNaissance}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'liste-gp-sexe-statut' && (
              <div>
                {!showData ? (
                  <>
                    {!selectedLevel && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sélectionner le niveau</h2>
                        <div className="grid grid-cols-7 gap-3 mb-8">
                          {levels.map((level) => (
                            <button
                              key={level.id}
                              onClick={() => handleLevelClick(level.id)}
                              className="px-4 py-4 rounded-lg font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all"
                            >
                              {level.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {selectedLevel && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Les classes disponibles</h2>
                        <div className="grid grid-cols-3 gap-4">
                          {classesByLevel[selectedLevel].map((classe) => (
                            <button
                              key={classe.id}
                              onClick={() => handleClassClick(classe.id)}
                              className="p-6 border-2 border-gray-200 rounded-xl hover:border-indigo-500 hover:shadow-lg transition-all bg-white"
                            >
                              <div className="flex items-center gap-4">
                                <div className="bg-indigo-100 text-indigo-700 px-4 py-3 rounded-lg font-bold text-lg">
                                  {levels.find(l => l.id === selectedLevel)?.label}
                                </div>
                                <div className="flex-1 text-left">
                                  <div className="text-xl font-bold text-gray-900">{classe.name}</div>
                                  <div className="text-gray-600">{classe.studentCount} élèves</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <button
                        onClick={handleBack}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Retour
                      </button>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Liste des élèves de la {getSelectedClassName()} par sexe et statut
                      </h2>
                      <div className="w-24"></div>
                    </div>

                    <div className="flex gap-3 mb-4">
                      <button
                        onClick={() => setSelectedGender('feminin')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          selectedGender === 'feminin'
                            ? 'bg-teal-700 text-white shadow-lg'
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                        }`}
                      >
                        Féminin
                      </button>
                      <button
                        onClick={() => setSelectedGender('masculin')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          selectedGender === 'masculin'
                            ? 'bg-teal-700 text-white shadow-lg'
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                        }`}
                      >
                        Masculin
                      </button>
                    </div>

                    <div className="flex gap-3 mb-6">
                      <button
                        onClick={() => setSelectedStatus('nouveau')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          selectedStatus === 'nouveau'
                            ? 'bg-green-700 text-white shadow-lg'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        Nouveau
                      </button>
                      <button
                        onClick={() => setSelectedStatus('doublant')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          selectedStatus === 'doublant'
                            ? 'bg-green-700 text-white shadow-lg'
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        Doublant
                      </button>
                    </div>

                    <div className="mb-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                        <Download className="w-4 h-4" />
                        Télécharger
                      </button>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      Liste des {selectedStatus}s élèves de sexe {selectedGender} de la {getSelectedClassName()}
                    </h3>

                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Matricule</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Nom</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Prénom</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Date de naissance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockStudents.map((student, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 border-b">{student.matricule}</td>
                              <td className="px-6 py-4 border-b">{student.nom}</td>
                              <td className="px-6 py-4 border-b">{student.prenom}</td>
                              <td className="px-6 py-4 border-b">{student.dateNaissance}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'classement' && (
              <div>
                {!showData ? (
                  <>
                    {!selectedLevel && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Sélectionner le niveau</h2>
                        <div className="grid grid-cols-7 gap-3 mb-8">
                          {levels.map((level) => (
                            <button
                              key={level.id}
                              onClick={() => handleLevelClick(level.id)}
                              className="px-4 py-4 rounded-lg font-semibold bg-orange-600 text-white hover:bg-orange-700 transition-all"
                            >
                              {level.label}
                            </button>
                          ))}
                        </div>
                      </>
                    )}

                    {selectedLevel && (
                      <>
                        <h2 className="text-2xl font-bold text-gray-800 mb-6">Les classes disponibles</h2>
                        <div className="grid grid-cols-3 gap-4">
                          {classesByLevel[selectedLevel].map((classe) => (
                            <button
                              key={classe.id}
                              onClick={() => handleClassClick(classe.id)}
                              className="p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-lg transition-all bg-white"
                            >
                              <div className="flex items-center gap-4">
                                <div className="bg-orange-100 text-orange-700 px-4 py-3 rounded-lg font-bold text-lg">
                                  {levels.find(l => l.id === selectedLevel)?.label}
                                </div>
                                <div className="flex-1 text-left">
                                  <div className="text-xl font-bold text-gray-900">{classe.name}</div>
                                  <div className="text-gray-600">{classe.studentCount} élèves</div>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <button
                        onClick={handleBack}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Retour
                      </button>
                      <h2 className="text-2xl font-bold text-gray-800">
                        Classement des élèves de la {getSelectedClassName()}
                      </h2>
                      <div className="w-24"></div>
                    </div>

                    <div className="flex gap-3 mb-6">
                      <button
                        onClick={() => setSelectedSemester('1er')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          selectedSemester === '1er'
                            ? 'bg-teal-700 text-white shadow-lg'
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                        }`}
                      >
                        1er Semestre
                      </button>
                      <button
                        onClick={() => setSelectedSemester('2nd')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          selectedSemester === '2nd'
                            ? 'bg-teal-700 text-white shadow-lg'
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                        }`}
                      >
                        2nd Semestre
                      </button>
                      <button
                        onClick={() => setSelectedSemester('annuel')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          selectedSemester === 'annuel'
                            ? 'bg-teal-700 text-white shadow-lg'
                            : 'bg-teal-600 text-white hover:bg-teal-700'
                        }`}
                      >
                        Annuel
                      </button>
                    </div>

                    <div className="mb-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors">
                        <Download className="w-4 h-4" />
                        Télécharger
                      </button>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-700 mb-4">
                      Classement du {selectedSemester === '1er' ? '1er' : selectedSemester === '2nd' ? '2nd' : ''}
                      {selectedSemester === 'annuel' ? 'annuel' : ' semestre'} des élèves de la {getSelectedClassName()}
                    </h3>

                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Nom</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Prénom</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Moyenne</th>
                            <th className="px-6 py-4 text-left font-semibold text-gray-700 border-b">Rang</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockRanking.map((student, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 border-b">{student.nom}</td>
                              <td className="px-6 py-4 border-b">{student.prenom}</td>
                              <td className="px-6 py-4 border-b">{student.moyenne}</td>
                              <td className="px-6 py-4 border-b">{student.rang}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
