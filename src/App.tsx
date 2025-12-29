import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { Configuration } from './pages/Configuration';
import { StudentRegistration } from './pages/StudentRegistration';
import { StudentStatus } from './pages/StudentStatus';
import { LanguageDefinition } from './pages/LanguageDefinition';
import { DefineUnfit } from './pages/DefineUnfit';
import { StudentSearch } from './pages/StudentSearch';
import { ParentalCode } from './pages/ParentalCode';
import { AbandonsList } from './pages/AbandonsList';
import { SeriesManagement } from './pages/SeriesManagement';
import { GroupesPedagogiques } from './pages/GroupesPedagogiques';
import { ChangementClasse } from './pages/ChangementClasse';
import { Matieres } from './pages/Matieres';
import { Coefficients } from './pages/Coefficients';
import { SallesManagement } from './pages/SallesManagement';
import { Enseignants } from './pages/Enseignants';
import { EnseignantsRetardataires } from './pages/EnseignantsRetardataires';
import { EspacePP } from './pages/EspacePP';
import { FeuilleNotes } from './pages/FeuilleNotes';
import { CahierNote } from './pages/CahierNote';
import { ModificationNotes } from './pages/ModificationNotes';
import { Bulletins } from './pages/Bulletins';
import { EditionsEnseignants } from './pages/EditionsEnseignants';
import { EditionsEleves } from './pages/EditionsEleves';
import { CertificatScolarite } from './pages/CertificatScolarite';
import { Layout } from './components/Layout';
import { Placeholder } from './pages/Placeholder';

const AppContent = () => {
  const { isAuthenticated } = useAuth();
  const [currentPath, setCurrentPath] = useState('/dashboard');

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderPage = () => {
    if (currentPath === '/dashboard') {
      return <Dashboard />;
    }

    if (currentPath === '/profile') {
      return <Profile />;
    }

    if (currentPath === '/configuration') {
      return <Configuration />;
    }

    if (currentPath === '/students/inscription') {
      return <StudentRegistration />;
    }

    if (currentPath === '/students/status') {
      return <StudentStatus />;
    }

    if (currentPath === '/students/lv') {
      return <LanguageDefinition />;
    }

    if (currentPath === '/students/inapte') {
      return <DefineUnfit />;
    }

    if (currentPath === '/students/recherche') {
      return <StudentSearch />;
    }

    if (currentPath === '/students/code-parental') {
      return <ParentalCode />;
    }

    if (currentPath === '/students/abandons') {
      return <AbandonsList />;
    }

    if (currentPath === '/studies/series') {
      return <SeriesManagement />;
    }

    if (currentPath === '/studies/groupes') {
      return <GroupesPedagogiques />;
    }

    if (currentPath === '/studies/changement') {
      return <ChangementClasse />;
    }

    if (currentPath === '/studies/matieres') {
      return <Matieres />;
    }

    if (currentPath === '/studies/coefficients') {
      return <Coefficients />;
    }

    if (currentPath === '/studies/salles') {
      return <SallesManagement />;
    }

    if (currentPath === '/studies/enseignants') {
      return <Enseignants />;
    }

    if (currentPath === '/studies/retardataires') {
      return <EnseignantsRetardataires />;
    }

    if (currentPath === '/studies/espace-pp') {
      return <EspacePP />;
    }

    if (currentPath === '/evaluations/feuille-notes') {
      return <FeuilleNotes />;
    }

    if (currentPath === '/evaluations/cahier-note') {
      return <CahierNote />;
    }

    if (currentPath === '/evaluations/modification-notes') {
      return <ModificationNotes />;
    }

    if (currentPath === '/editions/bulletins' || currentPath === '/editions/bulletins/unique' || currentPath === '/editions/bulletins/complet') {
      return <Bulletins />;
    }

    if (currentPath === '/editions/enseignants') {
      return <EditionsEnseignants />;
    }

    if (currentPath === '/editions/eleves') {
      return <EditionsEleves />;
    }

    if (currentPath === '/editions/certificat' || currentPath === '/editions/certificat/unique' || currentPath === '/editions/certificat/salle') {
      return <CertificatScolarite />;
    }

    const pathSegments = currentPath.split('/').filter(Boolean);
    const pageTitle = pathSegments[pathSegments.length - 1]
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return <Placeholder title={pageTitle} description="Page en cours de développement" />;
  };

  return (
    <Layout onNavigate={setCurrentPath}>
      {renderPage()}
    </Layout>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
