import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Star, Users, Heart, Utensils, Calendar, Newspaper, MessageCircle, ShoppingBag, Instagram } from 'lucide-react';
import AccueilPage from './pages/AccueilPage';
import CartePage from './pages/CartePage';
import EvenementsPage from './pages/EvenementsPage';
import ActusPage from './pages/ActusPage';
import ContactPage from './pages/ContactPage';
import logo from './assets/logo.png';
import ClickAndCollect from './pages/ClickAndCollect';

// Mettre à jour le type Page pour inclure 'commander'
type Page = 'accueil' | 'carte' | 'evenements' | 'actus' | 'contact' | 'commander';

// Déclarez FB et ses méthodes sur l'objet Window pour TypeScript
declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('accueil');

  // Charge le SDK JavaScript de Facebook une seule fois au démarrage de l'application
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId            : '269575157263587', // REMPLACÉ avec votre ID d'application Facebook
        xfbml            : true,
        version          : 'v23.0' // Utilisé la version fournie par Facebook
      });
      // Déclenche un événement personnalisé une fois le SDK Facebook initialisé
      const event = new Event('fbload');
      window.dispatchEvent(event);
    };

    // Charge le script SDK de Facebook de manière asynchrone
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/fr_FR/sdk.js"; // Note: Langue fr_FR pour une meilleure cohérence
       fjs.parentNode?.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }, []); // Le tableau vide assure que cela ne s'exécute qu'une fois au montage

  const Header = () => (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="Logo Frites Bonnel"
                className="object-contain w-20 h-20"
              />
            </div>
            <div>
              <h1 className="text-2xl font-arialnarrow7">FRITES BONNEL</h1>
              <p className=" font-folks text-yellow-200 text-sm">Bonnes et belles</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6">
            {[
              { key: 'accueil', label: 'Accueil', icon: Heart },
              { key: 'carte', label: 'Notre Carte', icon: Utensils },
              { key: 'evenements', label: 'Événements', icon: Calendar },
              { key: 'actus', label: 'Actus', icon: Newspaper },
              { key: 'contact', label: 'Contact', icon: MessageCircle },
              { key: 'commander', label: 'Click&Collect', icon: ShoppingBag }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setCurrentPage(key as Page)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === key
                    ? 'bg-yellow-400 text-red-600 font-semibold'
                    : 'hover:bg-red-700 hover:text-yellow-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex flex-wrap gap-2">
          {[
            { key: 'accueil', label: 'Accueil' },
            { key: 'carte', label: 'Carte' },
            { key: 'evenements', label: 'Événements' },
            { key: 'actus', label: 'Actus' },
            { key: 'contact', label: 'Contact' },
            { key: 'commander', label: 'Commander' }
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setCurrentPage(key as Page)}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${
                currentPage === key
                  ? 'bg-yellow-400 text-red-600 font-semibold'
                  : 'bg-red-700 hover:bg-yellow-400 hover:text-red-600'
              }`}
            >
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
             <div className="w-15 h-15 bg-yellow-400 rounded-full flex items-center justify-center overflow-hidden">
              <img
                src={logo}
                alt="Logo Frites Bonnel"
                className="object-contain w-10 h-10"
              />
            </div>
            <div>
                <h3 className="font-arialnarrow7 text-lg">Frites Bonnel</h3>
                <p className="font-folks text-yellow-400 text-sm">Bonnes et belles</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Friterie traditionnelle du Nord, créée en 2018 par Vincent Pécourt.
              Spécialiste des frites authentiques et des recettes traditionnelles.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-yellow-400" />
                <span>06 11 52 16 89</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span>fritesbonnel@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-yellow-400" />
                <span>Angers et sa région</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-yellow-400" />
                <span>Mar-Dim 11h30-21h45</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-yellow-400">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/fritesbonnel" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-red-600 transition-colors">
                <span className="text-sm font-bold">f</span> {/* Icône Facebook */}
              </a>
              <a href="https://www.instagram.com/frites_bonnel/?hl=fr" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-red-600 transition-colors">
                <Instagram className="w-4 h-4 text-white" /> {/* Icône Instagram de Lucide React */}
              </a>
              <a href="mailto:fritesbonnel@gmail.com" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-yellow-400 hover:text-red-600 transition-colors">
                <Mail className="w-4 h-4 text-white" /> {/* Icône Mail Lucide React */}
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
          <p>© 2025 Frites Bonnel - Friterie traditionnelle du Nord - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );

  // Pass setCurrentPage to AccueilPage
  const renderPage = () => {
    switch (currentPage) {
      case 'accueil': return <AccueilPage setCurrentPage={setCurrentPage} />;
      case 'carte': return <CartePage />;
      case 'evenements': return <EvenementsPage />;
      case 'actus': return <ActusPage />;
      case 'contact': return <ContactPage />;
      case 'commander': return <ClickAndCollect />;
      default: return <AccueilPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>{renderPage()}</main>
      <div id="fb-root"></div> {/* Point d'accroche pour le SDK Facebook */}
      <Footer />
    </div>
  );
}

export default App;
