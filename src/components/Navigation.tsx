import React, { useState, useRef, useEffect } from 'react';
import { LayoutDashboard, Users, BookOpen, ChevronDown, ChevronRight, LogOut, GraduationCap, FileText, CircleUser as UserCircle, ClipboardList, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: SubMenuItem[];
}

interface SubMenuItem {
  id: string;
  label: string;
  path?: string;
  subItems?: SubMenuItem[];
}

export const Navigation: React.FC<{ onNavigate: (path: string) => void }> = ({ onNavigate }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { logout, user } = useAuth();

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Tableau de bord',
      icon: <LayoutDashboard className="w-4 h-4" />,
      path: '/dashboard'
    },
    {
      id: 'students',
      label: 'Gestion des élèves',
      icon: <Users className="w-4 h-4" />,
      subItems: [
        { id: 'inscription', label: 'Inscription', path: '/students/inscription' },
        { id: 'statut', label: 'Statut Redoublant/Passant', path: '/students/status' },
        { id: 'lv', label: 'Définir LV', path: '/students/lv' },
        { id: 'inapte', label: 'Définir Inapte', path: '/students/inapte' },
        { id: 'recherche', label: 'Recherche par matricule', path: '/students/recherche' },
        { id: 'code-parental', label: 'Code parental', path: '/students/code-parental' },
        { id: 'abandons', label: 'Liste des abandons', path: '/students/abandons' }
      ]
    },
    {
      id: 'studies',
      label: 'Gestion des études',
      icon: <BookOpen className="w-4 h-4" />,
      subItems: [
        { id: 'series', label: 'Séries', path: '/studies/series' },
        { id: 'groupes', label: 'Groupes pédagogiques', path: '/studies/groupes' },
        { id: 'changement', label: 'Changement de classe', path: '/studies/changement' },
        { id: 'matieres', label: 'Matières', path: '/studies/matieres' },
        { id: 'coefficients', label: 'Coéfficients', path: '/studies/coefficients' },
        { id: 'salles', label: 'Gestion des salles', path: '/studies/salles' },
        { id: 'enseignants', label: 'Enseignants', path: '/studies/enseignants' },
        { id: 'retardataires', label: 'Enseignants retardataires', path: '/studies/retardataires' },
        { id: 'espace-pp', label: 'Espace PP', path: '/studies/espace-pp' }
      ]
    },
    {
      id: 'editions',
      label: 'Editions',
      icon: <FileText className="w-4 h-4" />,
      subItems: [
        { id: 'bulletins', label: 'Bulletins', path: '/editions/bulletins' },
        { id: 'editions-enseignants', label: 'Enseignants', path: '/editions/enseignants' },
        { id: 'editions-eleves', label: 'Élèves', path: '/editions/eleves' },
        { id: 'certificat-scolarite', label: 'Certificat de scolarité', path: '/editions/certificat' },
        { id: 'carte-scolaire', label: 'Carte scolaire', path: '/editions/carte-scolaire' },
        { id: 'exportation-educmaster', label: 'Exportation Educmaster', path: '/editions/exportation-educmaster' },
        {
          id: 'bilan',
          label: 'Bilan',
          subItems: [
            { id: 'bilan-etablissement', label: "Bilan d'établissement", path: '/editions/bilan/etablissement' },
            { id: 'bilan-devoir', label: 'Bilan par devoir', path: '/editions/bilan/devoir' }
          ]
        },
        { id: 'passants-doublants', label: 'Passants/Doublants/Exclus', path: '/editions/passants-doublants' },
        { id: 'statistiques-devoirs', label: 'Statistiques devoirs', path: '/editions/statistiques-devoirs' },
        { id: 'resultats-devoirs', label: 'Résultats devoirs', path: '/editions/resultats-devoirs' }
      ]
    },
    {
      id: 'evaluations',
      label: 'Gestion des évaluations',
      icon: <ClipboardList className="w-4 h-4" />,
      subItems: [
        { id: 'feuille-notes', label: 'Feuille de notes', path: '/evaluations/feuille-notes' },
        { id: 'cahier-note', label: 'Cahier de note', path: '/evaluations/cahier-note' },
        { id: 'modification-notes', label: 'Modification des notes', path: '/evaluations/modification-notes' }
      ]
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
        setOpenSubMenu(null);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setOpenUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuClick = (item: MenuItem) => {
    if (item.subItems) {
      setOpenDropdown(openDropdown === item.id ? null : item.id);
      setOpenSubMenu(null);
    } else if (item.path) {
      onNavigate(item.path);
      setOpenDropdown(null);
    }
  };

  const handleSubMenuClick = (parentId: string, subItem: SubMenuItem) => {
    if (subItem.subItems) {
      setOpenSubMenu(openSubMenu === subItem.id ? null : subItem.id);
    } else if (subItem.path) {
      onNavigate(subItem.path);
      setOpenDropdown(null);
      setOpenSubMenu(null);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="bg-primary-500 p-2 rounded-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">Scolaria</span>
            </div>

            <div className="flex items-center gap-1" ref={dropdownRef}>
              {menuItems.map((item) => (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => handleMenuClick(item)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    {item.icon}
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.subItems && <ChevronDown className="w-4 h-4" />}
                  </button>

                  {item.subItems && openDropdown === item.id && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                      {item.subItems.map((subItem) => (
                        <div key={subItem.id} className="relative">
                          <button
                            onClick={() => handleSubMenuClick(item.id, subItem)}
                            className={`w-full flex items-center justify-between px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                              subItem.id === 'statistiques-devoirs' ? 'text-primary-500' : 'text-gray-700'
                            }`}
                          >
                            <span>{subItem.label}</span>
                            {subItem.subItems && <ChevronRight className="w-4 h-4" />}
                          </button>

                          {subItem.subItems && openSubMenu === subItem.id && (
                            <div className="absolute left-full top-0 ml-1 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
                              {subItem.subItems.map((nestedItem) => (
                                <button
                                  key={nestedItem.id}
                                  onClick={() => {
                                    if (nestedItem.path) {
                                      onNavigate(nestedItem.path);
                                      setOpenDropdown(null);
                                      setOpenSubMenu(null);
                                    }
                                  }}
                                  className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                  {nestedItem.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setOpenUserMenu(!openUserMenu)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <UserCircle className="w-5 h-5" />
                <div className="text-left">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-gray-500">{user?.role}</p>
                </div>
                <ChevronDown className="w-4 h-4" />
              </button>

              {openUserMenu && (
                <div className="absolute top-full right-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => {
                      onNavigate('/profile');
                      setOpenUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <UserCircle className="w-4 h-4" />
                    <span>Mon profil</span>
                  </button>
                  <button
                    onClick={() => {
                      onNavigate('/configuration');
                      setOpenUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Configuration</span>
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setOpenUserMenu(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Déconnexion</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
