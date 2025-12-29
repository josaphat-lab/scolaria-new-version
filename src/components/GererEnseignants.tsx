import React, { useState, useEffect } from 'react';
import { Search, Edit2, Lock, Trash2, MoreVertical, X, Check, Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Enseignant {
  id: string;
  nom: string;
  prenom: string;
  telephone?: string;
  diplome_professionnel?: string;
  matiere: string;
  nom_utilisateur: string;
  image_url?: string;
  date_naissance?: string;
  lieu_naissance?: string;
  banque_affiliee?: string;
  sexe: string;
  nationalite?: string;
  email?: string;
  numero_compte_bancaire?: string;
  matricule?: string;
  grade?: string;
  diplome_academique?: string;
  statut: string;
  fonction: string;
  date_premiere_prise_service?: string;
  date_prise_service_ceg1?: string;
  code_enseignant?: string;
  nombre_maximum_classe: number;
  compte_actif: boolean;
}

interface FormData {
  nom: string;
  prenom: string;
  telephone: string;
  diplome_professionnel: string;
  matiere: string;
  nom_utilisateur: string;
  date_naissance: string;
  lieu_naissance: string;
  banque_affiliee: string;
  sexe: string;
  nationalite: string;
  email: string;
  numero_compte_bancaire: string;
  matricule: string;
  grade: string;
  diplome_academique: string;
  statut: string;
  fonction: string;
  date_premiere_prise_service: string;
  date_prise_service_ceg1: string;
  code_enseignant: string;
  nombre_maximum_classe: number;
}

export const GererEnseignants: React.FC = () => {
  const [enseignants, setEnseignants] = useState<Enseignant[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    nom: '',
    prenom: '',
    telephone: '',
    diplome_professionnel: '',
    matiere: 'Français',
    nom_utilisateur: '',
    date_naissance: '',
    lieu_naissance: '',
    banque_affiliee: '',
    sexe: 'M',
    nationalite: '',
    email: '',
    numero_compte_bancaire: '',
    matricule: '',
    grade: '',
    diplome_academique: '',
    statut: 'Aspirant au Métier de l\'Enseignement',
    fonction: 'Adjoint(e)',
    date_premiere_prise_service: '',
    date_prise_service_ceg1: '',
    code_enseignant: '',
    nombre_maximum_classe: 10,
  });

  useEffect(() => {
    fetchEnseignants();
  }, []);

  const fetchEnseignants = async () => {
    const { data, error } = await supabase
      .from('enseignants')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching enseignants:', error);
    } else {
      setEnseignants(data || []);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing && editingId) {
        const { error } = await supabase
          .from('enseignants')
          .update(formData)
          .eq('id', editingId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('enseignants')
          .insert([formData]);

        if (error) throw error;
      }

      resetForm();
      fetchEnseignants();
    } catch (error) {
      console.error('Error saving enseignant:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (enseignant: Enseignant) => {
    setIsEditing(true);
    setEditingId(enseignant.id);
    setFormData({
      nom: enseignant.nom,
      prenom: enseignant.prenom,
      telephone: enseignant.telephone || '',
      diplome_professionnel: enseignant.diplome_professionnel || '',
      matiere: enseignant.matiere,
      nom_utilisateur: enseignant.nom_utilisateur,
      date_naissance: enseignant.date_naissance || '',
      lieu_naissance: enseignant.lieu_naissance || '',
      banque_affiliee: enseignant.banque_affiliee || '',
      sexe: enseignant.sexe,
      nationalite: enseignant.nationalite || '',
      email: enseignant.email || '',
      numero_compte_bancaire: enseignant.numero_compte_bancaire || '',
      matricule: enseignant.matricule || '',
      grade: enseignant.grade || '',
      diplome_academique: enseignant.diplome_academique || '',
      statut: enseignant.statut,
      fonction: enseignant.fonction,
      date_premiere_prise_service: enseignant.date_premiere_prise_service || '',
      date_prise_service_ceg1: enseignant.date_prise_service_ceg1 || '',
      code_enseignant: enseignant.code_enseignant || '',
      nombre_maximum_classe: enseignant.nombre_maximum_classe,
    });
    setOpenMenuId(null);
  };

  const handleBlock = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('enseignants')
      .update({ compte_actif: !currentStatus })
      .eq('id', id);

    if (!error) {
      fetchEnseignants();
    }
    setOpenMenuId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet enseignant ?')) {
      const { error } = await supabase
        .from('enseignants')
        .delete()
        .eq('id', id);

      if (!error) {
        fetchEnseignants();
      }
    }
    setOpenMenuId(null);
  };

  const resetForm = () => {
    setFormData({
      nom: '',
      prenom: '',
      telephone: '',
      diplome_professionnel: '',
      matiere: 'Français',
      nom_utilisateur: '',
      date_naissance: '',
      lieu_naissance: '',
      banque_affiliee: '',
      sexe: 'M',
      nationalite: '',
      email: '',
      numero_compte_bancaire: '',
      matricule: '',
      grade: '',
      diplome_academique: '',
      statut: 'Aspirant au Métier de l\'Enseignement',
      fonction: 'Adjoint(e)',
      date_premiere_prise_service: '',
      date_prise_service_ceg1: '',
      code_enseignant: '',
      nombre_maximum_classe: 10,
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const filteredEnseignants = enseignants.filter(
    (enseignant) =>
      enseignant.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enseignant.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enseignant.nom_utilisateur.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enseignant.matiere.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const inputClass = "w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200";
  const labelClass = "block text-sm font-semibold text-gray-700 mb-2";

  return (
    <div className="space-y-6">
      {/* Warning Message */}
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
        <p className="text-red-800 font-semibold">
          IMPORTANT ! En créant un enseignant, son mot de passe par défaut est le nom d'utilisateur que vous attribuez.
        </p>
        <p className="text-red-700 text-sm mt-1">
          NB: Les champs avec <span className="text-red-600 font-bold">*</span> sont obligatoires
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Nom */}
          <div>
            <label className={labelClass}>
              Nom <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.nom}
              onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Prénom */}
          <div>
            <label className={labelClass}>
              Prénom <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.prenom}
              onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Téléphone */}
          <div>
            <label className={labelClass}>Téléphone</label>
            <input
              type="tel"
              value={formData.telephone}
              onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Diplôme professionnel */}
          <div>
            <label className={labelClass}>Diplôme professionnel</label>
            <input
              type="text"
              value={formData.diplome_professionnel}
              onChange={(e) => setFormData({ ...formData, diplome_professionnel: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Matière */}
          <div>
            <label className={labelClass}>
              Matière <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.matiere}
              onChange={(e) => setFormData({ ...formData, matiere: e.target.value })}
              className={inputClass}
            >
              <option value="Français">Français</option>
              <option value="Mathématiques">Mathématiques</option>
              <option value="Anglais">Anglais</option>
              <option value="Histoire Géographie">Histoire Géographie</option>
              <option value="Sciences de la Vie et de la Terre">Sciences de la Vie et de la Terre</option>
              <option value="Physique Chimie et Technologie">Physique Chimie et Technologie</option>
              <option value="Education Physique et Sportive">Education Physique et Sportive</option>
              <option value="Espagnol">Espagnol</option>
              <option value="Allemand">Allemand</option>
            </select>
          </div>

          {/* Nom d'utilisateur */}
          <div>
            <label className={labelClass}>
              Nom d'utilisateur <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.nom_utilisateur}
              onChange={(e) => setFormData({ ...formData, nom_utilisateur: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Image */}
          <div>
            <label className={labelClass}>Image</label>
            <button
              type="button"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2 text-gray-700"
            >
              <Upload className="w-4 h-4" />
              Choisir un fichier
            </button>
          </div>

          {/* Date de naissance */}
          <div>
            <label className={labelClass}>Date de naissance</label>
            <input
              type="date"
              value={formData.date_naissance}
              onChange={(e) => setFormData({ ...formData, date_naissance: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Lieu de naissance */}
          <div>
            <label className={labelClass}>Lieu de naissance</label>
            <input
              type="text"
              value={formData.lieu_naissance}
              onChange={(e) => setFormData({ ...formData, lieu_naissance: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Banque affiliée */}
          <div>
            <label className={labelClass}>Banque affiliée</label>
            <input
              type="text"
              value={formData.banque_affiliee}
              onChange={(e) => setFormData({ ...formData, banque_affiliee: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Sexe */}
          <div>
            <label className={labelClass}>
              Sexe <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.sexe}
              onChange={(e) => setFormData({ ...formData, sexe: e.target.value })}
              className={inputClass}
            >
              <option value="M">M</option>
              <option value="F">F</option>
            </select>
          </div>

          {/* Nationalité */}
          <div>
            <label className={labelClass}>Nationalité</label>
            <input
              type="text"
              value={formData.nationalite}
              onChange={(e) => setFormData({ ...formData, nationalite: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Numéro compte bancaire */}
          <div>
            <label className={labelClass}>Numéro compte bancaire</label>
            <input
              type="text"
              value={formData.numero_compte_bancaire}
              onChange={(e) => setFormData({ ...formData, numero_compte_bancaire: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Matricule */}
          <div>
            <label className={labelClass}>Matricule</label>
            <input
              type="text"
              value={formData.matricule}
              onChange={(e) => setFormData({ ...formData, matricule: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Grade */}
          <div>
            <label className={labelClass}>Grade</label>
            <input
              type="text"
              value={formData.grade}
              onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Diplôme académique */}
          <div>
            <label className={labelClass}>Diplôme académique</label>
            <input
              type="text"
              value={formData.diplome_academique}
              onChange={(e) => setFormData({ ...formData, diplome_academique: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Statut */}
          <div>
            <label className={labelClass}>
              Statut <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.statut}
              onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
              className={inputClass}
            >
              <option value="Aspirant au Métier de l'Enseignement">Aspirant au Métier de l'Enseignement</option>
              <option value="Contractuel">Contractuel</option>
              <option value="Permanent">Permanent</option>
              <option value="Vacataire">Vacataire</option>
            </select>
          </div>

          {/* Fonction */}
          <div>
            <label className={labelClass}>
              Fonction <span className="text-red-600">*</span>
            </label>
            <select
              required
              value={formData.fonction}
              onChange={(e) => setFormData({ ...formData, fonction: e.target.value })}
              className={inputClass}
            >
              <option value="Adjoint(e)">Adjoint(e)</option>
              <option value="Titulaire">Titulaire</option>
              <option value="Censeur">Censeur</option>
            </select>
          </div>

          {/* Date de première prise de service */}
          <div>
            <label className={labelClass}>Date de première prise de service</label>
            <input
              type="date"
              value={formData.date_premiere_prise_service}
              onChange={(e) => setFormData({ ...formData, date_premiere_prise_service: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Date de prise de service au CEG1 MALANHOUI */}
          <div>
            <label className={labelClass}>Date de prise de service au CEG1 MALANHOUI</label>
            <input
              type="date"
              value={formData.date_prise_service_ceg1}
              onChange={(e) => setFormData({ ...formData, date_prise_service_ceg1: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Code enseignant */}
          <div>
            <label className={labelClass}>Code enseignant</label>
            <input
              type="text"
              value={formData.code_enseignant}
              onChange={(e) => setFormData({ ...formData, code_enseignant: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Nombre maximum de classe */}
          <div>
            <label className={labelClass}>
              Nombre maximum de classe <span className="text-red-600">*</span>
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.nombre_maximum_classe}
              onChange={(e) => setFormData({ ...formData, nombre_maximum_classe: parseInt(e.target.value) })}
              className={inputClass}
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-4 mt-8">
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-gray-500 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors duration-200 flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Annuler
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
          >
            <Check className="w-5 h-5" />
            {loading ? 'Enregistrement...' : isEditing ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
      </form>

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
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Matière</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Diplôme</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">Nom d'utilisateur</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700">État du compte</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-gray-700">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredEnseignants.map((enseignant) => (
                <tr key={enseignant.id} className="hover:bg-blue-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm text-blue-600 font-medium">{enseignant.matiere}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{enseignant.diplome_professionnel || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{enseignant.nom_utilisateur}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      enseignant.compte_actif
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {enseignant.compte_actif ? 'Actif' : 'Bloqué'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <div className="relative inline-block">
                      <button
                        onClick={() => setOpenMenuId(openMenuId === enseignant.id ? null : enseignant.id)}
                        className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                      >
                        <MoreVertical className="w-5 h-5" />
                      </button>

                      {openMenuId === enseignant.id && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 z-10 py-2">
                          <button
                            onClick={() => handleEdit(enseignant)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-amber-50 hover:text-amber-700 flex items-center gap-3 transition-colors duration-150"
                          >
                            <Edit2 className="w-4 h-4" />
                            Modifier
                          </button>
                          <button
                            onClick={() => handleBlock(enseignant.id, enseignant.compte_actif)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-700 flex items-center gap-3 transition-colors duration-150"
                          >
                            <Lock className="w-4 h-4" />
                            {enseignant.compte_actif ? 'Bloquer' : 'Débloquer'}
                          </button>
                          <button
                            onClick={() => handleDelete(enseignant.id)}
                            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 flex items-center gap-3 transition-colors duration-150"
                          >
                            <Trash2 className="w-4 h-4" />
                            Supprimer
                          </button>
                        </div>
                      )}
                    </div>
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
    </div>
  );
};
