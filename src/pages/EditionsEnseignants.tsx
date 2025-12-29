import React, { useState, useEffect } from 'react';
import { FileText, User, Download, Mail, Phone, Calendar, MapPin, GraduationCap, Briefcase, CreditCard, Building } from 'lucide-react';

type TabType = 'fiche' | 'liste-annee' | 'liste-matiere' | 'liste-gp';
type FicheMode = 'unique' | 'complete';

interface Enseignant {
  id: string;
  nom: string;
  prenom: string;
  telephone: string;
  diplome_professionnel: string;
  matiere: string;
  nom_utilisateur: string;
  image_url: string;
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
  code_enseignant: string;
}

const FicheEnseignantCard: React.FC<{ enseignant: Enseignant }> = ({ enseignant }) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-4 border-white/30">
              {enseignant.image_url ? (
                <img src={enseignant.image_url} alt={`${enseignant.prenom} ${enseignant.nom}`} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-12 h-12 text-white" />
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold">{enseignant.prenom} {enseignant.nom}</h3>
              <p className="text-blue-100 text-sm mt-1">Code: {enseignant.nom_utilisateur}</p>
              {enseignant.code_enseignant && (
                <p className="text-blue-100 text-sm">Code enseignant: {enseignant.code_enseignant}</p>
              )}
            </div>
          </div>
          <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Télécharger</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 grid grid-cols-2 gap-6">
        {/* Informations d'identification */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 border-b-2 border-blue-500 pb-2">
            Informations d'identification
          </h4>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Sexe</p>
                <p className="text-sm text-gray-900">{enseignant.sexe}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Date de naissance</p>
                <p className="text-sm text-gray-900">{enseignant.date_naissance || 'Non renseignée'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Lieu de naissance</p>
                <p className="text-sm text-gray-900">{enseignant.lieu_naissance || 'Non renseigné'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Email</p>
                <p className="text-sm text-gray-900">{enseignant.email || 'Non renseigné'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Téléphone</p>
                <p className="text-sm text-gray-900">{enseignant.telephone || 'Non renseigné'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Nationalité</p>
                <p className="text-sm text-gray-900">{enseignant.nationalite || 'Non renseignée'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Building className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Banque affiliée</p>
                <p className="text-sm text-gray-900">{enseignant.banque_affiliee || 'Non renseignée'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">N° de compte</p>
                <p className="text-sm text-gray-900">{enseignant.numero_compte_bancaire || 'Non renseigné'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Données de fonction */}
        <div className="space-y-4">
          <h4 className="text-lg font-semibold text-gray-900 border-b-2 border-green-500 pb-2">
            Données de fonction
          </h4>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">N° Matricule</p>
                <p className="text-sm text-gray-900">{enseignant.matricule || 'Non renseigné'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Grade</p>
                <p className="text-sm text-gray-900">{enseignant.grade || 'Non renseigné'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Diplôme académique</p>
                <p className="text-sm text-gray-900">{enseignant.diplome_academique || 'Non renseigné'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Diplôme professionnel</p>
                <p className="text-sm text-gray-900">{enseignant.diplome_professionnel || 'Non renseigné'}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Statut</p>
                <p className="text-sm text-gray-900">{enseignant.statut}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Fonction</p>
                <p className="text-sm text-gray-900">{enseignant.fonction}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Matière enseignée</p>
                <p className="text-sm text-gray-900">{enseignant.matiere}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const EditionsEnseignants: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('fiche');
  const [ficheMode, setFicheMode] = useState<FicheMode>('unique');
  const [selectedYear, setSelectedYear] = useState('2024-2025');
  const [selectedEnseignant, setSelectedEnseignant] = useState('');
  const [enseignants, setEnseignants] = useState<Enseignant[]>([]);
  const [filteredEnseignant, setFilteredEnseignant] = useState<Enseignant | null>(null);
  const [loading, setLoading] = useState(false);
  const [showListeAnnee, setShowListeAnnee] = useState(false);
  const [selectedYearForListe, setSelectedYearForListe] = useState('2024-2025');
  const [showListeMatiere, setShowListeMatiere] = useState(false);
  const [selectedYearForMatiere, setSelectedYearForMatiere] = useState('2024-2025');
  const [selectedMatiere, setSelectedMatiere] = useState('');
  const [showListeGP, setShowListeGP] = useState(false);
  const [selectedYearForGP, setSelectedYearForGP] = useState('2024-2025');
  const [selectedPromotion, setSelectedPromotion] = useState('6ème');
  const [selectedClasse, setSelectedClasse] = useState<string | null>(null);

  const years = ['2024-2025', '2023-2024', '2022-2023', '2021-2022'];
  const matieres = [
    'Français',
    'Mathématiques',
    'Histoire Géographie',
    'Physique-Chimie',
    'Anglais',
    'SVT',
    'EPS',
    'Arts Plastiques'
  ];

  const promotions = ['6ème', '5ème', '4ème', '3ème', '2nde', '1ère', 'Tle'];

  const classesByPromotion: Record<string, string[]> = {
    '6ème': ['6ème M1', '6ème M2', '6ème M3', '6ème M4'],
    '5ème': ['5ème M1', '5ème M2', '5ème M3'],
    '4ème': ['4ème M1', '4ème M2', '4ème M3'],
    '3ème': ['3ème M1', '3ème M2', '3ème M3'],
    '2nde': ['2nde A', '2nde B', '2nde C'],
    '1ère': ['1ère A', '1ère B', '1ère C'],
    'Tle': ['Tle A', 'Tle B', 'Tle C']
  };

  const enseignantsByClasse: Record<string, Array<{nom: string, prenom: string, matiere: string}>> = {
    '6ème M1': [
      { nom: 'ZOGLOBOSSOU', prenom: 'F. M. Modeste épse ZANNOU', matiere: 'Hist Géo' },
      { nom: 'TIGRI', prenom: 'Lamatou Nawal', matiere: 'EPS' },
      { nom: 'AGNONHE', prenom: 'A. Lucas', matiere: 'Français' },
      { nom: 'ZOUNNON', prenom: 'Florent S.', matiere: 'SVT' },
      { nom: 'DJIGBENOU', prenom: 'Alain', matiere: 'PCT' },
      { nom: 'HOYINON', prenom: 'Samuel', matiere: 'Maths' },
      { nom: 'TOSSOU', prenom: 'Nicolas', matiere: 'Anglais' }
    ]
  };

  const tabs = [
    {
      id: 'fiche' as TabType,
      label: 'Fiche enseignant',
      color: 'bg-blue-600 hover:bg-blue-700',
      activeColor: 'bg-blue-700'
    },
    {
      id: 'liste-annee' as TabType,
      label: 'Liste des enseignants par année',
      color: 'bg-green-600 hover:bg-green-700',
      activeColor: 'bg-green-700'
    },
    {
      id: 'liste-matiere' as TabType,
      label: 'Liste des enseignants par matière et année',
      color: 'bg-orange-600 hover:bg-orange-700',
      activeColor: 'bg-orange-700'
    },
    {
      id: 'liste-gp' as TabType,
      label: 'Liste des enseignants par GP et année',
      color: 'bg-red-600 hover:bg-red-700',
      activeColor: 'bg-red-700'
    }
  ];

  useEffect(() => {
    loadEnseignants();
  }, []);

  useEffect(() => {
    if (selectedEnseignant && ficheMode === 'unique') {
      const enseignant = enseignants.find(e => e.id === selectedEnseignant);
      setFilteredEnseignant(enseignant || null);
    }
  }, [selectedEnseignant, enseignants, ficheMode]);

  useEffect(() => {
    setShowListeAnnee(false);
    setShowListeMatiere(false);
    setShowListeGP(false);
    setSelectedClasse(null);
  }, [activeTab]);

  const loadEnseignants = async () => {
    setLoading(true);
    const mockData: Enseignant[] = [
      {
        id: '1',
        nom: 'AGBOHESSOU',
        prenom: 'Reine',
        telephone: '96113466',
        diplome_professionnel: 'CAP',
        matiere: 'Histoire Géographie',
        nom_utilisateur: 'AGB43764',
        image_url: '',
        date_naissance: '12-09-1979',
        lieu_naissance: 'Porto-Novo',
        banque_affiliee: 'Banque Atlantique',
        sexe: 'F',
        nationalite: 'Béninoise',
        email: 'reine.agbohessou@school.bj',
        numero_compte_bancaire: '001234567890',
        matricule: '106306',
        grade: 'A3-1',
        diplome_academique: 'Licence en Histoire',
        statut: 'Permanent',
        fonction: 'Adjoint',
        code_enseignant: 'CODE001'
      },
      {
        id: '2',
        nom: 'KOUASSI',
        prenom: 'Jean',
        telephone: '97654321',
        diplome_professionnel: 'CAPES',
        matiere: 'Mathématiques',
        nom_utilisateur: 'KOU12345',
        image_url: '',
        date_naissance: '20-03-1985',
        lieu_naissance: 'Cotonou',
        banque_affiliee: 'Ecobank',
        sexe: 'M',
        nationalite: 'Béninois',
        email: 'jean.kouassi@school.bj',
        numero_compte_bancaire: '002345678901',
        matricule: '107890',
        grade: 'A2-1',
        diplome_academique: 'Master en Mathématiques',
        statut: 'Permanent',
        fonction: 'Enseignant',
        code_enseignant: 'CODE002'
      },
      {
        id: '3',
        nom: 'DOSSOU',
        prenom: 'Marie',
        telephone: '98765432',
        diplome_professionnel: 'CAFOP',
        matiere: 'Français',
        nom_utilisateur: 'DOS67890',
        image_url: '',
        date_naissance: '15-07-1990',
        lieu_naissance: 'Abomey',
        banque_affiliee: 'BOA',
        sexe: 'F',
        nationalite: 'Béninoise',
        email: 'marie.dossou@school.bj',
        numero_compte_bancaire: '003456789012',
        matricule: '108901',
        grade: 'B1',
        diplome_academique: 'Licence en Lettres Modernes',
        statut: 'Contractuel',
        fonction: 'Enseignant',
        code_enseignant: 'CODE003'
      },
      {
        id: '4',
        nom: 'AKPOVI',
        prenom: 'Daniel',
        telephone: '95123456',
        diplome_professionnel: 'CAPES',
        matiere: 'Physique-Chimie',
        nom_utilisateur: 'AKP78901',
        image_url: '',
        date_naissance: '05-12-1982',
        lieu_naissance: 'Parakou',
        banque_affiliee: 'BSIC',
        sexe: 'M',
        nationalite: 'Béninois',
        email: 'daniel.akpovi@school.bj',
        numero_compte_bancaire: '004567890123',
        matricule: '109012',
        grade: 'A1',
        diplome_academique: 'Doctorat en Physique',
        statut: 'Permanent',
        fonction: 'Professeur Principal',
        code_enseignant: 'CODE004'
      },
      {
        id: '5',
        nom: 'ZINSOU',
        prenom: 'Angèle',
        telephone: '94567890',
        diplome_professionnel: 'CAFOP',
        matiere: 'Anglais',
        nom_utilisateur: 'ZIN23456',
        image_url: '',
        date_naissance: '22-08-1988',
        lieu_naissance: 'Ouidah',
        banque_affiliee: 'Banque Atlantique',
        sexe: 'F',
        nationalite: 'Béninoise',
        email: 'angele.zinsou@school.bj',
        numero_compte_bancaire: '005678901234',
        matricule: '110123',
        grade: 'B2',
        diplome_academique: 'Master en Anglais',
        statut: 'Permanent',
        fonction: 'Enseignant',
        code_enseignant: 'CODE005'
      }
    ];

    setTimeout(() => {
      setEnseignants(mockData);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="bg-blue-100 p-2 rounded-lg">
          <FileText className="w-6 h-6 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Editions - Enseignants</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-3 p-4 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg text-white font-medium transition-all ${
                activeTab === tab.id ? tab.activeColor + ' shadow-md transform scale-105' : tab.color
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'fiche' && (
            <div className="space-y-6">
              {/* Sub-tabs for Unique/Complete */}
              <div className="flex gap-3">
                <button
                  onClick={() => setFicheMode('unique')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    ficheMode === 'unique'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Unique
                </button>
                <button
                  onClick={() => setFicheMode('complete')}
                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                    ficheMode === 'complete'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Complète
                </button>
              </div>

              {/* Filters */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Année Scolaire
                    </label>
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>

                  {ficheMode === 'unique' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enseignant
                      </label>
                      <select
                        value={selectedEnseignant}
                        onChange={(e) => setSelectedEnseignant(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Sélectionner un enseignant</option>
                        {enseignants.map((ens) => (
                          <option key={ens.id} value={ens.id}>
                            {ens.nom} {ens.prenom}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>

              {/* Display */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  <p className="mt-2 text-gray-600">Chargement...</p>
                </div>
              ) : ficheMode === 'unique' ? (
                filteredEnseignant ? (
                  <FicheEnseignantCard enseignant={filteredEnseignant} />
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600">
                      {selectedEnseignant ? 'Enseignant non trouvé' : 'Veuillez sélectionner un enseignant'}
                    </p>
                  </div>
                )
              ) : (
                <div className="space-y-6">
                  {enseignants.length > 0 ? (
                    enseignants.map((ens) => (
                      <FicheEnseignantCard key={ens.id} enseignant={ens} />
                    ))
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600">Aucun enseignant trouvé</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'liste-annee' && (
            <div className="space-y-6">
              {!showListeAnnee ? (
                <div className="max-w-xl mx-auto">
                  <h2 className="text-2xl font-bold text-green-600 mb-6 text-center">
                    Liste des enseignants par année
                  </h2>
                  <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-xl shadow-lg border border-green-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Année Scolaire
                    </label>
                    <select
                      value={selectedYearForListe}
                      onChange={(e) => setSelectedYearForListe(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium mb-6"
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => setShowListeAnnee(true)}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setShowListeAnnee(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-all"
                    >
                      Retour
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger
                    </button>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden print:shadow-none">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-8 border-b-2 border-green-600">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <div className="text-left">
                          <p className="font-bold text-gray-900 text-lg">CEG DOWA</p>
                          <p className="text-gray-700">OUEME - Porto-Novo</p>
                        </div>
                        <div className="flex justify-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg">
                            <GraduationCap className="w-10 h-10 text-white" />
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-700">Email: cegdowa@gmail.com</p>
                          <p className="text-gray-900 font-semibold">01 BP 543 PORTO-NOVO - +229 66 34 37 50</p>
                        </div>
                      </div>
                      <h2 className="text-center text-xl font-bold text-gray-900 mt-6 pb-2 border-b-2 border-gray-300">
                        Liste des enseignants de l'année {selectedYearForListe}
                      </h2>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
                            <th className="px-3 py-3 text-left font-semibold border-r border-green-700">Nom d'utilisateur</th>
                            <th className="px-3 py-3 text-left font-semibold border-r border-green-700">Nom & prénoms</th>
                            <th className="px-3 py-3 text-left font-semibold border-r border-green-700">Date de naissance</th>
                            <th className="px-3 py-3 text-left font-semibold border-r border-green-700">Sexe</th>
                            <th className="px-3 py-3 text-left font-semibold border-r border-green-700">Statut</th>
                            <th className="px-3 py-3 text-left font-semibold border-r border-green-700">Fonction</th>
                            <th className="px-3 py-3 text-left font-semibold border-r border-green-700">Grade</th>
                            <th className="px-3 py-3 text-left font-semibold border-r border-green-700">Matricule</th>
                            <th className="px-3 py-3 text-left font-semibold border-r border-green-700">Discipline enseignée</th>
                            <th className="px-3 py-3 text-left font-semibold border-r border-green-700">Classes tenues</th>
                            <th className="px-3 py-3 text-left font-semibold border-r border-green-700" colSpan={2}>Date de prise de service</th>
                            <th className="px-3 py-3 text-left font-semibold">Contact</th>
                          </tr>
                          <tr className="bg-green-100 text-gray-700">
                            <th className="px-3 py-2 border-r border-gray-300" colSpan={10}></th>
                            <th className="px-3 py-2 text-center text-xs font-semibold border-r border-gray-300">1ère</th>
                            <th className="px-3 py-2 text-center text-xs font-semibold border-r border-gray-300">Au poste</th>
                            <th className="px-3 py-2"></th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {enseignants.map((ens, idx) => (
                            <tr key={ens.id} className={idx % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}>
                              <td className="px-3 py-3 border-r border-gray-200 font-medium text-gray-900">{ens.nom_utilisateur}</td>
                              <td className="px-3 py-3 border-r border-gray-200 font-medium text-gray-900">{ens.prenom} {ens.nom}</td>
                              <td className="px-3 py-3 border-r border-gray-200 text-gray-700">{ens.date_naissance || '-'}</td>
                              <td className="px-3 py-3 border-r border-gray-200 text-center text-gray-700">{ens.sexe}</td>
                              <td className="px-3 py-3 border-r border-gray-200 text-gray-700">{ens.statut}</td>
                              <td className="px-3 py-3 border-r border-gray-200 text-gray-700">{ens.fonction}</td>
                              <td className="px-3 py-3 border-r border-gray-200 text-gray-700">{ens.grade || '-'}</td>
                              <td className="px-3 py-3 border-r border-gray-200 text-gray-700">{ens.matricule || '-'}</td>
                              <td className="px-3 py-3 border-r border-gray-200 text-gray-700">{ens.matiere}</td>
                              <td className="px-3 py-3 border-r border-gray-200 text-gray-700 text-xs">
                                {ens.fonction === 'Professeur Principal' ? '6emeM1, 6emeM3, 5emeM1A' :
                                 ens.fonction === 'Adjoint' ? '6emeM1, 6emeM13, 5emeM1A, 2ndeD2' :
                                 '6emeM1, 6emeM5, 3emM7'}
                              </td>
                              <td className="px-3 py-3 border-r border-gray-200 text-center text-gray-700 text-xs">
                                {idx === 0 ? '10-04-23' : idx === 1 ? '-' : idx === 2 ? '01-05-21' : idx === 3 ? '11-21-22' : '-'}
                              </td>
                              <td className="px-3 py-3 border-r border-gray-200 text-center text-gray-700 text-xs">
                                {idx === 0 ? '10-04-23' : idx === 1 ? '-' : idx === 2 ? '01-05-21' : idx === 3 ? '11-21-22' : '-'}
                              </td>
                              <td className="px-3 py-3 text-gray-700">{ens.telephone}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'liste-matiere' && (
            <div className="space-y-6">
              {!showListeMatiere ? (
                <div className="max-w-xl mx-auto">
                  <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
                    Liste des enseignants par matière et année
                  </h2>
                  <div className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-xl shadow-lg border border-orange-200">
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Matière
                        </label>
                        <select
                          value={selectedMatiere}
                          onChange={(e) => setSelectedMatiere(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 font-medium"
                        >
                          <option value="">Sélectionner une matière</option>
                          {matieres.map((matiere) => (
                            <option key={matiere} value={matiere}>{matiere}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Année Scolaire
                        </label>
                        <select
                          value={selectedYearForMatiere}
                          onChange={(e) => setSelectedYearForMatiere(e.target.value)}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-900 font-medium"
                        >
                          {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        if (selectedMatiere) {
                          setShowListeMatiere(true);
                        }
                      }}
                      disabled={!selectedMatiere}
                      className={`w-full px-6 py-3 rounded-lg font-semibold transition-all shadow-md ${
                        selectedMatiere
                          ? 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white hover:shadow-lg transform hover:scale-105'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setShowListeMatiere(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-all"
                    >
                      Retour
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger
                    </button>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden print:shadow-none">
                    <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-8 border-b-2 border-orange-600">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <div className="text-left">
                          <p className="font-bold text-gray-900 text-lg">CEG DOWA</p>
                          <p className="text-gray-700">OUEME - Porto-Novo</p>
                        </div>
                        <div className="flex justify-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-orange-800 rounded-full flex items-center justify-center shadow-lg">
                            <GraduationCap className="w-10 h-10 text-white" />
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-700">Email: cegdowa@gmail.com</p>
                          <p className="text-gray-900 font-semibold">01 BP 543 PORTO-NOVO - +229 66 34 37 50</p>
                        </div>
                      </div>
                      <h2 className="text-center text-xl font-bold text-gray-900 mt-6 pb-2 border-b-2 border-gray-300">
                        Liste des enseignants de {selectedMatiere} de l'année {selectedYearForMatiere}
                      </h2>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gradient-to-r from-orange-600 to-blue-600 text-white">
                            <th className="px-6 py-4 text-left font-semibold border-r border-orange-700">Nom</th>
                            <th className="px-6 py-4 text-left font-semibold border-r border-orange-700">Prénom</th>
                            <th className="px-6 py-4 text-left font-semibold">Matière</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {enseignants
                            .filter((ens) => ens.matiere === selectedMatiere)
                            .map((ens, idx) => (
                              <tr key={ens.id} className={idx % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}>
                                <td className="px-6 py-4 border-r border-gray-200 font-semibold text-gray-900">{ens.nom}</td>
                                <td className="px-6 py-4 border-r border-gray-200 text-gray-700">{ens.prenom}</td>
                                <td className="px-6 py-4 text-gray-700">{ens.matiere}</td>
                              </tr>
                            ))}
                          {enseignants.filter((ens) => ens.matiere === selectedMatiere).length === 0 && (
                            <tr>
                              <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                Aucun enseignant trouvé pour cette matière
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'liste-gp' && (
            <div className="space-y-6">
              {!showListeGP ? (
                <div className="max-w-xl mx-auto">
                  <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
                    Liste des enseignants par GP et année
                  </h2>
                  <div className="bg-gradient-to-br from-red-50 to-white p-8 rounded-xl shadow-lg border border-red-200">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Année Scolaire
                    </label>
                    <select
                      value={selectedYearForGP}
                      onChange={(e) => setSelectedYearForGP(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 font-medium mb-6"
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => setShowListeGP(true)}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                    >
                      Suivant
                    </button>
                  </div>
                </div>
              ) : !selectedClasse ? (
                <div className="space-y-6">
                  <button
                    onClick={() => setShowListeGP(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-all"
                  >
                    Retour
                  </button>

                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                    <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
                      Sélectionnez une promotion et une classe
                    </h2>

                    <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                      {promotions.map((promo) => (
                        <button
                          key={promo}
                          onClick={() => setSelectedPromotion(promo)}
                          className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition-all ${
                            selectedPromotion === promo
                              ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-md transform scale-105'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {promo}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {classesByPromotion[selectedPromotion].map((classe) => (
                        <button
                          key={classe}
                          onClick={() => setSelectedClasse(classe)}
                          className="bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 border-2 border-blue-300 hover:border-blue-500 rounded-xl p-6 transition-all shadow-md hover:shadow-xl transform hover:scale-105 group"
                        >
                          <div className="text-center">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform">
                              <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <p className="font-bold text-gray-900 text-lg">{classe}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => setSelectedClasse(null)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg font-medium transition-all"
                    >
                      Retour
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white px-6 py-2 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Télécharger
                    </button>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden print:shadow-none">
                    <div className="bg-gradient-to-r from-red-50 to-blue-50 p-8 border-b-2 border-red-600">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <div className="text-left">
                          <p className="font-bold text-gray-900 text-lg">CEG DOWA</p>
                          <p className="text-gray-700">OUEME - Porto-Novo</p>
                        </div>
                        <div className="flex justify-center">
                          <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center shadow-lg">
                            <GraduationCap className="w-10 h-10 text-white" />
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-700">Email: cegdowa@gmail.com</p>
                          <p className="text-gray-900 font-semibold">01 BP 543 PORTO-NOVO - +229 66 34 37 50</p>
                        </div>
                      </div>
                      <h2 className="text-center text-xl font-bold text-gray-900 mt-6 pb-2 border-b-2 border-gray-300">
                        Liste des enseignants de la <span className="text-blue-600">{selectedClasse}</span> au cours de l'année {selectedYearForGP}
                      </h2>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="bg-gradient-to-r from-red-600 to-blue-600 text-white">
                            <th className="px-6 py-4 text-left font-semibold border-r border-red-700">Nom</th>
                            <th className="px-6 py-4 text-left font-semibold border-r border-red-700">Prénom</th>
                            <th className="px-6 py-4 text-left font-semibold">Matière</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {enseignantsByClasse[selectedClasse]?.map((ens, idx) => (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}>
                              <td className="px-6 py-4 border-r border-gray-200 font-semibold text-gray-900">{ens.nom}</td>
                              <td className="px-6 py-4 border-r border-gray-200 text-gray-700">{ens.prenom}</td>
                              <td className="px-6 py-4 text-gray-700">{ens.matiere}</td>
                            </tr>
                          )) || (
                            <tr>
                              <td colSpan={3} className="px-6 py-8 text-center text-gray-500">
                                Aucun enseignant trouvé pour cette classe
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
