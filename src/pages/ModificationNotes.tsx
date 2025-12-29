import React, { useState } from 'react';
import { Search, MoreVertical, Edit2, Users } from 'lucide-react';

interface Student {
  id: string;
  matricule: string;
  nom: string;
  prenom: string;
  sexe: 'M' | 'F';
  age: number;
}

const STUDENTS_DATA: Student[] = [
  { id: '1', matricule: '1151023281732', nom: 'ABIB', prenom: 'Anrif Olaidé', sexe: 'M', age: 15 },
  { id: '2', matricule: '1111122174857', nom: 'ABIKOU', prenom: 'Jesukpego Mickael Jacques', sexe: 'M', age: 16 },
  { id: '3', matricule: '2151023409431', nom: 'ADECHOKAN', prenom: 'Anfiyath Oluwabukola Adouni', sexe: 'F', age: 15 },
  { id: '4', matricule: '2151023002346', nom: 'ADELAKOUN', prenom: 'Aliciella Omoyélé Love', sexe: 'F', age: 14 },
  { id: '5', matricule: '1151024047813', nom: 'ADOUNVO', prenom: 'Ange Godfroy', sexe: 'M', age: 16 },
  { id: '6', matricule: '2151023802009', nom: 'AFFOKPLATADE', prenom: 'Houéfa Mirabelle', sexe: 'F', age: 15 },
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

export const ModificationNotes: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'selectClass' | 'selectStudent' | 'editNotes'>('selectClass');
  const [activeNiveau, setActiveNiveau] = useState('6ème');
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const filteredStudents = STUDENTS_DATA.filter(
    (student) =>
      student.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.matricule.includes(searchTerm)
  );

  const handleClassClick = (classe: string) => {
    setSelectedClass(classe);
    setCurrentStep('selectStudent');
  };

  const handleActionClick = (student: Student, action: string) => {
    setSelectedStudent(student);
    setSelectedAction(action);
    setCurrentStep('editNotes');
    setOpenDropdown(null);
  };

  const handleBackToClasses = () => {
    setCurrentStep('selectClass');
    setSelectedClass(null);
    setSearchTerm('');
  };

  const handleBackToStudents = () => {
    setCurrentStep('selectStudent');
    setSelectedStudent(null);
    setSelectedAction(null);
  };

  if (currentStep === 'editNotes' && selectedStudent && selectedAction) {
    return (
      <ModificationNotesDetail
        student={selectedStudent}
        action={selectedAction}
        onBack={handleBackToStudents}
      />
    );
  }

  if (currentStep === 'selectStudent' && selectedClass) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
        <button
          onClick={handleBackToClasses}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
        >
          ← Retour
        </button>

        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">
            Assistant de modification des notes - {selectedClass}
          </h1>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="p-6">
            <div className="mb-6">
              <div className="bg-gradient-to-r from-pink-50 to-pink-100 border-l-4 border-pink-500 p-4 rounded-r-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-bold text-pink-700">ETAPE 2 :</span> Veuillez{' '}
                  <span className="font-semibold">sélectionner un élève</span> pour accéder à ses notes
                  enregistrées par matières et par semestre.
                </p>
              </div>
            </div>

            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher par nom, prénom ou matricule..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
                      <th className="px-6 py-4 text-left text-sm font-bold">Matricule</th>
                      <th className="px-6 py-4 text-left text-sm font-bold">Nom de l'élève</th>
                      <th className="px-6 py-4 text-left text-sm font-bold">Prénoms de l'élève</th>
                      <th className="px-6 py-4 text-center text-sm font-bold">Sexe de l'élève</th>
                      <th className="px-6 py-4 text-center text-sm font-bold">Age de l'élève</th>
                      <th className="px-6 py-4 text-center text-sm font-bold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredStudents.map((student, index) => (
                      <tr
                        key={student.id}
                        className={`transition-colors duration-150 ${
                          index % 2 === 0 ? 'bg-white hover:bg-teal-50' : 'bg-gray-50 hover:bg-teal-50'
                        }`}
                      >
                        <td className="px-6 py-4 text-sm text-gray-900 font-medium">{student.matricule}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{student.nom}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{student.prenom}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-center">{student.sexe}</td>
                        <td className="px-6 py-4 text-sm text-gray-900 text-center">{student.age}</td>
                        <td className="px-6 py-4 text-center">
                          <div className="relative inline-block">
                            <button
                              onClick={() =>
                                setOpenDropdown(openDropdown === student.id ? null : student.id)
                              }
                              className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                            >
                              <MoreVertical className="w-5 h-5 text-gray-600" />
                            </button>
                            {openDropdown === student.id && (
                              <div className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50">
                                <button
                                  onClick={() => handleActionClick(student, 'interro-s1')}
                                  className="w-full text-left px-4 py-3 text-sm hover:bg-teal-50 transition-colors flex items-center gap-2 border-b border-gray-100"
                                >
                                  <span className="text-yellow-600">📋</span>
                                  Interrogations semestre1
                                </button>
                                <button
                                  onClick={() => handleActionClick(student, 'devoir-s1')}
                                  className="w-full text-left px-4 py-3 text-sm hover:bg-teal-50 transition-colors flex items-center gap-2 border-b border-gray-100"
                                >
                                  <span className="text-yellow-600">📋</span>
                                  Devoirs semestre1
                                </button>
                                <button
                                  onClick={() => handleActionClick(student, 'interro-s2')}
                                  className="w-full text-left px-4 py-3 text-sm hover:bg-teal-50 transition-colors flex items-center gap-2 border-b border-gray-100"
                                >
                                  <span className="text-yellow-600">📋</span>
                                  Interrogations semestre2
                                </button>
                                <button
                                  onClick={() => handleActionClick(student, 'devoir-s2')}
                                  className="w-full text-left px-4 py-3 text-sm hover:bg-teal-50 transition-colors flex items-center gap-2"
                                >
                                  <span className="text-yellow-600">📋</span>
                                  Devoirs semestre2
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
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Modification des notes</h1>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="p-6">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-blue-700">ETAPE 1 :</span> Veuillez{' '}
                <span className="font-semibold">sélectionner une classe</span> pour afficher la liste des élèves.
              </p>
            </div>
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
                  onClick={() => handleClassClick(classe)}
                  className="group relative bg-gradient-to-br from-teal-50 to-emerald-50 border-2 border-teal-200 rounded-xl p-6 hover:from-teal-100 hover:to-emerald-100 hover:border-teal-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{classe}</h3>
                    <p className="text-sm text-gray-600">Cliquez pour sélectionner</p>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-teal-400/0 to-emerald-400/0 group-hover:from-teal-400/10 group-hover:to-emerald-400/10 rounded-xl transition-all duration-300"></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Note {
  id: string;
  numero: number;
  matiere: string;
  note: number | 'Absent';
}

const NOTES_INTERRO_S1: Note[] = [
  { id: '1', numero: 1, matiere: 'Communication écrite', note: 5 },
  { id: '2', numero: 2, matiere: 'Communication écrite', note: 9 },
  { id: '3', numero: 1, matiere: 'Lecture', note: 'Absent' },
  { id: '4', numero: 1, matiere: 'Sciences de la Vie et de la Terre', note: 'Absent' },
  { id: '5', numero: 1, matiere: 'Education Physique et Sportive', note: 16 },
  { id: '6', numero: 1, matiere: 'Mathématiques', note: 12 },
  { id: '7', numero: 2, matiere: 'Mathématiques', note: 8 },
  { id: '8', numero: 1, matiere: 'Histoire-Géographie', note: 14 },
];

const ModificationNotesDetail: React.FC<{
  student: Student;
  action: string;
  onBack: () => void;
}> = ({ student, action, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [notes, setNotes] = useState<Note[]>(NOTES_INTERRO_S1);

  const getActionTitle = () => {
    switch (action) {
      case 'interro-s1':
        return "d'interrogation du 1er semestre";
      case 'devoir-s1':
        return 'de devoir du 1er semestre';
      case 'interro-s2':
        return "d'interrogation du 2ème semestre";
      case 'devoir-s2':
        return 'de devoir du 2ème semestre';
      default:
        return '';
    }
  };

  const getActionType = () => {
    return action.includes('interro') ? 'interrogations' : 'devoirs';
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.matiere.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.numero.toString().includes(searchTerm)
  );

  const handleSaveNote = (noteId: string, newValue: string) => {
    setNotes(
      notes.map((note) =>
        note.id === noteId
          ? { ...note, note: newValue === 'Absent' ? 'Absent' : parseFloat(newValue) }
          : note
      )
    );
    setEditingNote(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
      >
        ← Retour
      </button>

      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-teal-500 to-emerald-600 px-8 py-6">
          <h2 className="text-2xl font-bold text-white text-center">
            Modifier les notes {getActionTitle()} de {student.nom}-{student.prenom}
          </h2>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="bg-gradient-to-r from-pink-50 to-pink-100 border-l-4 border-pink-500 p-4 rounded-r-lg">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-pink-700">ETAPE 3 :</span> Effectuer les mises à jour
                selon{' '}
                <span className="font-semibold text-pink-700">les notes d'{getActionType()}</span>
              </p>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher par matière ou numéro..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-teal-500 to-emerald-600 text-white">
                    <th className="px-6 py-4 text-left text-sm font-bold">
                      Numéro d'ordre de l'{action.includes('interro') ? 'interrogation' : 'devoir'}
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-bold">Matière</th>
                    <th className="px-6 py-4 text-center text-sm font-bold">Note obtenue</th>
                    <th className="px-6 py-4 text-center text-sm font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredNotes.map((note, index) => (
                    <tr
                      key={note.id}
                      className={`transition-colors duration-150 ${
                        index % 2 === 0 ? 'bg-white hover:bg-teal-50' : 'bg-gray-50 hover:bg-teal-50'
                      }`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-900 font-semibold text-center">
                        {note.numero}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{note.matiere}</td>
                      <td className="px-6 py-4 text-center">
                        {editingNote === note.id ? (
                          <input
                            type="text"
                            defaultValue={note.note}
                            onBlur={(e) => handleSaveNote(note.id, e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleSaveNote(note.id, (e.target as HTMLInputElement).value);
                              }
                            }}
                            autoFocus
                            className="w-20 px-2 py-1 border border-teal-500 rounded text-center font-bold text-teal-600 focus:ring-2 focus:ring-teal-500"
                          />
                        ) : (
                          <span
                            className={`font-bold text-sm ${
                              note.note === 'Absent'
                                ? 'text-red-600'
                                : 'text-teal-600 bg-teal-50 px-3 py-1 rounded-full'
                            }`}
                          >
                            {note.note}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="relative inline-block">
                          <button
                            onClick={() => setEditingNote(note.id)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md text-sm"
                          >
                            <Edit2 className="w-4 h-4" />
                            Modifier
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
