import React, { useState } from 'react';
import { ArrowLeft, Search, StopCircle, Trophy } from 'lucide-react';

interface StudentGrade {
  id: string;
  nomPrenom: string;
  moyenneAnnuelle: number;
  rang: number;
}

const STUDENTS_DATA: StudentGrade[] = [
  { id: '1', nomPrenom: 'ABIB-Anrif Olaidé', moyenneAnnuelle: 0, rang: 1 },
  { id: '2', nomPrenom: 'ABIKOU-Jesukpego Mickael Jacques', moyenneAnnuelle: 0, rang: 2 },
  { id: '3', nomPrenom: 'ADECHOKAN-Anfiyath Oluwabukola Adouni', moyenneAnnuelle: 0, rang: 3 },
  { id: '4', nomPrenom: 'ADELAKOUN-Aliciella Omoyélé Love', moyenneAnnuelle: 0, rang: 4 },
  { id: '5', nomPrenom: 'ADOUNVO-Ange Godfroy', moyenneAnnuelle: 0, rang: 5 },
  { id: '6', nomPrenom: 'AFFOKPLATADE-Houéfa Mirabelle', moyenneAnnuelle: 0, rang: 6 },
];

interface MoyennesAnnuellesProps {
  classeName: string;
  onBack: () => void;
}

export const MoyennesAnnuelles: React.FC<MoyennesAnnuellesProps> = ({ classeName, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [calculEnabled, setCalculEnabled] = useState(true);

  const filteredStudents = STUDENTS_DATA.filter((student) =>
    student.nomPrenom.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleCalcul = () => {
    setCalculEnabled(!calculEnabled);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-orange-50 to-amber-100">
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
            Moyennes annuelles de la <span className="text-rose-600">{classeName}</span>
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-rose-200">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <button
              onClick={handleToggleCalcul}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg ${
                calculEnabled
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700'
                  : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700'
              }`}
            >
              <StopCircle className="w-5 h-5" />
              {calculEnabled
                ? 'Arrêter automatiquement le calcul des notes ci-dessous'
                : 'Activer le calcul automatique des notes'}
            </button>

            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Rechercher un élève..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-2xl overflow-hidden border-2 border-rose-200">
          <div className="bg-gradient-to-r from-rose-500 to-orange-600 px-6 py-4">
            <div className="flex items-center gap-3 text-white">
              <Trophy className="w-6 h-6" />
              <h3 className="text-xl font-bold">Résultats annuels</h3>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-rose-100 to-orange-100">
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">
                    Nom et prénoms
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-800">
                    Moyenne annuelle
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold text-gray-800">Rang</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-100">
                {filteredStudents.map((student, index) => (
                  <tr
                    key={student.id}
                    className={`transition-colors duration-150 ${
                      index % 2 === 0 ? 'bg-white hover:bg-rose-50' : 'bg-rose-50/50 hover:bg-rose-100'
                    }`}
                  >
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {student.nomPrenom}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-rose-100 to-orange-100 text-gray-900 font-bold text-lg">
                        {student.moyenneAnnuelle}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {student.rang <= 3 ? (
                        <div className="flex items-center justify-center gap-2">
                          <span
                            className={`inline-flex items-center justify-center w-12 h-12 rounded-full font-bold text-white shadow-lg ${
                              student.rang === 1
                                ? 'bg-gradient-to-br from-yellow-400 to-yellow-600'
                                : student.rang === 2
                                ? 'bg-gradient-to-br from-gray-300 to-gray-500'
                                : 'bg-gradient-to-br from-orange-400 to-orange-600'
                            }`}
                          >
                            {student.rang}
                          </span>
                          {student.rang === 1 && <Trophy className="w-6 h-6 text-yellow-500" />}
                        </div>
                      ) : (
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full font-bold text-white bg-gradient-to-br from-rose-500 to-rose-700 shadow-lg">
                          {student.rang}
                        </span>
                      )}
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

        <div className="bg-gradient-to-r from-rose-100 to-orange-100 rounded-xl shadow-lg p-6 border-2 border-rose-300">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-orange-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Note importante</h4>
              <p className="text-gray-700">
                Les moyennes annuelles sont calculées automatiquement en fonction des résultats des
                deux semestres. Le classement est mis à jour en temps réel.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
