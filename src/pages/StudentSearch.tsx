import { useState } from 'react';
import { Search, Users, FileText } from 'lucide-react';

interface Student {
  id: string;
  matricule: string;
  lastName: string;
  firstName: string;
  class: string;
}

const mockStudents: Student[] = [
  { id: '1', matricule: '1151023281732', lastName: 'ABIB', firstName: 'Anrif Olaidé', class: '6emeMA' },
  { id: '2', matricule: '111122174857', lastName: 'ABIKOU', firstName: 'Jesukpego Mickael Jacques', class: '6emeMA' },
  { id: '3', matricule: '2151023409431', lastName: 'ADECHOKAN', firstName: 'Anfiyath Oluwabukola Adouni', class: '6emeMA' },
  { id: '4', matricule: '2151023002346', lastName: 'ADELAKOUN', firstName: 'Aliciella Omoyèlé Love', class: '6emeMA' },
  { id: '5', matricule: '1151024047813', lastName: 'ADOUNVO', firstName: 'Ange Godfroy', class: '6emeMA' },
  { id: '6', matricule: '2151023802009', lastName: 'AFFOKPLATADE', firstName: 'Houéfa Mirabelle', class: '6emeMA' },
  { id: '7', matricule: '2151023409432', lastName: 'AGBANGBATIN', firstName: 'Fifamè Océanne Kate', class: '6emeMA' },
  { id: '8', matricule: '1151023002458', lastName: 'AGUEGUE', firstName: 'Dona Prudence', class: '6emeMA' },
  { id: '9', matricule: '1151023571437', lastName: 'PADONOU', firstName: 'Ange-Précieux Melchior', class: '5emeA' },
  { id: '10', matricule: '2141023572472', lastName: 'PADONOU', firstName: 'Merveille Dona Lisette', class: '5emeA' },
  { id: '11', matricule: '1151023409458', lastName: 'PADONOU', firstName: 'Iréti Suru Abdul Razack', class: '4emeB' },
  { id: '12', matricule: '2151024039710', lastName: 'RADJI', firstName: 'Haérath', class: '3emeA' },
  { id: '13', matricule: '210090223128', lastName: 'ABDOULAYE', firstName: 'Raéhanath Olayidé', class: '1ereA2A' },
  { id: '14', matricule: '101090173935', lastName: 'ADJINAKOU', firstName: 'Sonagnon Robert', class: '1ereA2A' },
  { id: '15', matricule: '104120219413', lastName: 'AGOSSOU', firstName: 'Yemalin Léonard', class: 'TleA2A' },
];

export const StudentSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStudents = mockStudents.filter(student =>
    student.matricule.includes(searchQuery)
  );

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const index = text.indexOf(query);
    if (index === -1) return text;

    return (
      <>
        {text.substring(0, index)}
        <span className="bg-yellow-200 font-bold">{query}</span>
        {text.substring(index + query.length)}
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-10">
            <div className="flex items-center justify-center mb-3">
              <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl mr-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-white">
                Recherche des élèves par matricule
              </h1>
            </div>
            <p className="text-primary-100 text-center text-sm max-w-2xl mx-auto">
              Entrez le matricule d'un élève pour rechercher ses informations dans la base de données
            </p>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <div className="relative max-w-2xl mx-auto">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Rechercher par matricule..."
                  className="block w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all placeholder-gray-400 shadow-sm"
                  autoFocus
                />
              </div>

              {searchQuery && (
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-600">
                    {filteredStudents.length > 0 ? (
                      <>
                        <span className="font-semibold text-primary-600">{filteredStudents.length}</span> résultat{filteredStudents.length > 1 ? 's' : ''} trouvé{filteredStudents.length > 1 ? 's' : ''}
                      </>
                    ) : (
                      <span className="text-red-600 font-medium">Aucun élève trouvé avec ce matricule</span>
                    )}
                  </p>
                </div>
              )}
            </div>

            {!searchQuery && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full mb-6">
                  <Users className="w-10 h-10 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Commencez votre recherche
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Saisissez un matricule dans la barre de recherche ci-dessus pour afficher les informations de l'élève
                </p>
              </div>
            )}

            {searchQuery && filteredStudents.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
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
                          Classe
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredStudents.map((student, index) => (
                        <tr
                          key={student.id}
                          className="hover:bg-primary-50 transition-colors duration-150 group"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-gray-400 group-hover:text-primary-500 transition-colors" />
                              <span className="text-sm font-semibold text-gray-900">
                                {highlightMatch(student.matricule, searchQuery)}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm font-medium text-gray-900">{student.lastName}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-sm text-gray-700">{student.firstName}</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 border border-primary-300">
                              {student.class}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {searchQuery && filteredStudents.length === 0 && (
              <div className="text-center py-20">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
                  <Search className="w-10 h-10 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  Aucun résultat trouvé
                </h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Le matricule <span className="font-mono font-semibold text-gray-700">"{searchQuery}"</span> ne correspond à aucun élève dans la base de données
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
