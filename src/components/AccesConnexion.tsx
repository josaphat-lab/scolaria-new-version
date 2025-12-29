import React, { useState } from 'react';
import { Search, Lock, X } from 'lucide-react';

interface Enseignant {
  id: string;
  nom: string;
  prenom: string;
  matiere: string;
  diplome: string;
  nomUtilisateur: string;
}

const ENSEIGNANTS_DATA: Enseignant[] = [
  { id: '1', nom: 'BACHABI', prenom: 'Assyatou', matiere: 'Anglais', diplome: 'CAPES', nomUtilisateur: 'BACHABI' },
  { id: '2', nom: 'SARE', prenom: 'Zoumarou Ozias', matiere: 'Education Physique et Sportive', diplome: '', nomUtilisateur: 'SARE' },
  { id: '3', nom: 'DOVONON', prenom: 'Benjamin', matiere: 'Sciences de la Vie et de la Terre', diplome: '', nomUtilisateur: 'DOVONON' },
  { id: '4', nom: 'PADONOU', prenom: 'Florisse Gratias Sèdjro', matiere: 'Français', diplome: '', nomUtilisateur: 'PADONOU' },
  { id: '5', nom: 'ADANVOESSI', prenom: 'Mahounakpon Damien', matiere: 'Physique Chimie et Technologie', diplome: '', nomUtilisateur: 'ADANVOESSI' },
  { id: '6', nom: 'DJIDOHOKPIN', prenom: 'Vidjennagni Émilien Renaud', matiere: 'Mathématiques', diplome: '', nomUtilisateur: 'DJIDOHOKPIN' },
  { id: '7', nom: 'KPOSSATON', prenom: 'David', matiere: 'Histoire Géographie', diplome: '', nomUtilisateur: 'KPOSSATON' },
  { id: '8', nom: 'METOGNON', prenom: 'Jacques', matiere: 'Français', diplome: '', nomUtilisateur: 'METOGNON' },
  { id: '9', nom: 'AKOTO', prenom: 'Emmanuel', matiere: 'Espagnol', diplome: '', nomUtilisateur: 'AKOTO' },
  { id: '10', nom: 'OGOUKOLA', prenom: 'Marie', matiere: 'Education Physique et Sportive', diplome: '', nomUtilisateur: 'OGOUKOLA' },
];

export const AccesConnexion: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEnseignant, setSelectedEnseignant] = useState<Enseignant | null>(null);
  const [newPassword, setNewPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleModifierPassword = (enseignant: Enseignant) => {
    setSelectedEnseignant(enseignant);
    setNewPassword('');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEnseignant(null);
    setNewPassword('');
  };

  const handleSubmitPassword = () => {
    console.log(`Modification du mot de passe pour ${selectedEnseignant?.nomUtilisateur}: ${newPassword}`);
    handleCloseModal();
  };

  const filteredEnseignants = ENSEIGNANTS_DATA.filter(
    (enseignant) =>
      enseignant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enseignant.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enseignant.nomUtilisateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enseignant.matiere.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Description */}
      <p className="text-gray-600 text-center">
        Ici, vous avez la possibilité de <span className="font-semibold text-gray-800">modifier le mot de passe d'un enseignant.</span>
      </p>

      {/* Search Bar */}
      <div className="flex justify-end">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Nom & Prénom</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Matière</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Diplôme</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Nom d'utilisateur</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEnseignants.map((enseignant) => (
                <tr key={enseignant.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                    {enseignant.nom} {enseignant.prenom}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{enseignant.matiere}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{enseignant.diplome || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{enseignant.nomUtilisateur}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleModifierPassword(enseignant)}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-200 text-sm shadow-md hover:shadow-lg"
                    >
                      <Lock className="w-4 h-4" />
                      Modifier mot de passe
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredEnseignants.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Aucun enseignant trouvé</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedEnseignant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all animate-scale-in">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 px-6 py-4 rounded-t-2xl flex items-center justify-between">
              <div className="flex items-center gap-3 text-white">
                <div className="w-10 h-10 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold">Modifier le mot de passe</h3>
              </div>
              <button
                onClick={handleCloseModal}
                className="text-white hover:bg-white hover:bg-opacity-20 rounded-lg p-1 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Body */}
            <div className="p-6 space-y-6">
              {/* Nom de l'enseignant */}
              <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-4 border border-blue-100">
                <p className="text-sm text-gray-600 mb-1">Enseignant</p>
                <p className="text-lg font-bold text-gray-900">
                  {selectedEnseignant.nom} {selectedEnseignant.prenom}
                </p>
                <p className="text-sm text-teal-600 font-medium mt-1">
                  @{selectedEnseignant.nomUtilisateur}
                </p>
              </div>

              {/* Champ mot de passe */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nouveau mot de passe
                </label>
                <input
                  type="text"
                  placeholder="Entrez le nouveau mot de passe"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                />
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex gap-3 justify-end">
              <button
                onClick={handleCloseModal}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-200 flex items-center gap-2"
              >
                <X className="w-4 h-4" />
                Fermer
              </button>
              <button
                onClick={handleSubmitPassword}
                disabled={!newPassword}
                className="px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};
