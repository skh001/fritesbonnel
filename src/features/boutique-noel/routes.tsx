// Routes de la Boutique de Noël, chargées à la demande (lazy loading) :
// le code de la boutique n'alourdit pas le reste du site.
// Pour désactiver la boutique après les fêtes, il suffit de retirer {boutiqueNoelRoutes} dans App.tsx.
import { Suspense, lazy, type ReactNode } from 'react';
import { RefreshCcw } from 'lucide-react';
import { Route } from 'react-router-dom';

const BoutiqueNoelLayout = lazy(() => import('./pages/BoutiqueNoelLayout'));
const BoutiqueNoelPage = lazy(() => import('./pages/BoutiqueNoelPage'));
const ProduitPage = lazy(() => import('./pages/ProduitPage'));
const CommandePage = lazy(() => import('./pages/CommandePage'));
const ConfirmationPage = lazy(() => import('./pages/ConfirmationPage'));

// Même indicateur de chargement que la page Galerie
const Loader = () => (
  <div className="flex min-h-[60vh] items-center justify-center">
    <RefreshCcw className="animate-spin text-red-600" size={48} />
  </div>
);

const withSuspense = (element: ReactNode) => <Suspense fallback={<Loader />}>{element}</Suspense>;

export const boutiqueNoelRoutes = (
  <Route path="/boutique-noel" element={withSuspense(<BoutiqueNoelLayout />)}>
    <Route index element={withSuspense(<BoutiqueNoelPage />)} />
    <Route path="commande" element={withSuspense(<CommandePage />)} />
    <Route path="confirmation" element={withSuspense(<ConfirmationPage />)} />
    <Route path=":slug" element={withSuspense(<ProduitPage />)} />
  </Route>
);
