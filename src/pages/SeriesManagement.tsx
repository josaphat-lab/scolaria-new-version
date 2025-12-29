import { useState } from 'react';
import { Search, GraduationCap, ArrowLeft } from 'lucide-react';

interface Serie {
  id: number;
  intitule: string;
  cycle: string;
}

const mockSeries: Serie[] = [
  { id: 1, intitule: 'A1', cycle: 'Second' },
  { id: 2, intitule: 'A2', cycle: 'Second' },
  { id: 3, intitule: 'M', cycle: 'Premier' },
  { id: 4, intitule: 'D', cycle: 'Second' },
  { id: 5, intitule: 'C', cycle: 'Second' },
  { id: 6, intitule: 'B', cycle: 'Second' },
  { id: 7, intitule: 'E', cycle: 'Second' },
  { id: 8, intitule: 'F', cycle: 'Second' },
  { id: 9, intitule: 'G', cycle: 'Premier' },
];

export const SeriesManagement = () => {
  const [series] = useState<Serie[]>(mockSeries);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSeries = series.filter(serie =>
    serie.intitule.toLowerCase().includes(searchQuery.toLowerCase()) ||
    serie.cycle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-10">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
                  <GraduationCap className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-2">Gestion des filières</h1>
              <p className="text-primary-100 text-sm">
                Consultation et gestion des séries par cycle
              </p>
            </div>
          </div>

          <div className="p-8">
            <div className="mb-6 flex items-center justify-end">
              <div className="relative w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-md">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-50 via-gray-100 to-gray-50 border-b-2 border-gray-300">
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider w-32">
                        ID
                      </th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Intitulé
                      </th>
                      <th className="px-8 py-5 text-left text-sm font-bold text-gray-700 uppercase tracking-wider">
                        Cycle
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSeries.length === 0 ? (
                      <tr>
                        <td colSpan={3} className="px-8 py-16 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <Search className="w-12 h-12 text-gray-300 mb-3" />
                            <p className="text-gray-500 text-lg">Aucune filière trouvée</p>
                            <p className="text-gray-400 text-sm mt-1">
                              Essayez de modifier votre recherche
                            </p>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      filteredSeries.map((serie, index) => (
                        <tr
                          key={serie.id}
                          className="hover:bg-gray-50 transition-colors"
                          style={{ animationDelay: `${index * 30}ms` }}
                        >
                          <td className="px-8 py-5 whitespace-nowrap">
                            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 text-primary-700 font-bold text-lg shadow-sm">
                              {serie.id}
                            </span>
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap">
                            <span className="text-base font-bold text-gray-900 bg-gray-50 px-4 py-2 rounded-lg">
                              {serie.intitule}
                            </span>
                          </td>
                          <td className="px-8 py-5 whitespace-nowrap">
                            <span className={`inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold ${
                              serie.cycle === 'Premier'
                                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                : 'bg-green-100 text-green-700 border border-green-300'
                            }`}>
                              {serie.cycle}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-gray-600">
              <p>
                Total : <span className="font-bold text-gray-900">{filteredSeries.length}</span> filière{filteredSeries.length > 1 ? 's' : ''}
              </p>
              <p className="text-xs text-gray-400">
                Affichage de {filteredSeries.length} sur {series.length} filière{series.length > 1 ? 's' : ''}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
