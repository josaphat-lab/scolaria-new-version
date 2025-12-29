import React, { useState } from 'react';
import { Award, Printer, ArrowLeft } from 'lucide-react';

type MainTabType = 'unique' | 'salle-examen';
type ExamLevelType = '3eme' | 'Tle';

interface StudentFormData {
  nomPrenom: string;
  dateNaissance: string;
  lieuNaissance: string;
  departementNaissance: string;
  nomPere: string;
  nomMere: string;
  numeroInscription: string;
  dateInscription: string;
  classe: string;
}

interface CertificateStudent {
  nomPrenom: string;
  matricule: string;
  dateNaissance: string;
  lieuNaissance: string;
  departement: string;
  nomPere: string;
  nomMere: string;
  classe: string;
  numeroInscription: string;
  dateInscription: string;
}

export const CertificatScolarite: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MainTabType>('unique');
  const [activeExamLevel, setActiveExamLevel] = useState<ExamLevelType>('3eme');
  const [selectedExamClass, setSelectedExamClass] = useState<string>('');
  const [showCertificate, setShowCertificate] = useState(false);
  const [showExamCertificates, setShowExamCertificates] = useState(false);

  const [formData, setFormData] = useState<StudentFormData>({
    nomPrenom: '',
    dateNaissance: '',
    lieuNaissance: '',
    departementNaissance: '',
    nomPere: '',
    nomMere: '',
    numeroInscription: '',
    dateInscription: '',
    classe: ''
  });

  const classes3eme = ['3ème MA', '3ème MB'];
  const classesTle = ['Tle A', 'Tle C', 'Tle D1', 'Tle D2'];

  const mockExamStudents: CertificateStudent[] = [
    {
      nomPrenom: 'ACCROMBESSI Rosaline Nonhouégnon',
      matricule: '209090287135',
      dateNaissance: '40059',
      lieuNaissance: 'MALANHOUI',
      departement: '',
      nomPere: '',
      nomMere: '',
      classe: '3ème MA',
      numeroInscription: '209090287135',
      dateInscription: ''
    },
    {
      nomPrenom: 'AFFATON Prospérité Ogo-Oluwa',
      matricule: '210090246510',
      dateNaissance: '40322',
      lieuNaissance: 'PORTO-NOVO',
      departement: '',
      nomPere: '',
      nomMere: '',
      classe: '3ème MA',
      numeroInscription: '210090246510',
      dateInscription: ''
    },
    {
      nomPrenom: 'ADENON Mariette Modoukpè',
      matricule: '209090287136',
      dateNaissance: '40060',
      lieuNaissance: 'COTONOU',
      departement: '',
      nomPere: '',
      nomMere: '',
      classe: '3ème MA',
      numeroInscription: '209090287136',
      dateInscription: ''
    },
    {
      nomPrenom: 'ADIGBE Ahouéfa Adhonacia',
      matricule: '210090246511',
      dateNaissance: '40323',
      lieuNaissance: 'ABOMEY',
      departement: '',
      nomPere: '',
      nomMere: '',
      classe: '3ème MA',
      numeroInscription: '210090246511',
      dateInscription: ''
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowCertificate(true);
  };

  const handleExamClassClick = (className: string) => {
    setSelectedExamClass(className);
    setShowExamCertificates(true);
  };

  const handleBackToForm = () => {
    setShowCertificate(false);
  };

  const handleBackToClasses = () => {
    setShowExamCertificates(false);
    setSelectedExamClass('');
  };

  const handlePrint = () => {
    window.print();
  };

  const CertificateA5 = ({ student }: { student: CertificateStudent }) => (
    <div className="w-[148mm] h-[210mm] bg-white border-2 border-gray-300 p-6 flex flex-col">
      <div className="flex justify-between items-start mb-6">
        <div className="w-16 h-16 bg-yellow-400 rounded-full"></div>
        <div className="flex-1 mx-4 text-center">
          <div className="text-xs font-bold text-red-600 mb-1">REPUBLIQUE DU BENIN</div>
          <div className="text-xs mb-1">MINISTERE DE L'ENSEIGNEMENT SECONDAIRE</div>
          <div className="text-xs mb-1">TECHNIQUE ET DE LA FORMATION PROFESSIONNELLE</div>
          <div className="text-xs mb-1">DIRECTION DEPARTEMENTALE DE L'ATLANTIQUE ET DU LITTORAL</div>
          <div className="text-xs font-bold">CEG1 MALANHOUI</div>
          <div className="text-xs">01 BP 543 PORTO-NOVO - +229 66 94 37 50</div>
        </div>
        <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center">
          <div className="text-white text-xs font-bold">LOGO</div>
        </div>
      </div>

      <h2 className="text-center text-xl font-bold mb-6 underline">CERTIFICAT DE SCOLARITE</h2>

      <div className="flex-1 text-sm leading-relaxed">
        <p className="mb-4">
          Le/La Directeur/Directrice du <span className="font-bold">CEG1 MALANHOUI</span>
        </p>

        <p className="mb-4">
          certifie que l'élève <span className="font-bold">{student.nomPrenom}</span> né(e) le{' '}
          <span className="font-bold">{student.dateNaissance}</span> à{' '}
          <span className="font-bold">{student.lieuNaissance}</span>, département de{' '}
          <span className="border-b border-dotted border-gray-600 inline-block min-w-[150px]">
            {student.departement}
          </span>{' '}
          fille de{' '}
          <span className="border-b border-dotted border-gray-600 inline-block min-w-[200px]">
            {student.nomPere}
          </span>
        </p>

        <p className="mb-4">
          et de{' '}
          <span className="border-b border-dotted border-gray-600 inline-block min-w-[200px]">
            {student.nomMere}
          </span>
        </p>

        <p className="mb-4">
          est effectivement inscrit(e) dans ledit établissement sous le N°{' '}
          <span className="font-bold">{student.numeroInscription}</span> depuis le{' '}
          <span className="border-b border-dotted border-gray-600 inline-block min-w-[100px]">
            {student.dateInscription}
          </span>{' '}
          et y poursuit actuellement les études en classe de{' '}
          <span className="font-bold">{student.classe}</span>.
        </p>

        <p className="mb-4">Avec les appréciations suivantes:</p>

        <ul className="list-disc list-inside mb-4 ml-4">
          <li>
            Assiduité :{' '}
            <span className="border-b border-dotted border-gray-600 inline-block min-w-[150px]"></span>
          </li>
          <li>
            Conduite :{' '}
            <span className="border-b border-dotted border-gray-600 inline-block min-w-[150px]"></span>
          </li>
          <li>
            Travail :{' '}
            <span className="border-b border-dotted border-gray-600 inline-block min-w-[150px]"></span>
          </li>
        </ul>

        <p className="mb-2">Observations particulières:</p>
        <div className="border-b border-dotted border-gray-600 mb-2"></div>
        <div className="border-b border-dotted border-gray-600"></div>
      </div>

      <div className="text-right mt-4 text-sm">
        <p>Porto-Novo, le ...........................</p>
        <p className="font-bold mt-2">Le Directeur</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-gradient-to-br from-teal-600 to-teal-800 p-3 rounded-lg shadow-md">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Certificat de Scolarité</h1>
          </div>
          <p className="text-gray-600 ml-14">Générer des certificats de scolarité</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-2 gap-3 p-4 bg-gray-50 border-b border-gray-200">
            <button
              onClick={() => {
                setActiveTab('unique');
                setShowCertificate(false);
                setShowExamCertificates(false);
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'unique'
                  ? 'bg-teal-700 text-white shadow-md transform scale-105'
                  : 'bg-teal-600 text-white opacity-80 hover:opacity-100'
              }`}
            >
              Certificat Unique
            </button>
            <button
              onClick={() => {
                setActiveTab('salle-examen');
                setShowCertificate(false);
                setShowExamCertificates(false);
              }}
              className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                activeTab === 'salle-examen'
                  ? 'bg-teal-700 text-white shadow-md transform scale-105'
                  : 'bg-teal-600 text-white opacity-80 hover:opacity-100'
              }`}
            >
              Salle d'Examen
            </button>
          </div>

          <div className="p-8">
            {activeTab === 'unique' && (
              <div>
                {!showCertificate ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <p className="text-gray-600 mb-6">
                      Veuillez remplir le <span className="text-red-500 font-semibold">formulaire</span> puis cliquer sur{' '}
                      <span className="text-blue-600 font-semibold">Suivant</span> pour éditer le certificat de scolarité.
                    </p>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nom & Prénom de l'apprenant
                        </label>
                        <input
                          type="text"
                          name="nomPrenom"
                          value={formData.nomPrenom}
                          onChange={handleInputChange}
                          placeholder="Nom & Prénom"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Date de naissance
                        </label>
                        <input
                          type="date"
                          name="dateNaissance"
                          value={formData.dateNaissance}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Lieu de naissance
                        </label>
                        <input
                          type="text"
                          name="lieuNaissance"
                          value={formData.lieuNaissance}
                          onChange={handleInputChange}
                          placeholder="Lieu de naissance"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Département de naissance
                        </label>
                        <input
                          type="text"
                          name="departementNaissance"
                          value={formData.departementNaissance}
                          onChange={handleInputChange}
                          placeholder="Département de naissance"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nom & prénom du père
                        </label>
                        <input
                          type="text"
                          name="nomPere"
                          value={formData.nomPere}
                          onChange={handleInputChange}
                          placeholder="Nom et prénom du père"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Nom & prénom de la mère
                        </label>
                        <input
                          type="text"
                          name="nomMere"
                          value={formData.nomMere}
                          onChange={handleInputChange}
                          placeholder="Nom et prénom de la mère"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Numéro d'inscription
                        </label>
                        <input
                          type="text"
                          name="numeroInscription"
                          value={formData.numeroInscription}
                          onChange={handleInputChange}
                          placeholder="Numéro d'inscription"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Date d'inscription
                        </label>
                        <input
                          type="date"
                          name="dateInscription"
                          value={formData.dateInscription}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          required
                        />
                      </div>

                      <div className="col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Classe
                        </label>
                        <select
                          name="classe"
                          value={formData.classe}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          required
                        >
                          <option value="">Sélectionner une classe</option>
                          <option value="6ème MA">6ème MA</option>
                          <option value="5ème MA">5ème MA</option>
                          <option value="4ème MA">4ème MA</option>
                          <option value="3ème MA">3ème MA</option>
                          <option value="2nde A">2nde A</option>
                          <option value="1ère A">1ère A</option>
                          <option value="Tle A">Tle A</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="submit"
                        className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Générer le Certificat
                      </button>
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="flex justify-center gap-4 mb-6 print:hidden">
                      <button
                        onClick={handleBackToForm}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Retour
                      </button>
                      <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        <Printer className="w-4 h-4" />
                        Imprimer
                      </button>
                    </div>

                    <div className="flex justify-center">
                      <CertificateA5
                        student={{
                          nomPrenom: formData.nomPrenom,
                          matricule: formData.numeroInscription,
                          dateNaissance: formData.dateNaissance,
                          lieuNaissance: formData.lieuNaissance,
                          departement: formData.departementNaissance,
                          nomPere: formData.nomPere,
                          nomMere: formData.nomMere,
                          classe: formData.classe,
                          numeroInscription: formData.numeroInscription,
                          dateInscription: formData.dateInscription
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'salle-examen' && (
              <div>
                {!showExamCertificates ? (
                  <>
                    <div className="flex gap-3 mb-8">
                      <button
                        onClick={() => setActiveExamLevel('3eme')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          activeExamLevel === '3eme'
                            ? 'bg-orange-700 text-white shadow-lg'
                            : 'bg-orange-600 text-white hover:bg-orange-700'
                        }`}
                      >
                        3ème
                      </button>
                      <button
                        onClick={() => setActiveExamLevel('Tle')}
                        className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                          activeExamLevel === 'Tle'
                            ? 'bg-orange-700 text-white shadow-lg'
                            : 'bg-orange-600 text-white hover:bg-orange-700'
                        }`}
                      >
                        Tle
                      </button>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Classes de {activeExamLevel === '3eme' ? '3ème' : 'Terminale'}
                    </h2>

                    <div className="grid grid-cols-3 gap-4">
                      {(activeExamLevel === '3eme' ? classes3eme : classesTle).map((classe) => (
                        <button
                          key={classe}
                          onClick={() => handleExamClassClick(classe)}
                          className="p-6 border-2 border-gray-200 rounded-xl hover:border-orange-500 hover:shadow-lg transition-all bg-white"
                        >
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-2">{classe}</div>
                            <div className="text-gray-600">Classe d'examen</div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="flex justify-center gap-4 mb-6 print:hidden">
                      <button
                        onClick={handleBackToClasses}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Retour
                      </button>
                      <button
                        onClick={handlePrint}
                        className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                      >
                        <Printer className="w-4 h-4" />
                        Imprimer
                      </button>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center print:hidden">
                      Certificats de scolarité - {selectedExamClass}
                    </h2>

                    <div className="space-y-4">
                      {mockExamStudents.reduce((rows: CertificateStudent[][], student, index) => {
                        if (index % 2 === 0) {
                          rows.push([student]);
                        } else {
                          rows[rows.length - 1].push(student);
                        }
                        return rows;
                      }, []).map((row, rowIndex) => (
                        <div key={rowIndex} className="flex gap-4 justify-center page-break-after">
                          {row.map((student, studentIndex) => (
                            <CertificateA5 key={studentIndex} student={student} />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body {
            margin: 0;
            padding: 0;
          }
          .print\\:hidden {
            display: none !important;
          }
          .page-break-after {
            page-break-after: always;
          }
        }
      `}</style>
    </div>
  );
};
