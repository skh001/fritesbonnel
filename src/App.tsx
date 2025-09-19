import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Clock, Heart, Utensils, Calendar, Newspaper, MessageCircle, ShoppingBag, Instagram, ArrowUp } from 'lucide-react';
import AccueilPage from './pages/AccueilPage';
import CartePage from './pages/CartePage';
import EvenementsPage from './pages/EvenementsPage';
import ActusPage from './pages/ActusPage';
import ContactPage from './pages/ContactPage';
import ClickAndCollect from './pages/ClickAndCollect';
import BoutiquePage from './pages/BoutiquePage';
import ComingSoonPage from './pages/ComingSoonPage'; // Import de la nouvelle page
import logo from './assets/logo.png';

type Page = 'accueil' | 'carte' | 'evenements' | 'actus' | 'ou nous trouver' | 'commander' | 'boutique';

declare global {
  interface Window {
    FB: any;
    fbAsyncInit: () => void;
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('accueil');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '269575157263587',
        xfbml: true,
        version: 'v23.0'
      });
      window.dispatchEvent(new Event('fbload'));
    };
    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) return;
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/fr_FR/sdk.js";
       fjs.parentNode?.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  
  // Le tableau du menu d'origine, sans modification
  const menuItems = [
    { key: 'accueil', label: 'Accueil', icon: Heart },
    { key: 'carte', label: 'Notre Carte', icon: Utensils },
    { key: 'evenements', label: 'Événements', icon: Calendar },
    { key: 'actus', label: 'Galerie', icon: Newspaper },
    { key: 'ou nous trouver', label: 'Nous Trouver ?', icon: MessageCircle },
    { key: 'commander', label: 'Click&Collect', icon: ShoppingBag },
    { key: 'boutique', label: 'Boutique', icon: ShoppingBag }
  ];

  // Le nouveau composant Header avec un design plus aéré
  const Header = () => (
    <header className="bg-red-600 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center space-x-3 cursor-pointer" // Ajout de "cursor-pointer"
            onClick={() => setCurrentPage('accueil')} // Ajout de l'événement onClick
          >
            <div className="w-20 h-20 bg-[#fffd67] rounded-full flex items-center justify-center overflow-hidden">
              <img src={logo} alt="Logo Frites Bonnel" className="object-contain w-20 h-20" />
            </div>
            <div>
              <h1 className="text-2xl font-arialnarrow7">FRITES BONNEL</h1>
              <p className="font-folks text-[#fffd67] text-sm">Bonnes et belles</p>
            </div>
          </div>

          {/* Version desktop du menu, avec plus d'espace */}
          <nav className="hidden md:flex flex-wrap justify-end gap-x-6 gap-y-2">
            {menuItems.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setCurrentPage(key as Page)}
                className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-colors ${
                  currentPage === key ? 'bg-[#fffd67] text-red-600 font-semibold' : 'hover:bg-red-700 hover:text-[#fffd67]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Bouton pour le menu mobile */}
          <button
            className="md:hidden bg-[#fffd67] text-red-600 p-2 rounded-md shadow-lg"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? '✕ Fermer' : '☰ Menu'}
          </button>
        </div>

        {/* Menu mobile */}
        <div
          className={`md:hidden mt-4 flex flex-col gap-2 transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {menuItems.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => { setCurrentPage(key as Page); setMobileMenuOpen(false); }}
              className={`px-3 py-2 rounded-md transition-colors ${
                currentPage === key ? 'bg-[#fffd67] text-red-600 font-semibold' : 'bg-red-700 hover:bg-[#fffd67] hover:text-red-600'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );

  const Footer = () => (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-15 h-15 bg-[#fffd67] rounded-full flex items-center justify-center overflow-hidden">
                <img src={logo} alt="Logo Frites Bonnel" className="object-contain w-10 h-10" />
              </div>
              <div>
                <h3 className="font-arialnarrow7 text-lg">Frites Bonnel</h3>
                <p className="font-folks text-[#fffd67] text-sm">Bonnes et belles</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm">
              Friterie traditionnelle du Nord, créée en 2018 par Vincent Pécourt.
              Spécialiste des frites authentiques et des recettes traditionnelles.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#fffd67]">Contact</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2"><Phone className="w-4 h-4 text-[#fffd67]" /><span>06 11 52 16 89</span></div>
              <div className="flex items-center space-x-2"><Mail className="w-4 h-4 text-[#fffd67]" /><span>fritesbonnel@gmail.com</span></div>
              <div className="flex items-center space-x-2"><MapPin className="w-4 h-4 text-[#fffd67]" /><span>Angers et sa région</span></div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-[#fffd67]">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/fritesbonnel" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-[#fffd67] hover:text-red-600 transition-colors">
                <span className="text-sm font-bold">f</span>
              </a>
              <a href="https://www.instagram.com/frites_bonnel/?hl=fr" target="_blank" rel="noopener noreferrer" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-[#fffd67] hover:text-red-600 transition-colors">
                <Instagram className="w-4 h-4 text-white" />
              </a>
              <a href="mailto:fritesbonnel@gmail.com" className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center hover:bg-[#fffd67] hover:text-red-600 transition-colors">
                <Mail className="w-4 h-4 text-white" />
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

  const renderPage = () => {
    switch (currentPage) {
      case 'accueil': return <AccueilPage setCurrentPage={setCurrentPage} />;
      case 'carte': return <CartePage />;
      case 'evenements': return <EvenementsPage />;
      case 'actus': return <ActusPage />;
      case 'ou nous trouver': return <ContactPage />;
      case 'commander': return <ClickAndCollect />;
      case 'boutique': return <ComingSoonPage />;
      default: return <AccueilPage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-white relative flex flex-col">
      <Header />
      <main className="flex-grow pb-32">{renderPage()}</main>
      <div id="fb-root"></div>
      <Footer />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 bg-[#fffd67] text-red-600 p-3 rounded-full shadow-lg flex items-center justify-center z-50 transition-opacity duration-300 ${showScrollTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        title="Retour en haut"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
    </div>
  );
}

export default App;