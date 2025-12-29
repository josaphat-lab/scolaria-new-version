import React, { useState } from 'react';
import { ArrowLeft, GraduationCap, Settings, TrendingUp, UserX, Calendar, FileText, Users } from 'lucide-react';
import { ParametresSalle } from './ParametresSalle';
import { MoyennesSemestre1 } from './MoyennesSemestre1';
import { MoyennesSemestre2 } from './MoyennesSemestre2';
import { MoyennesAnnuelles } from './MoyennesAnnuelles';
import { AbandonSemestre1 } from './AbandonSemestre1';
import { AbandonSemestre2 } from './AbandonSemestre2';

interface ClasseCard {
  id: string;
  name: string;
  niveau: string;
}

const CLASSES_DATA: ClasseCard[] = [
  { id: '6ma', name: '6ème MA', niveau: '6ème' },
  { id: '6mb', name: '6ème MB', niveau: '6ème' },
  { id: '6mc', name: '6ème MC', niveau: '6ème' },
  { id: '6md', name: '6ème MD', niveau: '6ème' },
  { id: '5ma', name: '5ème MA', niveau: '5ème' },
  { id: '5mb', name: '5ème MB', niveau: '5ème' },
  { id: '4ma', name: '4ème MA', niveau: '4ème' },
  { id: '4mb', name: '4ème MB', niveau: '4ème' },
  { id: '3ma', name: '3ème MA', niveau: '3ème' },
  { id: '3mb', name: '3ème MB', niveau: '3ème' },
];

interface CardOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  iconBg: string;
}

const CARD_OPTIONS: CardOption[] = [
  {
    id: 'parametres',
    title: 'Paramètres de la salle',
    description: "Gérer la liste de votre classe, définissez les responsables de classe, les notes de conduite etc. Pour accéder à votre espace de travail appuyez sur le bouton Ouvrir",
    icon: <Settings className="w-8 h-8" />,
    gradient: 'from-teal-500 to-emerald-600',
    iconBg: 'from-teal-100 to-emerald-200',
  },
  {
    id: 'moyennes-s1',
    title: 'Moyennes générales 1er semestre',
    description: "Cet espace vous permet de gérer les moyennes d'interrogations, de devoirs jusqu'à l'édition des bulletins. Pour accéder à votre espace de travail appuyez sur le bouton Ouvrir",
    icon: <TrendingUp className="w-8 h-8" />,
    gradient: 'from-blue-500 to-cyan-600',
    iconBg: 'from-blue-100 to-cyan-200',
  },
  {
    id: 'moyennes-s2',
    title: 'Moyennes générales 2e semestre',
    description: "Cet espace vous permet de gérer les moyennes d'interrogations, de devoirs jusqu'à l'édition des bulletins. Pour accéder à votre espace de travail appuyez sur le bouton Ouvrir",
    icon: <TrendingUp className="w-8 h-8" />,
    gradient: 'from-purple-500 to-pink-600',
    iconBg: 'from-purple-100 to-pink-200',
  },
  {
    id: 'moyennes-annuelles',
    title: 'Moyennes annuelles',
    description: "Cet espace vous permet de gérer les moyennes de fin d'année. Pour accéder à votre espace de travail appuyez sur le bouton Ouvrir",
    icon: <Calendar className="w-8 h-8" />,
    gradient: 'from-rose-500 to-orange-600',
    iconBg: 'from-rose-100 to-orange-200',
  },
  {
    id: 'abandon-s1',
    title: 'Abandon 1er Semestre',
    description: "Cet espace vous permet de définir les élèves qui ont abandonné les cours au premier semestre. Pour accéder à cet espace de travail appuyez sur le bouton Ouvrir",
    icon: <UserX className="w-8 h-8" />,
    gradient: 'from-red-500 to-rose-600',
    iconBg: 'from-red-100 to-rose-200',
  },
  {
    id: 'abandon-s2',
    title: 'Abandon 2nd Semestre',
    description: "Cet espace vous permet de définir les élèves qui ont abandonné les cours au second semestre. Pour accéder à cet espace de travail appuyez sur le bouton Ouvrir",
    icon: <UserX className="w-8 h-8" />,
    gradient: 'from-amber-500 to-yellow-600',
    iconBg: 'from-amber-100 to-yellow-200',
  },
];

export const EspacePP: React.FC = () => {
  const [selectedNiveau, setSelectedNiveau] = useState<string>('6ème');
  const [selectedClasse, setSelectedClasse] = useState<ClasseCard | null>(null);
  const [openedCard, setOpenedCard] = useState<string | null>(null);

  const niveaux = ['6ème', '5ème', '4ème', '3ème'];

  const filteredClasses = CLASSES_DATA.filter(
    (classe) => classe.niveau === selectedNiveau
  );

  const handleSelectClasse = (classe: ClasseCard) => {
    setSelectedClasse(classe);
    setOpenedCard(null);
  };

  const handleOpenCard = (cardId: string) => {
    setOpenedCard(cardId);
  };

  if (openedCard === 'parametres' && selectedClasse) {
    return (
      <ParametresSalle
        classeName={selectedClasse.name}
        onBack={() => setOpenedCard(null)}
      />
    );
  }

  if (openedCard === 'moyennes-s1' && selectedClasse) {
    return (
      <MoyennesSemestre1
        classeName={selectedClasse.name}
        onBack={() => setOpenedCard(null)}
      />
    );
  }

  if (openedCard === 'moyennes-s2' && selectedClasse) {
    return (
      <MoyennesSemestre2
        classeName={selectedClasse.name}
        onBack={() => setOpenedCard(null)}
      />
    );
  }

  if (openedCard === 'moyennes-annuelles' && selectedClasse) {
    return (
      <MoyennesAnnuelles
        classeName={selectedClasse.name}
        onBack={() => setOpenedCard(null)}
      />
    );
  }

  if (openedCard === 'abandon-s1' && selectedClasse) {
    return (
      <AbandonSemestre1
        classeName={selectedClasse.name}
        onBack={() => setOpenedCard(null)}
      />
    );
  }

  if (openedCard === 'abandon-s2' && selectedClasse) {
    return (
      <AbandonSemestre2
        classeName={selectedClasse.name}
        onBack={() => setOpenedCard(null)}
      />
    );
  }

  if (!selectedClasse) {
    return (
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Espace PP</h1>
        </div>

        <p className="text-gray-600">
          Bienvenue dans l'<span className="text-teal-600 font-semibold">espace professeur principal</span>. Veuillez sélectionner une classe pour accéder aux fonctionnalités.
        </p>

        <div className="flex gap-2 flex-wrap">
          {niveaux.map((niveau) => (
            <button
              key={niveau}
              onClick={() => setSelectedNiveau(niveau)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                selectedNiveau === niveau
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 border border-gray-300 hover:border-teal-500 hover:shadow-md'
              }`}
            >
              {niveau}
            </button>
          ))}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Les classes disponibles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClasses.map((classe) => (
              <div
                key={classe.id}
                onClick={() => handleSelectClasse(classe)}
                className="bg-white rounded-xl border border-gray-200 p-6 hover:border-teal-500 hover:shadow-lg transition-all duration-200 cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-emerald-200 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-8 h-8 text-teal-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                      {classe.name}
                    </h4>
                    <p className="text-sm text-gray-500">Sélectionnez la classe</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
      <button
        onClick={() => setSelectedClasse(null)}
        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg font-semibold hover:from-teal-600 hover:to-emerald-700 transition-all duration-200 shadow-lg"
      >
        <ArrowLeft className="w-5 h-5" />
        Retour
      </button>

      <h2 className="text-2xl font-bold text-gray-900 text-center">
        Espace PP de la <span className="text-teal-600">{selectedClasse.name}</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CARD_OPTIONS.map((card) => (
          <div
            key={card.id}
            className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-2xl"
          >
            {/* Header Card */}
            <div className={`bg-gradient-to-r ${card.gradient} px-6 py-5`}>
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${card.iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
                  <div className="text-white">
                    {card.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white">
                  {card.title}
                </h3>
              </div>
            </div>

            {/* Body Card */}
            <div className="p-6">
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {card.description}
              </p>

              {/* Bouton Ouvrir */}
              <button
                onClick={() => handleOpenCard(card.id)}
                className={`w-full bg-gradient-to-r ${card.gradient} text-white px-6 py-3 rounded-lg font-bold hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm`}
              >
                <FileText className="w-5 h-5" />
                Ouvrir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
